---
title: "Query parameters in Gatsby"
date: "2020-08-18"
tags: ["project: andrew-chang-dewitt.dev", "problem solution", "javascript", "typescript", "gatsby", "react", "reach router"]
---

Recently, I just finished adding all of the blog functionality I needed to this
website. While I ran into a host of new to me problems while building the blog,
most of it was easily solved using docs & questions others had
[already](https://www.gatsbyjs.com/docs/adding-markdown-pages/)
[written](https://www.gatsbyjs.com/docs/adding-tags-and-categories-to-blog-posts/)
& asked.

## Problem

One problem, however, had little in the way of answers that I could find: how
to best handle URL Query Parameters with Reach Router. I found some good discussion
about the issue using React Router, but since I'm using Gatsby, I'm still stuck with
Reach's version, for now.

It appears that Reach is designed for using parameters in the URL path directly (via
[URL Parameters](https://reach.tech/router/example/url-params)), but that didn't feel
right for my use case (simply toggling the sort direction on my posts list). The best
ideas [I found](https://stackoverflow.com/a/61547399/4642869) suggested using the
search property on Reach Router's `useLocation()` hook to directly get the query, &
parsed it using a third party library. I wanted to limit third party libraries unless
they felt absolutely necessary, so after some more Googling, I found `URLSearchParams.get()`
[on MDN (RIP)](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/get)
to be very simple & easy to use.

## Solution

Putting the idea from StackOverflow and `URLSearchParams` together started with a simple
function:

```typescript
import { useLocation } from '@reach/router'

function getQueryParam (query: string): string | null {
  const location = useLocation()
  const search = new URLSearchParams(location.search)

  return search.get(query)
}
```

While this worked perfectly, I found it a little cumbersome to have to think in terms
of parsing a query parameter every time I wanted to use this; plus, I wanted to be
able to just use the value returned like I would any other state value in React. As
[another StackOverflow answer suggested](https://stackoverflow.com/a/62134232/4642869),
I thought writing a custom hook might be a good place to start.

While building this hook, I had three goals in mind:

1. It should return a value based on the current value of a desired query parameter
2. It should also return a function that updates the query parameter and the previously
   returned value, just like a setter in React's `useState` hook
3. It should optionally accept a default value in case the query parameter isn't set yet

Since I wanted my `useQueryParam` hook to closely resemble React's `useState`, I figured it
best to start there:

```typescript
import { useLocation } from '@reach/router'

function getQueryParam (query: string): string | null {
  const location = useLocation()
  const search = new URLSearchParams(location.search)

  return search.get(query)
}

// highlight-start
const useQueryParam(query: string) => {
  const [value, setValue] = React.useState(
    getQueryParam(query) // but this still needs parsed
  )

  const update = (newValue) => {
    setValue(newValue)
    // ... something to update query value here
  }

  return [ value, update ]
}
// highlight-end
```

While this worked to grab a query parameter's value, it's missing the logic to update the parameter, as well as how to parse the string returned by `getQueryParam`. Parsing had a pretty simple solution, splitting the comma separated string using `String.prototype.split()`. Additionally, it guards against a null value since `URLSearchParams` returns null if the query isn't set.

```typescript
// ...

const useQueryParam = (
  query: string,
  defaultValue: string[] = ['']
) => {
// highlight-start
  const parseString = (
    str: string | null,
    default: string[]
  ): string[] => {
    if (!str) return default

    return str.split(',')
  }
// highlight-end

  const [value, setValue] = React.useState(
// highlight-start
    parseString(getQueryParam(query), defaultValue)
// highlight-end
  )

  // ...

  return [ value, update ]
}
```

Updating the actual query parameter in the browser's location object turned out
to be pretty easy, using Reach Router's `useNavigate()` hook:

```typescript
import { useLocation, useNavigate } from '@reach/router'

// ...

const useQueryParam(query: string) => {
// highlight-start
  const navigate = useNavigate()
// highlight-end

  const parseString = (
    str: string | null,
    default: string[]
  ): string[] => {
    if (!str) return default

    return str.split(',')
  }

  const [value, setValue] = React.useState(
    parseString(getQueryParam(query), defaultValue)
  )

  const update = (newValue) => {
    setValue(newValue)
// highlight-start
    // join the values back into a comma-separated
    // string and use `navigate` to update location
    navigate(`?${query}=${newValue.join(',')}`)
// highlight-end
  }

  return [ value, update ]
}
```

This worked pretty well, but I quickly found a bug: when a user clicked the back
button in their browser, the URL updates, but the returned value did not. Fixing
this took some research, but I found my answer in yet another part of Reach
Router's API: `globalHistory.listen()`.

```typescript
// ...

const useQueryParam(query: string) => {
  const navigate = useNavigate()

  // ...

  const update = (newValue) => {
    setValue(newValue)
    // join the values back into a comma-separated
    // string and use `navigate` to update location
    navigate(`?${query}=${newValue.join(',')}`)
  }

// highlight-start
  // forward & back button behavior
  // inside a useEffect hook to allow lifecycle updates to clean
  // up listeners on component unmount
  React.useEffect(() => {
    const historyEventCallback = ({
      action,
      location: newLocation
    }) => {
      // back and forward navigation is sent as a 'POP' action
      if (action === 'POP') {
        setValue(
          parseString(
            getQueryParam(query)))
      }
    }

    return globalHistory.listen(historyEventCallback)
  }, [])
// highlight-end

  return [ value, update ]
}
```

I found it easiest to move the `useLocation` call into the `useQueryParam` hook to
co-locate calls to Reach Router's hooks & allow `getQueryParam` to be passed a
location instead of relying on it to get the correct location on its own. With
that complete, the final result ended up as the following:

```typescript
import { useLocation, useNavigate } from '@reach/router'

// highlight-start
const getQueryParam = (location: WindowLocation, query: string) => {
  const search = new URLSearchParams(location.search)
// highlight-end

  return search.get(query)
}

const useQueryParam(query: string) => {
// highlight-start
  const location = useLocation()
// highlight-end
  const navigate = useNavigate()

  const parseString = (
    str: string | null,
    default: string[]
  ): string[] => {
    if (!str) return default

    return str.split(',')
  }

  const [value, setValue] = React.useState(
    parseString(getQueryParam(query), defaultValue)
  )

  const update = (newValue) => {
    setValue(newValue)
    // join the values back into a comma-separated
    // string and use `navigate` to update location
    navigate(`?${query}=${newValue.join(',')}`)
  }

  // forward & back button behavior
  // inside a useEffect hook to allow lifecycle updates to clean
  // up listeners on component unmount
  React.useEffect(() => {
    const historyEventCallback = ({
      action,
      location: newLocation
    }) => {
      // back and forward navigation is sent as a 'POP' action
      if (action === 'POP') {
        setValue(
          parseString(
// highlight-start
            getQueryParam(newLocation, query)))
// highlight-end
      }
    }

    return globalHistory.listen(historyEventCallback)
  }, [])

  return [ value, update ]
}
```

## Conclusion

Overall, this seems to be working great so far, meeting all three of my
original goals & with only the one (solved) bug. My biggest complaint is
that the forward & back button behavior was really hard to test. This
is because the best way I've found to test any component that uses
any location-aware logic (i.e. anything with the `useLocation()` hook)
is to wrap it in a `LocationProvider` & it appears that the history
source here doesn't provide any good way of simulating a user clicking
the forward or back buttons. I ended up stubbing out `globalHistory`'s
`listen()` method using `sinon`, then manually calling the callback I
gave it by reaching into the stubbed out method using the `SinonStub.args`
directly. While pretty hacky, it worked well enough for now.

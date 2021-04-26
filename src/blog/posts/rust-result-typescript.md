---
title: "Missing Rust's Result type in Typescript"
date: "2020-11-09"
tags: ["project: we-cook-sometimes", "rust", "typescript", "type systems", "error handling"]
---

When I first started learning programming, I began where many do: the weak, dynamic typing of Javascript. As a result, I didn't understand why I'd ever want to use a strong, statically typed language for a long time&mdash;until Rust broke my brain. There's a ton of things about Rust that really helped me become a better programmer (the borrow checker, lifetimes, multiple string types, etc.), but the part I find myself missing no matter what other language I'm using is the type system.

Recently, I've been doing a some web related projects again & found myself turning to JS again. This time around I really missed the guarantees that come with static typing, so I decided to pick up Typescript. While I was surprised at just how much fun Typescript made "JS" again, I still found myself missing some things about Rust, including it's error-handling patterns using it's `Result` type. Luckily, a few months ago, I stumbled across ["From Rust to TypeScript"](https://valand.dev/blog/post/from-rust-to-typescript) by Alan Darmasaputra and was inspired to try something similar to what he did with `Result`.

The code
===

In his solution, Alan uses the [fp-ts](https://github.com/gcanti/fp-ts) library by Giulio Canti, leveraging the `Either` type & a few related helper functions. While fp-ts looks fantastic & I definitely want to explore using it more in depth, I didn't want to load an entire library of functional programming types/functions/etc. just for one type. Instead I began to play around with implementing something akin to `Either` myself.

A core `Result` type
---

Turns out, the basic idea is very easily implemented using [discriminating unions](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#discriminating-unions):

```typescript
type Ok<T> = { _tag: 'ok'; ok: T }
type Err<E extends Error> = { _tag: 'err'; err: E }

type Result<T, E extends Error> = Ok<T> | Err<E>
```

This `Result` type works very similarly to `Either`&mdash;it's simply just a type that represents a value that could be _either_ one of two types. In this case, I've restricted the two types to custom types, `Ok` or `Err`, where `Ok` stores a value of any given type under an `ok` property, & `Err` stores any value that implements `Error` under an `err` property.

Capturing potential failure
---

To actually put the new type to use, I also created a `tryCatch` function, just like Alan's:

```typescript
const ok = <T>(value: T): Ok<T> => ({
  _tag: 'ok'
  ok: value
})
const err = <E extends Error>(value: E): Err<E> => ({
  _tag: 'err'
  err: value
})

export const tryCatch = <T, E extends Error>(
  callback: () => T,
  onError: (error: E) => E
): Result<T, E> => {
  try {
    return ok(callback())
  } catch (error) {
    return err(onError(error))
  }
}
```

This `tryCatch` function works by attempting to execute the first of two given functions in a `try` block & wrapping the value in an `Ok` type, then if it throws an error, catching it & executing the second of the given functions & wrapping the value in an `Err` type. More simply put, it's used to _try_ executing something that could fail, then it returns a `Result` type representing either the possible success or failure.

Abstractions on `Result`'s result
---

One of the reasons I wanted to create my own implementation instead of using the exact one proposed in Alan's article, is because I didn't want to have to interact with the `Ok` or `Err` types' `ok` & `err` properties every time I wanted to get a value from a `Result`. Instead, I wanted to create some abstractions on top of `Result` to make working with the type a little more programmatic & less about the unique data structure it represents.

### Getting to the value

First and foremost, I wanted an easy way of "unwrapping" a `Result` to get to it's value. In Rust, when I wanted to simply get the `Ok` value, I'd use it's `unwrap` method, which either returns the value for an `Ok` type, or panics with the wrapped `Err` value. Writing a similar function in TS was fairly easy using [type guards](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards) to determine if the Result is a success or failure:

```typescript
const isOk = <T, E extends Error>(result: Result<T, E>): result is Ok<T> =>
  result._tag === 'ok'

const unwrap = <T, E extends Error>(
  result: Result<T, E>,
): T => {
  if (isOk(result)) return result.ok
  // use throw as there's no good way to check for an
  // error at compile time in TS, unlike Rust's panic
  else throw result.err
}
```

This `unwrap` method works just fine, but always throws the error, which doesn't do much to improve error handling ergonomics since the caller would have to wrap an call to unwrap in a `try...catch` block anyways. Instead, this is improved by allowing `unwrap` to take an error handling function:

```typescript
const isOk = <T, E extends Error>(result: Result<T, E>): result is Ok<T> =>
  result._tag === 'ok'

interface ErrorHandler<U, E extends Error> {
  (e: E): U
}

const unwrap = <T, U, E extends Error>(
  result: ResultType<T, E>,
  errHandler?: ErrorHandler<U, E>
): T | U => {
  if (isOk(result)) return result.ok
  if (errHandler !== undefined) return errHandler(result.err)
  else throw result.err
}
```

### Changing a wrapped value

Also missing from my implementation was a way for modifying a `Result` in place without unwrapping it's value. Rust's version has a [`map` method](https://doc.rust-lang.org/std/result/index.html) that I used pretty often, so I started there.

```typescript
interface MapOkFn<T> {
  (okValue: T): T
}

interface MapErrFn<E extends Error> {
  (errValue: E): E
}

const map = <T, E extends Error>(
  result: Result<T, E>,
  onOk: MapOkFn<T>,
  onErr: MapErrFn<E>
): Result<T, E> => {
  if (isOk(result)) return okType(onOk(result.ok))
  else return errType(onErr(result.err))
}
```

While this was close to what I wanted, it missed one key concept: I wanted to be able to change the type of the wrapped value. The above implementation restricts the return type of an `Ok` value to the same type that was originally wrapped in `MapOkFn`. Adding a third generic, `U`, solves that problem though:

```typescript
// highlight-start
interface MapOkFn<T, U> {
  (okValue: T): U
// highlight-end
}

interface MapErrFn<E extends Error> {
  (errValue: E): E
}

// ...
```

Which then requires adding `U` to `map`:

```typescript
// ...

// highlight-start
const map = <T, U, E extends Error>(
  // highlight-end
  result: Result<T, E>,
  // highlight-start
  onOk: MapOkFn<T, U>,
  // highlight-end
  onErr: MapErrFn<E>
// highlight-start
): Result<U, E> => {
// highlight-end
  if (isOk(result)) return okType(onOk(result.ok))
  else return errType(onErr(result.err))
}
```

This `map` method differs from Rust's in a major way: Rust's version takes only one function as an argument & applies it to the result to either the `Ok` or `Err` value. This works because Rust's version leaves the pattern matching of `Ok` & `Err` types up to the caller:

```rust
let good_result: Result<i32, SomeError> = Ok(10);
let bad_result: Result<i32, SomeError> = Err(anError);

// returns Ok(11)
let good_result: Result<i32, SomeError> = good_result.map(|i| {
  match i {
      Ok(v) => Ok(v + 1),
      Err(e) => Err(e)
  }
});

// returns Err(NewError(e))
let bad_result: Result<i32, i32> = bad_result.map(|i| {
  match i {
      Ok(v) => Ok(v + 1),
      Err(e) => Err(NewError(e))
  }
});
```

This works well in Rust because pattern matching like that is very common & supported by some great compiler features on Rust's `Enum` types. In my experience with TS so far, this pattern isn't as common nor as elegant & well supported, leading me to chose two callbacks for `map` & abstracting way the pattern matching for the caller. To that end though, I wanted two shortcut methods on `map` for when a user only wants to change the `Ok` or the `Err` value:

```typescript
const mapOk = <T, U, E extends Error>(
  result: Result<T, E>,
  fn: MapOkFn<T, U>
): Result<U, E> => {
  if (isOk(result)) return okType(fn(result.ok))
  else return result
}

const mapErr = <T, E extends Error>(
  result: Result<T, E>,
  fn: MapErrFn<E>
): Result<T, E> => {
  if (isErr(result)) return errType(fn(result.err))
  else return result
}
```

### Improving syntax

Finally, I wanted to make one more structural change to my `Result` implementation to improve ergonomics. Instead of exporting `tryCatch` along with the `unwrap`, `map`, `mapOk`, & `mapErr` functions, I wanted to move the helper functions to be methods on the type, allowing them to be called on a `Result` using dot notation instead of providing the `Result` to be unwrapped or mapped as an argument. This means I wanted to export an interface that looks like this:

```typescript
export interface Result<T, E extends Error> {
  unwrap: <U = T>(errorHandler?: ErrorHandler<U, E>) => T | U
  map: <U = T>(onOk: MapOkFn<T, U>, onErr: MapErrFn<E>) => Result<T | U, E>
  mapOk: <U = T>(fn: MapOkFn<T, U>) => Result<U, E>
  mapErr: (fn: MapErrFn<E>) => Result<T, E>
}
```

To do this requires renaming the `Result` type that's not exported to `ResultType`, then passing the `ResultType` to each of the methods on `Result` using a builder function:

```typescript
const ResultBuilder = <T, E extends Error>(
  result: ResultType<T, E>
): Result<T, E> => ({
  unwrap: <U = T>(errorHandler?: ErrorHandler<U, E>) =>
    unwrap(result, errorHandler),
  map: <U = T>(onOk: MapOkFn<T, U>, onErr: MapErrFn<E>) =>
    ResultBuilder<T | U, E>(map(result, onOk, onErr)),
  mapOk: <U = T>(fn: MapOkFn<T, U>) => ResultBuilder<U, E>(mapOk(result, fn)),
  mapErr: (fn) => ResultBuilder(mapErr(result, fn)),
})
```

Then the `ok` & `err` functions used by `tryCatch` need updated to use `ResultBuilder` to return the new `Result` wrapping a `ResultType`:

```typescript
// highlight-start
const okType = <T>(value: T): Ok<T> => ({
// highlight-end
  _tag: 'ok'
  ok: value
})
// highlight-start
const errType = <E extends Error>(value: E): Err<E> => ({
// highlight-end
  _tag: 'err'
  err: value
})

// highlight-start
const ok = <T, E extends Error>(value: T): Result<T,E> =>
  ResultBuilder(okType(value))

const err = <T, E extends Error>(value: T): Result<T,E> =>
  ResultBuilder(errType(value))
// highlight-end
```

Altogether, this results in a `Result` type that can be used as follows:

```typescript
const doSomethingRisky = ()<string> => {
  // ... do something that could fail

  return 'it succeeded!'
}

// because doSomethingRisky could fail or succeed,
// wrap it in a tryCatch
const result = tryCatch(
  doSomethingRisky,
  (error as Error) => error
)

// then pass around it's return value as if it
// succeeded, deferring error handling until
// you need to get to the value
result.unwrap((e) => `it failed: ${e}`)
// returns 'it succeeded!' if doSomethingRisky succeeds
// otherwise returns 'it failed' with the error message
```

In conclusion
===

I actually ended up using this `Result` implementation pretty extensively in a [recent project](/blog/posts/we-cook-sometimes). This application has a data layer that uses JS's `fetch` to read the source data from the API, & parses the returned data into the right shape. Both fetching & parsing have multiple points of potential failure, so wrote [the entire module](https://github.com/andrew-chang-dewitt/we-cook-sometimes/blob/259214a9fb1582a80ff134bb9b679ce8b73b2ba8/src/lib/data/fetch.ts) to encapsulate it's return values in `Result` types. I haven't separated my Result implementation out into it's own package yet, but if you want to see the full source, it's available [on GitHub](https://github.com/andrew-chang-dewitt/we-cook-sometimes/blob/7a632120ea658896f485329b1a45b2ab2801430c/src/utils/Result.ts) in the repo of project I used it for.

While using this `Result` type requires some extra thought & extra lines of code, I found it very helpful to know that my data layer couldn't fail without passing the failure to me at the point of consumption, allowing me to reason about a failed data request at the time of rendering in an easy & type safe manner. While I haven't used the new type at every potential point of failure in the app, I wouldn't hesitate to reach for this implementation again in later projects & would love to refactor the rest of the project to use it as well.

---
title: "Personal Website"
date: "2020-11-15"
tags: ["featured-project", "project: andrew-chang-dewitt.dev", "Typescript", "Javascript", "SASS", "Gatsby", "CSS-modules", "Node", "Express", "Mocha", "Enzyme", "React Testing Library", "NGINX"]
description: "This professional website & blog, built as a static site with dynamically generated blog posts, resume, & portfolio. Self-hosted on a Ubuntu server with Nginx & a NodeJS/Express back-end for the contact form."
info:
  repo:
    - href: https://github.com/andrew-chang-dewitt/andrew-chang-dewitt-website
       display: andrew-chang-dewitt/andrew-chang-dewitt-website
  url:
    href: https://andrew-chang-dewitt.dev
    display: andrew-chang-dewitt.dev
---

What & why?
===

About one year ago, I began studying in earnest with the goal of making a career change to software development.
As a self-taught developer, I knew I would need a means of proving my skills, so I began to maintain a GitHub account & put together a portfolio with the plan of hosting it on a personal website I'd build myself.
This summer, I spent some time building the website (if you're reading this, you're probably looking at it now).

While I'm not going to go over how I built every part of the site, I definitely benefited from this project & want to discuss what I wanted to achieve by building a website as well as review some of the lessons I learned while building it.
Additional posts with more details about how I built different parts or specific lessons I learned can be found under the [project: andrew-chang-dewitt.dev](/blog/tags/project:-andrew-chang-dewitt.dev) tag.

Goal setting
---

Whenever I begin an undertaking of any significant size & importance, I like to start with exploring & then writing down my goals.
For this project I had 4 main goals & 1 stretch goal:

###I. Learning opportunity

The project must provide opportunities to learn new skills in addition to reinforcing already obtained knowledge.

###II. Simple, clean design

The website must be easy to read, navigate, & layout.
The focus should not be on design "chops", but instead on displaying the content clearly & concisely with attention paid to accessibility & mobile-first design.

###III. Showcase skills

The website should be a place for showing that I do, in fact, know how to program.

###IV. Promote contact

The website should drive leads on jobs and encourage dialog.

###V. Stretch goal: Blog

The website should have an active blog with featured projects, along with writing on learning programming, progress updates on current projects, & possibly, eventually other hobbies.

Tech stack
---

When I started, it'd been a few years since I'd done any web development (most of it with Angular 1 & some Aurelia), as I'd been mainly working on IoT services, CLI scripts & programs, & other non-web tech all written in Python & Rust at the time.
I knew I wanted to build this project as a static site (as much as possible at least), so I began looking at static site generators.
First, I tried out [Zola](https://www.getzola.org/) because it was written in Rust & looked fairly simple.
While it worked exactly as advertised, it fell to the same issues I'd had with web development in general back when I'd worked with Angular 1: difficulty writing HTML & CSS in the DRY, composable manner that I'd gotten used to in other areas of software programming.

[Fairly quickly](https://github.com/andrew-chang-dewitt/andrew-chang-dewitt-website/tree/36ed4171044b990741b69fb0e3c55700101c40e5), I abandoned Zola after getting mired down in the weeds of nested templates & css-scoping.
A quick peek at Jekyll and similar classic Python SSG's indicated I'd run into the same problems.
At that point, I remembered having heard a lot about Web Components, modular CSS, & more with React and/or Vue, as well as a lot of hype around Gatsby back when I'd last followed web development.
While I glanced at Vue, I found the documentation lacking at times & was discouraged despite really liking its OSS origins compared to React & Angular.
Somewhat reluctantly, I tried out React with the intention to use it via Gatsby if I liked it.
While I was initially _very_ skeptical about JSX & the lack of separation of concerns between HTML & JS (and the whole part where it was yet another way letting Facebook into my life), I found React's documentation very clear & easy to follow.
It even [managed to convince me](https://reactjs.org/docs/introducing-jsx.html#why-jsx) to embrace JSX as a way of writing my markup in a more modular, programmatic way.

Finally, while Javascript was the first language I learned when I first started out, I wasn't wild about the idea of using it heavily again.
Since learning Python & Rust, I'd grown to appreciate stricter type systems (first finding hinting in Python to be helpful, then falling in love with full-blown static type system in Rust) & much preferred the inheritance systems in both languages compared to Javascript's prototypical model.
Luckily, Typescript solved my type system complaints, or at least nearly all of them (I really missed Rust's `Result`&mdash;so much, in fact, that in a later project I wrote my own version).
Additionally, although ES2015 (which had only just come out during my first time around with JS) introduced classes that worked in a way that felt much more manageable than prototypes, I eventually moved away from using classes in JS altogether.
Instead I began to favor function composition (& using functional inheritance with Builder functions in other TS/JS projects that actually called for inheritance), but that's a whole different can of worms.

Issues encountered
===

With the tech stack nailed down, most of the rest of building the website was fairly straightforward.
As it was my first time with React & Typescript, there were plenty of stumbling blocks, but nearly all were solvable with quick web searches & careful reading of the (really good!) docs.
In the end, there were a couple key goals I wanted to achieve still in regards to content creation (one which Gatsby _mostly_ helped make easier), one unexpected issue around site navigation (which Gatsby didn't help at all with, but also didn't get in the way), & a couple other issues involving testing & dependencies (that Gatsby made much more difficult).

Resolved issues
---

First up was my stretch goal: building a blog.
I knew I wanted to write the posts in Markdown & wanted nothing to do with using a CMS, but I also didn't want to have to write any new code anytime I wanted to publish a new post.
This clearly meant I wanted dynamic page creation from my Markdown files, something which Gatsby easily excels at.
Even better, Gatsby's [intro tutorial](https://www.gatsbyjs.com/tutorial/part-seven/) covers the basics necessary for implementing a blog.
Pretty quickly, I had a workable solution & moved on.

More recently, I added a resume to the site.
While originally I thought I'd wanted to be able to write this in Markdown too, I realized that a resume is less like prose & more like structured data&mdash;Markdown just didn't seem to represent the information as well as something more structured could.
Instead, I quickly settled on YAML (JSON's syntax just gets in the way too much) as a means of writing the resume content in a readable, but structured manner.
Next, I had to import that YAML into my website.
While I could have turned to Gatsby's GraphQL layer for that (like I did for blog page creation), it felt like massive overkill for the small amount of data & single page needed.
Instead, I [imported the YAML directly](https://github.com/andrew-chang-dewitt/andrew-chang-dewitt-website/blob/022174b91a5b0814e0fa209e44e00b51cd192094/src/components/pages/Resume.tsx#L10), parsing it into objects that I then passed as props to the [different components](https://github.com/andrew-chang-dewitt/andrew-chang-dewitt-website/tree/022174b91a5b0814e0fa209e44e00b51cd192094/src/components/resume) of the resume.

In addition to the easy issues, there was one issue involving URL query parameters.
While I've [written about it previously](/blog/posts/gatsby-query-parameters), the short version is that I wanted an easy way of handling query params (something similar to React's `useState()`) & there was no good solution in Gatsby's router of choice: Reach Router.
I ended up writing a [custom hook](https://github.com/andrew-chang-dewitt/andrew-chang-dewitt-website/blob/984177220baf696d31fc71fa8ec172475adb2c7e/src/utils/queryHooks.ts) that turned out to be surprisingly useful abstraction making thinking about URL query parameters much simpler.
In fact, I found a similar need later then when working with React Router, so I've even [modified it](https://github.com/andrew-chang-dewitt/we-cook-sometimes/blob/b1b8a5c125f875dd8a7190d527f879cc066cedb1/src/utils/useQueryParam.ts) it to work with the different Router (along with making some improvements to the typing).

Unresolved issues
---

In what turned out to be the most troublesome (although largely workable) issue, I often felt like  Gatsby itself was doing too much.
I'd originally chosen Gatsby for one main reason: I wanted an SSG to make creating a multi-page website with dynamic pages simple & performant, and at first, Gatsby seemed to be perfect for this.
Yet the more I worked on the project, the more often I felt like Gatsby was getting in my way.

The most common issue was entirely caused by one feature of Gatsby that's sold pretty strongly in the tutorial and in the API Reference docs (fittingly filed under ['Gatsby Magic'](https://www.gatsbyjs.com/docs/gatsby-magic/#routing)): it's `Link` component.
The idea is that using their `Link` allows for the simplicity of static html routing via classic HTTP file server routing, while adding highly performant secondary features like page prefetching & nearly instant routing by using dynamic routing in a JS runtime loaded later via rehydration.
And to be fair, these features work exactly as advertised & created a wonderfully fast & smooth experience when navigating my website.
My real problems started to happen at the unit testing level.

Attempting to unit test _any_ component that uses Gatsby's `Link` implementation was huge hassle.
It turns out that even though the docs describe it as ["a wrapper around @reach/router’s `<Link>` component"](https://www.gatsbyjs.com/docs/gatsby-link/), it completely alters the isolation of the parent components.
When working with Reach Router's version of `Link`, all you need to do is provide a `LocationProvider` wrapper in your unit test & you're off running.
Whereas in Gatsby, the global namespace is modified in an opaque & non-trivial manner that requires [lots of stubbing](https://github.com/andrew-chang-dewitt/andrew-chang-dewitt-website/blob/ceee73e13934a506d87529639d757f7227329dc5/src/components/blog/FilterControls.spec.tsx#L37-L47) to work around it.
In fact, it was so tedious to stub every part of the global namespace that `Link` depends on, that I never bothered figuring out how to actually simulate a user clicking a `Link` via React Testing Library without either completely replacing `Link` with a mock or writing endless, brittle, & obtuse stubs on the global namespace.
Instead, I ended up making assertions on the `href` attribute of the generated anchor node, which just feels a bit too much like testing the implementation & not the usage.

Gatsby's solution to this is [well documented](https://www.gatsbyjs.com/docs/unit-testing/#setting-up-your-environment), but requires you to be using Jest, and frankly, includes a ton of mocking anyways, just at the configuration level before a single test is ever even run.
Personally, I'm a minimalist with unit testing, preferring to write my tests using as little environment as possible for faster testing & less brittle of maintenance.
Additionally, I was using Mocha, not Jest largely because of Jest's all in one philosophy compared to Mocha's more minimalist approach.
If I ever build another site in Gatsby again, I'll probably use Jest (assuming these issues around unit testing Gatsby haven't changed), but that alone is a reason I'd reconsider Gatsby entirely.

All of this complaining isn't to say that Gatsby is trash & no one should ever use it though.
Overall, it was great.
Gatsby did nearly everything I wanted it to & made getting up and running while using a superset (TS) of a language I hadn't used in years (JS) with a framework I'd never used before (React) to build a website for the first time since I'd first learned to code relatively fast & mostly painless.
My conclusion is simply that for a site of this size, it may have been simpler to figure out Server Side Rendering with React on my own & only add the parts I needed to have better control over my tooling & environment & maybe have let go of some of the extra features of Gatsby such as React Hydration, dynamic routing, or the GraphQL data layer.

Conclusion
===

At the end of the day, the website works great for my needs & achieves every goal I set for it when I got started.
Now that I'm (mostly) done with development, [maintaining the site](https://github.com/andrew-chang-dewitt/andrew-chang-dewitt-website/issues) & adding content is a breeze.
While I'd possibly make some different choices around the tech stack if I were to rewrite it, I'm glad I spent the time learning Gatsby, React, & Typescript while building this & fully expect to continue to use React & Typescript in many web-centric projects to come.

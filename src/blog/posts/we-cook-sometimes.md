---
title: "We Cook Sometimes"
date: "2020-11-15"
tags: ["featured-project", "project: we-cook-sometimes", "Typescript", "SASS", "React", "React-Router", "CSS-modules", "Mocha", "Enzyme", "React Testing Library", "Webpack", "NGINX", "web development"]
description: "A web-app to help my wife & I finally decide what to cook for dinner. Additionally, we use it to share our recipes with others. Pulls content from a Trello we already used to store & maintain recipes."
info:
  url:
    href: https://we-cook-sometimes.andrew-chang-dewitt.dev
    display: we-cook-sometimes.andrew-chang-dewitt.dev
  repo:
    href: https://github.com/andrew-chang-dewitt/we-cook-sometimes
    display: andrew-chang-dewitt/we-cook-sometimes
---

An idea
===

The project began as an idea I had after checking out the New York Times' Watching web application.
Up until sometime in the last few months, their website had a part right below the header that helped a reader find something new to watch.
It worked by asking the user a few questions, filtering the list displayed below it based upon the user's answers.
At some point after winding up there once again in the never-ending quest to figure out what movie to watch, I realized the same concept might work really well for recipes.

We Cook Sometimes is a project that implements that idea with the goal of helping my family & I pick something to cook, as well as hosting our recipes for sharing with our families, friends, & on a cooking Instagram by the same name that my wife & I run.

An implementation
===

When first looking at the problem, I knew I'd have three main parts to it: the recipe & question data, the logic for asking questions & filtering recipes, & the logic for rendering the results.

The data
---

Before writing this website, we already used Trello to write down & organize our recipes.
There's a rough organizational pattern using lists to indicate what we've got the stuff to make, what we liked & will make again & new recipes we'd like to try.
Additionally, it's organized with tags indicating associations with concepts like country of origin, savory or sweet, main ingredients, cooking method, easy or hard, fast or slow, etc.

Trello has a pretty good API for accessing data stored in boards & cards, so in the name of expediency I chose to continue using Trello as a sort of CMS for an MVP of the application.
I started by writing a [small library](https://github.com/andrew-chang-dewitt/we-cook-sometimes/blob/d5cdc1dd867f4ffa0e0ebc28322967bdcbf279cc/src/lib/data/fetch.ts) for abstracting the fetching of data from Trello using fetch API & parsing the data received into a usable format.

While Trello had all the data we needed for our recipes (title, tags, pictures/videos, & the recipe itself), there was no pre-existing source of questions that could be used to narrow down the list.
I knew tags would be the best tool for filtering recipes, so I began by writing a list of questions, (defined [directly in the code](https://github.com/andrew-chang-dewitt/we-cook-sometimes/blob/d5cdc1dd867f4ffa0e0ebc28322967bdcbf279cc/src/lib/data/questions.ts) for simplicity's sake) that could be used to indicate a tag (or tags) should be included or excluded, as well as what questions could be good to ask next.

Finally, while using Typescript for this project (as well as [the website you're reading this blog post on](/blog/posts/personal-website)) had made me actually truly enjoy writing Javascript again, I regularly found myself missing Rust's `Result` type.
So much so, that I [wrote my own implementation](/blog/posts/rust-result-typescript) of it that I then used to encapsulate the possible failures that could be encountered while fetching data.

The core logic
--

Next, I built a [core library](https://github.com/andrew-chang-dewitt/we-cook-sometimes/tree/d5cdc1dd867f4ffa0e0ebc28322967bdcbf279cc/src/lib/core) to handle all of the logic related to answering questions, filtering recipes based on those answers, & represent the state of both parts.
I'm a big fan of the functional core, imperative shell pattern Gary Bernhardt [describes as FauxO](https://www.destroyallsoftware.com/talks/boundaries), & implementing this core state using that pattern was incredibly useful later on when adding previous question & reset all questions features.

In order to easily navigate backwards through questions already answered, I wanted to think of it similarly to writing an 'undo' feature in a text editor.
I didn't actually care what the previous question was or what recipes it had eliminated; all I needed to know was what the state was before the action I wanted to 'undo' & have some way of restoring it.
By writing `QuestionSeries` & `RecipeList` both as immutable objects whose methods return new, updated versions of the previous object, I was able to relatively trivially write a [custom hook](https://github.com/andrew-chang-dewitt/we-cook-sometimes/blob/d5cdc1dd867f4ffa0e0ebc28322967bdcbf279cc/src/utils/useStateHistory.ts) for implementing a simple persistent data structure around React's `useState` hook that stores previous states, allows for stepping backwards through previous states, & resetting back to the original state.

This `useStateHistory` hook then allowed me to simply store an instance of `RecipeList` & an instance of `QuestionSeries` each as objects on the current state, then set push new versions to the state history each time either one needs updated.
This means that any time a user answers a question, the previous questions & the lists that resulted from each of their answers are just a simple `.pop()` away.

Finally, defining what question comes after the current one turned out be a more interesting problem than I expected.
The NYT app that inspired me only asked 3 questions, always in the same order, but I knew I wanted this derivation of it to have more flexibility & complexity.
My biggest goal was to have the current question not only determine what recipes would be filtered out of the list, but also what question would come next.
Additionally, I knew some questions might have multiple possibilities for what question could come next & a question could have any number of questions all including it as a possible next question.
Finally, I didn't want to hard-code the order of questions, instead allowing it to have some feeling of randomness to encourage exploration instead of rote execution of patterns.

This seemed like something that would be pretty well described as a directed graph & I ended up writing a custom library to handle building & interacting with graphs.
[I've written about it in detail](/blog/posts/implementing-graphs-in-typescript), but the TL;DR is this: I wrote an entirely unnecessary library to solve an already solved problem that may or may not perform as well as any existing solution all just for the sake of writing it myself.
Less facetiously, it was great practice with graph data structures & algorithms for traversing it, in addition to good practice writing composable code with functional inheritance & Builder patterns that turned out to be both surprisingly useful & entirely overkill for the scale of the problem I was trying to solve.

The render logic
---

Easily the least interesting part, I used React to write the imperative shell mentioned previously that loads the data & builds the state using the core logic libraries, then renders & UI that allows the user to interact with it.


A future
===

I've actually published a demo version of this project at we-cook-sometimes.andrew-chang-dewitt.dev & have surprised myself with how often I use to browse my family's recipes instead of the Trello board I'd previously always looked at.
If we continue to find it useful, I'd like to improve it by converting to a back-end API with a database populated from Trello using API hooks that parses recipes into more granular detail to allow for abstractions on ingredient types, time, yield, & other recipe characteristics.This would allow for easier addition of a whole host of new features, including filtering by ingredients available, a shopping list builder, & maybe even something for placing orders on a grocery delivery service of choice (if I can find an API).

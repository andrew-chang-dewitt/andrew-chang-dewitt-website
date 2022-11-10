import React from 'react'
import { Link } from 'gatsby'

import styles from './Story.module.sass'

import { Detail } from './Detail'

export const Story = () => (
  <div className="indent">
    <h2 className={`${styles.firstSubtitle} subtitle`}>short version</h2>

    <p>
      Landscape Architecture -&gt; public service -&gt; software development
    </p>

    <h2 className="subtitle">long version</h2>

    <p>
      I'm a self-motivated developer with a background in design & a passion for
      solving problems. Looking back,
      <Detail
        buttonText=" it should have been obvious "
        additionalText="that I would eventually pursue a career in programming"
      >
        {' '}
        (e.g. I grew up in a family where computers outnumbered people 3:1,
        multiple family members are software developers, & I even wrote my first
        lines of code in elementry school)
      </Detail>
      .
      <Detail buttonText=" Instead">
        , in the time since writing that first <code>helloWorld()</code> with my
        dad
      </Detail>
      , I've spent 6 years of childhood dreaming of being an Architect, 5 years
      of university studying to be a Landscape Architect, & 5 years of working
      in government social services; all only to return to coding nearly 20
      years later.
    </p>

    <p>
      After having forgotten
      <Detail buttonText=" everything" additionalText=" I'd learned as a child">
        {' '}
        (the small amount of Visual Basic my father taught me, as well as any
        HTML, CSS, & JQuery as a teenager on MySpace)
      </Detail>
      , I first got back into coding as something fun to learn in my free time
      after
      <Detail buttonText=" leaving university">
        &mdash;a hands-on lesson about sunk cost fallacy & the importance of
        regular self-care
        {/*
      that I've
            <Link to="/blog/post/leaving-university">
              {' '}
              written about in more detail
            </Link>{' '}
            <em>FIXME: Write this post & link it here</em>
    */}
      </Detail>
      . In that time, I found myself{' '}
      <Detail
        buttonText=" becoming enamored "
        additionalText="with programming"
      >
        &mdash;the types of problems I was solving were challenging & engaging &
        I was enjoying programming in a way I hadn't enjoyed anything since I
        first studied calculus in high school
      </Detail>
      . Quickly, software development took up more & more of my free time until,
      about one year ago, I decided to begin studying in earnest with the goal
      of making a career change to software development. In this time, I've
      studied
      <Detail buttonText=" computer science fundamentals">
        {' '}
        such as data structures, algorithms, computation, & a little abstract
        formal logic
      </Detail>
      ;
      <Detail buttonText=" languages">
        {' '}
        including
        <Detail buttonText=" javascript">
          {' '}
          (first vanilla, then predominantly Typescript)
        </Detail>
        , python, &
        <Detail buttonText=" Rust">
          {' '}
          (a recent addition & quickly becoming my new favorite!)
        </Detail>
        , & a little bit of
        <Detail buttonText=" a few others"> (R, Ruby, Racket, & PHP)</Detail>
      </Detail>
      ;
      <Detail
        buttonText=" tools &
  frameworks"
      >
        {' '}
        such as git, bash, nginx, npm, cargo, pip, pyTest, Mocha, Node, Express,
        MongoDB, SQL, React, &
        <Detail buttonText=" Gatsby">
          {' '}
          (which this site is
          <Detail buttonText=" built with">
            &mdash;see the source code{' '}
            <a
              href="https://github.com/andrew-chang-dewitt/andrew-chang-dewitt-website"
              target="_blank"
              rel="noopener noreferrer"
            >
              on Github
            </a>
          </Detail>
          )
        </Detail>
      </Detail>
      ;
      <Detail
        buttonText=" other "
        additionalText="programming styles, design patterns, & principles"
      >
        {' '}
        (e.g. OOP, some FP, DRY, TDD/BDD, & a little Agile/Scrum)
      </Detail>
      ; & released a <Link to="/resume">few projects</Link> over the last few
      years of studying.
    </p>
    <p>
      Eventually, I made the choice to go back to school to study Computer
      Science so I could dive deeper in a University environment. Since starting
      school, I've studied additional languages (including C, C++, & Java),
      learned more about CS fundamentals, & fallen back in love with Math
      (especially Discrete Math & Calculus). In my first year, I completed an
      internship with Indiana University&mdashPurdue University, Indianapolis'
      Center for Teaching and Learning, then started a summer internship with
      Tinder (from Match Group) that's been extended into the current school
      year.
    </p>

    <h2 className="subtitle">what's next</h2>
    <p>
      I'm currently looking for my next role as I near the end of my internship
      with Tinder and contine my studies. In my free time, I'm also
      <Detail buttonText=" continuing to learn Rust ">
        {' '}
        by building a
        <a
          href="https://github.com/andrew-chang-dewitt/learning-rust-guessing-game"
          target="_blank"
          rel="noopener noreferrer"
        >
          {' '}
          guessing game{' '}
        </a>
        with simple 'AI' players implemented with a few different search
        algorithms{' '}
      </Detail>
      and finishing building out a
      <Detail
        buttonText=" budgeting app "
        additionalText="for my partner & I to use"
      >
        {' '}
        (with integrations to our bank accounts & credit cards, a web app, user
        authentication, & a RESTful API to keep everything in sync)
      </Detail>
      . Next up is the
      <Detail buttonText=" home security system ">
        {' '}
        (custom built sensor modules with
        <Detail buttonText=" Raspberry Pi Zeros ">
          &mdash;although I've been considering switching to Arduino&mdash;{' '}
        </Detail>
        & off-the-shelf PIR motion sensors, reed sensors, & IP cameras all
        <Detail buttonText=" communicating via MQTT ">
          &mdash;you can find a prototype of the sensor modules written in
          Python{' '}
          <a href="https://github.com/andrew-chang-dewitt/rpi-security-gpio2mqtt">
            on GitHub
          </a>
          &mdash;{' '}
        </Detail>
        with a server built in Rust){' '}
      </Detail>
      I've been designing for my family's home.
    </p>
  </div>
)

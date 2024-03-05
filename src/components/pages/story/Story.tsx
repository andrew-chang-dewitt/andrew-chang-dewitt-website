import React from 'react'
import { Link } from 'gatsby'

import styles from './Story.module.sass'

import { Detail } from './Detail'

export const Story = () => (
  <div className="indent">
    <h2 className={`${styles.firstSubtitle} subtitle`}>short version</h2>

    <p>
      Architecture school dropout & social services worker before discovering a
      love for coding & changing careers.
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
      , I've spent 8 years of childhood dreaming of being an Architect, 5 years
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
      . Quickly, software development took up more & more of my free time until
      I decided to go back to school for Computer Science with the intention of
      becoming a software engineer. In this time, I've studied
      <Detail buttonText=" computer science fundamentals">
        {' '}
        such as data structures, algorithms, computation, & discrete math (in
        addition to
        <Detail
          buttonText=" the usual suspects"
          additionalText=" of CS curricula"
        >
          &mdash;Calculus I, II, & III & Physics
        </Detail>
        )
      </Detail>
      ;
      <Detail buttonText=" languages">
        {' '}
        including Javascript/Typescript, python,
        <Detail buttonText=" Rust">
          {' '}
          (a recent addition & quickly becoming my new favorite!)
        </Detail>
        , C/C++, & Java
      </Detail>
      ;
      <Detail buttonText=" tools & frameworks">
        {' '}
        such as git, linux, bash, nginx, Node, Express, NoSQL, SQL, React,
        FastAPI, Svelte, Leptos, &
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
        (e.g. OOP, some FP, DRY, SOLID, TDD/BDD, & a little Agile/Scrum)
      </Detail>
      ; & released a <Link to="/resume">few projects</Link>.
    </p>
    <p>
      Since starting school, I've completed two internships&mdash;one with
      Indiana University&mdash;Purdue University, Indianapolis' Center for
      Teaching and another with Tinder (from Match Group)&mdash;totalling one
      year of professional experience so far.
    </p>

    <h2 className="subtitle">what's next</h2>
    <p>
      I'm currently looking for my next role as I near the end of my second year
      of studying. In my free time, I'm also working on a few new projects,
      including
      <Detail
        buttonText=" a prototype fan controller &  thermometer "
        additionalText=" for my barbecue smoker "
      >
        built in Python & FastAPI with a Raspberry Pi, MCP3008 for reading
        Thermoworks 100k Ohm thermistors, & a level shifter for PWM control of a
        12V fan{' '}
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
      .
    </p>
  </div>
)

import React from 'react'
import { Link } from 'gatsby'

import styles from './HireMe.module.sass'

export const HireMe = () => (
  <div className="indent">
    <h2 className={`subtitle ${styles.firstSubtitle}`}>why me</h2>

    <p>
      In addition to my professional experience in building & maintaining a web
      application in React & TypeScript at scale, I've also built multiple
      libraries, cli & web applications, & dev tools in Python, Java, & now
      Rust. As a CS student, I have a strong foundation in CS fundamentals; as a
      previously long-time self-taught developer, I have a proven track record
      as an independent & fast learner capable of breaking down large, complex
      problems into easily manageable pieces. Additionally, I have extensive
      practice at identifying when, & how, to seek assistance.
    </p>

    <p>
      You can find <Link to="/resume">my resume on this website</Link>, along
      with <Link to="/blog">my blog</Link>, containing posts on{' '}
      <Link to="/blog/tags/problem-solution">problem solving</Link>,{' '}
      <Link to="/blog/tags/react">React</Link>,{' '}
      <Link to="/blog/tags/typescript">TypeScript</Link>, and more.
    </p>

    <h2 className="subtitle">why you</h2>

    <p>
      I'm looking for a role as a Junior Software Engineer or a Software
      Engineering Intern with a team who strongly shares my values in mentorship
      & learning and an employer who has a long-term commitment to their
      employee's individual growth.
    </p>
  </div>
)

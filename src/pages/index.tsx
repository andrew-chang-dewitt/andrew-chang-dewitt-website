import React, { useRef } from 'react'

import { Layout, navItems, mergeRefsToItems } from '../components/Layout'
import { Section } from '../components/Section'
import { Story } from '../components/pages/story/Story'

export default function Landing() {
  const storyRef = useRef<HTMLDivElement>(null)
  // const projectRef = useRef<HTMLDivElement>(null)
  // const hireRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const navigationRefs = {
    story: storyRef,
    // 'featured-projects': projectRef,
    // 'hire-me': hireRef,
    contact: contactRef,
  }

  const merged = mergeRefsToItems(navItems, navigationRefs)
  return (
    <Layout navigationItems={navItems} navigationRefs={navigationRefs} landing>
      <Section ref={storyRef} id="story" title="Story" next={merged[1]}>
        <Story />
      </Section>

      {/*
      <Section
        id="featured-projects"
        title="Projects"
        ref={projectRef}
        next={merged[2]}
      >
      </Section>

      <Section id="hire-me" title="Hire Me" ref={hireRef} next={merged[3]}>
      </Section>
        */}

      <Section id="contact" title="Contact" ref={contactRef}>
        <p>
          Dignissim enim sit amet venenatis. Urna neque viverra justo nec
          ultrices dui. Id aliquet risus feugiat in ante metus dictum. Proin
          libero nunc consequat interdum varius. Pretium viverra suspendisse
          potenti nullam ac. Odio eu feugiat pretium nibh ipsum consequat.
          Quisque non tellus orci ac auctor augue mauris augue neque. Eu
          ultrices vitae auctor eu augue ut lectus arcu bibendum. Aliquam ut
          porttitor leo a diam. Tortor pretium viverra suspendisse potenti
          nullam ac tortor vitae. Turpis in eu mi bibendum neque egestas congue
          quisque. Ornare massa eget egestas purus viverra accumsan in nisl
          nisi. Diam sollicitudin tempor id eu nisl. Tellus integer feugiat
          scelerisque varius morbi enim. Mauris pharetra et ultrices neque
          ornare.
          <br />
          Hendrerit dolor magna eget est lorem ipsum dolor sit. Ultrices in
          iaculis nunc sed. Urna cursus eget nunc scelerisque. Id interdum velit
          laoreet id. Est pellentesque elit ullamcorper dignissim cras tincidunt
          lobortis feugiat vivamus. Consequat ac felis donec et odio
          pellentesque diam volutpat commodo. Nullam ac tortor vitae purus
          faucibus ornare suspendisse sed. Lacus vestibulum sed arcu non odio
          euismod lacinia. Scelerisque eleifend donec pretium vulputate sapien
          nec. Aliquam faucibus purus in massa tempor nec feugiat nisl. Dolor
          sed viverra ipsum nunc aliquet.
        </p>
      </Section>
    </Layout>
  )
}

import React from 'react'

interface EducationItem {
  school: string
  start: number
  end: number
  location: string
  description: string
}

interface Props {
  data: Array<EducationItem>
}

export const Education = ({ data }: Props) => (
  <section>
    <h2 className="title">Education</h2>
    <ul>
      {data.map((item) => (
        <li key={item.school}>
          <h3 className="subtitle">{item.school}</h3>
          <p>
            {item.start} - {item.end}, {item.location}
          </p>
          <p>{item.description}</p>
        </li>
      ))}
    </ul>
  </section>
)

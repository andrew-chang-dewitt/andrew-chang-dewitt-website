const {
  Link,
  Line,
  List,
  TitleSection,
  Section,
  SubSection,
  Container,
} = require('text-composer')

const formatPhoneNumber = (phone) =>
  phone
    .split('')
    .map((current, index) => {
      switch (index) {
        // surround area code in parenthesis
        case 0:
          return `(${current}`
        case 2:
          return `${current}) `

        // separate local code with hyphen
        case 5:
          return `${current}-`

        default:
          return current
      }
    })
    .join('')

const Header = (data) => {
  const list = List([
    Link(`tel:+01-${data.phone}`, formatPhoneNumber(data.phone)),
    Link(`mailto:${data.email}`, data.email),
    Link(`https://${data.website}`, data.website),
    Link(`https://${data.github}`, data.github),
  ])

  return TitleSection(data.name, [list])
}

const buildEducationDate = (date) =>
  date.expectedGraduation
    ? `Expected graduation: ${date.expectedGraduation}`
    : `${date.start}—${date.end}`

const buildEducationItem = (item) =>
  SubSection(`${item.degree}, *minor in ${item.minor}*`, [
    Line(`${item.school} \\`),
    Line(`${item.location} \\`),
    Line(`${buildEducationDate(item.date)}`),
  ])

const Education = (data) => Section('Education', data.map(buildEducationItem))

const buildExperienceItem = (item) => {
  const links = item.url
    ? List([
        Link(item.url.href, item.url.display),
        Link(item.repo.href, item.repo.display),
      ])
    : List([Link(item.repo.href, item.repo.display)])

  return SubSection(item.title, [
    Line('Links:'),
    links,
    Line(`Stack: ${item.stack.join(', ')}`),
    Line(''),
    Line('Summary:'),
    List(item.summary),
  ])
}

const TechnicalExperience = (data) =>
  Section('Technical Experience', data.map(buildExperienceItem))

const generateResumeText = (data) =>
  Container([
    Header(data.header),
    Education(data.education),
    TechnicalExperience(data.experience),
  ]).compose()

module.exports = {
  default: generateResumeText,
  Header,
  Education,
  TechnicalExperience,
  buildExperienceItem,
}

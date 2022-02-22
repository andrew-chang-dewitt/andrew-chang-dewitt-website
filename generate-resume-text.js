const {
  Link,
  Line,
  Italic,
  List,
  TitleSection,
  Section,
  SubSection,
  Container,
  Header: TextHeader,
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

const buildEducationItem = (item) =>
  SubSection(
    `${item.degree} in ${item.major}${
      item.minor ? ', *minor in ' + item.minor : ''
    }`,
    [
      Line(`${item.school} \\`),
      Line(`${item.location} \\`),
      Line(`Expected graduation: ${item.date}`),
    ]
  )

const Education = (data) => Section('Education', data.map(buildEducationItem))

const buildRepoLinks = (repos) =>
  repos.map((repo) => Link(repo.href, repo.display))

const buildLinks = (url, repos, moreInfo) => {
  const u = url ? Link(url.href, url.display) : null
  const r = buildRepoLinks(repos)
  const m = moreInfo ? Link(moreInfo.href, moreInfo.display) : null

  const list = [u, ...r, m].filter((item) => item)

  return List(list)
}

const buildExperienceItem = (item) =>
  SubSection(item.title, [
    Line('Links:'),
    buildLinks(item.url, item.repo, item.moreInfo),
    Line(`Skills: ${item.stack.join(', ')}`),
    Line(''),
    Line(item.description),
  ])

const TechnicalExperience = (data) =>
  Section('Experience', data.map(buildExperienceItem))

const buildPosition = (position) =>
  Container([
    TextHeader(4, position.job_title),
    Line(position.employer),
    Line(`${position.start}—${position.end}`),
  ])

const buildEmploymentItem = (item) => {
  const positions = item.positions.map(buildPosition)

  return SubSection(item.title, [
    ...positions,
    Line(''),
    Line('Summary:'),
    List(item.summary),
    Line(''),
    Line('Skills:'),
    List(item.skills),
  ])
}

const WorkExperience = (data) =>
  Section('Employment', data.map(buildEmploymentItem))

const generateResumeText = (data) =>
  Container([
    Header(data.header),
    Education(data.education),
    WorkExperience(data.employment),
    TechnicalExperience(data.experience),
  ]).compose()

module.exports = {
  default: generateResumeText,
  Header,
  Education,
  TechnicalExperience,
  buildExperienceItem,
}

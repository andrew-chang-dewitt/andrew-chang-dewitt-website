const path = require('path')
const { writeFile } = require('fs').promises
const puppeteer = require('puppeteer')

const getPDF = async () => {
  const pagePath = 'https://andrew-chang-dewitt.dev/resume/printable'

  console.info(
    `WARNING: This script creates a pdf of the version currently hosted live at 
${pagePath}.
Make sure any changes have been pushed to live before generating the PDF.

`
  )

  console.debug('Launching puppeteer browser...')
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--disable-gpu', '--no-sandbox'],
  })
  console.debug('Browser launched.')
  console.debug('Creating new page...')
  const page = await browser.newPage()
  console.debug('Page created.')

  console.debug(`Page navigating to: '${pagePath}' ...`)
  await page.goto(pagePath)
  console.debug('Page navigated.')
  console.debug(`Printing page as pdf...`)
  const pdf = await page.pdf({
    format: 'Letter',
    margin: {
      top: '0.3 in',
      bottom: '0.2 in',
      right: '0.3 in',
      left: '0.3 in',
    },
  })
  console.debug('Page printed.')

  await browser.close()

  return pdf
}

const saveFile = async (file) => {
  const filePath = path.join(
    __dirname,
    '../public/resume/resume_Andrew_Chang-DeWitt.pdf'
  )

  try {
    console.info(`Writing pdf to '${filePath}' ...`)
    await writeFile(filePath, file)
  } catch (err) {
    console.error(`Error encountered while writing file to '${filePath}'.`)
    throw err
  }

  console.info('File written succesfully.')

  return true
}

const main = async () => {
  const pdf = await getPDF()
  await saveFile(pdf)
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => process.exit(0))

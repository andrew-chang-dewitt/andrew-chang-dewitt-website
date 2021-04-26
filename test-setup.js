require('mocha-suppress-logs')()
const { JSDOM } = require('jsdom')

const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
const { window } = jsdom

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  })
}

// setup jsodom
global.window = window
global.document = window.document
global.navigator = {
  userAgent: 'node.js',
}
global.requestAnimationFrame = function (callback) {
  return setTimeout(callback, 0)
}
global.cancelAnimationFrame = function (id) {
  clearTimeout(id)
}
copyProps(window, global)

// mock out global properties that Gatsby's Link requires to not throw errors
Object.defineProperty(global, '__BASE_PATH__', {
  value: '',
  writable: true,
})
Object.defineProperty(global, '___loader', {
  value: {
    enqueue: () => {},
  },
  writable: true,
})

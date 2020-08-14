import * as router from '@reach/router'

//
// Mocking @reach/router's Location behavior
//
// function for mocking a Location
const mockLocation = (path: string, hash: string) => {
  return ({
    hash: hash,
    pathname: path,
    search: '',
  } as any) as router.WindowLocation
}

// Stores history entries in memory for testing or other platforms like Native
const createBetterSource = (initialPath = '/') => {
  const hashIndex = initialPath.indexOf('#')
  const pathname =
    hashIndex > -1 ? initialPath.substr(0, hashIndex) : initialPath
  const hash = hashIndex > -1 ? initialPath.substr(hashIndex) : ''
  const initialLocation = mockLocation(pathname, hash)
  let index = 0
  const stack = [initialLocation]
  const states = [null]

  return {
    get location() {
      return stack[index]
    },
    addEventListener(_: string, fn: any) {
      fn()
    },
    removeEventListener(_: string, fn: any) {
      fn()
    },
    history: {
      get entries() {
        return stack
      },
      get index() {
        return index
      },
      get state() {
        return states[index]
      },
      pushState(state: any, _: any, uri: string) {
        const [pathname, hash = ''] = uri.split('#')
        index++
        stack.push(mockLocation(pathname, hash.length ? `#${hash}` : hash))
        states.push(state)
      },
      replaceState(state: any, _: any, uri: string) {
        const [pathname, hash = ''] = uri.split('#')
        stack[index] = mockLocation(pathname, hash.length ? `#${hash}` : hash)
        states[index] = state
      },
      go(to: number) {
        const newIndex = index + to

        if (newIndex < 0 || newIndex > states.length - 1) {
          return
        }

        index = newIndex
      },
    },
  }
}

export default {
  mockLocation: mockLocation,
  createBetterSource: createBetterSource,
}

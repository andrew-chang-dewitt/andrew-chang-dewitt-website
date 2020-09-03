import React from 'react'
import {
  useLocation,
  useNavigate,
  globalHistory,
  WindowLocation,
} from '@reach/router'

const getQueryParam = (location: WindowLocation, query: string) => {
  const search = new URLSearchParams(location.search)

  return search.get(query)
}

export const useQueryParam = (query: string, defaultValue: string[] = ['']) => {
  const location = useLocation()
  const navigate = useNavigate()

  const parseString = (str: string | null): string[] => {
    // sometimes a query can be null
    if (!str) return defaultValue

    return str.split(',')
  }

  const [value, setValue] = React.useState(
    parseString(getQueryParam(location, query))
  )

  const update = (newValue: string[]): void => {
    setValue(newValue)
    navigate(`?${query}=${newValue.join(',')}`)
  }

  // forward & back button behavior
  React.useEffect(() => {
    return globalHistory.listen(({ action, location: newLocation }) => {
      if (action === 'POP') {
        setValue(parseString(getQueryParam(newLocation, query)))
      }
    })
  }, [])

  return {
    value: value,
    update: update,
  }
}

export default { useQueryParam: useQueryParam }

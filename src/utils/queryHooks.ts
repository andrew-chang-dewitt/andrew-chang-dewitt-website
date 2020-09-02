import React from 'react'
import { useLocation, useNavigate, WindowLocation } from '@reach/router'

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

  // if location changes, force update to value
  // React.useEffect(() => {
  //   update(parseString(getQueryParam(location, query)))
  // }, [location])

  return {
    value: value,
    update: update,
  }
}

export default { useQueryParam: useQueryParam }

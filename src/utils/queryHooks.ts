import React from 'react'
import { useLocation, useNavigate, WindowLocation } from '@reach/router'

const getQueryParam = (location: WindowLocation, query: string) => {
  const search = new URLSearchParams(location.search)

  return search.get(query)
}

export const useQueryParam = (query: string, defaultValue: string[]) => {
  const location = useLocation()
  const navigate = useNavigate()

  const parseString = (str: string | null): string[] => {
    // null guard
    if (!str) return defaultValue

    return str.split(',')
  }

  const parseArray = (arr: string[]): string => {
    if (typeof arr === 'string') return arr
    else return arr.join(',')
  }

  const [value, setValue] = React.useState(
    parseString(getQueryParam(location, query))
  )

  const update = (newValue: string[]): void => {
    setValue(newValue)
    navigate(`?${query}=${parseArray(newValue)}`)
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

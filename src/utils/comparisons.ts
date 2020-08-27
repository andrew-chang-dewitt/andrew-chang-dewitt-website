export const arraysEqual = (
  first: Array<string | number | boolean | undefined | null | symbol>,
  second: Array<string | number | boolean | undefined | null | symbol>
): boolean => {
  const zipped = first.map((element: any, index: number) => [
    element,
    second[index],
  ])

  return zipped.every((element: any[]): boolean => element[0] === element[1])
}

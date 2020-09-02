export default function (arr: any[]): any[] {
  let reversed: any[] = []

  arr.forEach((el: any) => {
    reversed.unshift(el)
  })

  return reversed
}

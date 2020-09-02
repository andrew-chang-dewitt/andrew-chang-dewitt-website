export default function (input: string): string {
  return input.toLowerCase().split(' ').join('-')
}

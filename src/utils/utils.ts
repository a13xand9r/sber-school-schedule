
export function getRandomFromArray<T>(arr: T[]): T{
  return arr[Math.floor(arr.length * Math.random())]
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function deleteSpaceBeforeFinishDot(str: string) {
  return str.slice(0, str.length - 2) + str.slice(str.length - 1)
}
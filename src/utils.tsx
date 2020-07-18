function getElementPosition(element: HTMLElement | null): number {
  // for some reason, something in my vim environment flags the optional chaining here
  // as an error, but I can't find it yet. Code compiles w/ TSC though
  return element?.getBoundingClientRect().top ?? 0
}

export default {
  getElementPosition: getElementPosition,
}

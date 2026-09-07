/** Resolve after `ms` milliseconds. Used by the mock api layer. */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

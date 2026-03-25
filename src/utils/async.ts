const delay = (ms = 280) => new Promise((resolve) => setTimeout(resolve, ms))

export async function withMockDelay<T>(payload: T): Promise<T> {
  await delay()
  return payload
}

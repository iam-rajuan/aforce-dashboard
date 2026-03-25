import { useEffect, useState } from 'react'

export function useMockQuery<T>(queryFn: () => Promise<T>, initialValue: T) {
  const [data, setData] = useState<T>(initialValue)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    queryFn().then((result) => {
      if (mounted) {
        setData(result)
        setLoading(false)
      }
    })
    return () => {
      mounted = false
    }
  }, [queryFn])

  return { data, setData, loading }
}

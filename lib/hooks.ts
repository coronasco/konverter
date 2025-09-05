import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * Hook pentru debouncing - previne apelurile frecvente
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

/**
 * Hook pentru throttling - limitează frecvența apelurilor
 */
export function useThrottle<T>(value: T, delay: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value)
  const lastExecuted = useRef<number>(Date.now())

  useEffect(() => {
    if (Date.now() >= lastExecuted.current + delay) {
      lastExecuted.current = Date.now()
      setThrottledValue(value)
    } else {
      const timer = setTimeout(() => {
        lastExecuted.current = Date.now()
        setThrottledValue(value)
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [value, delay])

  return throttledValue
}

/**
 * Hook pentru operații async cu status
 */
export function useAsyncOperation<T, P extends unknown[]>(
  operation: (...args: P) => Promise<T>
) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [data, setData] = useState<T | null>(null)

  const execute = useCallback(async (...args: P) => {
    try {
      setIsLoading(true)
      setError(null)
      const result = await operation(...args)
      setData(result)
      return result
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err))
      setError(error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [operation])

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setIsLoading(false)
  }, [])

  return {
    execute,
    isLoading,
    error,
    data,
    reset
  }
}

/**
 * Hook pentru memoization avansată cu dependency tracking
 */
export function useStableMemo<T>(
  factory: () => T,
  deps: React.DependencyList
): T {
  const ref = useRef<{ deps: React.DependencyList; value: T } | undefined>(undefined)

  if (!ref.current || !areEqual(ref.current.deps, deps)) {
    ref.current = { deps, value: factory() }
  }

  return ref.current.value
}

/**
 * Hook pentru rate limiting
 */
export function useRateLimit(maxRequests = 10, windowMs = 60000) {
  const requestsRef = useRef<number[]>([])

  const canMakeRequest = useCallback(() => {
    const now = Date.now()
    // Filtrează request-urile din fereastra de timp curentă
    requestsRef.current = requestsRef.current.filter(time => now - time < windowMs)
    return requestsRef.current.length < maxRequests
  }, [maxRequests, windowMs])

  const addRequest = useCallback(() => {
    requestsRef.current.push(Date.now())
  }, [])

  const getRemainingRequests = useCallback(() => {
    const now = Date.now()
    requestsRef.current = requestsRef.current.filter(time => now - time < windowMs)
    return Math.max(0, maxRequests - requestsRef.current.length)
  }, [maxRequests, windowMs])

  return { canMakeRequest, addRequest, getRemainingRequests }
}

/**
 * Hook pentru cache cu expirare
 */
export function useCache<T>(key: string, ttl = 5 * 60 * 1000) {
  const cacheRef = useRef<Map<string, { value: T; timestamp: number }>>(new Map())

  const get = useCallback((cacheKey: string): T | null => {
    const cached = cacheRef.current.get(cacheKey)
    if (!cached) return null

    if (Date.now() - cached.timestamp > ttl) {
      cacheRef.current.delete(cacheKey)
      return null
    }

    return cached.value
  }, [ttl])

  const set = useCallback((cacheKey: string, value: T) => {
    cacheRef.current.set(cacheKey, {
      value,
      timestamp: Date.now()
    })
  }, [])

  const clear = useCallback(() => {
    cacheRef.current.clear()
  }, [])

  return { get, set, clear }
}

/**
 * Hook pentru previous value
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined)
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

// Utility function pentru deep comparison
function areEqual(a: React.DependencyList, b: React.DependencyList): boolean {
  if (a.length !== b.length) return false
  
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false
  }
  
  return true
}

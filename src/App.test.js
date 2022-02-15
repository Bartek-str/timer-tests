import { act, renderHook } from '@testing-library/react-hooks';
import { useCountDown } from './App';

describe('useCountDown', () => {
  beforeEach(() => {
    jest.spyOn(global, 'setTimeout')
  })

  afterEach(() => {
    jest.useFakeTimers()
  })

  it('hook renders properly', () => {
    const { result } = renderHook(() => useCountDown(15))

    // one call is Function: _flushCallback with 0
    expect(setTimeout).toHaveBeenCalledTimes(2)
    expect(result.current.timeLeft).toBe(15)
    expect(result.current.isFinished).toBe(false)
  })

  it('timeout', () => {
    const { result } = renderHook(() => useCountDown(15))

    act(() => {
      jest.advanceTimersByTime(15 * 1000)
    })

    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(result.current.timeLeft).toBe(0)
    expect(result.current.isFinished).toBe(true)
  })

  it('1 second', () => {
    const { result } = renderHook(() => useCountDown(15))

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(result.current.timeLeft).toBe(14)
    expect(result.current.isFinished).toBe(false)
  })

  it('10 seconds', () => {
    const { result } = renderHook(() => useCountDown(15))

    act(() => {
      jest.advanceTimersByTime(10 * 1000)
    })

    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(result.current.timeLeft).toBe(5)
    expect(result.current.isFinished).toBe(false)
  })
})

/* global jest it describe beforeEach expect  */
import { act, renderHook } from "@testing-library/react-hooks";
import { useCountDown } from "./useCountDown";

describe("useCountDown", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("counts down properly and sets isFinished flag", () => {
    const { result } = renderHook(() => useCountDown({ seconds: 3 }));
    expect(result.current.timeLeft).toBe(3);
    expect(result.current.isFinished).toBe(false);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.timeLeft).toBe(2);
    expect(result.current.isFinished).toBe(false);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.timeLeft).toBe(1);
    expect(result.current.isFinished).toBe(false);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.timeLeft).toBe(0);
    expect(result.current.isFinished).toBe(true);
  });
});

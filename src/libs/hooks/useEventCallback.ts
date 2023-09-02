import { useCallback, useRef } from 'react';
import { useIsomorphicLayoutEffect } from 'libs/hooks';

export function useEventCallback<Arguments extends unknown[], R>(
  function_: (...arguments_: Arguments) => R,
) {
  const reference = useRef<typeof function_>(() => {
    throw new Error('Cannot call an event handler while rendering.');
  });

  useIsomorphicLayoutEffect(() => {
    reference.current = function_;
  }, [function_]);

  return useCallback(
    (...arguments_: Arguments) => reference.current(...arguments_),
    [reference],
  );
}

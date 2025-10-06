// usePrevious.ts

import { useRef, useEffect } from 'react';

/**
 * Хук для хранения предыдущего значения любого типа.
 *
 * @param value - текущее значение
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
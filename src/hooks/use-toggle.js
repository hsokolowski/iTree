import React, { useState } from 'react';

/**
 * @param {boolean} initialValue
 * @returns {[boolean, () => void]}
 */
export function useToggle(initialValue = true) {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue(!value);

  return [value, toggle];
}

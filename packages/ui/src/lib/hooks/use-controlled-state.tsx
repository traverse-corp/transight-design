import * as React from 'react'

interface CommonControlledStateProps<T> {
  value?: T
  defaultValue?: T
}

export function useControlledState<T, Rest extends any[] = []>(
  props: CommonControlledStateProps<T> & {
    onChange?: (value: T, ...args: Rest) => void
  }
): readonly [T, (next: T, ...args: Rest) => void] {
  const { value, defaultValue, onChange } = props

  const [state, setInternalState] = React.useState<T>(
    value !== undefined ? value : (defaultValue as T)
  )

  React.useEffect(() => {
    if (value !== undefined) setInternalState(value)
  }, [value])

  const isControlled = value !== undefined
  const setState = React.useCallback(
    (next: T, ...args: Rest) => {
      // controlled 모드에서는 내부 state를 직접 변경하지 않음 (value prop이 변경되어야 반영)
      if (!isControlled) setInternalState(next)
      onChange?.(next, ...args)
    },
    [onChange, isControlled]
  )

  return [state, setState] as const
}

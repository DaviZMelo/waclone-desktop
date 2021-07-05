import { useField } from '@unform/core';
import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { FiArrowDown, FiArrowUp } from 'react-icons/fi';
import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  min: number;
  max: number;
  defaultValue?: number;
  containerStyle?: object;
}

const InputNumber: React.FC<InputProps> = ({
  name,
  min = 1,
  max,
  defaultValue,
  containerStyle = {},
  ...rest
}) => {
  const [mouseAction, setMouseAction] = useState<string>();
  const [inputValue, setInputValue] = useState<number>(
    defaultValue >= min && defaultValue <= max ? defaultValue : min,
  );

  useEffect(() => {
    setInputValue(
      defaultValue >= min && defaultValue <= max ? defaultValue : min,
    );
  }, [defaultValue, max, min]);
  const inputRef = useRef<HTMLInputElement>();

  const { fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const handleValueChange = useCallback(
    (newValue: number) => {
      if (Number.isNaN(newValue) || !inputValue) {
        return setInputValue(min);
      }
      if (newValue > max) return setInputValue(max);
      if (newValue < min) return setInputValue(min);

      return setInputValue(newValue);
    },
    [max, min, inputValue],
  );

  useEffect(() => {
    const actionTimeout = setTimeout(() => {
      if (mouseAction === 'up') {
        const newIncreasedInputValue = inputValue + 1;
        handleValueChange(newIncreasedInputValue);
      }

      if (mouseAction === 'down') {
        const newDecreasedInputValue = inputValue - 1;
        handleValueChange(newDecreasedInputValue);
      }
    }, 100);

    if (!mouseAction) {
      clearTimeout(actionTimeout);
    }
  }, [min, max, handleValueChange, mouseAction, inputValue]);

  return (
    <Container style={containerStyle}>
      <button
        type="button"
        name="increase-input"
        onMouseUp={() => setMouseAction(undefined)}
        onMouseLeave={() => setMouseAction(undefined)}
        onMouseDown={() => setMouseAction('up')}
      >
        <FiArrowUp />
      </button>
      <input
        type="number"
        id={name}
        onChange={event => setInputValue(event.currentTarget.valueAsNumber)}
        onBlur={event => {
          handleValueChange(event.currentTarget.valueAsNumber);
        }}
        value={!Number.isNaN(inputValue) && inputValue}
        autoComplete="none"
        ref={inputRef}
        {...rest}
      />

      <button
        type="button"
        name="decrement-input"
        onMouseUp={() => setMouseAction(undefined)}
        onMouseLeave={() => setMouseAction(undefined)}
        onMouseDown={() => setMouseAction('down')}
      >
        <FiArrowDown />
      </button>
    </Container>
  );
};

export default InputNumber;

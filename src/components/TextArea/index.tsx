import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  TextareaHTMLAttributes,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  containerStyle?: object;
  icon?: React.ComponentType<IconBaseProps>;
}

const TextArea: React.FC<TextAreaProps> = ({
  name,
  containerStyle = {},
  icon: Icon,
  ...rest
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!textAreaRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textAreaRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return (
    <>
      <Container
        style={containerStyle}
        isErrored={!!error}
        isFilled={isFilled}
        isFocused={isFocused}
        onClick={() => document.getElementById(name).focus()}
      >
        {Icon && <Icon size={30} />}

        <textarea
          onFocus={handleInputFocus}
          id={name}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          ref={textAreaRef}
          {...rest}
          autoComplete="none"
        />

        {error && (
          <Error title={error}>
            <FiAlertCircle color="#C53030" size={30} />
          </Error>
        )}
      </Container>
    </>
  );
};

export default TextArea;

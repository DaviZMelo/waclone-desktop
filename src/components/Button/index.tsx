import React, { ButtonHTMLAttributes } from 'react';

import { IconBaseProps } from 'react-icons/lib';
import { ButtonContainer } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type: 'button' | 'submit' | 'reset';
  icon?: React.ComponentType<IconBaseProps>;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  name,
  type,
  children,
  icon: Icon,
  disabled,
  isLoading = false,
  ...rest
}) => {
  return (
    <ButtonContainer
      type={type === 'button' ? 'button' : 'submit'}
      name={name}
      disabled={disabled || isLoading}
      isLoading={isLoading}
      {...rest}
    >
      {isLoading ? (
        <h3>Carregando</h3>
      ) : (
        <>
          {Icon && <Icon />}
          {children}
        </>
      )}
    </ButtonContainer>
  );
};

export default Button;

import { type } from '@testing-library/user-event/dist/type';
import styles from './Button.module.scss';
import { Button } from '@mui/material';
import { ReactNode } from 'react';

type ButtonProps = {
  onClick: any;
  disabled?: boolean;
  type: string;
  children: ReactNode;
};

type ButtonStyleProperties = {
  variant: 'contained' | 'outlined' | 'text';

};

const UIButton: React.FC<ButtonProps> = ({ onClick, type, disabled, children }) => {
  // let buttonStyleProperties: ButtonStyleProperties = {}

  // switch (type) {
  //   case 'primary':

  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      variant='contained'
    >
      {children}
    </Button>
  );
};

export default UIButton;
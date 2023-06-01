import { Button } from '@mui/material';
import { ReactElement, ReactNode } from 'react';
import SendIcon from '@mui/icons-material/Send';

type UiButtonProps = {
  onClick: any;
  disabled?: boolean;
  type: 'submit' | 'send' | 'attach';
  children?: ReactNode;
};

type ButtonProperties = {
  variant: 'contained' | 'outlined' | 'text';
  color: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  icon?: ReactElement;
  sx?: any;
};

const UiButton: React.FC<UiButtonProps> = (props: UiButtonProps) => {
  let buttonProperties: ButtonProperties = {
    variant: 'contained',
    color: 'primary',
  };

  switch (props.type) {
    case 'submit':
      break;
    case 'send':
      buttonProperties.icon = <SendIcon />;
      buttonProperties.sx = {
        flexGrow: 0,
        flexBasis: '10%',
        minWidth: '80px',
        maxWidth: '150px',
      };
      break;
  }
  return (
    <Button
      onClick={props.onClick}
      variant={buttonProperties.variant}
      disabled={props.disabled}
      color={buttonProperties.color}
      endIcon={buttonProperties.icon}
      sx={buttonProperties.sx}
    >{props.children}</Button>
  );
};


export default UiButton;
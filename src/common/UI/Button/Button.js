import React from 'react';
import styles from './Button.module.scss';

const Button = ({ children, onClick, disabled, primary }) => (
  <button
    className={`${styles.button} ${primary ? styles.primary : styles.secondary}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
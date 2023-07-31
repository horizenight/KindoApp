import React from 'react';
import styles from './CardButton.module.css';

const CardButton = ({ className, children, onClick }) => {
  const classNames = `${styles.button} ${className ? styles[className] : ''}`;

  return (
    <button className={classNames} onClick={onClick}>
      {children}
    </button>
  );
};

export default CardButton;

import React from 'react';
import styles from './styles.module.css';

function Footer() {

  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <footer className={styles.footer}>

      <div>
        &copy; {getCurrentYear()} Enoca.
      </div>
    </footer>
  );
}

export default Footer;

"use client";
import React from 'react'
import Link from "next/link"
import styles from './styles.module.css'


function Header() {
  return (
    <header className={`${styles.header} container fluid`}>
      
       <div className={styles.headerWrapper}>
        <Link href='/' className={styles.logo}> Gökhan GÜLLER
                 </Link>
              
      </div>
     
    </header>
  )
}

export default Header;
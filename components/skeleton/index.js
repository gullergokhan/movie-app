import React from "react";
import styles from "./styles.module.css";
import customImage from "../../public/e2.PNG"; 
import Image from "next/image";


function Skeleton({ width, height }) {
  return (
    <div className={styles.skeleton} style={{ width, height }}>
          <Image src={customImage} alt="Custom Loading" width={200} height={220} />
    </div>
  );
}

export { Skeleton };

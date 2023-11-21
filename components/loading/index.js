import React from "react";
import styles from "./styles.module.css";
import customImage from "../../public/e1.PNG";
import Image from "next/image";

function Loading() {
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.loading}>
        <div className={styles.customImage}>
          <Image src={customImage} alt="Custom Loading" width={150} height={150} />
        </div>
      </div>
    </div>
  );
}

export { Loading };

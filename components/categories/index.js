import React from "react";
import Link from "next/link";
import DropdownMenu from "../categoriesMenu";
import styles from "./styles.module.css";

function Categories({ categories }) {
  const longCategories = categories.slice(5, categories.length)
  const shortCategories = categories.slice(0,5)
  
  return (
    <div className={styles.categories}>
    {shortCategories.map((cat) => (
        <Link
            key={cat.id}
            href={`/${cat.id}`}
            passHref
            className={styles.category}
        >
                {cat.name}
 </Link>
    ))}
    {longCategories.length > 0 && (
        <DropdownMenu categories={longCategories} />
    )}
</div>
  );
}

export { CategoriesLoading } from "./loading";
export { Categories };

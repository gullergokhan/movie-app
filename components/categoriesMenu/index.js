"use client";
import React, { useState } from 'react';
import styles from "./styles.module.css";
import { FaSignOutAlt } from 'react-icons/fa';

function DropdownMenu({ categories }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleCloseMenu = () => {
        setIsOpen(false);
    };

    return (
        <div className='relative'>
            <button onClick={handleMenuToggle} className={styles.category}>
                More Categories
            </button>
            {isOpen && (
                <div className={styles.dropdownMenu}>
                    {categories.map((cat) => (
                        <a key={cat.id} href={`/${cat.id}`} className={styles.category}>
                            {cat.name}
                        </a>
                    ))}
                    <button onClick={handleCloseMenu} className={styles.category}>
                       <FaSignOutAlt/>
                    </button>
                </div>
            )}
        </div>
    );
}

export default DropdownMenu;

import Link from 'next/link';
import React from 'react'
import styles from '../styles/Header.module.css';

const Header = () => {
    return (
        <div className={styles.header}>
            <h1>
                <Link href={"/"}>Employee Managment</Link>
            </h1>

            <ul className={styles.ul}>
                <li className={styles.li}><Link href={"/employees"}>Employees</Link></li>
                <li className={styles.li}><Link href={"/addEmployee"}>Add Employee</Link></li>
                <li className={styles.li}><Link href={"/about"}>About</Link></li>
                <li className={styles.li}><Link href={"/contact"}>Contact</Link></li>
            </ul>
        </div>
    )
}

export default Header;
import Search from "components/Search/Search";
import ThemeChanger from "components/ThemeChanger/ThemeChanger";
import Link from "next/link";
import React from "react";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <nav className={styles.header}>
      <Search />
      <ThemeChanger />
      <Link href="/">
        <a className={styles.header__main}>Home</a>
      </Link>
    </nav>
  );
};

export default Header;

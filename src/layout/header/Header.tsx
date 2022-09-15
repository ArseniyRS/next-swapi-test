import Link from "next/link";
import React from "react";
import Search from "~/components/search/Search";
import ThemeChanger from "~/components/themeChanger/ThemeChanger";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <nav className={styles.header}>
      <div className={`container ${styles.header__container}`}>
        <Search />
        <Link href="/">
          <a className={styles.header__home}>Home</a>
        </Link>
        <ThemeChanger />
      </div>
    </nav>
  );
};

export default Header;

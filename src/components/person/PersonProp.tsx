import Link from "next/link";
import React from "react";
import { getIdFromUrl } from "utils/getIdFromUrl";
import { isLink } from "utils/isLink";
import styles from "./Person.module.scss";
const PersonProp = ({ label, value }: { label: string; value: string | string[] }) => {
  function renderValue() {
    if (Array.isArray(value)) {
      return (
        <div className={styles.value__container}>
          {value.map((val, index) => (
            <Link key={index} href={`/${label}/${getIdFromUrl(val)}`}>
              <a className={styles.link}>Click</a>
            </Link>
          ))}
        </div>
      );
    }
    const valueStr = `${value}`;
    if (isLink(valueStr)) {
      return (
        <Link href={`/${label}/${getIdFromUrl(valueStr)}`}>
          <a className={styles.link}>Click</a>
        </Link>
      );
    }
    return <span className={styles.value}>{valueStr}</span>;
  }
  return (
    <div className={styles.row}>
      <span className={styles.label}>{label}</span>
      {renderValue()}
    </div>
  );
};

export default PersonProp;

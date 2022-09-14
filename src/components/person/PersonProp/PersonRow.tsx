import React from "react";
import { isLink } from "utils/isLink";
import styles from "../Person.module.scss";
import PersonProp from "./PersonProp";

const PersonRow = ({ label, value }: { label: string; value: string | string[] }) => {
  function renderValue() {
    if (Array.isArray(value)) {
      return (
        <div className={styles.value__container}>
          {value.map((val, index) => (
            <PersonProp key={index} value={val} isLink={isLink(val)} />
          ))}
        </div>
      );
    }
    return <PersonProp value={value} isLink={isLink(value)} />;
  }
  return (
    <div className={styles.row}>
      <span className={styles.label}>{label}</span>
      {renderValue()}
    </div>
  );
};

export default PersonRow;

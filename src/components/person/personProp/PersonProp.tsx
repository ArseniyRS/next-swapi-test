import React, { useState } from "react";
import PersonPropTooltip from "./PersonPropTooltip";
import styles from "../Person.module.scss";

const PersonProp = ({ value, isLink }: { value: string; isLink: boolean }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  return (
    <span className={styles.value}>
      {isLink ? (
        <span className={styles.link} onClick={handleShow}>
          {show ? <PersonPropTooltip url={value} /> : "Click"}
        </span>
      ) : (
        value
      )}
    </span>
  );
};

export default PersonProp;

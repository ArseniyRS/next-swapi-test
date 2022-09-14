import { useRouter } from "next/router";
import React from "react";
import { Person } from "~/interfaces/person.interface";
import { getIdFromUrl } from "~/utils/getIdFromUrl";
import styles from "./Person.module.scss";
import PersonProp from "./personProp/PersonRow";

const PersonCard = (data: Person) => {
  const router = useRouter();
  const { name, gender, mass, height } = data;
  const renderedPersonProps = Object.entries({ name, gender, mass, height }).map(
    ([propLabel, propValue]) => <PersonProp key={propLabel} label={propLabel} value={propValue} />,
  );
  const handleClick = () => router.push(`/people/${getIdFromUrl(data.url)}`);
  return (
    <div aria-hidden className={styles.card} onClick={handleClick}>
      {renderedPersonProps}
    </div>
  );
};

export default PersonCard;

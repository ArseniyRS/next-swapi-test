import React, { useContext } from "react";
import styles from "./Person.module.scss";
import { PersonVisitedContext } from "~/HOC/PersonVisited";
import PersonCard from "./PersonCard";

const PersonCardList = () => {
  const { visitedPersons } = useContext(PersonVisitedContext);
  const renderedVisitedPersons = visitedPersons.map((person) => (
    <PersonCard key={person.name} {...person} />
  ));
  return (
    <>
      <h2 className={styles.card__list_title}>viewed characters:</h2>
      <div className={styles.card__list}>
        {visitedPersons.length ? (
          renderedVisitedPersons
        ) : (
          <h4 className={styles.card__list_empty}>Empty</h4>
        )}
      </div>
    </>
  );
};

export default PersonCardList;

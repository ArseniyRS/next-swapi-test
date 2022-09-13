import { PersonVisitedContext } from "HOC/PersonVisited";
import React, { useContext } from "react";
import PersonCard from "./PersonCard";
import styles from "./Person.module.scss";

const PersonCardList = () => {
  const { visitedPersons } = useContext(PersonVisitedContext);
  console.log(visitedPersons);
  const renderedVisitedPersons = visitedPersons.map((person) => (
    <PersonCard key={person.name} {...person} />
  ));
  return (
    <div>
      <h2 className={styles.card__list_title}>viewed characters:</h2>
      <div className={styles.card__list}>
        {visitedPersons.length ? (
          renderedVisitedPersons
        ) : (
          <h4 className={styles.card__list_empty}>Empty</h4>
        )}
      </div>
    </div>
  );
};

export default PersonCardList;

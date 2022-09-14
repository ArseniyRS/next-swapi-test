import Link from "next/link";
import React from "react";
import { Person } from "~/interfaces/person.interface";
import { getIdFromUrl } from "~/utils/getIdFromUrl";
import styles from "./Search.module.scss";

function SearchSuggestions({ people }: { people: Person[] }) {
  const renderPeople = people.map((person, index) => (
    <Link key={index} href={`/people/${getIdFromUrl(person.url)}`}>
      <a className={styles.search__option}>
        <span className={styles.search__option_name}>{person.name}</span>
        <span className={styles.search__option_gender}>{person.gender}</span>
      </a>
    </Link>
  ));
  return <>{renderPeople}</>;
}

export default SearchSuggestions;

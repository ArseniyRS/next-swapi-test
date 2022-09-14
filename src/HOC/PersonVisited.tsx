import { Person } from "interfaces/person.interface";
import React, { createContext, PropsWithChildren, useEffect, useMemo, useState } from "react";

export const PersonVisitedContext = createContext<{
  visitedPersons: Person[];
  handlePersonVisited: (person: Person) => void;
}>({
  visitedPersons: [],
  handlePersonVisited: () => {},
});
type UniqueVisits = {
  [x: string]: Person;
};

const PersonVisited = ({ children }: PropsWithChildren<{}>) => {
  const [visitedPersons, setVisitedPersons] = useState<UniqueVisits>({});

  const handlePersonVisited = (person: Person) => {
    const newVisitedPersons = { ...visitedPersons, [person.name]: person };
    setVisitedPersons(newVisitedPersons);
    sessionStorage.setItem("persons", JSON.stringify(newVisitedPersons));
  };

  const getVisitedPersonsArray = () => {
    return Object.entries(visitedPersons).map(([_, value]) => value);
  };

  useEffect(() => {
    const persons = sessionStorage.getItem("persons");
    if (persons) {
      setVisitedPersons(JSON.parse(persons));
    }
  }, []);

  return (
    <PersonVisitedContext.Provider
      value={useMemo(
        () => ({
          visitedPersons: getVisitedPersonsArray(),
          handlePersonVisited,
        }),
        [visitedPersons],
      )}
    >
      {children}
    </PersonVisitedContext.Provider>
  );
};

export default PersonVisited;

import { Person } from "components/Search/Search";
import React, { createContext, PropsWithChildren, useMemo, useState } from "react";

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
    console.log(person);
    setVisitedPersons({ ...visitedPersons, [person.name]: person });
  };
  const getVisitedPersonsArray = () => {
    return Object.entries(visitedPersons).map(([_, value]) => value);
  };
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

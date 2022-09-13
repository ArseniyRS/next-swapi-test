import { useDebounce } from "hooks/useDebounce";
import React, { useEffect, useRef, useState } from "react";
import SearchSuggestions from "./SearchSuggestions";
import styles from "./Search.module.scss";
import { getPeopleBySearch } from "services";
import OutsideClickHandler from "react-outside-click-handler";

const Search = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedValue = useDebounce(searchValue);

  useEffect(() => {
    async function getSuggestions() {
      const response = await getPeopleBySearch(debouncedValue);
      setSuggestions(response.data.results);
    }
    if (showSuggestions) {
      getSuggestions();
    }
  }, [debouncedValue, showSuggestions]);
  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }
  return (
    <div className={styles.search__wrapper}>
      <OutsideClickHandler onOutsideClick={() => setShowSuggestions(false)}>
        <input
          onFocus={() => setShowSuggestions(true)}
          className={styles.search__input}
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Search by name"
        />
        {Boolean(showSuggestions && suggestions.length) && (
          <SearchSuggestions people={suggestions} />
        )}
      </OutsideClickHandler>
    </div>
  );
};

export default Search;

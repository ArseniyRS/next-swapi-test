import { useDebounce } from "hooks/useDebounce";
import React, { useEffect, useState } from "react";
import SearchSuggestions from "./SearchSuggestions";
import styles from "./Search.module.scss";
import { getPeopleBySearch, getByUrl } from "services/service";
import OutsideClickHandler from "react-outside-click-handler";
import InfiniteScroll from "react-infinite-scroll-component";
import { Person } from "interfaces/person.interface";
import { Response } from "interfaces/response.interface";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [lastSearchValue, setLastSearchValue] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<Response<Person[]> | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedValue = useDebounce(searchValue);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getSuggestions() {
      setIsLoading(true);
      const response = await getPeopleBySearch(debouncedValue);
      setSuggestions(response.data);
      setIsLoading(false);
    }
    if (showSuggestions && debouncedValue !== lastSearchValue) {
      getSuggestions();
      setLastSearchValue(debouncedValue);
    }
  }, [debouncedValue, showSuggestions]);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  async function handleScroll() {
    if (suggestions && suggestions.next) {
      const response = await getByUrl(suggestions.next);
      setSuggestions({
        ...response.data,
        results: [...suggestions.results, ...response.data.results],
      });
    }
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
          placeholder={isLoading ? "Loading..." : "Search by name"}
        />
        {showSuggestions && suggestions && suggestions.results.length && (
          <InfiniteScroll
            className={styles.search__suggestions}
            height={400}
            dataLength={suggestions.results.length}
            next={handleScroll}
            hasMore={suggestions.results.length < suggestions.count}
            loader={<h4>Loading...</h4>}
          >
            <SearchSuggestions people={suggestions.results} />
          </InfiniteScroll>
        )}
      </OutsideClickHandler>
    </div>
  );
};

export default Search;

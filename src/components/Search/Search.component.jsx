import React from "react";
import FormInput from "../FormInput/FormInput.component";
import SearchContainer from "./Search.styles";

const Search = ({ searchValue, handleSearchInputChange }) => {
  return (
    <SearchContainer>
      <form>
        <FormInput
          type="search"
          onChange={handleSearchInputChange}
          value={searchValue}
          label="search"
          name="search"
        />
      </form>
    </SearchContainer>
  );
};

export default Search;

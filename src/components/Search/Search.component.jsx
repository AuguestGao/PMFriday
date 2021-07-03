import React from "react";

import FormInput from "../FormInput/FormInput.component";

import SearchContainer from "./Search.styles";

const Search = ({ searchValue, handleChange }) => {
  return (
    <SearchContainer>
      <form>
        <FormInput
          type="search"
          handleChange={handleChange}
          value={searchValue}
          label="search"
          name="search"
        />
      </form>
    </SearchContainer>
  );
};

export default Search;

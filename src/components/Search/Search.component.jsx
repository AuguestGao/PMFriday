import React from "react";
import FormInput from "../FormInput/FormInput.component";

const Search = ({ searchValue, handleSearchInputChange }) => {
  return (
    <form>
      <FormInput
        type="search"
        onChange={handleSearchInputChange}
        value={searchValue}
        label="search"
        name="search"
      />
    </form>
  );
};

export default Search;

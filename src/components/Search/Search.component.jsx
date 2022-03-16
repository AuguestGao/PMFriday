import React from "react";
import { FormInput } from "../";

export const Search = ({ searchValue, handleSearchInputChange }) => {
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

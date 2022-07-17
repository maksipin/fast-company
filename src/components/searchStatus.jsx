import React from "react";

const SearchStatus = ({ length }) => {
  const people =
    length === 1 || length > 4 ? "человек тусанет" : "человека тусанут";
  return length > 0 ? (
    <h2>
      <span class="badge bg-primary m-2">
        {length} {people} с тобой сегодня
      </span>
    </h2>
  ) : undefined;
};

export default SearchStatus;

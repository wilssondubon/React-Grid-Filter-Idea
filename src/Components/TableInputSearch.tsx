import React, { useState, useEffect } from "react";
import { FilterState } from "../Hooks";

interface IProps extends React.HTMLAttributes<HTMLInputElement> {
  Filter: FilterState;
  DataField: string;
  style?: React.CSSProperties | undefined;
  className?: string | undefined;
  placeholder?: string | undefined;
}

export const TableInputSearch: React.FC<IProps> = (props) => {
  const [searchValue, setSearchValue] = useState<string>();

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    props.Filter.AddFilter(props.DataField, e.target.value);
  };

  useEffect(() => {
    const { Filters } = props.Filter;

    if (Filters && Filters.length > 0) {
      const thisFilterIndex = Filters.findIndex(
        (f) => f.SearchField === props.DataField
      );

      if (thisFilterIndex === -1) {
        setSearchValue("");
      }
    } else {
      setSearchValue("");
    }
  }, [props.Filter.Filters]);

  return (
    <td>
      <input
        className={props.className}
        type="search"
        placeholder={props.placeholder || "Search..."}
        aria-label="Search"
        style={props.style}
        onChange={(e) => changeValue(e)}
        value={searchValue || ""}
      ></input>
    </td>
  );
};

import React, { useState, useEffect } from "react";
import { FilterState } from "../Hooks";

interface IProps extends React.HTMLAttributes<HTMLInputElement> {
  Filter: FilterState;
  DataField: string;
  style?: React.CSSProperties | undefined;
  className?: string | undefined;
  title?: string | undefined;
}

export const TableSelectSearch: React.FC<IProps> = (props) => {
  const [isMuted, setisMuted] = useState<Boolean>(true);
  const [searchValue, setSearchValue] = useState<string>();

  const changeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchValue(e.target.value);

    if (e.target.value === "") {
      setisMuted(true);
      props.Filter.RemoveFilter(props.DataField);
    } else {
      setisMuted(false);
      props.Filter.AddFilter(props.DataField, e.target.value);
    }
  };

  useEffect(() => {
    const { Filters } = props.Filter;

    if (Filters && Filters.length > 0) {
      const thisFilterIndex = Filters.findIndex(
        (f) => f.SearchField === props.DataField
      );

      if (thisFilterIndex === -1) {
        setSearchValue("");
        setisMuted(true);
      }
    } else {
      setSearchValue("");
      setisMuted(true);
    }
  }, [props.Filter.Filters]);

  return (
    <td>
      <form style={{ position: "relative" }}>
        <select
          className={props.className}
          title={props.title}
          aria-label="Search"
          value={searchValue}
          onChange={(e) => changeValue(e)}
        >
          <option value="">{props.title}</option>
          {props.children}
        </select>
      </form>
    </td>
  );
};

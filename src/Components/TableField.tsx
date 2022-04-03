import React, { useState, useEffect, useContext, createContext } from "react";
import { Sort, DataSortType } from "../Hooks";

interface IProps extends React.HTMLAttributes<HTMLTableCellElement> {
  Header: String;
  DataField: string;
  DataFieldType?: String;
  className?: string | undefined;
}

export interface ISortContext {
  Sort: Sort;
}

export const SortContext = createContext<ISortContext>({
  Sort: {
    SortEvent: (
      datasort: string,
      dir: boolean | undefined,
      datasortType: String
    ) => null,
    SortItem: "",
    SortDir: undefined
  }
});

export const TableField: React.FC<IProps> = (props) => {
  const sortContext = useContext<ISortContext>(SortContext);
  const { SortEvent, SortItem } = sortContext.Sort;

  const [dir, setdir] = useState<boolean | undefined>();

  const handleSort = () => {
    let direccion = dir;

    if (direccion === undefined) {
      direccion = false;
    }

    if (props.DataField === SortItem) {
      setdir(!direccion);
      SortEvent(
        props.DataField,
        !direccion,
        props.DataFieldType || DataSortType._string
      );
    } else {
      setdir(true);
      SortEvent(
        props.DataField,
        true,
        props.DataFieldType || DataSortType._string
      );
    }
  };

  useEffect(() => {
    if (SortItem === "") {
      setdir(undefined);
    }
  }, [SortItem]);

  return (
    <th
      data-sort={props.DataField}
      onClick={handleSort}
      className={
        props.DataField === SortItem
          ? props.className + (dir ? " desc" : " asc")
          : props.className || "" + " nosort"
      }
      data-sort-item={SortItem}
    >
      {props.Header}
    </th>
  );
};

import React, { useState, useEffect } from "react";
import { UseFilter, FilterState } from ".";

export enum DataSortType {
  _string = "string",
  _date = "date",
  _number = "number",
  _bool = "bool"
}

export enum DataSortDirection {
  _desc = " desc",
  _asc = " asc"
}

export interface Sort {
  SortEvent: (
    datasort: string,
    dir: boolean | undefined,
    datasortType: String
  ) => void;
  SortItem: string;
  SortDir: boolean | undefined;
}

interface TableState {
  Names: String;
  Items: Array<any>;
  Refresh: (newTable: Array<any>) => void;
  ClearSettings: () => void;
  Sort: Sort;
  Filter: FilterState;
}

type useTableHook = (
  tabla: Array<any>,
  dataDependency: Array<any>
) => TableState;

export const UseTable: useTableHook = (
  tabla: Array<any>,
  dataDependency: Array<any>
) => {
  const [myTable, setmyTable] = useState<Array<any>>(tabla);
  const [myKeys, setmyKeys] = useState<String>("");

  const [dataSort, setdataSort] = useState<string>("");
  const [direction, setdirection] = useState<boolean>();
  const [dataSortType, setdataSortType] = useState<String>();
  const [isSorted, setisSorted] = useState<Boolean>(false);
  const [wasSortedJet, setwasSortedJet] = useState<Boolean>(false);

  const [isFilter, setisFilter] = useState<Boolean>(false);
  const myFilter = UseFilter();

  if (tabla && tabla.length > 0) {
    console.log(JSON.stringify({ valueNames: [Object.keys(tabla[0])] }));
    setmyKeys(JSON.stringify({ valueNames: [Object.keys(tabla[0])] }));
  }

  const _sort = (
    datasort: string,
    dir: boolean | undefined,
    datasortType: String = DataSortType._string
  ) => {
    setdataSort(datasort);
    setdirection(dir);
    setdataSortType(datasortType);

    const table = [...myFilter.FilterData];

    let ordertable: Array<any> = [];

    if (datasortType === DataSortType._string) {
      ordertable = table.sort((a, b) => {
        let fa = a[datasort].toLowerCase(),
          fb = b[datasort].toLowerCase();
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
    }
    if (datasortType === DataSortType._date) {
      ordertable = table.sort((a, b) => {
        let da: Date = new Date(a[datasort]),
          db: Date = new Date(b[datasort]);
        return da.valueOf() - db.valueOf();
      });
    }
    if (datasortType === DataSortType._number) {
      ordertable = table.sort((a, b) => {
        return a[datasort] - b[datasort];
      });
    }
    if (datasortType === DataSortType._bool) {
      ordertable = table.sort(function (a, b) {
        return Number(a[datasort]) - Number(b[datasort]);
      });
    }

    setisSorted(true);
    setwasSortedJet(true);

    if (dir) {
      myFilter.UpdateFilterData(ordertable);
    } else if (!dir) {
      myFilter.UpdateFilterData(ordertable.reverse());
    } else {
      myFilter.UpdateFilterData(ordertable);
    }
  };

  const _refresh = (newTable: Array<any>) => {
    setmyTable(newTable);
    setwasSortedJet(false);
  };

  const _clearSettings = () => {
    myFilter.ClearFilters();
    setdataSort("");
    setdirection(undefined);
    setdataSortType("");
  };

  useEffect(() => {
    if (dataDependency) {
      _refresh(dataDependency);
    }
  }, [dataDependency]);

  useEffect(() => {
    if (myTable && myTable.length > 0) {
      setmyKeys(JSON.stringify({ valueNames: [Object.keys(myTable[0])] }));
    }

    if (isSorted === true && wasSortedJet === false) {
      _sort(dataSort, direction, dataSortType);
    }

    myFilter.RefreshData(myTable);
  }, [myTable]);

  useEffect(() => {
    if (myFilter.Filters && myFilter.Filters.length > 0) {
      setisFilter(true);
    } else {
      setisFilter(false);
      setdataSort("");
      setdirection(undefined);
      setdataSortType("");
    }

    myFilter.ApplyFilters();
  }, [myFilter.Filters]);

  return {
    Names: JSON.stringify(myKeys),
    Items: myFilter.FilterData,
    Refresh: _refresh,
    ClearSettings: _clearSettings,
    Sort: {
      SortEvent: _sort,
      SortItem: dataSort,
      SortDir: direction
    },
    Filter: myFilter
  };
};

import React, { useState, useEffect } from "react";

interface Filter {
  SearchField: string;
  Value: String;
}

export interface FilterState {
  AddFilter: (searchfield: string, value: String) => void;
  RemoveFilter: (searchfield: string) => void;
  ApplyFilters: () => void;
  ClearFilters: () => void;
  RefreshData: (Data: Array<any>) => void;
  UpdateFilterData: (Data: Array<any>) => void;
  Data: Array<any>;
  FilterData: Array<any>;
  Filters: Array<Filter>;
}

type useFilterHook = () => FilterState;

export const UseFilter: useFilterHook = () => {
  const [data, setdata] = useState<Array<any>>([]);
  const [filterData, setfilterData] = useState<Array<any>>([]);
  const [filters, setfilters] = useState<Array<Filter>>([]);

  const _addFilter = (searchfield: string, value: String) => {
    let myfilters = [...filters];

    if (!(value && value !== "")) {
      if (filters && filters.length > 0) {
        const filterexistIndex = myfilters.findIndex(
          (f) => f.SearchField === searchfield
        );

        if (filterexistIndex !== -1) {
          myfilters.splice(filterexistIndex, 1);
        }
      }
    } else {
      if (filters && filters.length > 0) {
        const filterexistIndex = myfilters.findIndex(
          (f) => f.SearchField === searchfield
        );

        if (filterexistIndex !== -1) {
          myfilters[filterexistIndex] = {
            SearchField: searchfield,
            Value: value
          };
        } else {
          myfilters.push({ SearchField: searchfield, Value: value });
        }
      } else {
        myfilters = [{ SearchField: searchfield, Value: value }];
      }
    }
    setfilters(myfilters);
  };

  const _removefilter = (searchfield: string) => {
    let myfilters = [...filters];

    if (filters && filters.length > 0) {
      const filterexistIndex = myfilters.findIndex(
        (f) => f.SearchField === searchfield
      );

      if (filterexistIndex !== -1) {
        myfilters.splice(filterexistIndex, 1);
      }
    }
    setfilters(myfilters);
  };

  const _applyfilters = () => {
    let mydata = [...data];

    if (filters && filters.length > 0) {
      if (mydata && mydata.length > 0) {
        for (let filter of filters) {
          const containsValue = (record: any) => {
            const myvalues = String(
              record[filter.SearchField]
            ).toLocaleLowerCase();
            const value = String(filter.Value).toLocaleLowerCase();
            return myvalues.includes(value);
          };

          mydata = mydata.filter(containsValue);
        }
      }
    }

    setfilterData(mydata);
  };

  const _clearfilters = () => {
    setfilters([]);
  };

  const _setData = (Data: Array<any> = []) => {
    setdata(Data);
    setfilterData(Data);
  };

  const _updateFilterData = (Data: Array<any> = []) => {
    setfilterData(Data);
  };

  useEffect(() => {
    if (filters && filters.length > 0) {
      if (data && data.length > 0) {
        _applyfilters();
      }
    }
  }, [data]);

  return {
    AddFilter: _addFilter,
    RemoveFilter: _removefilter,
    ApplyFilters: _applyfilters,
    ClearFilters: _clearfilters,
    RefreshData: _setData,
    UpdateFilterData: _updateFilterData,
    Data: data,
    FilterData: filterData,
    Filters: filters
  };
};

import React, { useCallback, useEffect, useState } from "react";
import "./DataTable.css";

export let handleGetData;
const DataTable = () => {
  // states
  const [initialData, setInitialData] = useState([]);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [showdata, setShowData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDatas, setFilterDatas] = useState({
    sortBy: "- -",
    filter: "all",
  });

  // handle get data from server
  handleGetData = () => {
    fetch(`${process.env.REACT_APP_API_KEY}/employees_data.json`)
      .then((res) => res.json())
      .then((data) => {
        // data is an object so converting in an array with adding id in it
        let dataArr = [];
        for (const id in data) {
          dataArr.push({
            ...data[id],
            id,
          });
        }

        setInitialData(dataArr);
        setShowData(dataArr);
      });
  };

  useEffect(() => {
    handleGetData();
  }, []);

  // handle Search
  const handleSearchData = useCallback(() => {
    return initialData.filter((data) =>
      data.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, initialData]);

  // hanlde filters
  const handleFilters = (searched = searchQuery, filtered = filterDatas) => {
    // search
    let filteredData;
    if (searched === "") {
      filteredData = initialData;
    } else {
      filteredData = handleSearchData();
    }

    // filter & sort the searched data
    const { sortBy, filter } = filtered;
    if (filter === "lessThanEqual10k") {
      //filter
      filteredData = filteredData.filter(
        (data) => parseInt(data.salary) <= 10000
      );
    } else if (filter === "greaterThan10k") {
      filteredData = filteredData.filter(
        (data) => parseInt(data.salary) > 10000
      );
    }

    if (sortBy === "name") {
      //sort
      filteredData = filteredData.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
    } else if (sortBy === "salary") {
      filteredData = filteredData.sort((a, b) => a.salary - b.salary);
    }

    setShowData(filteredData);
  };

  // clear search
  const clearSearch = () => {
    setSearchQuery("");
    handleFilters("", filterDatas);
  };

  // clear filter
  const clearFilter = () => {
    setFilterDatas({
      sortBy: "- -",
      filter: "all",
    });

    handleFilters(searchQuery, {
      sortBy: "- -",
      filter: "all",
    });

    setShowFilterOptions(false)
  };

  const toggleFilterOptions = () => {
    setShowFilterOptions(!showFilterOptions);
  };

  return (
    <div className="data-table">
      <div className="table-header">
        <h2 className="table-heading">Data Table</h2>
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search by name.."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "300px" }}
          />
          <button className="search-button" onClick={handleFilters}>
            Search
          </button>
          <button className="search-button" onClick={clearSearch}>
            Clear
          </button>
          <button className="filter-button" onClick={toggleFilterOptions}>
            <span className="material-symbols-outlined">tune</span>
          </button>
        </div>
      </div>
      {showFilterOptions && (
        <div className="filter-popup">
          <div className="filter-row">
            <div className="filter-section">
              <h3 className="sortByHeading">Sort By : </h3>
              <select
                value={filterDatas.sortBy}
                onChange={(e) =>
                  setFilterDatas({ ...filterDatas, sortBy: e.target.value })
                }
              >
                <option value="- -">- -</option>
                <option value="name">Name</option>
                <option value="salary">Salary</option>
              </select>
            </div>
            <div className="filter-section">
              <h3 className="filterHeading">Filter : </h3>
              <select
                value={filterDatas.filter}
                onChange={(e) =>
                  setFilterDatas({ ...filterDatas, filter: e.target.value })
                }
              >
                <option value="all">All</option>
                <option value="lessThanEqual10k">Less than or equal 10k</option>
                <option value="greaterThan10k">Greater than 10k</option>
              </select>
            </div>
            <div className="button-container">
              <button className="apply-button" onClick={handleFilters}>
                Apply
              </button>
              <button className="clear-button" onClick={clearFilter}>
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {showdata?.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>₹ {item.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;

import { useState, useEffect } from "react";

export default function Filter({ dataList, filter, onFilter }) {
  const [filters, setFilters] = useState(filter);

  const handleOnGenderChange = (e) => {
    let value = e.target.value;

    if (value === "select") {
      value = "";
    }

    setFilters({
      ...filters,
      gender: value,
    });
  };
  const handleOnAgeChange = (e) => {
    let value = e.target.value;

    if (value === "select") {
      value = "";
    }

    setFilters({
      ...filters,
      age: value,
    });
  };
  const handleOnSearchChange = (e) => {
    setFilters({
      ...filters,
      searchedText: e.target.value.toLowerCase(),
    });
  };

  const handleOnSortChange = (e) => {
    let value = e.target.value;

    if (value === "select") {
      value = "";
    }

    setFilters({
      ...filters,
      sort: value,
    });
  };

  useEffect(() => {
    setFilters(filter);
  }, [filter]);

  useEffect(() => {
    if (!dataList) return;
    const { age, gender, searchedText } = filters;

    let filteredList = dataList.filter((item) => {
      return (
        (!gender || item.gender.toLowerCase() === gender) &&
        (!age ||
          (age === "30" && item.age >= 18 && item.age <= 30) ||
          (age === "45" && item.age >= 31 && item.age <= 45) ||
          (age === "46" && item.age > 45)) &&
        (!searchedText ||
          item.patient_id?.toString().startsWith(searchedText) ||
          item.email?.startsWith(searchedText) ||
          item.first_name?.toLowerCase().startsWith(searchedText) ||
          item.last_name?.toLowerCase().startsWith(searchedText))
      );
    });

    if (filters.sort === "ascending") {
      filteredList.sort((a, b) => a.first_name.localeCompare(b.first_name));
    } else if (filters.sort === "decending") {
      filteredList.sort((a, b) => b.first_name.localeCompare(a.first_name));
    }

    onFilter(filters, filteredList);
  }, [filters]);

  return (
    <div>
      <div>
        <label>Search:</label>
        <input
          onChange={handleOnSearchChange}
          type="search"
          name="csearch"
          id="csearch"
          placeholder="Enter"
          value={filter.searchedText}
        />
      </div>
      <div>
        <label for="gender">Sex:</label>
        <select onChange={handleOnGenderChange} name="cgender" id="cgender">
          <option selected={filter.gender === ""} value="select">
            Select
          </option>
          <option selected={filter.gender === "male"} value="male">
            Male
          </option>
          <option selected={filter.gender === "female"} value="female">
            Female
          </option>
        </select>
      </div>
      <div>
        <label for="gender">Age:</label>
        <select onChange={handleOnAgeChange} name="cage" id="cage">
          <option selected={filter.age === ""} value="select">
            Select
          </option>
          <option selected={filter.age === "30"} value="30">
            18 - 30
          </option>
          <option selected={filter.age === "45"} value="45">
            31 - 45
          </option>
          <option selected={filter.age === "46"} value="46">
            {" "}
            `&gt;` 45
          </option>
        </select>
      </div>
      <div>
        <label for="gender">Sort:</label>
        <select onChange={handleOnSortChange} name="csort" id="csort">
          <option selected={filter.sort === ""} value="select">
            Select
          </option>
          <option selected={filter.sort === "ascending"} value="ascending">
            Ascending
          </option>
          <option selected={filter.sort === "decending"} value="decending">
            Decending
          </option>
        </select>
      </div>
    </div>
  );
}

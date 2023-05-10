import React, { useState } from "react";
import Property from "./Property";
import AddProperty from "./AddProperty";
import FilterProperties from "./FilterProperties";

function Booking() {
  const bookingComponent = [
    {
      title: "Book a house tour to find your dream place!",
    },
  ];
  const defaultProperties = [
    {
      id: 1,
      imgSource: "assets/house 1.jpg",
      bedsCount: "4",
      address: "10115 Bridlevale Dr",
      description:
        "With ample natural light and breathtaking views of the surrounding landscape, this is an opportunity to own a truly exceptionaltton property in a prime location.",
      price: "53000",
    },
    {
      id: 2,
      imgSource: "assets/house 2.jpg",
      bedsCount: "3",
      address: "616 N Beverly Dr",
      description:
        "With high end finishes, and state of the art technology, this stunning home offers the perfect blend of luxury and functionality",
      price: "490000",
    },
    {
      id: 3,
      imgSource: "assets/house 3.jpg",
      bedsCount: "4",
      address: "1219 Sunset Plaza Dr",
      description:
        "Enjoy spacious, light-filled rooms that flow seamlessly together, creating an environment that is both inviting and awe inspiring.",
      price: "570000",
    },
    {
      id: 4,
      imgSource: "assets/house 4.jpg",
      bedsCount: "3",
      address: "8824 Hollywood Blvd",
      description:
        "This breathtaking modern house for sale boasts an open concept layout, sleek finishes, and expansive windows that offer stunning views of the surrounding landscape",
      price: "475000",
    },
  ];

  const [properties, setProperties] = useState(defaultProperties);

  const dispProperty = () => {};

  //FILTER BY NUMBER OF BEDS

  function onFilterValueSelected(filterValue) {
    updateSelectFilter(filterValue);
  }

  let [selectFilterValue, updateSelectFilter] = useState("all");

  let selectFilteredProperties = properties.filter((property) => {
    if (selectFilterValue === "1") {
      return property.bedsCount === "1";
    } else if (selectFilterValue === "2") {
      return property.bedsCount === "2";
    } else if (selectFilterValue === "3") {
      return property.bedsCount === "3";
    } else if (selectFilterValue === "4") {
      return property.bedsCount === "4";
    } else {
      return property;
    }
  });

  //FILTER BY ADDRESS OR DESCRIPTION

  const onInputFilterChange = (e) => {
    updateInputFilter(e.target.value);
  };

  const [inputFilterValue, updateInputFilter] = useState("");

  const InputFilreredProperties = properties.filter((property) => {
    if (inputFilterValue.toLowerCase() === "") {
      return property;
    } else if (property.address.toLowerCase().includes(inputFilterValue)) {
      return property.address.toLowerCase().includes(inputFilterValue);
    } else if (property.description.toLowerCase().includes(inputFilterValue)) {
      return property.description.toLowerCase().includes(inputFilterValue);
    }
  });

  // INSERTION OF BOTH FILTERS

  const filteredProperties = InputFilreredProperties.filter((value) =>
    selectFilteredProperties.includes(value)
  );

  const handleAddProperty = (newProperty) => {
    setProperties((prevState) => [...prevState, newProperty]);
  };

  const [sortOption, setSortOption] = useState("bestMatch");

  //DZIAŁA TO :)
  const lowestFirstSort = [...properties].sort((property1, property2) => {
    property1 = property1.price;
    property2 = property2.price;

    if (property1 < property2) {
      return -1;
    }
    if (property1 > property2) {
      return 1;
    }
    return 0;
  });

  // INSERTION OF FILTERS AND LOWEST FIRST

  const filteredLowestSortedProperties = lowestFirstSort.filter((value) =>
    filteredProperties.includes(value)
  );

  const highestFirstSort = [...properties].sort((property1, property2) => {
    property1 = property1.price;
    property2 = property2.price;

    if (property1 > property2) {
      return -1;
    }
    if (property1 < property2) {
      return 1;
    }
    return 0;
  });

  // INSERTION OF FILTERS AND HIGHEST FIRST

  //

  const filteredHighestSortedProperties = highestFirstSort.filter((value) =>
    filteredProperties.includes(value)
  );

  const propertiesListDisplay = properties.map((p) => (
    <Property property={p} />
  ));

  const filteredPropertiesDisplay = filteredProperties.map((p) => (
    <Property property={p} />
  ));

  const lowestFirstSortedPropertiesDisplay = filteredLowestSortedProperties.map(
    (p) => <Property property={p} />
  );

  const highestFirstSortedDisplay = filteredHighestSortedProperties.map((p) => (
    <Property property={p} />
  ));

  const bookingComponentDisplay = bookingComponent.map((b) => (
    <div>
      <section id="house-tours" className="booking-section">
        <section className="booking-section-title">
          <h3>{b.title}</h3>
        </section>
        <div className="filter-area">
          <input
            className="filter-input"
            onChange={onInputFilterChange}
            placeholder="type to filter properties"
          ></input>
          <FilterProperties filterValueSelected={onFilterValueSelected} />
          <select
            className="bedrooms-list filter-select"
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
          >
            <option value="bestMatch">best match</option>
            <option value="lowestFirst">price (lowest first)</option>
            <option value="highestFirst">price (highest first)</option>
          </select>
        </div>
        <section className="house-section">
          {sortOption === "bestMatch"
            ? filteredPropertiesDisplay
            : sortOption === "lowestFirst"
            ? lowestFirstSortedPropertiesDisplay
            : sortOption === "highestFirst"
            ? highestFirstSortedDisplay
            : filteredPropertiesDisplay}
        </section>
      </section>
      <AddProperty onAddProperty={handleAddProperty} />
    </div>
  ));

  return <>{bookingComponentDisplay}</>;
}

export default Booking;

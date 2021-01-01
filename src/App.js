import React from 'react';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import './App.css'
import { useState, useEffect } from 'react';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            code: country.countryInfo._id,
            name: country.country,
            value: country.countryInfo.iso2
          }));

        setCountries(countries);
      });
    };
    getCountriesData();
  },[]);

  //https://disease.sh/v3/covid-19/countries

  return (
    <div className="App">
      <div className="app_header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select
          variant="outlined"
          value={country}>
          <MenuItem value="Worldwide">Worldwide</MenuItem>
          {
            countries.map((country) => (
              <MenuItem key={country.code} value={country.value}>{country.name}</MenuItem>
            ))
          }
          </Select>
        </FormControl>
      </div>
      
      {/* Header */}
      {/* Title */}
      {/* InfoBoxs */}
      {/* InfoBoxs */}
      {/* InfoBoxs */}
      {/* Table */}
      {/* Graph */}
      {/* Map */}
    </div>
  );
}

export default App;
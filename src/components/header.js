import React from 'react'
import { FormControl, Select, MenuItem } from '@material-ui/core'
import { useState, useEffect } from 'react';

function Header() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("Worlwide");
    const [countryInfo, setCountryInfo] = useState({});

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

    const onCountryChange = async (event) => {
        const countryCode = event.target.value;

        const url = 
          countryCode === 'Worldwide' 
            ? 'https://disease.sh/v3/covid-19/all'
            : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
        
        await fetch(url)
        .then(response => response.json())
        .then(data => {
          setCountry(countryCode);
          //All of the data from the country response
          setCountryInfo(data);
        });
    };

    console.log("CountryInfo >>>", countryInfo);

    return (
        <div className="app__header">
            <h1>COVID-19 TRACKER</h1>
            <FormControl className="app__dropdown">
                <Select
                    variant="outlined"
                    onChange={onCountryChange}
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
    )
}

export default Header;
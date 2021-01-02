import React from 'react';
import './App.css'
import { useState, useEffect } from 'react';
import Header from './components/header';
import Map from './components/Map';
import { Card, CardContent } from '@material-ui/core';
import Table from './components/Table';
import { sortData } from './util';

function App() {
  const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("worlwide");
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
      fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      })
    }, []);

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

            const sortedData = sortData(data);
            setTableData(sortedData);
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

  return (
    <div className="app">
      <div className="app__left">
        <Header onCountryChange={onCountryChange} country={country} countries={countries} countryInfo={countryInfo}></Header>

        <Map/>
      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData}/>
          <h3>Worldwide new cases</h3>
          {/* Graph */}
        </CardContent>
      </Card>
      
    </div>
  );
}

export default App;
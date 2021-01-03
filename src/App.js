import React,{ useState, useEffect } from 'react';
import { Card, CardContent } from '@material-ui/core';
import { sortData } from './util';
import Header from './components/header';
import Map from './components/Map';
import Table from './components/Table';
import LineGraph from './components/LineGraph';
import './App.css'

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worlwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
    /* https://disease.sh/v3/covid-19/all */
    useEffect(() => {
      fetch('')
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      })
    }, []);

    /* https://disease.sh/v3/covid-19/countries */
    useEffect(() => {
        const getCountriesData = async () => {
          await fetch("")
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

        /* 
            https://disease.sh/v3/covid-19/all
            https://disease.sh/v3/covid-19/countries/${countryCode}
        */
        const url = 
          countryCode === 'Worldwide' 
            ? ''
            : ``;
        
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
          <LineGraph/>
        </CardContent>
      </Card>
      
    </div>
  );
}

export default App;
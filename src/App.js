import React,{ useState, useEffect } from 'react';
import { Card, CardContent } from '@material-ui/core';
import { sortData } from './util';
import Header from './components/header';
import Map from './components/Map';
import Table from './components/Table';
import LineGraph from './components/LineGraph';
import './App.css'
import "leaflet/dist/leaflet.css"

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worlwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat: 34.80746, lng: -40.4796});
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
    /* https://disease.sh/v3/covid-19/all */
    useEffect(() => {
      fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      })
    }, []);

    /* https://disease.sh/v3/covid-19/countries */
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
            setMapCountries(data);
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
            ? 'https://disease.sh/v3/covid-19/all'
            : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
        
        await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setCountry(countryCode);
          //All of the data from the country response
          setCountryInfo(data);
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(4);
        });
    };

  return (
    <div className="app">
      <div className="app__left">
        <Header onCountryChange={onCountryChange} country={country} countries={countries} countryInfo={countryInfo}></Header>
        <Map countries={mapCountries} center={mapCenter} zoom={mapZoom}/>
      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData}/>
          <h3>Worldwide new cases</h3>
          <LineGraph/>
        </CardContent>
      </Card>
      
    </div>
  );
}

export default App;
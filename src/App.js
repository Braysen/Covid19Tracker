import React,{ useState, useEffect } from 'react';
import { Card, CardContent } from '@material-ui/core';
import { sortData } from './util';
import Header from './components/header';
import Map from './components/Map';
import Table from './components/Table';
import LineGraph from './components/LineGraph';
import './App.css'
import "leaflet/dist/leaflet.css"
import { prettyPrintStat } from './util';
import InfoBox from './components/infoBox'

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worlwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat: 34.80746, lng: -40.4796});
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
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
          countryCode === 'worldwide' 
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
    //console.log(casesType);

  return (
    <div className="app">
      <div className="app__left">
        <Header
          onCountryChange={onCountryChange}
          country={country}
          countries={countries}
          countryInfo={countryInfo}
        ></Header>
        <div className="app__stats">
          <InfoBox
            isRed
            active={casesType === 'cases'}
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            cases= {prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)}/>
          <InfoBox
            active={casesType === 'recovered'}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases= {prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)}
            />
          <InfoBox
            isRed
            active={casesType === 'deaths'}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases= {prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)}
            />
        </div>
        <Map          
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
          />
      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData}/>
          <h3 className="app__graphTitle">Worldwide new {casesType}</h3>
          <LineGraph className="app__graph" casesType={casesType}/>
        </CardContent>
      </Card>
      
    </div>
  );
}

export default App;
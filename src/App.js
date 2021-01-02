import React from 'react';
import './App.css'
import Header from './components/header';
import InfoBox from './components/infoBox';
import Map from './components/Map';
import { Card, CardContent } from '@material-ui/core';

function App() {

  return (
    <div className="app">
      <div className="app__left">
        <Header></Header>

        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases= {123} total={2000}/>
          <InfoBox title="Recovered" cases= {1234} total={3000}/>
          <InfoBox title="Deaths" cases= {12345} total={4000}/>
        </div>

        <Map/>
      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* Table */}
          <h3>Worldwide new cases</h3>
          {/* Graph */}
        </CardContent>
      </Card>
      
    </div>
  );
}

export default App;
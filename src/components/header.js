import React from 'react'
import { FormControl, Select, MenuItem } from '@material-ui/core'
import InfoBox from './infoBox';

function Header({onCountryChange, country, countries, countryInfo}) {

    return (
      <>
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

        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases= {countryInfo.todayCases} total={countryInfo.cases}/>
          <InfoBox title="Recovered" cases= {countryInfo.todayRecovered} total={countryInfo.recovered}/>
          <InfoBox title="Deaths" cases= {countryInfo.todayDeaths} total={countryInfo.deaths}/>
        </div>
      </>
    )
}

export default Header;
import React from "react";
interface State{
location: string
isLoading:boolean
displayLocation:string
weather: {
  weathercode: string
  temperature_2m_max: Array<number>;
  temperature_2m_min: Array<number>;
  times: Array<string>;
};
}
class App extends React.Component<{},State>{
  constructor(props:any){
 super(props)
 this.state= {location:"lisbon",isLoading:false, weather:{ weathercode: '', temperature_2m_max: [], temperature_2m_min: [], times: [] },displayLocation:''}
 this.fetchWeatherData = this.fetchWeatherData.bind(this)
  }
  async fetchWeatherData(){
    try {
      this.setState({isLoading:true})
      // 1) Getting location (geocoding)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
      );
      const geoData = await geoRes.json();
      console.log(geoData);
  
      if (!geoData.results) throw new Error("Location not found");
  
      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);
      console.log(`${name} ${convertToFlag(country_code)}`);
  
      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      this.setState({displayLocation:`${name} ${convertToFlag(country_code)}`})
      const weatherData = await weatherRes.json();
      this.setState({weather:weatherData})
    } catch (error) {
      console.error(error);
    }finally{
      this.setState({isLoading:false})
    }
  }
render(){
  return(
    <div className="app">
      <h1>Classy weather</h1>
      <div>
        <input type="text" placeholder="Search from location..." value={this.state.location}
        onChange={e=>this.setState({location:e.target.value})}
        />
      </div>
        <button onClick={this.fetchWeatherData}>Get weathers</button>
        {this.state.location&& <p className="loader">Loading</p>}
        {this.state.weather.weathercode&& <Weather weather={this.state.weather} displayLocation={this.state.displayLocation}/>}
    </div>
  )
}
}

export default App

interface WeatherProps {
  weather: {
    weathercode: string;
    temperature_2m_max: Array<number>;
    temperature_2m_min: Array<number>;
    times: Array<string>;
  };
  displayLocation: string|undefined;
}
class Weather extends React.Component<WeatherProps>{
  render(): React.ReactNode {
    const {temperature_2m_max:max,temperature_2m_min:min,times:dates,weathercode:codes} =this.props.weather
    return(
      <div>
        <h2>Weather {this.props.displayLocation}</h2>
        <ul>
          {dates.map((date,i)=>(<Day date={date} max={max.at(i)}min={min.at(i)} code={codes.at(i)}/>))}
        </ul>
      </div>
    )
  }
}
interface DayProps{
  date:string|undefined
  max:number|undefined
  min:number|undefined
  code:string|undefined
} 

class Day extends React.Component<DayProps>{
  render(): React.ReactNode {
    const {date,max,min,code} =this.props
    return(<li>
      <p>{date}</p>
      <p>{min}&deg; &madash; {max}&deq;</p>
    </li>)
  }
}
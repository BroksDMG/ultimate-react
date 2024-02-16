import React from "react";
interface State{
location: string
isLoading:boolean
displayLocation:string
weather: {
  weathercode:[]
  temperature_2m_max: Array<number>;
  temperature_2m_min: Array<number>;
  time: Array<string>;
};
}
function convertToFlag(countryCode:string) {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  }
  function formatDay(dateStr:string) {
    return new Intl.DateTimeFormat("en", {
      weekday: "short",
    }).format(new Date(dateStr));
  }
  function getWeatherIcon(wmoCode:number) {
    const icons = new Map([
      [0, "☀️"],
      [1, "🌤"],
      [2, "⛅️"],
      [3, "☁️"],
      [45, "🌫"],
      [48, "🌫"],
      [51, "🌦"],
      [56, "🌦"],
      [61, "🌦"],
      [66, "🌦"],
      [80, "🌦"],
      [53, "🌧"],
      [55, "🌧"],
      [63, "🌧"],
      [65, "🌧"],
      [57, "🌧"],
      [67, "🌧"],
      [81, "🌧"],
      [82, "🌧"],
      [71, "🌨"],
      [73, "🌨"],
      [75, "🌨"],
      [77, "🌨"],
      [85, "🌨"],
      [86, "🌨"],
      [95, "🌩"],
      [96, "⛈"],
      [99, "⛈"],
    ]);
    return icons.get(wmoCode) || "NOT FOUND";
}
class App extends React.Component<{},State>{
  state:State= {location:"",isLoading:false, weather:{ weathercode: [], temperature_2m_max: [], temperature_2m_min: [], time: [] },displayLocation:''}
   
  fetchWeatherData=async()=>{
    if(this.state.location.length>2)return this.setState({weather:{weathercode: [], temperature_2m_max: [], temperature_2m_min: [], time: [] },displayLocation:''})
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
      // console.log(`${name} ${convertToFlag(country_code)}`);
  
      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      this.setState({displayLocation:`${name} ${convertToFlag(country_code)}}`})
      const weatherData = await weatherRes.json();
      this.setState({weather:weatherData.daily})
    } catch (error) {
      console.error(error);
    }finally{
      this.setState({isLoading:false})
    }
    
  }
setLocation=(e:any)=>this.setState({location:e.target.value})

componentDidMount(): void {
  // this.fetchWeatherData()
  this.setState({location:localStorage.getItem("location")||""})
}
componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<State>, ): void {
  if(this.state.location !== prevState.location){
    this.fetchWeatherData()

    localStorage.setItem("location",this.state.location)
  }
}
render(){
  console.log(this.state.weather)
  return(
    <div className="app">
      <h1>Classy weather</h1>
      <div>
        <Input location={this.state.location} setLocation={this.setLocation}/>
        
      </div>
        {/* {this.state.location&& <p className="loader">Loading</p>} */}
       
        {this.state.weather.weathercode&& <Weather weather={this.state.weather} displayLocation={this.state.displayLocation}/>}
    </div>
  )
}
}

export default App
interface inputProps{
  location:string
  setLocation:Function
}
class Input extends React.Component<inputProps>{
  render(): React.ReactNode {
    return(<input type="text" placeholder="Search from location..." value={this.props.location}
    onChange={e=>this.props.setLocation(e)}
    />)
  }
}
interface WeatherProps {
  weather: {
    weathercode: [];
    temperature_2m_max: Array<number>;
    temperature_2m_min: Array<number>;
    time: Array<string>;
  };
  displayLocation: string;
}
class Weather extends React.Component<WeatherProps>{
  render(): React.ReactNode {
    const {temperature_2m_max:max,temperature_2m_min:min,time:dates,weathercode:codes} = this.props.weather
    return(
      <div>
        <h2>Weather {this.props.displayLocation}</h2>
        <ul className="weather">
          {dates &&dates.map((date,i)=>(<Day date={date} key={date} max={max.at(i)}min={min.at(i)} code={codes.at(i)} isToday={i===0}/>))}
        </ul>
      </div>
    )
  }
}
interface DayProps{
  date:string|undefined
  max:number|undefined
  min:number|undefined
  code:number|undefined
  isToday:boolean
} 

class Day extends React.Component<DayProps>{
  render(): React.ReactNode {
    const {date,max,min,code,isToday} =this.props
    return(<li className="day">
      <span>{code&&getWeatherIcon(code)}</span>
      <p>{isToday?"today":date&&formatDay(date)}</p>
      {min&&max&&<p>{Math.floor(min)}&deg; &madash; {Math.ceil(max)}&deq;</p>}
    </li>)
  }
}
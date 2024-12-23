export interface WeatherApp{
coord: {
      lon: number,
      lat: number,
   },
   weather: [
      {
         id: number,
         main: string,
         description: string,
         icon: string
      }
   ],
   main: {
      temp: number,
      feels_like: number,
      temp_min: number,
      temp_max: number,
      humidity: number,
   },
   name: string,
   wind: {
      speed: number,
      deg: number,
      gust: number
   },
   clouds: {
      all: number
   },
   dt: number,
   sys: {
      type: number,
      id: number,
      country: string,
      sunrise: number,
      sunset: number
   },
   timezone: number,
}


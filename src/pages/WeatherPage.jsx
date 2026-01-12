import "./TutorialPage.css"

const WeatherPage = () => {
    // weather API URL
	const currentWeatherReportURL =
    "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=tc";
    const nineDaysWeatherForecastURL =
    "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=tc";
    
    return (
        <div className="weatherPage">
            <p style={{ fontSize: "30px", textAlign: "center" }}>Weather Page</p>
        </div>
    )
}

export default WeatherPage;
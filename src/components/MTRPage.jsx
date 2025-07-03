import React, { useEffect, useState } from 'react';
import trainData from './MTR.json'; // Import the JSON data
import Dropdown from './Dropdown'; // Import the Dropdown component
import Button from "./Button";
import NestedJSONTable from './NestedJSONTable'; // Import the NestedJSONTable component
import './MTR.css'; // Import the MTR.css file for styling

const MTRPage = () => {
  const initialLine = 'AEL'; // Get the first line's code if available
  const [selectedLine, setSelectedLine] = useState(initialLine);
  const [selectedStation, setSelectedStation] = useState('');
  const [stations, setStations] = useState([]);
  const [trainSchedule, setTrainSchedule] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Start with loading

  const lineOptions = trainData.lines.map(line => ({
    value: line.lineCode,
    label: line.lineName,
  }));

  useEffect(() => {
    const selectedLineData =
      trainData.lines.find(line => line.lineCode === selectedLine) || {};
    setStations(selectedLineData.stations || []);
    setSelectedStation(''); // Clear selected station when line changes
    setTrainSchedule(null); // Clear schedule when line changes
    setError(''); // Clear error when line changes
  }, [selectedLine]);

  const stationOptions = stations.map(station => ({
    value: station.stationCode,
    label: station.stationName,
  }));

  const handleLineChange = event => {
    setSelectedLine(event.target.value);
  };

  const handleStationChange = event => {
    setSelectedStation(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (selectedLine && selectedStation) {
        setLoading(true);
        setError(''); // Clear previous errors

        const selectedLineData = trainData.lines.find(
          line => line.lineCode === selectedLine
        );
        const selectedStationData = stations.find(
          station => station.stationCode === selectedStation
        );

        if (selectedLineData && selectedStationData) {
          const lineCode = selectedLineData.lineCode;
          const stationCode = selectedStationData.stationCode;

          const requestURL = `https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=${lineCode}&sta=${stationCode}`;

          try {
            const response = await fetch(requestURL);
            if (!response.ok)
              throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            setTrainSchedule(data);
          } catch (err) {
            setError(err.message);
            setTrainSchedule(null); // Clear any previous schedule data
          } finally {
            setLoading(false);
          }
        }
      } else {
        setTrainSchedule(null); // Clear schedule if no line/station selected
      }
    };

    fetchData();
  }, [selectedLine, selectedStation, stations]);

  const renderTrainInfo = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!trainSchedule) return <p>Please select a train line and station.</p>;

    if (trainSchedule.status === 0) {
      return (
        <div>
          <p>{trainSchedule.message}</p>
          {trainSchedule.message.includes(
            'Special train service arrangements'
          ) && (
            <a
              href={trainSchedule.url}
              target='_blank'
              rel='noopener noreferrer'
            >
              Click here for more information.
            </a>
          )}
        </div>
      );
    }

    if (trainSchedule.data && Object.keys(trainSchedule.data).length === 0) {
      const selectedStationData = stations.find(
        station => station.stationCode === selectedStation
      );
      const stationName = selectedStationData
        ? selectedStationData.stationName
        : selectedStation;
      return <p>Data Absence for station {stationName}</p>;
    }

    if (trainSchedule.data) {
      const lineData = trainSchedule.data[Object.keys(trainSchedule.data)[0]]; // Assuming only one line
      return (
        <div>
          {lineData.UP && lineData.UP.length > 0 && (
            <div>
              <h3>Platform 1 (UP)</h3>
              <table>
                <thead>
                  <tr>
                    <th>Destination</th>
                    <th>Time To Next Train (mins)</th>
                  </tr>
                </thead>
                <tbody>
                  {lineData.UP.map((train, index) => (
                    <tr key={index}>
                      <td>{train.dest}</td>
                      <td>{train.ttnt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {lineData.DOWN && lineData.DOWN.length > 0 && (
            <div>
              <h3>Platform 2 (DOWN)</h3>
              <table>
                <thead>
                  <tr>
                    <th>Destination</th>
                    <th>Time To Next Train (mins)</th>
                  </tr>
                </thead>
                <tbody>
                  {lineData.DOWN.map((train, index) => (
                    <tr key={index}>
                      <td>{train.dest}</td>
                      <td>{train.ttnt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      );
    }

    return null; // Fallback for unexpected data structures
  };

  return (
    <div className='mtr-page'>
      <BackHomeButton style={{textAlign: 'left'}}/>
      <h1>Train Information</h1>
      <div className='dropdown-container'>
        <label htmlFor='lineSelect'>Select Train Line:</label>
        <Dropdown
          options={lineOptions}
          onChange={handleLineChange}
          value={selectedLine}
        />
      </div>
      <div className='dropdown-container'>
        <label htmlFor='stationSelect'>Select Station:</label>
        <Dropdown
          options={stationOptions}
          onChange={handleStationChange}
          value={selectedStation}
          disabled={!selectedLine}
        />
      </div>
      <div className='train-info-container'>
        {selectedLine && selectedStation ? (
          renderTrainInfo()
        ) : (
          <p>Please select a train line and station.</p>
        )}
      </div>
    </div>
  );
};

const BackHomeButton = () => {
  return (
    <Button label={'Back to last page'} onClick={() => window.history.back()} />
  );
};

export default MTRPage;

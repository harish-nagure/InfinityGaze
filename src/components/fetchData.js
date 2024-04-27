import axios from 'axios';

export const fetchDataDragon = (setData, setError) => {
  axios.get('http://localhost:5000/api/dragon')
    .then(response => {
      setData(JSON.stringify(response.data, null, 2)); // Display data in JSON format
    })
    .catch(error => {
      setError('Error fetching data');
      console.error('Error fetching data:', error);
    });
};

export const fetchDataDR = (setData, setError) => {
  axios.get('http://localhost:5000/api/dr')
    .then(response => {
      setData(JSON.stringify(response.data, null, 2)); // Display data in JSON format
    })
    .catch(error => {
      setError('Error fetching data');
      console.error('Error fetching data:', error);
    });
};

export const fetchDataHillClimb = (setData, setError) => {
  axios.get('http://localhost:5000/api/hill_climb')
    .then(response => {
      setData(JSON.stringify(response.data, null, 2)); // Display data in JSON format
    })
    .catch(error => {
      setError('Error fetching data');
      console.error('Error fetching data:', error);
    });
};

export const fetchDataTrafficRacer = (setData, setError) => {
  axios.get('http://localhost:5000/api/traffic_racer')
    .then(response => {
      setData(JSON.stringify(response.data, null, 2)); // Display data in JSON format
    })
    .catch(error => {
      setError('Error fetching data');
      console.error('Error fetching data:', error);
    });
};

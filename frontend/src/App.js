import logo from './logo.svg';
import React , { useEffect , useState } from 'react';
import Axios from 'axios';
import './App.css';

function App() {

  const [data,setData] = useState('No data set')

  const getData = () => {
    Axios.get('http://localhost:5000/home')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  
  return (
    <div className="App">
      <div>{data}</div>
    </div>
  );
}

export default App;

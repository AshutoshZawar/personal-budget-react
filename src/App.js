import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import Chart from 'chart.js';
import * as d3 from 'd3';
import './App.scss';


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Menu from './Menu/Menu';
import Hero from './Hero/Hero';
import HomePage from './HomePage/HomePage';
import Footer from './Footer/Footer';
import AboutPage from './AboutPage/AboutPage';
import LoginPage from './LoginPage/LoginPage';


function App() 
{const chartRef = useRef(null);
  const [data, setData] = useState([]);
  // axios.getBudget();
  useEffect(() => {
    axios.get('/api/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    const bars = svg.selectAll('rect').data(data);

    bars
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 60)
      .attr('y', d => 100 - d)
      .attr('width', 50)
      .attr('height', d => d)
      .attr('fill', 'blue');
    return () => {
      svg.selectAll('rect').remove();
    };
  }, [data]);

  return (
    <><Router>
      <Menu />
      <Hero />
      <div className="mainContainer">
        <Routes>
          <Route path='/about' element={<AboutPage />}> </Route>
          <Route path='/login' element={<LoginPage />}> </Route>
          <Route path='/' element={<HomePage />}> </Route>
        </Routes>
      </div>
      <Footer />
    </Router><div>
        <h2>chart.js Chart Component</h2>
        <svg ref={chartRef} width="300" height="100"></svg>
      </div></>
  );
  }



export default App;

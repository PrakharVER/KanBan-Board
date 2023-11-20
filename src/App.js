import { useState } from 'react';
import './App.css';
import Filter from './Components/Filter';
import HomePage from './Components/HomePage';

function App() {
  const [group, setgrp] = useState('status');
  const [order, setord] = useState('priority');


  return (
    <>
    <Filter Grouping={setgrp} Ordering={setord}></Filter>
    <HomePage grp={group} ord={order}></HomePage>
    </>
  );
}

export default App;

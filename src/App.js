import React from 'react';
import './App.css';
import Convertor from './components/Convertor';


function App() {


  return (
    <div class="area">
      <ul class="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div className="glassmorphic ">
       
        <Convertor />
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import BikeTable from './components/BikeTable';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bike List</h1>
        <button className="button">CHECKOUT</button>
      </header>
      <main>
        <BikeTable />
      </main>
    </div>
  );
}

export default App;

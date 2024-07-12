import React, { useState, useEffect } from 'react';


type Bike = {
  BikeID: number;
  Make: string;
  Model: string;
  Year: number;
  Displacement: number;
  Price: number;
  Terrain: string;
  Description: string;
};

const BikeTable: React.FC = () => {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Bike; direction: 'ascending' | 'descending' } | null>(null);

  useEffect(() => {
    fetch('/bikes_response.json')
      .then((response) => response.json())
      .then((data) => setBikes(data));
  }, []);

  useEffect(() => {
    const table = document.querySelector('table');
    if (table) {
      table.classList.add('loaded');
    }
  }, []);

  const sortedBikes = React.useMemo(() => {
    let sortableBikes = [...bikes];
    if (sortConfig !== null) {
      sortableBikes.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableBikes;
  }, [bikes, sortConfig]);

  const requestSort = (key: keyof Bike) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const filteredBikes = sortedBikes.filter((bike) =>
    Object.values(bike).some((value) => value.toString().toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => requestSort('BikeID')}>BikeID</th>
            <th onClick={() => requestSort('Make')}>Make</th>
            <th onClick={() => requestSort('Model')}>Model</th>
            <th onClick={() => requestSort('Year')}>Year</th>
            <th onClick={() => requestSort('Displacement')}>Displacement</th>
            <th onClick={() => requestSort('Price')}>Price</th>
            <th onClick={() => requestSort('Terrain')}>Terrain</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredBikes.map((bike) => (
            <tr key={bike.BikeID}>
              <td>{bike.BikeID}</td>
              <td>{bike.Make}</td>
              <td>{bike.Model}</td>
              <td>{bike.Year}</td>
              <td>{bike.Displacement}</td>
              <td>{bike.Price}</td>
              <td>{bike.Terrain}</td>
              <td>{bike.Description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BikeTable;

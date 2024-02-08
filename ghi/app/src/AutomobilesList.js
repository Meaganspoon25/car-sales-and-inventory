import React, { useEffect, useState } from 'react';


function AutomobilesList() {
  const [automobiles, setAutomobiles] = useState([]);

  const getData = async ()=> {
    const response = await fetch('http://localhost:8100/api/automobiles/');
    if (response.ok) {
      const data = await response.json();
      const sortedAutomobiles = data.autos.sort((a, b) => a.vin.localeCompare(b.vin));
      setAutomobiles(sortedAutomobiles);
    } else {
      console.error('An error occurred fetching the automobile list data')
    }
  }

  useEffect(()=> {
    getData()
  }, []);

  return (
    <div className="my-5 container">
      <div className="row">
        <h1>Current Automobiles</h1>
        <table className="table table-striped m-3">
          <thead>
            <tr>
              <th>VIN</th>
              <th>Color</th>
              <th>Year</th>
              <th>Model</th>
              <th>Manufacturer</th>
              <th>Sold</th>
            </tr>
          </thead>
          <tbody>
            {automobiles.map(automobile => {
              return (
                <tr key={automobile.href}>
                  <td>{ automobile.vin }</td>
                  <td>{ automobile.color }</td>
                  <td>{ automobile.year }</td>
                  <td>{ automobile.model?.name }</td>
                  <td>{ automobile.model?.manufacturer?.name }</td>
                  <td>{ automobile.sold ? 'Yes' : 'No' }</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AutomobilesList;

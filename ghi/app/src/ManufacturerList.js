import React, { useEffect, useState } from 'react';


function ManufacturerList() {
  const [locations, setLocations] = useState([]);

  const getData = async ()=> {
    const response = await fetch('http://localhost:8100/api/locations/');
    if (response.ok) {
      const { locations } = await response.json();
      setLocations(locations);
    } else {
      console.error('An error occurred fetching the data')
    }
  }

  useEffect(()=> {
    getData()
  }, []);

  return (
    <div className="my-5 container">
      <div className="row">
        <h1>Current Locations</h1>
        <table className="table table-striped m-3">
          <thead>
            <tr>
              <th>Id</th>
              <th>Closet Name</th>
              <th>Section Number</th>
              <th>Shelf Number</th>
            </tr>
          </thead>
          <tbody>
            {locations.map(location => {
              return (
                <tr key={location.href}>
                  <td>{ location.id }</td>
                  <td>{ location.closet_name }</td>
                  <td>{ location.section_number }</td>
                  <td>{ location.shelf_number }</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LocationList;

import React, { useEffect, useState } from 'react';


function ManufacturersList() {
  const [manufacturers, setManufacturers] = useState([]);

  const getData = async ()=> {
    const response = await fetch('http://localhost:8100/api/manufacturers/');
    if (response.ok) {
      const data = await response.json();
      // sorting by integer ID is below.  We're using subtraction for integers
      // const sortedManufacturers = data.manufacturers.sort((a, b) => a.id - b.id);

      // This is a string comparison function
      const sortedManufacturers = data.manufacturers.sort((a, b) => a.name.localeCompare(b.name));
      setManufacturers(sortedManufacturers);
    } else {
      console.error('An error occurred fetching the manufacturer list data')
    }
  }

  useEffect(()=> {
    getData()
  }, []);

  return (
    <div className="my-5 container">
      <div className="row">
        <h1>Current Manufacturers</h1>
        <table className="table table-striped m-3">
          <thead>
            <tr>
              {/* <th>Id</th> */}
              <th>Manufacturer Name</th>
            </tr>
          </thead>
          <tbody>
            {manufacturers.map(manufacturer => {
              return (
                <tr key={manufacturer.href}>
                  {/* <td>{ manufacturer.id }</td> */}
                  <td>{ manufacturer.name }</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManufacturersList;

import React, { useEffect, useState } from 'react';


function TechniciansList() {
  const [technicians, setTechnicians] = useState([]);

  const getData = async ()=> {
    const response = await fetch('http://localhost:8080/api/technicians/');
    if (response.ok) {
      const { technicians } = await response.json();
      setTechnicians(technicians);
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
        <h1>Current Technicians</h1>
        <table className="table table-striped m-3">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {technicians.map(technician => {
              return (
                <tr key={technician.id}>
                  <td>{ technician.employee_id }</td>
                  <td>{ technician.first_name }</td>
                  <td>{ technician.last_name }</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TechniciansList;

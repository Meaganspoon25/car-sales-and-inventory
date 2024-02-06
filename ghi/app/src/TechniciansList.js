import React, { useEffect, useState } from 'react';


function TechniciansList() {
  const [technicians, setTechnicians] = useState([]);

  const getData = async ()=> {
    const response = await fetch('http://localhost:8090/api/technicians/');
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

//   const handleDelete = (TechnicianId) => {
//     fetch(`/api/technicians/${technicianId}/`, { method: 'DELETE' })
//       .then(() => {
//         setTechnicians(technicians.filter(technician => technician.id !== technicianId));
//       })
//       .catch(error => console.error('Error deleting technician:', error));
//   };

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
              {/* <th>Delete</th> */}
            </tr>
          </thead>
          <tbody>
            {technicians.map(technician => {
              return (
                <tr key={technician.href}>
                  <td>{ technician.employee_id }</td>
                  <td>{ technician.name }</td>
                  <td>{ technician.style_name }</td>
                  {/* <td><button onClick={() => handleDelete(hat.id)}>Delete</button></td> */}
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

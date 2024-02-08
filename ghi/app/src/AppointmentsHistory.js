import React, { useEffect, useState } from 'react';


function AppointmentsList() {
  const [appointments, setAppointments] = useState([]);
  const [filterVinValue, setFilterVinValue] = useState("");
  const [vipVins, setVipVins] = useState(new Set());

  const getData = async ()=> {
    const response = await fetch('http://localhost:8080/api/appointments/');
    if (response.ok) {
      const { appointments } = await response.json();
      setAppointments(appointments);
    } else {
      console.error('An error occurred fetching the data')
    }
  }

  useEffect(()=> {
    getData()
    fetchVipVins();
  }, []);

  const fetchVipVins = async () => {
    // const response = await fetch('http://localhost:8100/api/automobiles/');
    const response = await fetch('http://localhost:8100/api/automobiles/');
    if (response.ok) {
      const data = await response.json();
      const vins = new Set(data.autos.map(auto => auto.vin));
      setVipVins(vins);
    } else {
      console.error('An error occurred fetching the VIP VINs');
    }
  };

  function handleFilterVinChange(e) {
    setFilterVinValue(e.target.value);
  }
  const filteredAppointments = appointments.filter((appointment) =>
  appointment.vin.toLowerCase().includes(filterVinValue.toLowerCase())
  );


  return (
    <div className="my-5 container">
      <div className="row">
        <h1>Service History</h1>
        <input
          type="text"
          onChange={handleFilterVinChange}
          value={filterVinValue}
          placeholder="Search by VIN"
          className="form-control mb-3"
        />
        <table className="table table-striped m-3">
          <thead>
            <tr>
              <th>VIN</th>
              <th>Is VIP?</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Time</th>
              <th>Technician</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map(appointment => {
              const isVip = vipVins.has(appointment.vin) ? "Yes ⭐" : "No";
              const date = new Date(appointment.date_time);

              // const formattedDate = date.toLocaleDateString('en-US', {
              //   year: 'numeric',
              //   month: '2-digit',
              //   day: '2-digit',
              // });
              const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

              const formattedTime = date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
              });

              return (
                <tr key={appointment.href}>
                  <td>{ appointment.vin }</td>
                  <td>{ isVip }</td>
                  <td>{ appointment.customer }</td>
                  <td>{ formattedDate }</td>
                  <td>{ formattedTime }</td>
                  <td>{ appointment.technician}</td>
                  <td>{ appointment.reason }</td>
                  <td>{ appointment.status }</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AppointmentsList;

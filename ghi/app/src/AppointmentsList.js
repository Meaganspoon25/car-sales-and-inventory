import React, { useEffect, useState } from 'react';


function AppointmentsList() {
  const [appointments, setAppointments] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [filterVinValue, setFilterVinValue] = useState("");
  const [vipVins, setVipVins] = useState(new Set());

  const getData = async () => {
    const response = await fetch('http://localhost:8080/api/appointments/?status=created');
    if (response.ok) {
      const { appointments } = await response.json();
      setAppointments(appointments.filter(appointment => appointment.status === 'created'));
    } else {
      console.error('An error occurred fetching the data');
    }
  };

  useEffect(() => {
    getData();
    fetchVipVins();
  }, []);

  const fetchVipVins = async () => {
    const response = await fetch('http://localhost:8100/api/automobiles/');
    if (response.ok) {
      const data = await response.json();
      const vins = new Set(data.autos.map(auto => auto.vin));
      setVipVins(vins);
    } else {
      console.error('An error occurred fetching the VIP VINs');
    }
  };

  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    const url = `http://localhost:8080/api/appointments/${appointmentId}/`;
    const data = { status: newStatus };
    const fetchOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, fetchOptions);
      if (response.ok) {
        getData();
        setConfirmationMessage(`Congratulations! The appointment is ${newStatus}.`);
        setShowConfirmation(true);
        setTimeout(() => setShowConfirmation(false), 10000);
      } else {
        console.error('Failed to update appointment status', await response.text());
      }
    } catch (error) {
      console.error('Error updating appointment status', error);
    }
  };

  const handleFilterVinChange = (e) => {
    setFilterVinValue(e.target.value);
  };

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.vin.toLowerCase().includes(filterVinValue.toLowerCase())
  );

  return (
    <div className="my-5 container">
      {showConfirmation && (
        <div className="alert alert-success" role="alert" style={{ marginBottom: '1rem' }}>
          {confirmationMessage}
        </div>
      )}
      <div className="row">
        <h1>Current Appointments</h1>
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
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
          {filteredAppointments.map(appointment => {
              const isVip = vipVins.has(appointment.vin) ? "Yes ⭐" : "No";
              const date = new Date(appointment.date_time);
              const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
              const formattedTime = date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
              });
              return (
                <tr key={appointment.id}>
                  <td>{appointment.vin}</td>
                  <td>{isVip}</td>
                  <td>{appointment.customer}</td>
                  <td>{formattedDate}</td>
                  <td>{formattedTime}</td>
                  <td>{appointment.technician}</td>
                  <td>{appointment.reason}</td>
                  <td>
                    <button onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}>Cancel</button>
                    <button onClick={() => updateAppointmentStatus(appointment.id, 'finished')}>Finish</button>
                  </td>
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

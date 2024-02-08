import React, { useEffect, useState } from 'react';


function AppointmentsList() {
  const [appointments, setAppointments] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const getData = async ()=> {
    const response = await fetch('http://localhost:8080/api/appointments/?status=created');
    if (response.ok) {
      const { appointments } = await response.json();
      // setAppointments(appointments);
      setAppointments(appointments.filter(appointment => appointment.status === 'created'));
    } else {
      console.error('An error occurred fetching the data')
    }
  }

  useEffect(()=> {
    getData()
  }, []);

  // Previous delete code
  // const handleCancel = (appointmentId) => {
  //   fetch(`http://localhost:8080/api/appointments/${appointmentId}/`, { method: 'POST' })
  //     .then(() => {
  //       setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
  //     })
  //     .catch(error => console.error('Error cancelling hat:', error));
  // };


// PUT Attempt
// PUT Attempt
const updateAppointmentStatus = async (appointmentId, newStatus, vin) => {
  const url = `http://localhost:8080/api/appointments/${appointmentId}/`;
  const data = { status: newStatus, vin: vin }; // Assuming `vin` is in your component state and is the VIN you want to send
  const fetchOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, fetchOptions);
    if (response.ok) {
      console.log('Appointment status updated successfully');
      // Refresh the appointment list to reflect the status update
      getData(); // Call getData again to refresh the list
      // Additional logic here to handle successful status update, such as refreshing the list of appointments
      // Here, you set the confirmation message and make it visible
      setConfirmationMessage(`Congratulations! The appointment is ${newStatus}.`);
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 10000); // Optional: hide after 3 seconds

      // Refresh
    } else {
      console.error('Failed to update appointment status', response.statusText);
    }
  } catch (error) {
    console.error('Error updating appointment status', error);
  }
};
// PUT Attempt
// PUT Attempt


  // const handleCancel = (appointmentId) => {
  //   const requestOptions = {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ status: 'cancelled' }) // Assuming 'cancelled' is a valid status
  //   };

  //   fetch(`http://localhost:8080/api/appointments/${appointmentId}/`, requestOptions)
  //     .then(response => response.json())
  //     .then(() => {
  //       // Update the status in the local state without removing the appointment
  //       // setAppointments(appointments.map(appointment =>
  //       setAppointments(currentAppointments => currentAppointments.map(appointment =>
  //         appointment.id === appointmentId ? { ...appointment, status: 'cancelled' } : appointment
  //       ));
  //     })
  //     .catch(error => console.error('Error cancelling appointment:', error));
  // };

  // const handleFinish = (appointmentId) => {
  //   const requestOptions = {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ status: 'completed' }) // Assuming 'completed' is a valid status
  //   };

  //   fetch(`http://localhost:8080/api/appointments/${appointmentId}/`, requestOptions)
  //     .then(response => response.json())
  //     .then(() => {
  //       // Update the status in the local state
  //       setAppointments(appointments.map(appointment =>
  //         appointment.id === appointmentId ? { ...appointment, status: 'completed' } : appointment
  //       ));
  //     })
  //     .catch(error => console.error('Error finishing appointment:', error));
  // };

  const [vipVins, setVipVins] = useState(new Set());

  const fetchVipVins = async () => {
    const response = await fetch('http://localhost:8100/api/automobiles/'); // Adjust the port and endpoint as necessary
    if (response.ok) {
      const data = await response.json();
      const vins = new Set(data.autos.map(auto => auto.vin)); // Assuming the structure is similar to what you've provided
      setVipVins(vins);
    } else {
      console.error('An error occurred fetching the VIP VINs');
    }
  };

  useEffect(() => {
    fetchVipVins();
  }, []);

  return (
    <div className="my-5 container">
      {showConfirmation && (
        <div className="alert alert-success" role="alert" style={{ marginBottom: '1rem' }}>
          {confirmationMessage}
        </div>
      )}
      <div className="row">
        <h1>Current Appointments</h1>
        <table className="table table-striped m-3">
          <thead>
            <tr>
              <th>VIN</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Time</th>
              <th>Technician</th>
              <th>Reason</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
          {appointments.map(appointment => {
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
                <tr key={appointment.id}>
                  <td>{ appointment.vin }</td>
                  <td>{ appointment.customer }</td>
                  <td>{ formattedDate }</td>
                  <td>{ formattedTime }</td>
                  <td>{ appointment.technician}</td>
                  <td>{ appointment.reason }</td>
                  <td>
                    {/* <button onClick={() => handleCancel(appointment.id)}>Cancel</button>
                    <button onClick={() => handleFinish(appointment.id)}>Finish</button> */}
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

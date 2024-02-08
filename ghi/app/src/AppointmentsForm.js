import React, { useEffect, useState } from 'react';


function AppointmentsForm() {

  const [vin, setVin] = useState('');
//   const [date_time, setDate_Time] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [reason, setReason] = useState('');
//   const [status, setStatus] = useState('');
  const [customer, setCustomer] = useState('');
  const [technician, setTechnician] = useState('');
  const [technicians, setTechnicians] = useState([]);
  const [hasCreated, setHasCreated] = useState(false);

  const fetchData = async () => {
    const url = 'http://localhost:8080/api/technicians/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setTechnicians(data.technicians);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const combinedDateTime = `${appointmentDate}T${appointmentTime}:00+00:00`;

    const data = {};
    data.vin = vin;
    data.date_time = combinedDateTime;
    // data.appointmentDate = ;
    // data.appointmentTime = ;
    data.reason = reason;
    data.customer = customer;
    data.technician = technician;

    const appointmentUrl = 'http://localhost:8080/api/appointments/';
    const fetchOptions = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const appointmentResponse = await fetch(appointmentUrl, fetchOptions);
    if (appointmentResponse.ok) {
          setVin('');
        //   setDate_Time('');
          setAppointmentDate('');
          setAppointmentTime('');
          setReason('');
          setCustomer('');
          setTechnician('');
          setHasCreated(true);
    } else {
        console.error('Failed to create appointment');
      }
  }

  const handleChangeVin = (event) => {
    const value = event.target.value;
    setVin(value);
  }

  const handleChangeAppointmentDate = (event) => {
    const value = event.target.value;
    setAppointmentDate(value);
  }

  const handleChangeAppointmentTime = (event) => {
    const value = event.target.value;
    setAppointmentTime(value);
  }

  const handleChangeReason = (event) => {
    const value = event.target.value;
    setReason(value);
  }

  const handleChangeCustomer = (event) => {
    const value = event.target.value;
    setCustomer(value);
  }

  const handleChangeTechnician = (event) => {
    const value = event.target.value;
    setTechnician(value);
  }


  let spinnerClasses = 'd-flex justify-content-center mb-3';
  let dropdownClasses = 'form-select d-none';
  if (technicians.length > 0) {
    spinnerClasses = 'd-flex justify-content-center mb-3 d-none';
    dropdownClasses = 'form-select';
  }

  let messageClasses = 'alert alert-success d-none mb-0';
  let formClasses = '';
  if (hasCreated) {
    messageClasses = 'alert alert-success mb-0';
    formClasses = 'd-none';
  }

  return (
    <div className="my-5 container">
      <div className="row">
        <div className="col col-sm-auto">
          <img width="300" className="bg-white rounded shadow d-block mx-auto mb-4"/>
        </div>
        <div className="col">
          <div className="card shadow">
            <div className="card-body">
              <form className={formClasses} onSubmit={handleSubmit} id="create-technician-form">
                <h1 className="card-title">Create a service appointment</h1>
                <p className="mb-3">
                  Please choose which technician
                  you'd like to service your automobile.
                </p>


                <div className="row">
                  <div className="row">
                    <div className="form-floating mb-3">
                      <input onChange={handleChangeVin} required placeholder="Automobile VIN" type="text" id="vin" name="vin" className="form-control" />
                      <label htmlFor="name">Automobile VIN</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-floating mb-3">
                      <input onChange={handleChangeCustomer} required placeholder="Customer" type="text" id="customer" name="customer" className="form-control" />
                      <label htmlFor="name">Customer</label>
                    </div>
                  </div>

                {/* Date input field */}
                <div className="form-floating mb-3">
                  <input onChange={handleChangeAppointmentDate} value={appointmentDate} type="date" id="appointmentDate" name="appointmentDate" className="form-control" />
                  <label htmlFor="appointmentDate">Date</label>
                </div>

                {/* Time input field */}
                <div className="form-floating mb-3">
                  <input onChange={handleChangeAppointmentTime} value={appointmentTime} type="time" id="appointmentTime" name="appointmentTime" className="form-control" />
                  <label htmlFor="appointmentTime">Time</label>
                </div>

                  <div className={spinnerClasses} id="loading-location-spinner">
                  <div className="spinner-grow text-secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>

                <div className="mb-3">
                  <select onChange={handleChangeTechnician} name="technician" id="technician" className={dropdownClasses} required>
                    <option value="">Choose a service technician</option>
                    {technicians.map(technician => {
                      return (
                        <option key={technician.id} value={technician.id}>{technician.employee_id}</option>
                      )
                    })}
                  </select>
                </div>

                  <div className="row">
                    <div className="form-floating mb-3">
                      <input onChange={handleChangeReason} required placeholder="Reason" type="text" id="reason" name="reason" className="form-control" />
                      <label htmlFor="name">Reason</label>
                    </div>
                  </div>

                </div>
                <button className="btn btn-lg btn-primary">Create appointment</button>
              </form>
              <div className={messageClasses} id="success-message">
                Congratulations! Your appointment is registered!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentsForm;

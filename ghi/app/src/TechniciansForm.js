import React, { useState } from 'react';


function TechnicianForm() {

  const [employee_id, setEmployee_Id] = useState('');
  const [first_name, setFirst_Name] = useState('');
  const [last_name, setLast_Name] = useState('');
  const [hasCreated, setHasCreated] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.employee_id = employee_id;
    data.first_name = first_name;
    data.last_name = last_name;

    const technicianUrl = 'http://localhost:8080/api/technicians/';
    const fetchOptions = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const technicianResponse = await fetch(technicianUrl, fetchOptions);
    if (technicianResponse.ok) {
          setEmployee_Id('');
          setFirst_Name('');
          setLast_Name('');
          setHasCreated(true);
    }
  }

  const handleChangeEmployee_Id = (event) => {
    const value = event.target.value;
    setEmployee_Id(value);
  }

  const handleChangeFirst_Name = (event) => {
    const value = event.target.value;
    setFirst_Name(value);
  }

  const handleChangeLast_Name = (event) => {
    const value = event.target.value;
    setLast_Name(value);
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
                <h1 className="card-title">Create a Technician</h1>
                <p className="mb-3">
                Please enter the technician details.
                </p>
                <div className="row">
                <div className="row">
                    <div className="form-floating mb-3">
                    <input onChange={handleChangeEmployee_Id} required placeholder="Technician ID" type="text" id="employee_id" name="employee_id" className="form-control" />
                    <label htmlFor="name">The Technician's Employee ID</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input onChange={handleChangeFirst_Name} required placeholder="Techician's First Name" type="text" id="first_name" name="first_name" className="form-control" />
                    <label htmlFor="name">The Technician's First Name</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input onChange={handleChangeLast_Name} required placeholder="Techician's Last Name" type="text" id="last_name" name="last_name" className="form-control" />
                    <label htmlFor="name">The Technician's Last Name</label>
                    </div>
                </div>
                </div>
                <button className="btn btn-lg btn-primary">Create technician</button>
            </form>
            <div className={messageClasses} id="success-message">
              Congratulations! Your technician has been registered!
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>
  );
}

export default TechnicianForm;

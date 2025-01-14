import React, { useEffect, useState } from 'react';


function SalespersonForm() {
    const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    employee_id: '',
  })

  const [isSubmitted, setIsSubmitted] = useState(false);

  const fetchData = async () => {
    const url = 'http://localhost:8090/api/salespeople/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = 'http://localhost:8090/api/salespeople/';

    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {

      setFormData({
        first_name: '',
        last_name: '',
        employee_id: '',
      });
      setIsSubmitted(true);
    }
  }

  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;

    setFormData({
      ...formData,

      [inputName]: value
    });
  }

  let messageClasses = isSubmitted ? 'alert alert-success mb-0' : 'd-none';
  let formClasses = isSubmitted ? 'd-none' : '';


  return (
    <div className="my-5 container">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a Salesperson</h1>
          <form className={formClasses} onSubmit={handleSubmit} id="create-salesperson-form">
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.first_name} placeholder="First name" required type="text" name="first_name" id="first_name" className="form-control" />
              <label htmlFor="first_name">First name</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.last_name} placeholder="Last name" required type="text" name="last_name" id="last_name" className="form-control" />
              <label htmlFor="last_name">Last name</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.employee_id} placeholder="Employee ID" required type="text" name="employee_id" id="employee_id" className="form-control" />
              <label htmlFor="employee_id">Employee ID</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
          <div className={messageClasses} id="success-message">
            Congratulations! Your salesperson has been registered!
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalespersonForm;

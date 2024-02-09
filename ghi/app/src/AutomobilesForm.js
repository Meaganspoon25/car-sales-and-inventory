import React, { useEffect, useState } from 'react';


function AutomobilesForm() {
  const [models, setModels] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    color: '',
    year: '',
    vin: '',
    model: '',
  })

  const fetchData = async () => {
    const url = 'http://localhost:8100/api/models/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setModels(data.models);
    } else {
      console.error('An error occurred fetching the data')
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const adjustedFormData = {
        ...formData,
        model_id: formData.model,
      };
      delete adjustedFormData.model;

      const url = 'http://localhost:8100/api/automobiles/';

    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(adjustedFormData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {

      setFormData({
        color: '',
        year: '',
        vin: '',
        model: '',
      });
      setIsSubmitted(true);
    }
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  let messageClasses = isSubmitted ? 'alert alert-success mb-0' : 'd-none';
  let formClasses = isSubmitted ? 'd-none' : '';

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new automobile</h1>
          <form className={formClasses} onSubmit={handleSubmit} id="create-automobile-form">
          <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.vin} placeholder="VIN" required type="text" name="vin" id="vin" className="form-control" />
              <label htmlFor="vin">VIN</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.color} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
              <label htmlFor="color">Color</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.year} placeholder="Year" required type="text" name="year" id="year" className="form-control" />
              <label htmlFor="year">Year</label>
            </div>
            <div className="mb-3">
              <select onChange={handleFormChange} value={formData.model} required name="model" id="model" className="form-select">
                <option value="">Choose a model</option>
                {models.map(model => (
                  <option key={model.id} value={model.id}>{model.name}</option>
                ))}
              </select>
            </div>
            <button className="btn btn-primary">Create that automobile!</button>
          </form>
          <div className={messageClasses} id="success-message">
                    Congratulations! Your automobile has been registered!
          </div>
        </div>
      </div>
    </div>
  )
}

export default AutomobilesForm;

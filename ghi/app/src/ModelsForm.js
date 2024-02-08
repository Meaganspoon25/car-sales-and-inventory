import React, { useEffect, useState } from 'react';


function ModelsForm() {
  const [manufacturers, setManufacturers] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    picture_url: '',
    manufacturer: '',
  })

  const fetchData = async () => {
    const url = 'http://localhost:8100/api/manufacturers/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setManufacturers(data.manufacturers);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const adjustedFormData = {
        ...formData,
        manufacturer_id: formData.manufacturer,
      };
      delete adjustedFormData.manufacturer;

      const url = 'http://localhost:8100/api/models/';

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
        name: '',
        picture_url: '',
        manufacturer: '',
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
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new model</h1>
          <form className={formClasses} onSubmit={handleSubmit} id="create-model-form">
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
              <label htmlFor="name">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.picture_url} placeholder="Picture URL" required type="text" name="picture_url" id="picture_url" className="form-control" />
              <label htmlFor="starts">Picture URL</label>
            </div>
            <div className="mb-3">
              <select onChange={handleFormChange} value={formData.manufacturer.id} required name="manufacturer" id="manufacturer" className="form-select">
                <option value="">Choose a manufacturer</option>
                {manufacturers.map(manufacturer => {
                  return (
                    <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
                  )
                })}
              </select>
            </div>
            <button className="btn btn-primary">Create that model!</button>
          </form>
          <div className={messageClasses} id="success-message">
            Congratulations! Your model has been registered!
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModelsForm;

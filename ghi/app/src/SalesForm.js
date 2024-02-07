import React, { useState, useEffect } from 'react';

function SalesForm() {
  const [formData, setFormData] = useState({
    automobile: '',
    salesperson: '',
    customer: '',
    price: '',
  });

  const [automobiles, setAutomobiles] = useState([]);
  const [salespersons, setSalespersons] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchData('http://localhost:8100/api/automobiles', setAutomobiles);
    fetchData('http://localhost:8090/api/salespeople', setSalespersons);
    fetchData('http://localhost:8090/api/customers', setCustomers);
  }, []);

  const fetchData = async (url, setter) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setter(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted:', formData);

    const url = 'http://localhost:8090/api/sales/'


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
        automobile: '',
        salesperson: '',
        customer: '',
        price: '',
      });
    }
  }



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="my-5 container">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h2>Record a new sale</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <select
                id="automobile"
                name="automobile"
                value={formData.automobile}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">Choose an automobile VIN</option>
                {automobiles?.autos?.map((automobile) => (
                  <option key={automobile.id} value={automobile.id}>
                    {automobile.vin}
                  </option>
                ))}
              </select>
              <label htmlFor="automobile">Automobile VIN</label>
            </div>
            <div className="form-floating mb-3">
              <select
                id="salesperson"
                name="salesperson"
                value={formData.salesperson}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">Choose a Salesperson</option>
                {salespersons?.salespersons?.map((salesperson) => (
                  <option key={salesperson.id} value={salesperson.id}>
                    {salesperson.first_name} {salesperson.last_name}
                  </option>
                ))}
              </select>
              <label htmlFor="salesperson">Salesperson</label>
            </div>
            <div className="form-floating mb-3">
              <select
                id="customer"
                name="customer"
                value={formData.customer}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">Choose a Customer</option>
                {customers?.customers?.map((customers) => (
                  <option key={customers.id} value={customers.id}>
                    {customers.first_name} {customers.last_name}
                  </option>
                ))}
              </select>
              <label htmlFor="customer">Customer</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Price"
                required
              />
              <label htmlFor="price">Price</label>
            </div>
            <button type="submit" className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SalesForm;

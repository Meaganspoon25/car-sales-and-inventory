import React, { useEffect, useState } from 'react';


function ManufacturersForm() {

  const [name, setName] = useState('');
  const [hasCreated, setHasCreated] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.name = name;

    const manufacturerUrl = 'http://localhost:8100/api/manufacturers/';
    const fetchOptions = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const manufacturerResponse = await fetch(manufacturerUrl, fetchOptions);
    if (manufacturerResponse.ok) {
          setName('');
          setHasCreated(true);
    } else {
        console.error('An error occurred fetching the data')
      }
    }

    const handleChangeName = (event) => {
        const value = event.target.value;
        setName(value);
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
                <form className={formClasses} onSubmit={handleSubmit} id="create-manufacturer-form">
                    <h1 className="card-title">Create a Manufacturer</h1>
                    <p className="mb-3">
                    Please enter the manufacturer details.
                    </p>
                    <div className="row">
                    <div className="row">
                        <div className="form-floating mb-3">
                        <input onChange={handleChangeName} required placeholder="Manufacturer Name" type="text" id="name" name="name" className="form-control" />
                        <label htmlFor="name">The Manufacturer's Name</label>
                        </div>
                    </div>
                    </div>
                    <button className="btn btn-lg btn-primary">Create that manufacturer!</button>
                </form>
                <div className={messageClasses} id="success-message">
                    Congratulations! Your manufacturer has been registered!
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}

export default ManufacturersForm;

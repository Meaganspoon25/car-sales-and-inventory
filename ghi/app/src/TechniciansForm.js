import React, { useEffect, useState } from 'react';


function HatForm() {

  const [name, setName] = useState('');
  const [fabric, setFabric] = useState('');
  const [style_name, setStyle_Name] = useState('');
  const [color, setColor] = useState('');
  const [pic_url, setPic_Url] = useState('');
  const [location, setLocation] = useState('');
  const [locations, setLocations] = useState([]);
  const [hasCreated, setHasCreated] = useState(false);

  const fetchData = async () => {
    const url = 'http://localhost:8100/api/locations/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setLocations(data.locations);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.location = location;
    data.name = name;
    data.fabric = fabric;
    data.style_name = style_name;
    data.color = color;
    data.pic_url = pic_url;

    const hatUrl = 'http://localhost:8090/api/hats/';
    const fetchOptions = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const hatResponse = await fetch(hatUrl, fetchOptions);
    if (hatResponse.ok) {
          setLocation('');
          setName('');
          setFabric('');
          setStyle_Name('');
          setColor('');
          setPic_Url('');
          setHasCreated(true);
    }
  }

  const handleChangeLocation = (event) => {
    const value = event.target.value;
    setLocation(value);
  }

  const handleChangeName = (event) => {
    const value = event.target.value;
    setName(value);
  }

  const handleChangeFabric = (event) => {
    const value = event.target.value;
    setFabric(value);
  }

  const handleChangeStyle_Name = (event) => {
    const value = event.target.value;
    setStyle_Name(value);
  }

  const handleChangeColor = (event) => {
    const value = event.target.value;
    setColor(value);
  }

  const handleChangePic_Url = (event) => {
    const value = event.target.value;
    setPic_Url(value);
  }

  let spinnerClasses = 'd-flex justify-content-center mb-3';
  let dropdownClasses = 'form-select d-none';
  if (locations.length > 0) {
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
              <form className={formClasses} onSubmit={handleSubmit} id="create-hat-form">
                <h1 className="card-title">It's Hat Time!</h1>
                <p className="mb-3">
                  Please choose which location
                  you'd like to store the hat in.
                </p>
                <div className={spinnerClasses} id="loading-location-spinner">
                  <div className="spinner-grow text-secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
                <div className="mb-3">
                  <select onChange={handleChangeLocation} name="location" id="location" className={dropdownClasses} required>
                    <option value="">Choose a location</option>
                    {locations.map(location => {
                      return (
                        <option key={location.href} value={location.href}>{location.closet_name}</option>
                      )
                    })}
                  </select>
                </div>
                <p className="mb-3">
                  Please enter the hat details.
                </p>
                <div className="row">
                  <div className="row">
                    <div className="form-floating mb-3">
                      <input onChange={handleChangeName} required placeholder="Hat name" type="text" id="name" name="name" className="form-control" />
                      <label htmlFor="name">The hat's name</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-floating mb-3">
                      <input onChange={handleChangeFabric} required placeholder="Fabric" type="text" id="fabric" name="fabric" className="form-control" />
                      <label htmlFor="name">Fabric type</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-floating mb-3">
                      <input onChange={handleChangeStyle_Name} required placeholder="Style" type="text" id="style" name="style" className="form-control" />
                      <label htmlFor="name">Style type</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-floating mb-3">
                      <input onChange={handleChangeColor} required placeholder="Color" type="text" id="color" name="color" className="form-control" />
                      <label htmlFor="name">Color</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-floating mb-3">
                      <input onChange={handleChangePic_Url} required placeholder="Pic_Url" type="text" id="pic_url" name="pic_url" className="form-control" />
                      <label htmlFor="name">Picture URL</label>
                    </div>
                  </div>
                </div>
                <button className="btn btn-lg btn-primary">Store that hat!</button>
              </form>
              <div className={messageClasses} id="success-message">
                Congratulations! Your hat is registered!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HatForm;

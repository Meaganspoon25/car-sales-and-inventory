import React, { useEffect, useState } from 'react';


function ModelsList() {
  const [models, setModels] = useState([]);

  const getData = async ()=> {
    const response = await fetch('http://localhost:8100/api/models/');
    if (response.ok) {
      const data = await response.json();
      const sortedModels = data.models.sort((a, b) => a.id - b.id);
      setModels(sortedModels);
    } else {
      console.error('An error occurred fetching the model list data')
    }
  }

  useEffect(()=> {
    getData()
  }, []);

  return (
    <div className="my-5 container">
      <div className="row">
        <h1>Current Models</h1>
        <table className="table table-striped m-3">
          <thead>
            <tr>
              <th>Id</th>
              <th>Model Name</th>
              <th>Manufacturer</th>
              <th>Picture URL</th>
            </tr>
          </thead>
          <tbody>
            {models.map(model => {
              return (
                <tr key={model.href}>
                  <td>{ model.id }</td>
                  <td>{ model.name }</td>
                  <td>{ model.manufacturer.name }</td>
                  <td>{ model.picture_url }</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ModelsList;

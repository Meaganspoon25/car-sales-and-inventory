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
                  {/* <td>{ model.picture_url }</td> */}
                  <td>
                    {/* <img src={ model.picture_url } alt="" className="img-thumbnail" style={{height:"150px", width:"250px"}}/> */}
                    {model.picture_url ? (
                      <img src={model.picture_url} alt={model.name} className="img-thumbnail" style={{height: "150px", width: "250px"}}/>
                    ) : (
                      <span style={{color: 'red'}}>(No URL provided)</span>
                    )}
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

export default ModelsList;

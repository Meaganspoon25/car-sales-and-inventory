import React, { useState, useEffect } from 'react';

function SalespeopleList() {
    const [salespersons, setSalespersons] = useState([])

    const getData = async () => {
        const response = await fetch('http://localhost:8090/api/salespeople/')
        if (response.ok) {
            const { salespersons } = await response.json();
            setSalespersons(salespersons);
        } else {
            console.error('An Error Has Occurred!')
        }
    }

    useEffect(() => {
        getData()
    }, []);

    return (
        <div className="my-5 container">
            <div className="row">
                <h1>Salespeople</h1>
                <table className="table table-striped m-3">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salespersons.map(salespersons => (
                            <tr key={salespersons.id}>
                                <td>{salespersons.employee_id}</td>
                                <td>{salespersons.first_name}</td>
                                <td>{salespersons.last_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SalespeopleList;

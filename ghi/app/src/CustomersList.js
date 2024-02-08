import React, { useState, useEffect } from 'react';


function CustomersList() {
    const [customers, setCustomers] = useState([])

    const getData = async () => {
        const response = await fetch('http://localhost:8090/api/customers/')
        if (response.ok) {
            const { customers } = await response.json();
            setCustomers(customers);
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
                <h1>Customers</h1>
                <table className="table table-striped m-3">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(customers => (
                            <tr key={customers.id}>
                                <td>{customers.first_name}</td>
                                <td>{customers.last_name}</td>
                                <td>{customers.phone_number}</td>
                                <td>{customers.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CustomersList;

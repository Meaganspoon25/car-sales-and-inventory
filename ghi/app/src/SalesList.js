import React, { useState, useEffect } from 'react';


function SalesList() {
    const [sales, setSales] = useState([])

    const getData = async () => {
        const response = await fetch('http://localhost:8090/api/sales/')
        if (response.ok) {
            const { sales } = await response.json();
            console.log(sales);
            setSales(sales);
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
                <h1>Sales</h1>
                <table className="table table-striped m-3">
                    <thead>
                        <tr>
                            <th>Salesperson Employee ID</th>
                            <th>Salesperson</th>
                            <th>Customer</th>
                            <th>VIN</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map(sales => (
                            <tr key={sales.id}>
                                <td>{sales.salesperson.employee_id}</td>
                                <td>{sales.salesperson.first_name} {sales.salesperson.last_name}</td>
                                <td>{sales.customer.first_name} {sales.customer.last_name}</td>
                                <td>{sales.automobile.vin}</td>
                                <td>{sales.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SalesList;

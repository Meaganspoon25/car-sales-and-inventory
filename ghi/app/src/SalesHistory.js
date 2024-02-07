import React, { useState, useEffect } from 'react';

function SalespersonHistory() {
    const [sales, setSales] = useState([]);
    const [selectedSalesperson, setSelectedSalesperson] = useState('');
    const [salespersons, setSalespeople] = useState([]);

    useEffect(() => {
        fetchData();
        fetchSalespeople();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8090/api/sales/');
            if (response.ok) {
                const data = await response.json();
                setSales(data.sales);
            } else {
                console.error('Failed to fetch sales data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchSalespeople = async () => {
        try {
            const response = await fetch('http://localhost:8090/api/salespeople/');
            if (response.ok) {
                const data = await response.json();
                setSalespeople(data.salespersons);
            } else {
                console.error('Failed to fetch salespeople data');
            }
        } catch (error) {
            console.error('Error fetching salespeople data:', error);
        }
    };

    const handleSalespersonChange = (event) => {
        setSelectedSalesperson(event.target.value);
    };

    const filteredSales = selectedSalesperson
        ? sales.filter(sale => sale.salesperson.name === selectedSalesperson)
        : [];

    return (
        <div className="my-5 container">
            <h1>Salesperson History</h1>
            <div className="mb-3">
                <select
                    value={selectedSalesperson}
                    onChange={handleSalespersonChange}
                    required
                    className="form-select"
                >
                    <option value="">Choose a Salesperson</option>
                    {salespersons.map(salesperson => (
                        <option key={salesperson.id} value={salesperson.name}>
                            {salesperson.first_name} {salesperson.last_name}
                        </option>
                    ))}
                </select>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Salesperson</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSales.map(sale => (
                        <tr key={sale.id}>
                            <td>{sale.salesperson.employee_id}</td>
                            <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                            <td>{sale.automobile.vin}</td>
                            <td>{sale.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SalespersonHistory;

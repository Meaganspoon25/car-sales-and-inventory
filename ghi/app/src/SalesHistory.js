import React, { useState, useEffect } from "react";

export default function SalespersonsHistory() {
  const [salespersons, setSalespersons] = useState([]);
  const [selectedSalesperson, setSelectedSalesperson] = useState("");
  const [filteredSales, setFilteredSales] = useState([]);
  const [allSales, setAllSales] = useState([]);

  async function fetchSalespersons() {
    try {
      const response = await fetch("http://localhost:8090/api/salespeople/");
      if (response.ok) {
        const data = await response.json();
        setSalespersons(data.salespersons);
      } else {
        console.error("Failed to fetch salespeople data");
      }
    } catch (error) {
      console.error("Error fetching salespeople data:", error);
    }
  }

  async function fetchSalesData() {
    try {
      const response = await fetch("http://localhost:8090/api/sales/");
      if (response.ok) {
        const data = await response.json();
        setAllSales(data.sales);
      } else {
        console.error("Failed to fetch sales data");
      }
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  }

  useEffect(() => {
    fetchSalespersons();
    fetchSalesData();
  }, []);

  function handleSalespersonChange(e) {
    const selectedSalespersonId = e.target.value;
    setSelectedSalesperson(selectedSalespersonId);
    const filteredSales = allSales.filter(
      sale => sale.salesperson.employee_id === selectedSalespersonId
    );
    setFilteredSales(filteredSales);
  }

  return (
    <div className="SalespersonsHistory">
      <h1>Salespersons History</h1>
      <div className="mb-3">
        <select
          value={selectedSalesperson}
          onChange={handleSalespersonChange}
          required
          className="form-select"
        >
          <option value="">Choose a Salesperson</option>
          {salespersons.map(salesperson => (
            <option key={salesperson.id} value={salesperson.employee_id}>
              {salesperson.first_name} {salesperson.last_name}
            </option>
          ))}
        </select>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Salesperson Employee ID</th>
            <th>Customer</th>
            <th>Automobile VIN</th>
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

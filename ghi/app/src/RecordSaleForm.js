function RecordSaleForm({sales}) {

    if (sales === undefined) {
        return null;
    }
    return (
        <table className="table table-striped">
            <thead>
            <tr>
                <th>Salesperson</th>
                <th>Employee Number</th>
                <th>Customers Name</th>
                <th>Automobile VIN</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>
            {sales.map(sale => {
                return (
                <tr key={sale.id}>
                    <td>{ sale.salesperson.name }</td>
                    <td>{ sale.salesperson.employee_number }</td>
                    <td>{ sale.customer.name }</td>
                    <td>{ sale.automobile.vin }</td>
                    <td>{ sale.price }</td>

                </tr>
                );
            })}

            </tbody>
        </table>
    );
}


export default RecordSaleForm;

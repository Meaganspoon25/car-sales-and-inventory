import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav id="myCenter" nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <div className="navbar-nav-wrapper">
        <ul className="navbar-nav mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">Home</NavLink>
          </li>
          <li className="nav-item nav-section-title">
            <NavLink className="nav-link" to="/manufacturers/">Manufacturers</NavLink>
          </li>
          <li className="nav-item">
             <NavLink className="nav-link" to="/manufacturers/new">Create a Manufacturer</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/models/">Models</NavLink>
              </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/models/new">Create a Model</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/automobiles/">Automobiles</NavLink>
          </li>
          <li className="nav-item">
             <NavLink className="nav-link" to="/automobiles/new">Create an Automobile</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/salespeople/">Salespeople</NavLink>
              </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/salespeople/new">Add a Salesperson</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/customers/">Customers</NavLink>
          </li>
          </ul>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
             <NavLink className="nav-link" to="/customers/new">Add a Customer</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/sales/">Sales</NavLink>
              </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/sales/new">Add a Sale</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/technicians/">Technicians</NavLink>
          </li>
          <li className="nav-item">
             <NavLink className="nav-link" to="/technicians/new">Add an Technician</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/appointments/">Service Appointments</NavLink>
              </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/appointments/new">Create a Service Appointment</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/manufacturer">Service History</NavLink>
          </li>
        </ul>
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;

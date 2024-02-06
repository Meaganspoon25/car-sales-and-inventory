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
            <NavLink className="nav-link" to="/manufacturer/">Automobiles</NavLink>
          </li>
          <li className="nav-item">
             <NavLink className="nav-link" to="/manufacturer">Create an Automobile</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/manufacturer/">Salespeople</NavLink>
              </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/manufacturer">Add a Salesperson</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/manufacturer/">Customers</NavLink>
          </li>
          </ul>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
             <NavLink className="nav-link" to="/manufacturer">Add a Customer</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/manufacturer/">Sales</NavLink>
              </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/manufacturer">Add a Sale</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/manufacturer/">Technicians</NavLink>
          </li>
          <li className="nav-item">
             <NavLink className="nav-link" to="/manufacturer">Add an Technician</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/manufacturer/">Service Appointments</NavLink>
              </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/manufacturer">Create a Service Appointment</NavLink>
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

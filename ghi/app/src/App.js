import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import MainPage from './MainPage';
// import ManufacturerList from './ManufacturerList';
// import ManufacturerForm from './ManufacturerForm';

// import ModelsList from './ModelsList';
// import ModelsForm from './ModelsForm';

// import AutomobilesList from './AutomobilesList';
// import AutomobilesForm from './AutomobilesForm';

import SalespeopleList from './SalespeopleList';
import SalespersonForm from './SalespersonForm';

import CustomersList from './CustomersList';
import CustomersForm from './CustomersForm';

import SalesList from './SalesList';
import SalesForm from './SalesForm';

// import TechnicianList from './TechnicianList';
// import TechnicianForm from './TechnicianForm';

// import AppointmentList from './AppointmentList';
// import AppointmentForm from './AppointmentForm';



function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
      <Routes>
          <Route path="/" element={<MainPage />} />
          {/* <Route path="/shoes" element={<ManufacturerList />} />
          <Route path="/shoes/new" element={<ManufacturerForm />} /> */}

          {/* <Route path="/models" element={<ModelsList />} />
          <Route path="/models/new" element={<ModelsForm />} /> */}

          {/* <Route path="/automobiles" element={<AutomobilesList />} />
          <Route path="/automobiles/new" element={<AutomobilesForm />} /> */}

          <Route path="/salespeople" element={<SalespeopleList />} />
          <Route path="/salespeople/new" element={<SalespersonForm />} />

          <Route path="/customers" element={<CustomersList />} />
          <Route path="/customers/new" element={<CustomersForm />} />

          <Route path="/sales" element={<SalesList />} />
          <Route path="/sales/new" element={<SalesForm />} />

          {/* <Route path="/technicians" element={<TechnicianList />} />
          <Route path="/technicians/new" element={<TechnicianForm />} /> */}

          {/* <Route path="/appointments" element={<AppointmentList />} />
          <Route path="/appointments/new" element={<AppointmentForm />} /> */}

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

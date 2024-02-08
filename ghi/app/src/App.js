import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import MainPage from './MainPage';
import ManufacturersList from './ManufacturersList';
import ManufacturersForm from './ManufacturersForm';

import ModelsList from './ModelsList';
import ModelsForm from './ModelsForm';

import AutomobilesList from './AutomobilesList';
import AutomobilesForm from './AutomobilesForm';

import SalespeopleList from './SalespeopleList';
import SalespersonForm from './SalespersonForm';

import CustomersList from './CustomersList';
import CustomersForm from './CustomersForm';

import SalesList from './SalesList';
import SalesForm from './SalesForm';

import TechniciansList from './TechniciansList';
import TechniciansForm from './TechniciansForm';

import AppointmentsList from './AppointmentsList';
import AppointmentsForm from './AppointmentsForm';

import AppointmentsHistory from './AppointmentsHistory';



function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
      <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/manufacturers" element={<ManufacturersList />} />
          <Route path="/manufacturers/new" element={<ManufacturersForm />} />

          <Route path="/models" element={<ModelsList />} />
          <Route path="/models/new" element={<ModelsForm />} />

          <Route path="/automobiles" element={<AutomobilesList />} />
          <Route path="/automobiles/new" element={<AutomobilesForm />} />

          <Route path="/salespeople" element={<SalespeopleList />} />
          <Route path="/salespeople/new" element={<SalespersonForm />} />

          <Route path="/customers" element={<CustomersList />} />
          <Route path="/customers/new" element={<CustomersForm />} />

          <Route path="/sales" element={<SalesList />} />
          <Route path="/sales/new" element={<SalesForm />} />
          <Route path="/sales/history" element={<SalesHistory />} />

          <Route path="/technicians" element={<TechniciansList />} />
          <Route path="/technicians/new" element={<TechniciansForm />} />

          <Route path="/appointments" element={<AppointmentsList />} />
          <Route path="/appointments/new" element={<AppointmentsForm />} />

          <Route path="/appointments/history" element={<AppointmentsHistory />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

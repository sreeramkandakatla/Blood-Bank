import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Hospital from './pages/Hospital';

// Donor Pages
import DonorEntry from './pages/Donor/DonorEntry';
import DonorSignup from './pages/Donor/DonorSignup';
import DonorLogin from './pages/Donor/DonorLogin';
import DonorDashboard from './pages/Donor/DonorDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout wraps all routes */}
        <Route path="/" element={<Layout />}>
          {/* Public Pages */}
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="hospital" element={<Hospital />} />

          {/* Donor Routes */}
          <Route path="donor" element={<DonorEntry />} />
          <Route path="donor/signup" element={<DonorSignup />} />
          <Route path="donor/login" element={<DonorLogin />} />
          <Route path="donor/dashboard" element={<DonorDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

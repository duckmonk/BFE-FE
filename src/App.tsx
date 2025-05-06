import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import SampleCases from './pages/SampleCases';
import Login from './pages/Login';
import Review from './pages/Review';
import Inquiry from './pages/Inquiry';
import Footer from './components/Footer';
import Guidelines from './pages/Guidelines';
import CaseDetails from './pages/CaseDetails';
import InquiryDashboard from './pages/InquiryDashboard';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sample-case" element={<SampleCases />} />
          <Route path="/review" element={<Review />} />
          <Route path="/login" element={<Login />} />
          <Route path="/inquiry" element={<Inquiry />} />
          {/* <Route path="/inquiry-dashboard" element={<InquiryDashboard />} /> */}
          <Route path="/guidelines" element={<InquiryDashboard />} />
          {/* <Route path="/guidelines" element={<Guidelines />} /> */}
          <Route path="/case-details" element={<CaseDetails />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;

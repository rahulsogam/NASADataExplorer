import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import DataPage from './DataPage';

const RoutesWrapper = () => {
  return (
    <Router>
       <Routes >
            <Route path="/" element={<App />} />
            <Route path="/data" element={<DataPage />} />
       </Routes>
    </Router>
  );
};

export default RoutesWrapper;
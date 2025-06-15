import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Module from './Module';

const RoutesWrapper = () => {
  return (
    <Router>
       <Routes>
            <Route path="/" element={<App />} />
            <Route path="/data" element={<Module />} />
       </Routes>
    </Router>
  );
};

export default RoutesWrapper;
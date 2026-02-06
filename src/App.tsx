import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainSite from './MainSite';
import Admin from './pages/Admin';

function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="*" element={<MainSite />} />
      </Routes>
    </Router>
  );
}

export default App;

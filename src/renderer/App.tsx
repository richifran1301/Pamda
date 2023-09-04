import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
// import icon from '../../assets/icon.svg';
import NavBar from './Components/NavBar/NavBar';
import HomePage from './Components/Home/Home';
import 'bootstrap/dist/css/bootstrap.css';

function MainProgram() {
  return (
    <div>
      <NavBar />
      <HomePage />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainProgram />} />
      </Routes>
    </Router>
  );
}

import './App.css';
import Header from './Header';
import SigninPage from './SigninPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<>Home Page</>}>Home Page</Route>
        <Route path="/home" element={<>Home Page</>}>Home Page</Route>
        <Route path="/signin" element={<SigninPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

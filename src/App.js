import './App.css';

// Basic tools 
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Page of the app
import SemanticUIPage from './SemanticUIPage';
import FirebasePage from './FirebasePage';

const HomePage = () => {
  return (
    <>
      <Link to="/semantic-ui">Semantic-UI</Link>
      <hr />
      <Link to="/firebase">Firebase</Link>
    </>)
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>Home Page</Route>
        <Route path="/home" element={<HomePage />}>Home Page</Route>
        <Route path="/semantic-ui" element={<SemanticUIPage />} />
        <Route path="/firebase" element={<FirebasePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

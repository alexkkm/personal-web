import './App.css';

// Basic tools 
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Page of the app
import SemanticUIPage from './SemanticUIPage';
import FirebasePage from './FirebasePage';
import Test from './Test';
import FontTemplate from './font/font';
import CyberpunkPage from './cyberpunk_theme/cyberpunk';
import DarkThemePage from './cyberpunk_theme/darktheme';

const HomePage = () => {
  return (
    <>
      <Link to="/semantic-ui">Semantic-UI</Link>
      <hr />
      <Link to="/firebase">Firebase</Link>
      <hr />
      <Link to="/cyberpunk">Cyberpunk Theme</Link>
      <hr />
      <Link to="/darktheme">Dark Cyberpunk theme</Link>
      <hr />
      <Link to="/test">Test</Link>
    </>)
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>Home Page</Route>
        <Route path="/home" element={<HomePage />}>Home Page</Route>
        <Route path="/test" element={<Test />} />
        <Route path="/semantic-ui" element={<SemanticUIPage />} />
        <Route path="/firebase" element={<FirebasePage />} />
        <Route path="/font" element={<FontTemplate />} />
        <Route path="/cyberpunk" element={<CyberpunkPage />} />
        <Route path="/darktheme" element={<DarkThemePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import './App.css';
import Header from './Header';
import NewPostPage from './NewPost';
import PostsPage from './Posts';
import SigninPage from './SigninPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<PostsPage />}>Home Page</Route>
        <Route path="/home" element={<PostsPage />}>Home Page</Route>
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/new-post" element={<NewPostPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; 
import MovieList from "./views/Movies";
import Login from "./views/Login";
import Register from "./views/Register";
export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
        <Route path="/" element={<MovieList />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

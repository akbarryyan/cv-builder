import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import HomePage from "./pages/Home.jsx";
import CVSelectionPage from "./pages/CVSelectionPage.jsx";
import CVFormPage from "./pages/CVFormPage.jsx";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/cv-builder" element={<CVSelectionPage />} />
        <Route path="/cv-builder/new" element={<CVFormPage />} />
        <Route path="/cv-builder/:cvId" element={<CVFormPage />} />
      </Routes>
    </Router>
  );
}

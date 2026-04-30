import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import Dashboard from "./screens/Dashboard";

export default function App() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
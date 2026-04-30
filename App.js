import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginScreen from "./screens/LoginScreen";
import Dashboard from "./screens/Dashboard";
import ClassesScreen from "./screens/ClassesScreen";
import StudentsScreen from "./screens/StudentsScreen";
import AddStudentScreen from "./screens/AddStudentScreen";
import RequiredDocsScreen from "./screens/RequiredDocsScreen";
import UploadDocScreen from "./screens/UploadDocScreen";
import ReviewDocsScreen from "./screens/ReviewDocsScreen";
import AdminDashboard from "./screens/AdminDashboard";

export default function App() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <BrowserRouter>
        <Routes>
          {/* Auth */}
          <Route path="/" element={<LoginScreen />} />

          {/* Main */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/classes" element={<ClassesScreen />} />
          <Route path="/students" element={<StudentsScreen />} />
          <Route path="/add-student/:classId" element={<AddStudentScreen />} />

          {/* Documents */}
          <Route path="/required-docs" element={<RequiredDocsScreen />} />
          <Route path="/upload-doc" element={<UploadDocScreen />} />
          <Route path="/review-doc" element={<ReviewDocsScreen />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
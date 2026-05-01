import { BrowserRouter, Routes, Route } from "react-router-dom";

// Screens
import LoginScreen from "./screens/LoginScreen";
import Dashboard from "./screens/Dashboard";
import ClassesScreen from "./screens/ClassesScreen";
import StudentsScreen from "./screens/StudentsScreen";
import AddStudentScreen from "./screens/AddStudentScreen";
import RequiredDocsScreen from "./screens/RequiredDocsScreen";
import UploadDocScreen from "./screens/UploadDocScreen";
import ReviewDocsScreen from "./screens/ReviewDocsScreen";
import AdminDashboard from "./screens/AdminDashboard";
import PaymentScreen from "./screens/PaymentScreen";
import SchoolSetupScreen from "./screens/SchoolSetupScreen";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<LoginScreen />} />

        {/* Main */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/classes" element={<ClassesScreen />} />
        <Route path="/students" element={<StudentsScreen />} />
        <Route path="/add-student/:classId" element={<AddStudentScreen />} />

        {/* Docs */}
        <Route path="/required-docs" element={<RequiredDocsScreen />} />
        <Route path="/upload-doc" element={<UploadDocScreen />} />
        <Route path="/review-doc" element={<ReviewDocsScreen />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Optional */}
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/setup-school" element={<SchoolSetupScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

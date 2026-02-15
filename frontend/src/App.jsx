import { useState } from "react";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Dashboard from "./pages/Dashboard";


function App() {
  const [page, setPage] = useState("dashboard");
  const [mobileMenu, setMobileMenu] = useState(false);


  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col md:flex-row">

      {/* Mobile Top Bar */}
      <div className="md:hidden flex justify-between items-center bg-gray-900 text-white p-4">
        <h1 className="text-lg font-semibold">HRMS Lite</h1>
        <button onClick={() => setMobileMenu(!mobileMenu)}>
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`bg-gray-900 text-white p-6 space-y-4 
        md:w-64 md:block 
        ${mobileMenu ? "block" : "hidden"} md:flex md:flex-col`}
      >
        <h1 className="hidden md:block text-xl font-semibold mb-6">
          HRMS Lite
        </h1>
        <button
          onClick={() => setPage("dashboard")}
          className={`mb-4 px-4 py-2 rounded-lg text-left ${page === "dashboard"
            ? "bg-blue-600"
            : "bg-gray-800 hover:bg-gray-700"
            }`}
        >
          Dashboard
</button>

        <button
          onClick={() => {
            setPage("employees");
            setMobileMenu(false);
          }}
          className={`px-4 py-2 rounded-lg text-left ${page === "employees"
            ? "bg-blue-600"
            : "bg-gray-800 hover:bg-gray-700"
            }`}
        >
          Employees
        </button>

        <button
          onClick={() => {
            setPage("attendance");
            setMobileMenu(false);
          }}
          className={`px-4 py-2 rounded-lg text-left ${page === "attendance"
            ? "bg-blue-600"
            : "bg-gray-800 hover:bg-gray-700"
            }`}
        >
          Attendance
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="max-w-5xl mx-auto py-8 px-4 md:px-8">
          {page === "dashboard" && <Dashboard />}
          {page === "employees" && <Employees />}
          {page === "attendance" && <Attendance />}
        </div>
      </div>
    </div>
  );
}

export default App;

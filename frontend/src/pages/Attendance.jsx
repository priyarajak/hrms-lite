import { useEffect, useState } from "react";
import API from "../services/api";

function Attendance() {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("Present");
    const [attendanceData, setAttendanceData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchEmployees = async () => {
        const res = await API.get("/api/employees");
        setEmployees(res.data);
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchAttendance = async (employeeId) => {
        setLoading(true);
        const res = await API.get(`/api/attendance/${employeeId}`);
        setAttendanceData(res.data);
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedEmployee || !date) {
            alert("Please select employee and date");
            return;
        }

        try {
            await API.post("/api/attendance", {
                employee_id: parseInt(selectedEmployee),
                date,
                status
            });

            fetchAttendance(selectedEmployee);
        } catch (err) {
            alert(err.response?.data?.detail || "Error");
        }
    };

    return (
        <div className="space-y-10">
            <h2 className="text-2xl font-semibold text-gray-800">
                Attendance Management
      </h2>

            {/* Form Card */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end"
                >
                    <div>
                        <label className="block text-sm text-gray-600 mb-2">
                            Employee
            </label>
                        <select
                            className="border border-gray-200 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={selectedEmployee}
                            onChange={(e) => {
                                setSelectedEmployee(e.target.value);
                                if (e.target.value) fetchAttendance(e.target.value);
                            }}
                        >
                            <option value="">Select Employee</option>
                            {employees.map((emp) => (
                                <option key={emp.id} value={emp.id}>
                                    {emp.full_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-2">
                            Date
            </label>
                        <input
                            type="date"
                            max={new Date().toISOString().split("T")[0]}
                            className="border border-gray-200 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />

                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-2">
                            Status
            </label>
                        <select
                            className="border border-gray-200 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Mark
          </button>
                </form>
            </div>

            {/* Attendance Table */}
            {selectedEmployee && (
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    {loading ? (
                        <p className="text-gray-500">Loading attendance...</p>
                    ) : attendanceData ? (
                        <>
                            <h3 className="text-lg font-medium mb-6">
                                {attendanceData.employee} —{" "}
                                <span className="text-green-600">
                                    {attendanceData.total_present_days} Present Days
                </span>
                            </h3>

                            {attendanceData.attendance_records.length === 0 ? (
                                <p className="text-gray-500">
                                    No attendance records found.
                                </p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left min-w-[500px]">
                                        <thead>
                                            <tr className="border-b text-gray-600 text-sm uppercase tracking-wide">
                                                <th className="pb-4">Date</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {attendanceData.attendance_records.map((record) => (
                                                <tr
                                                    key={record.id}
                                                    className="border-b last:border-none hover:bg-gray-50"
                                                >
                                                    <td className="py-4">{record.date}</td>
                                                    <td
                                                        className={
                                                            record.status === "Present"
                                                                ? "text-green-600 font-medium"
                                                                : "text-red-500 font-medium"
                                                        }
                                                    >
                                                        {record.status}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </>
                    ) : (
                        <p className="text-gray-500">
                            Select an employee to view attendance.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Attendance;

import { useEffect, useState } from "react";
import API from "../services/api";

function Employees() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        employee_id: "",
        full_name: "",
        email: "",
        department: ""
    });

    const fetchEmployees = async () => {
        setLoading(true);
        const res = await API.get("/api/employees");
        setEmployees(res.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/api/employees", form);
            setForm({
                employee_id: "",
                full_name: "",
                email: "",
                department: ""
            });
            fetchEmployees();
        } catch (err) {
            alert(err.response?.data?.detail || "Error");
        }
    };

    const handleDelete = async (id) => {
        await API.delete(`/api/employees/${id}`);
        fetchEmployees();
    };

    return (
        <div className="space-y-10">
            <h2 className="text-2xl font-semibold text-gray-800">
                Employee Management
      </h2>

            {/* Form Card */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    <input
                        className="border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Employee ID"
                        value={form.employee_id}
                        onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
                    />
                    <input
                        className="border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Full Name"
                        value={form.full_name}
                        onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                    />
                    <input
                        className="border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <input
                        className="border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Department"
                        value={form.department}
                        onChange={(e) => setForm({ ...form, department: e.target.value })}
                    />

                    <button
                        type="submit"
                        className="md:col-span-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Add Employee
          </button>
                </form>
            </div>

            {/* Table Card */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                {loading ? (
                    <p className="text-gray-500">Loading employees...</p>
                ) : employees.length === 0 ? (
                    <p className="text-gray-500">No employees found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[600px]">
                            <thead>
                                <tr className="border-b text-gray-600 text-sm uppercase tracking-wide">
                                    <th className="pb-4">ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Department</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((emp) => (
                                    <tr
                                        key={emp.id}
                                        className="border-b last:border-none hover:bg-gray-50 transition"
                                    >
                                        <td className="py-4">{emp.employee_id}</td>
                                        <td>{emp.full_name}</td>
                                        <td>{emp.email}</td>
                                        <td>{emp.department}</td>
                                        <td>
                                            <button
                                                onClick={() => handleDelete(emp.id)}
                                                className="text-red-500 hover:text-red-700 text-sm"
                                            >
                                                Delete
                    </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Employees;

import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
    const [data, setData] = useState(null);
    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [view, setView] = useState(null); // present / absent

    const fetchDashboard = async (date) => {
        const res = await API.get("/api/dashboard", {
            params: { selected_date: date }
        });
        setData(res.data);
    };

    useEffect(() => {
        fetchDashboard(selectedDate);
    }, [selectedDate]);

    if (!data) return <p>Loading dashboard...</p>;

    const renderEmployeeList = () => {
        const list =
            view === "present"
                ? data.present_employees
                : data.absent_employees;

        if (!view) return null;

        return (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mt-8">
                <h3 className="text-xl font-semibold mb-6 capitalize">
                    {view} Employees ({data.date})
        </h3>

                {list.length === 0 ? (
                    <p className="text-gray-500">No records found.</p>
                ) : (
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b text-gray-600 text-sm uppercase">
                                <th className="pb-4">Employee Code</th>
                                <th>Name</th>
                                <th>Department</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((emp, idx) => (
                                <tr key={idx} className="border-b last:border-none">
                                    <td className="py-3">{emp.employee_id}</td>
                                    <td>{emp.full_name}</td>
                                    <td>{emp.department}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        );
    };

    return (
        <div className="space-y-10">
            <h2 className="text-2xl font-semibold">HR Dashboard</h2>

            {/* Date filter */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border w-fit">
                <label className="block text-sm mb-2">Select Date</label>
                <input
                    type="date"
                    max={new Date().toISOString().split("T")[0]}
                    value={selectedDate}
                    onChange={(e) => {
                        setView(null);
                        setSelectedDate(e.target.value);
                    }}
                    className="border p-2 rounded"
                />
            </div>

            {/* Cards */}
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-2xl border">
                    <p className="text-sm text-gray-500">Total Employees</p>
                    <h3 className="text-3xl font-bold">{data.total_employees}</h3>
                </div>

                <div
                    onClick={() => setView("present")}
                    className="bg-white p-8 rounded-2xl border cursor-pointer hover:bg-green-50"
                >
                    <p className="text-sm text-gray-500">Present</p>
                    <h3 className="text-3xl font-bold text-green-600">
                        {data.total_present}
                    </h3>
                </div>

                <div
                    onClick={() => setView("absent")}
                    className="bg-white p-8 rounded-2xl border cursor-pointer hover:bg-red-50"
                >
                    <p className="text-sm text-gray-500">Absent</p>
                    <h3 className="text-3xl font-bold text-red-500">
                        {data.total_absent}
                    </h3>
                </div>
            </div>

            {renderEmployeeList()}
        </div>
    );
}

export default Dashboard;

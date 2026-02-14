import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
    const [data, setData] = useState(null);
    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    const fetchDashboard = async (date) => {
        const res = await API.get("/api/dashboard", {
            params: { selected_date: date }
        });
        setData(res.data);
    };

    useEffect(() => {
        fetchDashboard(selectedDate);
    }, [selectedDate]);

    if (!data)
        return <p className="text-gray-500">Loading dashboard...</p>;

    return (
        <div className="space-y-10">
            <h2 className="text-2xl font-semibold text-gray-800">
                HR Dashboard
      </h2>

            {/* Date Filter */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-fit">
                <label className="block text-sm text-gray-600 mb-2">
                    Select Date
        </label>
                <input
                    type="date"
                    max={new Date().toISOString().split("T")[0]}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 mb-2">
                        Total Employees
          </p>
                    <h3 className="text-3xl font-bold text-gray-800">
                        {data.total_employees}
                    </h3>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 mb-2">
                        Present ({data.date})
          </p>
                    <h3 className="text-3xl font-bold text-green-600">
                        {data.total_present}
                    </h3>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 mb-2">
                        Absent ({data.date})
          </p>
                    <h3 className="text-3xl font-bold text-red-500">
                        {data.total_absent}
                    </h3>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;

import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/navbars/AdminNavbar";

import { useEffect, useState, useRef } from "react";
import axios from "../../utils/axios";
import { Pie, Line } from "react-chartjs-2";

import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
);

export default function AdminHome() {
  const navigate = useNavigate();

  const [missingStats, setMissingStats] = useState(null);
  const [issuerStats, setIssuerStats] = useState(null);

  const [filter, setFilter] = useState("all");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const analyticsRef = useRef(null);

  useEffect(() => {
    axios
      .get("/api/missing/admin/analytics")
      .then((res) => setMissingStats(res.data))
      .catch((err) => console.error(err));

    axios
      .get("/api/issuer/admin/analytics")
      .then((res) => setIssuerStats(res.data))
      .catch((err) => console.error(err));
  }, []);

  const scrollToAnalytics = () => {
    analyticsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  /* ---------------- ISSUER DEMO DATA ---------------- */

  let currentStats = null;

  if (filter === "missing") {
    currentStats = missingStats;
  }

  if (filter === "issuer") {
    currentStats = issuerStats;
  }

  if (filter === "all" && missingStats && issuerStats) {
    currentStats = {
      total: missingStats.total + issuerStats.total,
      approved: missingStats.approved + issuerStats.approved,
      rejected: missingStats.rejected + issuerStats.rejected,
      underVerification: missingStats.underVerification || 0,
      pending: missingStats.pending + issuerStats.pending,
    };
  }

  /* ---------------- PIE CHART ---------------- */

  let chartData = null;

  if (currentStats) {
    chartData = {
      labels: ["Approved", "Rejected", "Under Verification", "Pending"],
      datasets: [
        {
          data: [
            currentStats.approved,
            currentStats.rejected,
            currentStats.underVerification,
            currentStats.pending,
          ],
          backgroundColor: ["#22c55e", "#ef4444", "#f59e0b", "#3b82f6"],
        },
      ],
    };
  }

  /* ---------------- MONTHLY GRAPH ---------------- */

  const monthlyData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Requests per Month",
        data: [5, 8, 12, 9, 15, 7],
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
        tension: 0.4,
      },
    ],
  };

  const applyDateFilter = () => {
    const params = {
      startDate,
      endDate,
    };

    if (filter === "missing" || filter === "all") {
      axios
        .get("/api/missing/admin/analytics", { params })
        .then((res) => setMissingStats(res.data))
        .catch((err) => console.error(err));
    }

    if (filter === "issuer" || filter === "all") {
      axios
        .get("/api/issuer/admin/analytics", { params })
        .then((res) => setIssuerStats(res.data))
        .catch((err) => console.error(err));
    }
  };

  // CLEAR DATE FILTER (ADDED)
  const clearDateFilter = () => {
    setStartDate("");
    setEndDate("");

    axios
      .get("/api/missing/admin/analytics")
      .then((res) => setMissingStats(res.data))
      .catch((err) => console.error(err));

    axios
      .get("/api/issuer/admin/analytics")
      .then((res) => setIssuerStats(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <AdminNavbar />

      <div className="bg-gray-50">
        {/* ================= HERO SECTION (FULL SCREEN) ================= */}

        <section className="h-screen flex items-center justify-center px-6">
          <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl p-12 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Welcome, Administrator 👋
            </h1>

            <p className="text-gray-600 text-lg mb-8">
              As an administrator, you verify and manage issued document
              requests, approve or reject applications, and monitor missing
              document cases.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button
                onClick={() => navigate("/admin/issuer-reports")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl shadow text-lg"
              >
                📊 Issuer Reports
              </button>

              <button
                onClick={() => navigate("/admin/missing-reports")}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-xl shadow text-lg"
              >
                🚨 Missing Reports
              </button>
            </div>

            <button
              onClick={scrollToAnalytics}
              className="mt-8 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl shadow text-lg"
            >
              📈 System Analytics
            </button>
          </div>
        </section>

        {/* ================= ANALYTICS SECTION ================= */}

        <section
          ref={analyticsRef}
          className="min-h-screen max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-10 text-center mb-20"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            📊 System Analytics
          </h2>

          {/* -------- FILTER BUTTONS -------- */}

          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setFilter("all")}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg"
            >
              All
            </button>

            <button
              onClick={() => setFilter("issuer")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Issuer Reports
            </button>

            <button
              onClick={() => setFilter("missing")}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
            >
              Missing Reports
            </button>
          </div>

          {/* -------- DATE FILTER -------- */}

          <div className="flex justify-center gap-4 mb-6">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border p-2 rounded"
            />

            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border p-2 rounded"
            />

            <button
              onClick={applyDateFilter}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Apply Filter
            </button>

            <button
              onClick={clearDateFilter}
              className="bg-gray-600 text-white px-4 py-2 rounded"
            >
              Clear
            </button>
          </div>

          {currentStats ? (
            <>
              {/* -------- STATISTICS CARDS -------- */}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                <div className="bg-blue-100 p-4 rounded-lg">
                  <h3 className="text-xl font-bold">{currentStats.total}</h3>
                  <p>Total</p>
                </div>

                <div className="bg-green-100 p-4 rounded-lg">
                  <h3 className="text-xl font-bold">{currentStats.approved}</h3>
                  <p>Approved</p>
                </div>

                <div className="bg-red-100 p-4 rounded-lg">
                  <h3 className="text-xl font-bold">{currentStats.rejected}</h3>
                  <p>Rejected</p>
                </div>

                <div className="bg-yellow-100 p-4 rounded-lg">
                  <h3 className="text-xl font-bold">
                    {currentStats.underVerification}
                  </h3>
                  <p>Under Verification</p>
                </div>
              </div>

              {/* -------- PIE CHART -------- */}

              <div className="flex justify-center mb-10">
                <div className="w-72">
                  <Pie data={chartData} />
                </div>
              </div>

              {/* -------- MONTHLY GRAPH -------- */}

              <h3 className="text-xl font-semibold mb-4">
                📈 Monthly Request Trend
              </h3>

              <div className="flex justify-center">
                <div className="w-96">
                  <Line data={monthlyData} />
                </div>
              </div>
            </>
          ) : (
            <p>Loading analytics...</p>
          )}

          {/* -------- EXPORT CSV -------- */}

          <button
            onClick={() => window.open("/api/missing/admin/export")}
            className="mt-10 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg"
          >
            ⬇ Export Reports (CSV)
          </button>
        </section>
      </div>
    </>
  );
}

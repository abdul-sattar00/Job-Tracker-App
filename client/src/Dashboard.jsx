import { useEffect, useState } from "react";

const API = "http://localhost:5000/api/jobs";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setJobs(data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const stats = {
    total: jobs.length,
    applied: jobs.filter(j => j.status === "Applied").length,
    interview: jobs.filter(j => j.status === "Interview").length,
    rejected: jobs.filter(j => j.status === "Rejected").length,
    selected: jobs.filter(j => j.status === "Selected").length,
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* SIDEBAR */}
      <div className="w-64 bg-white shadow-lg p-5 hidden md:block">
        <h1 className="text-xl font-bold text-blue-600 mb-8">
          JobSaaS 🚀
        </h1>

        <nav className="space-y-3 text-gray-600">
          <p className="font-semibold text-blue-500">Dashboard</p>
          <p>Jobs</p>
          <p>Analytics</p>
          <p>Settings</p>
        </nav>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6">

        <h1 className="text-3xl font-bold mb-6">
          Dashboard
        </h1>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card title="Total" value={stats.total} />
          <Card title="Applied" value={stats.applied} />
          <Card title="Interview" value={stats.interview} />
          <Card title="Rejected" value={stats.rejected} />
          <Card title="Selected" value={stats.selected} />
        </div>

        {/* PIPELINE */}
        <Pipeline jobs={jobs} />

      </div>
    </div>
  );
}

/* COMPONENTS */

function Card({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function Pipeline({ jobs }) {
  const columns = ["Applied", "Interview", "Rejected", "Selected"];

  return (
    <div className="grid md:grid-cols-4 gap-4">
      {columns.map(status => (
        <div key={status} className="bg-white rounded-xl p-3 shadow">
          <h2 className="font-bold mb-3">{status}</h2>

          {jobs
            .filter(job => job.status === status)
            .map(job => (
              <div key={job._id} className="p-2 bg-gray-50 rounded mt-2">
                <p className="font-semibold">{job.company}</p>
                <p className="text-sm text-gray-500">{job.role}</p>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
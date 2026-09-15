import React, { useEffect, useMemo, useState } from 'react';
import { Plus, Search, ChevronRight, Wrench, Car, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { jobService } from '../../services/job.service';

export const JobList = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await jobService.getJobs();
        setJobs(Array.isArray(data) ? data : []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter((job) => {
      const matchesStatus = status === 'All' || job.status === status;
      const matchesQuery = !q || [job.jobNumber, job.id, job.customerName, job.customerPhone, job.vehicleReg, job.vehicleInfo, job.assignedEmployeeName]
        .some((value) => String(value || '').toLowerCase().includes(q));
      return matchesStatus && matchesQuery;
    });
  }, [jobs, query, status]);

  const counts = {
    total: jobs.length,
    active: jobs.filter((j) => !['Delivered', 'Cancelled'].includes(j.status)).length,
    waiting: jobs.filter((j) => j.status === 'Waiting for Parts').length,
    ready: jobs.filter((j) => j.status === 'Ready for Delivery').length
  };

  return (
    <div className="simple-jobs-page">
      <header className="simple-jobs-head">
        <div><span className="job-create-kicker">WORKSHOP</span><h1>Job Cards</h1><p>Open a job card, add costs and work updates, then create the invoice when the vehicle is ready.</p></div>
        <button type="button" className="job-primary-btn" onClick={() => navigate('/jobs/new')}><Plus size={17}/> New Job Card</button>
      </header>

      <div className="simple-job-stats">
        <button onClick={() => setStatus('All')}><span>Total</span><strong>{counts.total}</strong></button>
        <button onClick={() => setStatus('All')}><span>Active</span><strong>{counts.active}</strong></button>
        <button onClick={() => setStatus('Waiting for Parts')}><span>Waiting Parts</span><strong>{counts.waiting}</strong></button>
        <button onClick={() => setStatus('Ready for Delivery')}><span>Ready</span><strong>{counts.ready}</strong></button>
      </div>

      <div className="simple-job-toolbar">
        <label className="simple-job-search"><Search size={17}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search job, vehicle or customer"/></label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>All</option><option>Checked In</option><option>Inspection</option><option>In Progress</option><option>Waiting for Parts</option><option>Quality Check</option><option>Ready for Delivery</option><option>Delivered</option><option>Cancelled</option>
        </select>
      </div>

      {loading ? <div className="simple-job-empty">Loading job cards…</div> : filtered.length === 0 ? <div className="simple-job-empty">No job cards found.</div> : (
        <div className="simple-job-list">
          {filtered.map((job) => (
            <button type="button" className="simple-job-card" key={job.id} onClick={() => navigate(`/jobs/${job.id}`)}>
              <div className="simple-job-main">
                <div className="simple-job-title-row"><strong>{job.jobNumber || job.id}</strong><span className="simple-job-status">{job.status || 'Checked In'}</span></div>
                <div className="simple-job-meta"><span><Car size={14}/>{job.vehicleReg || 'No registration'} · {job.vehicleInfo || 'Vehicle'}</span><span><User size={14}/>{job.customerName || 'Walk-in customer'}</span>{job.assignedEmployeeName && <span><Wrench size={14}/>{job.assignedEmployeeName}</span>}</div>
              </div>
              <ChevronRight size={18}/>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;

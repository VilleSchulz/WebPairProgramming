import { Link } from "react-router-dom";
import JobListing from "./JobListing";

const JobListings = ({ jobs }) => {
  return (
    <div className="job-list">
      {jobs.length === 0 && <p>No jobs found</p>}
      {jobs.length !== 0 &&
        jobs.map((job) => (
          <div key={job.id}>
            <JobListing job={job} />
            <button>
              <Link to={`/jobs/${job.id}`} style={{ textDecoration: 'none' }} >View Job</Link>
            </button>
          </div>
        ))}
    </div>
  );
};

export default JobListings;

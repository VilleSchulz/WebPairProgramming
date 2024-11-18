import JobListing from "../components/JobListing";
import { useEffect, useState } from "react";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const apiUrl = "http://localhost:4000/api/jobs";

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${apiUrl}`);

        if (!response.ok) {
          throw new Error(`HTTP ERROR! Status ${response.status}`);
        }

        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="home">
      <div className="job-list">
        {jobs.length === 0 && <p>No jobs found</p>}
        {jobs.length !== 0 &&
          jobs.map((job) => <JobListing key={job.id} {...job} />)}
      </div>
    </div>
  );
};

export default Home;

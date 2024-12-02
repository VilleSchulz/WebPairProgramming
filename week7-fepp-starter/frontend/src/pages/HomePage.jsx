import JobListings from "../components/JobListings";
import { useEffect, useState } from "react";
const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [isPending, setIspending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("api/jobs");
        if (!response.ok) {
          throw new Error("could not fetch the data from that resource");
        }
        const data = await response.json();
        setIspending(false);
        setJobs(data);
        setError(null);
      } catch (error) {
        setError(error.message);
        setIspending(false);
        console.error(error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {jobs && <JobListings jobs={jobs} />}
    </div>
  );
};

export default Home;

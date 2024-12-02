import { useEffect, useState } from "react";
import JobListing from "../components/JobListing";
import { useParams, useNavigate, Link} from "react-router-dom";

const JobPage = () => {
    const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState();
  const [isPending, setIspending] = useState(true);
  const [error, setError] = useState(null);

  const deleteJob = async (id) => {
    try {
      const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });

      if (!res.ok) {
        throw new Error("Failed to delete job");
      }
    } catch (error) {
      console.error("Error deleting a job", error);
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch job");
        }
        const data = await res.json();
        setJob(data);
        setIspending(false);
        setError(null);
      } catch (error) {
        setError(error.message);
        setIspending(false);
        console.error(error);
      }
    };
    fetchJob();
  }, [id]);

  const onDeleteClick = (jobId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this listing?" + jobId
    );
    if (!confirm) {
      return;
    }
    deleteJob(jobId);
    navigate("/")
  };

  return (
    <>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {job && (
        <>
          <JobListing job={job} />
          <button onClick={() => onDeleteClick(job._id)}>Delete</button>
          <button><Link to={`/edit-job/${job.id}`} style={{ textDecoration: 'none' }}>Edit</Link></button>
          
        </>
      )}
    </>
  );
};

export default JobPage;

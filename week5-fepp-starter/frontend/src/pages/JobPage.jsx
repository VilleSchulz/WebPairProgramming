import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const JobPage = () => {
  const apiUrl = "http://localhost:4000/api/jobs";
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const deleteJob = async () => {
    try {
      const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error(
          `Failed to fetch job details. Status: ${response.status}`
        );
      }
      if (response.status === 204) {
        console.log("Job deleted successfully");
        navigate("/"); // Redirect to the homepage after deletion
      } 
     

    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  

  const getJobInfo = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch job details. Status: ${response.status}`
        );
      }
      const data = await response.json();
      console.log("Job details:", data);
      setJob(data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  useEffect(() => {
    console.log("Use efect triggered", id);
    getJobInfo(id);
  }, []);

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="job-details">
      <h2>{job.title}</h2>
      <p>Type: {job.type}</p>
      <p>Description: {job.description}</p>
      <p>Company: {job.company.name}</p>
      <p>Contact Email: {job.company.contactEmail}</p>
      <p>Contact Phone: {job.company.contactPhone}</p>
      <p>Location: {job.location}</p>
      <p>Salary: {job.salary}</p>
      <p>Posted Date: {job.postedDate}</p>
      <Link to={`/edit-job/${id}`}>
        <button>Edit Job</button>
      </Link>
      <button onClick={deleteJob}>Delete Job</button>
    </div>
  );
};

export default JobPage;

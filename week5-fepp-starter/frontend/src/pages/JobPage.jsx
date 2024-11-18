import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const JobPage = () => {
  const apiUrl = "http://localhost:4000/api/jobs";
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  const deleteJob = async () => {
    console.log(JobPage);
  };

  if (!job) {
    return <div>Loading...</div>;
  }

  const getJobInfo = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`);
      const data = await response.json();
      console.log("Job details:", data);
      setJob(data)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("Use efect triggered",id)
    getJobInfo(id);
  }, []);

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

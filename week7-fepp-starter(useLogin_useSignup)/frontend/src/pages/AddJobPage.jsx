import { useState } from "react";
import useField from "../hooks/useField";
import { useNavigate } from "react-router-dom";
const AddJobPage = () => {
  const navigate = useNavigate();
  const jobDescription = useField("text");
  const companyName = useField("text");
  const contactEmail = useField("text");
  const contactPhone = useField("text");
  const jobTitle = useField("text");
  const [jobType, setJobType] = useState("Full-Time");

  const addJob = async (newJob) => {
    try {
      const response = await fetch("api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJob),
      });
      if (!response.ok) {
        throw new Error("Failed to add job");
      }
      const json = await response.json();
      console.log("New job added:", json);
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  };

  const submitForm = (e) => {
    e.preventDefault();
    const newJob = {
      title: jobTitle.value,
      type: jobType,
      description: jobDescription.value,
      company: {
        name: companyName.value,
        contactEmail: contactEmail.value,
        contactPhone: contactPhone.value,
      },
    };

    console.log("submitForm called");
    addJob(newJob);
    navigate("/");
  };

  return (
    <div className="create">
      <h2>Add a New Job</h2>
      <form onSubmit={submitForm}>
        <label>Job title:</label>
        <input {...jobTitle} required />
        <label>Job type:</label>
        <select
          onChange={(e) => {
            setJobType(e.target.value);
            console.log(e.target.value);
          }}
        >
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Job Description:</label>
        <textarea required {...jobDescription}></textarea>
        <label>Company Name:</label>
        <input {...companyName} required />
        <label>Contact Email:</label>
        <input {...contactEmail} required />
        <label>Contact Phone:</label>
        <input {...contactPhone} required />
        <button>Add Job</button>
      </form>
    </div>
  );
};

export default AddJobPage;

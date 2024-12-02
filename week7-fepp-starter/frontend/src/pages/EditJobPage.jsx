import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useField from "../hooks/useField";
const EditJobPage = () => {
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const updateJob = async (job) => {
    try {
      const res = await fetch(`/api/jobs/${job.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
      });

      if (!res.ok) {
        throw new Error("Failed to update job");
      }
      return res.ok;
    } catch (error) {
      console.error("Error updating job", error);
      return false;
    }
  };
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);

        if (!res.ok) {
          throw new Error("Cannot fetch current jop");
        }

        const data = await res.json();
        setJob(data);
        setLoading(false);
        setTitle(data.title);
        setDescription(data.description);
        setCompanyName(data.company.name);
        setContactEmail(data.company.contactEmail);
        setContactPhone(data.company.contactPhone);
        setType(data.type);
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    };
    fetchJob();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();

    const updatedJob = {
      id,
      title,
      type,
      description,
      company: {
        name: companyName,
        contactEmail,
        contactPhone,
      },
    };
    const succes = await updateJob(updatedJob);
    if (succes) {
      navigate(`/jobs/${id}`);
    } else {
      toast.error("Failed to update the job");
    }
  };
  return (
    <div className="create">
      <h2>Edit job</h2>
      <form onSubmit={submitForm}>
        <label>Job title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Job type:</label>
        <select
          onChange={(e) => {
            setType(e.target.value);
            console.log(e.target.value);
          }}
        >
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>
        <label>Job Description:</label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label>Company Name:</label>
        <input
          type="text"
          required
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <label>Contact Email:</label>
        <input
          type="text"
          required
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />
        <label>Contact Phone:</label>
        <input
          type="text"
          required
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
        />
        <button>Update Job</button>
      </form>
    </div>
  );
};

export default EditJobPage;

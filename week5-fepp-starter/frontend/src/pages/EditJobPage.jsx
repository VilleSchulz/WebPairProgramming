import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const apiUrl = "http://localhost:4000/api/jobs";

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`${apiUrl}/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch job");
        }
        const data = await res.json();
        setTitle(data.title);
        setType(data.type);
        setDescription(data.description);
        setCompanyName(data.company.name);
        setContactEmail(data.company.contactEmail);
        setContactPhone(data.company.contactPhone);
        setLocation(data.location);
        setSalary(data.salary);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchJob();
  }, [id]);

  const submitForm = (e) => {
    e.preventDefault();
    const updatedJob = {
      company: {
        name: companyName,
        contactEmail: contactEmail,
        contactPhone: contactPhone
      },
      title: title,
      type: type,
      description: description,
      location: location,
      salary: salary
    };
    const updateJob = async () => {

      try {
        console.log("trying to update ",id)
        const response = await fetch(`${apiUrl}/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedJob),
        });
        if (!response.ok) {
          throw new Error("Failed to update job");
        }
        const data = await response.json();
        console.log("Job updated: ", data);
        navigate(`/jobs/${id}`);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    updateJob();

    console.log("EditJobPage");
  };

  const cancelEdit = () => {
    fetchJob();
    navigate(`/jobs/${id}`);

    console.log("cancelEdit");
  };

  return (
    <div className="create">
      <h2>Edit Job</h2>
      <form onSubmit={submitForm}>
        <label>Job title:</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <label>Job type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="" disabled>
            Select job type
          </option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Job Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label>Company Name:</label>
        <input
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <label>Contact Email:</label>
        <input
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />
        <label>Contact Phone:</label>
        <input
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
        />
        <label>Location:</label>
        <input value={location} onChange={(e) => setLocation(e.target.value)} />
        <label>Salary:</label>
        <input value={salary} onChange={(e) => setSalary(e.target.value)} />
        <button type="submit">Update Job</button>
        <button type="button" onClick={cancelEdit}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditJobPage;

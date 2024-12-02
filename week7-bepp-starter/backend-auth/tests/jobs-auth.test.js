const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Job = require("../models/jobModel");
const User = require("../models/userModel");

const jobs = [
  {
    title: "Kullin kaivaja",
    type: "Full-Time",
    description: "Kaiva syvältä maasta",
    company: {
      name: "Kuldakuume",
      contactEmail: "ASD@gmail.com",
      contactPhone: "123123332",
    },
  },
  {
    title: "Jutustelija",
    type: "Full-Time",
    description: "justusteleppa vähä",
    company: {
      name: "Savon jurinat",
      contactEmail: "ASD@gmail.com",
      contactPhone: "123123332",
    },
  },
];
let token = null;

beforeAll(async () => {
  await User.deleteMany({});
  const result = await api.post("/api/users/signup").send({
    name: "John Doe",
    email: "john@example.com",
    password: "R3g5T7#gh",
    phone_number: "1234567890",
    gender: "Male",
    date_of_birth: "1990-01-01",
    membership_status: "Inactive",
  });
  token = result.body.token;
});

describe("Given there are initially some jobs saved", () => {
  beforeEach(async () => {
    await Job.deleteMany({});
    await Promise.all([
      await api
        .post("/api/jobs")
        .set("Authorization", "bearer " + token)
        .send(jobs[0]),
      await api
        .post("/api/jobs")
        .set("Authorization", "bearer " + token)
        .send(jobs[1]),
    ]);
  });

  it("should return all jobs as JSON when GET /api/jobs is called", async () => {
    await api
      .get("/api/jobs")
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should create one job when POST /api/jobs is called", async () => {
    const newJob = {
      title: "Jutustelija2",
      type: "Full-Time",
      description: "justusteleppa vähä2",
      company: {
        name: "Savon jurinat 2",
        contactEmail: "ASD@gmail.com",
        contactPhone: "123123332",
      },
    };
    await api
      .post("/api/jobs")
      .set("Authorization", "bearer " + token)
      .send(newJob)
      .expect(201);
  });

  it("should return one job by ID when GET /api/jobs/:id is called", async () => {
    const job = await Job.findOne();
    await api.get("/api/jobs/" + job._id)
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should update one job by ID when PUT /api/jobs/:id is called", async () => {
    const job = await Job.findOne();
    const updatedJob = {
      company: { contactEmail: "adddded@gmail.com" },
      description: "älä sano mitää",
    };
    const response = await api
      .put(`/api/jobs/${job._id}`)
      .set("Authorization", "bearer " + token)
      .send(updatedJob)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    console.log("Response body ", response.body);
    const updatedJobCheck = await Job.findById(job._id);
    console.log("Updated job:", updatedJobCheck);

    expect(updatedJobCheck.description).toBe(updatedJob.description);
    expect(updatedJobCheck.company.contactEmail).toBe(
      updatedJob.company.contactEmail
    );
  });

  it("should delete one job by ID when DELETE /api/job/:id is called", async () => {
    const job = await Job.findOne();
    await api
      .delete("/api/jobs/" + job._id)
      .set("Authorization", "bearer " + token)
      .expect(204);
    const jobCheck = await Job.findById(job._id);
    expect(jobCheck).toBeNull();
  });
});
afterAll(() => {
  mongoose.connection.close();
});

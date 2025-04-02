const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Job = require("../models/jobModel");

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

describe("Job Controller", () => {
  beforeEach(async () => {
    await Job.deleteMany({});
    await Job.insertMany(jobs);
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  //Test GET /api/jobs
  it("should return all jobs as JSON when GET /api/jobs is called", async () => {
    const response = await api
      .get("/api/jobs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(jobs.length);
  });

  //Test POST /api/tours
  it("should create a new job when POST /api/jobs is called", async () => {
    const newJob = {
      title: "Jutustelija2",
      type: "Full-Time",
      description: "justusteleppa vähä2",
      company: {
        name: "Savon jurinat2",
        contactEmail: "ASD@gmail.com",
        contactPhone: "123123332",
      },
    };

    await api
      .post("/api/jobs")
      .send(newJob)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const jobsAfterPost = await Job.find({});
    expect(jobsAfterPost).toHaveLength(jobs.length + 1);
    const jobNames = jobsAfterPost.map((job) => job.title);
    expect(jobNames).toContain(newJob.title);
  });

  //Test GET /api/jobs/:id
  it("should return one job by ID when GET /api/jobs/:id is called", async () => {
    const job = await Job.findOne();
    await api
      .get(`/api/jobs/${job._id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should retur 404 for non-existing job ID", async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    await api.get(`/api/jobs/${nonExistentId}`).expect(404);
  });

  //Test PUT /api/jobs/:id
  it("should update one job with partial data when PUT /api/jobs/:id is called", async () => {
    const job = await Job.findOne();
    const updatedJob = {
      company: { contactEmail: "adddded@gmail.com" },
      description: "älä sano mitää",
    };

    await api
      .put(`/api/jobs/${job._id}`)
      .send(updatedJob)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const updatedJobCheck = await Job.findById(job._id);
    expect(updatedJobCheck.company.contactEmail).toBe(
      updatedJob.company.contactEmail
    );
    expect(updatedJobCheck.description).toBe(updatedJob.description);
  });

  it("should return 400 for invalid job ID when PUT /api/job/:id", async () => {
    const invalidId = "12332";
    await api.put(`/api/jobs/${invalidId}`).send({}).expect(400);
  });

  //Test DELETE /api/jobs/:id
  it("should delete one job by ID when DELETE /api/jobs/:id is called", async () => {
    const job = await Job.findOne();
    await api.delete(`/api/jobs/${job._id}`).expect(204);
    const deletedJobCheck = await Job.findById(job._id);

    expect(deletedJobCheck).toBeNull();
  });

  it("should return 400 for invalid job ID when DELETE /api/jobs/:id", async () => {
    const invalidId = "12133";
    await api.delete(`/api/jobs/${invalidId}`).expect(400);
  });
});

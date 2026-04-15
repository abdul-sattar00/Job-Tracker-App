const Job = require("../models/Job");

// Create job
exports.createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all jobs
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update job
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete job
exports.deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ msg: "Job deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
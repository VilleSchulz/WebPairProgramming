const Feedback = require("./feedbackLib");

const getAllFeedbacks = (req, res) => {
    const feedback = Feedback.getAllFeedbacks();
    res.json(feedback);
};

const createFeedback = (req, res) => {
    const {sender,message,rating} = req.body;
    const newFeedback = Feedback.createFeedback(sender,message,rating);
    if(newFeedback){
        res.json(newFeedback);
    }
    else{
        res.status(500).json({Message:"Failed to create feedback"});
    }
};

const getFeedbackById = (req, res) => {
    const feedback = Feedback.getFeedbackById(req.params.feedbackId);
    if(feedback){
        res.json(feedback);
    }
    else{
        res.status(404).json({message:"Feedback not found"});
    }
};

const updateFeedback = (req, res) => {
    const  feedbackId = req.params.feedbackId;
    const {sender,message,rating} = req.body;
    const updatedFeedback = Feedback.updateFeedback(feedbackId,{sender,message,rating});
    if (updatedFeedback) {
        res.json(updatedFeedback);
    } else {
        res.status(404).json({ message: "Feedback not found" });
    }

};


const deleteFeedback = (req, res) => {
    const feedbackId = req.params.feedbackId;
    const isDeleted = Feedback.deleteFeedback(feedbackId);
    if(isDeleted){
        res.json({message:"Feedback deleted successfully"});
    }
    else{   
        res.status(404).json({message:"Feedback not found"});
    }
};

module.exports = {
  getAllFeedbacks,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
};
let feedbackArray = [];
let nextId = 1;


function getAllFeedbacks(){
    return feedbackArray;
}


function createFeedback(sender,message,rating){
    if(!sender || !message || !rating){
        return false;
    }
    const newFeedback={
        id:nextId++,
        sender,
        message,
        rating
    }
    feedbackArray.push(newFeedback);
    return newFeedback;
}
function getFeedbackById (id){
    const numericID = Number(id);
    const feedback = feedbackArray.find(item=> item.id===numericID);
    if(feedback){
        return feedback;
    }
    else{
        return false;
    }

}

function updateFeedback(id,updatedData){
    const feedback = getFeedbackById(id);
    if(feedback){
        if(updatedData.sender){
            feedback.sender=updatedData.sender;
        }
        if(updatedData.message){
            feedback.message= updatedData.message;
        }
        if(updatedData.rating){
            feedback.rating=updatedData.rating;
        }
        return feedback;
    }
    return false;
}



function deleteFeedback(id){
    const feedback = getFeedbackById(id);
    if(feedback){
        const initialLength = feedbackArray.length;
        feedbackArray = feedbackArray.filter(item => item.id !== Number(id));
        return feedbackArray.length < initialLength;
    }
    
     return false;
}






if (require.main === module) {
    let result = addOne("John Smith",  "Great session on React components! I found the examples very helpful.", 4);
    console.log(result);
    console.log("getAll called:", getAll());
    console.log("findById called:", findById(1));
    // rest of the tests here
   }

  module.exports = {
    getAllFeedbacks,
    createFeedback,
    getFeedbackById,
    updateFeedback,
    deleteFeedback,
   }
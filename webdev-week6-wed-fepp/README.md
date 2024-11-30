We preferred the idea of containing the error checks in the mongoose model over having
them in the controller. It is more in line with the MVC model and helps keep the controller
simple.

We also had a discussion about returning status from the model if there is a server error, namely connection issue with database. We arrived in a conclusion that the controller's try catch handles the error so the backend won't crash and no need to add try catch to the model and we can return from the model an object with error, error message and status fields that can then be checked in the controller.
This way the controller can get the 500 error and relay it to the controller which in turn can relay to the front end which in turn can let the user know of the situation. Without this the current solution returns 400 Bad Request error for all errors and the user or frontend developer won't know the backend has issues in connecting to the database.
- try catch in the controller
- recognize the issue in model
- create a response object with error and status fields
- check the return value for the status existing and not being 200
- return status response based on the received status
- add the error message given by the model to the response to the frontend so it can take measures in handling it and informing user, for example "server issue, please try again in 5minutes/1 hour/next christmas"

Is this a good way of handling it or is there another industry standard way of doing this?
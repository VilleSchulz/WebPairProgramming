What are these functions (userSchema.statics.signup() and userSchema.statics.login())
- those are statics methods for creating user and login in.

Why are they used?
- singup checs from database if user allready exists on given email address, and login checks if user exists in database and if exists it returns user.


What are the pros and cons of using this approach?
PROS:
- Encapsulation of Logic: Keeps authentication-related logic (e.g., password hashing, validation) centralized in the model, adhering to the principle of separation of concerns.
- Reusability: Allows you to reuse signup and login logic anywhere in your application.
- Readability: Provides a clear, semantic way to call model-specific functions (e.g., User.signup, User.login).

CONS:
- The logic is tightly bound to the Mongoose model, which makes it harder to migrate away from Mongoose or switch to a different ORM/ODM in the future.
- If Mongoose-specific syntax or features change, you may need to update these methods.


What alternative approaches are available?

-  Service-Oriented Architecture:

Move the business logic (e.g., signup and login) into a service layer or utility module that handles application logic independently of the model.

- Middleware-Based Approach

If you're using a framework like Express, you can implement validation and authentication logic in middleware functions.

- Authentication Microservice

Decouple authentication entirely into a separate service (e.g., using a REST API or GraphQL). This is ideal for larger systems with multiple services requiring authentication.
- Use Authentication Libraries

Leverage pre-built libraries like Passport.js for authentication to avoid implementing custom solutions.
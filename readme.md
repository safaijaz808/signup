Below are the dependencies that we need to install to create this signup/signin app
express => (to use the router part)
mongoose => (to connect to the database)
bcrypt => (to encrypt the password before storing in the database)
jsonwebtoken(jwt) => (to generate the authentication token)


we'll use the JWT to sign the credential and bcrypt to encrypt the password before we store them in the database

we are performing the below tasks from the /registre api:
Get user input.
Validate user input.
Validate if the user already exists.
Encrypt the user password.
Create a user in our database.
And finally, create a signed JWT token.

-----------------------------------------------------------------------

we are performing the following tasks from the /login api:
Get user input.
Validate user input.
Validate if the user exists.
Verify user password against the password we saved earlier in our database.
And finally, create a signed JWT token.

---------------------------------------------------------------------
we’ll create a middleware that requires a user token in the header, which is the JWT token we generated earlier.
CREATE OR ALTER PROCEDURE spRegisterUser
    @userId UNIQUEIDENTIFIER,
    @username NVARCHAR(255),
    @email NVARCHAR(255),
    @password NVARCHAR(255)
AS
BEGIN
    -- Check if the user already exists
    IF EXISTS (SELECT 1 FROM users WHERE email = @email)
    BEGIN
        -- Throw an error if the user already exists
        THROW 50000, 'User with this email already exists', 1;
    END

    -- Insert the new user into the 'users' table
    INSERT INTO users (userId, username, email, [password])
    VALUES (@userId, @username, @email, @password);

    -- Return a success message or the user's data as needed
     SELECT @userId AS userId, @username AS username, @email AS email;
END;

GO
CREATE PROCEDURE spGetUser
    @email NVARCHAR(255)
AS
BEGIN
    -- Check if the user exists
    IF EXISTS (SELECT 1 FROM users WHERE email = @email)
    BEGIN
        -- Retrieve the user's data
        SELECT * FROM users WHERE email = @email;
    END
    ELSE
    BEGIN
        -- Throw an error if the user does not exist
        THROW 50000, 'User with this email does not exist', 1;
    END
END;

SELECT * FROM users;



GO 
CREATE PROCEDURE spGetUserById
    @userId UNIQUEIDENTIFIER
AS
BEGIN
    -- Check if the user with the given userId exists
    IF NOT EXISTS (SELECT 1 FROM Users WHERE userId = @userId)
    BEGIN
        -- If the user doesn't exist, return an error
        THROW 50001, 'User not found', 1;
    END

    -- Retrieve user information by userId
    SELECT * FROM Users WHERE userId = @userId;
END;

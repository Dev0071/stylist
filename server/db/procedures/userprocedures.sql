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
    SELECT 'User registered successfully' AS message;
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




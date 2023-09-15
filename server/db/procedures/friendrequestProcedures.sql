CREATE OR ALTER PROCEDURE spCreateFriendRequest
    @friendRequestId UNIQUEIDENTIFIER,
    @senderId UNIQUEIDENTIFIER,
    @receiverId UNIQUEIDENTIFIER
AS
BEGIN
    -- Check if the sender and receiver exist in the Users table
    IF NOT EXISTS (SELECT 1 FROM Users WHERE userId = @senderId)
    BEGIN
        -- If the sender doesn't exist, return an error
        THROW 50001, 'Sender does not exist', 1;
    END

    IF NOT EXISTS (SELECT 1 FROM Users WHERE userId = @receiverId)
    BEGIN
        -- If the receiver doesn't exist, return an error
        THROW 50002, 'Receiver does not exist', 1;
    END

    -- Insert the friend request into the FriendRequest table
    INSERT INTO friendRequest (requestId, whoRequestedId, receiverId, isAccepted)
    VALUES (@friendRequestId, @senderId, @receiverId, 0); -- Assuming isAccepted defaults to false

    -- Return a success message
    SELECT 'Friend request sent successfully' AS message;
END;

GO
CREATE OR ALTER PROCEDURE spAcceptFriendRequest
    @friendRequestId UNIQUEIDENTIFIER,
    @receiverId UNIQUEIDENTIFIER
AS
BEGIN
    -- Check if the friend request exists and is not accepted already
    IF NOT EXISTS (SELECT 1 FROM friendRequest WHERE requestId = @friendRequestId AND isAccepted = 0)
    BEGIN
        -- If the friend request does not exist or is already accepted, return an error
        THROW 50001, 'Invalid or already accepted friend request', 1;
    END

    -- Update the friend request to mark it as accepted
    UPDATE friendRequest
    SET isAccepted = 1
    WHERE requestId = @friendRequestId;

    -- Insert the friendship into the friends table
    INSERT INTO friends (userId1, userId2)
    VALUES (@receiverId, (SELECT whoRequestedId FROM friendRequest WHERE requestId = @friendRequestId));

    -- Return a success message
    SELECT 'Friend request accepted' AS message;
END;

GO
CREATE OR ALTER PROCEDURE spRejectFriendRequest
    @friendRequestId UNIQUEIDENTIFIER
  
AS
BEGIN
    -- Check if the friend request exists and is not accepted already
    IF NOT EXISTS (SELECT 1 FROM friendRequest WHERE requestId = @friendRequestId AND isAccepted = 0)
    BEGIN
        -- If the friend request does not exist or is already accepted, return an error
        THROW 50001, 'Invalid or already accepted friend request', 1;
    END

    -- Delete the friend request to reject it
    DELETE FROM friendRequest
    WHERE requestId = @friendRequestId;

    -- Return a success message
    SELECT 'Friend request rejected' AS message;
END;

CREATE PROCEDURE spCreatePost
    @postId UNIQUEIDENTIFIER,
    @whoPostedId UNIQUEIDENTIFIER,
    @media NVARCHAR(255) = NULL,
    @details NVARCHAR(MAX)
AS
BEGIN
    INSERT INTO posts (postId, whoPostedId, media, details)
    VALUES (@postId, @whoPostedId, @media, @details);

    SELECT 'Post created successfully' AS message;
END;

GO
CREATE PROCEDURE spGetPosts
AS
BEGIN
    SELECT * FROM posts;
END;

GO
CREATE PROCEDURE spSavePost
    @itemId UNIQUEIDENTIFIER,
    @whoseWardrobeId UNIQUEIDENTIFIER,
    @whichPostId UNIQUEIDENTIFIER
AS
BEGIN
    -- Check if the user and post exist
    IF NOT EXISTS (SELECT 1 FROM Users WHERE userId = @whoseWardrobeId)
    BEGIN
        -- Throw an error message if the user doesn't exist
        THROW 50001, 'User not found', 1;
        RETURN;
    END

    IF NOT EXISTS (SELECT 1 FROM Posts WHERE postId = @whichPostId)
    BEGIN
        -- Throw an error message if the post doesn't exist
        THROW 50002, 'Post not found', 1;
        RETURN;
    END

    -- Insert the post into the user's wardrobe
    INSERT INTO userWardrobe (itemId, whoseWardrobeId, whichPostId)
    VALUES (@itemId, @whoseWardrobeId, @whichPostId);

    -- Return a success message
    SELECT 'Post saved successfully' AS message;
END;

GO
CREATE PROCEDURE spGetSavedPosts
    @whosewardrobeId UNIQUEIDENTIFIER
AS
BEGIN
    SELECT p.*
    FROM posts p
    INNER JOIN userWardrobe uw ON p.postId = uw.whichPostId
    WHERE uw.whoseWardrobeId = @whosewardrobeId;
END;

GO
CREATE PROCEDURE spDeletePost
    @postId UNIQUEIDENTIFIER
AS
BEGIN
    -- Check if the post with the given postId exists
    IF NOT EXISTS (SELECT 1 FROM posts WHERE postId = @postId)
    BEGIN
        -- If the post doesn't exist, throw an error
        THROW 50000, 'Post with this postId does not exist', 1;
    END

    -- Delete the post with the given postId
    DELETE FROM posts WHERE postId = @postId;

    -- Return a success message
    SELECT 'Post deleted successfully' AS message;
END;

Go
CREATE OR ALTER PROCEDURE spLikeOrUnlikePost
    @postId UNIQUEIDENTIFIER,
    @userId UNIQUEIDENTIFIER
AS
BEGIN
    DECLARE @action NVARCHAR(255);

    -- Check if the user has already liked the post
    IF EXISTS (SELECT 1 FROM postLikes WHERE postId = @postId AND userId = @userId)
    BEGIN
        -- Unlike the post (delete the like)
        DELETE FROM postLikes WHERE postId = @postId AND userId = @userId;
        SET @action = 'unliked';
    END
    ELSE
    BEGIN
        -- Like the post (insert a new like)
        INSERT INTO postLikes (postId, userId)
        VALUES (@postId, @userId);
        SET @action = 'liked';
    END

    SELECT CONCAT('Post ', @action, ' successfully') AS message;
END;



GO
CREATE OR ALTER PROCEDURE spCountPostLikes
    @postId UNIQUEIDENTIFIER,
    @likeCount INT OUTPUT
AS
BEGIN
    -- Initialize the likeCount variable to 0
    SET @likeCount = 0;

    -- Count the number of likes for the specified post
    SELECT @likeCount = COUNT(*) 
    FROM postLikes 
    WHERE postId = @postId;

    -- Return the likeCount as the result of the procedure
    SELECT @likeCount AS likeCount;
END;

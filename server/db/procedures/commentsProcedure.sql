CREATE PROCEDURE spCreateComment
    @commentId UNIQUEIDENTIFIER,
    @whoCommentedId UNIQUEIDENTIFIER,
    @whichPostId UNIQUEIDENTIFIER,
    @commentDetails NVARCHAR(MAX)
AS
BEGIN
    -- Check if the post exists
    IF NOT EXISTS (SELECT 1 FROM posts WHERE postId = @whichPostId)
    BEGIN
        -- Throw an error if the post does not exist
        THROW 50001, 'The specified post does not exist.', 1;
    END

    -- Insert the new comment into the 'comments' table
    INSERT INTO comments (commentId, whoCommentedId, whichPostId, commentDetails)
    VALUES (@commentId, @whoCommentedId, @whichPostId, @commentDetails);

    -- Return a success message or the comment's data as needed
    SELECT 'Comment created successfully' AS message;
END;

Go 
CREATE PROCEDURE spGetComments
    @postId UNIQUEIDENTIFIER
AS
BEGIN
    -- Check if the provided postId exists in the 'posts' table
    IF EXISTS (SELECT 1 FROM posts WHERE postId = @postId)
    BEGIN
        -- Retrieve comments for the specified post
        SELECT c.commentId, c.whoCommentedId, c.commentDetails, c.createdAt
        FROM comments c
        WHERE c.whichPostId = @postId;

        RETURN 0; -- Success
    END
    ELSE
    BEGIN
        -- The provided postId does not exist
        THROW 50000, 'Post with this postId does not exist', 1;
    END
END;

GO
CREATE PROCEDURE spDeleteComment
    @commentId UNIQUEIDENTIFIER
AS
BEGIN
    -- Check if the provided commentId exists in the 'comments' table
    IF EXISTS (SELECT 1 FROM comments WHERE commentId = @commentId)
    BEGIN
        -- Delete the comment with the specified commentId
        DELETE FROM comments WHERE commentId = @commentId;

        RETURN 0; -- Success
    END
    ELSE
    BEGIN
        -- The provided commentId does not exist
        THROW 50000, 'Comment with this commentId does not exist', 1;
    END
END;

GO
CREATE OR ALTER PROCEDURE spCommentOnComment
@commentOnCommentId UNIQUEIDENTIFIER,
    @commentId UNIQUEIDENTIFIER,
    @whoCommentedId UNIQUEIDENTIFIER,
    @commentDetails NVARCHAR(MAX)
AS
BEGIN
    -- Check if the comment to which a comment is being added exists
    IF NOT EXISTS (SELECT 1 FROM Comments WHERE commentId = @commentId)
    BEGIN
        -- If the comment does not exist, return an error
        THROW 50001, 'The specified comment does not exist', 1;
    END

    -- Insert the comment on the comment
    INSERT INTO commentsOnComment (commentOnCommentId,whatCommentId, whocommentedId, details)
    VALUES (@commentOnCommentId,@commentId, @whoCommentedId, @commentDetails);

    -- Return a success message
    SELECT 'Comment on comment created successfully' AS message;
END;

GO
CREATE PROCEDURE spGetCommentsOnComment
    @commentId UNIQUEIDENTIFIER
AS
BEGIN
    -- Check if the comment with the specified commentId exists
    IF NOT EXISTS (SELECT 1 FROM Comments WHERE commentId = @commentId)
    BEGIN
        -- If the comment does not exist, return an error
        THROW 50001, 'The specified comment does not exist', 1;
    END

    -- Retrieve comments on the specified comment
    SELECT commentOnCommentId, whatCommentId, whoCommentedId, details, createdAt
    FROM commentsOnComment
    WHERE whatCommentId = @commentId;

    -- If no comments are found, return a message
    IF @@ROWCOUNT = 0
    BEGIN
        SELECT 'No comments on this comment' AS message;
    END
END;

GO
CREATE PROCEDURE spDeleteCommentOnComment
    @commentOnCommentId UNIQUEIDENTIFIER
AS
BEGIN
    -- Check if the comment on comment with the specified ID exists
    IF NOT EXISTS (SELECT 1 FROM commentsOnComment WHERE commentOnCommentId = @commentOnCommentId)
    BEGIN
        -- If the comment on comment does not exist, return an error
        THROW 50001, 'The specified comment on comment does not exist', 1;
    END

    -- Delete the comment on comment
    DELETE FROM commentsOnComment WHERE commentOnCommentId = @commentOnCommentId;

    -- Check if the deletion was successful
    IF @@ROWCOUNT = 1
    BEGIN
        SELECT 'Comment on comment deleted successfully' AS message;
    END
    ELSE
    BEGIN
        -- If the deletion was not successful, return an error
        THROW 50002, 'Failed to delete the comment on comment', 1;
    END
END;


-- Create the Users table with UUID primary key

CREATE TABLE users (
    userId UNIQUEIDENTIFIER PRIMARY KEY,
    username NVARCHAR(255) NOT NULL,
    email NVARCHAR(255) NOT NULL UNIQUE,
    [password] NVARCHAR(255) NOT NULL,
    isVerified BIT DEFAULT 0, -- Set the default value to false
    createdAt DATETIME2 DEFAULT GETDATE(),
    userimage NVARCHAR(255) -- Add the userimage column
);

-- Create the Posts table with UUID primary key
CREATE TABLE posts (
    postId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    whoPostedId UNIQUEIDENTIFIER,
    media NVARCHAR(255),
    details NVARCHAR(MAX),
    createdAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (whoPostedId) REFERENCES Users(userId)
);

select * from posts;

-- Create the Comments table with UUID primary key
CREATE TABLE comments (
    commentId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    whoCommentedId UNIQUEIDENTIFIER,
    whichPostId UNIQUEIDENTIFIER,
    commentDetails NVARCHAR(MAX),
    createdAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (whoCommentedId) REFERENCES Users(userId),
    FOREIGN KEY (whichPostId) REFERENCES Posts(postId)
);

-- Create the commentsOnComment table with UUID primary key
CREATE TABLE commentsOnComment (
    commentOnCommentId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    whatCommentId UNIQUEIDENTIFIER,
    details NVARCHAR(MAX),
    createdAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (whatCommentId) REFERENCES Comments(commentId)
);

ALTER TABLE commentsOnComment
ADD whocommentedId UNIQUEIDENTIFIER;

SELECT * FROM commentsOnComment;


-- Create the friendRequest table with UUID primary key
CREATE TABLE friendRequest (
    requestId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    whoRequestedId UNIQUEIDENTIFIER,
    isAccepted BIT,
    createdAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (whoRequestedId) REFERENCES Users(userId)
);


ALTER TABLE friendRequest
ADD receiverId UNIQUEIDENTIFIER;

SELECT * FROM friendRequest;

ALTER TABLE friendRequest
ALTER COLUMN isAccepted BIT DEFAULT 0;


-- Create the userWardrobe table with UUID primary key
CREATE TABLE userWardrobe (
    itemId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    whoseWardrobeId UNIQUEIDENTIFIER,
    createdAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (whoseWardrobeId) REFERENCES Users(userId)
);

ALTER TABLE userWardrobe
ADD whichPostId UNIQUEIDENTIFIER,
FOREIGN KEY (whichPostId) REFERENCES posts(postId);

select * from userWardrobe;

-- Create the stories table with UUID primary key
CREATE TABLE stories (
    storyId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    whoseStoriesId UNIQUEIDENTIFIER,
    createdAt DATETIME2 DEFAULT GETDATE(),
    media NVARCHAR(255),
    details NVARCHAR(MAX),
    FOREIGN KEY (whoseStoriesId) REFERENCES Users(userId)
);

ALTER TABLE userWardrobe
DROP CONSTRAINT FK__userWardr__which__5BE2A6F2;

ALTER TABLE userWardrobe
ADD CONSTRAINT FK_userWardrobe_posts
FOREIGN KEY (whichPostId)
REFERENCES posts (postId)
ON DELETE CASCADE;
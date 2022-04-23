-- Select * from information_schema.columns where table_name = 'Users';

DROP TABLE IF EXISTS "Users";
DROP TABLE IF EXISTS "Posts";
DROP TABLE IF EXISTS "Events";
DROP TABLE IF EXISTS "Chats";

CREATE TABLE "Users" (
    "UserID" SERIAL NOT NULL PRIMARY KEY,
    "UserName" varchar(255) NOT NULL UNIQUE,
    "Password" varchar(255) NOT NULL,
    "Email" varchar(255),
    "UserType" varchar(255)
);

CREATE TABLE "Posts" (
    "PostID" SERIAL NOT NULL PRIMARY KEY,
    "Message" varchar(255) NOT NULL,
    "CreatedAt" varchar(255) NOT NULL,
    "UpdatedAt" varchar(255),
    "CreatedByID" INTEGER,
    CONSTRAINT fk_user
      FOREIGN KEY("CreatedByID") 
      REFERENCES "Users"("UserID")
      ON DELETE CASCADE
);

CREATE TABLE "Events" (
    "EventID" SERIAL NOT NULL PRIMARY KEY,
    "EventTitle" varchar(255) NOT NULL,
    "Message" varchar(255) NOT NULL,
    "CreatedAt" varchar(255),
    "UpdatedAt" varchar(255),
    "CreatedByID" INTEGER,
    CONSTRAINT fk_user
      FOREIGN KEY("CreatedByID") 
      REFERENCES "Users"("UserID")
      ON DELETE CASCADE
);

CREATE TABLE "Chats" (
    "MessageID" SERIAL NOT NULL PRIMARY KEY,
    "Message" varchar(255) NOT NULL,
    "CreatedAt" varchar(255),
    "UpdatedAt" varchar(255),
    "CreatedByID" INTEGER,
    CONSTRAINT fk_user
      FOREIGN KEY("CreatedByID") 
      REFERENCES "Users"("UserID")
      ON DELETE CASCADE
);
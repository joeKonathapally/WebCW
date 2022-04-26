-- Select * from information_schema.columns where table_name = 'Users';

DROP TABLE IF EXISTS "Users";
DROP TABLE IF EXISTS "Posts";
DROP TABLE IF EXISTS "Events";
DROP TABLE IF EXISTS "Chats";
DROP TABLE IF EXISTS "Sockets";
DROP TABLE IF EXISTS "Notifications";

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

CREATE TABLE "ChatRooms" (
  "ChatRoomID" SERIAL NOT NULL PRIMARY KEY,
  "Title" VARCHAR(255),
  "CreatedAt" VARCHAR(255),
  "ChatRoomType" VARCHAR(255),
  "CreatedBy" INTEGER,
  CONSTRAINT fk_user
    FOREIGN KEY("CreatedBy")
    REFERENCES "Users"("UserID")
);

CREATE TABLE "Chats" (
    "ChatID" SERIAL NOT NULL PRIMARY KEY,
    "Message" varchar(255) NOT NULL,
    "ChatRoomID" INTEGER,
    "CreatedAt" varchar(255),
    "UpdatedAt" varchar(255),
    "CreatedByID" INTEGER,
    CONSTRAINT fk_user
      FOREIGN KEY("CreatedByID") 
      REFERENCES "Users"("UserID"),
    CONSTRAINT fk_chatroom
      FOREIGN KEY("ChatRoomID")
      REFERENCES "ChatRooms"("ChatRoomID")
);

CREATE TABLE "ChatRoomMembership" (
  "CRMID" SERIAL NOT NULL PRIMARY KEY,
  "ChatRoomID" INTEGER,
  "UserID" INTEGER,
  "ChatRoomType" VARCHAR(255),
  CONSTRAINT fk_user
    FOREIGN KEY("UserID")
    REFERENCES "Users"("UserID"),
  CONSTRAINT fk_chatroom
    FOREIGN KEY("ChatRoomID")
    REFERENCES "ChatRooms"("ChatRoomID")
);

CREATE TABLE "Sockets" (
  "SID" SERIAL NOT NULL PRIMARY KEY,
  "SocketID" VARCHAR(255),
  "UserID" INTEGER UNIQUE,
  "State" VARCHAR(255),
  CONSTRAINT fk_user
      FOREIGN KEY("UserID") 
      REFERENCES "Users"("UserID")
      ON DELETE CASCADE
);

CREATE TABLE "Notifications" (
  "NotificationID" SERIAL NOT NULL PRIMARY KEY,
  "Payload" VARCHAR(255),
  "UserID" INTEGER,
  "CreatedAt" VARCHAR(255),
  CONSTRAINT fk_user
      FOREIGN KEY("UserID") 
      REFERENCES "Users"("UserID")
      ON DELETE CASCADE
);

-- Loading test data

INSERT INTO "Users" VALUES(DEFAULT, 'jamesBond', '123456', 'jamesBond@gmail.com', 'student');
INSERT INTO "Users" VALUES(DEFAULT, 'leslieWilkins', '123456', 'leslieWilkins@gmail.com', 'student');
INSERT INTO "Users" VALUES(DEFAULT, 'irvingSmith', '123456', 'irvingSmith@gmail.com', 'alumni');
INSERT INTO "Users" VALUES(DEFAULT, 'ericAkers', '123456', 'ericAkers@gmail.com', 'student');
INSERT INTO "Users" VALUES(DEFAULT, 'howardTulley', '123456', 'howardTulley@gmail.com', 'alumni');
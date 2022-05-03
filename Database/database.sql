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

CREATE TABLE "ChatRoomMemberships" (
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

INSERT INTO "Users" VALUES(DEFAULT, 'jamesBond', '12345678', 'jamesBond@gmail.com', 'student');
INSERT INTO "Users" VALUES(DEFAULT, 'leslieWilkins', '12345678', 'leslieWilkins@gmail.com', 'student');
INSERT INTO "Users" VALUES(DEFAULT, 'irvingSmith', '12345678', 'irvingSmith@gmail.com', 'alumni');
INSERT INTO "Users" VALUES(DEFAULT, 'ericAkers', '12345678', 'ericAkers@gmail.com', 'student');
INSERT INTO "Users" VALUES(DEFAULT, 'howardTulley', '12345678', 'howardTulley@gmail.com', 'alumni');

INSERT INTO "Posts" VALUES(DEFAULT, 'This is a 1 post', '202004031234', '202004031234',1);
INSERT INTO "Posts" VALUES(DEFAULT, 'This is a 2 post', '202004031234', '202004031234',1);
INSERT INTO "Posts" VALUES(DEFAULT, 'This is a 3 post', '202004031234', '202004031234',2);
INSERT INTO "Posts" VALUES(DEFAULT, 'This is a 4 post', '202004031234', '202004031234',2);
INSERT INTO "Posts" VALUES(DEFAULT, 'This is a 5 post', '202004031234', '202004031234',1);
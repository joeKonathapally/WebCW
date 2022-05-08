Instructions to run the project:

1. Create a docker network called 'backend' using the following command
  `docker create network backend`
  (you need only run this command once)

2. Navigate into the parent directory of the project(the folder which contains the README.md)

3. Spin up all the docker containers with the command below
  `docker-compose up --build -d`

4. To visit the application enter the following link into a browser of your choosing
  `http://localhost:5000/`


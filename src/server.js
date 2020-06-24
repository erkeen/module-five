const express = require("express");
const listEndpoint = require("express-list-endpoints");
const studentsRoutes = require("./services/students/index");
const projectsRoutes = require("./services/projects");
const port = process.env.PORT;

const server = express();
server.use(express.json());
server.use("/students", studentsRoutes);
server.use("/projects", projectsRoutes);
console.log(listEndpoint(server));

server.listen(port, () => {
  console.log("hi server");
});

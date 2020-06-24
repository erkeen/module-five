const express = require("express");
const fs = require("fs");
const path = require("path");
const uniqid = require("uniqid");

const router = express.Router();

const readFile = (fileName) => {
  const buffer = fs.readFileSync(path.join(__dirname, fileName));
  return JSON.parse(buffer.toString());
};

const projectsFilePath = path.join(__dirname, "projects.json");

router.get("/", (request, response) => {
  const projectsDB = readFile("projects.json");

  if (request.query && request.query.name) {
    const filteredProjects = projectsDB.filter(
      (project) =>
        project.hasOwnProperty("name") && project.name === request.query.name
    );
    response.send(filteredProjects);
  } else {
    response.send(projectDB);
  }
});
router.get("/:id", (request, response) => {
  const projectsDB = readFile("projects.json");
  const project = projectsDB.filter(
    (project) => project.id === request.params.id
  );
  response.send(project);
});
router.post("/", (request, response) => {
  const newProject = { ...request.body, id: uniqid(), createdAt: new Date() };

  const projectsDB = readFile("projects.json");
  projectsDB.push(newProject);
  fs.writeFileSync(projectsFilePath, JSON.stringify(projectsDB));

  response.status(201).send(newProject);
});
router.put("/:id", (request, response) => {
  const projectsDB = readFile("projects.json");
  const filteredProjectArray = projectsDB.filter(
    (project) => project.id !== request.params.id
  );
  const project = request.body;
  project.id = request.params.id;

  filteredProjectArray.push(project);
  fs.writeFileSync(projectsFilePath, JSON.stringify(filteredProjectArray));
  response.send("OK");
});
router.delete("/:id", (request, response) => {
  const projectsDB = readFile("projects.json");
  const filteredProjectArray = projectsDB.filter(
    (project) => project.id !== request.params.id
  );
  fs.writeFileSync(projectsFilePath, JSON.stringify(filteredProjectArray));
  response.send("OK");
});

module.exports = router;

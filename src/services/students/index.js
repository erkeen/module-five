const express = require("express");
const fs = require("fs");
const path = require("path");
const uniqid = require("uniqid");
const { request, response } = require("express");

const router = express.Router();

const readFile = (fileName) => {
  const buffer = fs.readFileSync(path.join(__dirname, fileName));
  return JSON.parse(buffer.toString());
};

const studentsFilePath = path.join(__dirname, "students.json");

router.get("/", (request, response) => {
  const studentsDB = readFile("student.json");

  if (request.query && request.query.name) {
    const filteredStudents = studentsDB.filter(
      (student) =>
        student.hasOwnProperty("name") && student.name === request.query.name
    );
    response.send(filteredStudents);
  } else {
    response.send(studentDB);
  }

  //   const fileContentAsBuffer = fs.readFileSync(studentsFilePath);
  //   const fileContent = fileContentAsBuffer.toString();
  //   response.send(JSON.parse(fileContent));
});
router.get("/:id", (request, response) => {
  //   const fileContentAsBuffer = fs.readFileSync(studentsFilePath);
  //   const studentsArray = JSON.parse(fileContentAsBuffer.toString());
  const studentsDB = readFile("student.json");
  const student = studentsDB.filter(
    (student) => student.id === request.params.id
  );
  response.send(student);
});
router.post("/", (request, response) => {
  const newStudent = { ...request.body, id: uniqid() };
  //   const fileContentAsBuffer = fs.readFileSync(studentsFilePath);
  //   const studentsArray = JSON.parse(fileContentAsBuffer.toString());
  const studentsDB = readFile("student.json");
  studentsDb.push(newStudent);
  fs.writeFileSync(studentsFilePath, JSON.stringify(studentsDB));

  response.status(201).send(newStudent);
});
router.put("/:id", (request, response) => {
  //   const fileContentAsBuffer = fs.readFileSync(studentsFilePath);
  //   const studentsArray = JSON.parse(fileContentAsBuffer.toString());
  const studentsDB = readFile("student.json");
  const filteredStudentArray = studentsDB.filter(
    (student) => student.id !== request.params.id
  );
  const student = request.body;
  student.id = request.params.id;

  filteredStudentArray.push(student);
  fs.writeFileSync(studentsFilePath, JSON.stringify(filteredStudentArray));
  response.send("OK");
});
router.delete("/:id", (request, response) => {
  //   const fileContentAsBuffer = fs.readFileSync(studentsFilePath);
  //   const studentsArray = JSON.parse(fileContentAsBuffer.toString());
  const studentsDB = readFile("student.json");
  const filteredStudentArray = studentsDB.filter(
    (student) => student.id !== request.params.id
  );
  fs.writeFileSync(studentsFilePath, JSON.stringify(filteredStudentArray));
  response.send("OK");
});

module.exports = router;

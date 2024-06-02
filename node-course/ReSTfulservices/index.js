const express = require("express");
const app = express();
const Joi = require("joi");

app.use(express.json());

const courses = [
  { id: 1, name: "course 1" },
  { id: 2, name: "course 2" },
  { id: 3, name: "course 3" },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("Course not found");
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const name = req.body.name;
  const { error } = validateCourse(name);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course not found"); 
  const name = req.body.name;
  //const result = validateCourse(name)
  const { error } = validateCourse(name);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  course.name = name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("Course not found");
    return;
  }
  const index = courses.indexOf(course)
  courses.splice(index, 1)
  res.send('Course deleted')
});

function validateCourse(name) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate({ name });
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening to port ${port}`));

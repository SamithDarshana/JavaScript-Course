const express = require('express')
const router = express.Router()

const courses = [
    { id: 1, name: "course 1" },
    { id: 2, name: "course 2" },
    { id: 3, name: "course 3" },
  ]; 
  
  router.get("/", (req, res) => {
    res.send(courses);
  });
  
  router.get("/:id", (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send("Course not found");
    res.send(course);
  });
  
  router.post("/", (req, res) => {
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
  
  router.put("/:id", (req, res) => {
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
  
  router.delete("/:id", (req, res) => {
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

module.exports = router
  
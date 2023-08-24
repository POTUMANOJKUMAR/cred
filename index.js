const Joi = require("@hapi/joi");
const express = require("express");
const app = express();
const courses = [
  { id: 1, name: "courses1" },
  { id: 2, name: "courses2" },
  { id: 3, name: "courses3" },
];
app.use(express.json());

app.get("/api/courses", (req, res) => {
  res.send(courses.id);
});
app.post("/api/courses", (req, res) => {
  const { error } = validateCource(req.body);
  if (error) return res.status(400).send(error.details[0].message);
    const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(courses);
});
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
 return res.status(404).send("this course with the given ID was not found");
  else res.send(courses);
});
app.put("/api/courses/:id", (req, res) => {
  const { error } = validateCource(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send("this course with the given ID was not found");
  course.name = req.body.name;
  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listing port ${port}`);
});
function validateCource(course) {
  return schema.validate(course);
}
const schema = Joi.object({
  name: Joi.string().min(3).required(),
});
app.delete("/api/courses/:id", (req,res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("this course with the given ID was not found");
  else res.send(courses);
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to mongoDb..."))
  .catch((err) => console.error("Could not connect to mongoDb...", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  isPublished: Boolean,
  tags: [String],
  date: { type: Date, default: Date.now },
});

// create mongodb model -> mongoose.model('database_name', schema)
const Course = mongoose.model("Course", courseSchema);

////////// comparison operators
// eq (equal)
// ne (not equal)
// gt (greater than)
// gte (greater than or equal)
// lt (less than)
// lte (less than or equal)
// in
// nin (not in)

///////  Logical operators
// or and nor

///////  Create regular expression
// find({author: /^Mosh/}) -> starts with Mosh
// find({author: /Hamedani$/i}) -> ends with Hamedani and i for case insensitive
// find({author: /.*Mosh*./i}) -> contains Mosh

async function getCourses() {
  const course = await Course
    //.find({ author: "Sam", isPublished: true })
    //.find({price: {$gte: 10}})
    //.find({ price: { $in: [10, 15, 20] } })
    .find()
    .or([{ author: "Mosh" }, { isPublished: true }])
    .limit(10)
    .sort({ name: 1 }) // 1 -> ascending and -1 -> descending
    //.select({ name: 1, tags: 1 })
    .count(); // count documents
  console.log(course);
}

async function createCourse() {
  const course = new Course({
    name: "Angular course",
    author: "Mosh",
    isPublished: true,
    tags: ["angular", "frontend"],
  });

  const result = await course.save();
  console.log(result);
}
getCourses();

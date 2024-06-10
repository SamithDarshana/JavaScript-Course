const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to database..."))
  .catch((err) => console.error("Could not connect to database...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    authors: [authorSchema],
  })
);

async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website,
  });
  const result = await author.save();
  console.log(result);
}

async function createCourse(name, authors) {
  const course = new Course({ name, authors });
  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find().select("name author");
  console.log(courses);
}

async function updateAuthor(courseId) {
  //   const course = await Course.findById(courseId);
  //   course.author.name = "Mosh Hamedani";
  //   course.save();
  const course = await Course.updateOne(
    { _id: courseId },
    {
      $set: {
        "author.name": "John Smith",
      },
    }
  );
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.deleteOne();
  course.save();
}

//createAuthor("Mosh", "My bio", "My website");

// createCourse("Node course", [
//   new Author({ name: "Mosh" }),
//   new Author({ name: "John" }),
// ]);

//updateAuthor("665f3bd76786eda82d515d8a");
//listCourses();

//addAuthor("665f6044a443950a9f1652c7", new Author({ name: "Sam" }));

removeAuthor("665f6044a443950a9f1652c7", "665f6182695e709bd53d528a");

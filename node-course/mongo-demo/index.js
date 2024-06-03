const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to mongoDb..."))
  .catch((err) => console.error("Could not connect to mongoDb...", err));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    //match: /pattern/
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "network", "mobile"],
    lowercase: true,
    //uppercase: true,
    trim: true,
  },
  author: String,
  isPublished: Boolean,
  tags: {
    type: Array,
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: "Course should have atleast one tag",
    },
  },
  date: { type: Date, default: Date.now },
  price: {
    type: Number,
    required: function () {
      return this.isPublished; // if isPublished true, price required
    },
    min: 10,
    max: 200,
    get: (v) => Math.round(v), // when reading values
    set: (v) => Math.round(v), // when writing values
  },
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
// find({author: /.*Mosh.*/i}) -> contains Mosh

async function getCourses() {
  const course = await Course.find({
    //author: "Sam",
    tags: { $in: ["backend"] },
  })
    //.find({price: {$gte: 10}})
    //.find({ price: { $in: [10, 15, 20] } })
    //.find()
    //.or([{ author: "Mosh" }, { isPublished: true }])
    .limit(10)
    .sort({ name: 1 }) // 1 -> ascending and -1 -> descending
    .select({ name: 1, tags: 1 });
  //.count(); // count documents
  console.log(course);
}

async function createCourse() {
  const course = new Course({
    name: "Angular course",
    category: " Web",
    author: "Mosh",
    isPublished: true,
    tags: ["frontend"],
    price: 10,
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    for (const field in ex.errors) {
      console.log(ex.errors[field].message);
    }
    //console.error(ex.message);
  }
}

async function updateCourse(id) {
  const course = await Course.findById(id);
  if (!Course) return;
  course.set({
    isPublished: true,
    author: "Unknown",
  });
}

//update without retrieving
async function updateCourse2(id) {
  const result = await Course.updateOne(
    { _id: id },
    {
      $set: {
        author: "Mosh",
        isPublished: false,
      },
    }
  );
  console.log(result);
}

async function deleteCourse(id) {
  const result = await Course.findByIdAndDelete(id);
  console.log(result);
}
//deleteCourse("665cbaef99ad2a3825b5f960");
//updateCourse2("665cbaef99ad2a3825b5f960");
//getCourses();
//createCourse();

console.log("Before");

// getUser(1, (user) => {
//   getRepositories(user.name, (repos) => {
//     getCommits(repos[0], (commits) => {
//       console.log(commits)
//     })
//   })
// })

//using promises
// getUser(1)
//   .then((user) => getRepositories(user.name))
//   .then((repos) => getCommits(repos[0]))
//   .then((commits) => console.log("Commit", commits))
//   .catch((err) => console.log("Error", err.message));

// console.log("After");

//usign async and await
async function displayCommits() {
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user.name);
    const commits = await getCommits(repos[0]);
    console.log(commits);
  } catch (err) {
    console.log("Error", err.message);
  }
}
displayCommits();

// function getRepositories(user) {
//   getRepositories(user.name, getCommits);
// }

// function getCommits(repos) {
//   getCommits(repo, displayCommits);
// }

// function displayCommits(commits) {
//   console.log(commits);
// }

function getUser(id) {
  return new Promise((resolve, reject) => {
    //kick off some async work
    setTimeout(() => {
      console.log("Reading user from database...");
      resolve({ id: id, name: "Sam" });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Get repositories from github...");
      resolve(["repo1", "repo2", "repo3"]);
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling github api...");
      resolve(["commit"]);
    }, 2000);
  });
}

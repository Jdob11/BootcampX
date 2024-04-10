const { Pool } = require("pg");
const args = process.argv.slice(2);

const pool = new Pool({
  user: "development",
  password: "development",
  host: "localhost",
  database: "bootcampx",
});

const cohortName = args[0];
const limit = args[1];

pool
  .query(
    `
SELECT students.id AS student_id,
       students.name AS student_name,
       cohorts.name AS cohort_name
FROM students
JOIN cohorts ON cohorts.id = students.cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;
`,
  [cohortName + '%', limit || 5]
)
.then((res) => {
  res.rows.forEach((user) => {
    console.log(
      `${user.student_name} has an id of ${user.student_id} and was in the ${user.cohort_name} cohort`
    );
  });
})
.catch((err) => {
  console.error("Error executing query:", err);
});

pool.end()
.then()
.catch(err => console.error("Error closing connection pool", err));
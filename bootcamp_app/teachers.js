const { Pool } = require("pg");
const args = process.argv.slice(2);

const pool = new Pool({
  user: "development",
  password: "development",
  host: "localhost",
  database: "bootcampx",
});

const cohortName = args[0];

pool
  .query(
    `
SELECT DISTINCT teachers.name AS teacher,
                cohorts.name AS cohort
FROM cohorts
JOIN students ON cohorts.id = cohort_id
JOIN assistance_requests ON students.id = student_id
JOIN teachers ON teachers.id = teacher_id
WHERE cohorts.name = $1
ORDER BY teacher;

`,
  [cohortName || 'JUL02']
)
.then((res) => {
  res.rows.forEach((user) => {
    console.log(
      `${user.cohort}: ${user.teacher}`
    );
  });
})
.catch((err) => {
  console.error("Error executing query:", err);
});

pool.end()
.then()
.catch(err => console.error("Error closing connection pool", err));
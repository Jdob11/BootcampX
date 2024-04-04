SELECT cohorts.name AS cohort_name, COUNT(assignment_submissions.*) AS total_submissions
FROM students
JOIN cohorts ON students.cohort_id = cohorts.id
JOIN assignment_submissions ON student_id = students.id
GROUP BY cohort_name
ORDER BY total_submissions DESC;
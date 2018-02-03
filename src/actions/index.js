import axios from "axios";
import types from "./types.js";

const fetch_student_url = "http://localhost/database_connect/server.php?action=get&resource=students";
export function fetchStudentData() {
    const request = axios.get(fetch_student_url);
    return {
        type: types.STUDENT_DATA,
        payload: request
    };
}

const add_student_url = "http://localhost/database_connect/server.php?action=post&resource=add-student";
export function addStudent(name,course,grade) {
    const request = axios.post(add_student_url, {
        name: name,
        course: course,
        grade: grade

    });
    return {
        type: types.ADD_STUDENT,
        payload: request
    };
}
const delete_student_url = "http://localhost/database_connect/server.php?action=post&resource=delete-student";
export function deleteStudent(studentId) {
    const request = axios.post(delete_student_url, {
        studentId: studentId

    });
    return {
        type: types.DELETE_STUDENT,
        payload: request
    };
}
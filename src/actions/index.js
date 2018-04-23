import axios from "axios";
import types from "./types.js";

const fetch_student_url = "/sgt-fullstack/server/database_connect/server.php?action=get&resource=students";
export function fetchStudentData() {
    const request = axios.get(fetch_student_url);
    return {
        type: types.STUDENT_DATA,
        payload: request
    };
}

const add_student_url = "/sgt-fullstack/server/database_connect/server.php?action=post&resource=add-student";
export function addStudent(values) {
    const request = axios.post(add_student_url, {
        name: values.name,
        course: values.course,
        grade: values.grade

    });
    return {
        type: types.ADD_STUDENT,
        payload: request
    };
}
const delete_student_url = "/sgt-fullstack/server/database_connect/server.php?action=post&resource=delete-student";
export function deleteStudent(studentId) {
    const request = axios.post(delete_student_url, {
        studentId: studentId

    });
    return {
        type: types.DELETE_STUDENT,
        payload: request
    };
}
const update_student_url = "/sgt-fullstack/server/database_connect/server.php?action=post&resource=update-student";
export function updateStudent(form,studentId) {
    const request = axios.post(update_student_url, {
        name: form.name,
        course: form.course,
        grade: form.grade,
        studentId: studentId

    });
    return {
        type: types.UPDATE_STUDENT,
        payload: request
    };
}
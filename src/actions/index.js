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
export function addStudent() {
    const request = axios.post(add_student_url, {
        name: 'Christian',
        course: 'Chinese',
        grade: 100

    });

    console.log('the request in actions? ',request);
    return {
        type: types.ADD_STUDENT,
        payload: request
    };
}
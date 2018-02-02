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
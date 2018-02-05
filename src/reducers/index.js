import {combineReducers} from 'redux';
import StudentDataReducer from './student_data_reducer';
import AddStudentReducer from './add_student_reducer';
import DeleteStudentReducer from './delete_student_reducer';
import UpdateStudentReducer from './update_student_reducer';

const rootReducer =combineReducers({
    studentData: StudentDataReducer,
    addStudent: AddStudentReducer,
    deleteStudent: DeleteStudentReducer,
    updateStudent: UpdateStudentReducer
});

export default rootReducer;

import {combineReducers} from 'redux';
import StudentDataReducer from './student_data_reducer';
import AddStudentReducer from './add_student_reducer';
import DeleteStudentReducer from './delete_student_reducer';
import UpdateStudentReducer from './update_student_reducer';
import { reducer as formReducer } from 'redux-form';


const rootReducer =combineReducers({
    studentData: StudentDataReducer,
    addStudent: AddStudentReducer,
    deleteStudent: DeleteStudentReducer,
    updateStudent: UpdateStudentReducer,
    form: formReducer
});

export default rootReducer;

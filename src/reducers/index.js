import {combineReducers} from 'redux';
import StudentDataReducer from './student_data_reducer';


const rootReducer =combineReducers({
    studentData: StudentDataReducer
});

export default rootReducer;

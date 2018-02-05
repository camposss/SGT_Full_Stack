import types from '../actions/types';

const DEFAULT_STATE= {
    students: [],
    average: null
};

export default function(state=DEFAULT_STATE, action){
    switch(action.type){
        case types.STUDENT_DATA:
            const studentsArray=action.payload.data.data;
            const average= studentsArray.reduce((total, item)=> total+ parseInt(item.grade),0) /studentsArray.length;
            const result= average.toFixed(2);


            return {students: action.payload.data.data, average: result};
    }
    return state;
}
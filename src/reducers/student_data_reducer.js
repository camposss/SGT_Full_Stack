import types from '../actions/types';

const DEFAULT_STATE= [];

export default function(state=DEFAULT_STATE, action){
    switch(action.type){
        case types.STUDENT_DATA:
            return action.payload.data.data;
    }
    return state;
}
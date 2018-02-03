import types from '../actions/types';


export default function (state=[], action){
    switch(action.type){
        case types.ADD_STUDENT:
            console.log('ACTIONS IN ADD STUDENT', action.payload);
            return action.payload;
    }
    return state;
}
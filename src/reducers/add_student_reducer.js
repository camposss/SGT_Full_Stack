import types from '../actions/types';


export default function (state=[], action){
    switch(action.type){
        case types.ADD_STUDENT:
            return action.payload;
    }
    return state;
}
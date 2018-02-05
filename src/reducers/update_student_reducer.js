import types from '../actions/types';

const DEFAULT_STATE= [];

export default function(state=DEFAULT_STATE, action){
    switch(action.type){
        case types.UPDATE_STUDENT:
            return action.payload.data;
    }
    return state;
}
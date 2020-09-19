export const initialState = {
    user: null
};

function reducer (state,action){
    console.log(action);
    switch(action.type)
    {
        case'USER_SIGN_IN/OUT':
            return{
                ...state,
                user:action.user,
            };
        default:
        return state;
    }
}

export default reducer;
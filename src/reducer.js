export const initialState = {
    user: null,
    userInfo:["vacio"]
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
        
        case'USER_REGISTER':
        return{
            ...state,
            userInfo:action.userInfo,
        };
    default:
    return state;
    }
}

export default reducer;
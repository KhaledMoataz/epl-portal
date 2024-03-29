const Reducer = (state, action) => {
    switch (action.type) {
        case 'MY_MATCHES_ONLY':
            return {
                ...state,
                showMyMatchesOnly: action.payload
            };
        case 'ERROR':
            return {
                ...state,
                error: action.payload
            };
        case 'NOTIFICATION':
            return {
                ...state,
                notification: action.payload
            };
        default:
            return state;
    }
};

export default Reducer;

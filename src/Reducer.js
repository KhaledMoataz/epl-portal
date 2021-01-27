const Reducer = (state, action) => {
    switch (action.type) {
        case 'MY_MATCHES_ONLY':
            return {
                ...state,
                showMyMatchesOnly: action.payload
            };
        default:
            return state;
    }
};

export default Reducer;

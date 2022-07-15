import { ACTION_TYPES } from "./Actions";

const initState = {
    loading : false,
    success : false,
    data : [],
    error : null,
}


const Reducer = (state = initState, action) =>{
    switch (action.type) {

        case ACTION_TYPES.LIST_PRODUCTS:
            return {
                ...state,
                data: action.payload,
                success : true
            };
        
        case ACTION_TYPES.ADD_PRODUCT:
            return {
                data: [...state.data, action.payload],
                success : true
            };

        case ACTION_TYPES.DELETE_PRODUCT:
            return {
                data: state.data.filter(product =>product.id !== action.payload),
                success : true
            };
         
        case ACTION_TYPES.EDIT_PRODUCT:
            const productIndex = state.data.findIndex(product =>product.id === action.payload.id)
            state.data[productIndex] = action.payload
        
            return {
               data: [...state.data],
               success: true
            }
                
        default : return {...state}
    }
}

export default Reducer;
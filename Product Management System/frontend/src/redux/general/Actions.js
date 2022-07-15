export const ACTION_TYPES = {
   LIST_PRODUCTS : "LIST_PRODUCTS",
   EDIT_PRODUCT : "EDIT_PRODUCT",
   ADD_PRODUCT : "ADD_PRODUCT",
   DELETE_PRODUCT : "DELETE_PRODUCT"  
}

export const listOfProduct = (data) =>{
    return{
        type: ACTION_TYPES.LIST_PRODUCTS,
        payload : data
    }
}

export const addProduct = (data) =>{
    return{
        type: ACTION_TYPES.ADD_PRODUCT,
        payload : data
    }
}

export const deleteProduct = (id) =>{
    return{
        type: ACTION_TYPES.DELETE_PRODUCT,
        payload : id
    }
}

export const editProduct = (data) =>{
    return{
        type: ACTION_TYPES.EDIT_PRODUCT,
        payload : data
    }
}


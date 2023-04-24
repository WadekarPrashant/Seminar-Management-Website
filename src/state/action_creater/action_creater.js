export const depositMoney = (amount) => {
    return (dispatch)=>{
    dispatch({ type: 'DEPOSIT', payload: amount });
    }
  };

export  const withdrawMoney = (amount) => {
    return (dispatch)=>{
        dispatch({ type: 'WITHDRAW', payload: amount });
    }
   
  };

  export const addToCart = (item) => {
    return {
      type: "ADD",
      payload: item
    };
  };

  export const ADDTOADMIN = (item) => {
    return {
      type: "ADD_TO_ADMIN",
      payload: item
    };
  };

  export const updatetocart = (item) => {
    return {
      type: "UPDATE",
      payload: item
    };
  };

  export const removeFromCart = (index) => {
    return {
      type: "REMOVE",
      payload: index
    }
  }

  export const clearCart = () => ({
    type: 'CLEAR_CART'
  });


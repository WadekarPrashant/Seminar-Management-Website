const initialState = { amount: 0, cartItems: [] , ADMIN: []};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'DEPOSIT':
      return { ...state, amount: state.amount + action.payload };
    case 'WITHDRAW':
      return { ...state, amount: state.amount - action.payload };
    case 'ADD':
      return { ...state, cartItems: [...state.cartItems, action.payload] };
      case "ADD_TO_ADMIN":
      // Here you can use the spread operator to add the new item to the ADMIN array
      return { ...state, ADMIN: [...state.ADMIN, action.payload] };
    case "REMOVE":
        return {
          ...state,
          cartItems: state.cartItems.filter((item, index) => index !== action.payload.index),
        };
    case 'UPDATE':
        let arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    console.log(food.qty, parseInt(action.qty), action.price + food.price)
                    arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
                }
                return arr
            })
            return arr
            case 'CLEAR_CART':
              return {
                ...state,
                cartItems: []
              };
    default:
      return state;
  }
};


export default reducers;
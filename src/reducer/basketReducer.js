const basket = localStorage.getItem("basket");
const basketInitialValue = basket?JSON.parse(basket):[]

export default function basketReducer(state=basketInitialValue, action) {

    if (state == undefined) return [];
  
    if (action.type == "ADD_TO_BASKET") {
      const arr =[...state, action.payload]
      localStorage.setItem('basket',JSON.stringify(arr))
      return arr;
    } else if (action.type == "REMOVE_FROM_BASKET") {
      let filteredFavorites = state.filter((q) => q.id != action.payload);
      localStorage.setItem('basket',JSON.stringify(filteredFavorites))
      return [...filteredFavorites];
    } else if (action.type == "EMPTY") {
      return [];
    } else {
      return state;
    }
  }
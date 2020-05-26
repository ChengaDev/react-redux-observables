import Actions from '../actions'

const initialState = {
  isLoading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.TAB_ONE_DATA_REQUESTED:
      return {
        ...state,
        isLoading: true
      }
    case Actions.TAB_ONE_DATA_RECEIVED: {
      return {
        ...state,
        isLoading: false,
        products: action.payload
      }
    }
    default:
      return state
  }
}

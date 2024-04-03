import { useReducer } from 'preact/hooks'

const initialState = {
  todos: []
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'GET':
            return {
                todos: action.payload
            }
        case 'POST':
            return {
                todos: [...state.todos, action.payload]
            }
        case 'DELETE':
            return {
                todos: action.payload
            }
        case 'UPDATE':
            return {
                todos: action.payload
            }
        default:
            return state
    }
}

export const useStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return { state, dispatch }
}
import './app.css'
import ToDoList from './components/todoList/todoList'
import StatusBar from './components/statusBar/statusBar'
import consts from './components/consts'
import { useStore } from './store'

export function App() {
  const { state, dispatch } = useStore()
  fetch(consts.SERVERURL).then(res => res.json()).then(res => dispatch({type: 'GET', payload: res}))
  return (
    <>
      <div>
        <ToDoList state = {state} dispatch = {dispatch} />
        <StatusBar state = {state} dispatch = {dispatch} />
      </div>
    </>
  )
}

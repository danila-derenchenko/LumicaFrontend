import { useRef, useState } from 'preact/hooks'
import consts from '../consts'
import './todoList.css'

const ToDoList = ({ state, dispatch }) => {
    const todoName = useRef()
    const todoText = useRef()
    const todoTime = useRef()
    const [addTask, setAddTask] = useState(false)
    console.log(addTask)

    let todos = state.todos

    const submitForm = () => {
        const nowTime = new Date()
        console.log(todoText.current.value)
        const newTask = {
            name: todoName.current.value,
            text: todoText.current.value,
            status: 'Активно',
            createTime: `${nowTime.getFullYear()}-${nowTime.getMonth()}-${nowTime.getDate()}T${nowTime.getHours()}:${nowTime.getMinutes()}`,
            dateEnd: todoTime.current.value
        }
        todoName.current.value = ''
        todoText.current.value = ''
        todoTime.current.value = ''
        fetch(consts.SERVERURL, {
            method: 'POST',
            body: JSON.stringify(newTask)
        })
        setAddTask(false)
        dispatch({type: 'POST', payload: newTask})
        console.log(addTask)
    }

    const changeStatus = (el, index) => {
        let newStatus = ''
        if(el.status == 'Активно') {
            newStatus = 'Неактивно'
        } else {
            newStatus = 'Активно'
        }
        fetch(consts.SERVERURL, {
            method: 'PUT',
            body: [JSON.stringify({
                name: el.name,
                text: el.text,
                status: newStatus,
                createTime: el.createTime,
                dateEnd: el.dateEnd
            }), index]
        })

    }

    const deleteTask = (evt) => {
        console.log(evt)
        fetch(consts.SERVERURL, {
            method: 'DELETE',
            body: JSON.stringify(evt.target.id)
        })
    }

    if(addTask) {
        return (
            <div className="todoListWrapper">
                <div id='todoForm' className='totoListAddTask'>
                    <input ref={todoName} placeholder='Введите название задачи' type="text" className="todoListAddName todoInput" id='todoListAddName' />
                    <textarea ref={todoText} placeholder='Введите текст задачи' cols='30' rows='10' type="text" className="todoListAddText todoInput" id='todoListAddText' />
                    <input ref={todoTime} type='datetime-local' className='todoListAddTime todoInput' id='todoListAddTime' />
                    <button onClick={submitForm} className='toDoButton'>Добавить задачу</button>
                </div>
            </div>
        )
    } else {
        return (
            <div className="todoListWrapper">
            <button onClick={() => setAddTask(true)} className='toDoButton'>Добавить новую задачу</button>
                        <div className="todoList">
                            {todos.map((el, index) => {
                                const timeCreate = `${new Date(el.createTime).getDate()}.${new Date(el.createTime).getMonth() + 1}.${new Date(el.createTime).getFullYear()} ${new Date(el.createTime).getHours()}:${new Date(el.createTime).getMinutes()}`
                                const timeEnd = `${new Date(el.dateEnd).getDate()}.${new Date(el.dateEnd).getMonth() + 1}.${new Date(el.dateEnd).getFullYear()} ${new Date(el.dateEnd).getHours()}:${new Date(el.dateEnd).getMinutes()}`
                                return (
                                    <div className="toDo" key={index}>
                                        <div className="toDoIntro">
                                            <p className='elementToDoName elementToDo'>{el.name}</p>
                                            <p className='elementToDoText elementToDo'>{el.text}</p>
                                            <p className='elementToDoTime elementToDo'>{timeEnd}</p>
                                        </div>
                                        <div className="todoContent">
                                            <p className='elementToDoStatus elementToDo'>Статус: {el.status}</p>
                                            <button onClick={(el, index) => changeStatus(el, index)} className='elementToDoChangeStatus elementToDo'>Сменить статус</button>
                                            <button id={index} onClick={(evt) => deleteTask(evt)} className='elementToDoChangeStatus elementToDo'>Удалить задачу</button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
        </div>
        )
    }
}

export default ToDoList

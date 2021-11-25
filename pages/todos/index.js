import React from 'react';
import { LogOut, Trash } from "react-feather"
import TodoList from "../../components/TodoList"
import TaskForm from "../../components/TaskForm"
import Cookies from "js-cookie";
import axios from 'axios';

const Todos =  ({tasks: _tasks}) => {
    let userId = Cookies.get("id");
    const [tasks, setTask] = React.useState(_tasks);
    const [edit, setEdit] = React.useState(null)
    const addItem = (task) => {
        task.userId = userId
        axios.post(`http://localhost:3004/tasks`, { ...task})
            .then((res) => {
                axios.get(`http://localhost:3004/tasks`).then((res) => {
                    setTask(res.data)
                })
            })
    }
    
    const  editItem = (task) => {
        axios.put(`http://localhost:3004/tasks/${task.id}`, { ...task})
            .then((res) => {
                axios.get(`http://localhost:3004/tasks`).then((res) => {
                    setTask(res.data)
                })
            })
    }

    const logout = () => {
        Cookies.remove("id");
        window.location.assign(`http://localhost:3000/login`)
    }

    return(
        <div className="w-full h-screen">
            <div className="container mx-auto">
                <div className="mt-16 mb-4 flex justify-between">
                    <h4 className="font-bold text-2xl">TODOs</h4>
                    <button href="#" className="mr-8 py-2 px-4 active hover:bg-purple-600 rounded-md flex justify-center items-center" onClick={() => logout()}><LogOut size="12" className="mr-1" /> Logout</button>
                </div>
                <div className=" flex  justify-around">
                    <div className="py-1 px-8 bg-white rounded-md w-2/5 mr-1">
                    <div className="flex mt-8">
                            <h4 href="#" className="font-semibold text-xl text-purple-700">Add New Task</h4>
                        </div>
                        <TaskForm onSubmitEdit={(item) => editItem(item) } editTask={edit} onSubmit={(item) => addItem(item)} />
                    </div>
                    <div className="py-1 px-8 bg-white rounded-md w-2/5 mr-1">
                        <div className="flex mt-8">
                            <p href="#" className="mr-8 py-2 px-4 active hover:bg-purple-600">Inprogress</p>
                        </div>
                        <div className="taskList my-11">
                            <TodoList tasks={tasks} user={userId}  status="inprogress" 
                            onToggle={(task) => {
                                task.status = (task.status == "completed") ? "inprogress" : "completed"
                                axios.put(`http://localhost:3004/tasks/${task.id}`, {...task})
                                    .then((res) => {
                                        axios.get(`http://localhost:3004/tasks`).then((res) => {
                                            setTask(res.data)
                                        })
                                    })
                                }}
                                onEdit={ (task) =>  setEdit(task) }
                                onDelete={ (task) => {
                                        axios.delete(`http://localhost:3004/tasks/${task.id}`)
                                        .then((res) => {
                                            axios.get(`http://localhost:3004/tasks`).then((res) => {
                                                setTask(res.data)
                                            })
                                        })
                                }}
                            />
                        </div>
                    </div>
                    <div className="pb-4 px-8 bg-white rounded-md w-2/5">
                        <div className="flex mt-8">
                            <p href="#" className="py-2 px-4 bg-purple-200 text-purple-800 ">Completed</p>
                        </div>
                        <div className="taskList my-11">
                            <TodoList 
                                tasks={tasks} 
                                user={userId}
                                status="completed" 
                                onToggle={(task) => {
                                    task.status = (task.status == "completed") ? "inprogress" : "completed"
                                    axios.put(`http://localhost:3004/tasks/${task.id}`, {...task})
                                        .then((res) => {
                                            axios.get(`http://localhost:3004/tasks`).then((res) => {
                                                setTask(res.data)
                                            })
                                        })
                                    }}

                                    onEdit={ (task) =>  setEdit(task) }
                                    onDelete={ (task) => {
                                        axios.delete(`http://localhost:3004/tasks/${task.id}`)
                                        .then((res) => {
                                            axios.get(`http://localhost:3004/tasks`).then((res) => {
                                                setTask(res.data)
                                            })
                                        })
                                    }}
                            />
                        </div>
                      
                        <div className="flex justify-end">
                        <button className="bg-red-100 text-red-700 hover:bg-red-700 hover:text-white py-2 px-4 rounded-md flex justify-center items-center">
                            <Trash size="12" className="mr-1"></Trash><span>Delete All</span>
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        <style>{`
            body{
                background:whitesmoke
            }
            .trace{
                border: 1px solid red;
            }
            .active{
                background:#6D28D9;
                color:#ffffff;
                font-weight: 500;
            }
        
        `}</style>
        </div>
    )
}

export const getStaticProps  = async () => {
    // const res = await fetch(`http://localhost:3000/api/todos`)
    const res = await fetch(`http://localhost:3004/tasks`)
    const tasks = await res.json()
    return {
        props: {
            tasks,
        }
    } 
}

export default Todos
import { Trash, Edit2 } from "react-feather";

const TodoList = ({tasks, status, onToggle,  onEdit, onDelete, user }) => {
    const whereStatus = (task) => task.status === status;
    const whereUser = (task) => task.userId === user;
    return(
        <>
            { tasks.filter(whereUser).filter(whereStatus).map((task) => (
                <div className="flex bg-gray-100 p-3 hover:bg-gray-300 mb-3 justify-between rounded-md" key={task.id} >
                    <div className="flex justify-center items-center">
                        <input type="checkbox" onClick={() => onToggle && onToggle(task)}  className="mr-3 relative top-1 p-5"  />
                        <p>{task.name}
                            <br/>
                            <small>{task.date}</small>
                        </p>
                    </div>
                    <div className="flex justify-center items-center">
                        <button type="button" onClick={() => onEdit && onEdit(task)} className="mr-3 p-2 bg-purple-200 text-purple-800 hover:bg-purple-700 hover:text-white rounded-md pointer">
                            <Edit2 size="14"></Edit2>
                        </button>
                        <button type="button" onClick={() => onDelete && onDelete(task)}  className="bg-red-200 p-2 text-red-800 hover:bg-red-700 hover:text-white rounded-md pointer">
                            <Trash size="14"></Trash>
                        </button>
                    </div>
                </div>
            ))}
        </>
    )
}
export default  TodoList
import { useForm } from "react-hook-form"
import { taskSchema } from "../libs/validations";
import {v4 as uuid} from 'uuid';
import React from "react";

const TaskForm = ({ onSubmit, onSubmitEdit, editTask }) => {
    const {register, setValue, handleSubmit, formState:  { errors } } = useForm()
    let id  = uuid()
    const submitTask = (data) => {
        taskSchema.isValid(data).then((item) => {
            if(editTask){
                onSubmitEdit(data)
                return;
            }

            data.id = id
            item ? onSubmit(data) : false;
        })
    }

    React.useEffect(() => {
        if (!editTask) return () => {};
        Object.entries(editTask).map(([key, value]) => {
            setValue(key, value, { shouldValidate: false })
        })
    }, [editTask]);


    return(
        <>
             <form className="mt-6 mb-4" onSubmit={handleSubmit(submitTask)} >
                <div className="flex flex-col items-baseline mb-2">
                    <label className="block text-sm text-gray-700 mb-2" >Name</label>
                    <input type="text" {...register("name")}  className="w-full py-2 px-3 border rounded" />
                </div>
                <div className="flex flex-col items-baseline mb-2">
                    <label className="block text-sm text-gray-700 mb-2" >Description</label>
                    <textarea type="text" {...register("description")} rows="5" className="w-full py-2 px-3 border rounded" ></textarea>
                </div>
                <div className="flex flex-col items-baseline mb-2">
                    <label className="block text-sm text-gray-700 mb-2" >Data/Time</label>
                    <input type="datetime-local" {...register("date")} className="w-full py-2 px-3 border rounded" />
                </div>
                <div className="flex flex-col items-baseline mb-2">
                    <label className="block text-sm text-gray-700 mb-2">Status</label>
                        <select className="w-full py-2 px-3 border rounded" {...register("status")} >
                            <option></option>
                            <option value="inprogress">Inprogress</option>
                            <option value="completed">Completed</option>
                        </select>
                </div>
                <div className="flex justify-end mt-10">
                    <button type="submit" className="bg-purple-700 py-2 px-4 text-white rounded font-bold hover:bg-purple-500  focus:outline-none focus:shadow-outline">Add Task</button>
                </div>
            </form>
        </>
    )
}


export default TaskForm
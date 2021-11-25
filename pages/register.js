import { useForm } from "react-hook-form"
import { registerSchema } from "../libs/validations";
import {v4 as uuid} from 'uuid';
import axios from 'axios';

const Register = () => {
    const {register, handleSubmit, formState:  { errors } } = useForm()
    let id  = uuid()
    const registerUser = async (data) => {
        registerSchema.isValid(data).then((item) => {
            if(!item){
                return false
            }
            data.id = id
            axios.post(`http://localhost:3004/users`, {...data})
                .then((res)=> {
                    location.reload()
                })
        })
    }

    return(
        <div className="md:w-100 h-screen flex  bg-blue-100">
        <div className="container flex mx-auto mt-16">
            <div className="w-2/5">
                <div className="p-3 pt-1">
                    <div className="py-5 px-8 bg-white rounded-md shadow-md">
                        <h4 className="text-2xl text-black font-semibold">Register</h4>
                        <p className="text-gray-500">A smart way to keep you productive.</p>
                        <form className="mt-2" onSubmit={handleSubmit(registerUser)}>
                            <div className="flex flex-col items-baseline mb-2">
                                <label className="block text-sm text-gray-700 mb-2" >Name</label>
                                <input type="text" {...register("name")} className="w-full py-2 px-3 border rounded" />
                            </div>
                            <div className="flex flex-col items-baseline mb-2">
                                <label className="block text-sm text-gray-700 mb-2">Email</label>
                                <input type="text" {...register("email")} className="w-full py-2 px-3 border rounded" />
                            </div>
                            <div className="flex flex-col items-baseline mb-2">
                                <label className="block text-sm text-gray-700 mb-2">Mobile</label>
                                <input type="text" {...register("mobile")} className="w-full py-2 px-3 border rounded" />
                            </div>

                            <div className="flex flex-col items-baseline mb-8">
                                <label className="block text-sm text-gray-700 mb-2" >Password</label>
                                <input type="password" {...register("password")} className="w-full py-2 px-3 border rounded" />
                            </div>

                            <div className="flex flex-col items-baseline mb-2">
                                <label className="block text-sm text-gray-700 mb-2">Country</label>
                                <select type="text" {...register("country")} className="w-full py-2 px-3 border rounded">
                                    <option></option>
                                    <option value="nndia">India</option>
                                    <option value="sriLanka">SriLanka</option>
                                    <option value="nigeria">Nigeria</option>
                                    <option value="canada">Canada</option>
                                </select>
                            </div>
                            <div className="flex flex-col items-baseline mb-2">
                                <label className="block text-sm text-gray-700 mb-2">Gender</label>
                                <select type="text" {...register("gender")} className="w-full py-2 px-3 border rounded">
                                    <option></option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div className="flex flex-col items-baseline mb-2">
                                <label className="block text-sm text-gray-700 mb-2">Hobbies</label>
                                <select type="text" {...register("hobbies")} className="w-full py-2 px-3 border rounded">
                                    <option></option>
                                    <option value="gaming">Gaming</option>
                                    <option value="music">Music</option>
                                    <option value="reading">Reading</option>
                                    <option value="dancing">Dancing</option>
                                </select>
                            </div>
                            
                            <div className="flex flex-end mt-8">
                                <button className="bg-blue-700 py-2 px-4 text-white rounded font-bold hover:bg-blue-500  focus:outline-none focus:shadow-outline" type="submit">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="w-3/5"></div>
        </div>
    </div>
    )
}

export default Register
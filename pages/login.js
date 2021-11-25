import { useForm } from "react-hook-form"
import Cookies from "js-cookie"
import axios from 'axios';


const  Login =  () => {
    const {register, handleSubmit, formState:  { errors } } = useForm()

    const loginUser =  async (data) => {
        axios.get(`http://localhost:3004/users`).then((users)=> {

            if(Cookies.get("id")){
                Cookies.remove("id")
            }
            users.data.find((item) => {
                if(item.mobile === data.mobile){
                    Cookies.set("id", item.id)
                    window.location.assign(`http://localhost:3000/todos`)
                    return true;
                }
                console.log("no user found");
               
            })
        })
    }
    return(
        <div className="md:w-100 h-screen flex  bg-blue-100">
            <div className="container flex mx-auto mt-16">
                <div className="w-2/5">
                    <div className="p-3">
                        <div className="py-8 px-8 bg-white rounded-md shadow-md">
                            <h4 className="text-2xl text-black font-semibold">Login</h4>
                            <p className="text-gray-500">A smart way to keep you productive.</p>
                            <form className="mt-6" onSubmit={handleSubmit(loginUser)}>
                                <div className="flex flex-col items-baseline mb-2">
                                    <label className="block text-sm text-gray-700 mb-2" >Mobile</label>
                                    <input type="text" {...register("mobile")} className="w-full py-2 px-3 border rounded" />
                                </div>
                                <div className="flex flex-col items-baseline mb-8">
                                    <label className="block text-sm text-gray-700 mb-2" >Password</label>
                                    <input type="password" {...register('password')} className="w-full py-2 px-3 border rounded" />
                                </div>
                                <div className="flex flex-end">
                                    <button className="bg-blue-700 py-2 px-4 text-white rounded font-bold hover:bg-blue-500  focus:outline-none focus:shadow-outline" type="submit">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="w-3/5"></div>
            </div>
        {/* <style jsx>{`
            body{

            }
        `}
        </style> */}
        </div>

    )
}

export default Login
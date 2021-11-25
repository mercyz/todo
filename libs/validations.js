import * as  yup from "yup"


export const registerSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().required("Eamil is required"),
    mobile: yup.string().required("Mobile number is required"),
    password: yup.string().required("Password is required"),
    country: yup.string(),
    gender: yup.string(),
    hobbies: yup.string(),
})

export const loginSchema = yup.object().shape({
    mobile: yup.string().required("Mobile is required"),
    password: yup.string().required("Password is required")
})

export const  taskSchema = yup.object().shape({
    name: yup.string().required("Name field is required"),
    status: yup.string().required("Status field is required"),
    description:  yup.string(),
    date: yup.date().default(() => new Date(2019, 5, 11, 5, 23, 59))
})


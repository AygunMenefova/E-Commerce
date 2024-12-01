import * as yup from 'yup'

export const registerPageShema = yup.object().shape({
    username:yup.string().required("Enter your username"),
    password:yup.string().required("Enter your password")
})
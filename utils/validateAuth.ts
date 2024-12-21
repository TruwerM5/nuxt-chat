import { object, string, ref } from "yup";

type SignUpData = {
    name: string;
    nickname: string;
    password: string;
    confirmPassword: string;
}

const signUpSchema = object({
    confirmPassword: string()
        .required('Confirm password field is required.')
        .oneOf([ref('password')], 'Passwords must match.'),
    password: string()
        .required('Password field is required.')
        .min(8, 'Password must be at least 8 characters long.'),
    name: string()
        .required('Name field is required.')
        .min(3)
        .max(30),
    nickname: string()
        .required('Nickname field is required.')
        .min(3)
        .max(20),    
});

// const signUpSchema = Joi.object({
//     nickname: Joi.string().min(3).max(30).required(),
//     name: Joi.string().min(3).max(30).required(),
//     password: Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
//         .required().error(shortPasswordError),
//     /////
// });



export async function validateSignUpData(data: SignUpData) {
    try {
        const value = await signUpSchema.validate(data);
    } catch(e: any) {
        throw createError({
            statusMessage: e.message
        })
    }
}
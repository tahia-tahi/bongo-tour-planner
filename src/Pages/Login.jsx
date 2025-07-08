import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link } from 'react-router';
import GoogleSignIn from '../Components/GoogleSignIn';
import { BsPass } from 'react-icons/bs';
import { AuthContext } from '../Provider/AuthContext';

const Login = () => {


    const {signIn} = useContext(AuthContext)

    const [showPassword, setShowPassword] = useState(false)
    const { register, handleSubmit , formState:{errors}} = useForm()


    const onSubmit = data => {
        console.log(data);
        signIn(data.email, data.password)
        .then(result=>{
            console.log(result.user);
        })
        .catch(error=>{
            console.error(error)
        })
    }
    
    
    return (
        <div>



            <div className="card bg-white w-full mx-auto my-20 max-w-sm shrink-0 shadow-2xl">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <h1 className="text-3xl text-center text-accent font-bold">Welcome Back!</h1>
                    <fieldset className="fieldset">



                        <label className="label">Email</label>
                        <input type="email" {...register('email')} className="input" placeholder="Email" required />

                        
                        <div className='relative'>
                            <label className="label">Password</label>
                            <input type={showPassword ? 'text' : 'password'} {...register('password',{required:true, pattern:/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*]).{6,}$/})} className="input" placeholder="Password" required />

                            {errors.password?.type === 'required' && <p className='text-error'>Password is required</p>}
                            {errors.password?.type === 'pattern' && <p className='text-error'>Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, and one special character.</p>}
                            <button onClick={() => { setShowPassword(!showPassword) }}
                                className='text-primary absolute right-8 top-8 '>
                                {
                                    showPassword ? <FaRegEyeSlash size={15} /> : <FaRegEye size={15} />
                                }

                            </button>
                        </div>


                        <button type='submit' className="btn btn-primary hover:btn-secondary mt-4">Register</button>
                        <p className='text-center font-bold my-2 text-primary'>OR</p>

                        <GoogleSignIn></GoogleSignIn>

                        <p className='mt-3'>Already have an account? <Link className='text-primary font-semibold hover:text-secondary' to={'/auth/signup'}>Sign Up</Link></p>
                    </fieldset>

                </form>
            </div>


        </div>
    );
};

export default Login;
import React, { useContext, useState } from 'react';
import GoogleSignIn from '../Components/GoogleSignIn';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthContext';
import Swal from 'sweetalert2';

const SignUp = () => {
    const { createUser, updateUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

const onSubmit = data => {
    createUser(data.email, data.password)
        .then(result => {
            console.log(result);
            return updateUser({
                displayName: data.name,
                photoURL: data.photo
            });
        })
        .then(async () => {
            // ✅ Save user to MongoDB with role
            await fetch(`https://bongo-tour-server.vercel.app/api/users/${data.email}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    photo: data.photo,
                    role: 'tourist' // or 'tour_guide' or 'admin' if applicable
                })
            });

            Swal.fire({
                icon: 'success',
                title: 'Registered successfully!',
                text: `Welcome, ${data.name}!`,
                timer: 2000,
                showConfirmButton: false
            });
            navigate('/');
        })
        .catch(error => {
            console.error("Sign-up failed:", error);
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: error.message
            });
        });
};


    return (
        <div>
            <div className="card bg-white w-full mx-auto my-20 max-w-sm shrink-0 shadow-2xl">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <h1 className="text-3xl text-center text-accent font-bold">Create Account Now!</h1>
                    <fieldset className="fieldset">

                        <label className="label">Name</label>
                        <input
                            type="text"
                            {...register('name')}
                            className="input"
                            placeholder="Name"
                            required
                        />

                        <label className="label">Email</label>
                        <input
                            type="email"
                            {...register('email')}
                            className="input"
                            placeholder="Email"
                            required
                        />

                        <label className="label">Photo</label>
                        <input
                            type="text"
                            {...register('photo')}
                            className="input"
                            placeholder="Photo URL"
                            required
                        />

                        <div className='relative'>
                            <label className="label">Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                {...register('password', {
                                    required: true,
                                    pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*]).{6,}$/
                                })}
                                className="input"
                                placeholder="Password"
                                required
                            />
                            {errors.password?.type === 'required' && <p className='text-error'>Password is required</p>}
                            {errors.password?.type === 'pattern' && (
                                <p className='text-error'>
                                    Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, and one special character.
                                </p>
                            )}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className='text-primary absolute right-8 top-8'
                            >
                                {showPassword ? <FaRegEyeSlash size={15} /> : <FaRegEye size={15} />}
                            </button>
                        </div>

                        <button type='submit' className="btn btn-primary hover:btn-secondary mt-4">Register</button>
                        <p className='text-center font-bold my-2 text-primary'>OR</p>

                        <GoogleSignIn />

                        <p className='mt-3'>
                            Already have an account?
                            <Link className='text-primary font-semibold hover:text-secondary' to={'/auth/login'}>
                                Log In
                            </Link>
                        </p>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default SignUp;

import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router';
import GoogleSignIn from '../Components/GoogleSignIn';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthContext';

const Login = () => {
  const { signIn, updateUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then(result => {
        const user = result.user;

        // Optional profile update if name or photo entered
        if (data.name || data.photo) {
          return updateUser({
            displayName: data.name || user.displayName,
            photoURL: data.photo || user.photoURL,
          });
        }
      })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Logged in!',
          text: `Welcome back!`,
          timer: 2000,
          showConfirmButton: false
        });
        navigate('/');
      })
      .catch(error => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: error.message
        });
      });
  };

  return (
    <div>
      <div className="card bg-white w-full mx-auto my-20 max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <h1 className="text-3xl text-center text-accent font-bold">Welcome Back!</h1>
          <fieldset className="fieldset space-y-3">
            {/* Name (Optional) */}
            

            {/* Photo URL (Optional) */}


            {/* Email */}
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                {...register('email', { required: true })}
                className="input"
                placeholder="Email"
                required
              />
            </div>

            {/* Password */}
            <div className='relative'>
              <label className="label">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: true,
                  pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*]).{6,}$/,
                })}
                className="input"
                placeholder="Password"
              />
              {errors.password?.type === 'required' && (
                <p className='text-error'>Password is required</p>
              )}
              {errors.password?.type === 'pattern' && (
                <p className='text-error'>Password must be at least 6 characters with uppercase, lowercase, and a special character.</p>
              )}

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className='text-primary absolute right-8 top-8'
              >
                {showPassword ? <FaRegEyeSlash size={15} /> : <FaRegEye size={15} />}
              </button>
            </div>

            {/* Submit Button */}
            <button type='submit' className="btn btn-primary hover:btn-secondary mt-4">Login</button>

            <p className='text-center font-bold my-2 text-primary'>OR</p>
            <GoogleSignIn />

            <p className='mt-3'>
              Don't have an account?
              <Link className='text-primary font-semibold hover:text-secondary' to='/auth/signup'> Sign Up</Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;

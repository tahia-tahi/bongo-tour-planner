import React, { useState } from 'react';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";

const ShowHidePassword = () => {

    const [showPassword, setShowPassword] = useState(false)

    return (
        <div>
            <div className='relative'>
                <label className="label">Password</label>
                <input type={showPassword ? 'text' : 'password'} name='password' className="input" placeholder="Password" required />
                <button onClick={() => { setShowPassword(!showPassword) }}
                    className='text-primary absolute right-8 top-8 '>
                    {
                        showPassword ? <FaRegEyeSlash size={15} /> : <FaRegEye size={15} />
                    }

                </button>
            </div>
        </div>
    );
};

export default ShowHidePassword;
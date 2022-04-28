import React from 'react'
import { useForm } from "react-hook-form";
export const From = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        console.log(data, "data");
    }
    return (

        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    placeholder='First Name'
                    type="text"
                    {...register("firstName", { required: true, maxLength: 10 })}
                />
                {errors.firstName && <span>Please check the First Name</span>}
                <input
                    placeholder='Last Name'
                    type="text"
                    {...register("lastName", { required: true, maxLength: 10 })}
                />
                {errors.lastName && <span>Please check the Last Name</span>}
                <input
                    placeholder='Email'
                    type="email"
                    {...register("email",
                        {
                            required: true,
                            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        })}
                />
                {errors.email && <span>Please check the Email</span>}
                <input
                    placeholder='Password'
                    type="password"
                    {...register("password", {
                        required: true,
                        pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
                    })}
                />
                {errors.password && <span>Please check the Password</span>}
                <button type='submit'>Submit</button>
            </form>
        </div>

    )
}

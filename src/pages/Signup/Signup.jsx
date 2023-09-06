import { Link, useNavigate } from 'react-router-dom';
import img from '../../assets/authentication.png';
import { useForm } from "react-hook-form"
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';

const Signup = () => {
    const {createUser, updateUserInfo} = useContext(AuthContext)
    const { register, handleSubmit,  formState: { errors } } = useForm();
    const navigate = useNavigate();
    const onSubmit = data => {
        console.log(data)
        createUser(data.email, data.password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser)
            updateUserInfo(data.name, data.photoURL)
            .then(() => {})
            .catch(error => console.log(error))
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'You have created your account successfully.',
                showConfirmButton: false,
                timer: 1500
              })
            navigate('/dashboard');
        })
        .catch(error => console.log(error))
    };
    return (
        <>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center lg:text-left md:w-1/2 w-full">
                        <img src={img} alt="" className='h-full' />
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 md:w-1/2">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body w-full">
                    <h1 className="text-3xl text-center font-bold">Please Signup!</h1>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" placeholder="name" 
                        className="input input-bordered" {...register("name", { required: true })}  />
                        {errors.name && <p className="text-red-700">Name field is required</p>}
                        </div>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">PhotoUrl</span>
                        </label>
                        <input type="text" placeholder="photoURL" className="input input-bordered" 
                        {...register("photoURL", { required: true })} />
                        {errors.photoURL && <p className="text-red-700">PhotoUrl field is required</p>}
                        </div>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" placeholder="email" className="input input-bordered" 
                        {...register("email", { required: true })} />
                        {errors.email && <p className="text-red-700">Email field is required</p>}
                        </div>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" 
                        className="input input-bordered" {...register("password", 
                        { required: true,
                        minLength: 8,
                        maxLength: 20,
                        pattern: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/ })} />
                        {errors.password && <p className="text-red-700">Password field is required.Password must have
                        one Uppercase, one Special character, one Lowercase and Password should contain 6 characters</p>}
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                        </div>
                        <div className="form-control mt-6">
                        <input type="submit" value="Sign Up" className="btn btn-primary"/>
                        </div>
                        <p><small>Already Have an Account? Please <Link className='text-primary' to="/signup">Login</Link></small></p>
                    </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
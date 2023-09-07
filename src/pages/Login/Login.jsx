import { Link, useNavigate } from 'react-router-dom';
import img from '../../assets/authentication.png';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import { setUsers } from '../../utilities/manageUsers';
import { Helmet } from 'react-helmet-async';


const Login = () => {
    const {login} = useContext(AuthContext)
    const navigate = useNavigate();
    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);
        login(email, password)
        .then(result => {
            const loggedUser = result.user;
            // console.log(loggedUser);
            Swal.fire({
                title: 'You have logged in.',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
              navigate('/home/dashboard');
              setUsers(email);
        })
        .catch(error => console.log(error))
    }
    return (
        <>
            <Helmet>
                <title>TaskHub || Login</title>
            </Helmet>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center lg:text-left md:w-1/2 w-full">
                        <img src={img} alt="" className='h-full' />
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 md:w-1/2">
                    <form onSubmit={handleLogin} className="card-body w-full">
                        <h1 className="text-3xl text-center font-bold">Please Login!</h1>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" placeholder="email" name='email' className="input input-bordered" />
                        </div>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" name='password' className="input input-bordered" />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                        </div>
                        <div className="form-control mt-6">
                        <input type="submit" value="Login"  className="btn btn-primary" />
                        </div>
                        <p><small>New Here? Please <Link className='text-primary' to="/signup">Sign Up</Link></small></p>
                    </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
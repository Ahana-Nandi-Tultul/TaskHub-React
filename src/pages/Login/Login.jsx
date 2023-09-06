import { Link } from 'react-router-dom';
import img from '../../assets/authentication.png';
const Login = () => {
    return (
        <>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center lg:text-left md:w-1/2 w-full">
                        <img src={img} alt="" className='h-full' />
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 md:w-1/2">
                    <form className="card-body w-full">
                    <h1 className="text-3xl text-center font-bold">Please Login!</h1>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="text" placeholder="password" className="input input-bordered" />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                        </div>
                        <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
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
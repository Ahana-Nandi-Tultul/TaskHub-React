
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);
    return (
        <div id="error-page" className='text-center flex justify-center items-center'>
            <div className='space-y-4 h-[500px]'>

                <h1 className='text-7xl font-light'>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
                <Link to='/'><button className='btn btn-primary text-dark my-6'>Return Home</button></Link>
            </div>
        </div>
    );
};

export default ErrorPage;
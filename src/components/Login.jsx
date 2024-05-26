import React, { useEffect, useState } from 'react';
import { login } from '../api/post';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../store/userSlice';

const Login = () => {
    const navigate = useNavigate();
    const token = useSelector((state) => state.user.user);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        const response = await login(formData);
        if (response.success) {
            dispatch(addUser(response));
            navigate('/profile'); // Redirect to profile page upon successful login
        } else {
            setErrorMessage(response.message || 'Login failed. Please try again.');
        }
    };

    useEffect(() => {
        if (token?.token || token) {
            navigate('/');
        }
    }, [token, navigate]);

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://res.cloudinary.com/dth8f91to/image/upload/v1693940820/fiqw7jotolsf5adliobg.jpg"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="space-y-6">
                    {errorMessage && (
                        <div className="text-red-600 text-center">
                            {errorMessage}
                        </div>
                    )}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Password
                            </label>
                            {/* <div className="text-sm">
                                <a
                                    href="/"
                                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                                >
                                    Forgot password?
                                </a>
                            </div> */}
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        password: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="button"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" style={{ backgroundColor: '#ec834b' }}
                            onClick={handleSubmit}
                        >
                            Sign in
                        </button>
                    </div>
                </div>

                <p className="mt-10 text-center text-sm text-gray-500" >
                    Don't have an account?{' '}
                    <a
                        href="/register"
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" style={{ color: '#ec834b' }}
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUser, deleteUser } from '../store/userSlice'; // Assuming you have a Redux action to clear user data

const Profile = () => {
    const user = useSelector((state) => state.user.user); // Assuming user data is stored in Redux state
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Dispatch action to clear user data
        dispatch(deleteUser());
        // Navigate to the login page
        navigate('/login');
    };

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="max-w-md w-full">
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <h1 className="text-2xl font-bold text-center text-gray-800">Profile Page</h1>
                        </div>
                        <div className="text-gray-700 text-center">Loading...</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen" style={{ backgroundColor: '#D0D0D0' }}>
            <div className="max-w-md w-full">
                <div className="bg-white shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <h1 className="text-2xl font-bold mb-2 text-center text-gray-800">Profile Page</h1>
                        <hr className="mb-4" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Name:</label>
                        <span className="text-gray-800">{user.fullName}</span>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Email:</label>
                        <span className="text-gray-800">{user.email}</span>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2">Phone:</label>
                        <span className="text-gray-800">{user.phone}</span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline" style={{ backgroundColor: '#ec834b' }}
                        type="button"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;

import './App.css';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import UpdatePost from './components/UpdatePost';
import NotFound from './components/NotFound';
import Navbar from './components/Navbar';
import SearchForm from './components/SearchForm';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { me } from './store/userSlice';

function App() {
	const [showNav, setShowNav] = useState(true);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const token = useSelector((state) => state.user.user);

	const toggleNav = () => {
		setShowNav(!showNav);
	};

	const getNavWidth = () => (showNav ? 'w-56' : 'w-16');

	useEffect(() => {
		dispatch(me());
	}, [dispatch]);

	useEffect(() => {
		console.log("token",token)
		const publicPaths = ['/login', '/register'];
		if (!token && !publicPaths.includes(window.location.pathname)) {
			navigate('/login');
		}
	}, [token, navigate]);

	return (
		<div className="flex">
			{/* Nav Section */}
			{token && (
				<div className={getNavWidth() + ' min-h-screen transition-width border border-r'}>
					<div className="sticky top-0">
						<Navbar showNav={showNav} />
					</div>
				</div>
			)}

			{/* Content Section */}
			<div className="flex-1 min-h-screen bg-gray-100">
				{token && (
					<div className="sticky top-0">
						<div className="flex items-center p-2 space-x-2">
							<button onClick={toggleNav}>
								{showNav ? (
									<AiOutlineMenuFold size={25} />
								) : (
									<AiOutlineMenuUnfold size={25} />
								)}
							</button>
							<SearchForm />
						</div>
					</div>
				)}

				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/create-post" element={<CreatePost />} />
					<Route path="/update-post/:slug" element={<UpdatePost />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;

import React from 'react';
import { AiFillFileAdd, AiOutlineHome, AiOutlineUser } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

const NavItem = ({ to, value, icon, showNav }) => {
	const commonClasses =
		'flex items-center space-x-2 w-full p-2 block whitespace-nowrap hover:bg-gray-200 hover:text-gray-900 transition-width';
	const activeClass = commonClasses + ' bg-blue-500 text-white';
	const inActiveClass = commonClasses + ' text-gray-500';
	return (
		<NavLink
			to={to}
			className={({ isActive }) =>
				isActive ? activeClass : inActiveClass
			}
		>
			{icon}
			<span
				className={
					showNav ? 'w-full overflow-hidden' : 'w-0 overflow-hidden'
				}
			>
				{value}
			</span>
		</NavLink>
	);
};

const Navbar = ({ showNav }) => {
	return (
		<nav>
			<div>
				{/* Logo */}
				<div className="flex items-center justify-center space-x-2 p-3 whitespace-nowrap transition-width">
					<img
						src="https://res.cloudinary.com/dth8f91to/image/upload/v1693940820/fiqw7jotolsf5adliobg.jpg"
						alt="logo"
						className="w-8 h-8"
					/>
					<span
						className={
							showNav
								? 'w-full overflow-hidden'
								: 'w-0 overflow-hidden'
						}
					>
						User Dashboard
					</span>
				</div>
			</div>
			<ul>
				<li>
					<NavItem
						showNav={showNav}
						to="/"
						value="Home"
						icon={<AiOutlineHome size={24} />}
					/>
				</li>
				<li>
					<NavItem
						showNav={showNav}
						to="/create-post"
						value="Create Post"
						icon={<AiFillFileAdd size={24} />}
					/>
				</li>
				<li>
					<NavItem
						showNav={showNav}
						to="/profile"
						value="Profile"
						icon={<AiOutlineUser size={24} />}
					/>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;

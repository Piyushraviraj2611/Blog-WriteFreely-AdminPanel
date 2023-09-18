import React, { useEffect, useState } from "react";
import { getPosts, deletePost, getPaginationCount } from "../api/post";
import { useNotification } from "../context/NotificationProvider";
import { useSearch } from "../context/SearchProvider.jsx";
import PostCard from "./PostCard";

let pageNo = 1;
const POST_LIMIT = 9;

const Home = () => {
	const [posts, setPosts] = useState([]);
	const [totalPostCount, setTotalPostCount] = useState(0);
	const { searchResult } = useSearch();
	//const securityKey = process.env.REACT_APP_SECRET_KEY;

	const { updateNotification } = useNotification();

	const paginationCount = getPaginationCount(totalPostCount, POST_LIMIT);
	const paginationArray = new Array(paginationCount).fill(" ");

	const fetchPosts = async () => {
		const { success, postsCount, posts, message } = await getPosts(pageNo, POST_LIMIT);

		if (success) {
			// if success is true
			setPosts(posts);
			setTotalPostCount(postsCount);
		} else return updateNotification("error", message);
	};

	const handlePostDelete = async ({ _id }) => {
		//const input = prompt("Please enter the secret key:");
		// if (input !== securityKey) {
		// 	return updateNotification("error", "Invalid secret key");
		// }
		const { success, message } = await deletePost(_id);
		if (success) {
			updateNotification("success", message);
			fetchPosts();
		} else return updateNotification("error", message);
	};

	useEffect(() => {
		fetchPosts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<div className="posts grid grid-cols-2 gap-3 pb-5 md:grid-cols-3">
				{searchResult?.length > 0
					? searchResult.map((post) => <PostCard key={post._id} post={post} onDeleteClick={() => handlePostDelete(post)} />)
					: posts.map((post) => (
							<div className="post rounded-lg overflow-hidden shadow-md bg-white" key={post._id}>
								<PostCard post={post} onDeleteClick={() => handlePostDelete(post)} />
							</div>
					  ))}
			</div>
			{paginationArray.length > 1 && !searchResult.length && (
				<div className="pagination flex justify-center items-center py-5 space-x-3">
					{paginationArray.map((_, index) => (
						<button
							className={index + 1 === pageNo ? "px-3 py-1 bg-gray-200 text-blue-500 border-b-2 border-b-blue-500" : "px-3 py-1 text-gray-500"}
							key={index}
							onClick={() => {
								pageNo = index + 1;
								fetchPosts();
							}}>
							{index + 1}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default Home;

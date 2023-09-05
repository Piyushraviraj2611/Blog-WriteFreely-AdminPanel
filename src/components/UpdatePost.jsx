import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost, updatePost } from "../api/post";
import { useNotification } from "../context/NotificationProvider";
import { useNavigate } from "react-router-dom";
import PostForm from "./PostForm";
import NotFound from "./NotFound";
import { initialPost } from "./PostForm";

const UpdatePost = () => {
	const [postInfo, setPostInfo] = useState(initialPost);
	const [notFound, setNotFound] = useState(false);
	const [busy, setBusy] = useState(false);
	//const securityKey = process.env.REACT_APP_SECRET_KEY;

	const navigate = useNavigate();

	const { slug } = useParams();

	const { updateNotification } = useNotification();

	const handleSubmit = async (data) => {
		//const input = prompt("Please enter the secret key:");
		// if (input !== securityKey) {
		// 	return updateNotification("error", "Invalid secret key");
		// }
		setBusy(true);
		const { success, message, post, error } = await updatePost(postInfo._id, data);
		setBusy(false);
		if (success) {
			updateNotification("success", message);
			setPostInfo({ ...post, tags: post.tags.join(", ") });
			navigate(`/`);
			localStorage.removeItem("post");
		} else if (error) {
			updateNotification("error", error);
		} else {
			updateNotification("error", message);
		}
	};

	useEffect(() => {
		const fetchPost = async () => {
			const { success, message, post, error, featured } = await getPost(slug);
			if (success) {
				setPostInfo({ ...post, tags: post.tags.join(","), featured: featured });
			} else if (error) {
				setNotFound(true);
				updateNotification("error", error);
			} else {
				setNotFound(true);
				updateNotification("error", message);
			}
		};
		fetchPost();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (notFound) return <NotFound />;

	return <PostForm onSubmit={handleSubmit} blogPost={postInfo} postBtnTitle={"Update Blog"} busy={busy} resetAfterSubmit={true} />;
};

export default UpdatePost;

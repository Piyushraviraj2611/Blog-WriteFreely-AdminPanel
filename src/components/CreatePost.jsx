import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/post";
import { useNotification } from "../context/NotificationProvider";
import PostForm from "./PostForm";
import { initialPost } from "./PostForm";

const CreatePost = () => {
	const [postInfo, setPostInfo] = useState(initialPost);
	const [busy, setBusy] = useState(false);
	//const securityKey = process.env.REACT_APP_SECRET_KEY;

	const { updateNotification } = useNotification();
	const navigate = useNavigate();

	const handleSubmit = async (data) => {
		//const input = prompt("Please enter the secret key:");
		// if (input !== securityKey) {
		// 	return updateNotification("error", "Invalid secret key");
		// }
		setBusy(true);
		const { success, message, error } = await createPost(data);
		setBusy(false);
		if (success) {
			updateNotification("success", message);
			localStorage.removeItem("post");
			navigate(`/`);
		} else if (error) {
			updateNotification("error", error);
		} else {
			updateNotification("error", message);
		}
	};

	useEffect(() => {
		const result = localStorage.getItem("post");
		if (!result) return setPostInfo({ ...initialPost });
		const oldPost = JSON.parse(result);
		setPostInfo({ ...oldPost, thumbnail: oldPost.thumbnail || initialPost.thumbnail });
	}, []);
	return <PostForm onSubmit={handleSubmit} blogPost={postInfo} busy={busy} postBtnTitle={"Post Blog"} resetAfterSubmit />;
};

export default CreatePost;

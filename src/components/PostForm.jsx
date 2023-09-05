import React, { useState } from "react";
import { useEffect } from "react";
import { ImSpinner11, ImEye, ImFilePicture, ImFilesEmpty, ImSpinner3 } from "react-icons/im";
import { uploadImage } from "../api/post";
import { useNotification } from "../context/NotificationProvider.jsx";
import MarkdownHints from "./MarkdownHints";
import MobileView from "./MobileView";

export const initialPost = { title: "", thumbnail: "", featured: false, content: "", tags: "", meta: "" };

const PostForm = ({ blogPost, busy, postBtnTitle, onSubmit, resetAfterSubmit }) => {
	const [post, setPost] = useState(blogPost || initialPost);
	const [selectedThumbnailURL, setSelectedThumbnailURL] = useState("");
	const [imageUrlToCopy, setImageUrlToCopy] = useState("");
	const [imageUploading, setImageUploading] = useState(false);
	const [displayMarkdownHints, setDisplayMarkdownHints] = useState(false);
	const [displayMobileView, setDisplayMobileView] = useState(false);

	const { updateNotification } = useNotification();

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name === "thumbnail") {
			const file = e.target.files[0];
			if (!file.type?.includes("image")) {
				updateNotification("error", "Please select an image file");
				return;
			}
			setPost({ ...post, thumbnail: file });
			localStorage.setItem("post", JSON.stringify({ ...post, thumbnail: URL.createObjectURL(file) }));
			return setSelectedThumbnailURL(URL.createObjectURL(file));
		}

		if (name === "featured") {
			localStorage.setItem("post", JSON.stringify({ ...post, featured: e.target.checked }));
			return setPost({ ...post, featured: e.target.checked });
		}

		if (name === "tags") {
			const tags = value.split(",");
			if (tags.length > 4) {
				updateNotification("warning", "Only four tags are allowed");
				return setPost({ ...post, tags: tags.slice(0, 4) });
			}
			localStorage.setItem("post", JSON.stringify({ ...post, tags }));
			return setPost({ ...post, tags });
		}

		if (name === "meta" && value.length > 150) {
			updateNotification("warning", "Meta description can't be more than 150 characters");
			return setPost({ ...post, meta: value.substring(0, 150) });
		}

		setPost((prev) => ({ ...prev, [name]: value }));

		// Store all the data in local storage
		localStorage.setItem("post", JSON.stringify({ ...post, [name]: value }));
	};

	const handleImageUpload = async (e) => {
		if (imageUploading) return;
		setImageUrlToCopy("");
		const file = e.target.files[0];
		if (!file.type?.includes("image")) {
			updateNotification("error", "Please select an image file");
			return;
		}
		setImageUploading(true);
		const formData = new FormData();
		formData.append("image", file); // image is the key in the backend api route
		const { success, message, image } = await uploadImage(formData);
		if (!success) return updateNotification("error", message);
		setImageUploading(false);
		setImageUrlToCopy(image);
	};

	const handleOnCopy = () => {
		const textToCopy = `![Add image description](${imageUrlToCopy})`;
		navigator.clipboard.writeText(textToCopy);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Check if all the fields are filled
		if (!post.title.trim()) return updateNotification("error", "Title is required");
		// if (!post.thumbnail) return updateNotification("error", "Thumbnail is required");
		if (!post.content.trim()) return updateNotification("error", "Content is required");
		if (!post.tags.length) return updateNotification("error", "Tags are required");
		if (!post.meta.trim()) return updateNotification("error", "Meta description is required");

		// Slugify the title
		const slug = post.title
			.trim()
			.toLowerCase()
			.replace(/ /g, "-") // Replace spaces with -
			.replace(/[^\w-]+/g, "") // Remove all special characters
			.replace(/-+/g, "-") // Replace multiple - with single -
			.replace(/^-+/, "") // Remove - from start
			.replace(/-+$/, ""); // Remove - from end

		let postTags = [];
		// Check if the psot.tags is a string or an array
		if (typeof post.tags === "string") {
			// Make the post tags an array
			postTags = post.tags.split(",");
			if (postTags.length > 4) {
				postTags = postTags.slice(0, 4);
				updateNotification("warning", "Only four tags are allowed");
			}
		} else {
			postTags = post.tags;
		}

		const formData = new FormData();
		const newPost = { ...post, slug, tags: JSON.stringify(postTags) };

		// Append the new post data to the form data
		for (let key in newPost) {
			formData.append(key, newPost[key]);
		}

		onSubmit(formData);
		// if (resetAfterSubmit) setPost({ ...initialPost });
	};

	const resetForm = () => {
		setPost({ ...initialPost });
		setSelectedThumbnailURL("");
		localStorage.removeItem("post");
	};

	useEffect(() => {
		if (blogPost) {
			setPost({ ...blogPost });
			setSelectedThumbnailURL(blogPost?.thumbnail?.url);
		}

		return () => {
			if (resetAfterSubmit) resetForm();
		};
	}, [blogPost, resetAfterSubmit]);

	return (
		<>
			<form className="p-2 flex" onSubmit={handleSubmit}>
				<div className="w-9/12 h-screen space-y-3 flex flex-col">
					{/* Title and Submit */}
					<div className="flex items-center justify-between">
						<h1 className="text-xl font-semibold text-gray-700">Create New Post</h1>

						<div className="flex items-center space-x-5">
							<button
								type="button"
								onClick={resetForm}
								className="flex items-center space-x-2 px-3 ring-1 ring-blue-500 rounded h-10 text-blue-500 hover:text-white hover:bg-blue-500 transition">
								<ImSpinner11 /> <span>Reset</span>
							</button>
							<button
								type="button"
								onClick={() => setDisplayMobileView(true)}
								className="flex items-center space-x-2 px-3 ring-1 ring-blue-500 rounded h-10 text-blue-500 hover:text-white hover:bg-blue-500 transition">
								<ImEye /> <span>View</span>
							</button>
							<button className="h-10 w-36 hover:ring-1 bg-blue-500 rounded text-white hover:text-blue-500 hover:bg-transparent ring-blue-500 transition">
								{busy ? <ImSpinner3 className="animate-spin mx-auto text-xl" /> : postBtnTitle}
							</button>
						</div>
					</div>
					{/* Featured Checkbox */}
					<div className="flex items-center space-x-2 mt-5">
						<input
							type="checkbox"
							value={post.featured}
							checked={post.featured === true ? true : false}
							name="featured"
							onChange={handleChange}
							id="featured"
						/>
						<label htmlFor="featured" className="select-none text-gray-700 cursor-pointer group">
							<span className="group-hover:text-blue-500">Featured</span>
						</label>
					</div>

					{/* Title */}
					<input
						type="text"
						value={post.title}
						onChange={handleChange}
						onFocus={() => setDisplayMarkdownHints(false)}
						placeholder="Post Title"
						name="title"
						id="title"
						className="text-xl font-semibold w-full h-10 px-3 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500"
					/>
					{/* Image Input */}
					<div className="flex space-x-2">
						<div>
							<input type="file" onChange={handleImageUpload} name="image" id="image-input" hidden />
							<label
								htmlFor="image-input"
								className="flex items-center space-x-2 px-3 ring-1 ring-gray-700 rounded h-10 text-gray-700 hover:text-white hover:bg-gray-700 transition cursor-pointer">
								<span>Place Image</span> {!imageUploading ? <ImFilePicture /> : <ImSpinner3 className="animate-spin" />}{" "}
							</label>
						</div>
						{imageUrlToCopy && (
							<div className="flex flex-1 justify-between rounded bg-gray-400">
								<input type="text" value={imageUrlToCopy} disabled className="bg-transparent px-2 w-full text-white" />
								<button
									type="button"
									onClick={handleOnCopy}
									className="text-xs flex flex-col items-center justify-center p-1 w-16 rounded self-stretch bg-gray-500 hover:bg-gray-700 text-white">
									<ImFilesEmpty /> <span>Copy</span>
								</button>
							</div>
						)}
					</div>
					{/* Content */}
					<textarea
						value={post.content}
						onChange={handleChange}
						onFocus={() => setDisplayMarkdownHints(true)}
						placeholder="## Markdown"
						name="content"
						id="content"
						cols="30"
						rows="10"
						className="flex-1 w-full p-2 h-96 border-2 font-mono tracking-wide text-lg border-gray-300 rounded focus:outline-none focus:border-blue-500 resize-none"></textarea>
					{/* Tags Input */}
					<div>
						<label htmlFor="tags" className="text-gray-700">
							Tags
						</label>
						<input
							type="text"
							value={post.tags}
							onChange={handleChange}
							placeholder="Add tags with comma. React, Javascript"
							name="tags"
							id="tags"
							className="w-full h-10 px-3 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500"
						/>
					</div>
					{/* Meta Description Input */}
					<div>
						<label htmlFor="meta" className="text-gray-700">
							Meta Description {post.meta?.length}/150
						</label>
						<textarea
							value={post.meta}
							onChange={handleChange}
							placeholder="Meta Description"
							name="meta"
							id="meta"
							cols="30"
							rows="3"
							className="w-full p-2 h-28 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500 resize-none"></textarea>
					</div>
				</div>

				<div className="w-1/4 px-2 relative">
					{/* Thumbnail */}
					<h2 className="text-xl font-semibold text-gray-700 mb-2">Thumbnail</h2>
					<div>
						<input type="file" onChange={handleChange} name="thumbnail" id="thumbnail-input" hidden />
						<label className="cursor-pointer" htmlFor="thumbnail-input">
							{selectedThumbnailURL ? (
								<img src={selectedThumbnailURL} alt="thumbnail" className="aspect-video shadow-sm rounded" />
							) : (
								<div className="border border-dashed border-gray-500 aspect-video text-gray-500 flex flex-col justify-center items-center cursor-pointer">
									<span>Select Thumbnail</span>
									<span className="text-xs">Recommended size</span>
									<span className="text-xs">1280 * 720</span>
								</div>
							)}
						</label>
					</div>

					{/* Markdown Rules */}
					<div className="absolute top-1/2 -translate-y-1/3">{displayMarkdownHints && <MarkdownHints />}</div>
				</div>
			</form>
			<MobileView
				title={post.title}
				content={post.content}
				thumbnail={selectedThumbnailURL}
				visible={displayMobileView}
				onClose={() => setDisplayMobileView(false)}
			/>
		</>
	);
};

export default PostForm;

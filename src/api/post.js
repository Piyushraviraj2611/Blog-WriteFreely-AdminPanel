import client from './client';


export const getPosts = async (pageNo, limit) => {
    try {
        const { data } = await client.get(`/post/get-posts?pageNo=${pageNo}&limit=${limit}`);
        return data;
    } catch (error) {
        if (error?.response) {
            return error.response.data;
        }
        return { success: false, message: error.message || error };
    }
}

export const deletePost = async (postId) => {
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;
    try {
        const { data } = await client.delete(`/post/${postId}`);
        return data;
    } catch (error) {
        if (error?.response) {
            return error.response.data;
        }
        return { success: false, message: error.message || error };
    }
}

export const getPaginationCount = (totalPostCount, POST_LIMIT) => {
    return Math.ceil(totalPostCount / POST_LIMIT);
}

export const searchPost = async (query) => {
    try {
        const { data } = await client.get(`/post/search?query=${query}`);
        return data;
    } catch (error) {
        if (error?.response) {
            return error.response.data;
        }
        return { success: false, message: error.message || error };
    }
}

export const uploadImage = async (formData) => {
    try {
        const { data } = await client.post("/post/upload-image", formData);
        return data;
    } catch (error) {
        if (error?.response) {
            return error.response.data;
        }
        return { success: false, message: error.message || error };
    }
}

export const createPost = async (formData) => {
    try {
       
        const { data } = await client.post("/post/create", formData);
        return data;
    } catch (error) {
        if (error?.response) {
            return error.response.data;
        }
        return { success: false, message: error.message || error };
    }
}

export const getPost = async (slug) => {
    try {
        const { data } = await client.get(`/post/single/${slug}`);
        return data;
    } catch (error) {
        if (error?.response) {
            return error.response.data;
        }
        return { success: false, message: error.message || error };
    }
}

export const updatePost = async (postId, formData) => {
    try {
        const { data } = await client.put(`/post/update/${postId}`, formData);
        return data;
    } catch (error) {
        if (error?.response) {
            return error.response.data;
        }
        return { success: false, message: error.message || error };
    }
}
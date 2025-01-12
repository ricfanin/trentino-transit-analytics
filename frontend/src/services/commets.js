import apiClient from "@/services/api";

export const createComment = async (commentData) => {
    return apiClient.post('/comments', commentData);
};

export const getCommentsByPostId = async (postId) => {
    try {
        const response = await apiClient.get('/comments/post', { params: {
            post_id: postId, 
        }})
        return response.data;
    } catch (error) {
        console.error("Errore durante il recupero dei post dell'utente:", error);
        throw error; 
    }
};
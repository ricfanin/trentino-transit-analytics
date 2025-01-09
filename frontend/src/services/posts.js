import apiClient from "@/services/api";

export const createPost = async (postData) => {
  return apiClient.post('/posts', postData);
};

export const getUserPosts = async (userId) => {
    try {
        const response = await apiClient.get("/posts/filter/user", 
          {params: { author_id: userId }});
        return response.data;
    } catch (error) {
        console.error("Errore durante il recupero dei post dell'utente:", error);
        throw error; 
    }
};

export const getPostById = async (postId) => {
    try {
      const response = await apiClient.get("/posts", { id: postId });
      return response.data;
    } catch (error) {
      console.error("Errore durante il recupero del post:", error);
      throw error;
    }
  };
  
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
    const response = await apiClient.get("/posts", 
      {params: { post_id: postId }});
    return response.data;
  } catch (error) {
    console.error("Errore durante il recupero del post:", error);
    throw error;
  }
};

export const getAllPostsBySelectedOrder = async(currentTags, currentOrder) => {
  try {
    let endpoint = "/posts/filter"; // Endpoint di default

    if (currentOrder === 'oldest' || currentOrder === 'newest') {
      endpoint += '/date';
    }  
    
    if (currentOrder === 'upvote' || currentOrder === 'downvote') {
      endpoint += '/likes';
    }

    // Effettua la richiesta GET all'endpoint corretto
    const response = await apiClient.get(endpoint, {
      params : {
        order : currentOrder,
        tags : currentTags
      }
    });

    return response.data;
  } catch (error) {
    console.error("Errore durante il recupero dei post:", error);
    throw error;
  }
};

export const updatePostVote = async (postId, userId, vote_type) => {
  try {
    const response = await apiClient.post(`/votes`, JSON.stringify({
      user_id: userId,
      post_id: postId,
      voteType: vote_type,
    }));
    return response.data; // Restituisci il post aggiornato
  } catch (error) {
    throw new Error('Errore durante l\'aggiornamento del voto');
  }
};

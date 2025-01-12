import apiClient from "@/services/api";

export const getTagsById = async (tagIdList) => {
  try {
      const tags = await Promise.all(
          tagIdList.map(async (tagId) => {
              const response = await apiClient.get("/tags", { params: { _id: tagId } });
              return response.data; // Aggiungi il risultato della query all'array
          })
      );
  
    // Restituisci l'array dei tag recuperati
      return tags;
  } catch (error) {
    console.error("Errore durante il recupero dei tag:", error);
    throw error;
  }
};

export const getAllTags = async() => {
  try {
    const response = await apiClient.get("/tags/all");
    return response.data;
  } catch (error) {
    console.error("Errore durante il recupero dei tag:", error);
    throw error;
  }
}


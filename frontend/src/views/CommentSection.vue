/* eslint-disable */
<template>
    <div class="flex mt-4 mb-8">
        <div class="max-w-6xl mx-auto p-4 space-y-6">
            <Post />
            <div class="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md border">
                    <form>
                        <!-- Descrizione del Problema -->
                        <textarea placeholder="Descrizione del Problema" rows="4"
                            class="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>

                        <!-- Pulsante Pubblica -->
                        <button type="submit" class="w-4/12 bg-green-500 text-white py-2 rounded-md hover:bg-green-700">
                            COMMENTA
                        </button>
                    </form>
                </div>
            <div class="max-w-4xl mx-auto space-y-6">
                <Comment />
                <Comment />
                <Comment />
                <Comment />
            </div>
        </div>
    </div>
</template>

<script>
import Post from "@/components/Post.vue";
import Comment from "@/components/Comment.vue";

export default {
    name: "CommentSection",
    components: {
        Post,
        Comment,
    },
};
</script>
/* eslint-disable */
<template>
    <div class="flex mt-4 mb-8">
        <div class="flex-1 max-w-4xl mx-auto p-4 space-y-6">
            <Post :postId="postId" />
            <div class="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md border">
                    <form @submit.prevent="submitComment">
                        <!-- Descrizione del Problema -->
                        <textarea v-model="form.content" placeholder="Descrizione del Problema" rows="4"
                            class="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>

                        <!-- Pulsante Pubblica -->
                        <button type="submit" class="w-4/12 bg-green-500 text-white py-2 rounded-md hover:bg-green-700">
                            COMMENTA
                        </button>
                    </form>
                </div>
            <div v-for="comment in comments" class="max-w-4xl mx-auto space-y-6">
                <Comment :comment="comment" />
            </div>
        </div>
    </div>
</template>

<script>
import Post from "@/components/Post.vue";
import Comment from "@/components/Comment.vue";
import { createComment, getCommentsByPostId } from "@/services/commets";

export default {
    name: "CommentSection",
    components: {
        Post,
        Comment,
    },
    data() {
        return {
            comments: [],
            form: {
                content: '',
            }, 
            postId: this.$route.query.postId, // Ottieni il postId dai query params
        };
    },
    methods: {
        async submitComment() {
            try {
                const response = await createComment({
                    author_id: localStorage.getItem("user_id"),
                    post_id: this.postId,
                    content: this.form.content,
                });

                alert('Commento creato con successo!');

                this.form.content = '';
            } catch (error) {
                console.error('Errore durante la creazione del commento:', error);
                alert('Errore nella creazione del commento.');
            }
        },
        async fetchComments() {
            try {
                const comments = await getCommentsByPostId(this.postId);
                this.comments = comments;
            } catch (error) {
                console.error("Errore durante il caricamento del post:", error);
            }
        },
    },
    mounted() {
        this.fetchComments()
    },
};
</script>
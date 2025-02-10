/* eslint-disable */
<template>
    <div class="flex mt-4 mb-8">
        <div class="flex-1 max-w-4xl mx-auto p-4 space-y-6">
            <Post v-if="post" :post="post" @post-deleted="removePost"/>
            <p v-else>Caricamento...</p>
            <div class="max-w-6xl mx-auto bg-text_1 p-6 rounded-lg shadow-md border">
                    <form @submit.prevent="submitComment">
                        <!-- Descrizione del Problema -->
                        <textarea v-model="form.content" placeholder="Descrizione del Problema" rows="4"
                            class="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2"></textarea>

                        <!-- Pulsante Pubblica -->
                        <button class="mt-4 px-4 py-2 bg-button_2 text-text_1 rounded-md hover:bg-button_2_hover">
                            COMMENTA
                        </button>
                    </form>
                </div>
            <div v-for="comment in comments" class="max-w-4xl mx-auto space-y-6">
                <Comment :comment="comment" @comment-deleted="removeComment" />
            </div>
        </div>
    </div>
</template>

<script>
import Post from "@/components/Post.vue";
import Comment from "@/components/Comment.vue";
import { createComment, getCommentsByPostId } from "@/services/commets";
import { getPostById } from "@/services/posts";

export default {
    name: "CommentSection",
    components: {
        Post,
        Comment,
    },
    data() {
        return {
            post: null,
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
                this.fetchComments();
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

        removeComment(commentId) {
            this.comments = this.comments.filter(comment => comment._id !== commentId); // 🔹 Rimuove il commento eliminato
        },

        removePost() {
            this.$router.go(-1);
        }
    },
    async mounted() {
        this.fetchComments();
        this.post = await getPostById(this.postId);
    },
};
</script>
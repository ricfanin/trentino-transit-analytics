/* eslint-disable */
<template>
  <div class="bg-white rounded-b-full">
    <div class="mx-auto px-4 py-32">
        <div class="mx-auto max-w-xl text-center">
          <h1 class="text-4xl font-extrabold sm:text-6xl">
            Trento Transit
            <p class="font-extrabold text-green-500 sm:block"> Analytics </p>
          </h1>

          <p class="mt-4 sm:text-xl/relaxed">
            sistema di analisi delle corse e feedback diretto dei viaggiatori per un'esperienza di viaggio più confortevole
          </p>

          
          <div class="mt-8 flex flex-wrap justify-center gap-4">
            <router-link to="/RegisterPage">
              <button class="mt-4 px-4 py-2 bg-green-400 text-white rounded-md hover:bg-green-600">
                Registrati
              </button>
            </router-link>

            <a href="https://www.trentinotrasporti.it/">
              <button class="mt-4 px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-600">
                Trentino Trasporti
              </button> 
            </a>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
  },
};
</script>

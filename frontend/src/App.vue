/* eslint-disable */
<template>
  <div id="app" >
    <nav class="bg-blue-700 shadow shadow-blue-800 w-100 px-8 md:px-auto">
      <div
        class="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap"
      >
        <!-- Logo -->
        <div class="text-green-500 md:order-1">
          <!-- Heroicon - Chip Outline -->

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="h-10 w-10"
            stroke="white"
          >
            <path
              d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 1 1 6 0h3a.75.75 0 0 0 .75-.75V15Z"
            />
            <path
              d="M8.25 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM15.75 6.75a.75.75 0 0 0-.75.75v11.25c0 .087.015.17.042.248a3 3 0 0 1 5.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 0 0-3.732-10.104 1.837 1.837 0 0 0-1.47-.725H15.75Z"
            />
            <path d="M19.5 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
          </svg>
        </div>
        <div class="text-gray-100 order-3 w-full md:w-auto md:order-2">
          <ul class="flex font-semibold justify-between">
            <li class="md:px-4 md:py-2 hover:text-green-500">
              <router-link to="/">Home</router-link>
            </li>
            <li class="md:px-4 md:py-2 hover:text-green-500">
              <router-link to="/Social">Social</router-link>
            </li>
            <li class="md:px-4 md:py-2 hover:text-green-500">
              <router-link to="/Linea">Linea</router-link>
            </li>
            <li class="md:px-4 md:py-2 hover:text-green-500">
              <router-link to="/Corsa">Corsa</router-link>
            </li>
            <li class="md:px-4 md:py-2 hover:text-green-500">
              <router-link to="/Profilo">Profilo</router-link>
            </li>
          </ul>
        </div>
        <div class="order-2 md:order-3">
          <router-link to="/LoginPage">
            <button class="px-4 py-2 bg-green-500 hover:bg-green-600 text-gray-50 rounded-xl flex items-center gap-2">
              <!-- Heroicons - Login Solid -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              Login
            </button>
          </router-link>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* General reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #333;
  padding: 1rem 2rem;
}

.navbar-logo {
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
}

.navbar-links {
  list-style: none;
  display: flex;
  gap: 1.5rem;
}

.navbar-links li {
  display: inline;
}

.navbar-links a {
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s ease;
}

.navbar-links a:hover {
  color: #ffdd57;
}

/* Mobile-friendly adjustments */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .navbar-links {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
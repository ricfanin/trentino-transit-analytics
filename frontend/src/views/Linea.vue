/* eslint-disable */
<template>
  <div><!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pagina di Post</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
</head>
<body class="bg-gray-100">
    <div class="flex">
        <!-- Sidebar -->
        <div class="w-16 bg-gray-800 min-h-screen"></div>

        <!-- Main Content -->
        <div class="flex-1 p-8">
            <!-- Search Bar -->
            <div class="flex justify-between items-center mb-6">
                <input type="text" placeholder="Cerca un argomento" class="w-full max-w-md px-4 py-2 border rounded-full focus:outline-none">
                <select class="ml-4 px-4 py-2 border rounded-md">
                    <option value="trend">Tendenza</option>
                    <!-- Altre opzioni qui -->
                </select>
                <button class="ml-4 px-6 py-2 bg-blue-500 text-white rounded-md">Crea Post</button>
            </div>

            <!-- Post Cards -->
            <div class="space-y-6">
                <!-- Singolo Post -->
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <div class="flex justify-between mb-4">
                        <span class="text-gray-600">Linea / Fermata Recensita</span>
                        <span class="font-bold">Titolo del Post</span>
                        <span class="text-gray-600 flex items-center">
                            <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="..."></path></svg>
                            Username
                        </span>
                    </div>
                    <p class="text-gray-700 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center text-gray-600">
                            <svg class="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="..."></path></svg>
                            355
                        </div>
                        <button class="flex items-center px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">
                            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="..."></path></svg>
                            Condividi
                        </button>
                        <button class="flex items-center px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">
                            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="..."></path></svg>
                            Commenta
                        </button>
                    </div>
                </div>
                <!-- Fine Singolo Post -->

                <!-- Duplicato per un secondo post -->
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <!-- Ripeti struttura del post -->
                </div>
            </div>

            <!-- Paginazione -->
            <div class="flex justify-center mt-6">
                <span class="text-gray-600">...</span>
            </div>
        </div>
    </div>
</body>
</html>
</div>
</template>

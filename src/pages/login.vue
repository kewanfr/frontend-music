<script setup>
</script>

<template>
  <main>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Connexion
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
      <!-- <form class="space-y-6" action="#" method="POST"> -->
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900 ">Nom d'utilisateur ou email</label>
          <!-- >Email address</label> -->
          <div class="mt-2">
            <input id="username" name="username" v-model="username" type="text" autocomplete="username" required=""
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900 ">Mot de Passe</label>
            <div class="text-sm">
              <a href="/register" class="font-semibold text-indigo-600 hover:text-indigo-500">Inscription</a>
            </div>
          </div>
          <div class="mt-2">
            <input id="password" name="password" v-model="password" type="password" autocomplete="current-password" required=""
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button @click="handleLogin"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Connexion</button>
        </div>
      <!-- </form> -->
    </div>
  </div>
  </main>
</template>

<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores';

const store = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')
const handleLogin = async () => {
  await store.login(username.value, password.value)
  router.push('/')
}


</script>
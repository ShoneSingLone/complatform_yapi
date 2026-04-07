<script>
import { useSystemStore } from '@/store';

export default {
  data() {
    return {
      system: useSystemStore(),
      username: 'admin',
      password: 'password'
    };
  },
  methods: {
    handleLogin() {
      this.system.login({ username: this.username, email: 'admin@example.com' });
    }
  }
};
</script>

<template>
  <div class="w-screen h-screen flex items-center justify-center bg-surface">
    <div class="p-8 bg-surface-container-high rounded-m3-large elevation-3 w-96">
      <h1 class="text-2xl font-bold mb-6 text-center text-on-surface">Login</h1>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-on-surface-variant mb-1">Username</label>
          <input v-model="username" type="text" class="w-full px-3 py-2 bg-surface rounded-m3-small border border-outline-variant focus:border-primary outline-none" />
        </div>
        <div>
          <label class="block text-sm font-medium text-on-surface-variant mb-1">Password</label>
          <input v-model="password" type="password" class="w-full px-3 py-2 bg-surface rounded-m3-small border border-outline-variant focus:border-primary outline-none" />
        </div>
        <button @click="handleLogin" class="w-full m3-button-primary mt-4">Login</button>
      </div>
    </div>
  </div>
</template>

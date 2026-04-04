<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useSystemStore } from '@/store';
import { Monitor } from 'lucide-vue-next';

const STORAGE_KEY = 'xspace_remembered_credentials';

export default defineComponent({
  name: 'AuthScreen',
  components: {
    Monitor
  },
  setup() {
    const system = useSystemStore();
    const username = ref('');
    const email = ref('');
    const rememberMe = ref(false);

    const loadSavedCredentials = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const credentials = JSON.parse(saved);
          username.value = credentials.username || '';
          email.value = credentials.email || '';
          rememberMe.value = true;
        }
      } catch (e) {
        console.error('Failed to load saved credentials:', e);
      }
    };

    const handleLogin = () => {
      if (username.value && email.value) {
        if (rememberMe.value) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify({
            username: username.value,
            email: email.value
          }));
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
        
        system.login({
          username: username.value,
          email: email.value
        });
      }
    };

    onMounted(() => {
      loadSavedCredentials();
    });

    return {
      system,
      username,
      email,
      rememberMe,
      handleLogin
    };
  }
});
</script>

<template>
  <div class="auth-screen">
    <div class="auth-screen__container">
      <div class="auth-screen__container__header">
        <Monitor :size="48" class="auth-screen__container__header__icon" />
      </div>
      
      <h1 class="auth-screen__container__title">Welcome to Workspace</h1>
      <p class="auth-screen__container__subtitle">Sign in to continue</p>
      
      <form @submit.prevent="handleLogin" class="auth-screen__container__form">
        <div class="auth-screen__container__form__field">
          <label class="auth-screen__container__form__field__label">Username</label>
          <input
            v-model="username"
            type="text"
            required
            class="auth-screen__container__form__field__input"
            placeholder="Enter your username"
          />
        </div>
        
        <div class="auth-screen__container__form__field">
          <label class="auth-screen__container__form__field__label">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="auth-screen__container__form__field__input"
            placeholder="Enter your email"
          />
        </div>
        
        <div class="auth-screen__container__form__remember">
          <input
            v-model="rememberMe"
            type="checkbox"
            id="rememberMe"
            class="auth-screen__container__form__remember__checkbox"
          />
          <label for="rememberMe" class="auth-screen__container__form__remember__label">
            Remember me
          </label>
        </div>
        
        <button
          type="submit"
          class="auth-screen__container__form__button"
        >
          Sign In
        </button>
      </form>
    </div>
  </div>
</template>

<style lang="less">
@import '../styles/bem-global.less';
</style>

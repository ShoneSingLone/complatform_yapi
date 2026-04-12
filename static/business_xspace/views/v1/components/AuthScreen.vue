<template>
  <div class="auth-screen">
    <div class="auth-screen__container">
      <h1 class="auth-screen__title">XSpace Login</h1>
      <div class="auth-screen__form">
        <div class="auth-screen__form-item">
          <label class="auth-screen__label">Email</label>
          <input 
            v-model="email" 
            type="email" 
            class="auth-screen__input"
            placeholder="admin@example.com"
            autocomplete="email"
            @keypress.enter="handleLogin"
          />
        </div>
        <div class="auth-screen__form-item">
          <label class="auth-screen__label">Password</label>
          <input 
            v-model="password" 
            type="password" 
            class="auth-screen__input"
            placeholder="••••••••"
            autocomplete="current-password"
            @keypress.enter="handleLogin"
          />
        </div>
        <!-- 错误提示 -->
        <div v-if="errorMessage" class="auth-screen__error">
          {{ errorMessage }}
        </div>
        <!-- 登录按钮 -->
        <button 
          @click="handleLogin" 
          class="auth-screen__button"
          :disabled="isLoading"
        >
          <span v-if="isLoading" class="auth-screen__loading"></span>
          <span>{{ isLoading ? 'Logging in...' : 'Login' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  return {
    inject: ['APP'],
    data() {
      return {
        email: _.$lStorage.email || '',
        password: '',
        errorMessage: '',
        isLoading: false
      };
    },
    methods: {
      async handleLogin() {
        const vm = this;
        
        // 重置错误
        vm.errorMessage = '';
        
        // 表单验证
        if (!vm.email) {
          vm.errorMessage = 'Please enter your email';
          return;
        }
        if (!vm.password) {
          vm.errorMessage = 'Please enter your password';
          return;
        }
        
        vm.isLoading = true;
        
        try {
          // 调用后端登录 API
          const res = await _api.xspace.userLogin({
            email: vm.email,
            password: vm.password
          });
          
          if (res?.data?.x_token) {
            // 存储 Token
            _.$lStorage.x_token = res.data.x_token;
            // 记住邮箱
            _.$lStorage.email = vm.email;
            
            // 刷新用户信息（entry.vue 中已实现）
            await vm.APP.refreshUserInfo();
            
            _.$msg('Login successful!');
          } else {
            vm.errorMessage = res?.data?.errmsg || 'Login failed';
          }
        } catch (e) {
          console.error('Login error:', e);
          vm.errorMessage = e.message || 'Network error, please try again';
          _.$msgError(vm.errorMessage);
        } finally {
          vm.isLoading = false;
        }
      }
    }
  };
}
</script>

<style lang="less">
.auth-screen {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-surface);
}

.auth-screen__container {
  padding: 32px;
  background-color: var(--color-surface-container-high);
  border-radius: var(--border-radius--large);
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3), 0px 4px 8px 3px rgba(0, 0, 0, 0.15);
  width: 384px;
}

.auth-screen__title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 24px;
  text-align: center;
  color: var(--color-on-surface);
}

.auth-screen__form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.auth-screen__form-item {
  display: flex;
  flex-direction: column;
}

.auth-screen__label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 4px;
  color: var(--color-on-surface-variant);
}

.auth-screen__input {
  width: 100%;
  padding: 8px 12px;
  background-color: var(--color-surface);
  border-radius: var(--border-radius--small);
  border: 1px solid var(--color-outline-variant);
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: var(--color-primary);
  }
}

.auth-screen__error {
  font-size: 0.875rem;
  color: var(--color-error);
  margin-top: 8px;
}

.auth-screen__button {
  width: 100%;
  padding: 0.625rem 1.5rem;
  margin-top: 16px;
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  border-radius: 9999px;
  font-weight: 500;
  font-size: 0.875rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  }

  &:active {
    background-color: rgba(0, 97, 164, 0.9);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.auth-screen__loading {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: auth-screen__spin 0.8s linear infinite;
}

@keyframes auth-screen__spin {
  to {
    transform: rotate(360deg);
  }
}

// 移动端适配
body.app-mobile {
  .auth-screen__container {
    width: 90%;
  }
}
</style>

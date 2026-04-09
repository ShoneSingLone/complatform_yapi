<template>
  <div class="w-screen h-screen flex items-center justify-center bg-surface">
    <div class="p-8 bg-surface-container-high rounded-m3-large elevation-3 w-96">
      <h1 class="text-2xl font-bold mb-6 text-center text-on-surface">XSpace Login</h1>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-on-surface-variant mb-1">Email</label>
          <input 
            v-model="email" 
            type="email" 
            class="w-full px-3 py-2 bg-surface rounded-m3-small border border-outline-variant focus:border-primary outline-none"
            placeholder="admin@example.com"
            autocomplete="email"
            @keypress.enter="handleLogin"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-on-surface-variant mb-1">Password</label>
          <input 
            v-model="password" 
            type="password" 
            class="w-full px-3 py-2 bg-surface rounded-m3-small border border-outline-variant focus:border-primary outline-none"
            placeholder="••••••••"
            autocomplete="current-password"
            @keypress.enter="handleLogin"
          />
        </div>
        <!-- 错误提示 -->
        <div v-if="errorMessage" class="text-sm text-error mt-2">
          {{ errorMessage }}
        </div>
        <!-- 登录按钮 -->
        <button 
          @click="handleLogin" 
          class="w-full m3-button-primary mt-4 flex items-center justify-center gap-2"
          :disabled="isLoading"
        >
          <span v-if="isLoading" class="loading-spinner"></span>
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
/* 登录页面样式 */
.w-screen {
  width: 100vw;
}

.h-screen {
  height: 100vh;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.bg-surface {
  background-color: var(--color-surface);
}

.bg-surface-container-high {
  background-color: var(--color-surface-container-high);
}

.rounded-m3-large {
  border-radius: 16px;
}

.elevation-3 {
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3), 0px 4px 8px 3px rgba(0, 0, 0, 0.15);
}

.w-96 {
  width: 384px;
}

.p-8 {
  padding: 32px;
}

.text-2xl {
  font-size: 1.5rem;
}

.font-bold {
  font-weight: 700;
}

.mb-6 {
  margin-bottom: 24px;
}

.text-center {
  text-align: center;
}

.text-on-surface {
  color: var(--color-on-surface);
}

.space-y-4 {
  gap: 16px;
}

.block {
  display: block;
}

.text-sm {
  font-size: 0.875rem;
}

.font-medium {
  font-weight: 500;
}

.text-on-surface-variant {
  color: var(--color-on-surface-variant);
}

.mb-1 {
  margin-bottom: 4px;
}

.w-full {
  width: 100%;
}

.px-3 {
  padding-left: 12px;
  padding-right: 12px;
}

.py-2 {
  padding-top: 8px;
  padding-bottom: 8px;
}

.rounded-m3-small {
  border-radius: 8px;
}

.border {
  border: 1px solid;
}

.border-outline-variant {
  border-color: var(--color-outline-variant);
}

.focus\:border-primary:focus {
  border-color: var(--color-primary);
}

.outline-none {
  outline: none;
}

.m3-button-primary {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  border-radius: 9999px;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
}

.m3-button-primary:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
}

.m3-button-primary:active {
  background-color: rgba(0, 97, 164, 0.9);
}

.mt-4 {
  margin-top: 16px;
}

body.app-mobile {
  .w-96 {
    width: 90%;
  }
}

/* 加载动画 */
.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 禁用状态 */
.m3-button-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.text-error {
  color: var(--color-error);
}
</style>

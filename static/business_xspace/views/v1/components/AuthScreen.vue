<template>
  <div class="auth-screen">
    <div class="auth-screen__container">
      <div class="auth-screen__brand">
        <span class="auth-screen__brand-dot"></span>
        <span class="auth-screen__brand-text">xspace</span>
      </div>
      <h1 class="auth-screen__title">欢迎登录工作台</h1>
      <p class="auth-screen__subtitle">使用现有账号进入 v1 桌面壳层。</p>
      <div class="auth-screen__form">
        <div class="auth-screen__form-item">
          <label class="auth-screen__label">邮箱</label>
          <input 
            v-model="email" 
            type="email" 
            class="auth-screen__input"
            placeholder="请输入登录邮箱"
            autocomplete="email"
            @keypress.enter="handleLogin"
          />
        </div>
        <div class="auth-screen__form-item">
          <label class="auth-screen__label">密码</label>
          <input 
            v-model="password" 
            type="password" 
            class="auth-screen__input"
            placeholder="请输入登录密码"
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
          <span>{{ isLoading ? '登录中...' : '登录' }}</span>
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
          vm.errorMessage = '请输入邮箱';
          return;
        }
        if (!vm.password) {
          vm.errorMessage = '请输入密码';
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
            
            _.$msg('登录成功');
          } else {
            vm.errorMessage = res?.data?.errmsg || '登录失败';
          }
        } catch (e) {
          console.error('Login error:', e);
          vm.errorMessage = e.message || '网络异常，请稍后重试';
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
  padding: 24px;
  background:
    radial-gradient(circle at 12% 12%, rgba(49, 130, 206, 0.16) 0%, rgba(49, 130, 206, 0) 34%),
    radial-gradient(circle at 84% 10%, rgba(99, 179, 237, 0.14) 0%, rgba(99, 179, 237, 0) 28%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.72) 0%, rgba(255, 255, 255, 0.2) 100%),
    var(--body-bg-color, #f4f9fd);
}

.auth-screen__container {
  width: 100%;
  max-width: 420px;
  padding: 32px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid var(--el-border-color-lighter, #ebeef5);
  border-radius: 20px;
  box-shadow: var(--el-box-shadow);
  backdrop-filter: blur(20px);
}

.auth-screen__brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.auth-screen__brand-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: var(--el-color-primary, #3182ce);
  box-shadow: 0 0 0 6px var(--el-color-primary-light-9, #eff6ff);
}

.auth-screen__brand-text {
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--el-text-color-regular, #606266);
}

.auth-screen__title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--el-text-color-primary, #303133);
}

.auth-screen__subtitle {
  margin: 0 0 24px;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--el-text-color-secondary, #909399);
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
  margin-bottom: 6px;
  color: var(--el-text-color-regular, #606266);
}

.auth-screen__input {
  width: 100%;
  padding: 12px 14px;
  background-color: var(--bg-color, #f5f8f7);
  border-radius: var(--border-radius--small, 8px);
  border: 1px solid var(--el-border-color, #dcdfe6);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s, background-color 0.2s;

  &:focus {
    background-color: var(--el-fill-color-blank, #ffffff);
    border-color: var(--el-color-primary, #3182ce);
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.12);
  }
}

.auth-screen__error {
  font-size: 0.875rem;
  color: var(--el-color-danger, #f56c6c);
  margin-top: -4px;
}

.auth-screen__button {
  width: 100%;
  padding: 0.8125rem 1.5rem;
  margin-top: 16px;
  background: linear-gradient(180deg, var(--el-color-primary, #3182ce) 0%, var(--el-color-primary-active, #2563eb) 100%);
  color: #ffffff;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.9375rem;
  border: none;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s, filter 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 14px 28px rgba(49, 130, 206, 0.24);
  }

  &:active {
    transform: translateY(0);
    filter: brightness(0.96);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.auth-screen__loading {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.32);
  border-top-color: currentColor;
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
    padding: 24px;
  }
}
</style>

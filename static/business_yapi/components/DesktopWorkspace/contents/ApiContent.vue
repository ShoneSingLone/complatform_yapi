<template>
  <div class="api-content">
    <!-- API 基本信息 -->
    <div class="api-header" v-if="data && data.metadata">
      <div class="api-method" :class="methodClass">{{ data.metadata.method || 'GET' }}</div>
      <div class="api-path">{{ data.metadata.url || '/' }}</div>
    </div>

    <!-- API 调试面板 -->
    <div class="api-debugger">
      <!-- 请求区域 -->
      <div class="request-section">
        <div class="section-header">
          <h3>请求</h3>
        </div>
        <div class="section-body">
          <div class="form-group">
            <label>Headers</label>
            <textarea v-model="headers" rows="4" placeholder="Content-Type: application/json"></textarea>
          </div>
          <div class="form-group">
            <label>Body</label>
            <textarea v-model="body" rows="6" placeholder="Request body (JSON)"></textarea>
          </div>
          <xBtn :configs="sendBtnConfig" />
        </div>
      </div>

      <!-- 响应区域 -->
      <div class="response-section" v-if="response">
        <div class="section-header">
          <h3>响应</h3>
          <div class="response-meta">
            <span class="status-code" :class="statusClass">{{ response.status }} {{ response.statusText }}</span>
            <span class="response-time">{{ response.time }}ms</span>
          </div>
        </div>
        <div class="section-body">
          <pre class="response-body"><code>{{ formattedResponse }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  return {
    props: {
      data: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        headers: '',
        body: '',
        isLoading: false,
        response: null
      };
    },
    computed: {
      methodClass() {
        if (!this.data || !this.data.metadata) return 'get';
        const method = this.data.metadata.method || 'GET';
        return method.toLowerCase();
      },
      sendBtnConfig() {
        return {
          label: this.isLoading ? '发送中...' : '发送请求',
          preset: 'blue',
          disabled: this.isLoading,
          onClick: this.handleSend
        };
      },
      statusClass() {
        if (!this.response) return '';
        const status = this.response.status;
        if (status >= 200 && status < 300) return 'success';
        if (status >= 400) return 'error';
        return 'warning';
      },
      formattedResponse() {
        if (!this.response) return '';
        try {
          return JSON.stringify(this.response.data, null, 2);
        } catch {
          return this.response.data;
        }
      }
    },
    methods: {
      async handleSend() {
        this.isLoading = true;
        this.response = null;

        try {
          // 模拟请求延迟
          await new Promise(resolve => setTimeout(resolve, 800));

          // 模拟响应
          this.response = {
            status: 200,
            statusText: 'OK',
            time: 845,
            data: {
              code: 0,
              message: 'success',
              data: {
                users: [
                  { id: 1, name: 'John Doe', email: 'john@example.com' },
                  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
                ],
                total: 2,
                environment: 'Development'
              }
            }
          };
        } catch (error) {
          this.response = {
            status: 500,
            statusText: 'Internal Server Error',
            time: 0,
            data: { error: error.message }
          };
        } finally {
          this.isLoading = false;
        }
      }
    }
  };
}
</script>

<style lang="less">
.api-content {
  height: 100%;
  display: flex;
  flex-direction: column;

  .api-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    margin-bottom: 16px;

    .api-method {
      padding: 4px 12px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;

      &.get { background: #34c759; color: #fff; }
      &.post { background: #007aff; color: #fff; }
      &.put { background: #ff9500; color: #fff; }
      &.delete { background: #ff3b30; color: #fff; }
      &.patch { background: #af52de; color: #fff; }
    }

    .api-path {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.9);
      font-family: monospace;
    }
  }

  .api-debugger {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
    overflow: auto;

    .request-section,
    .response-section {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      overflow: hidden;

      .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        background: rgba(255, 255, 255, 0.05);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);

        h3 {
          font-size: 14px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
        }

        .response-meta {
          display: flex;
          align-items: center;
          gap: 12px;

          .status-code {
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 500;

            &.success { background: rgba(52, 199, 89, 0.2); color: #34c759; }
            &.error { background: rgba(255, 59, 48, 0.2); color: #ff3b30; }
            &.warning { background: rgba(255, 149, 0, 0.2); color: #ff9500; }
          }

          .response-time {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.6);
          }
        }
      }

      .section-body {
        padding: 16px;

        .form-group {
          margin-bottom: 16px;

          label {
            display: block;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.6);
            margin-bottom: 8px;
          }

          textarea {
            width: 100%;
            padding: 12px;
            background: rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 6px;
            color: rgba(255, 255, 255, 0.9);
            font-family: monospace;
            font-size: 13px;
            resize: vertical;

            &:focus {
              outline: none;
              border-color: #007aff;
            }

            &::placeholder {
              color: rgba(255, 255, 255, 0.3);
            }
          }
        }

        .response-body {
          margin: 0;
          padding: 12px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 6px;
          overflow: auto;

          code {
            font-family: monospace;
            font-size: 13px;
            color: rgba(255, 255, 255, 0.9);
            white-space: pre-wrap;
          }
        }
      }
    }
  }
}
</style>

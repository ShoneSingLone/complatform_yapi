<template>
  <div class="api-content">
    <!-- 顶部工具栏 -->
    <div class="api-content__toolbar">
      <div class="api-content__toolbar__left">
        <!-- 返回按钮 -->
        <button class="api-content__toolbar__back" @click="handleBack" title="返回">
          <svg class="icon" style="width: 20px; height: 20px; fill: currentColor;" viewBox="0 0 24 24">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
        </button>
        <!-- 面包屑 -->
        <div class="api-content__toolbar__breadcrumb">
          <span v-for="(crumb, index) in breadcrumbs" :key="index" @click="handleCrumbClick(crumb, index)">
            <span class="api-content__toolbar__breadcrumb__item">{{ crumb.name }}</span>
            <span v-if="index < breadcrumbs.length - 1" class="api-content__toolbar__breadcrumb__separator">/</span>
          </span>
        </div>
      </div>

      <div class="api-content__toolbar__right">
        <!-- 环境切换器 -->
        <div class="api-content__environment-switcher">
          <svg class="icon" style="width: 16px; height: 16px; fill: currentColor;" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
          <select v-model="currentEnvironment" class="api-content__environment-select" @change="handleEnvironmentChange">
            <option value="Development">Development</option>
            <option value="Test">Test</option>
            <option value="Staging">Staging</option>
            <option value="Production">Production</option>
          </select>
          <svg class="icon" style="width: 16px; height: 16px; fill: currentColor;" viewBox="0 0 24 24">
            <path d="M7 10l5 5 5-5z"/>
          </svg>
        </div>
        <!-- 预览面板切换 -->
        <button class="api-content__toolbar__preview-toggle" @click="showPreview = !showPreview" :class="{ active: showPreview }" title="预览面板">
          <svg class="icon" style="width: 20px; height: 20px; fill: currentColor;" viewBox="0 0 24 24">
            <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="api-content__main">
      <!-- 文件夹视图 -->
      <div v-if="viewType === 'folder'" class="api-content__folder-view">
        <div class="api-content__file-list">
          <!-- 表头 -->
          <div class="api-content__file-header">
            <span class="api-content__file-header__name" @click="handleSort('name')">
              名称
              <span class="api-content__sort-icon">{{ getSortIcon('name') }}</span>
            </span>
            <span class="api-content__file-header__date" @click="handleSort('date')">
              修改日期
              <span class="api-content__sort-icon">{{ getSortIcon('date') }}</span>
            </span>
            <span class="api-content__file-header__type" @click="handleSort('type')">
              类型
              <span class="api-content__sort-icon">{{ getSortIcon('type') }}</span>
            </span>
          </div>
          <!-- 文件列表 -->
          <div v-if="sortedFiles.length === 0" class="api-content__empty">
            <svg class="icon" style="width: 48px; height: 48px; fill: currentColor; opacity: 0.3;" viewBox="0 0 24 24">
              <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
            </svg>
            <p>此文件夹为空</p>
          </div>
          <div
            v-for="file in sortedFiles"
            :key="file.id"
            class="api-content__file-item"
            :class="{ selected: selectedFile && selectedFile.id === file.id }"
            @click="selectedFile = file"
            @dblclick="handleOpenFile(file)"
          >
            <div class="api-content__file-item__icon">
              <svg class="icon" style="width: 20px; height: 20px; fill: currentColor;" viewBox="0 0 24 24">
                <path v-if="file.type === 'api' || file.type === 'code'" d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                <path v-else-if="file.type === 'doc'" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                <path v-else-if="file.type === 'member_list'" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                <path v-else-if="file.type === 'setting'" d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
                <path v-else-if="file.type === 'folder'" d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
                <path v-else d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6z"/>
              </svg>
            </div>
            <span class="api-content__file-item__name">{{ file.name }}</span>
            <span class="api-content__file-item__date">{{ formatDate(file.updatedAt) }}</span>
            <span class="api-content__file-item__type">{{ file.type.replace('_', ' ') }}</span>
          </div>
        </div>
      </div>

      <!-- API 编辑器视图 -->
      <div v-else-if="viewType === 'api'" class="api-content__editor-view">
        <div class="api-content__editor">
          <div class="api-content__editor__header">
            <div class="api-content__editor__title">
              <span class="api-content__method-badge" :class="currentApi.method.toLowerCase()">{{ currentApi.method }}</span>
              <span class="api-content__endpoint">{{ currentApi.path }}</span>
            </div>
            <div class="api-content__editor__actions">
              <button v-if="!isEditing" class="api-content__btn" @click="startEditing">
                <svg class="icon" style="width: 16px; height: 16px; fill: currentColor;" viewBox="0 0 24 24">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
                编辑
              </button>
              <template v-else>
                <button class="api-content__btn" @click="cancelEditing">取消</button>
                <button class="api-content__btn api-content__btn--primary" @click="saveChanges">
                  <svg class="icon" style="width: 16px; height: 16px; fill: currentColor;" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  保存
                </button>
              </template>
              <button class="api-content__btn api-content__btn--success" @click="sendRequest" :disabled="isRequesting">
                <svg v-if="isRequesting" class="icon" style="width: 16px; height: 16px; fill: currentColor; animation: spin 1s linear infinite;" viewBox="0 0 24 24">
                  <path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"/>
                </svg>
                <svg v-else class="icon" style="width: 16px; height: 16px; fill: currentColor;" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
                {{ isRequesting ? '发送中...' : '发送' }}
              </button>
            </div>
          </div>

          <!-- 请求参数区域 -->
          <div class="api-content__request-section">
            <div class="api-content__tabs">
              <button
                v-for="tab in requestTabs"
                :key="tab"
                class="api-content__tab"
                :class="{ active: activeRequestTab === tab }"
                @click="activeRequestTab = tab"
              >{{ tab }}</button>
            </div>

            <!-- Params 标签页 -->
            <div v-show="activeRequestTab === 'Params'" class="api-content__params">
              <div v-for="(param, index) in requestParams" :key="index" class="api-content__param-row">
                <input v-model="param.name" class="api-content__input" placeholder="参数名" :disabled="!isEditing" />
                <input v-model="param.value" class="api-content__input" placeholder="值" :disabled="!isEditing" />
                <input v-model="param.description" class="api-content__input" placeholder="描述" :disabled="!isEditing" />
                <label class="api-content__checkbox-wrapper">
                  <input type="checkbox" v-model="param.required" :disabled="!isEditing" />
                  必填
                </label>
                <button v-if="isEditing" class="api-content__btn-icon" @click="removeParam(index)">
                  <svg class="icon" style="width: 16px; height: 16px; fill: currentColor;" viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
              </div>
              <button v-if="isEditing" class="api-content__btn" @click="addParam">+ 添加参数</button>
            </div>

            <!-- Headers 标签页 -->
            <div v-show="activeRequestTab === 'Headers'" class="api-content__params">
              <div v-for="(header, index) in requestHeaders" :key="index" class="api-content__param-row">
                <input v-model="header.name" class="api-content__input" placeholder="Header 名称" :disabled="!isEditing" />
                <input v-model="header.value" class="api-content__input" placeholder="值" :disabled="!isEditing" />
                <label class="api-content__checkbox-wrapper">
                  <input type="checkbox" v-model="header.required" :disabled="!isEditing" />
                  必填
                </label>
                <button v-if="isEditing" class="api-content__btn-icon" @click="removeHeader(index)">
                  <svg class="icon" style="width: 16px; height: 16px; fill: currentColor;" viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
              </div>
              <button v-if="isEditing" class="api-content__btn" @click="addHeader">+ 添加 Header</button>
            </div>

            <!-- Body 标签页 -->
            <div v-show="activeRequestTab === 'Body'" class="api-content__body">
              <textarea
                v-model="requestBody"
                class="api-content__textarea"
                placeholder="请求体 (JSON)"
                :disabled="!isEditing"
              ></textarea>
            </div>
          </div>

          <!-- 响应区域 -->
          <div v-if="response" class="api-content__response">
            <div class="api-content__response__header">
              <span class="api-content__response__status" :class="responseStatusClass">{{ response.status }} {{ response.statusText }}</span>
              <span class="api-content__response__time">{{ response.time }} ms</span>
              <button class="api-content__btn-icon" @click="copyResponse" title="复制响应">
                <svg class="icon" style="width: 16px; height: 16px; fill: currentColor;" viewBox="0 0 24 24">
                  <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                </svg>
              </button>
            </div>
            <pre class="api-content__response__body"><code>{{ formattedResponse }}</code></pre>
          </div>
        </div>
      </div>

      <!-- 成员列表视图 -->
      <div v-else-if="viewType === 'member_list'" class="api-content__member-view">
        <div class="api-content__editor">
          <div class="api-content__editor__header">
            <div class="api-content__editor__title">
              <svg class="icon" style="width: 24px; height: 24px; fill: currentColor;" viewBox="0 0 24 24">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
              </svg>
              <div>
                <h2>成员列表</h2>
                <p>{{ members.length }} 位成员</p>
              </div>
            </div>
            <div class="api-content__editor__actions">
              <button v-if="!isEditing" class="api-content__btn" @click="startEditing">
                <svg class="icon" style="width: 16px; height: 16px; fill: currentColor;" viewBox="0 0 24 24">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
                编辑
              </button>
              <template v-else>
                <button class="api-content__btn" @click="cancelEditing">取消</button>
                <button class="api-content__btn api-content__btn--primary" @click="saveChanges">
                  <svg class="icon" style="width: 16px; height: 16px; fill: currentColor;" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  保存
                </button>
              </template>
            </div>
          </div>

          <div class="api-content__member-table">
            <div class="api-content__member-table__header">
              <span>名称</span>
              <span>角色</span>
              <span>邮箱</span>
              <span>操作</span>
            </div>
            <div v-for="(member, index) in members" :key="index" class="api-content__member-table__row">
              <span>{{ member.name }}</span>
              <select v-model="member.role" class="api-content__select" :disabled="!isEditing">
                <option value="owner">所有者</option>
                <option value="maintainer">维护者</option>
                <option value="developer">开发者</option>
                <option value="guest">访客</option>
              </select>
              <span>{{ member.email }}</span>
              <button v-if="isEditing" class="api-content__btn-icon api-content__btn-icon--danger" @click="removeMember(index)">
                <svg class="icon" style="width: 16px; height: 16px; fill: currentColor;" viewBox="0 0 24 24">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
              </button>
              <span v-else></span>
            </div>
            <button v-if="isEditing" class="api-content__btn api-content__btn--add" @click="addMember">
              <svg class="icon" style="width: 16px; height: 16px; fill: currentColor;" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
              添加成员
            </button>
          </div>
        </div>
      </div>

      <!-- 设置视图 -->
      <div v-else-if="viewType === 'setting'" class="api-content__setting-view">
        <div class="api-content__editor">
          <div class="api-content__editor__header">
            <div class="api-content__editor__title">
              <svg class="icon" style="width: 24px; height: 24px; fill: currentColor;" viewBox="0 0 24 24">
                <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
              </svg>
              <div>
                <h2>设置</h2>
                <p>项目配置</p>
              </div>
            </div>
            <div class="api-content__editor__actions">
              <button v-if="!isEditing" class="api-content__btn" @click="startEditing">
                <svg class="icon" style="width: 16px; height: 16px; fill: currentColor;" viewBox="0 0 24 24">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
                编辑
              </button>
              <template v-else>
                <button class="api-content__btn" @click="cancelEditing">取消</button>
                <button class="api-content__btn api-content__btn--primary" @click="saveChanges">
                  <svg class="icon" style="width: 16px; height: 16px; fill: currentColor;" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  保存
                </button>
              </template>
            </div>
          </div>

          <div class="api-content__settings-form">
            <div class="api-content__setting-item">
              <label>项目名称</label>
              <input v-model="settings.name" class="api-content__input" :disabled="!isEditing" />
            </div>
            <div class="api-content__setting-item">
              <label>项目描述</label>
              <textarea v-model="settings.description" class="api-content__textarea" :disabled="!isEditing"></textarea>
            </div>
            <div class="api-content__setting-item">
              <label>Base URL</label>
              <input v-model="settings.baseUrl" class="api-content__input" :disabled="!isEditing" />
            </div>
            <div class="api-content__setting-item">
              <label>环境变量</label>
              <div v-for="(variable, index) in settings.variables" :key="index" class="api-content__variable-row">
                <input v-model="variable.key" class="api-content__input" placeholder="键" :disabled="!isEditing" />
                <input v-model="variable.value" class="api-content__input" placeholder="值" :disabled="!isEditing" />
                <button v-if="isEditing" class="api-content__btn-icon" @click="removeVariable(index)">
                  <svg class="icon" style="width: 16px; height: 16px; fill: currentColor;" viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
              </div>
              <button v-if="isEditing" class="api-content__btn" @click="addVariable">+ 添加变量</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 文档视图 -->
      <div v-else-if="viewType === 'doc'" class="api-content__doc-view">
        <div class="api-content__editor">
          <div class="api-content__editor__header">
            <div class="api-content__editor__title">
              <svg class="icon" style="width: 24px; height: 24px; fill: currentColor;" viewBox="0 0 24 24">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
              </svg>
              <div>
                <h2>{{ docContent.title }}</h2>
                <p>文档</p>
              </div>
            </div>
            <div class="api-content__editor__actions">
              <button v-if="!isEditing" class="api-content__btn" @click="startEditing">
                <svg class="icon" style="width: 16px; height: 16px; fill: currentColor;" viewBox="0 0 24 24">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
                编辑
              </button>
              <template v-else>
                <button class="api-content__btn" @click="cancelEditing">取消</button>
                <button class="api-content__btn api-content__btn--primary" @click="saveChanges">
                  <svg class="icon" style="width: 16px; height: 16px; fill: currentColor;" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  保存
                </button>
              </template>
            </div>
          </div>

          <div class="api-content__doc-content">
            <div v-if="!isEditing" class="api-content__doc-preview" v-html="renderedDoc"></div>
            <div v-else class="api-content__doc-editor">
              <div class="api-content__doc-editor__toolbar">
                <button class="api-content__doc-toolbar-btn" @click="insertMarkdown('**', '**')" title="加粗">B</button>
                <button class="api-content__doc-toolbar-btn" @click="insertMarkdown('*', '*')" title="斜体">I</button>
                <button class="api-content__doc-toolbar-btn" @click="insertMarkdown('# ', '')" title="标题">H</button>
                <button class="api-content__doc-toolbar-btn" @click="insertMarkdown('- ', '')" title="列表">•</button>
                <button class="api-content__doc-toolbar-btn" @click="insertMarkdown('`', '`')" title="代码">&lt;/&gt;</button>
                <button class="api-content__doc-toolbar-btn" @click="insertMarkdown('[', '](url)')" title="链接">🔗</button>
              </div>
              <textarea v-model="docContent.body" class="api-content__textarea api-content__doc-textarea" placeholder="使用 Markdown 编写文档..."></textarea>
              <div class="api-content__doc-preview-panel">
                <div class="api-content__doc-preview-content" v-html="renderedDoc"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 默认视图 -->
      <div v-else class="api-content__default-view">
        <div class="api-content__empty">
          <svg class="icon" style="width: 64px; height: 64px; fill: currentColor; opacity: 0.2;" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
          <p>选择一个资源以查看详情</p>
        </div>
      </div>
    </div>

    <!-- 右侧预览面板 -->
    <div v-if="showPreview && selectedFile" class="api-content__preview">
      <div class="api-content__preview__header">
        <button class="api-content__preview__close" @click="showPreview = false">
          <svg class="icon" style="width: 20px; height: 20px; fill: currentColor;" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>
      <div class="api-content__preview__content">
        <svg class="icon api-content__preview__icon" style="width: 60px; height: 60px; fill: currentColor;" viewBox="0 0 24 24">
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
        </svg>
        <h3>{{ selectedFile.name }}</h3>
        <p>{{ selectedFile.type.replace('_', ' ') }}</p>
        <button class="api-content__btn api-content__btn--primary" @click="handleOpenFile(selectedFile)">
          打开编辑器
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  const [TreeNode] = await _.$importVue([
    "@/components/DesktopWorkspace/TreeNode.vue"
  ]);

  return {
    components: {
      TreeNode
    },
    props: {
      windowData: {
        type: Object,
        default: null
      }
    },
    data: function() {
      return {
        // 视图状态
        viewType: 'folder', // folder | api | member_list | setting | doc
        selectedFile: null,
        selectedResource: null, // 当前选中的资源节点
        showPreview: true,
        isEditing: false,
        isRequesting: false,
        isLoading: false, // 数据加载状态

        // 资源树数据
        resourceTreeData: [],
        expandedKeys: [],
        checkedKeys: [],
        indeterminateKeys: [],
        
        // 环境
        currentEnvironment: 'Development',
        environments: ['Development', 'Test', 'Staging', 'Production'],

        // 排序
        sortField: 'name',
        sortOrder: 'asc', // asc | desc

        // 请求相关
        requestTabs: ['Params', 'Headers', 'Body'],
        activeRequestTab: 'Params',
        requestParams: [],
        requestHeaders: [],
        requestBody: '',
        response: null,

        // API 数据
        currentApi: {
          method: 'GET',
          path: '/api/users',
          description: ''
        },

        // 成员列表
        members: [
          { name: '张三', email: 'zhangsan@example.com', role: 'owner' },
          { name: '李四', email: 'lisi@example.com', role: 'developer' },
          { name: '王五', email: 'wangwu@example.com', role: 'guest' }
        ],

        // 设置
        settings: {
          name: 'XSpace API',
          description: 'XSpace 接口管理平台',
          baseUrl: 'http://localhost:3000',
          variables: [
            { key: 'apiVersion', value: 'v1' },
            { key: 'timeout', value: '5000' }
          ]
        },

        // 文档
        docContent: {
          title: 'API 文档',
          body: '# API 文档\n\n这是一个示例文档。\n\n## 接口列表\n\n- GET /users - 获取用户列表\n- POST /users - 创建用户\n- GET /users/:id - 获取用户详情'
        },

        // 文件列表（模拟数据）
        files: [
          { id: '1', name: '用户接口', type: 'api_folder', updatedAt: '2026-04-01T10:00:00Z' },
          { id: '2', name: 'GET /users', type: 'api', updatedAt: '2026-04-01T09:00:00Z' },
          { id: '3', name: 'POST /users', type: 'api', updatedAt: '2026-04-01T08:00:00Z' },
          { id: '4', name: '项目文档', type: 'doc', updatedAt: '2026-03-31T15:00:00Z' },
          { id: '5', name: '团队成员', type: 'member_list', updatedAt: '2026-03-30T12:00:00Z' },
          { id: '6', name: '项目设置', type: 'setting', updatedAt: '2026-03-29T10:00:00Z' }
        ],

        // 面包屑
        breadcrumbs: [
          { id: 'root', name: 'API Workspaces' },
          { id: 'group', name: 'Backend Team' },
          { id: 'project', name: 'Main API' }
        ],

        // 编辑前的备份
        backupData: null
      };
    },
    computed: {
      sortedFiles() {
        return [...this.files].sort((a, b) => {
          let compareResult = 0;
          const aValue = a[this.sortField] || '';
          const bValue = b[this.sortField] || '';

          if (this.sortField === 'name') {
            compareResult = aValue.localeCompare(bValue);
          } else if (this.sortField === 'date') {
            compareResult = new Date(aValue).getTime() - new Date(bValue).getTime();
          } else {
            compareResult = aValue.localeCompare(bValue);
          }

          return this.sortOrder === 'asc' ? compareResult : -compareResult;
        });
      },
      responseStatusClass() {
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
      },
      renderedDoc() {
        // 简单的 Markdown 渲染
        return this.docContent.body
          .replace(/^### (.*$)/gim, '<h3>$1</h3>')
          .replace(/^## (.*$)/gim, '<h2>$1</h2>')
          .replace(/^# (.*$)/gim, '<h1>$1</h1>')
          .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/gim, '<em>$1</em>')
          .replace(/`(.*?)`/gim, '<code>$1</code>')
          .replace(/^- (.*$)/gim, '<li>$1</li>')
          .replace(/\n/gim, '<br>');
      }
    },
    methods: {
      formatDate(dateString) {
        return new Date(dateString).toLocaleString('zh-CN');
      },
      getSortIcon(field) {
        if (this.sortField !== field) return '⇵';
        return this.sortOrder === 'asc' ? '↑' : '↓';
      },
      handleSort(field) {
        if (this.sortField === field) {
          this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
          this.sortField = field;
          this.sortOrder = 'asc';
        }
      },
      handleOpenFile(file) {
        this.selectedFile = file;
        this.viewType = file.type === 'api_folder' ? 'folder' : file.type;

        if (file.type === 'api') {
          this.currentApi = {
            method: file.name.split(' ')[0] || 'GET',
            path: file.name.split(' ').slice(1).join(' ') || '/api',
            description: ''
          };
        }

        // 更新面包屑
        if (!this.breadcrumbs.find(c => c.id === file.id)) {
          this.breadcrumbs.push({ id: file.id, name: file.name });
        }
      },
      handleCrumbClick(crumb, index) {
        this.breadcrumbs = this.breadcrumbs.slice(0, index + 1);
        this.viewType = 'folder';
        this.selectedFile = null;
      },
      handleBack() {
        if (this.breadcrumbs.length > 1) {
          this.breadcrumbs.pop();
          const crumb = this.breadcrumbs[this.breadcrumbs.length - 1];
          this.viewType = crumb.id === 'root' ? 'folder' : crumb.id;
        }
      },
      handleEnvironmentChange() {
        // 显示环境切换成功提示
        this.$message({
          type: 'success',
          message: `已切换到 ${this.currentEnvironment} 环境`,
          duration: 3000
        });
      },

      // 编辑相关方法
      startEditing() {
        this.backupData = JSON.parse(JSON.stringify({
          members: this.members,
          settings: this.settings,
          docContent: this.docContent,
          requestParams: this.requestParams,
          requestHeaders: this.requestHeaders,
          requestBody: this.requestBody
        }));
        this.isEditing = true;
      },
      cancelEditing() {
        if (this.backupData) {
          Object.assign(this, this.backupData);
        }
        this.isEditing = false;
        this.backupData = null;
      },
      saveChanges() {
        this.isEditing = false;
        this.backupData = null;
        this.$message({
          type: 'success',
          message: '保存成功',
          duration: 3000
        });
      },

      // API 调试方法
      async sendRequest() {
        this.isRequesting = true;
        this.response = null;

        try {
          // 模拟请求延迟
          await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));

          // 模拟响应
          this.response = {
            status: 200,
            statusText: 'OK',
            time: Math.floor(800 + Math.random() * 400),
            data: {
              code: 0,
              message: 'success',
              data: {
                users: [
                  { id: 1, name: '张三', email: 'zhangsan@example.com', role: 'developer' },
                  { id: 2, name: '李四', email: 'lisi@example.com', role: 'owner' }
                ],
                total: 2,
                environment: this.currentEnvironment
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
          this.isRequesting = false;
        }
      },
      copyResponse() {
        navigator.clipboard.writeText(this.formattedResponse);
        this.$message({
          type: 'success',
          message: '复制成功',
          duration: 2000
        });
      },

      // 参数管理
      addParam() {
        this.requestParams.push({ name: '', value: '', description: '', required: false });
      },
      removeParam(index) {
        this.requestParams.splice(index, 1);
      },
      addHeader() {
        this.requestHeaders.push({ name: '', value: '', required: false });
      },
      removeHeader(index) {
        this.requestHeaders.splice(index, 1);
      },

      // 成员管理
      addMember() {
        this.members.push({ name: '新成员', email: 'new@example.com', role: 'guest' });
      },
      removeMember(index) {
        this.members.splice(index, 1);
      },

      // 设置管理
      addVariable() {
        this.settings.variables.push({ key: '', value: '' });
      },
      removeVariable(index) {
        this.settings.variables.splice(index, 1);
      },

      // Markdown 编辑
      insertMarkdown(before, after) {
        this.docContent.body += before + after;
      }
    },
    mounted() {
      // 初始化 API 请求参数
      this.requestParams = [
        { name: 'page', value: '1', description: '页码', required: false },
        { name: 'limit', value: '20', description: '每页数量', required: false }
      ];
      this.requestHeaders = [
        { name: 'Content-Type', value: 'application/json', required: true }
      ];
    }
  };
}
</script>

<style lang="less">
// X-Manager API 内容样式
.api-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--x-bg-primary, #fff);
  color: var(--x-text-primary, #1F2329);

  // 工具栏
  &__toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    background-color: var(--x-bg-secondary, #F5F7FA);
    border-bottom: 1px solid var(--x-border, #E5E6EB);
    gap: 16px;

    &__left {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    &__right {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    &__back {
      width: 32px;
      height: 32px;
      border: none;
      background: none;
      cursor: pointer;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--x-text-secondary, #86909C);
      transition: all 0.2s;

      &:hover {
        background-color: var(--x-bg-hover, #F0F2F5);
        color: var(--x-primary, #165DFF);
      }
    }

    &__breadcrumb {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 14px;

      &__item {
        cursor: pointer;
        padding: 4px 8px;
        border-radius: 4px;
        transition: background-color 0.2s;

        &:hover {
          background-color: var(--x-bg-hover, #F0F2F5);
        }
      }

      &__separator {
        color: var(--x-text-secondary, #86909C);
      }
    }

    &__preview-toggle {
      width: 36px;
      height: 36px;
      border: 1px solid var(--x-border, #E5E6EB);
      background-color: var(--x-bg-primary, #fff);
      cursor: pointer;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;

      &:hover, &.active {
        background-color: var(--x-bg-active, #E6F7FF);
        border-color: var(--x-primary, #165DFF);
        color: var(--x-primary, #165DFF);
      }
    }
  }

  // 环境切换器
  &__environment-switcher {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    background-color: var(--x-bg-primary, #fff);
    border: 1px solid var(--x-border, #E5E6EB);
    border-radius: 4px;
    font-size: 14px;
    transition: all 0.2s;

    &:hover {
      border-color: var(--x-primary, #165DFF);
    }

    select {
      border: none;
      background: transparent;
      font-size: 14px;
      cursor: pointer;
      outline: none;
      color: var(--x-text-primary, #1F2329);

      option[value="Development"] { color: #52C41A; }
      option[value="Test"] { color: #165DFF; }
      option[value="Staging"] { color: #FAAD14; }
      option[value="Production"] { color: #FF4D4F; }
    }
  }

  // 主内容区域
  &__main {
    flex: 1;
    display: flex;
    overflow: hidden;
  }

  // 文件夹视图
  &__folder-view {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  &__file-list {
    flex: 1;
    overflow-y: auto;
  }

  &__file-header {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 16px;
    padding: 12px 16px;
    background-color: var(--x-bg-primary, #fff);
    border-bottom: 1px solid var(--x-border, #E5E6EB);
    font-size: 12px;
    font-weight: 600;
    color: var(--x-text-secondary, #86909C);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    position: sticky;
    top: 0;
    z-index: 10;

    span {
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;

      &:hover {
        color: var(--x-primary, #165DFF);
      }
    }
  }

  &__sort-icon {
    font-size: 10px;
    color: var(--x-text-secondary, #86909C);
  }

  &__file-item {
    display: grid;
    grid-template-columns: 24px 2fr 1fr 1fr;
    gap: 16px;
    padding: 12px 16px;
    align-items: center;
    cursor: pointer;
    border-bottom: 1px solid var(--x-border, #E5E6EB);
    font-size: 14px;
    transition: background-color 0.2s;

    &:hover {
      background-color: var(--x-bg-hover, #F0F2F5);
    }

    &.selected {
      background-color: var(--x-bg-active, #E6F7FF);
      border-left: 3px solid var(--x-primary, #165DFF);
    }

    &__icon {
      color: var(--x-primary, #165DFF);
    }

    &__name {
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &__date {
      color: var(--x-text-secondary, #86909C);
    }

    &__type {
      color: var(--x-text-secondary, #86909C);
      text-transform: capitalize;
    }
  }

  // 空状态
  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: var(--x-text-secondary, #86909C);
    padding: 48px;

    p {
      margin-top: 16px;
      font-size: 14px;
    }
  }

  // 编辑器视图
  &__editor-view,
  &__member-view,
  &__setting-view,
  &__doc-view {
    flex: 1;
    overflow-y: auto;
    padding: 24px;
  }

  &__editor {
    max-width: 900px;
    margin: 0 auto;
    background-color: var(--x-bg-primary, #fff);
    border: 1px solid var(--x-border, #E5E6EB);
    border-radius: 12px;
    overflow: hidden;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 24px;
      background-color: var(--x-bg-secondary, #F5F7FA);
      border-bottom: 1px solid var(--x-border, #E5E6EB);
    }

    &__title {
      display: flex;
      align-items: center;
      gap: 12px;

      h2 {
        font-size: 18px;
        font-weight: 600;
        margin: 0;
      }

      p {
        font-size: 12px;
        color: var(--x-text-secondary, #86909C);
        margin: 0;
      }
    }

    &__actions {
      display: flex;
      gap: 8px;
    }
  }

  // API 相关
  &__method-badge {
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;

    &.get { background-color: #52C41A; color: white; }
    &.post { background-color: #165DFF; color: white; }
    &.put { background-color: #FAAD14; color: white; }
    &.delete { background-color: #FF4D4F; color: white; }
    &.patch { background-color: #722ED1; color: white; }
  }

  &__endpoint {
    font-family: monospace;
    font-size: 16px;
    font-weight: 500;
  }

  &__tabs {
    display: flex;
    gap: 4px;
    padding: 0 24px;
    border-bottom: 1px solid var(--x-border, #E5E6EB);
    background-color: var(--x-bg-secondary, #F5F7FA);
  }

  &__tab {
    padding: 12px 16px;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 14px;
    color: var(--x-text-secondary, #86909C);
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    transition: all 0.2s;

    &:hover {
      color: var(--x-text-primary, #1F2329);
    }

    &.active {
      color: var(--x-primary, #165DFF);
      border-bottom-color: var(--x-primary, #165DFF);
    }
  }

  &__request-section {
    padding: 24px;
  }

  &__params {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__param-row {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  &__body {
    padding: 16px 0;
  }

  // 响应区域
  &__response {
    margin-top: 24px;
    padding: 16px;
    background-color: var(--x-bg-secondary, #F5F7FA);
    border-radius: 8px;

    &__header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }

    &__status {
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;

      &.success { background-color: rgba(82, 196, 26, 0.1); color: #52C41A; }
      &.error { background-color: rgba(255, 77, 79, 0.1); color: #FF4D4F; }
      &.warning { background-color: rgba(250, 173, 20, 0.1); color: #FAAD14; }
    }

    &__time {
      font-size: 12px;
      color: var(--x-text-secondary, #86909C);
    }

    &__body {
      background-color: var(--x-bg-primary, #fff);
      padding: 12px;
      border-radius: 4px;
      overflow-x: auto;
      font-family: monospace;
      font-size: 13px;
      margin: 0;
    }
  }

  // 成员表格
  &__member-table {
    padding: 24px;

    &__header {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 80px;
      gap: 16px;
      padding: 12px 0;
      border-bottom: 1px solid var(--x-border, #E5E6EB);
      font-size: 12px;
      font-weight: 600;
      color: var(--x-text-secondary, #86909C);
      text-transform: uppercase;
    }

    &__row {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 80px;
      gap: 16px;
      padding: 12px 0;
      border-bottom: 1px solid var(--x-border, #E5E6EB);
      align-items: center;
    }
  }

  // 设置表单
  &__settings-form {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &__setting-item {
    display: flex;
    flex-direction: column;
    gap: 8px;

    label {
      font-size: 14px;
      font-weight: 500;
      color: var(--x-text-primary, #1F2329);
    }
  }

  &__variable-row {
    display: flex;
    gap: 12px;
    margin-bottom: 8px;
  }

  // 文档视图
  &__doc-content {
    padding: 24px;
  }

  &__doc-preview {
    font-size: 14px;
    line-height: 1.8;

    h1, h2, h3 { margin-top: 24px; margin-bottom: 12px; }
    code { background-color: var(--x-bg-secondary, #F5F7FA); padding: 2px 6px; border-radius: 4px; }
    li { margin-left: 24px; }
  }

  &__doc-editor {
    display: flex;
    flex-direction: column;
    gap: 12px;

    &__toolbar {
      display: flex;
      gap: 4px;
    }
  }

  &__doc-toolbar-btn {
    width: 32px;
    height: 32px;
    border: 1px solid var(--x-border, #E5E6EB);
    background-color: var(--x-bg-primary, #fff);
    cursor: pointer;
    border-radius: 4px;
    font-weight: bold;
    transition: all 0.2s;

    &:hover {
      background-color: var(--x-bg-hover, #F0F2F5);
    }
  }

  &__doc-textarea {
    min-height: 200px;
    font-family: monospace;
  }

  &__doc-preview-panel {
    border: 1px solid var(--x-border, #E5E6EB);
    border-radius: 4px;
    padding: 16px;
    min-height: 200px;
    background-color: var(--x-bg-primary, #fff);
  }

  // 预览面板
  &__preview {
    width: 360px;
    flex-shrink: 0;
    border-left: 1px solid var(--x-border, #E5E6EB);
    background-color: var(--x-bg-secondary, #F5F7FA);
    display: flex;
    flex-direction: column;
    animation: slideInRight 0.3s ease;

    &__header {
      display: flex;
      justify-content: flex-end;
      padding: 8px;
    }

    &__close {
      width: 32px;
      height: 32px;
      border: none;
      background: none;
      cursor: pointer;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--x-text-secondary, #86909C);

      &:hover {
        background-color: var(--x-bg-hover, #F0F2F5);
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24px;
      text-align: center;

      h3 {
        margin: 16px 0 8px;
        font-size: 16px;
      }

      p {
        margin: 0 0 24px;
        font-size: 14px;
        color: var(--x-text-secondary, #86909C);
        text-transform: capitalize;
      }
    }

    &__icon {
      color: var(--x-primary, #165DFF);
    }
  }

  // 通用按钮
  &__btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border: 1px solid var(--x-border, #E5E6EB);
    background-color: var(--x-bg-primary, #fff);
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: var(--x-bg-hover, #F0F2F5);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &--primary {
      background-color: var(--x-primary, #165DFF);
      border-color: var(--x-primary, #165DFF);
      color: white;

      &:hover {
        filter: brightness(0.95);
      }
    }

    &--success {
      background-color: var(--x-success, #52C41A);
      border-color: var(--x-success, #52C41A);
      color: white;

      &:hover {
        filter: brightness(0.95);
      }
    }

    &--add {
      margin-top: 12px;
      border-style: dashed;
    }
  }

  &__btn-icon {
    width: 28px;
    height: 28px;
    border: none;
    background: none;
    cursor: pointer;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--x-text-secondary, #86909C);
    transition: all 0.2s;

    &:hover {
      background-color: var(--x-bg-hover, #F0F2F5);
      color: var(--x-text-primary, #1F2329);
    }

    &--danger:hover {
      background-color: rgba(255, 77, 79, 0.1);
      color: var(--x-danger, #FF4D4F);
    }
  }

  // 输入组件
  &__input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid var(--x-border, #E5E6EB);
    border-radius: 4px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;

    &:focus {
      border-color: var(--x-primary, #165DFF);
    }

    &:disabled {
      background-color: var(--x-bg-secondary, #F5F7FA);
      cursor: not-allowed;
    }
  }

  &__select {
    padding: 8px 12px;
    border: 1px solid var(--x-border, #E5E6EB);
    border-radius: 4px;
    font-size: 14px;
    outline: none;
    background-color: var(--x-bg-primary, #fff);
    cursor: pointer;

    &:disabled {
      background-color: var(--x-bg-secondary, #F5F7FA);
      cursor: not-allowed;
    }
  }

  &__textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid var(--x-border, #E5E6EB);
    border-radius: 4px;
    font-size: 14px;
    outline: none;
    resize: vertical;
    font-family: inherit;
    transition: border-color 0.2s;

    &:focus {
      border-color: var(--x-primary, #165DFF);
    }

    &:disabled {
      background-color: var(--x-bg-secondary, #F5F7FA);
      cursor: not-allowed;
    }
  }

  &__checkbox-wrapper {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: var(--x-text-secondary, #86909C);
    cursor: pointer;
  }

  &__default-view {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>

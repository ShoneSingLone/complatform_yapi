<template>
  <AuthScreen v-if="!isAuthenticated" />
  <div 
    v-else
    class="v1-desktop"
  >
    <!-- Top Bar -->
    <div class="v1-desktop__topbar">
      <div class="v1-desktop__topbar-left">
        <div class="v1-desktop__logo">
          <xIcon icon="xspace" size="24" />
          <span class="v1-desktop__logo-text">XSpace</span>
        </div>
      </div>
      <div class="v1-desktop__topbar-center">
        <div class="v1-desktop__breadcrumb">
          <xIcon icon="folder" size="16" />
          <span>Desktop Workspace</span>
        </div>
      </div>
      <div class="v1-desktop__topbar-right">
        <div class="v1-desktop__user-info">
          <xIcon icon="user" size="20" />
          <span>{{ APP?.user?.name || 'User' }}</span>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="v1-desktop__main">
      <!-- Left Sidebar -->
      <div class="v1-desktop__sidebar">
        <div class="v1-desktop__sidebar-section">
          <div class="v1-desktop__sidebar-title">
            <xIcon icon="folder" size="16" />
            <span>Quick Access</span>
          </div>
          <div class="v1-desktop__sidebar-items">
            <div 
              v-for="item in quickAccessItems" 
              :key="item.id"
              class="v1-desktop__sidebar-item"
              @click="handleQuickAccessClick(item)">
              <xIcon :icon="item.icon" size="18" :color="item.color" />
              <span>{{ item.name }}</span>
            </div>
          </div>
        </div>

        <div class="v1-desktop__sidebar-section">
          <div class="v1-desktop__sidebar-title">
            <xIcon icon="team" size="16" />
            <span>Workspaces</span>
          </div>
          <div class="v1-desktop__sidebar-items">
            <div 
              v-for="workspace in workspaces" 
              :key="workspace.id"
              class="v1-desktop__sidebar-item"
              @click="handleWorkspaceClick(workspace)">
              <xIcon :icon="workspace.icon" size="18" :color="workspace.color" />
              <span>{{ workspace.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Center Content -->
      <div class="v1-desktop__content">
        <!-- Toolbar -->
        <div class="v1-desktop__toolbar">
          <div class="v1-desktop__toolbar-left">
            <xBtn 
              :configs="{
                icon: 'arrow_back',
                tooltip: 'Back'
              }"
              size="small" />
            <xBtn 
              :configs="{
                icon: 'arrow_forward',
                tooltip: 'Forward'
              }"
              size="small" />
            <xBtn 
              :configs="{
                icon: 'refresh',
                tooltip: 'Refresh'
              }"
              size="small" />
          </div>
          <div class="v1-desktop__toolbar-center">
            <div class="v1-desktop__search">
              <xIcon icon="search" size="18" />
              <input 
                type="text" 
                placeholder="Search files and apps..."
                v-model="searchQuery" />
            </div>
          </div>
          <div class="v1-desktop__toolbar-right">
            <xBtn 
              :configs="{
                icon: 'grid_view',
                tooltip: 'Grid View'
              }"
              size="small"
              :active="viewMode === 'grid'"
              @click="viewMode = 'grid'" />
            <xBtn 
              :configs="{
                icon: 'list',
                tooltip: 'List View'
              }"
              size="small"
              :active="viewMode === 'list'"
              @click="viewMode = 'list'" />
          </div>
        </div>

        <!-- Content Grid -->
        <div class="v1-desktop__content-area">
          <div class="v1-desktop__content-grid" v-if="viewMode === 'grid'">
            <div 
              v-for="item in desktopItems" 
              :key="item.id"
              class="v1-desktop__grid-item"
              @dblclick="handleItemOpen(item)"
              @click="handleItemClick(item)">
              <div class="v1-desktop__grid-item-icon" :style="{ backgroundColor: item.color + '20' }">
                <xIcon :icon="item.icon" size="32" :color="item.color" />
              </div>
              <span class="v1-desktop__grid-item-label">{{ item.name }}</span>
            </div>
          </div>

          <div class="v1-desktop__content-list" v-else>
            <div 
              v-for="item in desktopItems" 
              :key="item.id"
              class="v1-desktop__list-item"
              @dblclick="handleItemOpen(item)"
              @click="handleItemClick(item)">
              <div class="v1-desktop__list-item-icon" :style="{ backgroundColor: item.color + '20' }">
                <xIcon :icon="item.icon" size="24" :color="item.color" />
              </div>
              <span class="v1-desktop__list-item-name">{{ item.name }}</span>
              <span class="v1-desktop__list-item-type">{{ item.type }}</span>
              <span class="v1-desktop__list-item-date">{{ item.updatedAt }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Panel (Properties) -->
      <div class="v1-desktop__properties" v-if="selectedItem">
        <div class="v1-desktop__properties-header">
          <span>Properties</span>
          <xBtn 
            :configs="{
              icon: 'close',
              tooltip: 'Close'
            }"
            size="small"
            @click="selectedItem = null" />
        </div>
        <div class="v1-desktop__properties-content">
          <div class="v1-desktop__property-item">
            <span class="v1-desktop__property-label">Name:</span>
            <span class="v1-desktop__property-value">{{ selectedItem.name }}</span>
          </div>
          <div class="v1-desktop__property-item">
            <span class="v1-desktop__property-label">Type:</span>
            <span class="v1-desktop__property-value">{{ selectedItem.type }}</span>
          </div>
          <div class="v1-desktop__property-item">
            <span class="v1-desktop__property-label">Updated:</span>
            <span class="v1-desktop__property-value">{{ selectedItem.updatedAt }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Dock -->
    <div class="v1-desktop__dock">
      <Dock />
    </div>
  </div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  const [Dock] = await _.$importVue('@/views/v1/components/Dock.vue');

  return {
    inject: ['APP'],
    components: {
      AuthScreen: () => _.$importVue('@/views/v1/components/AuthScreen.vue'),
      Dock
    },
    data() {
      return {
        searchQuery: '',
        viewMode: 'grid', // 'grid' or 'list'
        selectedItem: null,
        quickAccessItems: [
          { id: 'recent', name: 'Recent', icon: 'history', color: '#6750A4' },
          { id: 'documents', name: 'Documents', icon: 'article', color: '#7D5260' },
          { id: 'downloads', name: 'Downloads', icon: 'download', color: '#006A6A' },
          { id: 'trash', name: 'Trash', icon: 'delete', color: '#B3261E' }
        ],
        workspaces: [
          { id: 'api', name: 'API Manager', icon: 'database', color: '#6750A4' },
          { id: 'cicd', name: 'CI/CD', icon: 'ci', color: '#625B71' },
          { id: 'note', name: 'Documents', icon: 'article', color: '#7D5260' },
          { id: 'im', name: 'Chat', icon: 'contact', color: '#006A6A' },
          { id: 'rtc', name: 'Meeting', icon: 'webrtc', color: '#B3261E' }
        ],
        desktopItems: [
          { id: 'api', name: 'API Manager', type: 'Application', icon: 'database', color: '#6750A4', updatedAt: '2026-04-12' },
          { id: 'explore', name: 'Explore', type: 'Application', icon: 'search', color: '#984061', updatedAt: '2026-04-12' },
          { id: 'note', name: 'Documents', type: 'Application', icon: 'article', color: '#7D5260', updatedAt: '2026-04-11' },
          { id: 'file1', name: 'Project Specs', type: 'Document', icon: 'description', color: '#0061A4', updatedAt: '2026-04-10' },
          { id: 'file2', name: 'API Design', type: 'Document', icon: 'description', color: '#0061A4', updatedAt: '2026-04-09' }
        ]
      };
    },
    computed: {
      isAuthenticated() {
        return this.APP?.user?.isLogin;
      }
    },
    methods: {
      handleQuickAccessClick(item) {
        console.log('Quick access:', item);
      },
      handleWorkspaceClick(workspace) {
        console.log('Workspace:', workspace);
      },
      handleItemClick(item) {
        this.selectedItem = item;
      },
      handleItemOpen(item) {
        console.log('Open item:', item);
        // TODO: Open corresponding app or file
      }
    }
  };
}
</script>

<style lang="less">
.v1-desktop {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: var(--color-background);
  color: var(--color-on-background);
  display: flex;
  flex-direction: column;
  position: relative;

  &__topbar {
    height: 48px;
    background-color: var(--color-surface-container);
    border-bottom: 1px solid var(--color-outline-variant);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    flex-shrink: 0;

    &-left,
    &-center,
    &-right {
      display: flex;
      align-items: center;
      gap: 16px;
    }
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    font-size: 16px;
    color: var(--color-primary);

    &-text {
      color: var(--color-on-surface);
    }
  }

  &__breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 12px;
    background-color: var(--color-surface-container-high);
    border-radius: 8px;
    color: var(--color-on-surface-variant);
    font-size: 14px;
  }

  &__user-info {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 12px;
    background-color: var(--color-surface-container-high);
    border-radius: 9999px;
    color: var(--color-on-surface);
    font-size: 14px;
  }

  &__main {
    flex: 1;
    display: flex;
    overflow: hidden;
  }

  &__sidebar {
    width: 240px;
    background-color: var(--color-surface-container-low);
    border-right: 1px solid var(--color-outline-variant);
    overflow-y: auto;
    flex-shrink: 0;

    &-section {
      padding: 16px 0;
      border-bottom: 1px solid var(--color-outline-variant);

      &:last-child {
        border-bottom: none;
      }
    }

    &-title {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 0 16px 8px;
      font-size: 12px;
      font-weight: 600;
      color: var(--color-on-surface-variant);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    &-items {
      display: flex;
      flex-direction: column;
    }

    &-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 16px;
      cursor: pointer;
      transition: background-color 0.2s;
      color: var(--color-on-surface);
      font-size: 14px;

      &:hover {
        background-color: var(--color-surface-container-high);
      }

      &.active {
        background-color: var(--color-secondary-container);
        color: var(--color-on-secondary-container);
      }
    }
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: var(--color-surface);
  }

  &__toolbar {
    height: 40px;
    background-color: var(--color-surface-container);
    border-bottom: 1px solid var(--color-outline-variant);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    flex-shrink: 0;

    &-left,
    &-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    &-center {
      flex: 1;
      display: flex;
      justify-content: center;
    }
  }

  &__search {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 12px;
    background-color: var(--color-surface);
    border: 1px solid var(--color-outline-variant);
    border-radius: 8px;
    width: 400px;

    input {
      border: none;
      outline: none;
      background: transparent;
      flex: 1;
      font-size: 14px;
      color: var(--color-on-surface);

      &::placeholder {
        color: var(--color-on-surface-variant);
      }
    }
  }

  &__content-area {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
  }

  &__content-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 16px;
  }

  &__grid-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 16px;
    border-radius: 12px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: var(--color-surface-container-high);
    }

    &.selected {
      background-color: var(--color-secondary-container);
    }

    &-icon {
      width: 64px;
      height: 64px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &-label {
      font-size: 13px;
      text-align: center;
      color: var(--color-on-surface);
      word-break: break-word;
      line-height: 1.4;
    }
  }

  &__content-list {
    display: flex;
    flex-direction: column;
  }

  &__list-item {
    display: grid;
    grid-template-columns: 40px 1fr 150px 120px;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;
    color: var(--color-on-surface);
    font-size: 14px;

    &:hover {
      background-color: var(--color-surface-container-high);
    }

    &.selected {
      background-color: var(--color-secondary-container);
    }

    &-icon {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &-name {
      font-weight: 500;
    }

    &-type {
      color: var(--color-on-surface-variant);
      font-size: 13px;
    }

    &-date {
      color: var(--color-on-surface-variant);
      font-size: 13px;
      text-align: right;
    }
  }

  &__properties {
    width: 280px;
    background-color: var(--color-surface-container-low);
    border-left: 1px solid var(--color-outline-variant);
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
  }

  &__properties-header {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    border-bottom: 1px solid var(--color-outline-variant);
    font-weight: 600;
    font-size: 14px;
    color: var(--color-on-surface);
  }

  &__properties-content {
    padding: 16px;
  }

  &__property-item {
    margin-bottom: 16px;
  }

  &__property-label {
    display: block;
    font-size: 12px;
    color: var(--color-on-surface-variant);
    margin-bottom: 4px;
  }

  &__property-value {
    display: block;
    font-size: 14px;
    color: var(--color-on-surface);
    word-break: break-word;
  }

  &__dock {
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
  }
}
</style>

<template>
  <AuthScreen v-if="!isAuthenticated" />
  <div v-else class="v1-workspace">
    <!-- Top Bar -->
    <TopBar class="v1-workspace__topbar" />

    <!-- Desktop Area -->
    <div class="v1-workspace__desktop" @dragover="onDragOver" @drop="onDrop">
      <div class="v1-workspace__backdrop" aria-hidden="true">
        <div class="v1-workspace__glow v1-workspace__glow--left"></div>
        <div class="v1-workspace__glow v1-workspace__glow--right"></div>
        <div class="v1-workspace__glow v1-workspace__glow--bottom"></div>
      </div>

      <!-- Background Logo -->
      <div class="v1-workspace__bg-logo">
        <xIcon icon="Monitor" size="400" />
      </div>

      <!-- Desktop Icons Grid -->
      <div class="v1-workspace__icons">
        <DesktopIcon 
          v-for="shortcut in shortcuts" 
          :key="shortcut.id" 
          :app="shortcut" 
          @click="openApp(shortcut.appId, false, shortcut.data)"
          @unpin="removeShortcut(shortcut.id)"
        />
      </div>

      <!-- Bottom Dock -->
      <div class="v1-workspace__dock-wrapper">
        <Dock />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  return {
    inject: ['APP'],
    components: {
      AuthScreen: () => _.$importVue('@/views/v1/components/AuthScreen.vue'),
      TopBar: () => _.$importVue('@/views/v1/components/TopBar.vue'),
      DesktopIcon: () => _.$importVue('@/views/v1/components/DesktopIcon.vue'),
      Dock: () => _.$importVue('@/views/v1/components/Dock.vue')
    },
    provide() {
      return {
        system: {
          apps: this.apps,
          shortcuts: this.shortcuts,
          openWindows: this.openWindows,
          activeWindowId: this.activeWindowId,
          pinnedApps: this.pinnedApps,
          pinApp: this.pinApp,
          unpinApp: this.unpinApp,
          addShortcut: this.addShortcut,
          removeShortcut: this.removeShortcut,
          openApp: this.openApp,
          focusWindow: this.focusWindow,
          closeWindow: this.closeWindow,
          minimizeWindow: this.minimizeWindow,
          toggleMaximize: this.toggleMaximize
        }
      };
    },
    data() {
      return {
        apps: [
          { id: 'api', name: 'API Manager', icon: '_database', color: '#6750A4', component: 'ApiManager' },
          { id: 'cicd', name: 'CI/CD', icon: '_ci', color: '#625B71', component: 'CicdManager' },
          { id: 'note', name: 'Documents', icon: '_article', color: '#7D5260', component: 'NoteManager' },
          { id: 'im', name: 'Chat', icon: '_contact', color: '#006A6A', component: 'ImManager' },
          { id: 'rtc', name: 'Meeting', icon: '_webrtc', color: '#B3261E', component: 'RtcManager' },
          { id: 'office', name: 'Cloud Storage', icon: '_cloud_o', color: '#0061A4', component: 'OfficeManager' },
          { id: 'hoppscotch', name: 'API Test', icon: '_hoppscotch', color: '#4F6600', component: 'Hoppscotch' },
          { id: 'explore', name: 'Explore', icon: 'search', color: '#984061', component: 'Explore' },
          { id: 'user', name: 'User', icon: 'user', color: '#006874', component: 'UserManager' },
          { id: 'group', name: 'Group', icon: 'folder', color: '#6750A4', component: 'ApiManager', hidden: true },
          { id: 'project', name: 'Project', icon: 'folder', color: '#6750A4', component: 'ApiManager', hidden: true },
          { id: 'api_folder', name: 'API Folder', icon: 'folder', color: '#6750A4', component: 'ApiManager', hidden: true },
          { id: 'doc_folder', name: 'Doc Folder', icon: 'folder', color: '#6750A4', component: 'ApiManager', hidden: true },
          { id: 'folder', name: 'Folder', icon: 'folder', color: '#6750A4', component: 'ApiManager', hidden: true },
          { id: 'api_endpoint', name: 'API', icon: '_code_o', color: '#6750A4', component: 'ApiManager', hidden: true },
          { id: 'doc', name: 'Document', icon: '_article', color: '#6750A4', component: 'ApiManager', hidden: true },
          { id: 'code', name: 'Code', icon: '_code_o', color: '#6750A4', component: 'ApiManager', hidden: true },
          { id: 'member_list', name: 'Members', icon: 'team', color: '#6750A4', component: 'ApiManager', hidden: true },
          { id: 'setting', name: 'Settings', icon: '_setting_outlined', color: '#6750A4', component: 'ApiManager', hidden: true }
        ],
        shortcuts: [
          { id: 'api', appId: 'api', name: 'API Manager', icon: '_database', color: '#6750A4' },
          { id: 'explore', appId: 'explore', name: 'Explore', icon: 'search', color: '#984061' },
          { id: 'note', appId: 'note', name: 'Documents', icon: '_article', color: '#7D5260' }
        ],
        openWindows: [],
        activeWindowId: null,
        nextZIndex: 10,
        theme: 'light',
        lastOpenedAppId: null,
        pinnedApps: ['api', 'explore']
      };
    },
    computed: {
      isAuthenticated() {
        return this.APP?.user?.isLogin;
      }
    },
    methods: {
      onDragOver(e) {
        e.preventDefault();
        if (e.dataTransfer) {
          e.dataTransfer.dropEffect = 'move';
        }
      },
      onDrop(e) {
        e.preventDefault();
        const action = e.dataTransfer?.getData('action');
        const appId = e.dataTransfer?.getData('text/plain');
        
        if (action === 'unpin' && appId) {
          this.unpinApp(appId);
        }
      },
      pinApp(appId) {
        if (!this.pinnedApps.includes(appId)) {
          this.pinnedApps.push(appId);
        }
      },
      unpinApp(appId) {
        this.pinnedApps = this.pinnedApps.filter(id => id !== appId);
      },
      addShortcut(shortcut) {
        if (!this.shortcuts.find(s => s.id === shortcut.id)) {
          this.shortcuts.push(shortcut);
        }
      },
      removeShortcut(id) {
        const index = this.shortcuts.findIndex(s => s.id === id);
        if (index > -1) {
          this.shortcuts.splice(index, 1);
        }
      },
      openApp(appId, forceNew = false, data) {
        this.lastOpenedAppId = appId;
        setTimeout(() => {
          if (this.lastOpenedAppId === appId) this.lastOpenedAppId = null;
        }, 1000);

        const existing = this.openWindows.find(w => w.appId === appId && (!data || w.data?.id === data.id));
        
        if (!forceNew && existing) {
          const lastActive = [...this.openWindows]
            .reverse()
            .find(w => w.appId === appId && (!data || w.data?.id === data.id) && !w.isMinimized);
          
          if (lastActive) {
            this.focusWindow(lastActive.id);
            return;
          }
          
          existing.isMinimized = false;
          this.focusWindow(existing.id);
          return;
        }

        const app = this.apps.find(a => a.id === appId);
        if (!app) return;

        const id = Math.random().toString(36).substring(7);
        const offset = this.openWindows.filter(w => w.appId === appId).length * 40;
        
        const newWindow = {
          id,
          appId,
          title: data?.name || `${app.name} ${offset > 0 ? `(${Math.floor(offset/40) + 1})` : ''}`,
          zIndex: this.nextZIndex++,
          isMinimized: false,
          isMaximized: false,
          x: 100 + offset,
          y: 50 + offset,
          width: 800,
          height: 600,
          data
        };

        this.openWindows.push(newWindow);
        this.activeWindowId = id;

        _.$openModal({
          title: newWindow.title,
          url: '@/views/v1/components/WindowModal.vue',
          parent: this,
          window: newWindow
        }, {
          fullscreen: newWindow.isMaximized
        });
      },
      focusWindow(id) {
        const win = this.openWindows.find(w => w.id === id);
        if (win) {
          win.zIndex = this.nextZIndex++;
          this.activeWindowId = id;
        }
      },
      closeWindow(id) {
        const index = this.openWindows.findIndex(w => w.id === id);
        if (index > -1) {
          this.openWindows.splice(index, 1);
        }
        if (this.activeWindowId === id) {
          this.activeWindowId = this.openWindows.length > 0 ? this.openWindows[this.openWindows.length - 1].id : null;
        }
      },
      minimizeWindow(id) {
        const win = this.openWindows.find(w => w.id === id);
        if (win) win.isMinimized = true;
      },
      toggleMaximize(id) {
        const win = this.openWindows.find(w => w.id === id);
        if (win) win.isMaximized = !win.isMaximized;
      }
    }
  };
}
</script>

<style lang="less">
.v1-workspace {
  --v1-shell-bg: var(--body-bg-color, #f4f9fd);
  --v1-shell-bg-soft: var(--bg-color, #f5f8f7);
  --v1-shell-surface: var(--el-fill-color-blank, #ffffff);
  --v1-shell-surface-muted: var(--dialog-bg-color, #ffffff);
  --v1-shell-border: var(--el-border-color-lighter, #ebeef5);
  --v1-shell-border-strong: var(--el-border-color, #dcdfe6);
  --v1-shell-text: var(--el-text-color-primary, #303133);
  --v1-shell-text-secondary: var(--el-text-color-regular, #606266);
  --v1-shell-text-muted: var(--el-text-color-secondary, #909399);
  --v1-shell-primary: var(--el-color-primary, #3182ce);
  --v1-shell-primary-soft: var(--el-color-primary-light-9, #eff6ff);
  --v1-shell-shadow: var(--el-box-shadow);
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background:
    radial-gradient(circle at 10% 6%, rgba(49, 130, 206, 0.14) 0%, rgba(49, 130, 206, 0) 34%),
    radial-gradient(circle at 84% 0%, rgba(99, 179, 237, 0.12) 0%, rgba(99, 179, 237, 0) 28%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.58) 0%, rgba(255, 255, 255, 0.18) 100%),
    var(--v1-shell-bg);
  color: var(--v1-shell-text);
  user-select: none;
  display: flex;
  flex-direction: column;
  position: relative;

  &__topbar {
    z-index: 100;
  }

  &__desktop {
    flex: 1;
    position: relative;
    overflow: hidden;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.26) 0%, rgba(255, 255, 255, 0.52) 100%),
      linear-gradient(90deg, rgba(49, 130, 206, 0.03) 1px, transparent 1px),
      linear-gradient(rgba(49, 130, 206, 0.03) 1px, transparent 1px),
      radial-gradient(circle at 16% 12%, rgba(49, 130, 206, 0.12) 0%, rgba(49, 130, 206, 0) 32%),
      radial-gradient(circle at 82% 16%, rgba(99, 179, 237, 0.12) 0%, rgba(99, 179, 237, 0) 24%),
      var(--v1-shell-bg-soft);
    background-size:
      auto,
      64px 64px,
      64px 64px,
      auto,
      auto,
      auto;
    background-position:
      0 0,
      0 0,
      0 0,
      0 0,
      0 0,
      0 0;
  }

  &__backdrop {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
  }

  &__glow {
    position: absolute;
    border-radius: 999px;
    filter: blur(32px);
    opacity: 0.72;
    transform: translateZ(0);

    &--left {
      top: -120px;
      left: -80px;
      width: 420px;
      height: 420px;
      background: radial-gradient(circle, rgba(49, 130, 206, 0.22) 0%, rgba(49, 130, 206, 0.08) 38%, rgba(49, 130, 206, 0) 72%);
    }

    &--right {
      top: 48px;
      right: -140px;
      width: 420px;
      height: 420px;
      background: radial-gradient(circle, rgba(99, 179, 237, 0.22) 0%, rgba(99, 179, 237, 0.08) 38%, rgba(99, 179, 237, 0) 72%);
    }

    &--bottom {
      left: 50%;
      bottom: -240px;
      width: 760px;
      height: 420px;
      background: radial-gradient(circle, rgba(49, 130, 206, 0.18) 0%, rgba(49, 130, 206, 0.05) 32%, rgba(49, 130, 206, 0) 72%);
      transform: translateX(-50%);
      filter: blur(40px);
      opacity: 0.56;
    }
  }

  &__bg-logo {
    position: absolute;
    right: clamp(40px, 8vw, 140px);
    bottom: clamp(88px, 16vh, 180px);
    z-index: 1;
    opacity: 0.05;
    pointer-events: none;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    filter: none;

    .xIcon {
      color: var(--v1-shell-primary);
    }
  }

  &__icons {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: min(520px, 100%);
    z-index: 10;
    padding:
      28px
      24px
      calc(112px + env(safe-area-inset-bottom, 0px))
      calc(28px + env(safe-area-inset-left, 0px));
    display: grid;
    grid-template-columns: repeat(auto-fill, 92px);
    grid-auto-rows: 112px;
    gap: 18px 12px;
    align-content: start;
    pointer-events: auto;
  }

  &__dock-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 50;
    display: flex;
    justify-content: center;
    width: 100%;
    min-height: 64px;
    padding:
      0
      calc(12px + env(safe-area-inset-right, 0px))
      env(safe-area-inset-bottom, 0px)
      calc(12px + env(safe-area-inset-left, 0px));
    background:
      linear-gradient(180deg, rgba(244, 249, 253, 0) 0%, rgba(244, 249, 253, 0.82) 24%, rgba(244, 249, 253, 0.94) 100%);
    border-top: 1px solid var(--v1-shell-border);
    backdrop-filter: blur(18px);
    pointer-events: auto;
  }
}

/* 窗口过渡动画 */
.hero-enter-active,
.hero-leave-active {
  transition: all 0.3s ease;
}

.hero-enter-from,
.hero-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>

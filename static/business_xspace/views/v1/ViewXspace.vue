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
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background:
    radial-gradient(circle at 12% 10%, rgba(98, 122, 255, 0.18) 0%, rgba(98, 122, 255, 0) 34%),
    radial-gradient(circle at 88% 14%, rgba(72, 214, 199, 0.12) 0%, rgba(72, 214, 199, 0) 28%),
    linear-gradient(180deg, #0f1729 0%, #0b1220 45%, #09101b 100%);
  background-color: #09101b;
  color: var(--color-on-background);
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
      radial-gradient(circle at 20% 16%, rgba(112, 139, 255, 0.12) 0%, rgba(112, 139, 255, 0) 32%),
      radial-gradient(circle at 78% 18%, rgba(82, 214, 183, 0.08) 0%, rgba(82, 214, 183, 0) 26%),
      radial-gradient(circle at 50% 100%, rgba(120, 78, 255, 0.1) 0%, rgba(120, 78, 255, 0) 36%);
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
    filter: blur(24px);
    opacity: 0.8;
    transform: translateZ(0);

    &--left {
      top: -120px;
      left: -80px;
      width: 420px;
      height: 420px;
      background: radial-gradient(circle, rgba(106, 132, 255, 0.38) 0%, rgba(106, 132, 255, 0.14) 34%, rgba(106, 132, 255, 0) 70%);
    }

    &--right {
      top: 48px;
      right: -140px;
      width: 420px;
      height: 420px;
      background: radial-gradient(circle, rgba(83, 215, 190, 0.26) 0%, rgba(83, 215, 190, 0.1) 38%, rgba(83, 215, 190, 0) 72%);
    }

    &--bottom {
      left: 50%;
      bottom: -240px;
      width: 760px;
      height: 420px;
      background: radial-gradient(circle, rgba(140, 92, 255, 0.2) 0%, rgba(140, 92, 255, 0.08) 32%, rgba(140, 92, 255, 0) 72%);
      transform: translateX(-50%);
      filter: blur(40px);
      opacity: 0.7;
    }
  }

  &__bg-logo {
    position: absolute;
    right: clamp(40px, 8vw, 140px);
    bottom: clamp(88px, 16vh, 180px);
    z-index: 1;
    opacity: 0.022;
    pointer-events: none;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    filter: blur(1px);

    .xIcon {
      color: var(--color-on-background);
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
      32px
      24px
      calc(112px + env(safe-area-inset-bottom, 0px))
      calc(28px + env(safe-area-inset-left, 0px));
    display: grid;
    grid-template-columns: repeat(auto-fill, 96px);
    grid-auto-rows: 110px;
    gap: 18px 14px;
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
      linear-gradient(180deg, rgba(6, 10, 18, 0) 0%, rgba(10, 14, 24, 0.76) 18%, rgba(10, 14, 24, 0.92) 100%);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
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

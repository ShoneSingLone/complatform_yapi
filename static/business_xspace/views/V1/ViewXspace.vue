<template>
  <AuthScreen v-if="!isAuthenticated" />
  <div 
    v-else
    class="relative w-screen h-screen overflow-hidden bg-background text-on-background select-none flex flex-col"
  >
    <!-- Top Bar -->
    <TopBar class="z-[100]" />

    <!-- Desktop Area -->
    <div 
      class="flex-1 relative overflow-hidden"
      @dragover="onDragOver"
      @drop="onDrop"
    >
      <!-- Background Logo -->
      <div class="absolute inset-0 z-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
        <xIcon icon="Monitor" size="400" class="text-on-background" />
      </div>

      <!-- Desktop Icons Grid -->
      <div class="absolute inset-0 p-10 grid grid-cols-[repeat(auto-fill,100px)] grid-rows-[repeat(auto-fill,110px)] gap-4 z-10 content-start pointer-events-auto">
        <DesktopIcon 
          v-for="shortcut in shortcuts" 
          :key="shortcut.id" 
          :app="shortcut" 
          @click="openApp(shortcut.appId, false, shortcut.data)"
          @unpin="removeShortcut(shortcut.id)"
        />
      </div>



      <!-- Bottom Dock -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
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
        // v1 Desktop Workspace 特有的局部状态（与全局 APP 完全独立）
        system: {
          apps: this.apps,
          shortcuts: this.shortcuts,
          openWindows: this.openWindows,
          activeWindowId: this.activeWindowId,
          pinnedApps: this.pinnedApps,
          // 方法
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

        // Open window using _.openModal
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
/* 基础样式重置 */
*,
::before,
::after {
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-color: currentColor;
}

::before,
::after {
  --tw-content: '';
}

html {
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  -moz-tab-size: 4;
  tab-size: 4;
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-feature-settings: normal;
  font-variation-settings: normal;
}

body {
  margin: 0;
  line-height: inherit;
}

/* 根变量定义 */
:root {
  --color-primary: #0061a4;
  --color-on-primary: #ffffff;
  --color-primary-container: #d1e4ff;
  --color-on-primary-container: #001d36;
  --color-secondary: #535f70;
  --color-on-secondary: #ffffff;
  --color-secondary-container: #d7e3f7;
  --color-on-secondary-container: #101c2b;
  --color-tertiary: #6b5778;
  --color-on-tertiary: #ffffff;
  --color-tertiary-container: #f2daff;
  --color-on-tertiary-container: #251431;
  --color-error: #ba1a1a;
  --color-on-error: #ffffff;
  --color-error-container: #ffdad6;
  --color-on-error-container: #410002;
  --color-background: #fdfcff;
  --color-on-background: #1a1c1e;
  --color-surface: #fdfcff;
  --color-on-surface: #1a1c1e;
  --color-surface-variant: #dfe2eb;
  --color-on-surface-variant: #43474e;
  --color-outline: #73777f;
  --color-outline-variant: #c3c7cf;
  --color-shadow: #000000;
  --color-scrim: #000000;
  --color-inverse-surface: #2f3033;
  --color-inverse-on-surface: #f1f0f4;
  --color-inverse-primary: #9ecaef;
  --color-surface-dim: #ded8e1;
  --color-surface-bright: #fdfcff;
  --color-surface-container-lowest: #ffffff;
  --color-surface-container-low: #f7f2fa;
  --color-surface-container: #f3edf7;
  --color-surface-container-high: #ece6f0;
  --color-surface-container-highest: #e6e0e9;
  
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
}

/* 工具类样式 */
.w-screen {
  width: 100vw;
}

.h-screen {
  height: 100vh;
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}

.justify-center {
  justify-content: center;
}

.flex-1 {
  flex: 1;
}

.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.overflow-hidden {
  overflow: hidden;
}

.select-none {
  user-select: none;
}

.z-0 {
  z-index: 0;
}

.z-10 {
  z-index: 10;
}

.z-20 {
  z-index: 20;
}

.z-50 {
  z-index: 50;
}

.z-100 {
  z-index: 100;
}

.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.bottom-8 {
  bottom: 32px;
}

.left-12 {
  left: 50%;
}

.-translate-x-12 {
  transform: translateX(-50%);
}

.p-4 {
  padding: 16px;
}

.p-10 {
  padding: 40px;
}

.px-4 {
  padding-left: 16px;
  padding-right: 16px;
}

.py-1 {
  padding-top: 4px;
  padding-bottom: 4px;
}

.gap-2 {
  gap: 8px;
}

.gap-3 {
  gap: 12px;
}

.gap-4 {
  gap: 16px;
}

.opacity-003 {
  opacity: 0.03;
}

.opacity-0 {
  opacity: 0;
}

.group-hover\:opacity-100:hover {
  opacity: 1;
}

.pointer-events-none {
  pointer-events: none;
}

.pointer-events-auto {
  pointer-events: auto;
}

.bg-background {
  background-color: var(--color-background);
}

.bg-surface-container-highest {
  background-color: var(--color-surface-container-highest);
}

.bg-surface-container {
  background-color: var(--color-surface-container);
}

.bg-error {
  background-color: var(--color-error);
}

.text-on-background {
  color: var(--color-on-background);
}

.text-on-surface-variant {
  color: var(--color-on-surface-variant);
}

.text-on-error {
  color: var(--color-on-error);
}

.text-xs {
  font-size: 0.75rem;
}

.font-medium {
  font-weight: 500;
}

.font-bold {
  font-weight: 700;
}

.rounded-full {
  border-radius: 9999px;
}

.rounded-m3-medium {
  border-radius: 12px;
}

.rounded-m3-large {
  border-radius: 16px;
}

.backdrop-blur-md {
  backdrop-filter: blur(12px);
}

.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.group-hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
}

.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.transition-shadow {
  transition-property: box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.duration-200 {
  transition-duration: 200ms;
}

.grid {
  display: grid;
}

.grid-cols-\[repeat\(auto-fill\,100px\)\] {
  grid-template-columns: repeat(auto-fill, 100px);
}

.grid-rows-\[repeat\(auto-fill\,110px\)\] {
  grid-template-rows: repeat(auto-fill, 110px);
}

.content-start {
  align-content: start;
}

.h-8 {
  height: 32px;
}

.w-32 {
  width: 128px;
}

.w-16 {
  width: 64px;
}

.h-16 {
  height: 64px;
}

.hover\:bg-on-surface\/5:hover {
  background-color: rgba(26, 28, 30, 0.05);
}

.active\:bg-on-surface\/10:active {
  background-color: rgba(26, 28, 30, 0.1);
}

.outline-none {
  outline: none;
}

.placeholder\:text-on-surface-variant\/50::placeholder {
  color: rgba(67, 71, 78, 0.5);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 组件样式 */
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
}

.m3-button-primary:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
}

.m3-button-primary:active {
  background-color: rgba(0, 97, 164, 0.9);
}

.m3-card {
  background-color: var(--color-surface-container-low);
  border-radius: 1rem;
  border: 1px solid rgba(195, 199, 207, 0.3);
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
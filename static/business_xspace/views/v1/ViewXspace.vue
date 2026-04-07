<template>
  <AuthScreen v-if="!system.isAuthenticated" />
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
          v-for="shortcut in system.shortcuts" 
          :key="shortcut.id" 
          :app="shortcut" 
          @click="system.openApp(shortcut.appId, false, shortcut.data)"
          @unpin="system.removeShortcut(shortcut.id)"
        />
      </div>

      <!-- Windows Layer -->
      <div class="absolute inset-0 z-20 pointer-events-none">
        <TransitionGroup name="hero">
          <Window 
            v-for="win in system.openWindows" 
            :key="win.id" 
            :window="win"
          />
        </TransitionGroup>
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
    components: {
      AuthScreen: () => _.$importVue('@/views/v1/components/AuthScreen.vue'),
      TopBar: () => _.$importVue('@/views/v1/components/TopBar.vue'),
      DesktopIcon: () => _.$importVue('@/views/v1/components/DesktopIcon.vue'),
      Window: () => _.$importVue('@/views/v1/components/Window.vue'),
      Dock: () => _.$importVue('@/views/v1/components/Dock.vue')
    },
    provide() {
      return {
        system: this.system
      };
    },
    data() {
      return {
        system: {
          apps: [
            { id: 'api', name: 'API Manager', icon: 'Database', color: '#6750A4', component: 'ApiManager' },
            { id: 'cicd', name: 'CI/CD', icon: 'Repeat', color: '#625B71', component: 'CicdManager' },
            { id: 'note', name: 'Documents', icon: 'FileText', color: '#7D5260', component: 'NoteManager' },
            { id: 'im', name: 'Chat', icon: 'MessageSquare', color: '#006A6A', component: 'ImManager' },
            { id: 'rtc', name: 'Meeting', icon: 'Video', color: '#B3261E', component: 'RtcManager' },
            { id: 'office', name: 'Cloud Storage', icon: 'Cloud', color: '#0061A4', component: 'OfficeManager' },
            { id: 'hoppscotch', name: 'API Test', icon: 'Send', color: '#4F6600', component: 'Hoppscotch' },
            { id: 'explore', name: 'Explore', icon: 'Compass', color: '#984061', component: 'Explore' },
            { id: 'user', name: 'User', icon: 'User', color: '#006874', component: 'UserManager' },
            { id: 'group', name: 'Group', icon: 'Folder', color: '#6750A4', component: 'ApiManager', hidden: true },
            { id: 'project', name: 'Project', icon: 'Folder', color: '#6750A4', component: 'ApiManager', hidden: true },
            { id: 'api_folder', name: 'API Folder', icon: 'Folder', color: '#6750A4', component: 'ApiManager', hidden: true },
            { id: 'doc_folder', name: 'Doc Folder', icon: 'Folder', color: '#6750A4', component: 'ApiManager', hidden: true },
            { id: 'folder', name: 'Folder', icon: 'Folder', color: '#6750A4', component: 'ApiManager', hidden: true },
            { id: 'api_endpoint', name: 'API', icon: 'Code', color: '#6750A4', component: 'ApiManager', hidden: true },
            { id: 'doc', name: 'Document', icon: 'FileText', color: '#6750A4', component: 'ApiManager', hidden: true },
            { id: 'code', name: 'Code', icon: 'Code', color: '#6750A4', component: 'ApiManager', hidden: true },
            { id: 'member_list', name: 'Members', icon: 'Users', color: '#6750A4', component: 'ApiManager', hidden: true },
            { id: 'setting', name: 'Settings', icon: 'Settings', color: '#6750A4', component: 'ApiManager', hidden: true },
          ],
          shortcuts: [
            { id: 'api', appId: 'api', name: 'API Manager', icon: 'Database', color: '#6750A4' },
            { id: 'explore', appId: 'explore', name: 'Explore', icon: 'Compass', color: '#984061' },
            { id: 'note', appId: 'note', name: 'Documents', icon: 'FileText', color: '#7D5260' },
          ],
          openWindows: [],
          activeWindowId: null,
          nextZIndex: 10,
          theme: 'light',
          lastOpenedAppId: null,
          pinnedApps: ['api', 'explore'],
          isAuthenticated: false,
          currentUser: null,
          login(user) {
            this.isAuthenticated = true;
            this.currentUser = user;
          },
          logout() {
            this.isAuthenticated = false;
            this.currentUser = null;
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
            this.shortcuts = this.shortcuts.filter(s => s.id !== id);
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
              isMaximized: true,
              x: 100 + offset,
              y: 50 + offset,
              width: 800,
              height: 600,
              data,
            };

            this.openWindows.push(newWindow);
            this.activeWindowId = id;
          },
          focusWindow(id) {
            const win = this.openWindows.find(w => w.id === id);
            if (win) {
              win.zIndex = this.nextZIndex++;
              this.activeWindowId = id;
            }
          },
          closeWindow(id) {
            this.openWindows = this.openWindows.filter(w => w.id !== id);
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
          this.system.unpinApp(appId);
        }
      }
    }
  };
}
</script>

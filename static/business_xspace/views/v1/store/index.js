import { defineStore } from 'pinia';

export const useSystemStore = defineStore('system', {
  state: () => ({
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
      // Hidden apps for dynamic resource windows
      { id: 'group', name: 'Group', icon: 'Folder', color: '#6750A4', component: 'ApiManager', hidden: true },
      { id: 'project', name: 'Project', icon: 'Folder', color: '#6750A4', component: 'ApiManager', hidden: true },
      { id: 'api_folder', name: 'API Folder', icon: 'Folder', color: '#;6750A4', component: 'ApiManager', hidden: true },
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
  }),
  actions: {
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
      
      // If not forcing new and an existing window exists, just focus the last active one
      if (!forceNew && existing) {
        const lastActive = [...this.openWindows]
          .reverse()
          .find(w => w.appId === appId && (!data || w.data?.id === data.id) && !w.isMinimized);
        
        if (lastActive) {
          this.focusWindow(lastActive.id);
          return;
        }
        
        // If all are minimized, restore the first one
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
});

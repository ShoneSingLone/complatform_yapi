<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { 
  Folder, FolderOpen, File, Image as ImageIcon, FileText, Code, Film, 
  Search, X, PanelRight, ChevronRight, ChevronDown, ArrowUp, ArrowDown,
  ChevronLeft, Info
} from 'lucide-vue-next';

export default defineComponent({
  name: 'Explore',
  components: {
    Folder, FolderOpen, File, ImageIcon, FileText, Code, Film,
    Search, X, PanelRight, ChevronRight, ChevronDown, ArrowUp, ArrowDown,
    ChevronLeft, Info
  },
  setup() {
    type FileType = 'folder' | 'image' | 'document' | 'code' | 'video' | 'unknown';

    interface FileNode {
      id: string;
      name: string;
      type: FileType;
      size?: number;
      updatedAt: string;
      children?: FileNode[];
      content?: string;
      url?: string;
      path: string;
    }

    const mockFileSystem: FileNode = {
      id: 'root', name: 'Home', type: 'folder',
      updatedAt: '2026-03-31T10:00:00Z', path: '/Home',
      children: [
        { 
          id: 'docs', 
          name: 'Documents', 
          type: 'folder', 
          updatedAt: '2026-03-30T14:20:00Z', 
          path: '/Home/Documents',
          children: [
            { id: 'doc1', name: 'Resume.pdf', type: 'document', updatedAt: '2026-03-28T10:00:00Z', path: '/Home/Documents/Resume.pdf', size: 1024000 },
            { id: 'doc2', name: 'Notes.txt', type: 'document', updatedAt: '2026-03-29T11:00:00Z', path: '/Home/Documents/Notes.txt', size: 2048 },
            { 
              id: 'work', 
              name: 'Work', 
              type: 'folder', 
              updatedAt: '2026-03-25T09:00:00Z', 
              path: '/Home/Documents/Work',
              children: [
                { id: 'proj1', name: 'Project A', type: 'folder', updatedAt: '2026-03-24T08:00:00Z', path: '/Home/Documents/Work/Project A' },
                { id: 'proj2', name: 'Project B', type: 'folder', updatedAt: '2026-03-23T07:00:00Z', path: '/Home/Documents/Work/Project B' }
              ]
            }
          ]
        },
        { 
          id: 'pics', 
          name: 'Pictures', 
          type: 'folder', 
          updatedAt: '2026-03-25T11:10:00Z', 
          path: '/Home/Pictures',
          children: [
            { id: 'pic1', name: 'Vacation.jpg', type: 'image', updatedAt: '2026-03-20T10:00:00Z', path: '/Home/Pictures/Vacation.jpg', size: 5242880 },
            { id: 'pic2', name: 'Family.png', type: 'image', updatedAt: '2026-03-21T11:00:00Z', path: '/Home/Pictures/Family.png', size: 3145728 }
          ]
        },
        {
          id: 'code',
          name: 'Code',
          type: 'folder',
          updatedAt: '2026-03-26T15:30:00Z',
          path: '/Home/Code',
          children: [
            { id: 'src', name: 'src', type: 'folder', updatedAt: '2026-03-26T15:30:00Z', path: '/Home/Code/src' },
            { id: 'readme', name: 'README.md', type: 'code', updatedAt: '2026-03-26T15:30:00Z', path: '/Home/Code/README.md', size: 4096 }
          ]
        }
      ]
    };

    const formatBytes = (bytes?: number) => {
      if (!bytes) return '--';
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(1024));
      return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
    };

    const formatDate = (dateString: string) => new Date(dateString).toLocaleString();

    const tabs = ref<FileNode[]>([mockFileSystem]);
    const activeTabId = ref<string>(mockFileSystem.id);
    const selectedFile = ref<FileNode | null>(null);
    const searchQuery = ref('');
    const showPreview = ref(true);
    const expandedFolders = ref<Set<string>>(new Set([mockFileSystem.id]));

    const activeFolder = computed(() => tabs.value.find(t => t.id === activeTabId.value) || mockFileSystem);

    const filteredAndSortedFiles = computed(() => {
      let files = activeFolder.value.children || [];
      if (searchQuery.value) {
        files = files.filter(f => f.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
      }
      return files;
    });

    const handleOpenFolder = (folder: FileNode) => {
      if (folder.type !== 'folder') return;
      const existingTab = tabs.value.find(t => t.id === folder.id);
      if (existingTab) {
        activeTabId.value = folder.id;
      } else {
        tabs.value.push(folder);
        activeTabId.value = folder.id;
      }
    };

    const handleCloseTab = (tabId: string, e: Event) => {
      e.stopPropagation();
      tabs.value = tabs.value.filter(t => t.id !== tabId);
      if (tabs.value.length === 0) {
        tabs.value = [mockFileSystem];
        activeTabId.value = mockFileSystem.id;
      }
    };

    const toggleFolder = (folderId: string, e: Event) => {
      e.stopPropagation();
      const newExpanded = new Set(expandedFolders.value);
      if (newExpanded.has(folderId)) {
        newExpanded.delete(folderId);
      } else {
        newExpanded.add(folderId);
      }
      expandedFolders.value = newExpanded;
    };

    const isExpanded = (folderId: string) => expandedFolders.value.has(folderId);

    const getIcon = (type: string) => {
      switch (type) {
        case 'folder': return Folder;
        case 'image': return ImageIcon;
        case 'document': return FileText;
        case 'code': return Code;
        case 'video': return Film;
        default: return File;
      }
    };

    return {
      mockFileSystem, tabs, activeTabId, selectedFile, searchQuery, showPreview, expandedFolders,
      activeFolder, filteredAndSortedFiles, formatBytes, formatDate,
      handleOpenFolder, handleCloseTab, toggleFolder, isExpanded, getIcon
    };
  }
});
</script>

<template>
  <div class="explore">
    <!-- Top Bar -->
    <div class="explore__top-bar">
      <div class="explore__tabs">
        <div
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTabId = tab.id"
          class="explore__tab"
          :class="{ 'explore__tab--active': activeTabId === tab.id }"
        >
          <span>{{ tab.name }}</span>
          <button @click="(e) => handleCloseTab(tab.id, e)">
            <X :size="14" />
          </button>
        </div>
      </div>

      <div class="explore__toolbar">
        <div class="explore__search">
          <Search :size="16" />
          <input type="text" placeholder="Search files..." v-model="searchQuery" />
        </div>
        <button @click="showPreview = !showPreview" class="explore__preview-toggle">
          <PanelRight :size="20" />
        </button>
      </div>
    </div>

    <div class="explore__content">
      <!-- Sidebar -->
      <div class="explore__sidebar">
        <h2>Quick Access</h2>
        <div class="explore__tree">
          <!-- 递归树节点组件 -->
          <template v-for="node in [mockFileSystem]" :key="node.id">
            <div class="explore__tree-node">
              <!-- 当前节点 -->
              <div
                class="explore__tree-item"
                :class="{ 'explore__tree-item--active': activeFolder.id === node.id }"
                @click="handleOpenFolder(node)"
              >
                <span 
                  class="explore__tree-toggle"
                  :class="{ 'explore__tree-toggle--expanded': isExpanded(node.id) }"
                  @click.stop="(e) => toggleFolder(node.id, e)"
                  v-if="node.children && node.children.length"
                >
                  <ChevronDown v-if="isExpanded(node.id)" :size="14" />
                  <ChevronRight v-else :size="14" />
                </span>
                <Folder :size="16" />
                <span class="explore__tree-label">{{ node.name }}</span>
              </div>
              <!-- 递归渲染子节点 -->
              <div 
                v-if="node.children && node.children.length && isExpanded(node.id)"
                class="explore__tree-children"
              >
                <template v-for="child in node.children" :key="child.id">
                  <div class="explore__tree-node">
                    <div
                      class="explore__tree-item"
                      :class="{ 
                        'explore__tree-item--active': activeFolder.id === child.id,
                        'explore__tree-item--indent': true
                      }"
                      :style="{ paddingLeft: '24px' }"
                      @click="child.type === 'folder' ? handleOpenFolder(child) : null"
                    >
                      <span 
                        class="explore__tree-toggle"
                        :class="{ 'explore__tree-toggle--expanded': isExpanded(child.id) }"
                        @click.stop="(e) => toggleFolder(child.id, e)"
                        v-if="child.type === 'folder' && child.children && child.children.length"
                      >
                        <ChevronDown v-if="isExpanded(child.id)" :size="14" />
                        <ChevronRight v-else :size="14" />
                      </span>
                      <span v-else class="explore__tree-toggle-placeholder"></span>
                      <component :is="getIcon(child.type)" :size="16" />
                      <span class="explore__tree-label">{{ child.name }}</span>
                    </div>
                    <!-- 二级子节点 -->
                    <div 
                      v-if="child.children && child.children.length && isExpanded(child.id)"
                      class="explore__tree-children"
                    >
                      <template v-for="grandChild in child.children" :key="grandChild.id">
                        <div class="explore__tree-node">
                          <div
                            class="explore__tree-item"
                            :class="{ 
                              'explore__tree-item--active': activeFolder.id === grandChild.id,
                              'explore__tree-item--indent': true
                            }"
                            :style="{ paddingLeft: '40px' }"
                            @click="grandChild.type === 'folder' ? handleOpenFolder(grandChild) : null"
                          >
                            <span 
                              class="explore__tree-toggle"
                              :class="{ 'explore__tree-toggle--expanded': isExpanded(grandChild.id) }"
                              @click.stop="(e) => toggleFolder(grandChild.id, e)"
                              v-if="grandChild.type === 'folder' && grandChild.children && grandChild.children.length"
                            >
                              <ChevronDown v-if="isExpanded(grandChild.id)" :size="14" />
                              <ChevronRight v-else :size="14" />
                            </span>
                            <span v-else class="explore__tree-toggle-placeholder"></span>
                            <component :is="getIcon(grandChild.type)" :size="16" />
                            <span class="explore__tree-label">{{ grandChild.name }}</span>
                          </div>
                          <!-- 三级子节点 -->
                          <div 
                            v-if="grandChild.children && grandChild.children.length && isExpanded(grandChild.id)"
                            class="explore__tree-children"
                          >
                            <div
                              v-for="greatGrandChild in grandChild.children"
                              :key="greatGrandChild.id"
                              class="explore__tree-item"
                              :class="{ 
                                'explore__tree-item--active': activeFolder.id === greatGrandChild.id,
                                'explore__tree-item--indent': true
                              }"
                              :style="{ paddingLeft: '56px' }"
                              @click="greatGrandChild.type === 'folder' ? handleOpenFolder(greatGrandChild) : null"
                            >
                              <span class="explore__tree-toggle-placeholder"></span>
                              <component :is="getIcon(greatGrandChild.type)" :size="16" />
                              <span class="explore__tree-label">{{ greatGrandChild.name }}</span>
                            </div>
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- Main Area -->
      <div class="explore__main">
        <div class="explore__file-list" @click="selectedFile = null">
          <div v-if="filteredAndSortedFiles.length === 0" class="explore__empty">
            <Folder :size="48" />
            <p>This folder is empty</p>
          </div>
          <div v-else>
            <!-- Table Header -->
            <div class="explore__file-header">
              <span class="explore__file-header-cell explore__file-header-cell--name">Name</span>
              <span class="explore__file-header-cell">Date</span>
              <span class="explore__file-header-cell">Type</span>
              <span class="explore__file-header-cell">Size</span>
            </div>
            <!-- File Items -->
            <div
              v-for="file in filteredAndSortedFiles"
              :key="file.id"
              @click.stop="selectedFile = file"
              class="explore__file-item"
              :class="{ 'explore__file-item--selected': selectedFile?.id === file.id }"
            >
              <div class="explore__file-cell explore__file-cell--name">
                <component :is="getIcon(file.type)" :size="20" />
                <span>{{ file.name }}</span>
              </div>
              <span class="explore__file-cell">{{ formatDate(file.updatedAt) }}</span>
              <span class="explore__file-cell">{{ file.type }}</span>
              <span class="explore__file-cell">{{ file.type === 'folder' ? '--' : formatBytes(file.size) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Preview Pane -->
      <div v-if="showPreview" class="explore__preview">
        <div v-if="!selectedFile" class="explore__preview-empty">
          <Info :size="48" />
          <p>Select a file to preview</p>
        </div>
        <div v-else class="explore__preview-content">
          <component :is="getIcon(selectedFile.type)" :size="60" />
          <h3>{{ selectedFile.name }}</h3>
          <p>{{ selectedFile.type }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
@import '../../styles/bem-global.less';
</style>

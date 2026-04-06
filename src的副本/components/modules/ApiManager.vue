<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useSystemStore } from '@/store';
import { 
  Folder, FolderOpen, File, Users, Settings, FileText, Code, Activity,
  Search, X, PanelRight, ChevronRight, ChevronDown, ArrowUp, ArrowDown,
  ChevronLeft, Info, Plus, MoreVertical, Edit, Trash2, Save, Play, Globe, Loader2
} from 'lucide-vue-next';

export default defineComponent({
  name: 'ApiManager',
  components: {
    Folder, FolderOpen, File, Users, Settings, FileText, Code, Activity,
    Search, X, PanelRight, ChevronRight, ChevronDown, ArrowUp, ArrowDown,
    ChevronLeft, Info, Plus, MoreVertical, Edit, Trash2, Save, Play, Globe, Loader2
  },
  props: {
    windowData: {
      type: Object,
      default: null
    }
  },
  setup(props) {
    const system = useSystemStore();
    
    type ApiNodeType = 'group' | 'project' | 'api_folder' | 'api' | 'doc_folder' | 'doc' | 'member_list' | 'setting' | 'cicd' | 'folder' | 'code';
    
    interface ApiNode {
      id: string;
      name: string;
      type: ApiNodeType;
      size?: number;
      updatedAt: string;
      children?: ApiNode[];
      content?: any;
      path: string;
    }

    const mockApiData: ApiNode = {
      id: 'root', name: 'API Workspaces', type: 'folder',
      updatedAt: '2026-03-31T10:00:00Z', path: '/API Workspaces',
      children: [{
        id: 'group_backend', name: 'Backend Team', type: 'group',
        updatedAt: '2026-03-31T10:00:00Z', path: '/API Workspaces/Backend Team',
        children: [{
          id: 'proj_main', name: 'Main API', type: 'project',
          updatedAt: '2026-03-31T10:00:00Z', path: '/API Workspaces/Backend Team/Projects/Main API',
          children: [{
            id: 'api_get_users', name: 'GET /users', type: 'api',
            updatedAt: '2026-03-31T10:00:00Z', path: '/API Workspaces/Backend Team/Projects/Main API/GET users',
            content: { method: 'GET', endpoint: '/users', description: 'Get users list' }
          }]
        }]
      }]
    };

    const formatDate = (dateString: string) => new Date(dateString).toLocaleString();
    const isFolderType = (type: ApiNodeType) => ['group', 'project', 'api_folder', 'doc_folder', 'folder'].includes(type);
    
    const environments = ['Development', 'Test', 'Staging', 'Production'];
    const activeEnvironment = ref(environments[0]);
    const selectedFile = ref<ApiNode | null>(null);
    const searchQuery = ref('');
    const showPreview = ref(true);
    const expandedFolders = ref<Set<string>>(new Set([mockApiData.id]));
    const editingContent = ref<any>(null);
    const isRequesting = ref(false);
    const responseData = ref<string | null>(null);

    const activeNode = computed(() => props.windowData || mockApiData);
    
    const filteredAndSortedFiles = computed(() => {
      if (!isFolderType(activeNode.value.type)) return [];
      let files = activeNode.value.children || [];
      if (searchQuery.value) {
        files = files.filter(f => f.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
      }
      return files;
    });

    const handleOpenNode = (node: ApiNode) => {
      const appId = node.type === 'api' ? 'api_endpoint' : node.type;
      system.openApp(appId, true, node);
    };

    const toggleFolder = (folderId: string, e: Event) => {
      e.stopPropagation();
      if (expandedFolders.value.has(folderId)) {
        expandedFolders.value.delete(folderId);
      } else {
        expandedFolders.value.add(folderId);
      }
    };

    const getIcon = (type: ApiNodeType) => {
      switch (type) {
        case 'group': case 'project': case 'api_folder': case 'doc_folder': case 'folder': return Folder;
        case 'api': case 'code': return Code;
        case 'doc': return FileText;
        case 'member_list': return Users;
        case 'setting': return Settings;
        case 'cicd': return Activity;
        default: return File;
      }
    };

    const startEditing = () => {
      editingContent.value = JSON.parse(JSON.stringify(activeNode.value.content || {}));
    };

    const saveEditing = () => {
      activeNode.value.content = editingContent.value;
      editingContent.value = null;
    };

    const cancelEditing = () => {
      editingContent.value = null;
    };

    const sendRequest = () => {
      isRequesting.value = true;
      setTimeout(() => {
        isRequesting.value = false;
        responseData.value = JSON.stringify({ status: "success", data: [] }, null, 2);
      }, 800);
    };

    return {
      system, activeNode, mockApiData, environments, activeEnvironment,
      selectedFile, searchQuery, showPreview, expandedFolders, editingContent,
      isRequesting, responseData, filteredAndSortedFiles,
      formatDate, isFolderType, handleOpenNode, toggleFolder, getIcon,
      startEditing, saveEditing, cancelEditing, sendRequest
    };
  }
});
</script>

<template>
  <div class="api-manager">
    <!-- Top Bar -->
    <div class="api-manager__top-bar">
      <div class="api-manager__toolbar">
        <div class="api-manager__nav-buttons">
          <button class="api-manager__nav-button api-manager__nav-button--disabled">
            <ChevronLeft :size="20" />
          </button>
          <button class="api-manager__nav-button api-manager__nav-button--disabled">
            <ChevronRight :size="20" />
          </button>
        </div>

        <div class="api-manager__search">
          <Search :size="16" class="api-manager__search-icon" />
          <input
            type="text"
            placeholder="Search resources..."
            v-model="searchQuery"
            class="api-manager__search-input"
          />
        </div>

        <div class="api-manager__actions">
          <div class="api-manager__environment">
            <Globe :size="16" />
            <select v-model="activeEnvironment" class="api-manager__environment-select">
              <option v-for="env in environments" :key="env" :value="env">{{ env }}</option>
            </select>
          </div>
          <button @click="showPreview = !showPreview" class="api-manager__preview-toggle">
            <PanelRight :size="20" />
          </button>
        </div>
      </div>
    </div>

    <div class="api-manager__content">
      <!-- Sidebar -->
      <div class="api-manager__sidebar">
        <h2 class="api-manager__sidebar-title">API Explorer</h2>
        <div class="api-manager__tree">
          <div
            class="api-manager__tree-item"
            :class="{ 'api-manager__tree-item--active': activeNode.id === mockApiData.id }"
            @click="handleOpenNode(mockApiData)"
          >
            <span @click="(e) => toggleFolder(mockApiData.id, e)">
              <ChevronDown v-if="expandedFolders.has(mockApiData.id)" :size="14" />
              <ChevronRight v-else :size="14" />
            </span>
            <component :is="getIcon(mockApiData.type)" :size="16" />
            <span>{{ mockApiData.name }}</span>
          </div>
        </div>
      </div>

      <!-- Main Area -->
      <div class="api-manager__main">
        <!-- Folder View -->
        <template v-if="isFolderType(activeNode.type)">
          <div class="api-manager__file-list" @click="selectedFile = null">
            <div v-if="filteredAndSortedFiles.length === 0" class="api-manager__empty">
              <Folder :size="48" />
              <p>This folder is empty</p>
            </div>
            <div v-else>
              <div
                v-for="file in filteredAndSortedFiles"
                :key="file.id"
                @click.stop="selectedFile = file"
                @dblclick.stop="handleOpenNode(file)"
                class="api-manager__file-item"
                :class="{ 'api-manager__file-item--selected': selectedFile?.id === file.id }"
              >
                <component :is="getIcon(file.type)" :size="20" />
                <span>{{ file.name }}</span>
                <span>{{ formatDate(file.updatedAt) }}</span>
                <span>{{ file.type.replace('_', ' ') }}</span>
              </div>
            </div>
          </div>
        </template>

        <!-- File Editor View -->
        <template v-else>
          <div class="api-manager__editor">
            <div class="api-manager__editor-header">
              <div class="api-manager__editor-title">
                <component :is="getIcon(activeNode.type)" :size="24" />
                <div>
                  <h2>{{ activeNode.name }}</h2>
                  <p>{{ activeNode.type.replace('_', ' ') }}</p>
                </div>
              </div>
              <div class="api-manager__editor-actions">
                <template v-if="editingContent">
                  <button @click="cancelEditing" class="api-manager__button">Cancel</button>
                  <button @click="saveEditing" class="api-manager__button api-manager__button--primary">
                    <Save :size="16" /> Save
                  </button>
                </template>
                <template v-else>
                  <button @click="startEditing" class="api-manager__button">
                    <Edit :size="16" /> Edit
                  </button>
                </template>
              </div>
            </div>

            <div class="api-manager__editor-content">
              <template v-if="activeNode.type === 'api'">
                <div class="api-manager__api-editor">
                  <div class="api-manager__api-header">
                    <span v-if="!editingContent" class="api-manager__method">{{ activeNode.content?.method }}</span>
                    <span class="api-manager__endpoint">{{ activeNode.content?.endpoint }}</span>
                    <button 
                      v-if="!editingContent"
                      @click="sendRequest" 
                      :disabled="isRequesting" 
                      class="api-manager__button api-manager__button--primary"
                    >
                      <Loader2 v-if="isRequesting" :size="16" class="animate-spin" />
                      <Play v-else :size="16" />
                      Send
                    </button>
                  </div>
                  <p>{{ activeNode.content?.description }}</p>
                  <div v-if="responseData" class="api-manager__response">
                    <pre>{{ responseData }}</pre>
                  </div>
                </div>
              </template>
              <template v-else>
                <pre>{{ typeof activeNode.content === 'string' ? activeNode.content : JSON.stringify(activeNode.content, null, 2) }}</pre>
              </template>
            </div>
          </div>
        </template>
      </div>

      <!-- Preview Pane -->
      <div v-if="showPreview && isFolderType(activeNode.type)" class="api-manager__preview">
        <div v-if="!selectedFile" class="api-manager__preview-empty">
          <Info :size="48" />
          <p>Select a resource to preview</p>
        </div>
        <div v-else class="api-manager__preview-content">
          <component :is="getIcon(selectedFile.type)" :size="60" />
          <h3>{{ selectedFile.name }}</h3>
          <p>{{ selectedFile.type.replace('_', ' ') }}</p>
          <button 
            v-if="!isFolderType(selectedFile.type)"
            @click="handleOpenNode(selectedFile)"
            class="api-manager__button api-manager__button--primary"
          >
            Open Editor
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
@import '../../styles/bem-global.less';

.api-manager {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--bg-surface);
  color: var(--text-on-surface);
  overflow: hidden;
  margin: -24px;
  
  &__top-bar {
    border-bottom: 1px solid var(--color-outline-variant/50);
    background-color: var(--bg-surface-container-lowest);
  }
  
  &__toolbar {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    gap: 16px;
  }
  
  &__nav-buttons {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  
  &__nav-button {
    padding: 6px;
    border-radius: 6px;
    color: var(--text-on-surface-variant);
    
    &:hover:not(&--disabled) {
      background-color: var(--bg-surface-variant);
    }
    
    &--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  
  &__search {
    flex: 1;
    max-width: 500px;
    position: relative;
    
    &-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-on-surface-variant);
    }
    
    &-input {
      width: 100%;
      padding: 6px 12px 6px 40px;
      border: 1px solid var(--color-outline-variant/50);
      border-radius: 6px;
      background-color: var(--bg-surface-container-lowest);
      color: var(--text-on-surface);
      
      &:focus {
        outline: none;
        box-shadow: 0 0 0 2px var(--color-primary);
      }
    }
  }
  
  &__actions {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-left: auto;
  }
  
  &__environment {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    background-color: var(--bg-surface-container);
    border: 1px solid var(--color-outline-variant/50);
    border-radius: 6px;
    
    &-select {
      background: transparent;
      border: none;
      color: var(--text-on-surface);
      cursor: pointer;
    }
  }
  
  &__preview-toggle {
    padding: 6px;
    border-radius: 6px;
    border: 1px solid var(--color-outline-variant/50);
    background-color: var(--bg-surface-container-lowest);
    color: var(--text-on-surface-variant);
    
    &:hover {
      background-color: var(--bg-surface-container);
    }
  }
  
  &__content {
    display: flex;
    flex: 1;
    overflow: hidden;
  }
  
  &__sidebar {
    width: 256px;
    flex-shrink: 0;
    border-right: 1px solid var(--color-outline-variant/50);
    background-color: var(--bg-surface-container);
    overflow-y: auto;
    padding: 16px;
  }
  
  &__sidebar-title {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-on-surface-variant);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 12px;
  }
  
  &__tree {
    user-select: none;
  }
  
  &__tree-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 8px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    
    &:hover {
      background-color: var(--bg-surface-variant);
    }
    
    &--active {
      background-color: var(--bg-primary-container);
      color: var(--text-on-primary-container);
      font-weight: 500;
    }
  }
  
  &__main {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: var(--bg-surface-container-lowest);
    overflow: hidden;
  }
  
  &__file-list {
    flex: 1;
    overflow-y: auto;
  }
  
  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: var(--text-on-surface-variant);
    
    svg {
      color: var(--color-outline-variant);
      margin-bottom: 8px;
    }
  }
  
  &__file-item {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 16px;
    padding: 8px 16px;
    align-items: center;
    cursor: pointer;
    border-bottom: 1px solid transparent;
    
    &:hover {
      background-color: var(--bg-surface-variant/50);
    }
    
    &--selected {
      background-color: var(--bg-primary-container/50);
      border-color: var(--color-primary/10);
    }
  }
  
  &__editor {
    flex: 1;
    overflow-y: auto;
    padding: 24px;
    
    &-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 24px;
      border-bottom: 1px solid var(--color-outline-variant/50);
      background-color: var(--bg-surface-container/30);
    }
    
    &-title {
      display: flex;
      align-items: center;
      gap: 12px;
      
      h2 {
        font-size: 18px;
        font-weight: 700;
        color: var(--text-on-surface);
      }
      
      p {
        font-size: 12px;
        color: var(--text-on-surface-variant);
        text-transform: capitalize;
      }
    }
    
    &-actions {
      display: flex;
      gap: 8px;
    }
  }
  
  &__editor-content {
    max-width: 900px;
    margin: 0 auto;
    background-color: var(--bg-surface-container-lowest);
    border-radius: 12px;
    border: 1px solid var(--color-outline-variant/50);
    box-shadow: var(--elevation-sm);
    overflow: hidden;
    padding: 24px;
  }
  
  &__api-editor {
    .api-manager__api-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;
    }
    
    .api-manager__method {
      padding: 4px 12px;
      background-color: var(--bg-primary-container);
      color: var(--text-on-primary-container);
      border-radius: 6px;
      font-weight: 600;
      font-size: 14px;
    }
    
    .api-manager__endpoint {
      flex: 1;
      font-family: monospace;
      font-size: 16px;
      color: var(--text-on-surface);
    }
  }
  
  &__response {
    margin-top: 24px;
    padding: 16px;
    background-color: var(--bg-surface-container);
    border-radius: 8px;
    
    pre {
      font-family: monospace;
      font-size: 14px;
      color: var(--text-on-surface);
    }
  }
  
  &__preview {
    width: 320px;
    flex-shrink: 0;
    border-left: 1px solid var(--color-outline-variant/50);
    background-color: var(--bg-surface-container);
    overflow-y: auto;
    
    &-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 24px;
      text-align: center;
      color: var(--text-on-surface-variant);
      
      svg {
        color: var(--color-outline-variant);
        margin-bottom: 16px;
      }
    }
    
    &-content {
      padding: 24px;
      text-align: center;
      
      svg {
        margin-bottom: 24px;
      }
      
      h3 {
        font-size: 18px;
        font-weight: 600;
        color: var(--text-on-surface);
        margin-bottom: 8px;
      }
      
      p {
        font-size: 14px;
        color: var(--text-on-surface-variant);
        text-transform: capitalize;
        margin-bottom: 24px;
      }
    }
  }
  
  &__button {
    padding: 6px 16px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 200ms ease;
    
    &:not(&--primary) {
      border: 1px solid var(--color-outline-variant/50);
      background-color: transparent;
      color: var(--text-on-surface);
      
      &:hover {
        background-color: var(--bg-surface-variant);
      }
    }
    
    &--primary {
      background-color: var(--color-primary);
      color: var(--text-on-primary);
      border: none;
      
      &:hover {
        opacity: 0.9;
      }
    }
  }
}
</style>

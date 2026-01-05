<style lang="less">
#ProjectInterfaceSectionInterfaceDetailEditorDesc {
  width: 1px;
}
.log-sidebar {
  width: 300px;
  border-right: 1px solid #e9ecef;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.log-wrapper {
  flex: 1;
  height: 1px;
  overflow: auto;
}
.logcontent {
  line-height: 24px;
  margin-top: var(--ui-one);
  padding: 0px 16px;
  a {
    color: var(--el-color-primary-active);
  }
}

.delete-btn {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.x-card:hover .delete-btn {
  opacity: 1;
}
</style>
<template>
  <section class="x-page-view flex1 flash-when" id="ProjectInterfaceSectionInterfaceDetailEditorDesc">
    <div class="flex height100">
      <!-- 左侧记录栏 -->
      <div class="log-sidebar">
        <div class="p-4 border-bottom flex justify-between items-center">
          <xBtn  icon="plus" @click="showAddInput"/>
        </div>
        <div class="log-wrapper">
          <!-- 添加文件输入框 -->
          <div v-if="isShowAddInput" class="p-4 border-b">
            <div class="flex items-center gap-2">
              <xItem style="flex: 1" :configs="form.newFileConfigs" :value="newFileName" />
              <xBtn size="small" @click="addNewFile" :disabled="!newFileName.trim()">保存</xBtn>
              <xBtn size="small" @click="hideAddInput">取消</xBtn>
            </div>
          </div>
          
          <xTimeline>
            <xTimelineItem
              center
              :timestamp="getTime(logItem.add_time)"
              placement="top"
              v-for="(logItem, index) in logList"
              :key="index">
              <xCard size="small">
                <template #header>
                  <div class="logtype flex middle justify-between">
                    <div class="flex items-center">
                      <span class="logHead">{{ getTitle(logItem.type) }}</span>
                      <span class="logtime ml mr">
                        {{ getTimeAgo(logItem.add_time) }}
                      </span>
                      <xBtn size="small" @click="showDiff(logItem.data)" v-if="hasDiff(logItem.data)">
                        改动详情
                      </xBtn>
                    </div>
                    <xBtn size="small" icon="delete" class="delete-btn" @click="deleteLogItem(logItem)" title="删除">删除</xBtn>
                  </div>
                </template>
                <span class="logcontent" v-html="logItem.content" />
              </xCard>
            </xTimelineItem>
          </xTimeline>
          <!-- 空状态 -->
          <div v-if="logList.length === 0" class="p-4 text-center text-gray-500">
            请点击“+”添加描述
          </div>
        </div>
        <xPagination v-if="logList.length > 0" :configs="configsLog" />
      </div>
      
      <!-- 右侧编辑器区域 -->
      <div class="flex1">
        <xPageContent>
          <div class="flex mb10 middle" style="height: 48px">
            <xRender :render="vDomTitle" class="flex1" />
            <xGap l />
            <xBtn :configs="btnSave" />
            <xBtn :configs="btnCancel" />
          </div>
          <TuiEditor
            :value="x_item_value"
            :asRender="!isShowEditor"
            @change="onMarkdownChange" />
        </xPageContent>
      </div>
    </div>
  </section>
</template>
<script lang="ts">

export default async function () {
  const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
  return defineComponent({
    mixins: [mixins],
    inject: ["APP"],
    data() {
      const vm = this;
      // 将x_item_value解析为对象
      const parsedItemValue = typeof vm.x_item_value === 'string' ? JSON.parse(vm.x_item_value) : vm.x_item_value || {};
      return {
        markdown: parsedItemValue.markdown || "",
        title: parsedItemValue.title || "",
        editingTitle: "",
        isShowEditor: false,
        // 新增属性：控制添加输入框
        isShowAddInput: false,
        newFileName: "",
        form: defItems({
          titleConfigs: {
            placeholder: "文档名称",
            onEmitValue({ val }) {
              vm.editingTitle = val;
            }
          },
          newFileConfigs: {
            placeholder: "输入文件名",
            onEmitValue({ val }) {
              vm.newFileName = val;
            }
          }
        }),
        // 日志相关数据
        logList: [],
        configsLog: {
          onQuery() {
            vm.getLogList();
          },
          pagination: {
            page: 1,
            size: 10,
            total: 0
          }
        }
      };
    },
    mounted() {
      // 组件挂载时加载日志列表
      this.getLogList();
    },
    watch: {
      x_item_value() {
        const vm = this;
        // 将x_item_value解析为对象
        const parsedItemValue = typeof vm.x_item_value === 'string' ? JSON.parse(vm.x_item_value) : vm.x_item_value || {};
        vm.markdown = parsedItemValue.markdown || "";
        vm.title = parsedItemValue.title || "";
        // 当文档变化时重新加载日志
        vm.getLogList();
      }
    },
    computed: {
      btnSave() {
        const vm = this;
        return {
          label: vm.isShowEditor ? "保存" : "修改",
          preset: "blue",
          disabled() {
            if (!vm.x_item_value._id) {
              return "当前无可编辑文档";
            }
          },
          async onClick() {
            if (vm.isShowEditor) {
              await vm.save();
            } else {
              vm.editingTitle = vm.x_item_value?.title || "";
            }
            vm.isShowEditor = !vm.isShowEditor;
          }
        };
      },
      btnCancel() {
        const vm = this;
        return {
          label: "取消",
          isHide() {
            return !vm.isShowEditor;
          },
          async onClick() {
            vm.isShowEditor = false;
            // 这里可以根据需要添加取消逻辑
          }
        };
      }
    },
    methods: {
      onMarkdownChange({ md }) {
        this.markdown = md;
      },
      // 添加文件相关方法
      showAddInput() {
        this.isShowAddInput = true;
        this.newFileName = "";
      },
      hideAddInput() {
        this.isShowAddInput = false;
        this.newFileName = "";
      },
      async addNewFile() {
        const vm = this;
        if (!vm.newFileName.trim()) {
          _.$msgError("请输入文件名");
          return;
        }
        
        try {
          _.$loading(true);
          // 这里可以调用API创建新文件
          // 假设API接口是：_api.yapi.create_new_file
          await _api.yapi.create_new_file({
            interface_id: vm.x_item_value?._id,
            title: vm.newFileName.trim(),
            markdown: ""
          });
          
          _.$msg("添加成功");
          // 隐藏输入框
          vm.hideAddInput();
          // 重新加载日志列表
          vm.getLogList();
          // 切换到新创建的文件
          vm.loadFile(vm.newFileName.trim());
        } catch (error) {
          console.error("添加文件失败:", error);
          _.$msgError("添加失败");
        } finally {
          _.$loading(false);
        }
      },
      loadFile(title) {
        const vm = this;
        // 找到对应的日志项
        const logItem = vm.logList.find(item => item.content.includes(title));
        if (logItem && logItem.data) {
          // 更新当前编辑器内容
          vm.title = title;
          vm.markdown = logItem.data.markdown || "";
          vm.editingTitle = title;
          vm.isShowEditor = true;
        }
      },
      async save() {
        const vm = this;
        try {
          _.$loading(true);
          const params = _.merge(
            {},
            vm.x_item_value,
            {
              markdown: vm.markdown
            },
            { title: vm.editingTitle }
          );
          // 使用接口更新API保存文档内容
          const { data } = await _api.yapi.interface_up({
            id: vm.x_item_value._id,
            markdown: vm.markdown,
            title: vm.editingTitle
          });
          
          if (data) {
            // 保存成功后更新本地数据
            vm.x_item_value = data;
            _.$msg("保存成功");
            // 保存成功后重新加载日志
            await vm.getLogList();
          }
        } catch (error) {
          console.error("保存文档失败:", error);
          _.$msgError("保存失败");
        } finally {
          _.$loading(false);
        }
      },
      vDomTitle() {
        const vm = this;
        if (vm.isShowEditor) {
          const itemProps = {
            style: "flex1",
            configs: vm.form.titleConfigs,
            value: vm.editingTitle || ""
          };
          return h("xItem", itemProps);
        } else {
          return h(
            "span",
            {
              style: "font-weight:700;font-size:18px;"
            },
            [vm.x_item_value?.title || "文档"]
          );
        }
      },
      // 日志相关方法
      async getLogList() {
        const vm = this;
        try {
          _.$loading(true);
          const { page, size } = this.configsLog.pagination;
          const res = await _api.yapi.get_log_list({
            typeid: vm.x_item_value?._id,
            type: 'interface', // 假设当前是接口文档类型
            page,
            size
          });
          
          vm.logList = res.data.list || [];
          vm.configsLog.pagination.total = res.data.total || 0;
        } catch (error) {
          console.error("获取日志列表失败:", error);
          vm.logList = [];
        } finally {
          _.$loading(false);
        }
      },
      getTime(time) {
        return _.$dateFormat(time);
      },
      getTimeAgo(time) {
        return _.$timeAgo(time);
      },
      getTitle(type) {
        return `${Vue._yapi_var.LOG_TYPE[type]}动态`;
      },
      async deleteLogItem(logItem) {
        const vm = this;
        try {
          _.$loading(true);
          // 这里可以调用API删除日志条目
          // 假设API接口是：_api.yapi.delete_log_item
          await _api.yapi.delete_log_item({
            log_id: logItem._id
          });
          
          _.$msg("删除成功");
          // 删除后右侧编辑器变为可编辑状态
          vm.isShowEditor = true;
          // 如果当前正在查看被删除的文档，需要更新编辑器内容
          if (logItem.content && logItem.content.includes(vm.title)) {
            // 清空当前编辑器内容或加载默认内容
            vm.markdown = "";
            vm.editingTitle = "";
          }
          // 重新加载日志列表
          await vm.getLogList();
        } catch (error) {
          console.error("删除日志失败:", error);
          _.$msgError("删除失败");
        } finally {
          _.$loading(false);
        }
      },
      hasDiff(data) {
        return _.isPlainObject(data);
      },
      async showDiff(data) {
        const vm = this;
        const jsondiffpatch = await _.$appendScript(
          "/common/libs/jsondiffpatch.umd.js",
          "jsondiffpatch"
        );
        const formattersHtml = jsondiffpatch.formatters.html;
        const diffView = Vue._common_utils.diffMessage(jsondiffpatch, formattersHtml, data);
        const diffWindow = await _.$importVue(
          "@/views/Api/Group/Section/Log/GroupSectionLogWindowDiff.vue",
          {
            parent: this,
            diffView,
            onOk() {
              // 可以根据需要添加成功回调
            }
          }
        );
        _.$openWindow_deprecated("文档改动日志", diffWindow, {
          maxmin: true,
          fullscreen: false
        });
      }
    }
  });
} 
</script>
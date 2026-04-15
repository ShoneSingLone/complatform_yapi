<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  window.spa = window.spa || {};

  window.spa.browser = (function () {
    "use strict";

    var SORT_STORAGE_KEY = "VIEW_EXPLORE_SORT_CONFIG";
    var defaultSortConfig = [
      { field: "type", order: "asc" },
      { field: "name", order: "asc" },
    ];

    var stateMap = {
      $container: null,
      currentPath: [],
      filter: "all",
      searchQuery: "",
      renderToken: 0,
      sortConfig: defaultSortConfig.slice(),
    };

    var loadSortConfig = function () {
      try {
        var saved = _.$lStorage && _.$lStorage[SORT_STORAGE_KEY];
        if (!saved) return defaultSortConfig.slice();
        if (_.isArray(saved)) return saved;
        if (typeof saved === "string") {
          var parsed = JSON.parse(saved);
          if (_.isArray(parsed)) return parsed;
        }
        return defaultSortConfig.slice();
      } catch (error) {
        return defaultSortConfig.slice();
      }
    };

    var saveSortConfig = function () {
      try {
        if (_.$lStorage) _.$lStorage[SORT_STORAGE_KEY] = stateMap.sortConfig;
      } catch (error) {}
    };

    var normalizeSortConfig = function (sortConfig) {
      if (!_.isArray(sortConfig) || sortConfig.length === 0) return defaultSortConfig.slice();
      var filtered = sortConfig
        .filter(function (x) {
          return x && x.field;
        })
        .map(function (x) {
          return { field: x.field, order: x.order === "desc" ? "desc" : "asc" };
        });
      if (filtered.length === 0) return defaultSortConfig.slice();
      return filtered.slice(0, 2);
    };

    var toggleSortField = function (field) {
      var idx = stateMap.sortConfig.findIndex(function (x) {
        return x.field === field;
      });

      if (idx === -1) {
        stateMap.sortConfig.push({ field: field, order: "asc" });
      } else {
        stateMap.sortConfig[idx].order = stateMap.sortConfig[idx].order === "asc" ? "desc" : "asc";
        if (stateMap.sortConfig.length > 1 && idx !== 0) {
          var moved = stateMap.sortConfig.splice(idx, 1)[0];
          stateMap.sortConfig.unshift(moved);
        }
      }

      if (stateMap.sortConfig.length > 2) stateMap.sortConfig.pop();
      saveSortConfig();
    };

    var getIcon = function (type) {
      switch (type) {
        case "folder":
          return spa.util.getSvg("folder");
        case "image":
          return spa.util.getSvg("image");
        case "video":
          return spa.util.getSvg("video");
        case "audio":
          return spa.util.getSvg("music");
        default:
          return spa.util.getSvg("file-text");
      }
    };

    var getSortValue = function (file, field) {
      if (field === "type") return file.rawType || file.type || "";
      if (field === "mtime") return file.mtime || file.date || "";
      return file[field] || "";
    };

    var compareNaturalName = function (aName, bName) {
      var aParts = String(aName || "").split(/(\d+)/);
      var bParts = String(bName || "").split(/(\d+)/);
      for (var i = 0; i < Math.min(aParts.length, bParts.length); i++) {
        var aPart = aParts[i];
        var bPart = bParts[i];
        if (/^\d+$/.test(aPart) && /^\d+$/.test(bPart)) {
          var aInt = parseInt(aPart, 10);
          var bInt = parseInt(bPart, 10);
          if (aInt !== bInt) return aInt - bInt;
        } else {
          var cmp = aPart.localeCompare(bPart);
          if (cmp !== 0) return cmp;
        }
      }
      return aParts.length - bParts.length;
    };

    var compareBySortConfig = function (a, b) {
      for (var i = 0; i < stateMap.sortConfig.length; i++) {
        var field = stateMap.sortConfig[i].field;
        var order = stateMap.sortConfig[i].order;
        var compareResult = 0;

        if (field === "name") {
          compareResult = compareNaturalName(a.name, b.name);
          compareResult = order === "asc" ? compareResult : -compareResult;
        } else {
          var aValue = getSortValue(a, field);
          var bValue = getSortValue(b, field);
          if (aValue !== bValue) {
            compareResult = aValue > bValue ? 1 : -1;
            compareResult = order === "asc" ? compareResult : -compareResult;
          }
        }

        if (compareResult !== 0) return compareResult;
      }
      return 0;
    };

    var render = async function () {
      var token = ++stateMap.renderToken;
      var path = spa.model.getPath(stateMap.currentPath);
      var breadcrumbsHtml = "";

      path.forEach(function (folder, index) {
        if (index > 0) {
          breadcrumbsHtml += '<span class="breadcrumb-separator">/</span>';
        }
        breadcrumbsHtml += [
          '<button class="breadcrumb-item" data-path="',
          encodeURIComponent(JSON.stringify(folder.path || [])),
          '">',
          folder.name,
          "</button>",
        ].join("");
      });

      $("#spa-shell-breadcrumb-bar").html(breadcrumbsHtml);

      var files = await spa.model.getFiles(stateMap.currentPath, stateMap.searchQuery);
      if (token !== stateMap.renderToken) return;

      if (stateMap.filter !== "all") {
        files = files.filter(function (f) {
          return f.type === stateMap.filter;
        });
      }

      files = files.slice().sort(compareBySortConfig);

      var html = "";

      if (stateMap.searchQuery) {
        html += [
          '<div class="p-4 flex gap-2 overflow-x-auto no-scrollbar border-b border-black/5">',
          '<button class="filter-btn px-4 py-1.5 rounded-full text-sm font-medium ',
          stateMap.filter === "all" ? "bg-primary text-white" : "bg-black/5 text-black",
          '" data-filter="all">All</button>',
          '<button class="filter-btn px-4 py-1.5 rounded-full text-sm font-medium ',
          stateMap.filter === "image" ? "bg-primary text-white" : "bg-black/5 text-black",
          '" data-filter="image">Images</button>',
          '<button class="filter-btn px-4 py-1.5 rounded-full text-sm font-medium ',
          stateMap.filter === "video" ? "bg-primary text-white" : "bg-black/5 text-black",
          '" data-filter="video">Videos</button>',
          '<button class="filter-btn px-4 py-1.5 rounded-full text-sm font-medium ',
          stateMap.filter === "audio" ? "bg-primary text-white" : "bg-black/5 text-black",
          '" data-filter="audio">Audio</button>',
          "</div>",
        ].join("");
      }

      html += '<div class="file-list">';

      if (files.length === 0) {
        html += '<div class="p-12 text-center opacity-60">No files found</div>';
      } else {
        files.forEach(function (file) {
          html += [
          '<div class="file-item" data-id="',
            file.id,
            '">',
            '<div class="file-item__icon-wrap">',
            getIcon(file.type),
            "</div>",
            '<div class="file-item__info">',
            '<div class="file-item__name">',
            file.name,
            "</div>",
            '<div class="file-item__meta">',
            file.date,
            " • ",
            file.size,
            "</div>",
            "</div>",
            '<button class="file-item__action file-menu-btn" data-id="',
            file.id,
            '">',
            spa.util.getSvg("more-vertical"),
            "</button>",
            "</div>",
          ].join("");
        });
      }

      html += "</div>";
      stateMap.$container.html(html);

      if (window.lucide) window.lucide.createIcons();
    };

    var initModule = function ($container) {
      stateMap.$container = $container;
      stateMap.sortConfig = normalizeSortConfig(loadSortConfig());

      $container.on("click", ".file-item", function (e) {
        if ($(e.target).closest(".file-menu-btn").length) return;

        var id = String($(this).data("id"));
        var file = spa.model.getFileById(id);
        if (!file) return;
        var files = spa.model.getCurrentFiles();

        if (file.type === "folder") {
          $(document).trigger("spa-folder-open", file);
        } else {
          $(document).trigger("spa-file-open", {
            file: file,
            list: files.filter(function (f) {
              return f.type !== "folder" && f.type === file.type;
            }),
          });
        }
      });

      $container.on("click", ".filter-btn", function () {
        stateMap.filter = $(this).data("filter");
        render();
      });

      $container.on("click", ".file-menu-btn", function (e) {
        e.stopPropagation();
        var id = String($(this).data("id"));
        $(document).trigger("spa-file-menu", id);
      });

      $(document).on("spa-navigate", function (e, path) {
        stateMap.currentPath = _.isArray(path) ? path : [];
        stateMap.searchQuery = "";
        stateMap.filter = "all";
        render();
      });

      $(document).on("spa-search", function (e, query) {
        stateMap.searchQuery = query || "";
        stateMap.filter = "all";
        render();
      });

      $(document).on("spa-sort", function (e, sort) {
        if (sort) toggleSortField(sort);
        render();
      });

      $(document).on("spa-model-update", render);

      $(document).on("spa-add-folder", function (e, data) {
        spa.model.addFolder(data.name, data.parentId);
      });
    };

    return { initModule: initModule };
  })();

  return window.spa.browser;
}
</script>

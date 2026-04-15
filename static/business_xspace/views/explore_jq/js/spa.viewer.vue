<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  window.spa = window.spa || {};

  var viewer = window.spa.viewer || {};

  (function () {
    "use strict";

    var stateMap = {
      $container: null,
      currentFile: null,
      fileList: [],
      playbackRate: 1.0,
      isLooping: false,
      imageScale: 1.0,
      isSlideshow: false,
      slideshowTimer: null,
    };

    var configMap = {
      main_html: [
        '<div id="spa-viewer" class="viewer hidden">',
        '<header class="viewer__header">',
        '<div class="flex items-center gap-2">',
        '<button id="spa-viewer-close" class="spa-shell__btn spa-shell__btn--viewer">',
        spa.util.getSvg("x"),
        "</button>",
        '<div class="viewer__index text-xs opacity-50 font-mono ml-2"></div>',
        "</div>",
        '<div class="spa-shell__title truncate max-w-[40%]" id="spa-viewer-title"></div>',
        '<div class="spa-shell__actions">',
        '<button id="spa-viewer-list-toggle" class="spa-shell__btn spa-shell__btn--viewer" title="Show List">',
        spa.util.getSvg("list"),
        "</button>",
        '<button id="spa-viewer-slideshow" class="spa-shell__btn spa-shell__btn--viewer" title="Slideshow">',
        spa.util.getSvg("play"),
        "</button>",
        '<button id="spa-viewer-info" class="spa-shell__btn spa-shell__btn--viewer">',
        spa.util.getSvg("info"),
        "</button>",
        '<button id="spa-viewer-download" class="spa-shell__btn spa-shell__btn--viewer">',
        spa.util.getSvg("download"),
        "</button>",
        "</div>",
        "</header>",
        '<div id="spa-viewer-content" class="viewer__content">',
        '<button id="spa-viewer-prev" class="viewer__nav viewer__nav--prev">',
        spa.util.getSvg("chevron-left"),
        "</button>",
        '<button id="spa-viewer-next" class="viewer__nav viewer__nav--next">',
        spa.util.getSvg("chevron-right"),
        "</button>",
        "</div>",
        '<div id="spa-viewer-list" class="viewer__list hidden">',
        '<div class="viewer__list-inner no-scrollbar"></div>',
        "</div>",
        '<footer id="spa-viewer-footer" class="viewer__footer hidden"></footer>',
        "</div>",
      ].join(""),
    };

    var nextFile, prevFile, stopSlideshow;

    var updateNavigation = function () {
      var index = stateMap.fileList.indexOf(stateMap.currentFile);
      var $index = $(".viewer__index");
      $index.text(index + 1 + " / " + stateMap.fileList.length);

      spa.viewer.list.render(stateMap.fileList, stateMap.currentFile, {
        onSelect: function (file) {
          stateMap.currentFile = file;
          $("#spa-viewer-title").text(file.name);
          renderPreview(file);
        },
      });
    };

    var renderPreview = function (file) {
      var $content = $("#spa-viewer-content");
      var $footer = $("#spa-viewer-footer");
      var $viewer = $("#spa-viewer");

      $content.find("video, audio").each(function () {
        this.pause();
        this.src = "";
        this.load();
        $(this).remove();
      });

      $content
        .find(
          ".viewer__media, .viewer__media--image, .viewer__image-container, .viewer__audio-player, .viewer__zoom-controls, .fallback"
        )
        .remove();
      $footer.addClass("hidden");
      $viewer.removeClass("viewer--image viewer--video viewer--audio");
      $viewer.addClass("viewer--" + file.type);

      var handlers = {
        onNext: function () {
          stopSlideshow();
          nextFile();
        },
        onPrev: function () {
          stopSlideshow();
          prevFile();
        },
        onPlay: function () {
          if (stateMap.isSlideshow) stopSlideshow();
        },
      };

      switch (file.type) {
        case "image":
          spa.viewer.image.render(file, $content, handlers);
          break;
        case "video":
          $footer.removeClass("hidden");
          var $video = $(
            '<video class="viewer__media max-w-[90%] max-h-[80%] object-contain shadow-2xl" autoplay></video>'
          );
          $video.attr("src", file.url);
          var $videoPlayer = spa.viewer.player.create($video, "video", handlers);
          $content.append($video).append($videoPlayer);
          break;
        case "audio":
          $footer.removeClass("hidden");
          var $audioPlayer = $(
            [
              '<div class="viewer__audio-player">',
              '<div class="viewer__record-wrap">',
              '<div class="viewer__record">',
              '<div class="viewer__record-center">',
              spa.util.getSvg("music", "w-8 h-8"),
              "</div>",
              "</div>",
              "</div>",
              "</div>",
            ].join("")
          );

          var $audio = $("<audio autoplay></audio>");
          $audio.attr("src", file.url);
          var $audioControls = spa.viewer.player.create($audio, "audio", handlers);
          $audioPlayer.append($audioControls);
          $content.append($audioPlayer).append($audio);
          break;
        default:
          $content.append(
            [
              '<div class="flex flex-col items-center gap-4 text-white/60 fallback">',
              '<i data-lucide="file-text" class="w-24 h-24"></i>',
              "<p>Preview not available for this file type</p>",
              "</div>",
            ].join("")
          );
      }

      updateNavigation();
      if (window.lucide) {
        window.lucide.createIcons();
      }
    };

    var initModule = function ($container) {
      stateMap.$container = $container;
      $container.append(configMap.main_html);

      var $viewer = $("#spa-viewer");
      var $title = $("#spa-viewer-title");

      $("#spa-viewer-close").on("click", function () {
        $viewer.addClass("hidden");
        $("#spa-viewer-content").empty();
        $("#spa-viewer-list").addClass("hidden");
        stopSlideshow();
      });

      $("#spa-viewer-list-toggle").on("click", function () {
        $("#spa-viewer-list").toggleClass("hidden");
        $(this).toggleClass("spa-shell__btn--primary");
        if (!$("#spa-viewer-list").hasClass("hidden")) {
          updateNavigation();
        }
      });

      nextFile = function () {
        var index = stateMap.fileList.indexOf(stateMap.currentFile);
        if (index < stateMap.fileList.length - 1) {
          stateMap.currentFile = stateMap.fileList[index + 1];
          $title.text(stateMap.currentFile.name);
          renderPreview(stateMap.currentFile);
          return true;
        }
        return false;
      };

      prevFile = function () {
        var index = stateMap.fileList.indexOf(stateMap.currentFile);
        if (index > 0) {
          stateMap.currentFile = stateMap.fileList[index - 1];
          $title.text(stateMap.currentFile.name);
          renderPreview(stateMap.currentFile);
          return true;
        }
        return false;
      };

      var startSlideshow = function () {
        stateMap.isSlideshow = true;
        $("#spa-viewer-slideshow").addClass("spa-shell__btn--primary");
        stateMap.slideshowTimer = setInterval(function () {
          if (!nextFile()) stopSlideshow();
        }, 3000);
      };

      stopSlideshow = function () {
        stateMap.isSlideshow = false;
        $("#spa-viewer-slideshow").removeClass("spa-shell__btn--primary");
        if (stateMap.slideshowTimer) {
          clearInterval(stateMap.slideshowTimer);
          stateMap.slideshowTimer = null;
        }
      };

      $("#spa-viewer-prev").on("click", function () {
        stopSlideshow();
        prevFile();
      });

      $("#spa-viewer-next").on("click", function () {
        stopSlideshow();
        nextFile();
      });

      var updateImageTransform = function () {
        $(".viewer__media--image").css("transform", "scale(" + stateMap.imageScale + ")");
        $(".zoom-level").text(Math.round(stateMap.imageScale * 100) + "%");
      };

      $container.on("click", ".zoom-in", function () {
        stateMap.imageScale = Math.min(stateMap.imageScale + 0.2, 3.0);
        updateImageTransform();
      });

      $container.on("click", ".zoom-out", function () {
        stateMap.imageScale = Math.max(stateMap.imageScale - 0.2, 0.5);
        updateImageTransform();
      });

      $container.on("click", ".zoom-reset", function () {
        stateMap.imageScale = 1.0;
        updateImageTransform();
      });

      $("#spa-viewer-info").on("click", function () {
        var file = stateMap.currentFile;
        var infoHtml = [
          '<h3 class="modal__title">File Info</h3>',
          '<div class="flex flex-col gap-3 text-sm">',
          '<div class="flex justify-between border-b border-black/5 pb-2">',
          '<span class="opacity-60">Name</span>',
          '<span class="font-medium">',
          file.name,
          "</span>",
          "</div>",
          '<div class="flex justify-between border-b border-black/5 pb-2">',
          '<span class="opacity-60">Type</span>',
          '<span class="font-medium">',
          file.type,
          "</span>",
          "</div>",
          '<div class="flex justify-between border-b border-black/5 pb-2">',
          '<span class="opacity-60">Size</span>',
          '<span class="font-medium">',
          file.size,
          "</span>",
          "</div>",
          '<div class="flex justify-between">',
          '<span class="opacity-60">Date</span>',
          '<span class="font-medium">',
          file.date,
          "</span>",
          "</div>",
          "</div>",
        ].join("");
        $(document).trigger("spa-show-modal", infoHtml);
      });

      $("#spa-viewer-download").on("click", function () {
        if (stateMap.currentFile && (stateMap.currentFile.downloadUrl || stateMap.currentFile.url)) {
          var link = document.createElement("a");
          link.href = stateMap.currentFile.downloadUrl || stateMap.currentFile.url;
          link.download = stateMap.currentFile.name;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      });

      $("#spa-viewer-slideshow").on("click", function () {
        if (stateMap.isSlideshow) {
          stopSlideshow();
        } else {
          startSlideshow();
        }
      });

      $(document).on("spa-file-open", function (e, data) {
        stateMap.currentFile = data.file;
        stateMap.fileList = (data.list || []).filter(function (f) {
          return f.type === data.file.type;
        });
        $title.text(stateMap.currentFile.name);
        renderPreview(stateMap.currentFile);
        $viewer.removeClass("hidden");
      });

      $(document).on("spa-file-menu", function (e, id) {
        var file = spa.model.getFileById(id);
        if (!file) return;

        var menuHtml = [
          '<h3 class="modal__title truncate">',
          file.name,
          "</h3>",
          '<div class="flex flex-col gap-2 text-sm">',
          '<div class="flex justify-between border-b border-black/5 pb-2"><span class="opacity-60">类型</span><span class="font-medium">',
          file.rawType || file.type,
          "</span></div>",
          '<div class="flex justify-between border-b border-black/5 pb-2"><span class="opacity-60">大小</span><span class="font-medium">',
          file.size || "--",
          "</span></div>",
          '<div class="flex justify-between border-b border-black/5 pb-2"><span class="opacity-60">mtime</span><span class="font-medium">',
          file.mtime || "--",
          "</span></div>",
          '<div class="opacity-60 break-all">path（数组）：',
          JSON.stringify(file.path || []),
          "</div>",
          '<div class="opacity-60 break-all">path（连接）：',
          (file.path || []).join("/"),
          "</div>",
          "</div>",
        ].join("");

        $(document).trigger("spa-show-modal", menuHtml);
      });

      $(document).on("spa-show-modal", function (e, html) {
        spa.shell.showModal(html);
      });

      $(document).off("click", ".menu-action");
      $(document).off("click", "#rename-confirm");
    };

    viewer.initModule = initModule;
  })();

  window.spa.viewer = viewer;
  return viewer;
}
</script>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  window.spa = window.spa || {};
  window.spa.viewer = window.spa.viewer || {};

  window.spa.viewer.image = (function () {
    "use strict";

    var stateMap = {
      imageScale: 1.0,
    };

    var updateImageTransform = function () {
      $(".viewer__media--image").css(
        "transform",
        "scale(" + stateMap.imageScale + ")"
      );
      $(".zoom-level").text(Math.round(stateMap.imageScale * 100) + "%");
    };

    var render = function (file, $content, handlers) {
      var $imgContainer = $('<div class="viewer-image"></div>');
      var $img = $(
        '<img src="' +
          file.url +
          '" class="viewer-image__img" referrerPolicy="no-referrer">'
      );
      $imgContainer.append($img);
      $content.append($imgContainer);

      var $footer = $("#spa-viewer-footer");
      $footer.empty().removeClass("hidden");

      var $controls = $(
        [
          '<div class="viewer-image__bottom-controls">',
          '<div class="viewer-image__group">',
          '<button class="viewer-image__btn player-prev" title="上一个">',
          spa.util.getSvg("chevron-left"),
          "</button>",
          '<button class="viewer-image__btn player-next" title="下一个">',
          spa.util.getSvg("chevron-right"),
          "</button>",
          "</div>",
          '<div class="viewer-image__divider"></div>',
          '<div class="viewer-image__group">',
          '<button class="viewer-image__btn zoom-out" title="缩小">',
          spa.util.getSvg("minus"),
          "</button>",
          '<span class="viewer-image__level zoom-level">100%</span>',
          '<button class="viewer-image__btn zoom-in" title="放大">',
          spa.util.getSvg("plus"),
          "</button>",
          "</div>",
          '<div class="viewer-image__divider"></div>',
          '<div class="viewer-image__group">',
          '<button class="viewer-image__btn zoom-fit" title="合适">',
          spa.util.getSvg("minimize"),
          "</button>",
          '<button class="viewer-image__btn zoom-1-1" title="1:1">',
          "1:1",
          "</button>",
          "</div>",
          '<div class="viewer-image__divider"></div>',
          '<div class="viewer-image__group">',
          '<button class="viewer-image__btn slideshow-toggle" title="幻灯片">',
          spa.util.getSvg("play"),
          "</button>",
          '<input type="number" class="viewer-image__interval slideshow-interval" value="3" min="1" max="60" title="间隔(秒)">',
          '<span class="viewer-image__unit">s</span>',
          "</div>",
          "</div>",
        ].join("")
      );

      $footer.append($controls);

      stateMap.imageScale = 1.0;
      
      var updateImageTransform = function () {
        $img.css("transform", "scale(" + stateMap.imageScale + ")");
        $controls.find(".zoom-level").text(Math.round(stateMap.imageScale * 100) + "%");
      };

      $controls.find(".zoom-in").on("click", function () {
        stateMap.imageScale = Math.min(stateMap.imageScale + 0.2, 5.0);
        updateImageTransform();
      });
      $controls.find(".zoom-out").on("click", function () {
        stateMap.imageScale = Math.max(stateMap.imageScale - 0.2, 0.1);
        updateImageTransform();
      });
      $controls.find(".zoom-reset, .zoom-fit").on("click", function () {
        stateMap.imageScale = 1.0;
        $img.css({
          "max-width": "90%",
          "max-height": "90%",
          "width": "auto",
          "height": "auto",
          "object-fit": "contain"
        });
        updateImageTransform();
      });
      $controls.find(".zoom-1-1").on("click", function () {
        stateMap.imageScale = 1.0;
        $img.css({
          "max-width": "none",
          "max-height": "none",
          "width": "auto",
          "height": "auto"
        });
        updateImageTransform();
      });

      $controls.find(".player-prev").on("click", handlers.onPrev);
      $controls.find(".player-next").on("click", handlers.onNext);

      // Slideshow logic (bridging to spa.viewer)
      var $slideshowBtn = $controls.find(".slideshow-toggle");
      var updateSlideshowUI = function() {
        var isRunning = spa.viewer.isSlideshow();
        $slideshowBtn.html(spa.util.getSvg(isRunning ? "pause" : "play"));
        $slideshowBtn.toggleClass("viewer-image__btn--active", isRunning);
      };

      $slideshowBtn.on("click", function() {
        var interval = parseInt($controls.find(".slideshow-interval").val()) * 1000;
        if (spa.viewer.isSlideshow()) {
          spa.viewer.stopSlideshow();
        } else {
          spa.viewer.startSlideshow(interval);
        }
        updateSlideshowUI();
      });

      // Initial UI state
      updateSlideshowUI();

      // Swipe support
      var touchStartX = 0;
      var touchEndX = 0;
      $imgContainer.on("touchstart", function (e) {
        touchStartX = e.originalEvent.touches[0].screenX;
      });
      $imgContainer.on("touchend", function (e) {
        touchEndX = e.originalEvent.changedTouches[0].screenX;
        var diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) {
            handlers.onNext();
          } else {
            handlers.onPrev();
          }
        }
      });
    };

    return { render: render };
  })();

  return window.spa.viewer.image;
}
</script>

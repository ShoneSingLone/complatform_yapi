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

      var $zoomControls = $(
        [
          '<div class="viewer-image__controls">',
          '<button class="viewer-image__btn zoom-out">',
          spa.util.getSvg("minus"),
          "</button>",
          '<span class="viewer-image__level">100%</span>',
          '<button class="viewer-image__btn zoom-in">',
          spa.util.getSvg("plus"),
          "</button>",
          '<div class="viewer-image__divider"></div>',
          '<button class="viewer-image__btn zoom-reset">',
          spa.util.getSvg("maximize"),
          "</button>",
          "</div>",
        ].join("")
      );

      $content.append($zoomControls);
      stateMap.imageScale = 1.0;
      updateImageTransform();

      $zoomControls.find(".zoom-in").on("click", function () {
        stateMap.imageScale = Math.min(stateMap.imageScale + 0.2, 3.0);
        updateImageTransform();
      });
      $zoomControls.find(".zoom-out").on("click", function () {
        stateMap.imageScale = Math.max(stateMap.imageScale - 0.2, 0.5);
        updateImageTransform();
      });
      $zoomControls.find(".zoom-reset").on("click", function () {
        stateMap.imageScale = 1.0;
        updateImageTransform();
      });
    };

    return { render: render };
  })();

  return window.spa.viewer.image;
}
</script>

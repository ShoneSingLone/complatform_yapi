<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  window.spa = window.spa || {};
  window.spa.viewer = window.spa.viewer || {};

  window.spa.viewer.player = (function () {
    "use strict";

    var formatTime = function (seconds) {
      var min = Math.floor(seconds / 60);
      var sec = Math.floor(seconds % 60);
      return (
        (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec)
      );
    };

    var create = function ($media, type, handlers) {
      var $player = $(
        [
          '<div class="viewer-player">',
          '<div class="viewer-player__controls">',
          '<div class="viewer-player__progress">',
          '<span class="viewer-player__time player-time-current">00:00</span>',
          '<div class="viewer-player__progress-container">',
          '<div class="viewer-player__progress-bar">',
          '<div class="viewer-player__progress-fill"></div>',
          "</div>",
          "</div>",
          '<span class="viewer-player__time player-time-duration">00:00</span>',
          "</div>",
          '<div class="viewer-player__main-controls">',
          '<button class="viewer-player__btn player-prev">',
          spa.util.getSvg("skip-back"),
          "</button>",
          '<button class="viewer-player__btn viewer-player__btn--play player-play">',
          spa.util.getSvg("play"),
          "</button>",
          '<button class="viewer-player__btn player-next">',
          spa.util.getSvg("skip-forward"),
          "</button>",
          "</div>",
          '<div class="viewer-player__bottom-controls">',
          '<div class="viewer-player__setting">',
          '<span class="viewer-player__speed-label">Speed</span>',
          '<span class="viewer-player__speed-value">1x</span>',
          "</div>",
          '<div class="viewer-player__setting">',
          '<button class="viewer-player__btn player-fullscreen">',
          spa.util.getSvg("maximize"),
          "</button>",
          "</div>",
          "</div>",
          "</div>",
          "</div>",
        ].join("")
      );

      var media = $media[0];
      var $playBtn = $player.find(".player-play");
      var $progress = $player.find(".viewer-player__progress-container");
      var $progressFill = $player.find(".viewer-player__progress-fill");
      var $timeCurrent = $player.find(".player-time-current");
      var $timeDuration = $player.find(".player-time-duration");

      var hideTimer = null;
      var showControls = function () {
        $player.removeClass("viewer-player--hidden");
        if (hideTimer) {
          clearTimeout(hideTimer);
          hideTimer = null;
        }
        if (type === "video" && !media.paused) {
          hideTimer = setTimeout(function () {
            if (!media.paused) $player.addClass("viewer-player--hidden");
          }, 3000);
        }
      };

      media.addEventListener("ended", handlers.onNext);

      $playBtn.on("click", function () {
        if (media.paused) {
          media.play();
        } else {
          media.pause();
        }
      });

      $player.find(".player-prev").on("click", handlers.onPrev);
      $player.find(".player-next").on("click", handlers.onNext);

      $player.find(".player-speed").on("change", function () {
        media.playbackRate = parseFloat($(this).val());
      });

      $player.find(".player-fullscreen").on("click", function () {
        if (!document.fullscreenElement) {
          if (media.requestFullscreen) {
            media.requestFullscreen();
          } else if (media.webkitRequestFullscreen) { /* Safari */
            media.webkitRequestFullscreen();
          } else if (media.msRequestFullscreen) { /* IE11 */
            media.msRequestFullscreen();
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
          }
        }
      });

      $media.on("play", function () {
        $playBtn.html(spa.util.getSvg("pause"));
        if (type === "audio") $(".viewer__record").addClass("viewer__record--playing");
        handlers.onPlay();
        showControls();
      });

      $media.on("pause", function () {
        $playBtn.html(spa.util.getSvg("play"));
        if (type === "audio") $(".viewer__record").removeClass("viewer__record--playing");
        showControls();
      });

      $media.on("timeupdate", function () {
        var percent = (media.currentTime / media.duration) * 100;
        $progressFill.css("width", percent + "%");
        $timeCurrent.text(formatTime(media.currentTime));
        $timeDuration.text(formatTime(media.duration || 0));
      });

      $media.on("click touchstart mousemove", showControls);
      $player.on("click touchstart mousemove", showControls);

      $progress.on("click", function (e) {
        var rect = this.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var percent = x / rect.width;
        media.currentTime = percent * media.duration;
        showControls();
      });

      $player.find(".viewer-player__progress-container").on("click", function (e) {
        var rect = this.getBoundingClientRect();
        media.currentTime = ((e.pageX - rect.left) / rect.width) * media.duration;
        showControls();
      });

      if (type === "video") {
        $player.find(".player-fullscreen").on("click", function () {
          if (media.requestFullscreen) media.requestFullscreen();
        });
      }

      showControls();
      return $player;
    };

    return { create: create };
  })();

  return window.spa.viewer.player;
}
</script>

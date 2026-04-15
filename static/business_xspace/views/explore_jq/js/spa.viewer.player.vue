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
          type === "audio" ? "" : '<div class="viewer-player__media"><video src="' + $media.attr("src") + '" class="viewer-player__video" autoplay></video></div>',
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
          '<span class="viewer-player__volume-label">Vol</span>',
          '<input type="range" class="viewer-player__volume-slider" min="0" max="1" step="0.1" value="1">',
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

      $loopBtn.on("click", function () {
        media.loop = !media.loop;
        $(this).toggleClass("text-primary", media.loop);
      });

      $media.on("play", function () {
        $playBtn.html(spa.util.getSvg("pause"));
        if (type === "audio") $(".viewer__record").addClass("viewer__record--playing");
        handlers.onPlay();
      });

      $media.on("pause", function () {
        $playBtn.html(spa.util.getSvg("play"));
        if (type === "audio") $(".viewer__record").removeClass("viewer__record--playing");
      });

      $media.on("timeupdate", function () {
        var percent = (media.currentTime / media.duration) * 100;
        $progressFill.css("width", percent + "%");
        $timeCurrent.text(formatTime(media.currentTime));
        $timeDuration.text(formatTime(media.duration || 0));
      });

      $progress.on("click", function (e) {
        var rect = this.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var percent = x / rect.width;
        media.currentTime = percent * media.duration;
      });

      $player.find(".viewer-player__progress-container").on("click", function (e) {
        var rect = this.getBoundingClientRect();
        media.currentTime = ((e.pageX - rect.left) / rect.width) * media.duration;
      });

      if (type === "video") {
        $player.find(".player-fullscreen").on("click", function () {
          if (media.requestFullscreen) media.requestFullscreen();
        });
      }

      return $player;
    };

    return { create: create };
  })();

  return window.spa.viewer.player;
}
</script>

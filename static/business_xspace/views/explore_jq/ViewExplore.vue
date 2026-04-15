<style lang="less">
/* 
 * index.css 
 * Apple-style Glassmorphism Design using BEM
 * 纯原生标准CSS版本
 */
:root {
  --color-bg: #f5f5f7;
  --color-text: #1d1d1f;
  --color-text-secondary: #86868b;
  --color-primary: #0071e3;
  --color-white: #ffffff;
  --glass-bg: rgba(255, 255, 255, 0.7);
  --glass-border: rgba(255, 255, 255, 0.3);
  --glass-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
  --blur: 20px;
  --radius-lg: 20px;
  --radius-md: 12px;
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color: transparent;
}

html,
body,
#spa {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
    sans-serif;
  background-color: var(--color-bg);
  color: var(--color-text);
  line-height: 1.5;
}

/* BEM: spa-shell */
.spa-shell {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.spa-shell__header {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--blur));
  -webkit-backdrop-filter: blur(var(--blur));
  border-bottom: 1px solid var(--glass-border);
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 50;
}

.spa-shell__title {
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.spa-shell__actions {
  display: flex;
  gap: 8px;
}

.spa-shell__btn {
  background: transparent;
  border: none;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  color: var(--color-text);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
}

.spa-shell__btn:hover {
  background: rgba(0, 0, 0, 0.05);
}

.spa-shell__btn--primary {
  background: var(--color-primary);
  color: var(--color-white);
}

.spa-shell__btn--primary:hover {
  background: #0077ed;
}

.spa-shell__btn--viewer {
  color: #fff !important;
}

.spa-shell__btn--viewer:hover {
  background: rgba(255, 255, 255, 0.1) !important;
}

/* BEM: breadcrumb-bar */
.breadcrumb-bar {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--blur));
  -webkit-backdrop-filter: blur(var(--blur));
  border-bottom: 1px solid var(--glass-border);
  padding: 8px 20px;
  display: flex;
  align-items: center;
  gap: 4px;
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: none;
}

.breadcrumb-bar::-webkit-scrollbar {
  display: none;
}

.breadcrumb-item {
  background: transparent;
  border: none;
  font-size: 14px;
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: var(--transition);
}

.breadcrumb-item:hover {
  background: rgba(0, 0, 0, 0.05);
  color: var(--color-text);
}

.breadcrumb-separator {
  color: var(--color-text-secondary);
  opacity: 0.5;
  font-size: 12px;
}

/* BEM: file-browser */
.file-browser {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 80px;
}

.file-list {
  display: flex;
  flex-direction: column;
}

.file-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  transition: var(--transition);
  border-bottom: 1px solid rgba(0, 0, 0, 0.03);
  background: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.file-item:hover {
  background: rgba(0, 0, 0, 0.02);
}

.file-item__icon-wrap {
  width: 48px;
  height: 48px;
  background: var(--color-white);
  border-radius: var(--radius-md);
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.file-item__info {
  flex: 1;
  min-width: 0;
}

.file-item__name {
  font-weight: 500;
  font-size: 15px;
  line-height: 1.2;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-item__meta {
  font-size: 12px;
  line-height: 1.2;
  color: var(--color-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-item__action {
  padding: 8px;
  border-radius: 50%;
  color: var(--color-text-secondary);
  background: transparent;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
  margin-left: 8px;
}

.file-browser__filter {
  padding: 16px;
  display: flex;
  gap: 8px;
  overflow-x: auto;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  scrollbar-width: none;
}

.file-browser__filter::-webkit-scrollbar {
  display: none;
}

.filter-btn {
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  background: rgba(0, 0, 0, 0.05);
  color: var(--color-text);
  border: none;
  cursor: pointer;
  transition: var(--transition);
  white-space: nowrap;
}

.filter-btn:hover {
  background: rgba(0, 0, 0, 0.1);
}

.filter-btn.active {
  background: var(--color-primary);
  color: var(--color-white);
}

.file-browser__grid {
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

@media (min-width: 768px) {
  .file-browser__grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .file-browser__grid {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
}

.file-browser__empty {
  padding: 48px;
  text-align: center;
  opacity: 0.6;
}
.search-bar {
  padding: 12px 20px;
  background: var(--color-white);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.search-bar__input {
  width: 100%;
  padding: 10px 16px;
  border-radius: 10px;
  border: none;
  background: rgba(0, 0, 0, 0.05);
  outline: none;
  font-size: 16px;
}

/* BEM: modal */
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
}

.modal__content {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 340px;
  padding: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.modal__title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  text-align: center;
}

.modal__input {
  width: 100%;
  padding: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-bottom: 20px;
  outline: none;
}

.modal__actions {
  display: flex;
  gap: 12px;
}

.modal__btn {
  flex: 1;
  padding: 12px;
  border-radius: 12px;
  border: none;
  font-weight: 600;
  cursor: pointer;
}

.modal__btn--cancel {
  background: rgba(0, 0, 0, 0.05);
}

.modal__desc {
  font-size: 12px;
  opacity: 0.6;
  text-align: center;
  margin-bottom: 12px;
}

.modal__list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.modal__action {
  width: 100%;
  text-align: left;
  padding: 12px;
  background: transparent;
  border: none;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  cursor: pointer;
  transition: var(--transition);
}

.modal__action:hover {
  background: rgba(0, 0, 0, 0.05);
}

.modal__action-label {
  display: flex;
  align-items: center;
  gap: 12px;
}

.modal__action-indicator {
  font-size: 12px;
  opacity: 0.6;
  font-family: monospace;
}

.modal__info-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 14px;
}

.modal__info-item {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding-bottom: 8px;
}

.modal__info-item--block {
  flex-direction: column;
  gap: 4px;
}

.modal__info-label {
  opacity: 0.6;
}

.modal__info-value {
  font-weight: 500;
}

.modal__info-value--break {
  word-break: break-all;
  font-size: 13px;
  opacity: 0.8;
}

.modal__close-btn {
  width: 100%;
  margin-top: 24px;
  padding: 12px;
  background: rgba(0, 0, 0, 0.05);
  border: none;
  border-radius: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
}

.modal__close-btn:hover {
  background: rgba(0, 0, 0, 0.1);
}

.modal__title--truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* BEM: viewer */
.viewer {
  position: fixed;
  inset: 0;
  background: #000;
  z-index: 200;
  display: flex;
  flex-direction: column;
  color: #fff;
}

.viewer__header {
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), transparent);
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 50;
}

.viewer__content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.viewer__header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.viewer__header-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.viewer__title-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.viewer__index {
  font-size: 12px;
  opacity: 0.5;
  font-family: monospace;
}

.viewer__fallback {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  color: rgba(255, 255, 255, 0.6);
}

.viewer__fallback-icon {
  width: 64px;
  height: 64px;
}

.viewer__fallback-text {
  font-size: 14px;
}

.viewer__btn {
  background: transparent;
  border: none;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
}

.viewer__btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.viewer__btn--primary {
  padding: 8px 24px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  color: #fff;
}

.viewer__btn--primary:hover {
  background: rgba(255, 255, 255, 0.2);
}
.viewer-image {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
}

.viewer-image:active {
  cursor: grabbing;
}

.viewer-image__img {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.viewer-image__controls {
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  padding: 8px 16px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 40;
}

.viewer-image__btn {
  background: transparent;
  border: none;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
}

.viewer-image__btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.viewer-image__level {
  font-size: 14px;
  font-weight: 500;
  min-width: 40px;
  text-align: center;
}

.viewer-image__divider {
  width: 1px;
  height: 16px;
  background: rgba(255, 255, 255, 0.2);
}

/* Audio Specific */
.viewer__audio-player {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: 100%;
  max-width: 400px;
}

.viewer__record-wrap {
  position: relative;
  width: 280px;
  height: 280px;
}

.viewer__record {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #111;
  background-image: radial-gradient(
    circle at center,
    #333 0%,
    #111 5%,
    #333 10%,
    #111 15%,
    #333 20%,
    #111 25%,
    #333 30%,
    #111 35%,
    #333 40%,
    #111 45%,
    #333 50%,
    #111 55%,
    #333 60%,
    #111 65%,
    #333 70%,
    #111 75%,
    #333 80%,
    #111 85%,
    #333 90%,
    #111 95%,
    #333 100%
  );
  border: 8px solid #222;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: spin 10s linear infinite;
  animation-play-state: paused;
}

.viewer__record--playing {
  animation-play-state: running;
}

.viewer__record-center {
  width: 80px;
  height: 80px;
  background: var(--color-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border: 4px solid #111;
}

.viewer__audio-controls {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  padding: 24px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.viewer__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  padding: 28px;
  border-radius: 50%;
  cursor: pointer;
  backdrop-filter: blur(20px);
  transition: var(--transition);
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.viewer__nav:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-50%) scale(1.1);
  border-color: rgba(255, 255, 255, 0.5);
}

.viewer__nav:disabled {
  opacity: 0.2;
  cursor: not-allowed;
  background: rgba(255, 255, 255, 0.02);
}

.viewer__nav i {
  width: 28px;
  height: 28px;
}

/* Navigation visibility */
.viewer__nav {
  display: none !important;
}

.viewer__index {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
}

.viewer__list {
  position: absolute;
  bottom: 80px;
  left: 0;
  width: 100%;
  padding: 0 20px;
  z-index: 100;
  animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.viewer__list-inner {
  display: flex;
  gap: 12px;
  padding: 12px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow-x: auto;
  scrollbar-width: none;
}

.viewer__list-item {
  flex: 0 0 60px;
  height: 60px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: var(--transition);
  opacity: 0.6;
}

.viewer__list-item:hover {
  opacity: 1;
}

.viewer__list-item.active {
  border-color: var(--color-primary);
  opacity: 1;
  transform: scale(1.1);
  box-shadow: 0 0 20px rgba(0, 113, 227, 0.4);
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.viewer__nav--prev {
  left: 30px;
}
.viewer__nav--next {
  right: 30px;
}

.viewer__footer {
  padding: 20px 40px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 50;
}

.viewer__footer-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
}

.viewer__speed-control {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.05);
  padding: 4px 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.viewer-player {
  width: 90%;
  max-width: 500px;
  background: rgba(20, 20, 20, 0.7);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border-radius: 32px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
  user-select: none;
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  z-index: 60;
}

.viewer-player__media {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  border-radius: 16px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.5);
  margin-bottom: 12px;
}

.viewer-player__video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.viewer-player__audio-bg {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 2s infinite ease-in-out;
}

@keyframes pulse {
  0% { transform: scale(0.9); opacity: 0.7; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(0.9); opacity: 0.7; }
}

.viewer-player__controls {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
}

.viewer-player__progress {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.viewer-player__progress-bar {
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  position: relative;
  cursor: pointer;
}

.viewer-player__progress-fill {
  height: 100%;
  background: var(--color-primary, #0077ed);
  border-radius: 2px;
  width: 0%;
}

.viewer-player__time {
  font-size: 11px;
  font-family: monospace;
  opacity: 0.6;
  text-align: right;
}

.viewer-player__btn {
  background: transparent;
  border: none;
  color: white;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.viewer-player__btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.viewer-player__volume-slider {
  width: 60px;
  cursor: pointer;
}

.viewer-player__speed-label {
  font-size: 10px;
  text-transform: uppercase;
  opacity: 0.5;
  margin-right: 4px;
}

.viewer-player__speed-value {
  font-size: 14px;
  font-weight: 500;
}

.viewer-list__item {
  flex: 0 0 64px;
  height: 64px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  background: transparent;
  transition: all 0.3s;
  opacity: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.viewer-list__item:hover {
  opacity: 1;
}

.viewer-list__item--active {
  border-color: #fff;
  opacity: 1;
  transform: scale(1.1);
}

.viewer-list__item-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.viewer-list__item-icon {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.hidden {
  display: none !important;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
</style>
<template>
	    <div id="spa"></div>
</template>
<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	await _.$importVue("@/views/explore_jq/js/spa.util.vue");
	await _.$importVue("@/views/explore_jq/js/spa.model.vue");
	await _.$importVue("@/views/explore_jq/js/spa.viewer.list.vue");
	await _.$importVue("@/views/explore_jq/js/spa.viewer.image.vue");
	await _.$importVue("@/views/explore_jq/js/spa.viewer.player.vue");
	await _.$importVue("@/views/explore_jq/js/spa.viewer.vue");
	await _.$importVue("@/views/explore_jq/js/spa.browser.vue");
	await _.$importVue("@/views/explore_jq/js/spa.shell.vue");
	await _.$importVue("@/views/explore_jq/js/spa.vue");

	return {
		mounted(){
			var $ = window.$ || window.jQuery;
			window.spa.initModule($(this.$el));
		}
	};
}
</script>

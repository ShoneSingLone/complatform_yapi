<template>
<AuthScreen v-if="!system.isAuthenticated" />
  <div 
    v-else
    class="relative w-screen h-screen overflow-hidden bg-background text-on-background select-none flex flex-col"
  >
    <!-- Top Bar -->
    <TopBar class="z-[100]" />

    <!-- Desktop Area -->
    <div 
      class="flex-1 relative overflow-hidden"
      @dragover="onDragOver"
      @drop="onDrop"
    >
      <!-- Background Logo -->
      <div class="absolute inset-0 z-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
        <Monitor :size="400" class="text-on-background" />
      </div>

      <!-- Desktop Icons Grid -->
      <div class="absolute inset-0 p-10 grid grid-cols-[repeat(auto-fill,100px)] grid-rows-[repeat(auto-fill,110px)] gap-4 z-10 content-start pointer-events-auto">
        <DesktopIcon 
          v-for="shortcut in system.shortcuts" 
          :key="shortcut.id" 
          :app="shortcut" 
          @click="system.openApp(shortcut.appId, false, shortcut.data)"
          @unpin="system.removeShortcut(shortcut.id)"
        />
      </div>

      <!-- Windows Layer -->
      <div class="absolute inset-0 z-20 pointer-events-none">
        <TransitionGroup name="hero">
          <Window 
            v-for="win in system.openWindows" 
            :key="win.id" 
            :window="win"
          />
        </TransitionGroup>
      </div>

      <!-- Bottom Dock -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
        <Dock />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	const [DesktopWorkspace] = await _.$importVue([
		"@/components/DesktopWorkspace/DesktopWorkspace.vue"
	]);

	return {
		components: {
			DesktopWorkspace
		}
	};
}
</script>

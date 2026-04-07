<script>
import * as Icons from "lucide-vue-next";

export default {
	props: {
		app: Object
	},
	emits: ["click", "unpin"],
	computed: {
		IconComponent() {
			return Icons[this.app.icon];
		}
	},
	methods: {
		onDragStart(e) {
			if (e.dataTransfer) {
				e.dataTransfer.setData("text/plain", this.app.appId);
				e.dataTransfer.effectAllowed = "copyMove";
			}
		},
		handleClick() {
			this.$emit("click");
		},
		handleUnpin(event) {
			event.stopPropagation();
			this.$emit("unpin");
		}
	}
};
</script>

<template>
	<div
		class="group relative flex flex-col items-center justify-center gap-2 p-3 rounded-m3-medium hover:bg-on-surface/5 cursor-pointer transition-colors active:bg-on-surface/10"
		draggable="true"
		@dragstart="onDragStart"
		@click="handleClick">
		<div
			class="w-16 h-16 rounded-m3-large flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-200 bg-surface-container-highest text-primary"
			:style="{ color: app.color }">
			<component :is="IconComponent" :size="32" />
		</div>
		<span class="text-xs font-medium text-center line-clamp-2 px-1 text-on-surface">
			{{ app.name }}
		</span>
		<button
			@click="handleUnpin"
			class="absolute -top-1 -right-1 p-1 bg-error text-on-error rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
			title="Unpin from Desktop">
			<Icons.X :size="12" />
		</button>
	</div>
</template>

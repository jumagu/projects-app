<script setup lang="ts">
interface Props {
  open: boolean;
}

defineProps<Props>();

defineEmits<{
  close: [void];
}>();
</script>

<template>
  <dialog class="modal" :open="open" @close="$emit('close')">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>

      <slot name="header" />

      <slot name="body" />

      <div class="modal-action">
        <slot name="actions" />
      </div>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button class="bg-black bg-opacity-35">close</button>
    </form>
  </dialog>
</template>

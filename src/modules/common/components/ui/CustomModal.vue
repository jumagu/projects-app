<script setup lang="ts">
interface Props {
  open: boolean;
}

defineProps<Props>();
</script>

<template>
  <dialog id="my_modal_2" class="modal" :open="open" @close="$emit('close')">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>

      <div>
        <slot name="header" />
      </div>

      <div>
        <slot name="body" />
      </div>

      <div class="modal-action">
        <slot name="actions" />
      </div>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button class="bg-black bg-opacity-35">close</button>
    </form>
  </dialog>
</template>

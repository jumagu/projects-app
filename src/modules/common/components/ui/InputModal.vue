<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props {
  open: boolean;
  title: string;
  value?: string;
  btnText: string;
  subtitle?: string;
  inputPlaceholder?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  close: [void];
  value: [text: string];
}>();

const inputValue = ref(props.value);
const inputRef = ref<HTMLInputElement | null>(null);

watch(
  () => props.open,
  (open) => {
    if (open) inputRef.value?.focus();
  },
);

watch(
  () => props.value,
  (value) => {
    inputValue.value = value;
  },
);

const submitHanlder = () => {
  if (!inputValue.value) {
    inputRef.value?.focus();
    return;
  }

  emit('value', inputValue.value.trim());
  emit('close');

  inputRef.value?.blur();
  inputValue.value = '';
};
</script>

<template>
  <dialog class="modal" :open="open" @close="$emit('close')">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>

      <h3 class="text-lg font-bold mb-4">{{ title }}</h3>
      <p v-if="subtitle" class="mb-4">{{ subtitle }}</p>

      <form class="flex gap-2" @submit.prevent="submitHanlder">
        <input
          ref="inputRef"
          maxlength="50"
          v-model="inputValue"
          class="input input-primary w-full"
          :placeholder="inputPlaceholder ?? 'Insert a value'"
        />
        <button class="btn btn-primary">{{ btnText }}</button>
      </form>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button class="bg-black bg-opacity-35">close</button>
    </form>
  </dialog>
</template>

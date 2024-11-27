<!-- components/CustomSelect.vue -->
<template>
  <div class="relative inline-block w-full">
    <button
        type="button"
        @click="toggleDropdown"
        class="relative w-full bg-white dark:bg-gray-600 border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        aria-haspopup="listbox"
        :aria-expanded="isOpen"
        :aria-labelledby="labelId"
    >
      <span class="block truncate">{{ selectedLabel }}</span>
      <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </span>
    </button>

    <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
      <ul
          v-if="isOpen"
          class="absolute z-10 mt-1 w-full bg-white dark:bg-gray-600 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          tabindex="-1"
          role="listbox"
          @blur="closeDropdown"
          ref="dropdown"
      >
        <li
            v-for="option in options"
            :key="option.value"
            class="text-gray-900  cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-primary-500 hover:text-white"
            :class="{ 'bg-indigo-600 text-white': option.value === modelValue }"
            @click="selectOption(option.value)"
            role="option"
            :aria-selected="option.value === modelValue"
        >
          <span class="block truncate" :class="{ 'font-semibold': option.value === modelValue }">
            {{ option.label }}
          </span>
          <span
              v-if="option.value === modelValue"
              class="absolute inset-y-0 right-0 flex items-center pr-4 text-primary-600"
              :class="{ 'text-white': option.value === modelValue }"
          >
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </span>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, nextTick,defineProps,defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true
  },
  options: {
    type: Array,
    required: true
  },
  label: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const dropdown = ref(null);

const labelId = computed(() => `${props.label.toLowerCase().replace(/\s+/g, '-')}-label`);

const selectedLabel = computed(() => {
  const selected = props.options.find(option => option.value === props.modelValue);
  return selected ? selected.label : props.options[0]?.label || '';
});

function toggleDropdown() {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    nextTick(() => {
      dropdown.value?.focus();
    });
  }
}

function closeDropdown() {
  isOpen.value = false;
}

function selectOption(value) {
  emit('update:modelValue', value);
  closeDropdown();
}
</script>
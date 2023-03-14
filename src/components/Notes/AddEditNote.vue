<template>
  <div class="edit-note">
    <v-card :color="bgColor" class="mb-5">
      <v-card-text>
        <p v-if="label" class="text-subtitle-1 font-weight-bold mb-1">{{ label }}</p>
        <v-textarea
          :value="modelValue"
          @input="emit('update:modelValue', $event.target.value)"
          ref="textareaRef"
          variant="solo"
          :placeholder="placeholder"
          hide-details
          v-autofocus
        ></v-textarea>
      </v-card-text>
      <v-card-actions class="d-flex justify-end mr-2 pt-0">
        <slot name="buttons" />
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup>
// imports
import { ref } from 'vue';
import { vAutofocus } from '@/directives/vAutofocus';

//  props
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  bgColor: {
    type: String,
    default: 'blue-darken-4'
  },
  placeholder: {
    type: String,
    default: 'Here comes the placeholder...'
  },
  label: {
    type: String
  }
});

// emits
const emit = defineEmits('update:modelValue');

const textareaRef = ref(null);

const textareaFocus = () => {
  textareaRef.value.focus();
};

defineExpose({
  textareaFocus
});
</script>

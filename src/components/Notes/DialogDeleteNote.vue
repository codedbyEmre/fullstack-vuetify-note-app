<template>
  <v-dialog v-model="dialog" persistent width="auto">
    <v-card>
      <v-card-title class="text-h5 d-flex align-center justify-space-between">
        Delete Note?
        <v-icon @click="closeDeleteDialog" :size="22" color="grey" icon="mdi-close"></v-icon>
      </v-card-title>
      <v-divider />
      <v-card-text> Are you sure you want to delete this note? </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="text" @click="closeDeleteDialog"> Cancel </v-btn>
        <v-btn color="red" variant="text" @click="deleteNote(noteId)"> Sure </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
//  imports
import { ref } from 'vue';
import { useStoreNotes } from '@/stores/storeNotes';

// store
const storeNotes = useStoreNotes();

// props
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  noteId: {
    type: String,
    required: true
  }
});

const emit = defineEmits('update:modelValue');

const dialog = ref(true);

const deleteNote = id => {
  storeNotes.deleteNote(id);
  storeNotes.showSnackbar('Note deleted successfully!', 'green-darken-1');
};

const closeDeleteDialog = () => {
  emit('update:modelValue', false);
};
</script>

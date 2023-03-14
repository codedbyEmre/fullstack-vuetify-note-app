<template>
  <div class="edit-note">
    <AddEditNote
      v-model="noteContent"
      ref="addEditRef"
      bgColor="teal-darken-1"
      placeholder="Edit note..."
      label="Edit Note"
    >
      <template #buttons>
        <v-btn @click="$router.back()" class="mr-1" variant="flat" color="white"> Cancel </v-btn>
        <v-btn @click="saveNote" variant="flat" color="teal-darken-3" :disabled="!noteContent.trim()">
          Save Note
        </v-btn>
      </template>
    </AddEditNote>
  </div>
</template>

<script setup>
//  imports
import { ref } from 'vue';
import AddEditNote from '@/components/Notes/AddEditNote.vue';
import { useStoreNotes } from '@/stores/storeNotes';
import { useRoute, useRouter } from 'vue-router';

// router
const route = useRoute();
const router = useRouter();

// store
const storeNotes = useStoreNotes();

const noteContent = ref('');

noteContent.value = storeNotes.getNoteContent(route.params.id);

const saveNote = () => {
  storeNotes.updateNote(route.params.id, noteContent.value, Date.now().toString());
  router.push('/');
  storeNotes.showSnackbar('Note edited successfully!', 'green-darken-1');
};
</script>

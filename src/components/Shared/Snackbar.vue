<template>
  <v-snackbar
    v-model="storeNotes.snackbar.show"
    :color="storeNotes.snackbar.color"
    location="top"
    timeout="2500"
    class="mt-4"
  >
    <span class="font-weight-bold">
      {{ storeNotes.snackbar.text }}
    </span>

    <template v-slot:actions>
      <v-btn variant="text" @click="storeNotes.snackbar.show = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
//  imports
import { useStoreNotes } from '@/stores/storeNotes';

// store
const storeNotes = useStoreNotes();
</script>

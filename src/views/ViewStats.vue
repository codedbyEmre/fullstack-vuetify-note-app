<template>
  <div class="stats">
    <v-table class="elevation-1 rounded">
      <thead>
        <tr>
          <th class="text-left font-weight-bold">Notes</th>
          <th class="text-left font-weight-bold">Stats</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Number of notes</td>
          <td>{{ storeNotes.getNumberOfNotes }}</td>
        </tr>
        <tr>
          <td>Total characters of all notes</td>
          <td>{{ storeNotes.getTotalCharactersOfAllNotes }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
// imports
import { useStoreNotes } from '@/stores/storeNotes';

// store
const storeNotes = useStoreNotes();
</script>

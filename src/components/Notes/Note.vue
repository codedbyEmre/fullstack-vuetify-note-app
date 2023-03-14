<template>
  <div class="note">
    <v-card class="mb-4">
      <v-card-text>
        {{ note.content }}
        <div class="d-flex align-center justify-space-between mt-3 text-grey">
          <div>{{ formattedDate }}</div>
          <div>{{ charactersAmount }}</div>
        </div>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-row>
          <v-col>
            <v-btn :to="`/editNote/${note.id}`" block variant="text" color="primary"> Edit</v-btn>
          </v-col>
          <v-col>
            <v-btn @click="dialog.delete = true" block variant="text" color="red"> Delete </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>

  <DialogDeleteNote v-if="dialog.delete" v-model="dialog.delete" :noteId="note.id" />
</template>

<script setup>
//  imports
import { computed, reactive } from 'vue';
import { useDateFormat } from '@vueuse/core';
import DialogDeleteNote from '@/components/Notes/DialogDeleteNote.vue';

// props
const props = defineProps({
  note: {
    type: Object,
    required: true
  }
});

const charactersAmount = computed(() => {
  const length = props.note.content.length;
  const text = length > 1 ? 'characters' : 'character';
  return `${length} ${text}`;
});

const formattedDate = computed(() => {
  const date = new Date(parseInt(props.note.date));
  const formatted = useDateFormat(date, 'DD MMM YYYY @ HH:mm').value;
  return formatted;
});

const dialog = reactive({
  delete: false
});
</script>

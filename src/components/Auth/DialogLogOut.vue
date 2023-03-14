<template>
  <v-dialog v-model="dialog" persistent width="auto">
    <v-card>
      <v-card-title class="text-h5 d-flex align-center justify-space-between">
        Log Out?
        <v-icon @click="closeLogOutDialog" :size="22" color="grey" icon="mdi-close"></v-icon>
      </v-card-title>
      <v-divider />
      <v-card-text> Are you sure you want to log out? </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="text" @click="closeLogOutDialog"> Cancel </v-btn>
        <v-btn color="primary" variant="text" @click="logOut"> Sure </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
//  imports
import { ref } from 'vue';
import { useStoreAuth } from '@/stores/storeAuth';

// store
const storeAuth = useStoreAuth();

// props
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits('update:modelValue');

const dialog = ref(true);

const logOut = () => {
  closeLogOutDialog();
  storeAuth.logOut();
};

const closeLogOutDialog = () => {
  emit('update:modelValue', false);
};
</script>

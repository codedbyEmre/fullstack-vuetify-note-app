<template>
  <div class="auth">
    <v-tabs color="primary" align-tabs="center">
      <v-tab @click="changeTab(false)">Login</v-tab>
      <v-tab @click="changeTab(true)">Register</v-tab>
    </v-tabs>
    <v-divider />

    <v-card class="mx-auto mt-5 pb-2 px-2" max-width="400">
      <v-card-text>
        <div class="text-h4 text-center mb-6">{{ formTitle }}</div>
        <v-form @submit.prevent="submitForm">
          <v-text-field
            v-model="credentials.email"
            type="email"
            label="* Email"
            class="mb-6"
            variant="outlined"
            density="comfortable"
            prepend-inner-icon="mdi-email-outline"
            hide-details
          ></v-text-field>

          <v-text-field
            v-model="credentials.password"
            @click:append-inner="visible = !visible"
            :type="visible ? 'text' : 'password'"
            label="* Password"
            class="mb-6"
            variant="outlined"
            density="comfortable"
            prepend-inner-icon="mdi-lock-outline"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            hide-details
          ></v-text-field>

          <v-text-field
            v-if="register"
            v-model="credentials.confirmPassword"
            @click:append-inner="confirmVisible = !confirmVisible"
            :type="confirmVisible ? 'text' : 'password'"
            label="* Confirm Password"
            class="mb-6"
            variant="outlined"
            density="comfortable"
            prepend-inner-icon="mdi-lock-outline"
            :append-inner-icon="confirmVisible ? 'mdi-eye-off' : 'mdi-eye'"
            hide-details
          ></v-text-field>

          <div class="d-flex justify-space-between align-center mt-8">
            <small>* indicates required field</small>
            <div class="text-right">
              <v-btn type="submit" color="primary" class="mt-1" :loading="storeAuth.authBtnLoading">{{
                formTitle
              }}</v-btn>
            </div>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
// imports
import { ref, computed, reactive } from 'vue';
import { useStoreNotes } from '@/stores/storeNotes';
import { useStoreAuth } from '@/stores/storeAuth';

// stores
const storeNotes = useStoreNotes();
const storeAuth = useStoreAuth();

const visible = ref(false);
const confirmVisible = ref(false);
const register = ref(false);

const formTitle = computed(() => {
  return register.value ? 'Register' : 'Login';
});

// credentials
const credentials = reactive({
  email: '',
  password: '',
  confirmPassword: ''
});

const submitForm = () => {
  if (!credentials.email || !credentials.password) {
    storeNotes.showSnackbar('Please enter email and password!', 'red-darken-2');
  } else {
    if (register.value) {
      if (credentials.password === credentials.confirmPassword) {
        storeAuth.registerUser(credentials);
      } else {
        storeNotes.showSnackbar('Passwords must be matched!', 'red-darken-2');
      }
    } else {
      storeAuth.loginUser(credentials);
    }
  }
};
const changeTab = value => {
  register.value = value;
  visible.value = false;
  confirmVisible.value = false;
  credentials.email = '';
  credentials.password = '';
  credentials.confirmPassword = '';
};
</script>

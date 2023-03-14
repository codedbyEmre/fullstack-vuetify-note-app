import { defineStore } from 'pinia';
import { auth } from '@/firebase';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useStoreNotes } from '@/stores/storeNotes';
import { useRouter } from 'vue-router';

let storeNotes;

export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return {
      user: {},
      userLoading: false,
      authBtnLoading: false
    };
  },
  actions: {
    init() {
      storeNotes = useStoreNotes();
      const router = useRouter();
      onAuthStateChanged(auth, user => {
        this.userLoading = false;
        if (user) {
          this.user.id = user.uid;
          this.user.email = user.email;
          storeNotes.init();
          router.push('/');
        } else {
          this.user = {};
          storeNotes.clearNotes();
          storeNotes.loading = false;
          router.push('/auth');
        }
      });
      this.userLoading = true;
    },
    registerUser(credentials) {
      this.authBtnLoading = false;
      storeNotes = useStoreNotes();
      createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then(userCredential => {
          storeNotes.showSnackbar('Registered successfully!', 'green-darken-1');
        })
        .catch(error => {
          storeNotes.showSnackbar('Something went wrong!', 'red-darken-2');
          this.authBtnLoading = false;
        });
      this.authBtnLoading = true;
    },
    loginUser(credentials) {
      this.authBtnLoading = false;
      storeNotes = useStoreNotes();
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then(userCredential => {
          storeNotes.showSnackbar('Logged in successfully!', 'green-darken-1');
        })
        .catch(error => {
          storeNotes.showSnackbar('User not found!', 'red-darken-2');
          this.authBtnLoading = false;
        });
      this.authBtnLoading = true;
    },
    logOut() {
      storeNotes = useStoreNotes();
      signOut(auth)
        .then(() => {
          storeNotes.showSnackbar('Logged out successfully!', 'green-darken-1');
        })
        .catch(error => {
          storeNotes.showSnackbar('Something went wrong!', 'red-darken-2');
        });
    }
  }
});

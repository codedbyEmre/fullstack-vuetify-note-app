import { defineStore } from 'pinia';
import { db } from '@/firebase';
import { collection, doc, onSnapshot, addDoc, deleteDoc, updateDoc, query, orderBy } from 'firebase/firestore';
import { useStoreAuth } from '@/stores/storeAuth';

let collectionNotesRef;
let collectionNoteQuery;
let storeAuth = null;
let getNotesSnapsot = null;

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
      notes: [],
      loading: false,
      snackbar: {
        show: false,
        text: '',
        color: ''
      }
    };
  },
  actions: {
    init() {
      storeAuth = useStoreAuth();
      collectionNotesRef = collection(db, 'users', storeAuth.user.id, 'notes');
      collectionNoteQuery = query(collectionNotesRef, orderBy('date', 'desc'));
      this.getNotes();
    },
    async getNotes() {
      storeAuth = useStoreAuth();
      getNotesSnapsot = onSnapshot(collectionNoteQuery, querySnapshot => {
        this.loading = false;
        const notes = [];
        querySnapshot.forEach(doc => {
          const note = {
            id: doc.id,
            content: doc.data().content,
            date: doc.data().date
          };
          notes.push(note);
        });
        this.notes = notes;
        this.loading = true;
        storeAuth.authBtnLoading = false;
      });
    },
    clearNotes() {
      this.notes = [];
      if (getNotesSnapsot) getNotesSnapsot();
    },
    async addNote(content) {
      // Add a new document with a generated id.
      await addDoc(collectionNotesRef, {
        content,
        date: Date.now().toString()
      });
    },
    async deleteNote(id) {
      await deleteDoc(doc(collectionNotesRef, id));
    },
    async updateNote(id, content, date) {
      await updateDoc(doc(collectionNotesRef, id), {
        content,
        date
      });
    },
    showSnackbar(text, color) {
      let timeout = 0;

      if (this.snackbar.show) {
        this.snackbar.show = false;
        timeout = 300;
      }

      setTimeout(() => {
        this.snackbar.show = true;
        this.snackbar.text = text;
        this.snackbar.color = color;
      }, timeout);
    }
  },
  getters: {
    getNoteContent: state => {
      return id => {
        const note = state.notes.filter(note => note.id === id)[0];
        return note.content;
      };
    },
    getNumberOfNotes: state => {
      return state.notes.length;
    },
    getTotalCharactersOfAllNotes: state => {
      let total = 0;

      state.notes.forEach(note => {
        total += note.content.length;
      });

      return total;
    }
  }
});

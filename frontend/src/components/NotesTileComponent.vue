<template>
  <v-list-tile
    inactive
    @click="onClick(note)"
    :class="{ 'active': selectedNote.id === note.id }"
    class="notes__note-tile">
    <v-list-tile-title>
      <span
        v-show="!inputState"
        :class="{ 'completed': completed }">
        {{ note.content }}
      </span>
      <input
        ref="input"
        class="notes__note-tile__input"
        v-show="inputState"
        @input="debounceInput($event, note)"
        @blur="updateNote($event, note)"
        :value="note.content" />
    </v-list-tile-title>
    <v-list-tile-content class="notes__note-tile__flag">
      <v-icon
        @click="changePriority(note)"
        :color="priorityColors[note.priority]"
        size="16">
        outlined_flag
      </v-icon>
    </v-list-tile-content>
    <v-list-tile-action class="notes__note-tile__controls">
      <v-icon
        :class="{ 'active': inputState }"
        @click="toggleInput"
        size="16">
        edit
      </v-icon>
      <v-icon
        @click.stop="removeNote(note)"
        size="16">
        delete
      </v-icon>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'NotesTileComponent',
  props: {
    note: {
      type: Object,
      default: {},
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      inputState: false,
      priorityColors: {
        low: 'green',
        medium: 'orange',
        high: 'red',
      },
    }
  },
  computed: {
    ...mapGetters({
      selectedNote: 'getSelectedNote',
    }),
  },
  methods: {
    ...mapActions({
      editNote: 'editNote',
      deleteNote: 'deleteNote',
      setSelectedNote: 'setSelectedNote',
    }),
    changePriority(note) {
      let priority;

      if (note.priority === 'medium') {
        priority = 'high';
      } else if (note.priority === 'high') {
        priority = 'low';
      } else {
        priority = 'medium';
      }

      this.editNote({
        id: note.id,
        priority
      });
    },
    toggleInput() {
      this.inputState = !this.inputState;

      if (this.inputState) {
        this.$nextTick(() => this.$refs.input.focus())
      }
    },
    debounceInput: _.debounce(function(e, note) {
      if (e.target.value.length > 0) {
        this.editNote({
          id: note.id,
          state: note.state,
          priority: note.priority,
          content: e.target.value,
        });
      }
    }, 200),
    updateNote(e, note) {
      if (e.target.value.length > 0) {
        this.editNote({
          id: note.id,
          state: note.state,
          priority: note.priority,
          content: e.target.value,
        });
        this.inputState = false;
      }
    },
    removeNote(note) {
      this.deleteNote(note);
      this.setSelectedNote({});
    },
    onClick(note) {
      if (this.selectedNote.id === note.id) {
        this.setSelectedNote({});
      } else {
        this.setSelectedNote(note);
      }
    },
  },
};
</script>
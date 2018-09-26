<template>
  <v-flex class="dashboard__element" sm12 md8 d-flex>
    <v-card>
      <dashboard-element-header title="TODOS">
        <v-btn
          small
          color="primary"
          @click="addNewNote"
          class="btn__control correct-position">
          Add todo
          <v-icon class="pl-1" size="20">
            add_circle_outline
          </v-icon>
        </v-btn>
        <v-spacer>
        </v-spacer>
        <p class="click-accounts-text">
          <small>
            Add, edit, mark or set to not completed / completed 
          </small>
        </p>
      </dashboard-element-header>
      <notes-component />
    </v-card>
  </v-flex>
</template>

<script>
import DashboardElementHeader from './DashboardElementHeader';
import NotesComponent from './NotesComponent';
import { mapActions } from 'vuex';

export default {
  components: {
    DashboardElementHeader,
    NotesComponent,
  },
  methods: {
    ...mapActions({
      addNote: 'addNote',
    }),
    addNewNote() {
      this.addNote({
        tokenID: localStorage.id_token,
        content: 'New note',
      })
    },
  },
};
</script>

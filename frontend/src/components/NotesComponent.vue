<template>
  <v-layout row wrap class="notes__main-component">
    <button
      flat
      :disabled="disableArrow || !!selectedNote.state"
      @click="editNoteState"
      class="btn__arrow">
      <v-icon
        :class="{ 'active': !(disableArrow || !!selectedNote.state) }"
        class="arrow"
        size="26">
        arrow_right_alt
      </v-icon>
    </button>
    <button
      flat
      :disabled="disableArrow || !selectedNote.state"
      @click="editNoteState"
      class="btn__arrow">
      <v-icon
        :class="{ 'active': !(disableArrow || !selectedNote.state) }"
        class="arrow"
        size="26">
        arrow_right_alt
      </v-icon>
    </button>
    <v-flex
      class="notes__column"
      xs12
      md6>
      <div class="text-xs-center notes__column-wrapper">
        <h6 class="notes__column-header">
          NOT COMPLETED
          <span class="ml-5 pl-5 pr-1">
            show:
          </span>
          <button class="btn__notes_filter" @click="changeShowFilter('not completed')">
            <template v-if="selectedFilterNotCompleted.text !== 'ALL'">
              <v-icon
                size="16"
                :color="selectedFilterNotCompleted.color">
                {{ selectedFilterNotCompleted.text }}
              </v-icon>
            </template>
            <template v-else>
              <span>
                {{ selectedFilterNotCompleted.text }}
              </span>
            </template>
          </button>
        </h6>
        <v-list class="notes__list" >
          <template v-for="(note, index) in renderedNotCompleted">
            <notes-tile-component
              v-if="checkIfShow(note, selectedFilterNotCompleted)"
              :note="note" />
          </template>
          <span
            class="no-data-text"
            v-if="!paginationLength(allNotCompleted)">
            No data
          </span>
        </v-list>
        <v-pagination
          v-model="pageNotCompleted"
          :length="paginationLength(allNotCompleted)"
        ></v-pagination>
      </div>
    </v-flex>
    <v-flex
      class="notes__column"
      xs12
      md6>
      <div class="text-xs-center notes__column-wrapper">
        <h6 class="notes__column-header">
          COMPLETED
          <span class="ml-5 pl-5 pr-1">
            show:
          </span>
          <button class="btn__notes_filter" @click="changeShowFilter('completed')">
            <template v-if="selectedFilterCompleted.text !== 'ALL'">
              <v-icon
                size="16"
                :color="selectedFilterCompleted.color">
                {{ selectedFilterCompleted.text }}
              </v-icon>
            </template>
            <template v-else>
              <span>
                {{ selectedFilterCompleted.text }}
              </span>
            </template>
          </button>
        </h6>
        <v-list class="notes__list">
          <template v-for="(note, index) in renderedCompleted">
            <notes-tile-component
              v-if="checkIfShow(note, selectedFilterCompleted)"
              :completed="true"
              :note="note" />
          </template>
          <span
            class="no-data-text"
            v-if="!paginationLength(allCompleted)">
            No data
          </span>
        </v-list>
        <v-pagination
          v-model="pageCompleted"
          :length="paginationLength(allCompleted)"
        ></v-pagination>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import NotesTileComponent from './NotesTileComponent';
import * as _ from 'lodash';

export default {
  components: {
    NotesTileComponent,
  },
  data() {
    return {
      pageCompleted: 1,
      pageNotCompleted: 1,
      notesPerPage: 5,
      filters: [
        {
          text: 'ALL',
          color: '',
          priority: '',
        },
        {
          text: 'outlined_flag',
          color: 'green',
          priority: 'low',
        },
        {
          text: 'outlined_flag',
          color: 'orange',
          priority: 'medium',
        },
        {
          text: 'outlined_flag',
          color: 'red',
          priority: 'high',
        },
      ],
      selectedIndexNotCompleted: 0,
      selectedIndexCompleted: 0,
      selectedFilterNotCompleted: {},
      selectedFilterCompleted: {},
    };
  },
  computed: {
    ...mapGetters({
      notes: 'getNotes',
      selectedNote: 'getSelectedNote',
    }),
    allCompleted() {
      return  _.filter(this.notes, (note) => note.state);
    },
    allNotCompleted() {
      return _.filter(this.notes, (note) => !note.state);
    },
    renderedCompleted() {
      let arrayOfArrays = [];

      for (let i = 0, arrLength = this.allCompleted.length; i < arrLength; i += this.notesPerPage) {
           arrayOfArrays.push(this.allCompleted.slice(i , i + this.notesPerPage));
      }

      return arrayOfArrays[this.pageCompleted - 1] || null;
    },
    renderedNotCompleted() {
      let arrayOfArrays = [];

      for (let i = 0, arrLength = this.allNotCompleted.length; i < arrLength; i += this.notesPerPage) {
           arrayOfArrays.push(this.allNotCompleted.slice(i , i + this.notesPerPage));
      }

      return arrayOfArrays[this.pageNotCompleted - 1] || null;
    },
    disableArrow() {
      if (this.selectedNote.id === undefined) {
        return true;
      }
      return false;
    },
  },
  methods: {
    ...mapActions({
      editNote: 'editNote',
      setSelectedNote: 'setSelectedNote',
    }),
    paginationLength(notes) {
      return Math.ceil(notes.length / 5);
    },
    editNoteState() {
      this.editNote({
        id: this.selectedNote.id,
        state: !this.selectedNote.state,
      });
      this.setSelectedNote({});
    },
    changeShowFilter(type) {
      const filtersLength = this.filters.length - 1;

      if (type === 'completed') {
        this.selectedFilterCompleted = this.filters[this.selectedIndexCompleted];
        if (this.selectedIndexCompleted < filtersLength) {
          this.selectedIndexCompleted++;
        } else {
          this.selectedIndexCompleted = 0;
        }
      } else if (type === 'not completed') {
        this.selectedFilterNotCompleted = this.filters[this.selectedIndexNotCompleted];
        if (this.selectedIndexNotCompleted < filtersLength) {
          this.selectedIndexNotCompleted++;
        } else {
          this.selectedIndexNotCompleted = 0;
        }
      }
    },
    checkIfShow(note, filter) {
      if (filter.priority) {
        if (note.priority === filter.priority) {
          return true;
        }
      } else {
        return true;
      }
    },
  },
  mounted() {
    this.changeShowFilter('completed');
    this.changeShowFilter('not completed');
  },
};
</script>

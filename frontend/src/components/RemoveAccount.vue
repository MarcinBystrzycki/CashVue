<template>
  <v-dialog
    max-width="500"
    class="modal__remove-account"
    v-model="modal">
    <v-btn
      small
      color="primary"
      class="btn__control"
      slot="activator">
      Remove
      <v-icon class="pl-1" size="20">
        delete
      </v-icon>
    </v-btn>
    <v-form>
      <v-card>
        <v-card-text>
          Are you sure you want to remove this account?
        </v-card-text>
        <v-card-actions>
          <v-layout justify-center>
            <v-btn
              @click="removeAccount"
              color="primary">
              Yes
            </v-btn>
            <v-btn
              @click="modal = false"
              color="primary">
              No
            </v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'EditAccount',
  data() {
    return {
      modal: false,
    };
  },
  computed: {
    ...mapGetters({
      activeAccount: 'getActiveAccount',
    }),
  },
  methods: {
    ...mapActions({
      deleteUserAccount: 'deleteUserAccount',
    }),
    removeAccount() {
      if (this.activeAccount.id) {
        this.deleteUserAccount({ id: this.activeAccount.id });
        this.modal = false;
      }
    },
  },
};
</script>

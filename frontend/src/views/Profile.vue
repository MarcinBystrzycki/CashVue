<template>
  <v-layout
    align-center 
    justify-center
    class="container__inner">
    <v-flex xs12 xl6>
      <v-card>
        <v-form class="m-3">
          <v-text-field
            label="Name"
            v-model="user.name">
          </v-text-field>
          <v-text-field
            label="Lastname"
            v-model="user.lastname">
          </v-text-field>
          <v-text-field
            label="Nickname"
            v-model="user.nickname">
          </v-text-field>
         <v-menu
            :close-on-content-click="false"
            v-model="datepicker"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
          >
            <v-text-field
              slot="activator"
              v-model="user.birthDate"
              label="Birth date"
              persistent-hint
              readonly
            ></v-text-field>
            <v-date-picker 
              v-model="user.birthDate" 
              no-title 
              @input="datepicker = false">
            </v-date-picker>
          </v-menu>
          </v-text-field>
          <v-text-field
            label="E-mail"
            v-model="user.email"
            required>
          </v-text-field>
          <v-select
            label="Gender"
            :items="gender"
            v-model="user.gender">
          </v-select>
          <v-btn
            class="btn__save"
            color="primary"
            :loading="loading"
            :disabled="loading"
            @click="submitAndSave">
          Save
          </v-btn>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import { http } from '../utils/http'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'Profile',
    data() {
      return {
        gender: ['male', 'female', 'other'],
        datepicker: false,
        loading: false,
      }
    },
    computed: {
      ...mapGetters({
        user: 'getUser',
      })
    },
    methods: {
      ...mapActions({
        setUser: 'setUser',
        saveProfile: 'saveProfile',
        getProfile: 'getUserProfile',
      }),
      submitAndSave() {
        this.saveProfile({
          user: this.user, 
          tokenID: localStorage.id_token
        })
      }
    },
    created() {
      this.getProfile()
    }
  }
</script>

<style lang="sass" scoped>
  .container__inner
    height: 100%
  .btn__save
    padding: 0
</style>
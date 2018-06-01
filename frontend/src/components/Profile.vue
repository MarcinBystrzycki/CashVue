<template>
  <div>
    
  </div>
</template>

<script>
  import jwt from 'jsonwebtoken'
  import axios from 'axios'

  export default {
    name: 'Profile',
    data () {
      return {
        name: '',
        lastname: '',
        nickname: '',
        email: '',
        gender: '',
        birthDate: ''
      }
    },
    created () {
      const userID = jwt.decode(localStorage.id_token).sub.replace('auth0|', '')

      axios.get(`http://localhost:6060/get/${userID}`)
        .then((res) => {
          const resObj = res.data['0']

          this.name = resObj.name
          this.lastname = resObj.lastname
          this.nickname = resObj.nickname
          this.email = resObj.email
          this.gender = resObj.gender
          this.birthDate = resObj.birthDate
        })
        .catch((err) => console.log(err))

    }
  }
</script>

<style>
  
</style>
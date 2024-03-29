<template>
  <v-container class="d-flex align-center welcome" style="height: 100%;">
    <ul class="circles">
      <li v-for="n in 10" :key="n" />
    </ul>
    <v-card class="pa-2" outlined tile color="transparent">
      <v-form ref="form" v-model="valid" @submit.prevent="login">
        <v-row>
          <v-col cols="12">
            <v-card class="mx-auto" color="transparent" dark flat max-width="400">
              <v-card-title class="text-h4 font-weight-black" style="color: #fff;">
                <v-icon large left dark>
                  mdi-music
                </v-icon>A&amp;J's B&amp;B
                Karaoke
              </v-card-title>
            </v-card>
            <v-text-field
              v-model="userName"
              dark
              placeholder="Your name"
              required
              :rules="[
                (value) =>
                  value.length >= 3 || 'Name must have at least 3 characters',
              ]"
              solo
              height="70"
              class="text-h5 text-bold text-center"
              style="backdrop-filter: blur(5px);"
              background-color="transparent"
            />
            <v-btn
              type="submit"
              elevation="24"
              large
              class="float-right"
              style="background-color: rgba(255, 255, 255, 0.317); color: white;"
            >
              Join
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <v-dialog v-model="dialog.value" max-width="600">
      <v-card>
        <v-toolbar color="primary" dark>
          New user
        </v-toolbar>
        <v-card-text>
          <div class="pt-5">
            Welcome,
            <b>{{ userName }}</b>! We're excited to have you here. Please select an avatar:
            <avatar-select v-model="avatar" class="mt-2 pt-2" />
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="dialog.value = false">
            I already have a user
          </v-btn>
          <v-btn color="primary" :disabled="processingUserCreation" @click="createUser(userName, avatar)">
            Let's go!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="sessionTerminatedDialog"
      persistent
      max-width="550"
    >
      <v-card>
        <v-card-title class="text-h6">
          Karaoke session terminated
        </v-card-title>
        <v-card-text>You have been logged out because the session was terminated.</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue"
            text
            @click="$store.commit('setSessionTerminatedDialog', false)"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import AvatarSelect from '~/components/AvatarSelect.vue'
import { initApp } from '~/modules/utils'

export default {
  components: {
    AvatarSelect
  },
  layout: 'empty',
  data () {
    return {
      valid: false,
      userName: '',
      dialog: {
        value: false
      },
      processingUserCreation: false,
      avatar: ''
    }
  },
  computed: {
    ...mapState(['sessionTerminatedDialog'])
  },
  methods: {
    async login () {
      this.$refs.form.validate()
      if (this.valid) {
        const user = await this.getUser(this.userName)
        if ('name' in user && user.name !== '') {
          this.$store.commit('setSessionTerminatedDialog', false)
          this.$store.dispatch('login', user)
          initApp(this)
          this.$router.push({ path: '/' })
        } else {
          this.dialog.value = true
        }
      }
    },
    async getUser (userName) {
      const userReq = await fetch(`/api/getUser?username=${userName}`)
      const result = await userReq.json()
      if (result.count === 0) {
        return {}
      }
      return result.results[0]
    },
    async createUser (userName, avatar) {
      this.processingUserCreation = true
      const userReq = await fetch('/api/postUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: userName,
          avatar
        })
      })
      if (userReq.ok) {
        this.dialog.value = false
        this.processingUserCreation = false
        this.login()
      }
    }
  }
}
</script>

<style>
.text-center input {
  text-align: center;
}

.welcome input {
  line-height: 70px;
  padding: 35px 10px;
  max-height: fit-content;
}

.welcome .v-messages__message {
  color: white;
}

.context {
  width: 100%;
  position: absolute;
  top: 50vh;
}

.context h1 {
  text-align: center;
  color: #fff;
  font-size: 50px;
}

.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circles li {
  position: absolute;
  display: block;
  list-style: none;
  animation: animate 25s linear infinite;
  bottom: -150px;
  background-size: 20px;
}

.circles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  background-size: 80px;
  animation-delay: 0s;
  background-image: url(/svg/cassette.svg);
  -webkit-filter: hue-rotate(20deg) saturate(10) opacity(0.5);
  filter: hue-rotate(20deg) saturate(10) opacity(0.5);
}

.circles li:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
  background-image: url(/svg/headphones.svg);
  -webkit-filter: hue-rotate(25deg) saturate(10) opacity(0.5);
  filter: hue-rotate(25deg) saturate(10) opacity(0.5);
}

.circles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
  background-image: url(/svg/microphone1.svg);
  -webkit-filter: hue-rotate(50deg) saturate(10) opacity(0.5);
  filter: hue-rotate(50deg) saturate(10) opacity(0.5);
}

.circles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  background-size: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
  background-image: url(/svg/microphone2.svg);
  -webkit-filter: hue-rotate(75deg) saturate(10) opacity(0.5);
  filter: hue-rotate(75deg) saturate(10) opacity(0.5);
}

.circles li:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
  background-image: url(/svg/microphone3.svg);
  -webkit-filter: hue-rotate(100deg) saturate(10) opacity(0.5);
  filter: hue-rotate(100deg) saturate(10) opacity(0.5);
}

.circles li:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
  background-size: 110px;
  animation-delay: 3s;
  background-image: url(/svg/radio.svg);
  -webkit-filter: hue-rotate(280deg) saturate(6) opacity(0.5);
  filter: hue-rotate(280deg) saturate(6) opacity(0.5);
}

.circles li:nth-child(7) {
  left: 35%;
  width: 150px;
  height: 150px;
  background-size: 150px;
  animation-delay: 7s;
  background-image: url(/svg/microphone3.svg);
  -webkit-filter: hue-rotate(320deg) saturate(10) opacity(0.5);
  filter: hue-rotate(320deg) saturate(10) opacity(0.5);
}

.circles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  background-size: 25px;
  animation-delay: 15s;
  animation-duration: 45s;
  background-image: url(/svg/volume1.svg);
  -webkit-filter: hue-rotate(175deg) saturate(10) opacity(0.5);
  filter: hue-rotate(175deg) saturate(10) opacity(0.5);
}

.circles li:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  background-size: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
  background-image: url(/svg/volume2.svg);
  -webkit-filter: hue-rotate(200deg) saturate(10) opacity(0.5);
  filter: hue-rotate(200deg) saturate(10) opacity(0.5);
}

.circles li:nth-child(10) {
  left: 85%;
  width: 150px;
  height: 150px;
  background-size: 150px;
  animation-delay: 0s;
  animation-duration: 11s;
  background-image: url(/svg/volume3.svg);
  -webkit-filter: hue-rotate(225deg) saturate(10) opacity(0.5);
  filter: hue-rotate(225deg) saturate(10) opacity(0.5);
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }

  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }
}
</style>

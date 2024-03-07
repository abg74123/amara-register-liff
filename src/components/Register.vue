<template>
  <div v-if="loading">
    LOADING
  </div>
  <div v-else>
    <form @submit.prevent="register">
      <label for="txt_name">ชื่อ</label>
      <input id="txt_name" v-model="fName" type="text" required>
      <button type="submit">สมัครสมาชิก</button>
    </form>
  </div>

</template>

<script>

import liff from "@line/liff";

export default {
  name: 'RegisterComp',
  props: {},
  data() {
    return {
      fName: "",
      loading: true
    }
  },
  mounted() {
    console.log("mount")
    liff.init({liffId: "2003955937-Vz8gzQXJ", withLoginOnExternalBrowser: true}).then(async () => {
      if (liff.isLoggedIn()) {
        const profile = await liff.getProfile()
        console.log("profile => ", profile)
        this.loading = false
      } else {
        liff.login()
      }
    })
  },
  methods: {
    register() {
      console.log("register Func")
      liff.sendMessages([
        {
          type: "text",
          text: this.fName,
        },
      ])
      liff.closeWindow()
    }
  }
}
</script>


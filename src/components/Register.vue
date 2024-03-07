<template>
  <div v-if="loading">
    LOADING
  </div>
  <template v-else>
    <Card>
      <template #title>สมัครสมาชิก</template>
      <template #content>
        <form @submit.prevent="register">
          <div class="form-group col">
            <label for="txt_name">ชื่อ <span class="txt-red">*</span></label>
            <InputText id="txt_name" type="text" v-model="fName" required/>
          </div>
          <div class="form-group col">
            <label for="txt_tel">เบอร์โทร <span class="txt-red">*</span></label>
            <InputMask id="txt_tel" v-model="tel" mask="999-999-9999" required/>
          </div>
          <Button type="submit" severity="info" label="สมัครสมาชิก"/>
        </form>
      </template>
    </Card>
  </template>

</template>

<script>

import liff from "@line/liff";

export default {
  name: 'RegisterComp',
  props: {},
  data() {
    return {
      fName: "",
      tel: "",
      loading: true
    }
  },
  mounted() {
    console.log("mount")
    liff.init({liffId: "2002778486-rvP5epAq", withLoginOnExternalBrowser: true}).then(async () => {
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
          text: `ชื่อ: ${this.fName}\nเบอร์โทร: ${this.tel}`,
        }
      ])
      liff.closeWindow()
    }
  }
}
</script>

<style>
.form-group {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.form-group.col {
  flex-direction: column;
}

.form-group.row {
  flex-direction: row;
}

.txt-red {
  color: red;
}
</style>


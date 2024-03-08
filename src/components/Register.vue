<template>
  <div v-if="loading">
    LOADING
  </div>
  <template v-else>
    <Card>
      <template #title >ลงทะเบียนเข้ารับคำปรึกษา</template>
      <template #content>
        <form @submit.prevent="register">
          <div style="text-align:center;">
            <img src="../assets/logo.png" alt="">
          </div>
          <div class="form-group col">
            <label for="txt_name">ชื่อ-นามสกุล <span class="txt_red">*</span></label>
            <InputText class="input_text" placeholder="ชื่อ-นามสกุล" id="txt_name" type="text" v-model="name" required/>
          </div>
          <div class="form-group col">
            <label for="txt_tel">เบอร์โทร <span class="txt_red">*</span></label>
            <InputMask class="input_text" placeholder="เบอร์โทร" id="txt_tel" v-model="tel" mask="999-999-9999" required/>
          </div>
          <div class="form-group col">
            <label for="txt_date">วันที่, เวลาที่สะดวก <span class="txt_red">*</span></label>
            <Calendar id="txt_date" placeholder="วันที่, เวลาที่สะดวก" v-model="date" showTime hourFormat="24" />
          </div>
          <div class="form-group row">
            <Button class="btn_submit" type="submit" severity="info" @click="register('message')" label="สมัครสมาชิก"/>
<!--            <Button type="submit" severity="info" @click="register('flex')" label="สมัครสมาชิก + Flex Message"/>-->
          </div>
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
      name: "",
      tel: "",
      date:"",
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
    register(type) {
      console.log("register Func")
      if (type === 'message') {
        liff.sendMessages([
          {
            type: "text",
            text: `ลงทะเบียนเข้ารับคำปรึกษา\nชื่อ: ${this.name}\nเบอร์โทร: ${this.tel}\nวัน-เวลาที่นัด : ${this.date}`
          }
        ])
      }
      liff.closeWindow()
    }
  }
}
</script>

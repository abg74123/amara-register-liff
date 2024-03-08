<template>
  <div v-if="loading">
    LOADING
  </div>
  <template v-else>
    <Card>
      <template #title>ลงทะเบียนเข้ารับคำปรึกษา</template>
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
            <InputMask class="input_text" placeholder="เบอร์โทร" id="txt_tel" v-model="tel" mask="999-999-9999"
                       required/>
          </div>
          <div class="form-group col">
            <label for="txt_date">วันที่, เวลาที่สะดวก <span class="txt_red">*</span></label>
            <Calendar id="txt_date" :minDate="minDate" placeholder="วันที่, เวลาที่สะดวก" v-model="date" showTime hourFormat="24"/>
          </div>
          <div class="form-group row">
            <Button class="btn_submit" type="submit" severity="info" @click="register('message')" label="สมัครสมาชิก"/>
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
      minDate: new Date(),
      date: new Date(),
      loading: true
    }
  },
  mounted() {
    console.log("mount")
    // * Config Line Liff
    liff.init({liffId: "2003492788-kZQp2v5N", withLoginOnExternalBrowser: true}).then(async () => {
       // ^ Check Line Liff Login ?
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
        // EX: 8 มี.ค. 2567 16:25น.
        const monthNamesThai = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
        const day = ("0" + this.date.getDate()).slice(-2)
        const month = monthNamesThai[this.date.getMonth()]
        const year = this.date.getFullYear() + 543
        const hours = ("0" + this.date.getHours()).slice(-2)
        const minutes = ("0" + this.date.getMinutes()).slice(-2)
        const formatDate = `${day} ${month} ${year} ${hours}:${minutes}น.`
        liff.sendMessages([
          {
            type: "text",
            text: `ลงทะเบียนเข้ารับคำปรึกษา\nชื่อ: ${this.name}\nเบอร์โทร: ${this.tel}\nวัน-เวลาที่นัด : ${formatDate}`
          }
        ])
      }
      liff.closeWindow()
    }
  }
}
</script>

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
          <!--          <div class="form-group col">-->
          <!--            <label for="txt_name">ชื่อ-นามสกุล <span class="txt_red">*</span></label>-->
          <!--            <InputText class="input_text" placeholder="ชื่อ-นามสกุล" id="txt_name" type="text" v-model="name" required/>-->
          <!--          </div>-->
          <!--          <div class="form-group col">-->
          <!--            <label for="txt_tel">เบอร์โทร <span class="txt_red">*</span></label>-->
          <!--            <InputMask class="input_text" placeholder="เบอร์โทร" id="txt_tel" v-model="tel" mask="999-999-9999"-->
          <!--                       required/>-->
          <!--          </div>-->

          <!--          Gender-->
          <p>เพศ</p>
          <div class="form-group row">
            <div class="flex align-items-center">
              <RadioButton v-model="gender" inputId="gender1" name="gender" value="ชาย"/>
              <label for="gender1" class="ml-2">ชาย</label>
            </div>
            <div class="flex align-items-center">
              <RadioButton v-model="gender" inputId="gender2" name="gender" value="หญิง"/>
              <label for="gender2" class="ml-2">หญิง</label>
            </div>
            <div class="flex align-items-center">
              <RadioButton v-model="gender" inputId="gender3" name="gender" value="other"/>
              <label for="gender3" class="ml-2">อื่นๆ</label>
            </div>
          </div>

          <div v-if="gender === 'other'" class="flex flex-col flex-grow">
            <InputText class="input_text" placeholder="โปรดระบุ" v-model="otherGender"
                       required/>
          </div>
          <!--          Age-->
          <div class="form-group col">
            <label for="txt_age">อายุ </label>
            <InputText class="input_text" placeholder="อายุ" id="txt_age" v-model="age"
                       required/>
          </div>
            <!--          Weight-->
            <div class="form-group flex-col">
              <label for="input_weight">น้ำหนัก </label>
              <InputText class="input_text" placeholder="น้ำหนัก" id="txt_weight" v-model="weight"
                         required/>
            </div>
            <!--          Height-->
            <div class="form-group flex-col">
              <label for="txt_height">ส่วนสูง </label>
              <InputText class="input_text" placeholder="ส่วนสูง" id="txt_height" v-model="height"
                         required/>
            </div>
          <!--          Service-->
          <p>บริการที่สนใจ</p>
          <div class="form-group flex-wrap">
            <div v-for="(service1, index) in service_items1" :key="service1" class="flex align-items-center">
              <Checkbox v-model="services" :inputId="'service1_'+index" name="service" :value="service1"/>
              <label :for="'service1_'+index" class="ml-2"> {{ service1 }} </label>
            </div>
          </div>
          <hr>
          <div class="form-group flex-wrap">
            <div v-for="(service2, index) in service_items2" :key="service2" class="flex align-items-center">
              <Checkbox v-model="services" :inputId="'service2_'+index" name="service" :value="service2"/>
              <label :for="'service2_'+index" class="ml-2"> {{ service2 }} </label>
            </div>
          </div>
          <!--          Date Time-->
          <!--          <div class="form-group col">-->
          <!--            <label for="txt_date">วันที่, เวลาที่สะดวก <span class="txt_red">*</span></label>-->
          <!--            <Calendar id="txt_date" :minDate="minDate" placeholder="วันที่, เวลาที่สะดวก" v-model="date" showTime-->
          <!--                      hourFormat="24"/>-->
          <!--          </div>-->
          <div class="form-group row">
            <Button class="btn_submit" type="submit" severity="info" @click="register('message')" label="สมัครสมาชิก"/>
          </div>
        </form>
      </template>
    </Card>
  </template>

</template>

<script>

// import liff from "@line/liff";

export default {
  name: 'RegisterComp',
  props: {},
  data() {
    return {
      name: "",
      tel: "",
      gender: "",
      age: "",
      weight: "",
      height: "",
      services: [],
      otherGender: "",
      service_items1: [
        "ดูดไขมันแขน + หัวไหล่",
        "ดูดไขมันท้องบน-ล่าง",
        "ดูดไขมันเอวเอส",
        "ดูดไขมันแผ่นหลัง",
        "ดูดไขมันขานอก + ขาด้านหลัง",
        "ดูดไขมันขาใน + ขาด้านหน้า",
        "ดูดไขมันน่อง",
        "ดูดไขมันเหนียง แก้ม กรอบหน้า",
        "ดูดไขมันนมน้อย"
      ],
      service_items2: [
        "เติมไขมันหน้าเด็ก",
        "เติมไขมันหน้าอก",
        "เติมไขมันสะโพก",
        "เติมไขมันมือ",
        "เติมไขมันน้องสาว",
        "ตัดหนังหน้าท้อง",
        "เสริมหน้าอกซิลิโคน"
      ],
      minDate: new Date(),
      date: new Date(),
      loading: false
    }
  },
  mounted() {
    // console.log("mount")
    // // * Config Line Liff
    // liff.init({liffId: "2003492788-kZQp2v5N", withLoginOnExternalBrowser: true}).then(async () => {
    //   // ^ Check Line Liff Login ?
    //   if (liff.isLoggedIn()) {
    //     const profile = await liff.getProfile()
    //     console.log("profile => ", profile)
    //     this.loading = false
    //   } else {
    //     liff.login()
    //   }
    // })
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
        console.log({formatDate})
        const mapService = this.services.reduce((accumulator, currentLine) => (accumulator + currentLine + '\n'), '')
        const text = `เพศ${this.gender === 'other' ? this.otherGender : this.gender}\n
            อายุ ${this.age} ปี\n
            น้ำหนัก ${this.weight} kg\n
            ส่วนสูง ${this.height} cm\n
            ${mapService}`
        // liff.sendMessages([
        //   {
        //     type: "text",
        //     text
        //     // text: `ลงทะเบียนเข้ารับคำปรึกษา\nชื่อ: ${this.name}\nเบอร์โทร: ${this.tel}\nวัน-เวลาที่นัด : ${formatDate}`
        //   }
        // ])
      }
      // liff.closeWindow()
    }
  }
}
</script>

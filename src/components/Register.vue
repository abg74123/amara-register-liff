<template>
  <div v-if="loading">
    LOADING
  </div>
  <template v-else>
    <Card>
      <template #title>ประเมินค่ารักษา</template>
      <template #content>
        <form @submit.prevent="register">
          <div style="text-align:center;">
            <img style="width:100%;" src="../assets/logo.jpg" alt="ตำแหน่งดูดไขมัน">
          </div>
          <!--          **Full Name-->
          <!--          <div class="form-group flex flex-col">-->
          <!--            <label for="txt_name">ชื่อ-นามสกุล <span class="text-red">*</span></label>-->
          <!--            <InputText class="input_text" placeholder="ชื่อ-นามสกุล" id="txt_name" type="text" v-model="name" required/>-->
          <!--          </div>-->
          <!--          **Phone Number-->
          <!--          <div class="form-group flex flex-col">-->
          <!--            <label for="txt_tel">เบอร์โทร <span class="text-red">*</span></label>-->
          <!--            <InputMask class="input_text" placeholder="เบอร์โทร" id="txt_tel" v-model="tel" mask="999-999-9999"-->
          <!--                       required/>-->
          <!--          </div>-->
          <!--          **Date Time-->
          <!--          <div class="form-group flex flex-col">-->
          <!--            <label for="txt_date">วันที่, เวลาที่สะดวก <span class="text-red">*</span></label>-->
          <!--            <Calendar id="txt_date" :minDate="minDate" placeholder="วันที่, เวลาที่สะดวก" v-model="date" showTime-->
          <!--                      hourFormat="24"/>-->
          <!--          </div>-->

          <!--          **Gender-->
          <p>เพศ <span class="text-red">*</span></p>
          <div class="form-group flex flex-row">
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

          <!--          <div v-if="gender === 'other'" class="flex flex-col flex-grow">-->
          <!--            <div class="form-group">-->
          <!--              <InputText class="input_text" placeholder="โปรดระบุ" v-model="otherGender"-->
          <!--                         required/>-->
          <!--            </div>-->
          <!--          </div>-->
          <!--          **Age-->
          <div class="form-group flex flex-col">
            <label for="txt_age">อายุ <span class="text-red">*</span></label>
            <InputText class="input_text" placeholder="อายุ" id="txt_age" v-model="age"
                       required/>
          </div>
          <!--          **Weight-->
          <div class="form-group flex flex-col">
            <label for="input_weight">น้ำหนัก <span class="text-red">*</span></label>
            <InputText class="input_text" placeholder="น้ำหนัก" id="txt_weight" v-model="weight"
                       required/>
          </div>
          <!--          **Height-->
          <div class="form-group flex flex-col">
            <label for="txt_height">ส่วนสูง <span class="text-red">*</span></label>
            <InputText class="input_text" placeholder="ส่วนสูง" id="txt_height" v-model="height"
                       required/>
          </div>
          <!--          **Service-->
          <p>บริการที่สนใจ <span class="text-red">*</span></p>
          <div class="form-group flex  flex-wrap">
            <div v-for="(service1, index) in service_items1" :key="service1" class="flex align-items-center">
              <Checkbox v-model="services" :inputId="'service1_'+index" name="service" :value="service1"/>
              <label :for="'service1_'+index" class="ml-2"> {{ service1 }} </label>
            </div>
          </div>
          <hr>
          <div class="form-group flex flex-wrap">
            <div v-for="(service2, index) in service_items2" :key="service2" class="flex align-items-center">
              <Checkbox v-model="services" :inputId="'service2_'+index" name="service" :value="service2"/>
              <label :for="'service2_'+index" class="ml-2"> {{ service2 }} </label>
            </div>
          </div>
          <div class="form-group flex flex-row">
            <Button class="btn-submit" type="submit" severity="info" @click="register('message')"
                    :disabled="handleValidateForm()" label="ประเมินค่ารักษา"/>
          </div>
        </form>
      </template>
    </Card>
  </template>

</template>

<script>

import liff from "@line/liff";
import {handleError} from "vue";

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
    handleError,
    register(type) {
      console.log("register Func")
      if (type === 'message') {
        // EX: 8 มี.ค. 2567 16:25น.
        // * Convert Format Date Time
        const monthNamesThai = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
        const day = ("0" + this.date.getDate()).slice(-2)
        const month = monthNamesThai[this.date.getMonth()]
        const year = this.date.getFullYear() + 543
        const hours = ("0" + this.date.getHours()).slice(-2)
        const minutes = ("0" + this.date.getMinutes()).slice(-2)
        const formatDate = `${day} ${month} ${year} ${hours}:${minutes}น.`
        console.log({formatDate})
        // * Map Text Message
        const mapService = this.services.reduce((accumulator, currentValue, index) => {
          if (index < this.services.length - 1) {
            return accumulator + currentValue + '\n'
          } else {
            return accumulator + currentValue;
          }
        }, '')
        const text = `เพศ${this.gender === 'other' ? 'อื่นๆ' : this.gender}\nอายุ ${this.age} ปี\nน้ำหนัก ${this.weight} kg\nส่วนสูง ${this.height} cm\n${mapService}`
        console.log("text => ", text)
        // liff.sendMessages([
        //   {
        //     type: "text",
        //     text
        //     // text: `ลงทะเบียนเข้ารับคำปรึกษา\nชื่อ: ${this.name}\nเบอร์โทร: ${this.tel}\nวัน-เวลาที่นัด : ${formatDate}`
        //   }
        // ])
      }
      // liff.closeWindow()
    },
    handleValidateForm() {
      return !(this.services.length && this.gender && this.age && this.weight && this.height)
    }
  }
}
</script>

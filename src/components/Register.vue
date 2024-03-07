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
            <div class="form-group row">
          <Button type="submit" severity="info" label="สมัครสมาชิก"/>
            </div>
        </form>

          <Button type="submit" severity="info" label="สมัครสมาชิก + Flex Message" @click="registerFlex"/>

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
    },
    registerFlex(){
         console.log("registerFlex Func")
      liff.sendMessages([
        {
          type: "flex",
           altText: "This is a Flex Message",
          contents: {
  "type": "bubble",
  "hero": {
    "type": "image",
    "url": "https://amara-clinic.com/wp-content/uploads/2024/02/Amara-logo_11zon.webp",
    "size": "full",
    "aspectRatio": "20:13",
    "aspectMode": "cover",
    "action": {
      "type": "uri",
      "uri": "http://linecorp.com/"
    }
  },
  "body": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "text",
        "text": "คิวนัดหมายปรึกษา",
        "weight": "bold",
        "size": "xl"
      },
      {
        "type": "box",
        "layout": "vertical",
        "margin": "lg",
        "spacing": "sm",
        "contents": [
          {
            "type": "box",
            "layout": "baseline",
            "spacing": "sm",
            "contents": [
              {
                "type": "text",
                "text": "ชื่อ",
                "color": "#AAAAAA",
                "size": "sm",
                "flex": 1
              },
              {
                "type": "text",
                "text": this.fName,
                "wrap": true,
                "color": "#666666",
                "size": "sm",
                "flex": 5,
                "weight": "bold"
              }
            ]
          },
          {
            "type": "box",
            "layout": "baseline",
            "spacing": "sm",
            "contents": [
              {
                "type": "text",
                "text": "เบอร์",
                "color": "#AAAAAA",
                "size": "sm",
                "flex": 1
              },
              {
                "type": "text",
                "text": this.tel,
                "wrap": true,
                "color": "#666666",
                "size": "sm",
                "flex": 5,
                "weight": "bold"
              }
            ]
          }
        ]
      },
      {
        "type": "box",
        "layout": "baseline",
        "spacing": "sm",
        "contents": [
          {
            "type": "text",
            "text": "วันที่",
            "color": "#AAAAAA",
            "size": "sm",
            "flex": 1
          },
          {
            "type": "text",
            "text": "8 มี.ค. 2567",
            "wrap": true,
            "color": "#666666",
            "size": "sm",
            "flex": 5,
            "weight": "bold"
          }
        ]
      }
    ]
  },
  "footer": {
    "type": "box",
    "layout": "vertical",
    "spacing": "sm",
    "contents": [
      {
        "type": "button",
        "style": "link",
        "height": "sm",
        "action": {
          "type": "uri",
          "label": "WEBSITE",
          "uri": "https://amara-clinic.com/"
        }
      },
      {
        "type": "box",
        "layout": "vertical",
        "contents": [],
        "margin": "sm"
      }
    ],
    "flex": 0
  }
}
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


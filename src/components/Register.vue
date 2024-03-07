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
        },
        {
          type: "flex",
          contents:{
  "type": "bubble",
  "hero": {
    "type": "image",
    "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
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
        "text": "Brown Cafe",
        "weight": "bold",
        "size": "xl"
      },
      {
        "type": "box",
        "layout": "baseline",
        "margin": "md",
        "contents": [
          {
            "type": "icon",
            "size": "sm",
            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
          },
          {
            "type": "icon",
            "size": "sm",
            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
          },
          {
            "type": "icon",
            "size": "sm",
            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
          },
          {
            "type": "icon",
            "size": "sm",
            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
          },
          {
            "type": "icon",
            "size": "sm",
            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png"
          },
          {
            "type": "text",
            "text": "4.0",
            "size": "sm",
            "color": "#999999",
            "margin": "md",
            "flex": 0
          }
        ]
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
                "text": "Place",
                "color": "#aaaaaa",
                "size": "sm",
                "flex": 1
              },
              {
                "type": "text",
                "text": "Miraina Tower, 4-1-6 Shinjuku, Tokyo",
                "wrap": true,
                "color": "#666666",
                "size": "sm",
                "flex": 5
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
                "text": "Time",
                "color": "#aaaaaa",
                "size": "sm",
                "flex": 1
              },
              {
                "type": "text",
                "text": "10:00 - 23:00",
                "wrap": true,
                "color": "#666666",
                "size": "sm",
                "flex": 5
              }
            ]
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
          "label": "CALL",
          "uri": "https://linecorp.com"
        }
      },
      {
        "type": "button",
        "style": "link",
        "height": "sm",
        "action": {
          "type": "uri",
          "label": "WEBSITE",
          "uri": "https://linecorp.com"
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


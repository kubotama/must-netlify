<template>
  <div class="must-ui">
    <div class="must-title">Markup Support Tool</div>
    <div>
      <button id='mdEscapeButton' @click=onMdEscape>Markdownのエスケープ</button>
      <button id='mdLinkButton' @click=onMdLink>Markdownのリンク</button>
    </div>
    <textarea class='must-area' id='mustArea' placeholder="文字列を入力してください" v-model="mustArea"></textarea>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: 'MustUi',
  data() {
    return {
      mustArea: ''
    }
  },
  methods: {
    onMdEscape() {
      let text = this.mustArea
      text = text.replace(/\\/g, '\\\\')
      text = text.replace(/\*/g, '\\*')
      text = text.replace(/_/g, '\\_')
      text = text.replace(/`/g, '\\`')
      text = text.replace(/#/g, '\\#')
      text = text.replace(/\+/g, '\\+')
      text = text.replace(/-/g, '\\-')
      this.mustArea = text
    },
    async onMdLink() {
      if (this.mustArea.length == 0) {
        return
      }
      const url = this.getFunctionUrl(window.location.href) + "?url=" + this.mustArea
      const res = await axios.get(url)
      if (res.status == 200) {
        this.mustArea = '[' + res.data + "](" + this.mustArea + ")"
      }
    },
    getFunctionUrl(pageUrl) {
      const url = new URL(pageUrl);
      if (url.hostname === "localhost") {
        url.port = 9999;
      }
      url.pathname = ".netlify/functions/title";
      return url.href;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.must-area {
  padding: 6pt;
  width: 60%;
  min-height: 300pt;
}

.must-title {
  font-size: 200%;
  padding: 1%;
  font-weight: bold;
}
</style>

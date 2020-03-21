<template>
  <div class="must-ui">
    <div class="must-title">Markup Support Tool</div>
    <div>
      <button id='mdEscapeButton' @click=onMdEscape>Markdownのエスケープ</button>
      <button id='mdLinkButton'>Markdownのリンク</button>
    </div>
    <textarea class='must-area' id='mustArea' placeholder="文字列を入力してください" v-model="mustArea"></textarea>
  </div>
</template>

<script>
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
      text = text.replace(/\./g, '\\.')
      text = text.replace(/!/g, '\\!')
      text = text.replace(/\{/g, '\\{')
      text = text.replace(/\}/g, '\\}')
      text = text.replace(/\[/g, '\\[')
      text = text.replace(/\]/g, '\\]')
      text = text.replace(/\(/g, '\\(')
      text = text.replace(/\)/g, '\\)')
      this.mustArea = text
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

<template>
  <div class="must-ui">
    <div class="must-title">Markup Support Tool</div>
    <textarea class='must-area' id='mustArea' rows="10" cols="50" placeholder="文字列を入力してください"></textarea>
  </div>
</template>

<script>
export default {
  name: 'MustUi'
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
}

.must-title {
  font-size: 200%;
  padding: 1%;
}
</style>

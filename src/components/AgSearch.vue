<template>
  <div class="row col-xs-6 col-md-4 items-center q-col-gutter-sm">
    <div style="position: relative" class="full-width">
      <q-input ref="search" @input="val => $emit('input', val)" :value="value" label="Buscar" standard type="search" class="input-search" :style="{ width: width + '%' }"/>
      <q-icon name="search" size="sm" color="primary" @click="toggle" class="float-right cursor-pointer"/>
    </div>
  </div>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {
      width: 0
    }
  },
  created () {
    window.onkeyup = (e) => {
      if (e.keyCode === 27) {
        this.toggle()
      }
    }
  },
  methods: {
    toggle () {
      if (this.width === 0) {
        this.width = 90
        this.$refs.search.focus()
      } else {
        this.width = 0
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  .input-search
    -webkit-transition width 500ms
    transition width 500ms
    position absolute
    right 0
    margin-right 10%
    transform translateY(-40%)
    -webkit-transform translateY(-40%)
</style>

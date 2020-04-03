<template>
  <div class="row header justify-center bg-white">
    <q-btn flat color="negative" @click="$emit('fechar')" class="col-xs-6 col-sm-6 col-md-3 col-lg-3" :label="textoFechar"></q-btn>
    <q-btn v-if="salvando === null" flat color="positive" @click="$emit('salvar')" class="col-xs-6 col-sm-6 col-md-3 col-lg-3" :label="textoSalvar"></q-btn>
    <q-btn v-else flat color="positive" @click="$emit('salvar')" class="col-xs-6 col-sm-6 col-md-3 col-lg-3" :label="textoSalvar" :loading="salvando">
      <span slot="loading">Gravando...</span>
    </q-btn>
  </div>
</template>
<script>
export default {
  props: {
    textoSalvar: { default: 'salvar' },
    textoFechar: { default: 'cancelar' },
    salvando: { default: null, required: false }
  }
}
</script>
<style scoped>
.header{
  height: 83px;
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  z-index: 1;
  position: sticky;
  top: 50px;
}
</style>

<template>
  <div></div>
</template>

<script>
import utils from 'src/lib/utils'

export default {
  data () {
    return {
      utils,
      name: '',
      single: {},
      operation: ''
    }
  },
  methods: {
    antesGet () {},
    depoisGet () {},
    antesExcluir () {},
    depoisExcluir () {},
    antesSalvar () {},
    depoisSalvar () {},
    antesCancelar () {},
    depoisCancelar () {},
    async pegaSingle (id) {
      await this.antesGet()
      this.$http.request({
        url: this.name + '/Buscar',
        params: { id }
      }).then(
        response => {
          this.single = response.data
          this.depoisGet()
        }
      )
    },
    inserir (data) {
      return this.$http.request({
        url: this.name + '/Incluir',
        method: 'post',
        data: data
      })
    },
    atualizar (data) {
      return this.$http.request({
        url: this.name + '/Alterar',
        method: 'put',
        data: data
      }).then(response => {
        return response.data
      })
    },
    async excluir (id) {
      await this.antesExcluir()
      return this.$http.request({
        url: this.name + '/Excluir',
        method: 'delete',
        params: { id }
      }).then(response => {
        return response.data
      })
    },
    async excluirChamado (id) {
      await this.antesExcluir()
      this.$http.request({
        url: this.name + '/ExcluirChamado',
        method: 'delete',
        params: { id: id }
      }).then(() => {
        this.depoisExcluir(id)
      })
    },
    async salvar () {
      let novoSingle = {}
      this.antesSalvar()
      if (this.operation === 'inserir') novoSingle = await this.inserir(this.single)
      else if (this.operation === 'atualizar') novoSingle = await this.atualizar(this.single)
      this.depoisSalvar(novoSingle)
      this.fechaPagina()
    },
    cancelar () {
      this.antesCancelar()
      this.fechaPagina()
      this.depoisCancelar()
    },
    fechaPagina () {
      this.$router.go(-1)
    }
  },
  mounted () {
    let id = null
    if (this.$route.path.toLowerCase().indexOf('/criar') >= 0) {
      this.operation = 'inserir'
      id = -1
    } else if (this.$route.path.toLowerCase().indexOf('/atualizar') >= 0) {
      this.operation = 'atualizar'
      id = this.$route.params.id
    }
    this.pegaSingle(id)
  }
}
</script>

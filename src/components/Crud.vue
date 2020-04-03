<template>
  <div></div>
</template>

<script>
import utils from 'src/lib/utils'

export default {
  data () {
    return {
      utils,
      list: [],
      methodName: null,
      loading: false,
      pagination: { rowsPerPage: 0 },
      listCopia: [],
      filtro: '',
      novaAba: false
    }
  },
  watch: {
    filtro () {
      this.filtroTabela()
    }
  },
  created () {
    window.onkeydown = e => {
      this.novaAba = e.ctrlKey
    }
  },
  mounted () {
    window.onkeyup = e => {
      this.novaAba = e.ctrlKey
    }
    this.pegaLista()
  },
  methods: {
    antesListar () {},
    depoisListar () {},
    antesEditar () {},
    antesAdicionar () {},
    antesExcluir () {},
    depoisExcluir (id) {},
    async pegaLista () {
      this.loading = true
      await this.antesListar()
      this.$http.request({
        url: this.name + '/' + (this.methodName ? this.methodName : 'Listar'),
        method: 'get'
      }).then(response => {
        this.list = response.data
        this.listCopia = utils.copyArray(this.list)
        this.loading = false
        this.depoisListar()
      })
    },
    async irParaAdicionar () {
      await this.antesAdicionar()
      this.$router.push('/' + this.name + '/criar')
    },
    async irParaEditar (id) {
      await this.antesEditar()
      if (this.novaAba) {
        this.$router.openNewTab('#/' + this.name + '/atualizar/' + id)
      } else {
        this.$router.push('/' + this.name + '/atualizar/' + id)
      }
    },
    async excluir (id) {
      await this.antesExcluir()
      this.$http.request({
        url: this.name + '/Excluir',
        method: 'delete',
        params: { id: id }
      }).then(response => {
        this.depoisExcluir(id)
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
    filtroTabela () {
      if (this.name === 'Processo') {
        this.list = this.listCopia.filter(item => {
          return (
            item.NumeroProcesso.toString().includes(this.filtro) ||
            item.NumeroCadastroEmpresa?.toLowerCase().includes(this.filtro.toLowerCase()) ||
            item.NUP?.toLowerCase().includes(this.filtro.toLowerCase()) ||
            item.TipoRequerimento?.toLowerCase().includes(this.filtro.toLowerCase()) ||
            item.Superintendencia?.toLowerCase().includes(this.filtro.toLowerCase()) ||
            item.UF?.toLowerCase().includes(this.filtro.toLowerCase()) ||
            item.UnidadeProtocolizadora?.toLowerCase().includes(this.filtro.toLowerCase()) ||
            item.Fase?.Nome.toLowerCase().includes(this.filtro.toLowerCase())
          )
        })
      } else {
        this.list = this.listCopia.filter(item => {
          return (
            item.Nome?.toLowerCase().includes(this.filtro.toLowerCase())
          )
        })
      }
    }
  }
}
</script>

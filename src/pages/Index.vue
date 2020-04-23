<template>
  <q-page class="flex flex-center">
    <!-- <img alt="Quasar logo" src="~assets/quasar-logo-full.svg"> -->
    <q-list bordered class="rounded-borders">
      <q-expansion-item expand-separator dense v-for="processo in processos" :key="processo.Id">
        <template v-slot:header>
          <q-item-section class="row justify-between">
            {{processo.NumeroProcesso}} - {{processo.PessoaRelacionada}} - {{processo.Fase}} - {{processo.Pontuacao}}
          </q-item-section>
        </template>
        <q-card>
          <q-card-section>
            <div v-for="evento in processo.Eventos" :key="evento.Id" class="row justify-between">
              <div class="col-10"> {{evento.TipoEvento.Nome}} </div>
              <div class="col-2"> {{evento.TipoEvento.Pontuacao}} </div>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      processos: []
    }
  },
  mounted () {
    this.pegaProcessosAtualizados()
  },
  methods: {
    pegaProcessosAtualizados () {
      this.$http.request({ url: 'Processo/ListarAtualizados' }).then(response => {
        this.processos = response.data.map(processo => {
          let pontuacao = 0
          processo.Eventos.forEach(evento => {
            pontuacao += evento.TipoEvento.Pontuacao
          })
          return {
            NumeroProcesso: processo.NumeroProcesso,
            PessoaRelacionada: processo.PessoasRelacionadas.length ? processo.PessoasRelacionadas[0].Nome : 'Não Cadastrado',
            Fase: processo.Fase ? processo.Fase.Nome : 'Não Cadastrado',
            Pontuacao: pontuacao,
            Eventos: processo.Eventos
          }
        })
      })
    }
  }
}
</script>

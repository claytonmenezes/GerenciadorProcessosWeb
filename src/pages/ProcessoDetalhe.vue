<template>
  <div>
    <ag-salvar-fechar @salvar="salvar" @fechar="cancelar"/>
    <div class="row q-col-gutter-sm justify-center">
      <div class="col-4">
        <q-card flat bordered class="my-card">
          <q-card-section class="row justify-between">
            <div class="text-h6">Dados do Processo</div>
            <div><q-checkbox v-model="single.Ativo" label="Ativo"/></div>
          </q-card-section>
          <q-separator inset />
          <q-card-section>
            <q-list>
              <q-item>
                <q-item-section>
                  <q-input v-model="single.NumeroProcesso" label="Número do processo"/>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-input v-model="single.NumeroCadastroEmpresa" label="Número do processo de Cadastro da Empresa"/>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-input v-model="single.NUP" label="NUP"/>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-input v-model="single.Area" label="Área (ha)"/>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-input v-model="single.TipoRequerimento" label="Tipo de requerimento"/>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-input v-model="single.Superintendencia" label="Superintendência"/>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-select v-model="single.UF" label="UF" :options="ufs"/>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-input v-model="single.UnidadeProtocolizadora" label="Unidade protocolizadora"/>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-input v-model="single.DataProtocolo" label="Data Protocolo">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date v-model="single.DataProtocolo" mask="DD/MM/YYYY"/>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-input v-model="single.DataPrioridade" label="Data Prioridade">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date v-model="single.DataPrioridade" mask="DD/MM/YYYY"/>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-8">
        <q-card flat bordered class="my-card">
          <q-card-section>
            <div class="text-h6">Dados do Processo</div>
          </q-card-section>
          <q-separator inset />
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import CrudDetalhe from 'components/CrudDetalhe'
import AgSalvarFechar from 'components/AgSalvarFechar'
import utils from 'src/lib/utils'

export default {
  extends: CrudDetalhe,
  components: { AgSalvarFechar },
  data () {
    return {
      name: 'Processo',
      ufs: []
    }
  },
  methods: {
    async antesGet () {
      this.ufs = await utils.Ufs()
      this.ufs = this.ufs.map(uf => { return uf.sigla })
    },
    depoisGet () {
      this.single.DataProtocolo = utils.formataData(this.single.DataProtocolo)
      this.single.DataPrioridade = utils.formataData(this.single.DataPrioridade)
    },
    fechaPagina () {
      this.$router.push('/')
    }
  }
}
</script>

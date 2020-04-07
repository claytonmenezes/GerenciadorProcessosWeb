<template>
    <div>
      <div class="row justify-between q-mb-sm">
        <q-btn flat color="primary" @click="irParaAdicionar()" label="Adicionar"/>
        <ag-search v-model="filtro"/>
      </div>
      <q-table :data="list" :columns="columns" table-style="max-height: 800px" row-key="Id" virtual-scroll :rows-per-page-options="[0]" hide-bottom :pagination.sync="pagination" :loading="loading">
        <template #body="props">
          <q-tr :props="props" style="cursor: pointer" @click.native="irParaEditar(props.row.Id)">
            <q-td key="NumeroProcesso" :props="props">{{ props.row.NumeroProcesso }}</q-td>
            <q-td key="NUP" :props="props">{{ props.row.NUP }}</q-td>
            <q-td key="Fase" :props="props">{{ props.row.Fase.Nome }}</q-td>
            <q-td key="Ativo" :props="props"><q-checkbox v-model="props.row.Ativo" disable/></q-td>
            <q-td key="TipoRequerimento" :props="props">{{ props.row.TipoRequerimento }}</q-td>
            <q-td align="right" key="Excluir"> <q-icon class="q-pr-xl" size="sm" @click.stop="excluir(props.row.Id)" color="red" name="delete"/> </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
</template>

<script>
import Crud from 'components/Crud'

export default {
  extends: Crud,
  data () {
    return {
      name: 'Processo',
      columns: [
        { name: 'NumeroProcesso', label: 'Numero do Processo', field: 'NumeroProcesso', align: 'left' },
        { name: 'NUP', label: 'NUP', field: 'NUP', align: 'left' },
        { name: 'Fase', label: 'Fase', field: 'Fase', align: 'left' },
        { name: 'Ativo', label: 'Ativo', field: 'Ativo', align: 'left' },
        { name: 'TipoRequerimento', label: 'Tipo de Requerimento', field: 'TipoRequerimento', align: 'left' },
        { name: 'Excluir', align: 'right' }
      ],
      pagination: { rowsPerPage: 0 },
      methodName: 'ListarAtualizados'
    }
  },
  methods: {
    depoisExcluir (id) {
      const index = this.list.findIndex(single => single.Id === id)
      this.list.splice(index, 1)
    }
  }
}
</script>

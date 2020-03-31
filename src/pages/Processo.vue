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
            <q-td align="right" key="Excluir"> <q-icon class="q-pr-xl" @click.stop="excluir(props.row.Id)" color="red" name="delete"/> </q-td>
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
        { name: 'Excluir', align: 'right' }
      ],
      pagination: { rowsPerPage: 0 }
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

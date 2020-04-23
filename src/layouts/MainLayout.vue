<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary text-black bg-grey-5">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />
        <q-toolbar-title>
          Gerenciador Processos
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="left" :width="200" :breakpoint="500" bordered content-class="bg-grey-3">
      <q-scroll-area class="fit">
        <q-list v-for="(menuItem, index) in menuList" :key="index" padding class="menu-list">
          <q-item clickable :to="menuItem.rota">
            <q-item-section avatar>
              <q-icon :name="menuItem.icone" />
            </q-item-section>
            <q-item-section>
              {{ menuItem.label }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container class="q-ma-md">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      left: true,
      menuList: [
        { icone: 'home', label: 'Início', rota: '/Inicio' },
        { icone: 'book', label: 'Processo', rota: '/Processo' }
      ]
    }
  }
}
</script>

<style lang="sass" scoped>
.menu-list .q-item
  border-radius: 0 32px 32px 0
</style>

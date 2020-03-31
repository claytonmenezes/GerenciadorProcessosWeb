<template>
  <div>
    <q-card class="row col-12 justify-center q-gutter-md">
      <q-card-section class="col-12 row justify-center">
        <div class="text-h3">Redefinir Senha</div>
      </q-card-section>
      <q-card-section class="col-12 row justify-center q-gutter-md">
        <q-form @submit="redefinir" class="row justify-center q-gutter-sm">
          <q-input filled type="password" v-model="novaSenha" label="Nova Senha *" lazy-rules :rules="[ val => !!val || 'Digite a senha' ]" />
          <q-input filled type="password" v-model="confirmaSenha" label="Confirmar Senha *" lazy-rules :rules="[ val => val == novaSenha || 'Senhas diferentes' ]" />
          <div class="col-12 row justify-center">
            <q-btn label="Logar" type="submit" color="primary" class="q-ma-md"/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import axios from 'axios'
import global from 'src/lib/globals'
import token from 'src/lib/token'

export default {
  data () {
    return {
      email: this.$root._route.params.email,
      novaSenha: '',
      confirmaSenha: ''
    }
  },
  methods: {
    redefinir () {
      if (this.novaSenha === this.confirmaSenha) {
        const sha = require('sha.js')
        const senha = sha('sha256').update(this.novaSenha).digest('hex')
        axios({
          method: 'post',
          url: global.urlApi + '/ExpiraSenha/RedefineSenha',
          params: { email: this.email, senha: senha }
        }).then(response => {
          token.authenticate(this.email, this.novaSenha).then(() => {
            this.$router.push('/')
          })
        }).catch(erro => {
          this.$q.notify({
            title: 'Erro',
            message: erro.message,
            color: 'red'
          })
        })
      }
    }
  }
}
</script>

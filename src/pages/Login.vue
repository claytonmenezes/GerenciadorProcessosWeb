<template>
  <div class="row justify-center q-my-xl">
    <div class="col-6">
      <q-card class="row col-12 justify-center q-gutter-md">
        <q-card-section class="col-12 row justify-center">
          <div class="text-h3"> Gerenciador Processos </div>
        </q-card-section>
        <q-card-section class="col-12 row justify-center q-gutter-md">
          <q-form @submit="autenticar" class="row justify-center q-gutter-sm">
            <q-input filled v-model="email" label="E-mail *" lazy-rules :rules="[ val => val && val.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi) || 'Email inválido']" />
            <q-input filled type="password" v-model="senha" label="Senha *" lazy-rules :rules="[ val => !!val || 'Digite a senha' ]" />
            <div class="col-12 row justify-center">
              <q-btn label="Logar" type="submit" color="primary" class="q-ma-md"/>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import token from 'src/lib/token'

export default {
  data () {
    return {
      email: '',
      senha: ''
    }
  },
  methods: {
    autenticar () {
      token.authenticate(this.email, this.senha).then(() => {
        this.$router.push('/')
      }).catch(error => {
        if (error.message.includes('Expirada')) {
          this.$router.push('ExpiraSenha/' + this.email)
        }
        this.$q.notify({
          title: 'Erro',
          message: error.message,
          color: 'red'
        })
      })
    }
  }
}
</script>

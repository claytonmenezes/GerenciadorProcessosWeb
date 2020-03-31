
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/Inicio', component: () => import('pages/Index.vue') },
      { path: '/Processo', component: () => import('pages/Processo') },
      { path: '/Processo/criar', component: () => import('pages/ProcessoDetalhe') },
      { path: '/Processo/atualizar/:id', component: () => import('pages/ProcessoDetalhe') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push(
    { path: '*', component: () => import('pages/Error404.vue') },
    { path: '/Login', component: () => import('pages/Login.vue') },
    { path: '/ExpiraSenha/:email', component: () => import('pages/ExpiraSenha.vue') }
  )
}

export default routes

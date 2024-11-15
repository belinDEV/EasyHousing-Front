import { createRouter, createWebHistory } from 'vue-router';
import LayoutAdmin from '../layouts/LayoutAdmin.vue';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/imovel/:urn',
      name: 'imovel-by-urn',
      component: () => import('../views/ImovelView.vue')
    },
    {
      path: '/admin',
      component: LayoutAdmin,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('../views/admin/Dashboard.vue')
        },
        {
          path: 'imoveis',
          name: 'imoveis',
          component: () => import('../views/admin/Imoveis.vue')
        },
        {
          path: 'corretores',
          name: 'corretores',
          component: () => import('../views/admin/Corretores.vue')
        },
        {
          path: 'users',
          name: 'users',
          component: () => import('../views/admin/Users.vue')
        },

        // Rotas de alterar
        {
          path: 'atualizar/imovel/:id',
          name: 'atualizar-imovel',
          component: () => import('../views/admin/cadastrar/Imovel.vue')
        },
        {
          path: 'alterar/user/:id',
          name: 'alterar-user',
          component: () => import('../views/admin/cadastrar/User.vue')
        },
        {
          path: 'alterar/corretor/:id',
          name: 'alterar-corretor',
          component: () => import('../views/admin/cadastrar/Corretor.vue')
        },
        // Rotas de cadastrar
        {
          path: 'cadastrar/imovel/:id',
          name: 'cadastrar-imovel',
          component: () => import('../views/admin/cadastrar/Imovel.vue')
        },
        {
            path: 'cadastrar/corretor/:id',
            name: 'cadastrar-corretor',
            component: () => import('../views/admin/cadastrar/Corretor.vue')
          
        },
        {
          path: 'cadastrar/user',
          name: 'cadastrar-user',
          component: () => import('../views/admin/cadastrar/User.vue')
        }
      ]
    },

    // Rota de captura para páginas não encontradas
    {
      path: '/:pathMatch(.*)*', // Captura todas as rotas que n existe
      name: 'NotFound',
      component: () => import('../components/Error.vue')
    },
  ]
});

export default router;

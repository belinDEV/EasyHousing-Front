<!-- LayoutAdmin.vue -->
<template>
  <body>
    <div class="admin-layout">
      <div class="container-fluid">
        <nav class="row h-100">
          <div class="col-xl-2 col-md-3 col-md-4 pe-0 h-100">
            <NavigationPainel />
          </div>
          <div class="col-xl-10 col-md-9 col-sm-8 px-0 h-100 d-flex flex-column">
            <nav class="navbar">
              <div class="div_imagem">
                <img id="logo_painel" src="./../assets/imagens/logo.webp" alt="Logo EasyHousing" />
              </div>
            </nav> 
            <div class="content flex-grow-1">
              <router-view />
            </div>
          </div>
        </nav>
      </div>
    </div>
  </body>
</template>

<script setup>
import './admin.css';
import { RouterView } from 'vue-router';
import NavigationPainel from '@/components/adminFolder/NavigationPainel.vue';
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

.admin-layout {
  background-color: #515050;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.container-fluid {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.row {
  flex: 1;
  display: flex;
  flex-wrap: nowrap;
}

.col-xl-10, .col-md-9, .col-sm-8 {
  height: 100%;
  overflow-y: auto;
}

.navbar {
  background-color: #bec7c9;
  padding: 1rem;
  border-bottom: 1px solid rgb(38, 39, 38);
}

.admin-layout .line-form {
  width: 100%;
  height: 1px;
  background-color: #0f5;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.admin-layout label {
  color: #fff;
  font-size: 14pt;
}

.admin-layout input {
  color: #fff;
  background-color: #212121;
  border: 1px solid #0f5;
  border-radius: 4px;
  font-size: 14pt;
  padding: 5px;
  width: 100%;
  outline: none;
}

.admin-layout input:focus {
  border: 1px solid #fff;
}

.admin-layout textarea {
  color: #fff;
  background-color: #212121;
  border: 1px solid #0f5;
  border-radius: 4px;
  font-size: 14pt;
  padding: 5px;
  width: 100%;
  outline: none;
}

.admin-layout textarea:focus {
  border: 1px solid #fff;
}

.admin-layout select {
  color: #fff;
  background-color: #212121;
  border: 1px solid #0f5;
  border-radius: 4px;
  font-size: 14pt;
  padding: 5px;
  width: 100%;
  outline: none;
}

.admin-layout select:focus {
  border: 1px solid #fff;
}

.div_imagem {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: right;
  justify-content: center;
}

#logo_painel {
  width: 150px;
}
</style>

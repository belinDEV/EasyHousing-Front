<!-- src/components/adminFolder/NavigationPainel.vue -->
<template>
  <div class="navigation">
    <div class="scrollable-div">
      <!-- Dashboard -->
      <router-link 
        to="/admin" 
        class="nav" 
        :class="{ 'nav-selected': activeLink === 'dashboard' }" 
        @click="setActive('dashboard')">
        <i class="bi bi-grid-1x2-fill"></i><span>Dashboard</span>
      </router-link>

      <!-- Gestão de Imóveis -->
      <router-link 
        to="/admin/imovel" 
        class="nav" 
        :class="{ 'nav-selected': activeLink === 'imovel' }" 
        @click="setActive('imovel')">
        <i class="bi bi-house-fill"></i><span>Imóveis</span>
      </router-link>


      <!-- Corretores -->
      <router-link 
        to="/admin/corretor" 
        class="nav" 
        :class="{ 'nav-selected': activeLink === 'corretor' }" 
        @click="setActive('corretor')">
        <i class="bi bi-person-badge-fill"></i><span>Corretores</span>
      </router-link>
    
 
    </div>

    <!-- Profile Section -->
    <div class="profile">
      <div class="overlay">
        <div class="overlay-content">
          <p>Orlando</p>
          <button title="Perfil">
            <i class="bi bi-person-circle"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const activeLink = ref('dashboard1')
const route = useRoute()

function setActive(link) {
  activeLink.value = link
}

// Sincroniza o link ativo com a rota atual
if (route.name) {
  setActive(route.name.toLowerCase())
}
</script>



<style scoped>
a {
  text-decoration: none;
}

.navigation {
  background: #212121;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.scrollable-div {
  overflow-y: auto;
  flex-grow: 1;
}

.profile {
  position: relative;
  width: 100%;
  height: 250px;
}

.profile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.overlay-content {
  padding: 10px;
  color: white;
  display: flex;
  justify-content: space-between;
  font-weight: 700;
}

.overlay-content p {
  margin: 0;
  font-size: 18pt;
}

.overlay-content button {
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 18pt;
  border-radius: 4px;
  transition: 0.3s;
}

.overlay-content button:active {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-selected {
  background: #0f5 !important;
  margin: 15px !important;
  color: #000 !important;
  padding: 10px 20px !important;
  border-radius: 4px !important;
  border: #0f5 1px solid !important;
}

.nav-selected span {
  margin-left: 10px !important;
  font-weight: 700 !important;
}

.nav {
  background: transparent;
  margin: 15px;
  color: #0f5;
  padding: 10px 20px;
  border-radius: 4px;
  transition: 0.3s;
  border: transparent 1px solid;
}

.nav:hover {
  border: #0f5 1px solid;

}

.nav span {
  margin-left: 10px;
  font-weight: 700;
}

@media (min-width: 1200px) and (max-width: 1600px) {
  .nav {
    padding: 10px 0px;
  }
}
</style>
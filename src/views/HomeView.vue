<template>
  <main>
    <section id="section_1" style="position: relative">
      <Carrocel />
      <div class="div_linear_gradiant">
        <Header />
        <div class="container">
          <div class="content_1">
            <div class="text-left">
              <h1>Imoveis da Semana</h1>
              <p>De uma olhadada nos nossos Imoveis em destaques</p>
              <Button :title="'Ver Imoveis'" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="section_3">
      <div class="container-fluid">
        <div class="text-center">
          <h1 class="title-dieta">Encontre seu imovel por aqui!</h1>
        </div>
        <div class="div_dieta mt-5">
          <h2><i class="bi bi-caret-right-fill"></i> Apartamentos</h2>
        </div>
        <div data-aos="fade-right">
          <CarouselDino :imoveis="state.apartamento" />
        </div>
        <div class="div_dieta mt-2">
          <h2><i class="bi bi-caret-right-fill"></i> Casas</h2>
        </div>
        <div data-aos="fade-right">
          <CarouselDino :imoveis="state.casa" />
        </div>
      </div>
    </section>
    <section id="section_4">
      <PeriodosHome />
    </section>
    <section id="section_5">
      <Trivia />
    </section>
    <section id="section_6">
      <LastBanner />
    </section>
    <div data-aos="fade-up">
      <Footer />
    </div>
  </main>
</template>
<script setup>
import Header from '@/components/Header.vue';
import Button from '@/components/ButtonExplore.vue';
import Carrocel from '@/components/Carrocel.vue';
import CarouselDino from '@/components/CarouselDino.vue';
import { onMounted, reactive } from 'vue';
import services from '@/services';
import PeriodosHome from '@/components/PeriodosHome.vue';
import LastBanner from '@/components/LastBanner.vue';
import Footer from '@/components/Footer.vue';

onMounted(() => {
  getApartamento();
  getCasa();
})

const state = reactive({
  apartamento: [],
  casa: []
})

async function getApartamento() {
  const tipo_imovel = 'Apartamento'
  const { data } = await services.imovel.getImovelByTipo(tipo_imovel);
  state.apartamento = data;
}
async function getCasa() {
  const tipo_imovel = 'Casa'
  const { data } = await services.imovel.getImovelByTipo(tipo_imovel);
  state.casa = data;
}
</script>

<style scoped>
main {
  background: #111;
  overflow-x: hidden;
  overflow-y: hidden;
}

#image_banner {
  height: 100vh;
  object-fit: cover;
}

.div_linear_gradiant {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.637);
}

#imagem-banner {
  width: 100%;
  height: 100vh;
  object-fit: cover;
}


.sobreDino {
  text-align: justify;
  font-family: 'Poppins', sans-serif;
  line-height: 2;
}

.title span {
  font-weight: 400;
  color: #0f5;
  font-family: 'Poppins', sans-serif;
}

.title h2 {
  font-weight: 700;
  color: #0f5;
  font-family: 'Poppins', sans-serif;
  margin-top: 5px;
}

.rotating-border {
  position: relative;
  display: inline-block;
}

.rotating-border::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid #0f5;
  box-sizing: border-box;
  transition: transform 1s ease;
  transform-origin: center;
}

.rotating-border:hover::after {
  transform: rotate(140deg);
}

#icon_curiosidades {
  height: 50px;
  width: 50px;
  object-fit: cover;
  display: block;
  position: relative;
  left: 0;
  top: 0;
  filter: invert(70%) sepia(100%) saturate(2910%) hue-rotate(100deg) brightness(100%) contrast(100%);
}


.coluna_infoDino {
  color: #0f5;
  font-weight: 700;
  margin-bottom: 20px;
}

.coluna_infoDino__icon {
  display: inline-block;
  padding: 15px;
  margin-bottom: 1rem;
}

.coluna_infoDino p {
  margin: 10px 0;
  font-family: 'Poppins', sans-serif;
  color: #fff;
  font-weight: 500;
  line-height: 2;
}

.coluna_infoDino h4 {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
}

.section_2 {
  color: #fff;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content_1 {
  display: flex;
  justify-content: start;
  align-items: center;
  height: 100vh;
}

.content_1 h1 {
  color: #0f5;
  font-size: 40pt;
  font-family: "Poppins", sans-serif;
  font-weight: 900;
}

.content_1 p {
  color: #0f5;
  font-weight: 500;
  font-size: 16pt;
  line-height: 0;
  font-family: 'Poppins', sans-serif;
}

.line {
  background-color: #0f5;
  height: 5px;
  width: 5rem;
  margin-bottom: 2rem;
  margin-top: 2rem;
}

#section_3 {
  height: auto;
}

.title-dieta {
  color: #0f5;
  font-size: 35pt;
  font-family: "Poppins", sans-serif;
  font-weight: 900;
}

#section_3 h2 {
  color: #0f5;
  font-size: 20pt;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
}

#section_4 {
  height: 100vh;
  margin-top: 5rem;
  margin-bottom: 5rem;
}

#section_5 {
  margin-top: 5rem;
  margin-bottom: 5rem;
}
</style>

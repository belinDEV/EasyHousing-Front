<template>
  <main class="imovel-page">
    <Header />
    <section class="imovel-hero">
      <div class="overlay"></div>
      <div class="container text-center">
        <h1 class="imovel-name" data-aos="zoom-in">{{ imovel.tipo }}</h1>
        <p class="imovel-status" data-aos="fade-up">Status: {{ imovel.status }}</p>
      </div>
    </section>
    <section class="imovel-details container" data-aos="fade-up">
      <div class="row">
        <div class="col-md-6">
          <h2>Características</h2>
          <ul class="list-group">
            <li class="list-group-item">Número de Quartos: {{ imovel.qtdQuarto }}</li>
            <li class="list-group-item">Número de Banheiros: {{ imovel.qtdBanheiro }}</li>
            <li class="list-group-item">Garagem: {{ imovel.garagem ? 'Sim' : 'Não' }}</li>
            <li class="list-group-item">Financiamento: {{ imovel.financiamento ? 'Sim' : 'Não' }}</li>
            <li class="list-group-item">CEP: {{ imovel.cep }}</li>
          </ul>
        </div>
        <div class="col-md-6">
          <h2>Sobre</h2>
          <p>{{ imovel.descricao }}</p>
        </div>
      </div>
    </section>
    <section class="imovel-extras container mt-5" data-aos="fade-up">
      <div class="row">
        <div class="col-12 text-center">
          <h2>Galeria</h2>
          <div class="imovel-gallery d-flex justify-content-center">
            <img v-for="image in imovel.images" :key="image.id" :src="image.url" alt="Imagem do Imóvel" class="gallery-image"/>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Header from '@/components/Header.vue';
import { useRouter } from "vue-router";
import AOS from 'aos';
import 'aos/dist/aos.css';

const router = useRouter();

const imovel = ref({
  tipo: '',
  status: '',
  qtdQuarto: '',
  qtdBanheiro: '',
  garagem: false,
  financiamento: false,
  cep: '',
  descricao: '',
  images: [],
});

async function getImovelById(id) {
  try {
    const { data } = await services.imovel.getById(id);
    imovel.value = data;
  } catch (error) {
    console.error("Erro ao buscar imóvel:", error);
  }
}

onMounted(() => {
  AOS.init();
  const id = router.currentRoute.value.params.id;
  if (id) {
    getImovelById(id);
  }
});
</script>

<style scoped>
a {
  text-decoration: none;
}

main {
  margin: 100px 10px 10px 10px;
}

.imovel-hero {
  position: relative;
  background: #212121;
  color: #fff;
  padding: 50px 0;
}

.imovel-hero .overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

.imovel-details {
  margin-top: 20px;
}

.imovel-gallery img {
  width: 200px;
  height: 150px;
  object-fit: cover;
  margin: 10px;
  border-radius: 10px;
}
</style>

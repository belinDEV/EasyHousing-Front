<template>
  <main>
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <h5 class="card-title">Imóveis</h5>
          </div>
          <div class="col-md-6 text-end">
            <RouterLink to="/admin/cadastrar/imovel" class="btn-new" title="Novo Imóvel">Novo Imóvel</RouterLink>
          </div>
        </div>
      </div>
      <img src="@/assets/imagens/painel/total1.jpg" class="card-img-bottom" alt="Imagem de capa do card">
    </div>
    <table class="table table-dark table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Tipo</th>
          <th scope="col">Quartos</th>
          <th scope="col">Banheiros</th>
          <th scope="col">Garagem</th>
          <th scope="col">CEP</th>
          <th scope="col">Status</th>
          <th scope="col">Financiamento</th>
          <th scope="col">Corretor</th>
          <th scope="col">Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="imovel in state.imoveis" :key="imovel.id">
          <td scope="row">{{ imovel.id }}</td>
          <td>{{ imovel.tipo }}</td>
          <td>{{ imovel.qtdQuarto }}</td>
          <td>{{ imovel.qtdBanheiro }}</td>
          <td>{{ imovel.garagem ? 'Sim' : 'Não' }}</td>
          <td>{{ imovel.cep }}</td>
          <td>{{ imovel.status }}</td>
          <td>{{ imovel.financiamento ? 'Sim' : 'Não' }}</td>
          <td>{{ imovel.corretor?.nome || 'Não atribuído' }}</td>
          <td>
            <RouterLink :to="{ name: 'alterar-imovel', params: { id: imovel.id }, }" class="btn btn-primary"
              title="Alterar">
              <i class="bi bi-pencil"></i>
            </RouterLink>
            <a @click="deleteImovel(imovel.id)" class="btn btn-danger" title="Deletar"><i class="bi bi-trash"></i></a>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script setup>
import services from '@/services';
import { ref, onMounted, reactive } from 'vue';

const state = reactive({
  imoveis: [], // Lista de imóveis carregados
});

async function getImoveis() {
  try {
    const { data } = await services.imovel.getAll();
    state.imoveis = data;
  } catch (error) {
    console.error('Erro ao buscar os imóveis:', error);
  }
}

async function deleteImovel(id) {
  if (!confirm('Tem certeza que deseja excluir este Imóvel?')) return;
  try {
    await services.imovel.delete(id);
    getImoveis(); // Atualiza a lista após a exclusão
  } catch (error) {
    console.error('Erro ao excluir imóvel:', error);
  }
}

// Inicializa os dados ao montar o componente
onMounted(getImoveis);
</script>

<style scoped>
a {
  text-decoration: none;
}

main {
  margin: 100px 10px 10px 10px;
}

.card {
  background: #212121;
  border-radius: 10px 10px 0px 0px;
}

.card h5 {
  color: #0f5;
}

.card-img-bottom {
  border-radius: 0;
}

.card img {
  width: 100%;
  height: 100px;
  object-fit: cover;
  object-position: center;
}

.btn-new {
  background: transparent;
  color: #0f5;
  padding: 10px 20px;
  border-radius: 4px;
  transition: 0.3s;
  border: transparent 1px solid;
}

.btn-new:hover {
  border: #0f5 1px solid;
}

th {
  color: #0f5;
}

th,
td {
  background: #212121;
  text-align: center;
}

.btn {
  margin-right: 5px;
}
</style>

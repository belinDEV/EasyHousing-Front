<template>
  <main>
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <h5 class="card-title">Corretores</h5>
          </div>
          <div class="col-md-6 text-end">
            <RouterLink to="/admin/cadastrar/corretor" class="btn-new" title="Novo Corretor">Novo Corretor</RouterLink>
          </div>
        </div>
      </div>
      <img src="@/assets/imagens/painel/total1.jpg" class="card-img-bottom" alt="Imagem de capa do card">
    </div>
    <table class="table table-dark table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nome</th>
          <th scope="col">Email</th>
          <th scope="col">Identificador</th>
          <th scope="col">Contato</th>
          <th scope="col">Descrição</th>
          <th scope="col">Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="corretor in state.corretores" :key="corretor.id">
          <td scope="row">{{ corretor.id }}</td>
          <td>{{ corretor.nome }}</td>
          <td>{{ corretor.email }}</td>
          <td>{{ corretor.identificador }}</td>
          <td>{{ corretor.contato || 'Não informado' }}</td>
          <td>{{ corretor.descricao || 'Sem descrição' }}</td>
          <td>
            <router-link :to="{ name: 'atualizar-corretor', params: { id: corretor.id } }" class="btn btn-primary"
              title="Alterar">
              <i class="bi bi-pencil"></i>
            </router-link>
            <a @click="deleteCorretor(corretor.id)" class="btn btn-danger" title="Deletar"><i class="bi bi-trash"></i></a>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script setup>
import services from "@/services";
import { reactive, onMounted } from "vue";

const state = reactive({
  corretores: [], // Lista de corretores carregados
});

async function getCorretores() {
  try {
    const { data } = await services.corretor.getAll();
    state.corretores = data;
  } catch (error) {
    console.error("Erro ao buscar corretores:", error);
  }
}

async function deleteCorretor(id) {
  if (!confirm("Tem certeza que deseja excluir este corretor?")) return;
  try {
    await services.corretor.delete(id);
    getCorretores(); // Atualiza a lista após a exclusão
  } catch (error) {
    console.error("Erro ao deletar corretor:", error);
  }
}

// Inicializa os dados ao montar o componente
onMounted(getCorretores);
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

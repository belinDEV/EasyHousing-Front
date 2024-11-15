<template>
  <main>
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <h5 class="card-title">
              <span v-if="state.id">Alterar Corretor</span>
              <span v-else>Cadastrar Corretor</span>
            </h5>
          </div>
        </div>
        <div class="line-form"></div>
        <form @submit.prevent="salvarCorretor">
          <div class="row">
            <div class="col-sm-1" v-if="state.id">
              <label for="id" class="form-label">ID</label>
              <input type="text" v-model="state.id" id="id" readonly>
            </div>
            <div class="col-sm-6">
              <label for="nome" class="form-label">Nome</label>
              <input
                v-model="state.corretor.nome"
                type="text"
                placeholder="Nome do corretor"
                id="nome"
                required
              />
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-sm-6">
              <label for="email" class="form-label">Email</label>
              <input
                v-model="state.corretor.email"
                type="email"
                placeholder="Email do corretor"
                id="email"
                required
              />
            </div>
            <div class="col-sm-6">
              <label for="identificador" class="form-label">Identificador</label>
              <input
                v-model="state.corretor.identificador"
                type="text"
                placeholder="Identificador do corretor"
                id="identificador"
                required
              />
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-sm-6">
              <label for="contato" class="form-label">Contato</label>
              <input
                v-model="state.corretor.contato"
                type="text"
                placeholder="Contato do corretor"
                id="contato"
              />
            </div>
            <div class="col-sm-6">
              <label for="descricao" class="form-label">Descrição</label>
              <textarea
                v-model="state.corretor.descricao"
                placeholder="Descrição do corretor"
                id="descricao"
                rows="3"
              ></textarea>
            </div>
          </div>
          <div class="text-end mt-3">
            <button type="submit" class="btn btn-primary me-2">
              <span v-if="state.id">Alterar</span>
              <span v-else>Cadastrar</span>
            </button>
            <router-link to="/admin/corretores" class="btn btn-danger">Cancelar</router-link>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
import services from "@/services";
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const state = reactive({
  id: "",
  corretor: {
    nome: "",
    email: "",
    identificador: "",
    contato: "",
    descricao: "",
  },
});

onMounted(() => {
  if (router.currentRoute.value.params.id !== undefined) {
    state.id = router.currentRoute.value.params.id;
    getCorretor(state.id);
  }
});

async function getCorretor(id) {
  try {
    const { data } = await services.corretor.getById(id);
    Object.assign(state.corretor, data); // Atualiza os campos do corretor no estado
  } catch (error) {
    console.error("Erro ao buscar corretor:", error);
    alert("Erro ao buscar o corretor. Verifique os logs.");
  }
}

async function salvarCorretor() {
  // Validação básica
  if (!state.corretor.nome || !state.corretor.email || !state.corretor.identificador) {
    alert("Preencha todos os campos obrigatórios.");
    return;
  }

  if (state.id) {
    // Alterar corretor
    try {
      await services.corretor.update(state.id, state.corretor);
      alert("Corretor alterado com sucesso!");
      router.push("/admin/corretores");
    } catch (error) {
      console.error("Erro ao alterar corretor:", error);
      alert("Erro ao alterar corretor. Verifique os logs.");
    }
  } else {
    // Cadastrar corretor
    try {
      await services.corretor.salvar(state.corretor);
      alert("Corretor cadastrado com sucesso!");
      router.push("/admin/corretores");
    } catch (error) {
      console.error("Erro ao criar corretor:", error);
      alert("Erro ao criar corretor. Verifique os logs.");
    }
  }
}
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
  border-radius: 10px 10px 10px 10px;
}

.card h5 {
  color: #0f5;
}

.card-img-bottom {
  border-radius: 0;
}
</style>

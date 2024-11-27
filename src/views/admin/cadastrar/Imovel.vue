<template>
  <main>
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <h5 class="card-title">
              <span v-if="state.id">Alterar Imóvel</span>
              <span v-else>Cadastrar Imóvel</span>
            </h5>
          </div>
        </div>
        <div class="line-form"></div>
        <form @submit.prevent="novoImovel">
          <div class="row">
            <!-- Campos do Imóvel -->
            <div class="col-sm-2" v-if="state.id">
              <label for="id" class="form-label">ID</label>
              <input type="text" v-model="state.id" id="id" readonly />
            </div>
            <div class="col-sm-2" v-for="field in fields" :key="field.id">
              <label :for="field.id" class="form-label">{{ field.label }}</label>
              <input
                v-if="field.type !== 'select'"
                :type="field.type"
                :id="field.id"
                :placeholder="field.placeholder"
                required
                v-model="state.imovel[field.key]"
              />
              <select
                v-else
                :id="field.id"
                required
                v-model="state.imovel[field.key]"
              >
                <option v-for="option in field.options" :key="option.value" :value="option.value">
                  {{ option.text }}
                </option>
              </select>
            </div>

            <!-- Corretor -->
            <div class="col-sm-2">
              <label for="corretor" class="form-label">Corretor</label>
              <select id="corretor" required v-model="state.imovel.corretorId">
                <option v-for="corretor in state.corretores" :key="corretor.id" :value="corretor.id">
                  {{ corretor.nome }}
                </option>
              </select>
            </div>

            <!-- Upload de Imagens -->
            <div class="col-md-12 mt-4">
              <label for="IMG" class="form-label styled-file-label">
                Adicionar Imagem <br />
                <i class="bi bi-images"></i>
              </label>
              <input
                id="IMG"
                type="file"
                class="form-file-input"
                multiple
                @change="addImage"
              />
              <div class="image-preview">
                <div
                  v-for="(image, index) in state.images"
                  :key="index"
                  class="image-item"
                >
                  <img :src="image.imageUrl" alt="Preview da Imagem" />
                  <button type="button" class="remove-btn" @click="removeImage(index)">
                    Remover
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Botões de Ação -->
          <div class="text-end mt-3">
            <button type="submit" class="btn btn-primary me-2" :disabled="state.loading">
              <span v-if="state.id">Alterar</span>
              <span v-else>Cadastrar</span>
              <i v-if="state.loading" class="bi bi-arrow-repeat spinner"></i>
            </button>
            <router-link to="/admin/imovel" class="btn btn-danger">Cancelar</router-link>
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
  imovel: {
    qtdQuarto: "",
    garagem: false,
    qtdBanheiro: "",
    status: "",
    cep: "",
    tipo: "",
    financiamento: false,
    descricao: "",
    contrato: "",
    urn: "",
    latitude: null,
    longitude: null,
    corretorId: "",
  },
  corretores: [],
  images: [],
  existingImages: [], // Para imagens existentes ao editar
  loading: false,
});

const fields = [
  { id: "qtdQuarto", label: "Número de Quartos", key: "qtdQuarto", type: "number", placeholder: "Número de quartos" },
  { id: "qtdBanheiro", label: "Número de Banheiros", key: "qtdBanheiro", type: "number", placeholder: "Número de banheiros" },
  { id: "garagem", label: "Garagem", key: "garagem", type: "select", options: [{ value: true, text: "Sim" }, { value: false, text: "Não" }] },
  { id: "status", label: "Status", key: "status", type: "text", placeholder: "Status do imóvel" },
  { id: "cep", label: "CEP", key: "cep", type: "text", placeholder: "CEP do imóvel" },
  { id: "tipo", label: "Tipo", key: "tipo", type: "text", placeholder: "Tipo do imóvel" },
  { id: "financiamento", label: "Financiamento", key: "financiamento", type: "select", options: [{ value: true, text: "Sim" }, { value: false, text: "Não" }] },
  { id: "contrato", label: "Contrato", key: "contrato", type: "text", placeholder: "Contrato do imóvel" },
  { id: "urn", label: "URN", key: "urn", type: "text", placeholder: "URN do imóvel" },
  { id: "latitude", label: "Latitude", key: "latitude", type: "number", placeholder: "Latitude do imóvel" },
  { id: "longitude", label: "Longitude", key: "longitude", type: "number", placeholder: "Longitude do imóvel" },
];

onMounted(() => {
  if (router.currentRoute.value.params.id !== undefined) {
    state.id = router.currentRoute.value.params.id;
    getImovelId(state.id);
  }
  getCampos();
});

async function getCampos() {
  try {
    state.loading = true;
    const corretoresResponse = await services.corretor.getAll();
    state.corretores = corretoresResponse.data;
  } catch (error) {
    console.error("Erro ao buscar corretores:", error);
  } finally {
    state.loading = false;
  }
}

async function getImovelId(id) {
  try {
    const { data } = await services.imovel.getById(id);
    state.imovel = data;
    state.existingImages = data.images || [];
  } catch (error) {
    console.error("Erro ao buscar imóvel:", error);
  }
}

async function novoImovel() {
  try {
    state.loading = true;
    let response;
    if (state.id) {
      response = await services.imovel.update(state.id, state.imovel);
    } else {
      response = await services.imovel.salvar(state.imovel);
    }

    const imovelId = response.data.id;

    // Upload de novas imagens
    if (state.images.length > 0) {
      for (let image of state.images) {
        const formData = new FormData();
        formData.append("imovelId", imovelId);
        formData.append("file", image.file);
        await services.imovel.saveImage(formData);
      }
    }

    router.push("/admin/imovel");
  } catch (error) {
    console.error("Erro ao salvar imóvel:", error);
  } finally {
    state.loading = false;
  }
}

function addImage(event) {
  for (let file of event.target.files) {
    const objImage = {
      file,
      imageUrl: URL.createObjectURL(file),
    };
    state.images.push(objImage);
  }
}

function removeImage(index) {
  state.images.splice(index, 1);
}
</script>

<style scoped>
/* Styles... */
</style>

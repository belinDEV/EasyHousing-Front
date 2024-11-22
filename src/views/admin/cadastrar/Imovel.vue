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
            <div class="col-sm-2" v-if="state.id">
              <label for="id" class="form-label">ID</label>
              <input type="text" v-model="state.id" id="id" readonly />
            </div>
            <div class="col-sm-2">
              <label for="qtdQuarto" class="form-label">Número de Quartos</label>
              <input
                type="number"
                id="qtdQuarto"
                placeholder="Número de quartos:"
                required
                v-model="state.imovel.qtdQuarto"
              />
            </div>
            <div class="col-sm-2">
              <label for="qtdBanheiro" class="form-label">Número de Banheiros</label>
              <input
                type="number"
                id="qtdBanheiro"
                placeholder="Número de banheiros:"
                required
                v-model="state.imovel.qtdBanheiro"
              />
            </div>
            <div class="col-sm-2">
              <label for="garagem" class="form-label">Garagem</label>
              <select id="garagem" required v-model="state.imovel.garagem">
                <option :value="true">Sim</option>
                <option :value="false">Não</option>
              </select>
            </div>
            <div class="col-sm-2">
              <label for="status" class="form-label">Status</label>
              <input
                type="text"
                id="status"
                placeholder="Status do imóvel:"
                required
                v-model="state.imovel.status"
              />
            </div>
            <div class="col-sm-2">
              <label for="cep" class="form-label">CEP</label>
              <input
                type="text"
                id="cep"
                placeholder="CEP do imóvel:"
                required
                v-model="state.imovel.cep"
              />
            </div>
            <div class="col-sm-2">
              <label for="tipo" class="form-label">Tipo</label>
              <input
                type="text"
                id="tipo"
                placeholder="Tipo do imóvel:"
                required
                v-model="state.imovel.tipo"
              />
            </div>
            <div class="col-sm-2">
              <label for="financiamento" class="form-label">Financiamento</label>
              <select id="financiamento" required v-model="state.imovel.financiamento">
                <option :value="true">Sim</option>
                <option :value="false">Não</option>
              </select>
            </div>
            <div class="col-sm-2">
              <label for="contrato" class="form-label">Contrato</label>
              <input
                type="text"
                id="contrato"
                placeholder="Contrato do imóvel:"
                required
                v-model="state.imovel.contrato"
              />
            </div>
            <div class="col-sm-2">
              <label for="urn" class="form-label">URN</label>
              <input
                type="text"
                id="urn"
                placeholder="URN do imóvel:"
                required
                v-model="state.imovel.urn"
              />
            </div>
            <div class="col-sm-2">
              <label for="latitude" class="form-label">Latitude</label>
              <input
                type="number"
                step="0.00000001"
                id="latitude"
                placeholder="Latitude do imóvel:"
                required
                v-model="state.imovel.latitude"
              />
            </div>
            <div class="col-sm-2">
              <label for="longitude" class="form-label">Longitude</label>
              <input
                type="number"
                step="0.00000001"
                id="longitude"
                placeholder="Longitude do imóvel:"
                required
                v-model="state.imovel.longitude"
              />
            </div>
            <div class="col-sm-2">
              <label for="corretor" class="form-label">Corretor</label>
              <select id="corretor" required v-model="state.imovel.corretorId">
                <option
                  v-for="corretor in state.corretores"
                  :key="corretor.id"
                  :value="corretor.id"
                >
                  {{ corretor.nome }}
                </option>
              </select>
            </div>
          </div>
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
          </div>
          <div class="text-end mt-3">
            <button type="submit" class="btn btn-primary me-2">
              <span v-if="state.id">Alterar</span>
              <span v-else>Cadastrar</span>
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
</script>

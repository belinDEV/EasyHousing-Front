function getImageUrl(imagePath) {
  if (!imagePath) return ''; // Verifica se o caminho da imagem é válido
  const baseUrl = 'http://localhost:8070/uploads/';
  const cleanedPath = imagePath.replace(/\\/g, '/').split('/').pop(); // Substitui as barras invertidas por barras normais e obtém o nome do arquivo
  const finalUrl = baseUrl + cleanedPath; // Concatena a URL base com o nome do arquivo
  return finalUrl;
}

async function testImageUrl(url) {
  try {
    const response = await fetch(url); // Faz uma requisição para a URL da imagem
    return response.ok; // Retorna true se a resposta for bem-sucedida
  } catch (error) {
    console.error('Error fetching image:', error); // Loga um erro se a requisição falhar
    return false; // Retorna false se houver um erro
  }
}

export default (httpClient) => ({
  getAll: async () => {
    const response = await httpClient.get('/imoveis'); // Busca todos os imoveiss do backend
    const dataWithImageUrls = await Promise.all(response.data.map(async imovel => { // Processa cada imoveis
      const imagesWithUrls = await Promise.all(imovel.images.map(async imgObj => { // Processa cada imagem do imoveis
        const imageUrl = getImageUrl(imgObj.image); // Gera a URL da imagem
        const isValid = await testImageUrl(imageUrl); // Testa se a URL da imagem é válida
        return {
          ...imgObj, // Mantém todas as propriedades originais do objeto de imagem
          imageUrl: isValid ? imageUrl : 'URL invalida ou imagem não encontrada' // Adiciona a URL da imagem ou uma mensagem de erro se a URL não for válida
        };
      }));
      return {
        ...imovel, // Mantém todas as propriedades originais do imoveis
        images: imagesWithUrls // Substitui o array de imagens pelo array com URLs processadas
      };
    }));
    return { data: dataWithImageUrls }; // Retorna os dados processados
  },

  getById: async (id) => {
    const response = await httpClient.get('/imoveis/' + id); // Busca o imoveis pelo ID
    const imovel = response.data; // Obtém os dados do imoveis
    const imagesWithUrls = await Promise.all(imovel.images.map(async imgObj => { // Processa cada imagem do imoveis
      const imageUrl = getImageUrl(imgObj.image); // Gera a URL da imagem
      const isValid = await testImageUrl(imageUrl); // Testa se a URL da imagem é válida
      return {
        ...imgObj, // Mantém todas as propriedades originais do objeto de imagem
        imageUrl: isValid ? imageUrl : 'URL invalida ou imagem não encontrada' // Adiciona a URL da imagem ou uma mensagem de erro se a URL não for válida
      };
    }));
    const imovelWithImages = {
      ...imovel, // Mantém todas as propriedades originais do imoveis
      images: imagesWithUrls // Substitui o array de imagens pelo array com URLs processadas
    };
    return { data: imovelWithImages }; // Retorna o objeto do imoveis com as imagens processadas
  },

  getImovelByTipo: async (tipoImovel) => {
    const response = await httpClient.get('/imoveis/imovel/' + tipoImovel); // Busca imoveis pelo tipo de dieta
    const dataWithImageUrls = await Promise.all(response.data.map(async imovel => { // Processa cada imoveis na lista
      const imagesWithUrls = await Promise.all(imovel.images.map(async imgObj => { // Processa cada imagem do imoveis
        const imageUrl = getImageUrl(imgObj.image); // Gera a URL da imagem
        const isValid = await testImageUrl(imageUrl); // Testa se a URL da imagem é válida
        return {
          ...imgObj, // Mantém todas as propriedades originais do objeto de imagem
          imageUrl: isValid ? imageUrl : 'URL inválida ou imagem não encontrada' // Adiciona a URL da imagem ou uma mensagem de erro se a URL não for válida
        };
      }));
      return {
        ...imovel, // Mantém todas as propriedades originais do imoveis
        images: imagesWithUrls // Substitui o array de imagens pelo array com URLs processadas
      };
    }));
    return { data: dataWithImageUrls }; // Retorna os dados processados
  },

  update: async (id, imovel) => {
    try {
      const response = await httpClient.put('/imovel/atualizar/' + id, imovel);
      return {
        data: response.data
      }
    }
    catch (error) {
      console.error('Erro ao atualizar imovel:', error);
      throw error;
    }
  },

  salvar: async (imovel) => {
    try {
      const response = await httpClient.post('/imovel/salvar', imovel);
      return {
        data: response.data
      }
    }
    catch (error) {
      console.error('Erro ao salvar dieta:', error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await httpClient.delete('/imovel/deletar/' + id);
      return {
        data: response.data
      }
    }
    catch (error) {
      console.error('Erro ao deletar imovel:', error);
      throw error;
    }
  },

  saveImage: async (formImagem) => {
    let headers = { "Content-Type": "multipart/form-data" }
    const response = httpClient.post('/images/save', formImagem, { headers })
    return {
      data: response.data,
    };

  },
});

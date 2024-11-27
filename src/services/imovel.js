function getImageUrl(imagePath) {
  if (!imagePath || typeof imagePath !== 'string') {
    console.warn('Caminho de imagem inválido:', imagePath);
    return ''; // Retorna vazio para caminhos inválidos
  }

  const baseUrl = 'http://localhost:8070/uploads/';

  // Se o caminho já for uma URL completa, retorna sem alterações
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Limpa o caminho e extrai o nome do arquivo
  const cleanedPath = imagePath.replace(/\\/g, '/').split('/').pop();

  // Verifica se o nome do arquivo parece válido
  if (!cleanedPath || !cleanedPath.includes('.')) {
    console.warn('Nome de arquivo inválido:', cleanedPath);
    return ''; // Retorna vazio para nomes de arquivo inválidos
  }

  // Concatena a URL base e o caminho limpo
  const finalUrl = baseUrl + cleanedPath;
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
    const response = await httpClient.get('/imovel');
    const dataWithImageUrls = await Promise.all(
      response.data.map(async (imovel) => {
        // Garante que 'images' não seja null e trata os objetos de imagem
        const imagesWithUrls = (imovel.images || []).map((imgObj) => {
          const imageUrl = getImageUrl(imgObj.url);
          return { ...imgObj, imageUrl };
        });
  
        return {
          ...imovel,
          images: imagesWithUrls, // Sempre retorna uma lista, mesmo que vazia
        };
      })
    );
    return { data: dataWithImageUrls };
  },

  getImovelByTipo: async (tipoImovel) => {
    const response = await httpClient.get('/imovel/imovel/' + tipoImovel); // Busca imoveis pelo tipo de imovel
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
      console.error('Erro ao salvar imovel:', error);
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
    const response = httpClient.post('/api/image/salvar', formImagem, { headers });
    return {
      data: response.data,
    };

  },
});

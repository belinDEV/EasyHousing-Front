export default (httpClient) => ({
  getAll: async () => {
    const response = await httpClient.get('/corretor');
    return { data: response.data }
  },

  getById: async (id) => {
    const response = await httpClient.get('/corretor/' + id);
    return { data: response.data }
  },

  update: async (id, corretor) => {
    try {
      const response = await httpClient.put('/corretor/atualizar/' + id, corretor);
      return {
        data: response.data
      }
    }
    catch (error) {
      console.error('Erro ao atualizar corretor:', error);
      throw error;
    }
  },

  salvar: async (tipo) => {
    try {
      const response = await httpClient.post('/corretor/salvar', { tipo });
      return {
        data: response.data
      }
    }
    catch (error) {
      console.error('Erro ao salvar corretor:', error);
      throw error;
    }
  },
  
  delete: async (id) => {
    try {
      const response = await httpClient.delete('/corretor/deletar/' + id);
      return {
        data: response.data
      }
    }
    catch (error) {
      console.error('Erro ao deletar corretor:', error);
      throw error;
    }
  }
});

<template>
  <main>
    <div class="not-found">
      <div class="image-container">
        <img src="./../assets/imagens/error/erro_404.jpg" alt="Imagem EasyHousing erro-404" />
        <div class="overlay">
          <h1>404 - Página Não Encontrada</h1>
          <p>Desculpe, a página que você está tentando acessar não existe.</p>
          <router-link to="/">
            <button class="btn">Voltar para a Página Inicial</button>
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
</script>

<style scoped>
main {
  background-color: #111;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.image-container {
  position: relative;
  width: 100%;
  max-width: 800px;
}

.image-container img {
  width: 100%;
  border-radius: 10px;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
}

.overlay h1 {
  color: #fff;
  font-size: 2.5em;
  text-align: center;
  margin-bottom: 0.5em;
}

.overlay p {
  color: #ddd;
  font-size: 1.2em;
  text-align: center;
  margin-bottom: 1em;
}

.overlay .btn {
  background-color: #0f5;
  color: #000;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s ease;
}

.overlay .btn:hover {
  background-color: #fff;
  color: #0f5;
}
</style>

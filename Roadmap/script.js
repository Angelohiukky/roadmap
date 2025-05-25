// Função para carregar o cabeçalho
function carregarCabecalho() {
  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      document.body.insertAdjacentHTML('afterbegin', data);
      inicializarMenuHamburguer();
      inicializarModoNoturno();
    })
    .catch(error => console.error('Erro ao carregar o cabeçalho:', error));
}

// Função para carregar o rodapé
function carregarRodape() {
  fetch('footer.html')
    .then(response => response.text())
    .then(data => {
      document.body.insertAdjacentHTML('beforeend', data);
    })
    .catch(error => console.error('Erro ao carregar o rodapé:', error));
}

// Função para inicializar o menu hambúrguer
function inicializarMenuHamburguer() {
  const menuHamburguer = document.querySelector('.menu-hamburguer');
  const cabecalho = document.querySelector('.cabecalho');
  
  if (menuHamburguer && cabecalho) {
    menuHamburguer.addEventListener('click', () => {
      cabecalho.classList.toggle('menu-ativo');
    });
  }
}

// Função para inicializar o modo noturno
function inicializarModoNoturno() {
  const botaoNoturno = document.querySelector('.noturno');
  const html = document.documentElement;

  // Verifica o tema salvo no localStorage
  if (localStorage.getItem('theme') === 'dark') {
    html.setAttribute('data-theme', 'dark');
  }

  if (botaoNoturno) {
    botaoNoturno.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      if (currentTheme === 'dark') {
        html.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      } else {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  }
}

// Carregar o cabeçalho e o rodapé quando a página for carregada
document.addEventListener('DOMContentLoaded', () => {
  carregarCabecalho();
  carregarRodape();
});

document.querySelector('.btn-entrar').addEventListener('click', () => {
  alert('Botão Entrar clicado!'); // Substitua por sua ação, como redirecionar ou abrir um modal
});
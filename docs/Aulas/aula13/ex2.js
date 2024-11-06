const artigo = document.querySelector('#art');

const button = document.createElement('button');
button.textContent = 'Clique Aqui';

document.body.appendChild(artigo);
artigo.appendChild(button);



//const botao = document.getElementById('meuBotao');

button.addEventListener('click', () => {
    alert('Você clicou no botão!');
});
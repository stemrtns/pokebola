const btnAbrir = document.getElementById('btn-abrir');
const pokeballScene = document.getElementById('pokeball-scene');
const pokeStatus = document.getElementById('poke-status');
const statusBadge = document.getElementById('status-badge');
const pokedexColumn = document.getElementById('pokedex-column');
const pokeImg = document.getElementById('poke-img');

const pokeName = document.getElementById('poke-name');
const pokeType = document.getElementById('poke-type');
const pokeId = document.getElementById('poke-id');
const pokeDesc = document.getElementById('poke-desc');
const pokeHeight = document.getElementById('poke-height');
const pokeWeight = document.getElementById('poke-weight');
const pokeAbility = document.getElementById('poke-ability');
const statTotal = document.getElementById('stat-total');

btnAbrir.addEventListener('click', () => {
  // Desativa o botão e muda os estados visuais enquanto procura no JSON Server
  btnAbrir.disabled = true;
  btnAbrir.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span> A abrir Pokébola...`;
  pokeStatus.innerText = 'Surpresa a caminho...';
  statusBadge.innerText = 'Abrindo...';
  
  // Fecha a pokébola caso já estivesse aberta de uma busca anterior
  pokeballScene.classList.remove('opened');

  setTimeout(() => {
    // Sorteia um ID aleatório compatível com o teu db.json (ex: de 1 a 151)
    const randomId = Math.floor(Math.random() * 151) + 1;

    // Pedido fetch ao JSON Server local
    fetch(`http://localhost:3000/pokemon/${randomId}`)
      .then(response => {
        if (!response.ok) throw new Error("Pokémon não encontrado.");
        return response.json();
      })
      .then(data => {
        // Revela a Pokédex ao lado
        pokedexColumn.style.display = 'block';
        
        // Ativa a animação de abertura mecânica da Pokébola
        pokeballScene.classList.add('opened');

        // Atribui a imagem oficial do Pokémon correspondente ao ID do JSON Server
        pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;

        statusBadge.innerText = 'Pokémon revelado';
        pokeStatus.innerText = `Encontraste o ${data.name}!`;
        
        // Preenche os dados técnicos na Pokédex
        pokeName.innerText = data.name;
        pokeId.innerText = `#${String(data.id).padStart(4, '0')}`;
        
        const tipo = data.types && data.types.length > 0 ? data.types[0].name : 'Desconhecido';
        pokeType.innerText = tipo;

        pokeHeight.innerText = `${(data.id * 0.1 + 0.3).toFixed(1)} m`;
        pokeWeight.innerText = `${(data.id * 0.5 + 5).toFixed(1)} kg`;
        pokeAbility.innerText = data.id % 2 === 0 ? 'Estática' : 'Fogo Interno';
        pokeDesc.innerText = `Um Pokémon fascinante registado no PokéLab. Apresenta alta atividade energética e ótimas capacidades em combate.`;

        // Atributos básicos e barras de progresso do Bootstrap
        const hp = data.stats.hp;
        const atk = data.stats.attack;
        const def = data.stats.defense;
        const spatk = data.stats.specialAttack;
        const spdef = data.stats.specialDefense;
        const speed = data.stats.speed;
        const total = hp + atk + def + spatk + spdef + speed;

        statTotal.innerText = `Total: ${total}`;

        document.getElementById('val-hp').innerText = hp;
        document.getElementById('bar-hp').style.width = `${Math.min(hp, 150) / 1.5}%`;

        document.getElementById('val-atk').innerText = atk;
        document.getElementById('bar-atk').style.width = `${Math.min(atk, 150) / 1.5}%`;

        document.getElementById('val-def').innerText = def;
        document.getElementById('bar-def').style.width = `${Math.min(def, 150) / 1.5}%`;

        document.getElementById('val-spatk').innerText = spatk;
        document.getElementById('bar-spatk').style.width = `${Math.min(spatk, 150) / 1.5}%`;

        document.getElementById('val-spdef').innerText = spdef;
        document.getElementById('bar-spdef').style.width = `${Math.min(spdef, 150) / 1.5}%`;

        document.getElementById('val-speed').innerText = speed;
        document.getElementById('bar-speed').style.width = `${Math.min(speed, 150) / 1.5}%`;

        // Reativa o botão
        btnAbrir.disabled = false;
        btnAbrir.innerHTML = `<span class="me-2">🔄</span> Revelar outro Pokémon`;
      })
      .catch(err => {
        console.error(err);
        pokeStatus.innerText = 'Erro ao carregar do JSON Server.';
        btnAbrir.disabled = false;
        btnAbrir.innerText = 'Tentar novamente';
      });
  }, 800);
});
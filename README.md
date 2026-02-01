# Pokedex

Aplicação web para visualização de Pokémon utilizando a API pública do PokeAPI.

## Funcionalidades

- Listagem de Pokémon com informações detalhadas
- Busca por nome em tempo real
- Filtro por tipo de Pokémon
- Paginação com navegação entre páginas
- Interface responsiva para diferentes tamanhos de tela

## Estrutura do Projeto

```
pokedex/
├── css/
│   ├── style.css       # Estilos gerais da aplicação
│   └── pokedex.css     # Estilos específicos dos Pokémon e componentes
├── js/
│   └── index/
│       ├── index.js    # Lógica principal e gerenciamento de estado
│       └── poke-api.js # Funções de comunicação com a API
├── index.html          # Estrutura HTML principal
└── README.md          # Documentação do projeto
```

## Tecnologias Utilizadas

- HTML5
- CSS3 (Grid, Flexbox, Media Queries)
- JavaScript (ES6+)
- PokeAPI (API pública para dados de Pokémon)
- Google Fonts (Alan Sans)
- Normalize.css

## Como Usar

1. Abra o arquivo `index.html` em um navegador web moderno
2. A lista de Pokémon será carregada automaticamente
3. Use o campo de busca para filtrar Pokémon por nome
4. Selecione um tipo no menu dropdown para filtrar por tipo
5. Navegue entre as páginas usando os botões "Anterior" e "Próxima"

## Funcionalidades Detalhadas

### Busca por Nome
Digite o nome do Pokémon no campo de busca. A filtragem ocorre em tempo real e é case-insensitive.

### Filtro por Tipo
Selecione um tipo de Pokémon no menu dropdown para exibir apenas Pokémon daquele tipo. A opção "Todos os tipos" remove o filtro.

### Paginação
Os Pokémon são exibidos em páginas de 10 itens. A informação da página atual e o total de resultados são exibidos abaixo da lista.

## API Utilizada

Este projeto utiliza a [PokeAPI](https://pokeapi.co/), uma API RESTful gratuita que fornece dados sobre Pokémon.

## Responsividade

A aplicação é responsiva e se adapta a diferentes tamanhos de tela:
- Mobile: 1 coluna
- Tablet (380px+): 2 colunas
- Tablet (576px+): 3 colunas
- Desktop (992px+): 4 colunas
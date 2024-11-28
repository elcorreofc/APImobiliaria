const express = require ('express');

const app = express();
const PORT = 3000;

// Arrey de imóveis 
let imoveis = [
    { id: 1, título: 'Apartamento em São paulo', descricao: '2 quartos, 1 banheiro', preco: 300000, localizacao: 'São Paulo', tipo: 'Apartamento'},
    { id: 2, título: 'Casa em Curitiba', descricao: '3 quartos, 2 banheiros', preco: 500000, localizacao: 'Curitiba', tipo: 'Casa'}
];

// midlarre para garantir o uso do JSON

app.use(express.json());

//Rota padrão
app.get('/', (res, req) => {
    res.send('API imobiliaria');
});

//Obter todos os imóveis
app.get('/api/imoveis', (req, res) => {
    res.json(imoveis);
});

//Criar um novo Imóvel
app.post('/api/imoveis', (req, res) => {
    const { titulo, descricao, preco, localizacao, tipo} = req.body;
    const novoImovel = { id: imoveis.length + 1, titulo, descricao, preco, localizacao, tipo};
    imoveis.push(novoImovel);
    res.status(201).json(novoImovel);
});

// Obter um imóvel por ID

app.get('/api/imoveis/:id', (req, res) => {
    const imovel = imoveis.find( i => i.id === parseInt(req.params.id));
    if (! imovel) return res.status(404).json({ message: `Imóvel não Encontrado`});
    res.json(imovel);
});

// Atualizar um imóvel 

app.put('/api/imoveis/:id', (req, res) => {
    const imovel = imoveis.find(i => i.id === parseInt(req.params.id));
    if (! imovel) return res.status(404).json({ message: `Imóvel não Encontrado`});
    const { titulo, descricao, preco, localizacao, tipo} = req.body;
    imovel.titulo = titulo;
    imovel.descricao = descricao;
    imovel.preco = preco;
    imovel.descricao = descricao;
    imovel.tipo = tipo;
    res.json(imovel);
});

// Deletar um imóvel

app.delete('/api/imoveis/:id', (req, res) => {
    const imovelIndex = imoveis.findIndex(i => i.id === parseInt(req.params.id));
    if (imovelIndex === -1) return res.status(404).json({ message: `Imóvel não Encontrado`});
    imoveis.splice(imovelIndex, 1);
    res.status(204).send();
});

// Obter imóveis por tipo

app.get('/api/imoveis/tipo/:tipo', (req, res) => {
    const tipo = req.params.tipo;
    const imoveisFiltrados = imoveis.filter(i => i.tipo.tolowerCase() === tipo.tolowerCase());

    if (imoveisFiltrados.length === 0) {
        return res.status(404).json({ message: `Nenhum imóvel encontrado para este tipo`});
    }

    res.json(imoveisFiltrados);
});

// Obter imóveis por Localização 

app.get('/api/imoveis/localizacao/:localizacao', (req, res) => {
    const localizacao = req.params.localizacao;
    const imoveisFiltrados = imoveis.filter(i => i.localizacao.toLocaleLowerCase());

    if (imoveisFiltrados.length === 0) {
        return res.status(404).json({ message: `Nenhum imóvel encontrado nesta Localização`});

    }

    res.json(imoveisFiltrados);

});

// iniciar o servidor
app.listen(PORT, () => {
    console.log(`servidor rodando na porta ${PORT}`);
});
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();
const env = require('./config/env'); // config de ambiente 
const connection = require('./config/db')

connection.connect()

// habilitando uso do cors
app.use(cors());

// habilitando parse de json no body da requisicao
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// carregando as rotas da aplicacao
app.use('/', require('./src/route')(connection));

// definindo o diretorio de arquivos estaticos
//app.use('/docs', express.static(__dirname +'/docs'));

// definindo a porta na qual a aplicacao ira rodar
//app.set('port', (process.env.PORT || 5000));

const port = process.env.PORT || 5000

// subindo servidor e conectando o banco de dados
const server = http.createServer(app);
server.listen(port, () => {   
    // mongodb.connectMongo(env.mongodb);
    console.log(`Servidor rodando na porta [${port}]`) 
});

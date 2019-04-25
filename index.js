const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();
const passport = require('passport')
const passportJWT = require('passport-jwt')
const jwt = require('jsonwebtoken')

const env = require('./config/env'); // config de ambiente 
const pessoaService = require('./src/service/pessoaService')

const port = process.env.PORT || 5000
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy
let jwtOptions = {}

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = 'med2019'

const strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) =>{
    console.log(jwt_payload)
    let user = pessoaService.find(jwt_payload.id)
    if(user) {
        next(null, user)
    } else {
        next(null, false)
    }
})

passport.use(strategy)

app.use(passport.initialize())
// habilitando uso do cors
app.use(cors());

// habilitando parse de json no body da requisicao
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// carregando as rotas da aplicacao
app.use('/', require('./src/route')(jwtOptions, passport));

/*app.get('/protected', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.send('Parabéns! Se você está vendo isso é porque você está autenticado.')
})*/

// definindo o diretorio de arquivos estaticos
//app.use('/docs', express.static(__dirname +'/docs'));

// definindo a porta na qual a aplicacao ira rodar
//app.set('port', (process.env.PORT || 5000));


// subindo servidor e conectando o banco de dados
const server = http.createServer(app);
server.listen(port, () => {   
    // mongodb.connectMongo(env.mongodb);
    console.log(`Servidor rodando na porta [${port}]`) 
});

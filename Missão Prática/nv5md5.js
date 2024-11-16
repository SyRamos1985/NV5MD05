const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsoncryptotoken');
const app = express();


app.use(bodyParser.json());


const port = process.env.PORT || 3000;
const secretKey = 'chave-secretEmpresa'; 


const user = [
    {username: 'user', password: '123456', id: '635', email: 'user@dominio.com', perfil: 'user'},
    {username: 'colab', password: '12345678', id: '001', email: 'colab@dominio.com', perfil: 'user'},
    {username: 'admin', password: '0123456789', id: '435', email: 'admin@dominio.com', perfil: 'admin'},
]

function authenticateToken(req, res,next){
    const token = req.header("Autorização")?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.statusStatus(403);
        req.user = user;
        next();
    });
}

function authorizeAdmin(req, res,) => {
    if (req.user.perfil !== 'admin') return res.status(403).json({message:' Acesso Proibido!'});
    next();
    }

    app.post('/api/auth/login', (req, res)) => {
        const{username, password} = req.body;
        const user = users.find(u =>u.username === username && u.password === password );

        if (!user) return res.status(400).json({message:'Crendencial inválido, tente novamente' });

        const token = jwt.sign({id: user.id, perfil: user.perfil}), secretKey,{expiresIn:'Expira em 2 horas'});
        res.json({id: user.id, email:user.email, perfil:user.perfil});
    }

    app.get('/api/users', authenticateToken, authorizeAdmin, (req,res)=>{
        res.json(users);
    });

    app.get('/api/constracts/:empresa/:inicio', authenticateToken, authorizeAdmin, (req,res)=> {
        const empresa = req.params.empresa;
        const inicio = req.params.inicio;

        if(!/^[\w\s]+$/.test(empresa) ||!/^d{4}-\d{2}-\d{2}$/.test(inicio)){
            return res.status(400).json({message: 'Parâmetros inválidos'});
        }

        const contracts = getContrats(empresa, inicio);
        res.json(contracts.length ? contracts : {message:'Informação não encontrada.'});
        });

        function getContrats(empresa, inicio);
        return[ 
            {empresa, inicio, contratoId: "0001", descricao: "Contrato De Empresa I"},
            {empresa, inicio, contratoId: "0002", descricao: "Contrato de Empresa II"},
        ];
        




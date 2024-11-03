//Importa o módulo 'express'
const express = require('express');

//Importa o módulo 'database' para interagir com o banco de dados
const db = require('./database');

//Cria uma nova intância da aplicação express
const app= express();

//Define a porta 
const port = 3000;

//Middleware para analisar o corpo das requisições como JSON
app.use(express.json());


//Rotas salas

//POST salas
//Rota para criar uma nova sala
app.post('/salas',(req, res) => {

    // EXtrai o 'nome' do corpo da requisição 
    const { nome} =req.body;

    //Execulta uma consulta SQL para inserir uma nova sala na tabela salas
    db.run("INSERT INTO salas (nome) VALUES (?)", [nome], function(err){
      if(err) {
        //Se ocorrer um erro, envia uma resposta com status 400 e uma mensagem erro
        return res.status(400).json({error: err.message});
      }  
      //Envia uma resposta com status 201 (criado) e o id da nova sala
      res.status(201).json({ id: this.lastID});
     });
});

//GET salas
//Rota para listar todas as salas
app.get('/salas',(req, res) => {

  //Executa uma consulta SQL para selecionar todas as salas da tabela salas
  db.all("SELECT * FROM salas", [],(err,rows)=>{
    if(err) {
      //Se ocorrer um erro, envia uma resposta com status 400 e uma mensagem erro
      return res.status(400).json({error: err.message});
    }  
    //Envia a resposta com os salas obtidas como JSON
    res.json(rows);
   });
});


//GET/id salas
//Rota para ver uma sala específica 
app.get('/salas/:id',(req,res)=>{
   //Extrai o id dos parâmetos da requisição
  const { id } = req.params;

  //Executa uma consulta SQL para selecionar um produto expecífico pelo id 
  db.get("SELECT * FROM salas WHERE id = ?", [id],(err,row)=>{
    if(err){
      //Se ocorrer um erro, envia uma resposta com status 400 e uma mensagem erro
      return res.status(400).json({error: err.message});
    }
    //Envia a resposta com a sala obtida com JSON
    res.json(row);
  });
});

//PUT salas
//Rota para atualizar uma sala 
app.put('/salas/:id', (req,res)=>{
  //Extrai o id dos parâmetos da requisição
  const {id} = req.params;
  //Extrai o nome do corpo da requisição
  const {nome} = req.body;
   
  //Execulta uma consulta SQL para atualizar a sala com id fornecido
  //O id não  sera alterado
  db.run("UPDATE salas SET nome = ? WHERE id = ?", [nome,id], function(err){
    if(err){
      //Se ocorrer um erro, envia uma resposta com status 400 e uma mensagem erro
      return res.status(400).json({error: err.message});
    }
    //Envia a resposta com a quantidade de restros atualizados
    res.json({updated: this.changes});
  });
});


//DELETE salas
//Rota para deletar sala
app.delete('/salas/:id', (req,res)=>{
  //Extrai o id dos parâmetos da requisição
  const {id} = req.params;
   
  //Execulta uma consulta SQL para deletar a sala com id fornecido
  db.run("DELETE FROM salas WHERE id = ?", [id], function(err){
    if(err){
      //Se ocorrer um erro, envia uma resposta com status 400 e uma mensagem erro
      return res.status(400).json({error: err.message});
    }
    //Envia a resposta com a quantidade de arquivos deletados
    res.json({deleted: this.changes});
  });
});


//Rotas usuario

//POST usuarios
//Rota para criar um novo usuario
app.post('/usuario',(req, res) => {
  //Extrai o nome, login e senha do corpo da requisição
  const { nome,login,senha} =req.body;

  //Execulta uma consulta SQL para inserir um novo usuario
  db.run("INSERT INTO usuario (nome,login,senha) VALUES (?,?,?)", [nome,login,senha], function(err){
    if(err) {
      //Se ocorrer um erro, envia uma resposta com status 400 e uma mensagem erro
      return res.status(400).json({error: err.message});
    }  
    //Envia uma resposta com status 201 (criado) e o id do novo usuario
    res.status(201).json({ id: this.lastID});
   });
});

//GET usuarios
//Rota para listar todos os usuarios
app.get('/usuario',(req, res) => {

//Executa uma consulta SQL para selecionar todos os usuarios da tabela usuarios
db.all("SELECT * FROM usuario", [],(err,rows)=>{
  if(err) {
    //Se ocorrer um erro, envia uma resposta com status 400 e uma mensagem erro
    return res.status(400).json({error: err.message});
  }  
  //Envia a resposta com os usuarios como JSON
  res.json(rows);
 });
});

//GET/id usuarios
//Rota para obter um usuario específico
app.get('/usuario/:id',(req,res)=>{
 //Extrai o id dos parâmetos da requisição
 const { id } = req.params;
 
 //Execulta uma consulta SQL para selecionar um usuario específico
 db.get("SELECT * FROM usuario WHERE id = ?", [id],(err,row)=>{
  if(err){
    //Se ocorrer um erro, envia uma resposta com status 400 e uma mensagem erro
    return res.status(400).json({error: err.message});
  }
  //Envia a resposta com o osuario obtido como JSON
  res.json(row);
});
});

//PUT usuarios
//Rota para atualizar usuario
app.put('/usuario/:id', (req,res)=>{
 //Extrai o id dos parâmetos da requisição
 const {id} = req.params;
 //Extrai o nome, login e senha do corpo da requisição
 const {nome,login,senha} = req.body;
 
 //Executa uma consulta SQL para atualizar o usuario com id fornecido
 db.run("UPDATE usuario SET nome = ?, login = ?, senha = ? WHERE id = ?", [nome,login,senha,id], function(err){
   if(err){
    //Se ocorrer um erro, envia uma resposta com status 400 e uma mensagem erro
     return res.status(400).json({error: err.message});
   }
   //Envia a resposta com a quamtidade de resgistros atualizados
   res.json({updated: this.changes});
});
});

//DELETE usuarios
//Rota para deletar usuarios
app.delete('/usuario/:id', (req,res)=>{
 //Extrai o id dos parâmetros da requisição 
 const {id} = req.params;
 
 //Execulta uma consulta SQL para deletar a sala com id fornecido
 db.run("DELETE FROM usuario WHERE id = ?", [id], function(err){
  if(err){
    //Se ocorrer um erro, envia uma resposta com status 400 e uma mensagem erro
    return res.status(400).json({error: err.message});
  }
  //Envia a  resposta com a quantidade de resgistros deletados
  res.json({deleted: this.changes});
});
});


//table para materias


//POST materias
//Rota para criar uma nova materia
app.post('/materias',(req, res) => {
  //Extrai o nome do corpo da requisição
  const { nome} =req.body;

  //Executa uma consulta SQL para inserir uma nova materia 
  db.run("INSERT INTO materias (nome) VALUES (?)", [nome], function(err){
    if(err) {
      //Se ocorrer um erro, envia uma resposta com status 400 e uma mensagem erro
      return res.status(400).json({error: err.message});
    }  
     //Envia uma resposta com status 201 (criado) e o id da nova materia
    res.status(201).json({ id: this.lastID});
   });
});


//GET materias
//Rota para listar todas as materias
app.get('/materias',(req, res) => {

//Executa uma consulta SQL para selecionar todas as materias 
db.all("SELECT * FROM materias", [],(err,rows)=>{
  if(err) {
    //Se ocorrer um erro, envia uma resposta com status 400 e uma mensagem erro
    return res.status(400).json({error: err.message});
  }  
  //Envia a resposta com as materias obitidas como JSON
  res.json(rows);
 });
});

//GET/id materias
//Rota para obter uma materia específica
app.get('/materias/:id',(req,res)=>{
 //Extrai o id dos parâmetros da requidição
 const { id } = req.params;
 
 //Executa uma consulta SQL para selecionar uma materia específica
 db.get("SELECT * FROM materias WHERE id = ?", [id],(err,row)=>{
  if(err){
    //Se ocorrer um erro, envia uma resposta com status 400 e uma mensagem erro
    return res.status(400).json({error: err.message});
  }
  //Envia a resposta com a materia obtida como JSON
  res.json(row);
});
});

//PUT materias
//Rota para atualizar materia
app.put('/materias/:id', (req,res)=>{
 //Extrai o id dos parâmetros da requisição
 const {id} = req.params; 
 //Extri o nome do corpo da requisução
 const {nome} = req.body;
 
 //Executa uma consulta SQL para atualizar uma sala com id fornecido
 db.run("UPDATE materias SET nome = ? WHERE id = ?", [nome,id], function(err){
  if(err){
    //Se ocorrer um erro, envia uma resposta com status 400 e uma mensagem erro
    return res.status(400).json({error: err.message});
  }
  //Envia a respost com a quantidade de registros atualizados
  res.json({updated: this.changes});
});
});

//DELETE materias
//Rota para deletar materia
app.delete('/materias/:id', (req,res)=>{
 //Extrai o id dos parâmetros da requisição
 const {id} = req.params;

 //Execulta uma consulta SQL para deletar um a materia com id fornecido
 db.run("DELETE FROM materias WHERE id = ?", [id], function(err){
  if(err){
    //Se ocorrer um erro, envia uma resposta com status 400 e uma mensagem erro
    return res.status(400).json({error: err.message});
  }
  //Envia a resposta com a quantidade de resgistros deletados
  res.json({deleted: this.changes});
});
});

//Inicia o servidor e faz com que ele escute na porta especificada
app.listen(port, ()=>{
 //Exebe uma mensagem no console quando o servidor está em execuçaõ
  console.log(`Servidor rodando em http://localhost:${port}`);
});

//Importa o módulo 'sqlite3'
const sqlite3 = require('sqlite3').verbose();

//Cria uma nova instância do banco de dados
//O arquivo  'database.db'  será usado para armazenar os dados   
const db = new sqlite3.Database('/SILVIOAPIDIA04/database.db');

//Configuração inicial do banco de dados 
db.serialize(()=>{

    //Cria uma tabela se ela ainda não existir
    db.run(`CREATE TABLE IF NOT EXISTS salas(
             id INTEGER PRIMARY KEY AUTOINCREMENT,
             nome TEXT NOT NULL
        )`
    );

    db.run(`
        CREATE TABLE IF NOT EXISTS usuario(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT NOT NULL,
          login TEXT NOT NULL,
          senha TEXT NOT NULL
          )`
    );

    db.run(`
        CREATE TABLE IF NOT EXISTS materias(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL
        )`
    );

})

//Exporta a instância do banco de dados para que possa ser ultilizada em outros arquivos
module.exports = db;
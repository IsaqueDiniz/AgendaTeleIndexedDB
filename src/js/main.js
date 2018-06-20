const
	nome = document.getElementById('nome'),
	numero = document.getElementById('numero'),
	email = document.getElementById('email');

// INDEXEDDB
let db;
// Verifica a exitência e suporte ao IDB
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	if(!window.indexedDB) { /*Se não há suporte, retorna um aviso*/
		alert('Não há suporte')
	};

	let request = window.indexedDB.open('AgendaTelefônica', 1); /*Abre bando de dados e define a versão com um inteiro*/

	request.addEventListener('error', function(event) {
		// Função callback de erro
		console.log('Houve algum erro:Erro ' + event.target.errorCode);
	});

	request.addEventListener('success', function(event) {
		// Função callback de sucesso
		console.log('Banco aberto com sucesso!');
			db = request.result; /*Atribui à 'db' o resutlado da requisição*/
	});

// Manipulação do dB e criação de ObjStores

	request.addEventListener('upgradeneeded', function(event) {
	// Manipuação do dB
		let db = event.target.result; /*Cria e atribui à var db LOCAL o resultado da atualização do dB*/
		let	objStores = db.createObjectStore( 'Lista/Tabela', { keyPath: 'nome'} ); 
		// Cria o objectStore 'Lista/Tabela' setando o keyPath(chave de busca/key) como sendo a propriedade nome do bando
	});





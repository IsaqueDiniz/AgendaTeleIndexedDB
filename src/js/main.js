const teste = {
	nome: 'Isaque',
	numero: '9404201',
	email: 'sasiaisai'
}

const
	nome = document.getElementById('nome'),
	numero = document.getElementById('numero'),
	email = document.getElementById('email');

// INDEXEDDB
// Verifica a exitência e suporte ao IDB
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	if(!window.indexedDB) { /*Se não há suporte, retorna um aviso*/
		alert('Não há suporte')
	}

		let
			request = window.indexedDB.open('AgendaTelefônica', 1), /*Abre banco de dados e define a versão com um inteiro*/
			db, /*Definada para manipulação do bando de dados*/
			tx, /*Define as transactios (transações)}*/
			store, /*Instancia do db para criação e manipulação do objectStore*/
			index; /*Define um index*/

		request.addEventListener('error', function(event) {
			// Função callback de erro
			console.log('Houve algum erro:Erro ' + event.target.errorCode);
		});
		
		request.addEventListener('upgradeneeded', function(event) {
			// Manipuação do dB
			let
				db = request.result, /*Definida para criar e todo o banco de dados e instaciar as outras variaveis*/
				store = db.createObjectStore('Contatos', { keyPath: 'nome' }) /*define keyPath como sendo a proprieda "nome" do objeto*/
		});

		request.addEventListener('success', function(event) {
			// Função callback de sucesso
			console.log('Banco aberto com sucesso!');
				db = request.result; //Atribui à 'db' o resutlado da requisição bem sucedida
				tx = db.transaction('Contatos', 'readwrite'); // Define a tranzação no objectStore criado e define o tipo de transação
				store = tx.objectStore('Contatos');

				db.addEventListener('error', function(event) {
					// Função callback da manipulação do banco;
					console.log('Error:' + '' +  event.target.errorCode);
				});


				let isaque = store.get('Isaque');
				
				isaque.addEventListener('success', function() {
					console.log(isaque.result)
					console.log()
				});

				tx.addEventListener('complete', function() {
					db.close(); // Fecha o banco de dados quando a tranzação é completada
				});

		});

// Manipulação do dB e criação de ObjStores





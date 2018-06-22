// INDEXEDDB
// Verifica a exitência e suporte ao IDB
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	if(!window.indexedDB) { /*Se não há suporte, retorna um aviso*/
		alert('Não há suporte')
	}

		let
			request = window.indexedDB.open('AgendaTelefônica', 1), /*Abre banco de dados e define a versão com um inteiro*/
			db, /*Definida para manipulação do bando de dados*/
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

		// FLUXO PROGRAMA CASO RESULTADO DA REQUISIÇÃO SEJA BEM SUCEDIDO
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

				// FLUXO DO PROGRAMA

				const
					inputs = document.getElementsByClassName('input'), /*Pega todos inputs*/
					alertas = document.getElementsByClassName('Alert'); /*Pega as mensagens*/


						inputs[0].addEventListener('input', function (event) { /*Começa a fazer a avaliação quando o usuário começa a digitar*/
							/*Faz a manipulação da amostra da msg para cada elemento do loop*/
							if (event.target.value == '' ) {
								alertas[0].style.display = 'block';
							};
							if (event.target.value !== '' ) {
								alertas[0].style.display = 'none';
							};
						});

						inputs[1].addEventListener('input', function (event) { /*Começa a fazer a avaliação quando o usuário começa a digitar*/
							/*Faz a manipulação da amostra da msg para cada elemento do loop*/
							if (event.target.value == '' ) {
								alertas[1].style.display = 'block';
							};
							if (event.target.value !== '' ) {
								alertas[1].style.display = 'none';
							};
						});

						inputs[2].addEventListener('input', function (event) { /*Começa a fazer a avaliação quando o usuário começa a digitar*/
							/*Faz a manipulação da amostra da msg para cada elemento do loop*/
							if (event.target.value == '' ) {
								alertas[2].style.display = 'block';
							};
							if (event.target.value !== '' ) {
								alertas[2].style.display = 'none';
							};
						});
	
				// FIM DO FLUXO DO PROGRAMA

				tx.addEventListener('complete', function() {
					db.close(); // Fecha o banco de dados quando a tranzação é completada
				});

		});


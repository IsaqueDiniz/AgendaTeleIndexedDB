// INDEXEDDB
// Verifica a exitência e suporte ao IDB
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	if(!window.indexedDB) { /*Se não há suporte, retorna um aviso*/
		alert('Não há suporte')
	}
	let
		request = window.indexedDB.open('AgendaTelefônica', 2), /*Abre banco de dados e define a versão com um inteiro*/
		db, /*Definida para manipulação do bando de dados*/
		tx, /*Define as transactios (transações)}*/
		store, /*Instancia do db para criação e manipulação do objectStore*/
		index; /*Define um index*/

	let inputsStateOK = null; /*Variavel que muda de acordo com o status dos inputs*/

	const
		inputs 	= document.getElementsByClassName('input'), /*Pega todos inputs*/
		alertas = document.getElementsByClassName('Alert'),
		sendBTN = document.getElementById('addBTN'); /*Pega as mensagens*/
					
					for ( let i = 0; i < inputs.length; i++) {
						inputs[i].addEventListener('input', function (event) { /*Começa a fazer a avaliação quando o usuário começa a digitar*/
							/*Faz a manipulação da amostra da msg para cada elemento do loop*/
							if (event.target.value == '' ) {
								alertas[i].style.display = 'block';
								sendBTN.disabled = true;
								inputsStateOK = false;
							};
							if (event.target.value !== '' ) {
								alertas[i].style.display = 'none';
								sendBTN.disabled = false;
								inputsStateOK = true;
							};
						});
					};

			if (inputsStateOK !== true) { /*Ativa ou desativa o botão de envio de acordo com os status dos inputs*/
				sendBTN.disabled = true;
			}else {
				sendBTN.disabled = false;
			}

		request.addEventListener('error', function (event) {
			console.log('Aconteceu um erro: ' + event.target.errorCode);
		});

		request.addEventListener('upgradeneeded', function (event) {
			console.log('Banco Atualizado com sucesso');
			db = event.target.result;
			let store = db.createObjectStore('Contatos', { keyPath: 'nome' })
		})


		// Operação do banco de dados
		request.addEventListener('success', function (event) {
			console.log('Banco aberto com sucesso');
			db = event.target.result;

				sendBTN.onclick = function (event) { /*Inicia a operação de contatos no banco de dados*/
					
					const Contatos = { /*Define o objeto que receberá os valores do input*/
						nome : inputs[0].value,
						telefone : inputs[1].value,
						email : inputs[2].value
					};

					console.log(Contatos);

				 tx = db.transaction(['Contatos'], 'readwrite');
				 let objectStore = tx.objectStore('Contatos');
	    			 objectStore.add(Contatos); /*Armazena o objeto no banco de dados*/

	    			

			}

			// const adicionarContato = (function () {
			

			// 	tx.addEventListener('complete', function (event) {
			// 		console.log('Adicionado com sucesso')
			// 	});
			// 	tx.addEventListener('error', function (event) {
			// 		console.log('Houve um erro na transação: ' + event.target.erroCode);
			// 	});

			// let objectStore = tx.objectStore('Contatos');
			// 	objectStore.add( { nome: 'Isaque', telefone: '456465', email: 'hgajkghajkga' } )



			// })();
		})

		





		
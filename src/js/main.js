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

	const
		inputs 	= document.getElementsByClassName('input'), /*Pega todos inputs*/
		alertas = document.getElementsByClassName('Alert'), /*Pega as mensagens*/
		sendBTN = document.getElementById('addBTN');

	let globalTableLinhas;
					
					for ( let i = 0; i < inputs.length; i++) {
						inputs[i].addEventListener('blur', function (event) { /*Começa a fazer a avaliação quando o usuário começa a digitar*/
							/*Faz a manipulação da amostra da msg para cada elemento do loop*/
							if (event.target.value == '' ) {
								alertas[i].style.display = 'block';
							};
							if (event.target.value !== '' ) {
								alertas[i].style.display = 'none';
							};				
						});
						inputs[i].addEventListener('blur', function() { /*Verifica os status dos inpust para modificar o botão de adicionar*/
							if((inputs[0].value == '') || (inputs[1].value == '') || (inputs[2].value == '')) {
								sendBTN.disabled = true;
								sendBTN.removeAttribute('class');
							}else {
								sendBTN.disabled = false;
								sendBTN.setAttribute('class', 'addBTN');
								};
						});
					};

		request.addEventListener('error', function (event) {
			console.log('Aconteceu um erro: ' + event.target.errorCode);
		});

		request.addEventListener('upgradeneeded', function (event) { /*Cria objectStore*/
			console.log('Banco Atualizado com sucesso');
			db = event.target.result;
			let store = db.createObjectStore('Contatos', {autoIncrement : true }) // AutoIncrement define uma chave automatica para cada objeto adicionado ao banco de dados
		})

		// Operação do banco de dados
		request.addEventListener('success', function (event) {
			setTimeout(openMsg, 500);
			console.log('Banco aberto com sucesso');
			db = event.target.result; /*Cria objeto para manipulção do banco de dados*/

			// Função callback que adiciona dados ao banco
				sendBTN.onclick = function (event) { /*Inicia a operação de contatos no banco de dados*/
					const Contatos = { /*Define o objeto que receberá os valores do input*/
						nome : inputs[0].value,
						telefone : inputs[1].value,
						email : inputs[2].value
					};console.log(Contatos);
					let tx = db.transaction(['Contatos'], 'readwrite'); /*Cria transação*/
					tx.oncomplete = onTransactionSuccess //Quando a transação é bem sucedida mostra um aviso 

					tx.onerror = function (event) {
						console.log('Erro ao adicionar no banco');
						alert('Ocorreu um erro ao adicionar ao banco. Erro: ' + event.target.errorCode)
					};
					let objectStore = tx.objectStore('Contatos');
		    			 objectStore.add(Contatos); /*Armazena o objeto no banco de dados*/
					GetResources(); /*Chama a função para atualizar a view*/
				};
			GetResources(); /*Chama essa função para carregar view com os dados ao iniciar aplicativo*/
		});


			

	function GetResources (event) { /*Essa função recupera os dados do banco*/
				const tabela = document.getElementById('contatosView'); 
				globalTable = tabela; /*Atribui a tabela para manipulação futuras*/
				tabela.innerHTML = ''; /*reseta a tabela para quando for adicionado novos dados não se repetir os antigos*/
				let Get = db.transaction(['Contatos'], 'readwrite').objectStore('Contatos'); /*Cria transação 'get'*/

				Get.openCursor().onsuccess = function(event) {
					let cursor = event.target.result;
					let state = ''; /*variavel para ser somada ao inner da tabela*/
						if(cursor) {
							console.log(cursor.value.nome + ' recuperado com sucesso');
							state += '<tr class="row '+ cursor.key +'" id="row'+ cursor.key +'">';
							state +=   '<td class="tindex" id="tindex' + cursor.key +'">' + cursor.key + '</td>';
							state +=   '<td class="tnome" id="tnome'+ cursor.key +'">' + cursor.value.nome + '</td>';
							state +=   '<td class="ttelefone" id="ttelfone'+ cursor.key +'">' + cursor.value.telefone + '</td>';
							state +=   '<td class="temail" id="temail'+ cursor.key +'"">' + cursor.value.email + '</td>';
							state +=   '<td class="texcluir" id="texcluir'+ cursor.key +'" onclick="deletarContato('+cursor.key+'), GetResources()"' + '>' + ' X ' + '</td>';
							state += '</tr>' ;
							cursor.continue();
						}else { 
							console.log('Terminada recuperação de dados');
						};
					tabela.innerHTML += state; /*adiciona os dados no final do loop*/
				};
			};

	function deletarContato (contatoKey) {
		const alerta = document.getElementById('deleteMessage');
		let deleteOperation = db.transaction(['Contatos'], 'readwrite').objectStore('Contatos').delete(contatoKey); /*usa o argumento que será passado para deletar X contato*/
			deleteOperation.onsuccess = function () {
				console.log('deletado com sucesso');
				alerta.style.visibility = 'visible';
				alerta.style.opacity = '1';
				setTimeout(function() {
					alerta.style.visibility = 'hidden';
					alerta.style.opacity = '0';				
				}, 1000);
			};
	};

	function openMsg () {
		const alerta = document.getElementById('openMessage');
		alerta.style.visibility = 'visible';
		alerta.style.opacity = '1';
		setTimeout(function() {
			alerta.style.opacity = '0';
			alerta.style.visible = 'hidden';
		}, 2000);
	};

	function onTransactionSuccess () {
		const statusBOX = document.getElementById('statusBox'); 
		statusBOX.style.visibility = 'visible';
		statusBOX.style.opacity = '1';							
		setTimeout(function() { /*Apaga o aviso da tela*/
			statusBOX.style.opacity = '0';	
			statusBOX.style.visibility = 'hidden';
		}, 2000);
		for (let i = 0; i < inputs.length; i++) {
				inputs[i].value = ''; /*Reseta os valores dos inputs*/
			};
		sendBTN.disabled = true; /*Desabilita o controle*/
		sendBTN.removeAttribute('class'); 	
	};
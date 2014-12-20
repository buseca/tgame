$(document).ready(function(){
	




	function get_parametro(nome){
		if(!window.location.search) {
			console.log('ERRORE – nessun parametro');
		return false;
		}

		var qst = window.location.search.substr(1);
		var dati = qst.split(/\&/);
		var valore = '';

		for (var i=0; i<dati.length; i++) {
			var tmp = dati[i].split(/\=/);
			if (tmp[0] == nome) {

				if( tmp[1] === 'true' ) {





					console.log('goo!!');


					var tGameOggi = new Firebase('https://tgame.firebaseio.com/oggi');
					tGameOggi.on("value", function(snapshot) {
						var oggi = snapshot.val();

						tGameOggi.set( { 
							pl1 : false,
							pl2 : false,
							pl3 : false
						});

					});




				}


				// alert("trovato parametro " + nome + " con valore " + tmp[1]);
				// return tmp[1];
			} else {
				console.log("parametro " + nome + " non è presente nella query");
				// return false;
			}
		
		}

	}

	get_parametro('oggi');




});
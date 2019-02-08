function Column(id, name) {
  this.id = id;
  this.name = name;
  this.element = generateTemplate('column-template', { name: this.name, id: this.id });
  this.element.querySelector('.column').addEventListener('click', function (event) {
	  if (event.target.classList.contains('btn-delete')) {
	  	console.log(this);
	      this.removeColumn();
	  }

	  if (event.target.classList.contains('add-card')) {
	         var cardName = prompt("Enter the name of the card");
			  event.preventDefault();

			  var data = new FormData();
				data.append('name', cardName);
				data.append('bootcamp_kanban_column_id', self.id);

				fetch(baseUrl + '/card', {
				    method: 'POST',
				    headers: myHeaders,
				    body: data,
				  })
				  .then(function(res) {
				    return res.json();
				  })
				  .then(function(resp) {
				    var card = new Card(resp.id, cardName);
				    self.addCard(card);
				  });

			  self.addCard(new Card(cardName));
	  }
	});

  this.addCard = (card) => {
  	this.element.querySelector('ul').appendChild(card.element)
  }	
   this.removeColumn = () => {
	  fetch(baseUrl + '/column/' + this.id, { method: 'DELETE', headers: myHeaders })
	    .then(function(resp) {
	      return resp.json();
	    })
	    .then(function(resp) {
	      this.element.parentNode.removeChild(this.element);
	    });
	}

}

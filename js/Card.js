function Card(id, name) {
  this.id = id;
  this.name = name;
  this.element = generateTemplate('card-template', { description: this.name }, 'li');
  this.element.querySelector('.card').addEventListener('click', (event) => {
    event.stopPropagation();

    if (event.target.classList.contains('btn-delete')) {
      this.removeCard();
    }
  });
  this.removeCard = () => {
      var self = this;

      fetch(baseUrl + '/card/' + self.id, { method: 'DELETE', headers: myHeaders })
        .then(function(resp) {
          return resp.json();
        })
        .then(function(resp) {
          self.element.parentNode.removeChild(this.element);
        })
  }
}
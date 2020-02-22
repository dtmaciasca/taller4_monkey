describe('Los estudiantes under monkeys', function() {
    it('visits los estudiantes and survives monkeys', function() {
        cy.visit('https://losestudiantes.co');
        cy.contains('Cerrar').click();
        cy.wait(1000);
        randomEvent(10);
    })
})
function randomClick(monkeysLeft) {

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };

    var monkeysLeft = monkeysLeft;
    if(monkeysLeft > 0) {
        cy.get('a').then($links => {
            var randomLink = $links.get(getRandomInt(0, $links.length));
            if(!Cypress.dom.isHidden(randomLink)) {
                cy.wrap(randomLink).click({force: true});
                monkeysLeft = monkeysLeft - 1;
            }
            cy.wait(1000);
            randomClick(monkeysLeft);
        });
    }
}

function randomEvent(monkeysLeft) {

  var eventos = ["a","input","select", "button"]

  function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
  };

  function doEvent(evento, randomEvento){
      switch (evento) {
        case "input":
          cy.wrap(randomEvento).click().type("Ingreso un texto de prueba..........");
        break;
        case "select":
          cy.get(randomEvento).then(element => cy.get(randomEvento).select(element.val()));
        break;
        default:
          cy.wrap(randomEvento).click({force: true});
        break;
      }
  };

  var monkeysLeft = monkeysLeft;
  if(monkeysLeft > 0) {
    var evento = eventos[getRandomInt(0,3)];
    cy.get('body').then((body) => {
      if (body.find(evento).length > 0) {
        cy.get(evento).then($links => {
          var randomLink = $links.get(getRandomInt(0, $links.length));
          if(!Cypress.dom.isHidden(randomLink)) {
              doEvent(evento, randomLink);
              monkeysLeft = monkeysLeft - 1;
          }
          cy.wait(1000);
          randomEvent(monkeysLeft);
          });
      }
  });
  }
}

var { Board, Thermometer, Relay } = require("johnny-five");  //connects Johnny Five to the Arduino, the thermometer, and the relay
var board = new Board(
  {
    port: "Com3" //ensures correct communication port connection
  } 
);

board.on("ready", () => {


  
  const thermometer = new Thermometer({
    controller: "DS18B20",
    pin: 2
  }); //lets Johnny Five know the thermometer is connected to pin 2 in the Arduino

  const relay = new Relay({
    controller: "Songle",
    pin: 10
  }); //lets Johnny Five know the relay is connected to pin 10 in the Arduino

  thermometer.on("change", () => {
    var {fahrenheit} = thermometer; //sets the thermometer to take the temperature in fahrenheit
    console.log("Thermometer in sous vide: ", fahrenheit, "F");
    console.log("--------------------------------------");
    
    if (fahrenheit > 80){ //toggles the relay to open when the upper temperature is reached, and close when the lower temperature is reached 
      relay.open();
    } else if (fahrenheit < 79) {
      relay.close();
    } 
  }); 
}); 

/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  this.units = {
      gal : [ 'gallons'   , 'l'   , 3.78541  ],
      l   : [ 'liters'    , 'gal' , 0.26417  ],
      kg  : [ 'kilograms' , 'lbs' , 2.20462  ],
      lbs : [ 'pounds'    , 'kg'  , 0.453592 ],
      mi  : [ 'miles'     , 'km'  , 1.60934  ],
      km  : [ 'kilometers', 'mi'  , 0.621371 ]
    };
  
  this.getNum = n => (n.substring(0,n.indexOf(n.match( /[a-zA-Z]/ ))) || '1' ).split('/').reduce( ( a,b ) => a / b );
  
  // this.getUnit = u => {u=u.toLowerCase().match( /[a-z]/gi );return this.units[u] ? u : "BS"}
  this.getUnit = u => {u=u.toLowerCase().substring(u.indexOf(u.match( /[a-z]/i )));return this.units[u] ? u : "BS"}
  
  this.getReturnUnit = u => this.units[u][1];

  this.spellOutUnit = u => this.units[u][0];
  
  this.convert = (n,u) => n * this.units[u][2];
  
  this.getString = (initNum, initUnit, returnNum, returnUnit) => 
    initNum + " " + this.spellOutUnit(initUnit) + " converts to " + returnNum + " " + this.spellOutUnit(returnUnit);
  
}

module.exports = ConvertHandler;

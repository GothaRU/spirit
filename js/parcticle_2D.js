

class Parcticle{
    PP = {x:0,y:0}
    PPspeed = 10 
  D_PP = 1


    PE = {x:0,y:0}
    PEspeed  = 0.2
  D_PE = 0
    PEradius = 100
  D_RE = 0
  D_VE = 0

    PM = {x:0,y:0}
  D_PM = 0
    PMradius = 300
  D_RM = 0
  D_VM = 1




  time = 0

  




  




  constructor(POS_X,POS_Y){
      this.create_dom(POS_X,POS_Y)

      //this.PM.x = POS_X
      //this.PM.y = POS_Y
      this.time     = 0//       ((this.PEradius*4)/2)+Math.random() *((this.PEradius*4)/2)
      var S = 0.1 + Math.random() *0.1
      this.PEspeed  = (Math.round(Math.random()))?S:-S

      //alert(this.DPP)
  }
  create_dom(X,Y){


      var createDOM_V =(name,{x,y},power) => {
          this['D'+name]             = document.createElement(name)
          this['D'+name].style.left  =  x  + 'px'
          this['D'+name].style.top   =  y + 'px'
          this['D'+name].style.width =  100// power
          document.body.appendChild(this['D'+name])
      }

      var createDOM_P =(name,{x,y}) => {
          this['D'+name]            = document.createElement(name)
          this['D'+name].style.left =  x-5  + 'px'
          this['D'+name].style.top  =  y-5  + 'px'
          document.body.appendChild(this['D'+name])
      }
      var createDOM_R =(name,{x,y},R) => {
          this['D'+name]              = document.createElement(name)
          this['D'+name].style.left   =  x-R-2  + 'px'
          this['D'+name].style.top    =  y-R-2  + 'px'
          this['D'+name].style.width  =  R*2  +'px'
          this['D'+name].style.height =  R*2  +'px'

          document.body.appendChild(this['D'+name])
      }





      this.PP.x    = Math.random() *800
      this.PP.y    = Math.random() *800
      if(this.D_PP)  createDOM_P('PP',this.PP)


      this.PM.x     = X
      this.PM.y     = Y
      this.PMradius = 50
      if(this.D_PM)  createDOM_P('PM',this.PM)
      if(this.D_VM)  createDOM_V('VM',this.PP,100)
      if(this.D_RM)  createDOM_R('RM',this.PM,this.PMradius)

      this.PE.x     = Math.cos(this.time) * this.PEradius + this.PM.x
      this.PE.y     = Math.sin(this.time) * this.PEradius + this.PM.y
      this.PEradius = 75+Math.random() *25
      if(this.D_PE)  createDOM_P('PE',this.PE)
      if(this.D_VE)  createDOM_V('VE',this.PP,100)
      if(this.D_RE)  createDOM_R('RE',this.PM,this.PEradius)




  

  }
  SET_POS_PM (pos){
      this.PM.x = pos.X
      this.PM.y = pos.Y
      if(this.D_RE){
      this.DRE		.style.left   =  pos.X-this.PEradius-2  + 'px'
      this.DRE		.style.top    =  pos.Y-this.PEradius-2  + 'px'
      }


  }
  F_VE(){

      return { 
              atan2: Math.atan2( (this.PE.y - this.PP.y)    , (this.PE.x - this.PP.x)    ) ,
              len:    Math.sqrt( (this.PE.y - this.PP.y)**2 + (this.PE.x - this.PP.x)**2 )
              }
  }
  F_VM(){
          return { 
              atan2: Math.atan2( (this.PP.y - this.PM.y)    , (this.PP.x - this.PM.x)    ) ,
              len:    Math.sqrt( (this.PP.y - this.PM.y)**2 + (this.PP.x - this.PM.x)**2 )
              }
  }
  F_PE(){
      this.time += this.PEspeed
      this.PE.x =  Math.cos(this.time) * this.PEradius + this.PM.x
      this.PE.y =  Math.sin(this.time) * this.PEradius + this.PM.y
                  

                  if(this.DPE){
                          this.DPE.style.left =  this.PE.x-2  + 'px' 
                          this.DPE.style.top  =  this.PE.y-2  + 'px'
                  }


  }
  F_PP(){
      var Fspeed =(y)=>((y/10)**(1/4))*10
      var FULL = Math.abs(this.PEspeed*this.PEradius)

      var VE ={
          p :  Fspeed(this.F_VE().len) +(FULL-Fspeed(FULL)) ,     // Math.abs(this.PEspeed))**6  ,//this.F_VE().len*this.PPspeed,
          s : Math.sin(this.F_VE().atan2),
          c : Math.cos(this.F_VE().atan2),
      }
      var VM = {
          p : Math.abs(this.PEspeed*100),//this.F_VE().len*this.PPspeed,
          s : Math.sin(this.F_VM().atan2),
          c : Math.cos(this.F_VM().atan2),
      }
  var V2speed = 1-((this.F_VM().len - this.PMradius) / (this.PEradius - this.PMradius))
  VM.p = ((Math.abs(V2speed) + V2speed)/2)


console.log(FULL)

                  this.PP.x = this.PP.x + ( (VE.c * VE.p) ) + (VM.c * ((FULL/1.5)*VM.p)) 
                  this.PP.y = this.PP.y + ( (VE.s * VE.p) ) + (VM.s * ((FULL/1.5)*VM.p)) 

                  
                  this.DPP.style.left =  this.PP.x-5  + 'px' 
                  this.DPP.style.top  =  this.PP.y-5  +'px'





                  if(this.D_VM){
                                  this.DVM.style.left      =  this.PP.x+5  + 'px' 
                                  this.DVM.style.top       =  this.PP.y+5  +'px'
                                  this.DVM.style.transform = 'rotate('+ this.F_VM().atan2 * 180 / Math.PI  +'deg)'
                                  this.DVM.style.width     = VM.p +'px'
                  }

                  if(this.D_VE){
                                  this.DVE.style.left      =  this.PP.x+5  + 'px' 
                                  this.DVE.style.top       =  this.PP.y+5  +'px'
                                  this.DVE.style.transform = 'rotate('+ this.F_VE().atan2 * 180 / Math.PI  +'deg)'
                                  this.DVE.style.width     = VE.p*5 +'px'
                  }




                              }
  tic(){

      this.F_PE()
      this.F_PP()
  }
}


var PM = document.getElementsByTagName('PM')[0]







var [X,Y]=[300,400]



PM.onmousedown = function(e) {

var coords = getCoords(PM);
var shiftX = e.pageX - coords.left;
var shiftY = e.pageY - coords.top;

PM.style.position = 'absolute';
document.body.appendChild(PM);
moveAt(e);

PM.style.zIndex = 1000; // над другими элементами

function moveAt(e) {

var pos = {
x : e.pageX - shiftX,
y : e.pageY - shiftY,
}

PM.style.left = e.pageX - shiftX + 'px';
PM.style.top = e.pageY - shiftY + 'px';
// SET_POS_PM
X = pos.x +15
Y = pos.y +15
}

document.onmousemove = function(e) {
moveAt(e);
};

PM.onmouseup = function() {
document.onmousemove = null;
PM.onmouseup = null;
};

}

PM.ondragstart = function() {
return false;
};

function getCoords(elem) {   // кроме IE8-
var box = elem.getBoundingClientRect();
return {
top: box.top + pageYOffset,
left: box.left + pageXOffset
};
}
















document.body.style.setProperty('--X', X+'px');

document.body.style.setProperty('--Y', Y+'px');

var [PMx,PMy] = [parseInt(window.getComputedStyle(PM).left),parseInt(window.getComputedStyle(PM).top)]










console.log(PMx,PMy)
var PP1  = new Parcticle(X,Y)
var PP2  = new Parcticle(X,Y)
var PP3  = new Parcticle(X,Y)
var PP4  = new Parcticle(X,Y)
var PP5  = new Parcticle(X,Y)
var PP6  = new Parcticle(X,Y)
var PP7  = new Parcticle(X,Y)
var PP8  = new Parcticle(X,Y)
var PP11 = new Parcticle(X,Y)
var PP22 = new Parcticle(X,Y)
var PP33 = new Parcticle(X,Y)
var PP44 = new Parcticle(X,Y)
var PP55 = new Parcticle(X,Y)
var PP66 = new Parcticle(X,Y)
var PP77 = new Parcticle(X,Y)
var PP88 = new Parcticle(X,Y)
setInterval(()=>{

PP1 .SET_POS_PM({X,Y})
PP2 .SET_POS_PM({X,Y})
PP3 .SET_POS_PM({X,Y})
PP4 .SET_POS_PM({X,Y})
PP5 .SET_POS_PM({X,Y})
PP6 .SET_POS_PM({X,Y})
PP7 .SET_POS_PM({X,Y})
PP8 .SET_POS_PM({X,Y})
PP11.SET_POS_PM({X,Y})
PP22.SET_POS_PM({X,Y})
PP33.SET_POS_PM({X,Y})
PP44.SET_POS_PM({X,Y})
PP55.SET_POS_PM({X,Y})
PP66.SET_POS_PM({X,Y})
PP77.SET_POS_PM({X,Y})
PP88.SET_POS_PM({X,Y})

  
PP1.tic()
PP2.tic()
PP3.tic()
PP4.tic()
PP5.tic()
PP6.tic()
PP7.tic()
PP8.tic()

PP11.tic()
PP22.tic()
PP33.tic()
PP44.tic()
PP55.tic()
PP66.tic()
PP77.tic()
PP88.tic()


  },50) 


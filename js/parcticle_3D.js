//<script type="importmap">
//{
//    "imports": {
//      "three": "https://unpkg.com/three@<version>/build/three.module.js",
//      "three/addons/": "https://unpkg.com/three@<version>/examples/jsm/"
//    }
//  }
//</script>

var XY = 0 
var Z  = 0
var P  = (XY,Z)=> [ Math.cos(XY)*Math.cos(Z) , Math.sin(XY)*Math.cos(Z) , Math.sin(Z) ] // позиция на шаре с радиусом 1 


class Parcticle {
    PP       = {x:0,y:0}
    PPspeed  = 10 
    M_PP     = 1


    PE       = {x:0,y:0} //pointElement
    PEspeed  = 0.2
    PEradius = 100


    PM       = {x:0,y:0} //pointMaster
    PMradius = 300


    //M = matter
    M_list = {}
    //D = display
    //  R  = Radius        V   = Vector
    D_M_R  = 1  ;      D_M_V   = 1
    //  RM = RadiusMaster  VM  = VectorMaster      VM = pointMaster
    D_M_RM = 0  ;      D_M_VM  = 1           ; D_M_PM = 1
    //  RE = RadiusElement  VE = VectorElement     PE = pointElement
    D_M_RE = 0 ;          M_VE = 0  ;          D_M_PE = 0
    time   = 0

    constructor(){

    }
    CREATE_M_Point  ()  {
        var this.M_list['M_'+]
    }
    CREATE_M_Vector ()  {
        var this.M_list['M_'+]
    }
    CREATE_M_Radius ()  {
        var this.M_list['M_'+]
    }
    SET_D_posM(v3){}
    SET_D_posE(v3){}
    
    tic(){}
}
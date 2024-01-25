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

    constructor({scene,transformControl,three}){
        this . scene            = scene
        this . transformControl = transformControl
        this . three            = three
    }
    CREATE_M_Point  (pos3=[0,0,0])  {
                    pos3 = new this . three            . Vector3(...pos3);
       const 	geometry = new this . three            . SphereGeometry      ( 0.1, 20, 20 );
       const 	material = new this . three            . MeshLambertMaterial ( { color: Math.random() * 0xffffff } );
       const 	Sphere   = new this . three            . Mesh                ( geometry, material );
                Sphere   .     castShadow              = true;
                    this .     scene                   . add                 ( Sphere );
                Sphere   . position.copy           ( pos3 )
        return  Sphere
    }
    CREATE_M_Vector (points = [new three.Vector3( 0, 0, 0 ),new three.Vector3( 1, 0, 0 )])  {
        //var this.M_list['M_'+]
        const   Lmaterial = new this . three.LineBasicMaterial( { color: 0x0000ff } );
        const   Lgeometry = new this . three.BufferGeometry().setFromPoints( points );
        const   line = new this . three.Line( Lgeometry, Lmaterial );
                this . scene.add( line );
        return  line

    }
    CREATE_M_Radius ()  {
       // var this.M_list['M_'+]
    }
    SET_D_posM(v3){}
    SET_D_posE(v3){}
    
    tic(){}
}

export {Parcticle};
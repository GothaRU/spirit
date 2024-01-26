//<script type="importmap">
//{
//    "imports": {
//      "three": "https://unpkg.com/three@<version>/build/three.module.js",
//      "three/addons/": "https://unpkg.com/three@<version>/examples/jsm/"
//    }
//  }
//</script> 

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
    M_P_list = []
    //D = display
    //  R  = Radius        V   = Vector
    D_M_R  = 1  ;      D_M_V   = 1
    //  RM = RadiusMaster  VM  = VectorMaster      PM = pointMaster
    D_M_RM = 1  ;      D_M_VM  = 1           ; D_M_PM = 1
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
    CREATE_M_Vector (points = [new this.three.Vector3( 0, 0, 0 ),new this.three.Vector3( 1, 0, 0 )])  {
        //var this.M_list['M_'+]
        const   Lmaterial = new this . three.LineBasicMaterial( { color: 0x0000ff } );
        const   Lgeometry = new this . three.BufferGeometry().setFromPoints( points );
        const   line = new this . three.Line( Lgeometry, Lmaterial );
                this . scene.add( line );
        return  line
    }
    CREATE_M_Radius ({divisions=30,radius=1}={})  {
        const vertices = [];
        divisions = divisions * radius
        for ( let i = 0; i <= divisions; i ++ ) {
            const v = ( i / divisions ) * ( Math.PI * 2 );
            const x = Math.sin(v)*radius;
            const z = Math.cos(v)*radius;
            vertices.push( x, 0, z );
        }
        const   Lgeometry = new this . three.BufferGeometry();
                Lgeometry.setAttribute( 'position', new this . three.Float32BufferAttribute( vertices, 3 ) );
        const   Lmaterial = new this . three.LineBasicMaterial( {
                    color: Math.random() * 0xffffff,
                    linewidth: 10
                });
                const   line = new this . three.Line( Lgeometry, Lmaterial );
                this . scene.add( line );
        return  line     
    }
    CREATE_M_Master(pos3 =[0,0,0] ){
        this.PM  = this.CREATE_M_Point (pos3)
        this.transformControl  . attach              (this.PM);

        if(this.D_M_RM) this.RM  = this.CREATE_M_Radius ({divisions:30,radius:1})

    }
    CREATE_M_Particle(pos3 =[0,0,0]){
       this.M_P_list.push({
        PP : this.CREATE_M_Point (pos3),
        VP : this.CREATE_M_Vector([new this.three.Vector3( 0, 0, 0 ),new this.three.Vector3( 1, 0, 0 )]),
        VM : this.CREATE_M_Vector([new this.three.Vector3( 0, 0, 0 ),new this.three.Vector3( 1, 0, 0 )]),

        PT : this.CREATE_M_Point  (this.PM.position.clone().add(new this.three.Vector3( 1.5, 0, 0 ))),
        RT : this.CREATE_M_Radius ({divisions:30,radius:1.5}),

       }
        
        
        
        )


      // var PT_pos = [
      //              
      // ]
      // this.M_PT_list.push( this.CREATE_M_Point (PT_pos) )
    }
    tic(iFrame){
      //console.log(this.PM.position , this.M_PP_list[0].position )  


      var XZ = 0//iFrame/12 
      var Y  = 0//iFrame/48
      var Pi  = (XZ,Y)=> [ Math.cos(XZ)*Math.cos(Y) , Math.sin(Y),Math.sin(XZ)*Math.cos(Y)  ] // позиция на шаре с радиусом 1 
      
      


        for(let P of this.M_P_list){
            //console.log(P)
            this.RM.position.copy(this.PM.position)
            P.RT.position.copy(this.PM.position)
            P.RT.rotation.set(0,0,Y)
            P.PT.position.copy(this.PM.position
                                      .clone    ()
                                      .add      (new this.three.Vector3        ( ...Pi(XZ,0) )
                                                               .multiplyScalar (1.5)
                                                               .applyEuler     (P.RT.rotation)) )
                                           
                    var FULL = Math.abs(2*1.5)
                    let D = 1-((this.PM.position.distanceTo(P.PP.position) - 1 )/(1.5 - 1)   )
            P.PP.position
                .add(  
                            P.PT.position
                                .clone()
                                .sub(P.PP.position)
                                .multiplyScalar(0.03)       
                )
                .sub(  
                    this.PM.position
                        .clone()
                        .sub(P.PP.position)
                        .multiplyScalar((FULL/10)*((Math.abs(D) + D)/10))       
            )


//     V2speed = 1-((this.F_VM().len - this.PMradius) / (this.PEradius - this.PMradius))
           
            let pos0 = P.VM.geometry.attributes.position
            pos0  . needsUpdate = true;
            pos0  . setXYZ (0 , ...P.PP.position.clone()
                                                .sub(  this.PM.position
                                                                    .clone()
                                                                    .sub(P.PP.position)
                                                                    .multiplyScalar((Math.abs(D) + D)/2)  )
                                                .toArray()
                            )
            pos0  . setXYZ (1 , ...P.PP.position.toArray())







//.clone().sub(P.PT.position).multiplyScalar(0.05)
            let pos1 = P.VP.geometry.attributes.position
            pos1  . needsUpdate = true;
            pos1  . setXYZ (0 , ...P.PP.position.clone()
                                                .add(  P.PT.position
                                                                    .clone()
                                                                    .sub(P.PP.position)
                                                                    .multiplyScalar(0.5)  )
                                                .toArray()
            )
            pos1  . setXYZ (1 , ...P.PP.position.toArray())

        }
      
    }
}

export {Parcticle};
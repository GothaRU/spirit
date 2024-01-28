//<script type="importmap">
//{
//    "imports": {
//      "three": "https://unpkg.com/three@<version>/build/three.module.js",
//      "three/addons/": "https://unpkg.com/three@<version>/examples/jsm/"
//    }
//  }
//</script> 
    // 7[TODO_BUG] 
    // 7[TODO_HACK]
    // 7[TODO_ERROR]
    // 7[TODO_FIXME]
    // 7[TODO_TODO]
    // 7[TODO_XXX]
    // 7[TODO_[ ]]
    // 7[TODO_[x]]
    // 7[TODO_BUG]
    // 7[TODO_HACK]
    // 7[TODO_ERROR]
    // 7[TODO_FIXME]
    // 7[TODO_TODO]
    // 7[TODO_XXX]
    // 7[TODO_[ ]]
    // 7[TODO_[x]]
    //TODO: XXX ???
    //TODO: [ ]: неготова задача
    //[x]  готова задача
    //[TODO] ================
    //#tag [TODO_FIXME] jh kl
    // TODO: 545 345
    // CHEK : test 
    //TODO : REGION


class Parcticle {
    //#tag test BUG test
    // [TODO_IDEA] добавить основным частичкам частицы
    // [TODO_IDEA] чуть лучше оргонизовать методы класса
    //TODO:XXX [rgba(100,200,100,0.1)]test параметры  
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
// #endregion test 
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
        //#region [TODO_WORK] работа над частицей
        // [TODO_WORK] добавить рандомизацию параметров (розиции,радиуса)
        // [TODO_WORK] добавить переменные по позициям и радиусам
        // [TODO_WORK] добавить флаги отображения (векторов радиусов и точек)
       this.M_P_list.push({
      //PP = PointParticle
        PP : this.CREATE_M_Point (pos3),
      //VP = VectorParticle
        VP : this.CREATE_M_Vector([new this.three.Vector3( 0, 0, 0 ),new this.three.Vector3( 1, 0, 0 )]),
      //VM = VectorMaster
        VM : this.CREATE_M_Vector([new this.three.Vector3( 0, 0, 0 ),new this.three.Vector3( 1, 0, 0 )]),
      //PT = PointTarget
        PT : this.CREATE_M_Point  (this.PM.position.clone().add(new this.three.Vector3( 1.5, 0, 0 ))),
      //RT = RadiusTarget
        RT : this.CREATE_M_Radius ({divisions:30,radius:1.5}),
       })
       //#endregion
    }

    tic(iFrame){
      //console.log(this.PM.position , this.M_PP_list[0].position )  
      var Fspeed = (y)=>((y/10)**(1/4))*10
      var FULL   = Math.abs(2*1.5)

      var XZ = 0//iFrame/12 
      var Y  = 0//iFrame/48
      var Pi  = (XZ,Y)=> [ Math.cos(XZ)*Math.cos(Y) , Math.sin(Y),Math.sin(XZ)*Math.cos(Y)  ] // позиция на шаре с радиусом 1 
        ()()([])


        for(let P of this.M_P_list){
            // [TODO_WORK] добавить функцию скорости частице
            var PP_pos =    P.PP.position
            var PT_pos =    P.PT.position
            var PM_pos = this.PM.position

            let D = 1-((PM_pos.distanceTo(PP_pos) - 1 )/(1.5 - 1)   )

            var V ={
                 // [TODO_WORK] переписать PT_power через .applyEuler убрав Pi
                PT_power : PM_pos .clone() .add(new this.three .Vector3( ...Pi(XZ,0) ) .multiplyScalar (1.5) .applyEuler (P.RT.rotation) ),
                PP_to_PT : PT_pos .clone() .sub(PP_pos)                                 , 
                PM_to_PP : PM_pos .clone() .sub(PP_pos)                                 ,     
            }


            


            //console.log(P)
            this .RM.position.copy(PM_pos)
                P.RT.position.copy(PM_pos)
                P.RT.rotation.set(0,0,Y)


            //движение цели
            PT_pos.copy(V.PT_power )
            //движение частицы
            PP_pos
            .add(V.PP_to_PT.multiplyScalar(0.03))// сила движение к цели
            .sub(V.PM_to_PP.multiplyScalar((FULL/10)*((Math.abs(D) + D)/10)) )// сила отталкивания от центра
            

            //FIXME отображения векторов
            //визуальный вектор отталкивания

                //#region [TODO_FIXME] отсутствует отображение векторов
                //                     нужно вернуть
                         
            let VM_pos = P.VM.geometry.attributes.position
                VM_pos  .needsUpdate = true;
                console.log()
                VM_pos  .setXYZ(0 , ...PP_pos .clone   ()
                                              .sub     (  V.PM_to_PP.multiplyScalar((Math.abs(D) + D)/2)  )
                                              .toArray () )
                VM_pos  .setXYZ(1 , ...PP_pos .toArray () )


            //визуальный вектор движения к цели
            let VP_pos = P.VP.geometry.attributes.position
                VP_pos  . needsUpdate = true;
                
                VP_pos  . setXYZ (0 , ...PP_pos .clone   () 
                                                .add     (  V.PP_to_PT .multiplyScalar(0.5) )
                                                .toArray () )
                VP_pos  . setXYZ (1 , ...PP_pos .toArray () )
                //#endregion
        }
    }
}

export {Parcticle};
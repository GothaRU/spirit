// import * as three from './lib/threeJS/three.module.js';
import * as three from "three";
import { OrbitControls } from 'controls/OrbitControls.js';
import { TransformControls } from 'controls/TransformControls.js';
import { Parcticle } from 'parcticle_3D';


 //import { }     from './lib/threeJS/jsm/OrbitControls.js';

 //import * as three from './parcticle_3D.js';


const   scene  = new three.Scene();
		scene  . background = new three.Color( 0xf0f0f0 );
const 	camera = new three.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
		camera . position.z = 5;

const 	renderer = new three.WebGLRenderer();
		renderer.shadowMap.enabled = true;
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );



scene.add( new three.AmbientLight( 0xf0f0f0, 3 ) );
const light = new three.SpotLight( 0xffffff, 4.5 );
light.position.set( 0, 1500, 200 );
light.angle = Math.PI * 0.2;
light.decay = 0;
light.castShadow = true;
light.shadow.camera.near = 200;
light.shadow.camera.far = 2000;
light.shadow.bias = - 0.000222;
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;
scene.add( light );
				// Controls
				const controls = new OrbitControls( camera, renderer.domElement );
				controls.damping = 0.2;
				controls.addEventListener( 'change', render );

                let transformControl;
				transformControl = new TransformControls( camera, renderer.domElement );
				transformControl.addEventListener( 'change', render );
				transformControl.addEventListener( 'dragging-changed', function ( event ) {

					controls.enabled = ! event.value;

				});
				scene.add( transformControl );

				transformControl.addEventListener( 'objectChange', function (E) {
					updateMoveElemets(E);
				});
				//document.addEventListener( 'pointerdown', onPointerDown );
				//document.addEventListener( 'pointerup', onPointerUp );
				document.addEventListener( 'pointermove', onPointerMove );
				window.addEventListener( 'resize', onWindowResize );



const planeGeometry = new three.PlaneGeometry( 2000, 2000 );
planeGeometry.rotateX( - Math.PI / 2 );
const planeMaterial = new three.ShadowMaterial( { color: 0x000000, opacity: 0.2 } );
const plane = new three.Mesh( planeGeometry, planeMaterial );
plane.position.y = - 2;
plane.receiveShadow = true;
scene.add( plane );

const helper = new three.GridHelper( 20, 100 );
helper.position.y = - 1;
helper.material.opacity = 0.25;
helper.material.transparent = true;
scene.add( helper );

var P = new Parcticle 	   ({scene,transformControl,three})
P.CREATE_M_Master  ([0,0,0])
P.CREATE_M_Particle([1,1,1])
//P.CREATE_M_Particle([1,3,1])
//P.CREATE_M_Particle([1,1,4])
//var p1 = P . 	CREATE_M_Point ([0,0,0])
		//transformControl        . attach              ( p1 );

//var V1	=	P . 	CREATE_M_Vector ([
//										new three.Vector3( 0, 0, 0 ),
//										new three.Vector3( 0, 0, 0 ),
//									])

//var R1 = P .  CREATE_M_Radius({divisions:30,radius:0.5})

var iFrame = 0
function animate() {
	requestAnimationFrame( animate );
	P.tic(iFrame++)
	renderer.render( scene, camera );
}
animate();

function render() {renderer.render( scene, camera ); }

			function onPointerDown( event ) {
				onDownPosition.x = event.clientX;
				onDownPosition.y = event.clientY;
			}
			function onPointerUp( event ) {
				onUpPosition.x = event.clientX;
				onUpPosition.y = event.clientY;
				if ( onDownPosition.distanceTo( onUpPosition ) === 0 ) {
					transformControl.detach();
					render();
				}
			}

			function onPointerMove( event ) {}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

				render();

			}
			var r = 0 
			function updateMoveElemets(E) {}
			
import getMTLLoader from '../../asset/jsm/loaders/MTLLoader.js';
import getOBJLoader from '../../asset/jsm/loaders/OBJLoader.js';
import { OrbitControls } from '../../asset/jsm/controls/OrbitControls';
import objConfig from './obj.config.js'

export default function (canvas, THREE) {
  // let { DDSLoader } = getDDSLoader(THREE);
  let { MTLLoader } = getMTLLoader(THREE);
  let OBJLoader = getOBJLoader(THREE);
  let window = THREE.global;

  let camera, scene, renderer, controls;

  init();
  animate();


  function init() {
    //renderer
    {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    //camera
    {
      camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 1, 2000);
      camera.position.set(0, 0, 2.5)
    }
    //controls
    {
      controls = new OrbitControls(camera, canvas);
      controls.target.set(0, 0, 0);
      controls.update();
    }

    // scene & light
    {
      scene = new THREE.Scene();

      let ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
      scene.add(ambientLight);

      // let pointLight = new THREE.PointLight(0xcccccc, 0.5);
      // camera.add(pointLight);
      scene.add(camera);
    }

    // manager

    let manager = new THREE.LoadingManager();

    manager.onProgress = function (item, loaded, total) {

      console.log(item, loaded, total);

    };

    // texture

    let textureLoader = new THREE.TextureLoader(manager);

    let texture_metal = textureLoader.load(objConfig.map_pm);
    let texture_rough = textureLoader.load(objConfig.map_pr);

    // material
    let materialLoader = new MTLLoader(manager)
    let material = materialLoader.load(objConfig.mtl_url, (material) => {
      material.preload();

      // load obj
      let loader = new OBJLoader(manager);
      loader.setMaterials(material)
      loader.load(objConfig.obj_url, function (obj) {
        obj.traverse((child) => {
          if (child.isMesh) {
            const material = child.material;
            // 针对混元大模型生成的OBJ模型的material进行优化
            if (material && material.name==="material_0") {
              // 确保材质类型正确
              if (!(material instanceof THREE.MeshStandardMaterial || material instanceof THREE.MeshPhysicalMaterial)) {
                console.log("material type error!")
                child.material = new THREE.MeshStandardMaterial({
                  map: material.map,
                  metalnessMap: material.metalnessMap || texture_metal,
                  roughnessMap: material.roughnessMap || texture_rough,
                  specular: material.specular,
                  specularMap: material.specularMap,
                  color: material.color,
                  metalness: material.metalness || 0.5,
                  roughness: material.roughness || 0.5,
                });
              }

              // 打印材质信息以供调试
              console.log(child.material);
            }
          }
        });
        scene.add(obj);
      }, onProgress, onError);

    })

    // model

    function onProgress(xhr) {

      if (xhr.lengthComputable) {

        let percentComplete = xhr.loaded / xhr.total * 100;
        console.log('model ' + Math.round(percentComplete, 2) + '% downloaded');

      }

    }

    function onError(error) {
      console.log("loaderError", error)
    }
  }

  function animate() {

    canvas.requestAnimationFrame(animate);
    render();

  }

  function render() {

    camera.lookAt(scene.position);
    controls.update();
    renderer.render(scene, camera);

  }


}
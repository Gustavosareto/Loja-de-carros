document.addEventListener("DOMContentLoaded", () => {
    if (typeof THREE === 'undefined') {
        console.warn('Three.js is not loaded.');
        return;
    }

    // --- CONFIGURAÇÃO ---
    // O script tentará carregar este arquivo. 
    // Se não encontrar, mostrará um objeto "técnico" (TorusKnot) temporariamente.
    const MODEL_PATH = 'assents/engine.gltf'; 
    // ---------------------

    const container = document.createElement('div');
    container.id = 'webgl-canvas-container';
    Object.assign(container.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: '60', // Por cima de quase tudo para garantir que você veja
        pointerEvents: 'none',
        opacity: '0.8' // Leve transparência para não cobrir totalmente o site
    });
    document.body.appendChild(container);

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 10;
    camera.position.y = 2;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Luzes muito fortes para garantir visibilidade
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2);
    mainLight.position.set(10, 10, 10);
    scene.add(mainLight);

    const blueLight = new THREE.PointLight(0x1c69d4, 5, 50);
    blueLight.position.set(-5, 5, 5);
    scene.add(blueLight);

    const redLight = new THREE.PointLight(0xff0000, 0.5, 50); // Luz de destaque vermelha sutil
    redLight.position.set(-5, -5, 5);
    scene.add(redLight);

    // Grupo para manipular o objeto
    const objectGroup = new THREE.Group();
    scene.add(objectGroup);

    let activeObject = null;

    // Função para criar o Placeholder (Geometria Abstrata Técnica)
    function createPlaceholder() {
        const geometry = new THREE.TorusKnotGeometry(2.5, 0.6, 150, 20);
        // Material estilo "Wireframe Tecnológico"
        const material = new THREE.MeshStandardMaterial({ 
            color: 0x1c69d4, 
            wireframe: true,
            roughness: 0.5,
            metalness: 1.0,
            emissive: 0x112244
        });
        const mesh = new THREE.Mesh(geometry, material);
        return mesh;
    }

    // Tentar Carregar o Modelo
    const loader = new THREE.GLTFLoader();
    
    loader.load(
        MODEL_PATH,
        (gltf) => {
            // Sucesso ao carregar
            console.log("Modelo Engine carregado!");
            const model = gltf.scene;
            
            // Ajustar Escala Automaticamente
            const box = new THREE.Box3().setFromObject(model);
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 6 / maxDim; // Definir tamanho alvo
            model.scale.set(scale, scale, scale);
            
            // Centralizar
            box.setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);

            // Melhorar material se necessário
            model.traverse((o) => {
                if (o.isMesh) {
                    o.castShadow = true;
                    o.receiveShadow = true;
                    // Se o modelo for muito escuro, ajudar com emissive
                    if (o.material) {
                         o.material.envMapIntensity = 1;
                    }
                }
            });

            if (activeObject) objectGroup.remove(activeObject);
            activeObject = model;
            objectGroup.add(activeObject);
        },
        undefined, // Progress
        (error) => {
            console.log("Modelo não encontrado, usando placeholder.", error);
            // Se der erro (arquivo não existe), usa o Placeholder
            if (!activeObject) {
                activeObject = createPlaceholder();
                objectGroup.add(activeObject);
            }
        }
    );

    // Animação
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate); 

        const delta = clock.getDelta();
        const elapsed = clock.getElapsedTime();

        if (activeObject) {
            // Rotação constante (como um motor em exibição ou girando levemente)
            activeObject.rotation.y += 0.005; 
            
            // Flutuação leve
            activeObject.position.y = Math.sin(elapsed * 0.5) * 0.2;
        }

        renderer.render(scene, camera);
    }

    animate();

    // Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});

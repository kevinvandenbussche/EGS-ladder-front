import React, { Suspense, useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

export function Logo3d(){
    let [count, setCount] = useState(0);
    //incrementation de la valeur pour la vitesse de rotation
    const valueMaxRotate = 0.2;
    useEffect(() => {
      let countUpdated = count;
      //le booleens est la pour verifier que la valeur max est atteinte et pouvoir allez jusqu'au bout à l'opposé
      let left = true;
      const interval = setInterval(() => {
        let valuRotate = + 0.001;
        if(left && countUpdated < valueMaxRotate){
          valuRotate = +0.001; 
        }
        if(countUpdated >= valueMaxRotate){
          left = false
        }
        if(!left && countUpdated > - valueMaxRotate ){
          valuRotate = -0.001; 
        }
        if(countUpdated <= - valueMaxRotate){
          left = true
        }
        //un clone de la variable de count car si je modifie directement la valeur du hook ceci peut provoquer
        //des problemes de re,du du composant (beug)
        countUpdated = countUpdated + valuRotate;
        setCount(countUpdated);
      }, 5);
      return () => clearInterval(interval);
    }, []);
  
    function Model(props) {
      const { nodes, materials } = useGLTF('./logoEGS_03.glb')
      return (
        //les elements rotation sont la pour deplacer l'éléments selon sont propre plan
        <group {...props} dispose={null} rotation-z={count} rotation-y={0} rotation-x={0.5}>
          <mesh geometry={nodes.Curve003.geometry} material={materials['SVGMat.001']} position={[0, 0.05, 0]} scale={[15, 1, 15]} />
        </group>
      )
    }
    
    useGLTF.preload('./logoEGS_03.glb')
    return(
        <div className='position-relative-logo'>
            <Canvas camera={{position: [0,1.5,1], fov: 120}}>
                <ambientLight/>
                <directionalLight intensity={2} position={[0,1,0.50]}/>
                <Suspense>
                <Model rotation={[10,10,0]} />
                </Suspense>
            </Canvas>
        </div>
    )
}

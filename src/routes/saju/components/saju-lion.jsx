import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import lion from '../../../assets/lions/TalkFile_lion.glb.glb';
import * as THREE from 'three';
import { Suspense } from 'react';

function Model({ step }) {
  const { scene, animations } = useGLTF(lion);
  const modelRef = useRef();
  const mixer = useRef(null);

  // 애니메이션 초기화
  useEffect(() => {
    mixer.current = new THREE.AnimationMixer(scene);

    // 기본 애니메이션 재생
    const initialAction = mixer.current.clipAction(
      animations.find((clip) => clip.name === 'Armature|ShakeHand'),
    );
    if (initialAction) {
      initialAction.play();
    }

    return () => {
      // 컴포넌트 언마운트 시 모든 액션 정리
      mixer.current.stopAllAction();
    };
  }, [scene, animations]);

  // step 값에 따라 애니메이션 변경
  useEffect(() => {
    if (step === 0) {
      const shakeHandAction = mixer.current.clipAction(
        animations.find((clip) => clip.name === 'Armature|ShakeHand'),
      );
      if (shakeHandAction) {
        shakeHandAction.reset().play();
      }
    } else if (step === 1) {
      const thinkAction = mixer.current.clipAction(
        animations.find((clip) => clip.name === 'Armature|Think'),
      );
      if (thinkAction) {
        thinkAction.reset().play();
      }
    } else if (step === 2) {
      const completeAction = mixer.current.clipAction(
        animations.find((clip) => clip.name === 'Armature|Complete'),
      );
      if (completeAction) {
        completeAction.reset().play();
      }
    }
  }, [step, animations]);

  // 모델 업데이트: 회전, 위치, 크기 설정
  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.x = Math.PI / 2; // X축 기준 90도 회전
      modelRef.current.rotation.y = Math.PI; // Y축 기본 상태 유지
      modelRef.current.rotation.z = Math.PI / 2; // Z축 기준 180도 회전
      modelRef.current.position.y = -1.5; // Y축 위치 조정
      modelRef.current.scale.set(3, 3, 3); // 크기 설정
    }
    mixer.current?.update(delta); // 애니메이션 믹서 업데이트
  });

  return <primitive object={scene} ref={modelRef} />;
}

export const SajuLion = ({ step }) => {
  return (
    <div className="w-[615px]">
      <Canvas style={{ height: '600px' }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <directionalLight position={[0, 10, 5]} intensity={1.5} />
        <Suspense fallback={null}>
          <Model step={step} />
        </Suspense>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

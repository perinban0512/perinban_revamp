'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/** A real WebGL donut with icing and sprinkles that spins above the 3D chip. */
export default function Donut3D({ size = 150 }: { size?: number }) {
  const mount = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mount.current
    if (!el) return
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(size, size)
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100)
    camera.position.set(0, 0, 5)

    scene.add(new THREE.AmbientLight(0xffffff, 0.75))
    const key = new THREE.DirectionalLight(0xffffff, 1.6)
    key.position.set(3, 4, 5)
    scene.add(key)
    const rim = new THREE.DirectionalLight(0xffc0e0, 0.8)
    rim.position.set(-4, -2, -3)
    scene.add(rim)

    const donut = new THREE.Group()
    const dough = new THREE.Mesh(
      new THREE.TorusGeometry(1, 0.45, 32, 64),
      new THREE.MeshStandardMaterial({ color: 0xd99a5b, roughness: 0.75 }),
    )
    donut.add(dough)

    // Icing: a slightly fatter torus clipped to the top half.
    const icingGeo = new THREE.TorusGeometry(1, 0.48, 32, 64)
    const pos = icingGeo.attributes.position
    for (let i = 0; i < pos.count; i++) {
      if (pos.getZ(i) < -0.02) pos.setZ(i, -0.02 + pos.getZ(i) * 0.05)
    }
    icingGeo.computeVertexNormals()
    const icing = new THREE.Mesh(icingGeo, new THREE.MeshStandardMaterial({ color: 0xff7fb5, roughness: 0.35 }))
    icing.position.z = 0.02
    donut.add(icing)

    const sprinkleGeo = new THREE.CapsuleGeometry(0.03, 0.12, 4, 8)
    const colors = [0xffffff, 0xffd447, 0x5ee0ff, 0x9b8cff, 0x55d88a]
    for (let i = 0; i < 70; i++) {
      const a = Math.random() * Math.PI * 2
      const b = Math.random() * Math.PI * 0.9 + 0.05
      const r = 1 + Math.cos(b) * 0.5
      const s = new THREE.Mesh(sprinkleGeo, new THREE.MeshStandardMaterial({ color: colors[i % colors.length], roughness: 0.4 }))
      s.position.set(Math.cos(a) * r, Math.sin(a) * r, Math.sin(b) * 0.5 + 0.02)
      s.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3)
      donut.add(s)
    }

    donut.rotation.x = -0.9
    scene.add(donut)

    let frame = 0
    const t0 = performance.now()
    const tick = () => {
      const t = (performance.now() - t0) / 1000
      donut.rotation.z = t * 1.6
      donut.rotation.x = -0.9 + Math.sin(t * 1.3) * 0.25
      donut.position.y = Math.sin(t * 2.2) * 0.12
      renderer.render(scene, camera)
      frame = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(frame)
      renderer.dispose()
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose()
          ;(o.material as THREE.Material).dispose()
        }
      })
      el.removeChild(renderer.domElement)
    }
  }, [size])

  return <div ref={mount} style={{ width: size, height: size }} />
}

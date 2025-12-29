"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ParticleBackgroundProps {
    className?: string;
}

// Simple 2D simplex-like noise function for organic motion
function createNoise() {
    // Permutation table for pseudo-random gradients
    const perm = new Uint8Array(512);
    const grad = [
        [1, 1], [-1, 1], [1, -1], [-1, -1],
        [1, 0], [-1, 0], [0, 1], [0, -1],
    ];

    for (let i = 0; i < 256; i++) {
        perm[i] = Math.floor(Math.random() * 256);
    }
    for (let i = 256; i < 512; i++) {
        perm[i] = perm[i - 256];
    }

    return function noise2D(x: number, y: number): number {
        // Simplified 2D noise approximation
        const ix = Math.floor(x) & 255;
        const iy = Math.floor(y) & 255;
        const fx = x - Math.floor(x);
        const fy = y - Math.floor(y);

        // Smooth interpolation
        const u = fx * fx * (3 - 2 * fx);
        const v = fy * fy * (3 - 2 * fy);

        // Hash corners
        const aa = perm[perm[ix] + iy];
        const ab = perm[perm[ix] + iy + 1];
        const ba = perm[perm[ix + 1] + iy];
        const bb = perm[perm[ix + 1] + iy + 1];

        // Gradient dot products
        const g = (h: number, dx: number, dy: number) => {
            const g = grad[h & 7];
            return g[0] * dx + g[1] * dy;
        };

        // Interpolate
        const x1 = g(aa, fx, fy) * (1 - u) + g(ba, fx - 1, fy) * u;
        const x2 = g(ab, fx, fy - 1) * (1 - u) + g(bb, fx - 1, fy - 1) * u;

        return x1 * (1 - v) + x2 * v;
    };
}

export function ParticleBackground({ className = "" }: ParticleBackgroundProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const animationIdRef = useRef<number>(0);

    useEffect(() => {
        if (!containerRef.current) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return;

        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(
            -width / 2, width / 2, height / 2, -height / 2, 0.1, 1000
        );
        camera.position.z = 100;

        // Performance optimization: check device capabilities
        const isMobile = window.innerWidth < 768;

        // Renderer - disable antialiasing on mobile for performance
        const renderer = new THREE.WebGLRenderer({
            antialias: !isMobile,
            alpha: true,
            powerPreference: "high-performance",
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Create noise function
        const noise = createNoise();

        // Particle colors - more saturated for visibility on white
        const colors = [
            new THREE.Color("#6366f1"), // indigo
            new THREE.Color("#8b5cf6"), // violet
            new THREE.Color("#a855f7"), // purple
            new THREE.Color("#3b82f6"), // blue
            new THREE.Color("#06b6d4"), // cyan
        ];

        // Optimized particle count for better performance
        const particleCount = isMobile ? 200 : 400;

        // Create particle geometry
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colorArray = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        const originalPositions = new Float32Array(particleCount * 3);
        const noiseSeeds = new Float32Array(particleCount * 2); // Unique noise offset per particle

        for (let i = 0; i < particleCount; i++) {
            const x = (Math.random() - 0.5) * width;
            const y = (Math.random() - 0.5) * height;
            const z = 0;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            originalPositions[i * 3] = x;
            originalPositions[i * 3 + 1] = y;
            originalPositions[i * 3 + 2] = z;

            // Unique noise seed for each particle (creates variance in motion)
            noiseSeeds[i * 2] = Math.random() * 100;
            noiseSeeds[i * 2 + 1] = Math.random() * 100;

            // Random color from palette
            const color = colors[Math.floor(Math.random() * colors.length)];
            colorArray[i * 3] = color.r;
            colorArray[i * 3 + 1] = color.g;
            colorArray[i * 3 + 2] = color.b;

            // Varied sizes (2-4px for better visibility)
            sizes[i] = 2 + Math.random() * 2;
        }

        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));
        geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

        // Particle material with vertex colors
        const material = new THREE.PointsMaterial({
            size: 3,
            sizeAttenuation: false,
            vertexColors: true,
            transparent: true,
            opacity: 0.5,
            blending: THREE.NormalBlending,
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        // Smooth mouse tracking with lerp
        const mouse = { x: 0, y: 0 };
        const smoothMouse = { x: 0, y: 0 };

        const handleMouseMove = (event: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width - 0.5) * width;
            mouse.y = -((event.clientY - rect.top) / rect.height - 0.5) * height;
        };
        container.addEventListener("mousemove", handleMouseMove);

        // Animation
        let time = 0;
        let isActive = true;

        const animate = () => {
            if (!isActive) {
                animationIdRef.current = requestAnimationFrame(animate);
                return;
            }

            time += 0.0015; // Very slow time progression

            // Smooth mouse following (lerp) - faster response for more dynamic feel
            smoothMouse.x += (mouse.x - smoothMouse.x) * 0.15;
            smoothMouse.y += (mouse.y - smoothMouse.y) * 0.15;

            const positionsArray = geometry.attributes.position.array as Float32Array;

            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                const seedX = noiseSeeds[i * 2];
                const seedY = noiseSeeds[i * 2 + 1];

                // Noise-based organic motion (more natural than sine waves)
                const noiseScale = 0.8; // Controls "zoom" of noise pattern
                const noiseX = noise(seedX + time * 0.5, seedY) * 25;
                const noiseY = noise(seedX, seedY + time * 0.4) * 25;

                // Secondary layer of slower, larger motion for depth
                const noiseX2 = noise(seedX * noiseScale + time * 0.2, seedY * noiseScale) * 15;
                const noiseY2 = noise(seedX * noiseScale, seedY * noiseScale + time * 0.15) * 15;

                positionsArray[i3] = originalPositions[i3] + noiseX + noiseX2;
                positionsArray[i3 + 1] = originalPositions[i3 + 1] + noiseY + noiseY2;

                // Enhanced cursor repulsion with larger radius and stronger force
                const dx = positionsArray[i3] - smoothMouse.x;
                const dy = positionsArray[i3 + 1] - smoothMouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const maxDist = 180; // Larger influence radius

                if (dist < maxDist && dist > 0) {
                    // Stronger repulsion force with easing for smooth falloff
                    const normalizedDist = dist / maxDist;
                    const force = Math.pow(1 - normalizedDist, 2) * 35; // Quadratic falloff, stronger force
                    positionsArray[i3] += (dx / dist) * force;
                    positionsArray[i3 + 1] += (dy / dist) * force;
                }
            }

            geometry.attributes.position.needsUpdate = true;
            renderer.render(scene, camera);
            animationIdRef.current = requestAnimationFrame(animate);
        };

        animate();

        // Visibility change handler
        const handleVisibilityChange = () => {
            isActive = !document.hidden;
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);

        // Resize handler
        const handleResize = () => {
            const newWidth = container.clientWidth;
            const newHeight = container.clientHeight;

            camera.left = -newWidth / 2;
            camera.right = newWidth / 2;
            camera.top = newHeight / 2;
            camera.bottom = -newHeight / 2;
            camera.updateProjectionMatrix();

            renderer.setSize(newWidth, newHeight);
        };
        window.addEventListener("resize", handleResize);

        // Cleanup
        return () => {
            cancelAnimationFrame(animationIdRef.current);
            container.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("resize", handleResize);

            if (rendererRef.current && container.contains(rendererRef.current.domElement)) {
                container.removeChild(rendererRef.current.domElement);
            }

            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={`absolute inset-0 pointer-events-auto ${className}`}
            style={{ zIndex: 0 }}
        />
    );
}

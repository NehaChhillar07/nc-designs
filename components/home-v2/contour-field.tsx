"use client";

// The resume's one moving background: a survey map of the paper. Contour
// lines of a slow, domain-warped noise field, drawn in oxblood hairlines with
// every fifth line heavier, like the index contours on a topo sheet. A
// journey reads as terrain, and the route on the page walks across it.
//
// - Scroll moves the map at 35% of the page, so it sits deep behind the work.
// - The terrain itself drifts very slowly, so the paper feels alive.
// - Reduced motion: one still frame, no drift, no parallax.
// - No WebGL2: nothing renders and the static grain stays, as on other pages.
// - Pauses when the tab is hidden; capped at 30fps and 1.5x pixel ratio.

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

const VERT = `#version 300 es
in vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform float uScroll;
out vec4 o;

float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}
float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x),
               mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
    for (int i = 0; i < 4; i++) { v += a * noise(p); p = m * p; a *= 0.5; }
    return v;
}

void main() {
    // Units of viewport height, so the map keeps its scale on any screen.
    vec2 uv = gl_FragCoord.xy / uRes.y;
    uv.y -= uScroll;
    vec2 p = uv * 1.05;

    // Warp the domain so the terrain has ridges and valleys, not blobs.
    vec2 q = vec2(fbm(p + uTime * 0.012), fbm(p + vec2(5.2, 1.3) - uTime * 0.009));
    float n = fbm(p + 1.5 * q) * 13.0;

    // A hairline at every whole number, kept 1px wide at any zoom.
    float f = fract(n);
    float d = min(f, 1.0 - f) / fwidth(n);
    float line = 1.0 - smoothstep(0.35, 1.25, d);
    float major = step(abs(mod(floor(n + 0.5), 5.0)), 0.5);

    float a = line * mix(0.07, 0.17, major);

    // Quieter under the reading column (left two thirds on wide screens),
    // so the map frames the words instead of running through them.
    float x = gl_FragCoord.x / uRes.x;
    a *= mix(0.55, 1.0, smoothstep(0.35, 0.7, x));
    vec3 ink = vec3(0.42, 0.06, 0.07); // --v2-oxblood
    o = vec4(ink * a, a);
}`;

const PARALLAX = 0.35;
const FRAME_MS = 1000 / 30;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
}

export function ContourField() {
    const ref = useRef<HTMLCanvasElement>(null);
    const reduce = useReducedMotion();

    useEffect(() => {
        const canvas = ref.current;
        const gl = canvas?.getContext("webgl2", { antialias: false, premultipliedAlpha: true });
        if (!canvas || !gl) return;

        const vs = compile(gl, gl.VERTEX_SHADER, VERT);
        const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
        if (!vs || !fs) return;
        const prog = gl.createProgram()!;
        gl.attachShader(prog, vs);
        gl.attachShader(prog, fs);
        gl.linkProgram(prog);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
        gl.useProgram(prog);

        // One triangle that covers the screen.
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        const loc = gl.getAttribLocation(prog, "p");
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

        const uRes = gl.getUniformLocation(prog, "uRes");
        const uTime = gl.getUniformLocation(prog, "uTime");
        const uScroll = gl.getUniformLocation(prog, "uScroll");

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            canvas.width = Math.round(canvas.clientWidth * dpr);
            canvas.height = Math.round(canvas.clientHeight * dpr);
            gl.viewport(0, 0, canvas.width, canvas.height);
        };

        const draw = (t: number) => {
            gl.uniform2f(uRes, canvas.width, canvas.height);
            gl.uniform1f(uTime, reduce ? 0 : t / 1000);
            gl.uniform1f(uScroll, reduce ? 0 : (window.scrollY / window.innerHeight) * PARALLAX);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
        };

        resize();
        // The first frame is drawn now, so the map is there before it moves.
        draw(0);
        canvas.dataset.ready = "";

        const onResize = () => {
            resize();
            draw(performance.now());
        };
        window.addEventListener("resize", onResize);
        if (reduce) return () => window.removeEventListener("resize", onResize);

        let raf = 0;
        let last = 0;
        const loop = (t: number) => {
            raf = requestAnimationFrame(loop);
            if (t - last < FRAME_MS) return;
            last = t;
            draw(t);
        };
        const onVisibility = () => {
            cancelAnimationFrame(raf);
            if (!document.hidden) raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        document.addEventListener("visibilitychange", onVisibility);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", onResize);
            document.removeEventListener("visibilitychange", onVisibility);
        };
    }, [reduce]);

    return <canvas ref={ref} aria-hidden className="v2-contours pointer-events-none fixed inset-0 -z-10 h-full w-full" />;
}

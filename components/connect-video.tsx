"use client";

import { useState } from "react";
import { isUnreplaced } from "@/lib/placeholders";

// Lite video embed for the Connect section. No third-party iframe or script
// loads until the visitor actually clicks play, so the video costs the page
// nothing on load (QA rule: the embed must not block page load).
//
// Accepts Loom share links and YouTube links (watch/short/embed forms) and
// maps them to their embed URLs. The caller is responsible for hiding this
// component in production while the URL is still an unreplaced token —
// in dev the token renders visibly inside the frame instead.

function toEmbedUrl(url: string): string | null {
    const loom = url.match(/loom\.com\/(?:share|embed)\/([a-zA-Z0-9]+)/);
    if (loom) return `https://www.loom.com/embed/${loom[1]}?autoplay=1`;
    const yt = url.match(
        /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{6,})/
    );
    if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1`;
    return null;
}

export function ConnectVideo({ url, title }: { url: string; title: string }) {
    const [playing, setPlaying] = useState(false);
    const unreplaced = isUnreplaced(url);
    const embedUrl = unreplaced ? null : toEmbedUrl(url);

    return (
        <div className="w-full max-w-2xl aspect-video rounded-2xl overflow-hidden border border-gray-200 bg-gray-900">
            {playing && embedUrl ? (
                <iframe
                    src={embedUrl}
                    title={title}
                    className="w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                />
            ) : unreplaced ? (
                // Dev-only state: the caller hides the whole block in
                // production while the token is unreplaced.
                <div className="w-full h-full flex items-center justify-center">
                    <span className="px-3 py-1.5 rounded-lg border border-dashed border-white/40 text-sm text-white/70 font-mono">
                        {url}
                    </span>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => setPlaying(true)}
                    aria-label={`Play: ${title}`}
                    className="group relative w-full h-full flex flex-col items-center justify-center gap-4 cursor-pointer"
                >
                    <span className="flex items-center justify-center w-16 h-16 rounded-full bg-white/95 shadow-xl transition-transform duration-200 group-hover:scale-110">
                        {/* Play triangle */}
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-gray-900 ml-1" aria-hidden="true">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </span>
                    <span className="text-sm text-white/80">{title}</span>
                </button>
            )}
        </div>
    );
}

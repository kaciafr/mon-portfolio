"use client";

import { useEffect, useRef, useState } from "react";
import type { Game } from "@/resources/games";
import styles from "./UnityPlayer.module.css";

type UnityInstance = { Quit: () => Promise<void>; SetFullscreen: (on: number) => void };

declare global {
  interface Window {
    createUnityInstance?: (
      canvas: HTMLCanvasElement,
      config: Record<string, unknown>,
      onProgress: (progress: number) => void,
    ) => Promise<UnityInstance>;
  }
}

export function UnityPlayer({ game }: { game: Game }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const instanceRef = useRef<UnityInstance | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Chaque build a son propre loader : on le charge à chaque fois, puis on le retire en quittant.
    const script = document.createElement("script");
    script.src = game.loaderUrl;
    script.onload = () => {
      if (cancelled) return;
      window
        .createUnityInstance?.(
          canvas,
          {
            dataUrl: game.dataUrl,
            frameworkUrl: game.frameworkUrl,
            codeUrl: game.codeUrl,
            companyName: "Kaci Ait Messaoud",
            productName: game.title,
            productVersion: "1.0",
          },
          (p) => !cancelled && setProgress(p),
        )
        .then((instance) => {
          if (cancelled) return instance.Quit();
          instanceRef.current = instance;
          setLoaded(true);
        })
        .catch((message: unknown) => !cancelled && setError(String(message)));
    };
    script.onerror = () => setError("Impossible de charger le jeu.");
    document.body.appendChild(script);

    return () => {
      cancelled = true;
      instanceRef.current?.Quit().catch(() => {});
      instanceRef.current = null;
      script.remove();
    };
  }, [game]);

  return (
    <div className={styles.player}>
      <div className={styles.screen} style={{ aspectRatio: game.aspectRatio }}>
        {/* Unity retrouve le canvas par son id (sélecteur CSS) : il est obligatoire */}
        <canvas id="unity-canvas" ref={canvasRef} className={styles.canvas} tabIndex={-1} />
        {!loaded && (
          <div className={styles.overlay} role="status">
            {error ? (
              <p>{error}</p>
            ) : (
              <>
                <p>Chargement… {Math.round(progress * 100)} %</p>
                <span className={styles.bar}>
                  <span style={{ width: `${progress * 100}%` }} />
                </span>
              </>
            )}
          </div>
        )}
      </div>
      <div className={styles.footer}>
        <span className={styles.note}>Le jeu se joue sur ordinateur, au clavier et à la souris.</span>
        <button
          type="button"
          className={styles.fullscreen}
          disabled={!loaded}
          onClick={() => instanceRef.current?.SetFullscreen(1)}
        >
          Plein écran
        </button>
      </div>
    </div>
  );
}

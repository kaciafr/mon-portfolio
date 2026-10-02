"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { useRouter } from "next/navigation";
import { Pixelify_Sans } from "next/font/google";
import styles from "./DSConsole.module.css";
import { PROFILE, PROJECTS } from "./projects";

// Police pixel pour les écrans. Si elle pose problème, remplace par :
// const pixel = { className: "" };
const pixel = Pixelify_Sans({ subsets: ["latin"] });

// 2 colonnes jusqu'à 4 cartouches, 3 au-delà pour que tout tienne sur l'écran du bas.
const COLUMNS = PROJECTS.length > 4 ? 3 : 2;

// Durée entre Start et l'ouverture de la page : la cartouche s'enfonce, puis l'écran charge.
const LAUNCH_DELAY = 1600;

const colorOf = (color: string) => ({ "--c": color }) as CSSProperties;

// Couleur + illustration de l'étiquette d'une cartouche.
const cartStyle = (p: { color: string; image?: string }) =>
  ({ "--c": p.color, ...(p.image && { "--img": `url("${p.image}")` }) }) as CSSProperties;

export default function DSConsole() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(0);
  const [loadedId, setLoadedId] = useState<string | null>(null);
  const [lastLoaded, setLastLoaded] = useState(PROJECTS[0]);
  const [launching, setLaunching] = useState(false);
  const launchTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(launchTimer.current), []);

  const loaded = PROJECTS.find((p) => p.id === loadedId) ?? null;
  const tab = open ? 0 : -1;

  // Un seul moment mis en scène : la console s'ouvre toute seule après la charge de la page.
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setOpen(true);
      return;
    }
    const timer = setTimeout(() => setOpen(true), 900);
    return () => clearTimeout(timer);
  }, []);

  const move = (dx: number, dy: number) =>
    setCursor((c) => {
      const next = c + dx + dy * COLUMNS;
      return next < 0 || next >= PROJECTS.length ? c : next;
    });

  // Lien interne (/work/...) : la cartouche s'enfonce, l'écran charge, puis la page s'ouvre.
  // Lien externe : nouvel onglet tout de suite (un délai ferait bloquer l'onglet par le navigateur).
  const launch = (href?: string) => {
    if (!href || launching) return;
    if (!href.startsWith("/")) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    router.prefetch(href);
    setLaunching(true);
    launchTimer.current = setTimeout(() => router.push(href), reduce ? 0 : LAUNCH_DELAY);
  };

  // Insérer une cartouche déjà en place la lance, comme appuyer sur Start.
  const insert = (index: number) => {
    const project = PROJECTS[index];
    if (project.id === loadedId) return launch(project.href);
    setCursor(index);
    setLoadedId(project.id);
    setLastLoaded(project);
  };

  const eject = () => setLoadedId(null);

  const start = () => launch(loaded?.href);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || launching) return;
    if (!open) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    const actions: Record<string, () => void> = {
      ArrowLeft: () => move(-1, 0),
      ArrowRight: () => move(1, 0),
      ArrowUp: () => move(0, -1),
      ArrowDown: () => move(0, 1),
      Enter: () => insert(cursor),
      " ": () => insert(cursor),
      Escape: eject,
      Backspace: eject,
    };
    const action = actions[e.key];
    if (action) {
      e.preventDefault();
      action();
    }
  };

  return (
    <section
      className={`${styles.stage} ${pixel.className}`}
      aria-label="Mes projets">
      <div
        className={styles.console}
        data-open={open}
        data-launching={launching}
        style={{ "--launch": `${LAUNCH_DELAY}ms` } as CSSProperties}
        tabIndex={0}
        role="group"
        aria-label="Console de jeu. Flèches pour choisir une cartouche, Entrée pour l'insérer puis Entrée pour ouvrir le projet, Échap pour l'éjecter."
        onKeyDown={onKeyDown}
        onClick={() => !open && setOpen(true)}>
        {/* Moitié haute : couvercle avec l'écran du haut */}
        <div className={styles.lid}>
          <div className={`${styles.shell} ${styles.lidFront}`}>
            <span className={styles.camera} aria-hidden />
            <span className={styles.speaker} aria-hidden />
            <div className={styles.bezel}>
              <div className={styles.lcd} aria-live="polite">
                {loaded && launching ? (
                  <div className={styles.loading}>
                    <p className={styles.band} style={colorOf(loaded.color)}>
                      {loaded.title}
                    </p>
                    <p>Chargement…</p>
                    <span className={styles.progress} style={colorOf(loaded.color)} aria-hidden />
                  </div>
                ) : loaded ? (
                  <>
                    <p className={styles.band} style={colorOf(loaded.color)}>
                      {loaded.title}
                    </p>
                    <p className={styles.role}>{loaded.role}</p>
                    <p className={styles.description}>{loaded.description}</p>
                    <ul className={styles.tags}>
                      {loaded.tags.map((tag) => (
                        <li key={tag} className={styles.tag}>
                          {tag}
                        </li>
                      ))}
                    </ul>
                    {loaded.href && (
                      <p className={styles.hint}>Start ou A pour ouvrir le projet</p>
                    )}
                  </>
                ) : (
                  <>
                    <p className={styles.name}>{PROFILE.name}</p>
                    <p className={styles.tagline}>{PROFILE.tagline}</p>
                    <p className={styles.hint}>
                      Choisis une cartouche sur l&apos;écran du bas.
                    </p>
                  </>
                )}
              </div>
            </div>
            <span className={styles.speaker} aria-hidden />
          </div>

          {/* Dos du couvercle, visible quand la console est fermée */}
          <div className={`${styles.shell} ${styles.lidBack}`}>
            <img src="/images/sticker.webp" alt="" className={styles.sticker} />
            <span className={styles.backName}>{PROFILE.name}</span>
            <span className={styles.backHint}>Touche pour ouvrir</span>
          </div>
        </div>

        <div className={styles.hinge} aria-hidden />

        {/* Moitié basse : écran du bas, croix, boutons */}
        <div className={styles.baseWrap}>
          <div className={`${styles.shell} ${styles.base}`}>
            <div
              className={styles.dpad}
              role="group"
              aria-label="Croix directionnelle">
              <button
                type="button"
                tabIndex={tab}
                aria-label="Haut"
                className={`${styles.dir} ${styles.dirUp}`}
                onClick={() => move(0, -1)}
              />
              <button
                type="button"
                tabIndex={tab}
                aria-label="Gauche"
                className={`${styles.dir} ${styles.dirLeft}`}
                onClick={() => move(-1, 0)}
              />
              <span className={styles.dpadCenter} aria-hidden />
              <button
                type="button"
                tabIndex={tab}
                aria-label="Droite"
                className={`${styles.dir} ${styles.dirRight}`}
                onClick={() => move(1, 0)}
              />
              <button
                type="button"
                tabIndex={tab}
                aria-label="Bas"
                className={`${styles.dir} ${styles.dirDown}`}
                onClick={() => move(0, 1)}
              />
            </div>

            <div className={styles.bezel}>
              <div className={`${styles.lcd} ${styles.lcdList}`}>
                <div
                  className={styles.grid}
                  style={{ "--cols": COLUMNS } as CSSProperties}
                  role="group"
                  aria-label="Cartouches">
                  {PROJECTS.map((p, i) => (
                    <button
                      key={p.id}
                      type="button"
                      tabIndex={tab}
                      className={styles.tile}
                      data-cursor={i === cursor}
                      aria-pressed={p.id === loadedId}
                      aria-label={`Insérer la cartouche ${p.title}`}
                      onClick={() => insert(i)}>
                      <span
                        className={styles.cart}
                        style={cartStyle(p)}
                        aria-hidden
                      />
                      <span className={styles.tileLabel}>{p.short}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.side}>
              <div className={styles.keys} role="group" aria-label="Boutons">
                <button
                  type="button"
                  tabIndex={tab}
                  aria-label="X"
                  className={`${styles.btn} ${styles.bx}`}
                  onClick={() => move(0, -1)}>
                  X
                </button>
                <button
                  type="button"
                  tabIndex={tab}
                  aria-label="Y"
                  className={`${styles.btn} ${styles.by}`}
                  onClick={() => move(-1, 0)}>
                  Y
                </button>
                <button
                  type="button"
                  tabIndex={tab}
                  aria-label="A, insérer la cartouche"
                  className={`${styles.btn} ${styles.ba}`}
                  onClick={() => insert(cursor)}>
                  A
                </button>
                <button
                  type="button"
                  tabIndex={tab}
                  aria-label="B, éjecter la cartouche"
                  className={`${styles.btn} ${styles.bb}`}
                  onClick={eject}>
                  B
                </button>
              </div>
              <div className={styles.pills}>
                <button
                  type="button"
                  tabIndex={tab}
                  className={styles.pill}
                  onClick={start}
                  disabled={!loaded?.href}
                  aria-label="Start, ouvrir le projet">
                  Start
                </button>
                <button
                  type="button"
                  tabIndex={tab}
                  className={styles.pill}
                  onClick={() => setOpen(false)}
                  aria-label="Select, fermer la console">
                  Select
                </button>
              </div>
            </div>
          </div>

          {/* Cartouche qui dépasse de la fente */}
          <span
            className={`${styles.cart} ${styles.slotCart}`}
            style={cartStyle(lastLoaded)}
            data-loaded={loaded !== null}
            aria-hidden
          />
        </div>
      </div>

      <button
        type="button"
        className={styles.toggle}
        onClick={() => setOpen((o) => !o)}>
        {open ? "Fermer la console" : "Ouvrir la console"}
      </button>
    </section>
  );
}

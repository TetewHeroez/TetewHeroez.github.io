import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

/**
 * FlipBook — Real CSS rotate3d leaf-flip + two-panel open book.
 *
 * ARCHITECTURE (for future maintenance):
 * ──────────────────────────────────────
 * The blink-free flip is achieved by "freezing" panel content during animation:
 *
 * ■ FORWARD FLIP (clicking a folder/file):
 *   1. `flipKey` changes → we snapshot the OLD left + right content
 *   2. LEFT panel shows FROZEN old-left   (doesn't blink)
 *   3. RIGHT base shows NEW rightContent  (hidden behind the leaf)
 *   4. LEAF front = OLD rightContent      (flips from 0 → -180deg)
 *   5. When flip ends → unfreeze → left shows new content
 *
 * ■ BACKWARD FLIP (clicking "Kembali"):
 *   1. `flipKey` changes → we snapshot the OLD right content
 *   2. LEFT panel shows NEW leftContent   (updates immediately, since we go back)
 *   3. RIGHT base shows FROZEN old-right  (stays until leaf covers it)
 *   4. LEAF starts at -180deg, unflips to 0 → front = NEW rightContent
 *   5. When flip ends → unfreeze → right shows new content
 *
 * KEY LOCATIONS TO EDIT:
 *   Lines ~30-70:   State & flip trigger logic (frozenLeft, frozenRight, etc.)
 *   Lines ~130:     Book container dimensions (width, height)
 *   Lines ~135-150: Left panel (width %)
 *   Lines ~155-165: Spine position (left %)
 *   Lines ~170-180: Right page area (left %, width %)
 *   Lines ~190-250: FLIP LEAF element (animation timing, transform, faces)
 */
export default function FlipBook({
  isOpen,
  onClose,
  accentColor = "#0ea5e9",
  leftContent,
  rightContent,
  flipKey,
  flipDirection = 1,
}) {
  // ── Flip state ─────────────────────────────────────────────────────
  //
  // frozenLeft:  snapshot of leftContent shown during FORWARD flip
  //              (prevents the left panel from blinking to new content)
  // frozenRight: snapshot of rightContent shown during BACKWARD flip
  //              (prevents the right base from blinking before leaf covers it)
  // leafContent: the OLD rightContent placed on the leaf's front face

  const [flipping, setFlipping] = useState(false);
  const [leafContent, setLeafContent] = useState(null);     // leaf FRONT face
  const [leafBackContent, setLeafBackContent] = useState(null); // leaf BACK face (left-side content)
  const [leafFlipped, setLeafFlipped] = useState(false);
  const [dir, setDir] = useState(1);

  const [frozenLeft, setFrozenLeft] = useState(null);
  const [frozenRight, setFrozenRight] = useState(null);

  const prevRightRef = useRef(null);
  const prevLeftRef = useRef(null);
  const prevKeyRef = useRef(flipKey);

  // ── Trigger flip when flipKey changes ──────────────────────────────
  useEffect(() => {
    if (flipKey === prevKeyRef.current) return;
    const d = flipDirection >= 0 ? 1 : -1;
    setDir(d);

    if (d > 0) {
      // FORWARD: freeze left (show old left during flip)
      setFrozenLeft(prevLeftRef.current);
      setFrozenRight(null);
      setLeafContent(prevRightRef.current);    // leaf front = old right
      setLeafBackContent(leftContent);         // leaf back = NEW left (revealed when page lands)
      setLeafFlipped(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setLeafFlipped(true));
      });
    } else {
      // BACKWARD: freeze BOTH panels (old content stays visible during animation)
      setFrozenLeft(prevLeftRef.current);
      setFrozenRight(prevRightRef.current);
      setLeafContent(rightContent);            // leaf front = new right (unflips to reveal it)
      setLeafBackContent(prevLeftRef.current); // leaf back = old left (matches panel underneath)
      setLeafFlipped(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setLeafFlipped(false));
      });
    }
    setFlipping(true);
    prevKeyRef.current = flipKey;
  }, [flipKey, flipDirection]);

  // ── When flip animation ends → unfreeze everything ─────────────────
  const onLeafTransitionEnd = useCallback((e) => {
    // Only respond to the leaf container's own transition, not bubbled events
    if (e.target !== e.currentTarget) return;
    setFlipping(false);
    setLeafContent(null);
    setLeafBackContent(null);
    setFrozenLeft(null);
    setFrozenRight(null);
  }, []);

  // ── Always track current content for next snapshot ─────────────────
  useEffect(() => {
    prevRightRef.current = rightContent;
    prevLeftRef.current = leftContent;
  });

  // ── Keyboard: Escape to close ──────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [isOpen, onClose]);

  // ── Decide what to render on each panel ────────────────────────────
  const displayedLeft = frozenLeft || leftContent;
  const displayedRight = frozenRight || rightContent;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="flipbook-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "fixed", inset: 0, zIndex: 50,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.78)",
            backdropFilter: "blur(8px)",
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.88, opacity: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "0.4rem" }}>
              <button
                onClick={onClose}
                style={{
                  background: "rgba(255,255,255,0.15)", border: "none",
                  borderRadius: "50%", cursor: "pointer", padding: "8px",
                  color: "rgba(255,255,255,0.85)", display: "flex",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.3)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
              >
                <X style={{ width: 20, height: 20 }} />
              </button>
            </div>

            {/* ═══════ BOOK CONTAINER ═══════════════════════════════ */}
            <div
              style={{
                position: "relative",
                width: "min(1100px, 96vw)",   /* ← edit here to change book width */
                height: "min(820px, 90vh)",   /* ← edit here to change book height */
                perspective: "1400px",
                transformStyle: "preserve-3d",
                overflow: "hidden",           /* clips the flipped leaf on the left */
                borderRadius: "12px",
              }}
            >
              {/* ── LEFT PAGE ─────────────────────────────────── */}
              <div
                style={{
                  position: "absolute",
                  left: 0, top: 0,
                  width: "30%", height: "100%",    /* ← left panel width */
                  background: "linear-gradient(170deg, #e0f2fe 0%, #f0f9ff 100%)",
                  borderRadius: "12px 0 0 12px",
                  boxShadow: "inset -6px 0 14px -8px rgba(0,0,0,0.18)",
                  overflow: "hidden",
                  zIndex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {displayedLeft}
              </div>

              {/* ── SPINE ─────────────────────────────────────── */}
              <div
                style={{
                  position: "absolute",
                  left: "30%", top: 0,             /* ← must match left panel width */
                  width: "8px", height: "100%",
                  transform: "translateX(-50%)",
                  background: `linear-gradient(to right, rgba(0,0,0,0.1), ${accentColor}55, rgba(0,0,0,0.08))`,
                  zIndex: 30,
                  boxShadow: "0 0 8px rgba(0,0,0,0.1)",
                }}
              />

              {/* ── RIGHT PAGE AREA (flipping zone) ───────────── */}
              <div
                style={{
                  position: "absolute",
                  left: "30%", top: 0,             /* ← must match left panel width */
                  width: "70%", height: "100%",    /* ← 100% - left panel width */
                  transformStyle: "preserve-3d",
                  zIndex: 10,
                }}
              >
                {/* Static base — shows CURRENT (or frozen) right content */}
                <div
                  style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(170deg, #f0f9ff 0%, #fafeff 100%)",
                    borderRadius: "0 12px 12px 0",
                    overflow: "hidden",
                    boxShadow: "inset 5px 0 10px -5px rgba(0,0,0,0.12)",
                    display: "flex",
                    flexDirection: "column",
                    zIndex: 1,
                  }}
                >
                  {displayedRight}
                </div>

                {/* ── FLIP LEAF ────────────────────────────────── */}
                {/*
                  This is the animated "page" that rotates around the spine.
                  • transform-origin: left center → rotates from spine edge
                  • transition timing: 0.85s → adjust for speed
                  • Front face = old right content (forward) or new right (backward)
                  • Back face = decorative paper back (visible during mid-turn)
                */}
                {flipping && leafContent && (
                  <div
                    onTransitionEnd={onLeafTransitionEnd}
                    style={{
                      position: "absolute",
                      top: 0, left: 0,
                      width: "100%", height: "100%",
                      transformStyle: "preserve-3d",
                      transformOrigin: "left center",     /* ← pivot point = spine */
                      transition: "transform 0.85s cubic-bezier(0.645, 0.045, 0.355, 1.000)", /* ← flip speed */
                      transform: leafFlipped
                        ? "rotate3d(0, 1, 0, -180deg)"   /* fully flipped to left */
                        : "rotate3d(0, 1, 0, 0deg)",     /* flat on right side */
                      zIndex: 20,
                    }}
                  >
                    {/* Front face — visible when leaf is on the right side */}
                    <div
                      style={{
                        position: "absolute", inset: 0,
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        background: "linear-gradient(170deg, #f0f9ff 0%, #fafeff 100%)",
                        borderRadius: "0 12px 12px 0",
                        overflow: "hidden",
                        boxShadow: "inset 5px 0 10px -5px rgba(0,0,0,0.12), 4px 0 16px rgba(0,0,0,0.08)",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {dir > 0 ? leafContent : rightContent}
                      {/* Spine-edge shadow */}
                      <div style={{ position: "absolute", left: 0, top: 0, width: "24px", height: "100%", background: "linear-gradient(to right, rgba(0,0,0,0.08), transparent)", pointerEvents: "none" }} />
                    </div>

                    {/* Back face — shows LEFT panel content (visible when flipped to left) */}
                    <div
                      style={{
                        position: "absolute", inset: 0,
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotate3d(0, 1, 0, 180deg)",
                        background: "linear-gradient(170deg, #e0f2fe 0%, #f0f9ff 100%)",
                        borderRadius: "12px 0 0 12px",
                        overflow: "hidden",
                        boxShadow: "inset -5px 0 10px -5px rgba(0,0,0,0.1), -4px 0 16px rgba(0,0,0,0.06)",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {leafBackContent}
                      {/* Edge shadow */}
                      <div style={{ position: "absolute", right: 0, top: 0, width: "24px", height: "100%", background: "linear-gradient(to left, rgba(0,0,0,0.06), transparent)", pointerEvents: "none" }} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <p style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", marginTop: "0.5rem" }}>
              Klik item untuk navigasi · Esc untuk menutup
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

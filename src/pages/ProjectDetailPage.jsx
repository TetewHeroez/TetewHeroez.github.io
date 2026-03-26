import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../components/ui/Button.jsx";
import {
  BookOpen, Calculator, Code, FileType, GraduationCap,
  FolderOpen, Sigma, Home, Github, Copy, Check, Download,
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import NotFoundPage from "./NotFoundPage.jsx";
import Squares from "../components/anim/Squares.jsx";
import FlipBook from "../components/ui/FlipBook.jsx";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ACCENT = "#0ea5e9";

const getBookIcon = (name, size = 32) => {
  const n = name.toLowerCase();
  const s = { width: size, height: size, color: ACCENT };
  if (n.includes("matematika") || n.includes("kalkulus")) return <Calculator style={s} />;
  if (n.includes("statistik") || n.includes("probabilitas")) return <Sigma style={s} />;
  if (n.includes("algoritma") || n.includes("programming")) return <Code style={s} />;
  return <GraduationCap style={s} />;
};

const getFileExt = (name) => name.toLowerCase().split(".").pop();
const isPdf = (name) => getFileExt(name) === "pdf";
const SKIP_EXTS = new Set(["class", "doc", "docx"]);
const isViewable = (name) => !SKIP_EXTS.has(getFileExt(name));

/** Returns an icon color based on file extension */
const getFileIconColor = (name) => {
  const ext = getFileExt(name);
  if (ext === "pdf") return "#ef4444";       // red
  if (ext === "tex") return "#22c55e";       // green
  if (ext === "py") return "#eab308";        // yellow
  if (ext === "java") return "#f97316";      // orange
  if (ext === "js" || ext === "jsx") return "#facc15"; // yellow
  if (ext === "ts" || ext === "tsx") return "#3b82f6"; // blue
  if (ext === "html") return "#f97316";      // orange
  if (ext === "css") return "#8b5cf6";       // purple
  return "#0284c7";                          // sky-600 default
};

// ─── BookPanel — matches yangbener.jsx's BookPanel exactly ────────────────────

/**
 * Full-width list panel that sorts folders first, then files.
 * Title + list of clickable items. Used for BOTH left and right pages.
 */
function BookPanel({ title, items, onItemClick, highlightPath, showBackButton, onBack, backLabel }) {
  const sorted = useMemo(() => {
    if (!items) return [];
    return [...items].sort((a, b) => {
      if (a.type === b.type) return a.name.localeCompare(b.name);
      return a.type === "dir" ? -1 : 1;
    });
  }, [items]);

  return (
    <div style={{
      width: "100%", height: "100%",
      padding: "1.5rem",
      overflowY: "auto",
      position: "relative",
      scrollbarWidth: "thin",
      scrollbarColor: "#c7c7c7 transparent",
    }}>
      {/* Back button */}
      {showBackButton && (
        <button
          onClick={onBack}
          style={{
            display: "flex", alignItems: "center", gap: "0.4rem",
            background: "none", border: "none", cursor: "pointer",
            color: ACCENT, fontSize: "0.9rem", fontWeight: 500,
            marginBottom: "0.75rem", padding: 0,
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#0369a1")}
          onMouseLeave={(e) => (e.currentTarget.style.color = ACCENT)}
        >
          <ArrowLeft style={{ width: 16, height: 16 }} />
          Kembali ke &apos;{backLabel}&apos;
        </button>
      )}

      {/* Title */}
      <h2 style={{
        fontSize: "1.4rem", fontWeight: 700, color: "#0c4a6e",
        textTransform: "capitalize", paddingBottom: "0.75rem",
        marginBottom: "1rem",
        borderBottom: `2px solid ${ACCENT}33`,
        position: "sticky", top: 0,
        background: "inherit",
        zIndex: 2,
      }}>
        {title?.replace(/[-_]/g, " ")}
      </h2>

      {/* Items list */}
      {sorted.length === 0 && (
        <p style={{ color: "#a8a29e", fontSize: "0.95rem" }}>Folder ini kosong.</p>
      )}
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.35rem" }}>
        {sorted.map((item) => {
          const isActive = highlightPath && item.name === highlightPath;
          return (
            <li key={item.path}>
              <button
                onClick={() => onItemClick(item)}
                style={{
                  display: "flex", alignItems: "center", gap: "0.75rem",
                  width: "100%", padding: "0.7rem 0.85rem", borderRadius: "10px",
                  border: "none", textAlign: "left",
                  cursor: "pointer",
                  fontSize: "0.95rem", fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#0369a1" : "#334155",
                  background: isActive ? "#e0f2fe" : "transparent",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.background = `${ACCENT}14`; e.currentTarget.style.color = "#0c4a6e"; }}}
                onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#334155"; }}}
              >
                {item.type === "dir"
                  ? <FolderOpen style={{ width: 22, height: 22, color: ACCENT, flexShrink: 0 }} />
                  : <FileType style={{ width: 22, height: 22, color: getFileIconColor(item.name), flexShrink: 0 }} />
                }
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {item.name}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ─── Inline file viewers ──────────────────────────────────────────────────────

function CodeFilePage({ file, owner, repoName }) {
  const [content, setContent] = useState(null);
  const [copied, setCopied] = useState(false);

  const encodedPath = file.path.split("/").map(encodeURIComponent).join("/");
  const rawUrl = `https://raw.githubusercontent.com/${owner}/${repoName}/main/${encodedPath}`;

  useEffect(() => {
    setContent(null);
    fetch(rawUrl)
      .then((r) => (r.ok ? r.text() : Promise.reject()))
      .then(setContent)
      .catch(() => setContent("// Gagal memuat konten file."));
  }, [rawUrl]);

  const handleCopy = async () => {
    if (!content) return;
    await navigator.clipboard.writeText(content).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden", background: "#1c1917" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.65rem 1rem", background: "#292524", flexShrink: 0 }}>
        <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#a8a29e", overflow: "hidden", textOverflow: "ellipsis", flex: 1, whiteSpace: "nowrap" }}>
          {file.name}
        </span>
        <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
          <button onClick={handleCopy} style={{ background: "none", border: "none", cursor: "pointer", color: "#78716c", display: "flex", alignItems: "center", padding: "4px 6px", borderRadius: "4px" }}>
            {copied
              ? <Check style={{ width: 14, height: 14, color: "#4ade80" }} />
              : <Copy style={{ width: 14, height: 14 }} />}
          </button>
          <a href={rawUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#78716c", display: "flex", alignItems: "center" }}>
            <Download style={{ width: 14, height: 14 }} />
          </a>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", overflowX: "auto", scrollbarWidth: "thin", scrollbarColor: "#44403c #1c1917" }}>
        <pre style={{ margin: 0, padding: "1rem", fontSize: "0.85rem", lineHeight: 1.7, color: "#e7e5e4", fontFamily: "ui-monospace, Consolas, monospace", whiteSpace: "pre" }}>
          <code>{content === null ? "Memuat…" : content}</code>
        </pre>
      </div>
    </div>
  );
}

function PdfFilePage({ file, owner, repoName }) {
  const encodedPath = file.path.split("/").map(encodeURIComponent).join("/");
  const pagesUrl = `https://${owner.toLowerCase()}.github.io/${repoName}/${encodedPath}`;
  const rawUrl = `https://raw.githubusercontent.com/${owner}/${repoName}/main/${encodedPath}`;

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.6rem 1rem", background: "#fafaf9", borderBottom: "1px solid #e7e5e4", flexShrink: 0 }}>
        <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#44403c", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {file.name}
        </span>
        <a href={rawUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#78716c", display: "flex", alignItems: "center", flexShrink: 0, textDecoration: "none" }}>
          <Download style={{ width: 14, height: 14 }} />
        </a>
      </div>
      <iframe src={pagesUrl} style={{ flex: 1, border: "none", width: "100%" }} title={file.name} />
    </div>
  );
}

// ─── Decorative cover (when no parent to show) ────────────────────────────────

function CoverPage({ bookName }) {
  return (
    <div style={{
      height: "100%", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "2rem", gap: "1rem",
      background: "linear-gradient(145deg, #fafaf9, #f5f5f4)",
    }}>
      {getBookIcon(bookName, 56)}
      <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#292524", textAlign: "center", lineHeight: 1.4 }}>
        {bookName}
      </h2>
      <p style={{ fontSize: "0.9rem", color: "#a8a29e" }}>
        Klik folder di halaman kanan →
      </p>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ProjectDetailPage() {
  const { projectName } = useParams();
  const [repoData, setRepoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // FlipBook state
  const [flipBookOpen, setFlipBookOpen] = useState(false);
  const [openedBook, setOpenedBook] = useState(null);

  // navStack: [{path, title, items[]}]
  const [navStack, setNavStack] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  // Flip animation
  const [flipKey, setFlipKey] = useState(0);
  const [flipDirection, setFlipDirection] = useState(1);

  // Load repo data
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch("/raw-data.json");
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        const repo = data.repos.find((r) => r.name.toLowerCase() === projectName.toLowerCase());
        if (!repo) throw new Error("Not found");
        setRepoData(repo);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [projectName]);

  const owner = useMemo(() => {
    if (repoData?.html_url) {
      const m = repoData.html_url.match(/github\.com\/([^/]+)\//);
      return m ? m[1] : "TetewHeroez";
    }
    return "TetewHeroez";
  }, [repoData]);

  // Traverse tree by path
  const getDirItems = useCallback((path = "") => {
    if (!repoData?.tree) return [];
    let node = repoData.tree;
    if (path) {
      for (const part of path.split("/")) {
        node = node?.[part] ?? node?.children?.[part];
        if (!node) return [];
      }
    }
    const src = node.children ?? node;
    return Object.entries(src).map(([name, item]) => ({
      ...item, name,
      path: path ? `${path}/${name}` : name,
      type: item.type === "folder" ? "dir" : "file",
    }));
  }, [repoData]);

  const books = repoData ? getDirItems().filter((i) => i.type === "dir") : [];

  // ── Navigation ──────────────────────────────────────────────────────────────

  const navigateForward = useCallback((dir) => {
    const children = getDirItems(dir.path);
    setNavStack((prev) => [...prev, { path: dir.path, title: dir.name, items: children }]);
    setSelectedFile(null);
    setFlipDirection(1);
    setFlipKey((k) => k + 1);
  }, [getDirItems]);

  const navigateBack = useCallback(() => {
    setNavStack((prev) => prev.length > 1 ? prev.slice(0, -1) : prev);
    setSelectedFile(null);
    setFlipDirection(-1);
    setFlipKey((k) => k + 1);
  }, []);

  const viewFile = useCallback((file) => {
    setSelectedFile(file);
    setFlipDirection(1);
    setFlipKey((k) => k + 1);
  }, []);

  const handleOpenBook = (book) => {
    if (openedBook?.path === book.path && flipBookOpen) {
      setFlipBookOpen(false);
      setOpenedBook(null);
      setNavStack([]);
      setSelectedFile(null);
    } else {
      const topItems = getDirItems(book.path);
      setOpenedBook(book);
      setNavStack([{ path: book.path, title: book.name, items: topItems }]);
      setSelectedFile(null);
      setFlipKey(0);
      setFlipDirection(1);
      setFlipBookOpen(true);
    }
  };

  const handleClose = () => {
    setFlipBookOpen(false);
    setOpenedBook(null);
    setNavStack([]);
    setSelectedFile(null);
  };

  // ── Derive left/right content ───────────────────────────────────────────────

  const currentLevel = navStack[navStack.length - 1];
  const parentLevel = navStack[navStack.length - 2];
  const grandparentLevel = navStack[navStack.length - 3];

  // LEFT page = parent directory items (like yangbener)
  const leftContent = useMemo(() => {
    if (!openedBook) return null;

    if (!parentLevel) {
      // At root level — show decorative cover
      return <CoverPage bookName={openedBook.name} />;
    }

    // Show parent level items as a clickable list
    return (
      <BookPanel
        title={parentLevel.title}
        items={parentLevel.items}
        highlightPath={currentLevel?.title}
        showBackButton={!!grandparentLevel}
        onBack={navigateBack}
        backLabel={grandparentLevel?.title?.replace(/[-_]/g, " ")}
        onItemClick={(item) => {
          if (item.type === "dir") navigateForward(item);
          else viewFile(item);
        }}
      />
    );
  }, [openedBook, parentLevel, currentLevel, grandparentLevel, navigateBack, navigateForward, viewFile]);

  // RIGHT page = current directory items or file viewer
  const rightContent = useMemo(() => {
    if (!currentLevel) return null;

    if (selectedFile) {
      return isPdf(selectedFile.name)
        ? <PdfFilePage file={selectedFile} owner={owner} repoName={repoData?.name} />
        : <CodeFilePage file={selectedFile} owner={owner} repoName={repoData?.name} />;
    }

    return (
      <BookPanel
        title={currentLevel.title}
        items={currentLevel.items}
        onItemClick={(item) => {
          if (item.type === "dir") navigateForward(item);
          else viewFile(item);
        }}
      />
    );
  }, [currentLevel, selectedFile, owner, repoData, navigateForward, viewFile]);

  // ── Render ──────────────────────────────────────────────────────────────────

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <p className="text-sky-700 text-lg">Memuat Repositori…</p>
    </div>
  );
  if (error || !repoData) return <NotFoundPage />;

  return (
    <>
      <div className="fixed inset-0 z-[-1]">
        <Squares speed={0.5} squareSize={40} direction="diagonal" borderColor="#000000" hoverFillColor="#53eafd" />
      </div>

      <div className="min-h-screen bg-sky-200/50 p-6">
        <div className="max-w-7xl mx-auto">

          <header className="flex justify-between items-center mb-8">
            <Link to="/">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline"><Home className="w-4 h-4 mr-2" /> Kembali</Button>
              </motion.div>
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a href={repoData.html_url} target="_blank" rel="noopener noreferrer">
                <Button><Github className="w-4 h-4 mr-2" /> Lihat di GitHub</Button>
              </a>
            </motion.div>
          </header>

          <div className="text-center mb-12">
            <h1 className="text-4xl py-1 font-bold bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
              {repoData.name.replace(/-/g, " ")}
            </h1>
            <p className="text-slate-500 mt-2 text-lg">{repoData.description}</p>
          </div>

          {/* FlipBook */}
          <FlipBook
            isOpen={flipBookOpen}
            onClose={handleClose}
            accentColor={ACCENT}
            leftContent={leftContent}
            rightContent={rightContent}
            flipKey={flipKey}
            flipDirection={flipDirection}
          />

          {/* Book cards grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <motion.div
                key={book.path}
                whileHover={{ y: -8, zIndex: 10 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div
                  className={`cursor-pointer rounded-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm border overflow-hidden relative ${
                    openedBook?.path === book.path && flipBookOpen
                      ? "ring-2 ring-sky-500 shadow-2xl shadow-sky-200/60 border-sky-300"
                      : "border-sky-200/70 hover:shadow-xl hover:border-sky-300"
                  }`}
                  onClick={() => handleOpenBook(book)}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-sky-400 to-cyan-500 rounded-l-2xl" />
                  <div className="p-8 text-center">
                    <div className="mb-4">{getBookIcon(book.name, 32)}</div>
                    <h3 className="font-bold text-lg text-sky-900 leading-snug">{book.name}</h3>
                    <div className="absolute bottom-3 right-3 opacity-20 flex flex-col gap-1">
                      <div className="w-7 h-0.5 bg-slate-400 rounded" />
                      <div className="w-5 h-0.5 bg-slate-400 rounded" />
                      <div className="w-3 h-0.5 bg-slate-400 rounded" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}

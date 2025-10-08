import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card.jsx";
import { Button } from "../components/ui/Button.jsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/Tabs.jsx";
import { ScrollArea } from "../components/ui/ScrollArea.jsx";
import {
  BookOpen,
  Calculator,
  Code,
  FileType,
  GraduationCap,
  Download,
  FolderOpen,
  Sigma,
  Pi,
  Infinity,
  X,
  Home,
  Github,
  Copy,
  Check,
  ChevronRight,
  ChevronDown,
  Folder,
  File,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NotFoundPage from "./NotFoundPage.jsx";
import Squares from "../components/anim/Squares.jsx";

// --- SUB-KOMPONEN UNTUK KETERBACAAN ---

const getFileIcon = (filename) => {
  const ext = filename.toLowerCase().split(".").pop();
  switch (ext) {
    case "java":
      return <Code className="w-5 h-5 text-orange-500" />;
    case "py":
      return <Code className="w-5 h-5 text-yellow-500" />;
    case "cpp":
      return <Code className="w-5 h-5 text-blue-600" />;
    case "js":
    case "ts":
      return <Code className="w-5 h-5 text-yellow-400" />;
    case "html":
      return <Code className="w-5 h-5 text-orange-600" />;
    case "css":
      return <Code className="w-5 h-5 text-blue-500" />;
    case "pdf":
      return <FileType className="w-5 h-5 text-red-500" />;
    case "tex":
    case "md":
      return <FileType className="w-5 h-5 text-green-600" />;
    default:
      return <FileType className="w-5 h-5 text-slate-500" />;
  }
};

const FileViewer = ({ file, owner, repoName }) => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [lineCount, setLineCount] = useState(0);
  const [copied, setCopied] = useState(false);

  const encodedPath = file.path.split("/").map(encodeURIComponent).join("/");
  const downloadUrl = `https://raw.githubusercontent.com/${owner}/${repoName}/main/${encodedPath}`;
  const githubPagesUrl = `https://${owner.toLowerCase()}.github.io/${repoName}/${encodedPath}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  useEffect(() => {
    if (file.type !== "pdf") {
      const fetchContent = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(downloadUrl);
          if (!response.ok) throw new Error("Gagal mengambil konten file.");
          const text = await response.text();
          const lines = text.split("\n");
          console.log(
            `File: ${file.title}, Lines: ${lines.length}, Length: ${text.length}`
          );
          setContent(text);
          setLineCount(lines.length);
        } catch (error) {
          console.error("Gagal memuat konten file:", error);
          setContent("Gagal memuat konten file.");
          setLineCount(1);
        } finally {
          setIsLoading(false);
        }
      };
      fetchContent();
    }
  }, [file, downloadUrl]);

  if (file.type === "pdf") {
    return (
      <div className="h-full w-full flex flex-col bg-slate-100">
        <div className="flex items-center justify-between gap-2 p-2 border-b border-sky-200/50 flex-shrink-0 bg-white">
          <div className="flex items-center gap-2">
            <FileType className="w-5 h-5 text-red-500 ml-2" />
            <span className="font-medium text-slate-800 text-sm">
              {file.title}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(downloadUrl, "_blank")}
          >
            <Download className="w-4 h-4 mr-2" /> Download
          </Button>
        </div>
        <div className="flex-1">
          <iframe
            src={githubPagesUrl}
            className="w-full h-full border-0"
            title={file.title}
          />
        </div>
      </div>
    );
  }

  // Untuk file code, tampilkan dalam pre/code dengan scroll yang proper
  return (
    <div className="h-full w-full flex flex-col bg-slate-100">
      <div className="flex items-center justify-between gap-2 p-2 border-b border-sky-200/50 flex-shrink-0 bg-white">
        <div className="flex items-center gap-2">
          {getFileIcon(file.title)}
          <span className="font-medium text-slate-800 text-sm">
            {file.title}
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="flex items-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(downloadUrl, "_blank")}
          >
            <Download className="w-4 h-4 mr-2" /> Download
          </Button>
        </div>
      </div>
      <div className="flex-1 bg-white m-2 rounded-lg border border-slate-200 relative overflow-hidden">
        <div
          className="absolute inset-0 overflow-auto"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#cbd5e1 #f1f5f9",
          }}
        >
          <div className="flex">
            {/* Line numbers - sticky */}
            <div className="bg-slate-50 border-r border-slate-200 px-3 py-4 text-sm font-mono text-slate-500 select-none flex-shrink-0 min-w-[3rem] sticky left-0 z-10">
              {isLoading ? (
                <div className="leading-relaxed text-right h-5">1</div>
              ) : (
                <div>
                  {Array.from({ length: lineCount }, (_, index) => (
                    <div
                      key={index}
                      className="leading-relaxed text-right h-5 flex items-center justify-end"
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Code content */}
            <div className="flex-1 min-w-0">
              <pre className="p-4 text-sm font-mono whitespace-pre break-words overflow-x-auto">
                <code className="block">
                  {isLoading ? "Memuat konten..." : content}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TaskWindow = ({ taskFolder, owner, repoName, onClose }) => {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    if (taskFolder && taskFolder.children) {
      const fileTabs = Object.entries(taskFolder.children)
        .filter(([name, item]) => {
          const ext = name.split(".").pop();
          return (
            item.type === "file" &&
            ext !== "class" &&
            ext !== "doc" &&
            ext !== "docx"
          );
        })
        .map(([name]) => ({
          id: `${taskFolder.path}/${name}`,
          title: name,
          path: `${taskFolder.path}/${name}`,
          type: name.split(".").pop() || "text",
        }));
      setTabs(fileTabs);
      if (fileTabs.length > 0) setActiveTab(fileTabs[0].id);
    }
  }, [taskFolder]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-full max-w-6xl h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="h-full bg-white border-sky-200/70 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-sky-200/50 flex-shrink-0">
            <h3 className="text-lg font-semibold text-sky-900">
              {taskFolder.name}
            </h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          {tabs.length > 0 ? (
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="flex-grow flex flex-col"
            >
              <div className="border-b border-sky-200/50 p-2 flex-shrink-0">
                <TabsList>
                  {tabs.map((tab) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="px-4 py-2 text-sm"
                    >
                      {tab.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              <AnimatePresence mode="wait">
                {tabs.map(
                  (tab) =>
                    activeTab === tab.id && (
                      <TabsContent
                        key={tab.id}
                        value={tab.id}
                        className="flex-grow p-0"
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          className="h-full"
                        >
                          <FileViewer
                            file={tab}
                            owner={owner}
                            repoName={repoName}
                          />
                        </motion.div>
                      </TabsContent>
                    )
                )}
              </AnimatePresence>
            </Tabs>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-slate-500">
                Tidak ada file yang bisa ditampilkan di folder ini.
              </p>
            </div>
          )}
        </Card>
      </motion.div>
    </motion.div>
  );
};

// --- KOMPONEN UTAMA ---
export default function ProjectDetailPage() {
  const { projectName } = useParams(); // Mengambil nama repo dari URL
  const [repoData, setRepoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openedBook, setOpenedBook] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showTaskWindow, setShowTaskWindow] = useState(false);

  useEffect(() => {
    const loadRepoData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("/raw-data.json");
        if (!response.ok) throw new Error("Failed to load repository data");
        const data = await response.json();
        const foundRepo = data.repos.find(
          (repo) => repo.name.toLowerCase() === projectName.toLowerCase()
        );
        if (!foundRepo)
          throw new Error(`Repository '${projectName}' not found.`);
        setRepoData(foundRepo);
      } catch (err) {
        console.error("Error loading repo data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadRepoData();
  }, [projectName]);

  // Helper function to extract owner from GitHub URL
  const getOwnerFromRepoData = (repoData) => {
    if (repoData && repoData.html_url) {
      const match = repoData.html_url.match(/github\.com\/([^\/]+)\//);
      return match ? match[1] : "TetewHeroez"; // fallback to known owner
    }
    return "TetewHeroez"; // fallback
  };

  const getBookIcon = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("matematika") || lowerName.includes("kalkulus"))
      return <Calculator className="w-8 h-8 text-sky-600" />;
    if (lowerName.includes("statistik") || lowerName.includes("probabilitas"))
      return <Sigma className="w-8 h-8 text-sky-600" />;
    if (lowerName.includes("algoritma") || lowerName.includes("programming"))
      return <Code className="w-8 h-8 text-sky-600" />;
    return <GraduationCap className="w-8 h-8 text-sky-600" />;
  };

  const getDirectoryContents = (path = "") => {
    if (!repoData || !repoData.tree) return [];
    let targetNode = repoData.tree;
    if (path) {
      const pathParts = path.split("/");
      for (const part of pathParts) {
        if (targetNode && (targetNode[part] || targetNode.children?.[part])) {
          targetNode = targetNode[part] || targetNode.children[part];
        } else {
          return [];
        }
      }
    }
    const nodeToTraverse = targetNode.children || targetNode;
    return Object.entries(nodeToTraverse).map(([name, item]) => ({
      ...item,
      name,
      path: path ? `${path}/${name}` : name,
      type: item.type === "folder" ? "dir" : "file",
    }));
  };

  const books = repoData
    ? getDirectoryContents().filter((item) => item.type === "dir")
    : [];
  const subjectFolders = selectedSubject
    ? getDirectoryContents(selectedSubject.path).filter(
        (item) => item.type === "dir"
      )
    : [];

  const handleOpenBook = (book) => {
    if (openedBook?.path === book.path) {
      setOpenedBook(null);
      setSelectedSubject(null);
    } else {
      const subjects = getDirectoryContents(book.path).filter(
        (item) => item.type === "dir"
      );
      setOpenedBook({ ...book, subjects });
      setSelectedSubject(null);
    }
  };

  const handleSelectSubject = (subject) => {
    if (selectedSubject?.path === subject.path) {
      setSelectedSubject(null);
    } else {
      setSelectedSubject(subject);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-sky-700">Memuat Repositori...</p>
      </div>
    );
  if (error || !repoData) return <NotFoundPage />;

  return (
    <>
      <div className="fixed inset-0 z-[-1]">
        <Squares
          speed={0.5}
          squareSize={40}
          direction="diagonal" // up, down, left, right, diagonal
          borderColor="#000000"
          hoverFillColor="#53eafd"
        />
      </div>
      <div className="min-h-screen bg-sky-200/50 p-6">
        <div className="max-w-7xl mx-auto">
          <header className="flex justify-between items-center mb-8">
            <Link to="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline">
                  <Home className="w-4 h-4 mr-2" /> Kembali
                </Button>
              </motion.div>
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a
                href={repoData.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>
                  <Github className="w-4 h-4 mr-2" /> Lihat di GitHub
                </Button>
              </a>
            </motion.div>
          </header>

          <div className="text-center mb-12">
            <h1 className="text-4xl py-1 font-bold bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
              {repoData.name.replace(/-/g, " ")}
            </h1>
            <p className="text-slate-500 mt-2">{repoData.description}</p>
          </div>

          <AnimatePresence>
            {openedBook && (
              <motion.div
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 overflow-hidden"
              >
                <Card className="bg-white/60 backdrop-blur-sm border-sky-200/70 shadow-xl">
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[400px]">
                      <div className="flex flex-col justify-center items-center bg-slate-50/50 rounded-lg p-8 border-r border-sky-200/50">
                        <div className="text-center">
                          <h2 className="text-2xl font-bold mt-4 mb-2 text-sky-900 inline-flex items-center gap-2">
                            {getBookIcon(openedBook.name)}
                            {openedBook.name}
                          </h2>
                          <div className="flex items-center justify-center gap-4 mt-6 text-sky-300/80">
                            <Sigma className="w-6 h-6" />{" "}
                            <Pi className="w-6 h-6" />
                            <Calculator className="w-6 h-6" />{" "}
                            <Infinity className="w-6 h-6" />
                          </div>
                        </div>
                      </div>
                      <div className="bg-slate-50/50 rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4 text-sky-900">
                          Mata Kuliah
                        </h3>
                        <ScrollArea className="h-[300px] -mr-4 pr-4">
                          <div className="space-y-2">
                            {openedBook.subjects.map((subject) => (
                              <motion.div
                                key={subject.path}
                                whileTap={{ scale: 0.98 }}
                                className={`cursor-pointer rounded-lg transition-all duration-200 border ${
                                  selectedSubject?.path === subject.path
                                    ? "bg-sky-100 border-sky-400 shadow-md"
                                    : "bg-white border-slate-200/80 hover:border-sky-300 hover:bg-sky-50"
                                }`}
                                onClick={() => handleSelectSubject(subject)}
                              >
                                <div className="p-4 flex items-center gap-3">
                                  <BookOpen
                                    className={`w-5 h-5 transition-colors ${
                                      selectedSubject?.path === subject.path
                                        ? "text-sky-600"
                                        : "text-slate-500"
                                    }`}
                                  />
                                  <span
                                    className={`font-medium transition-colors ${
                                      selectedSubject?.path === subject.path
                                        ? "text-sky-800"
                                        : "text-slate-700"
                                    }`}
                                  >
                                    {subject.name}
                                  </span>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {selectedSubject && (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8"
            >
              <h3 className="text-xl font-semibold mb-4 text-sky-900">
                Folder - {selectedSubject.name}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {subjectFolders.map((folder) => (
                  <motion.div
                    key={folder.path}
                    whileHover={{ y: -5, zIndex: 10 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  >
                    <Card
                      className="cursor-pointer shadow-sm hover:shadow-lg transition-all duration-200 border-sky-200/70 group h-full"
                      onClick={() => setShowTaskWindow(folder)}
                    >
                      <CardContent className="p-6 text-center flex flex-col items-center justify-center">
                        <FolderOpen className="w-12 h-12 mx-auto mb-3 text-sky-500 group-hover:text-sky-600 transition-colors" />
                        <p className="font-medium text-sm text-slate-700">
                          {folder.name}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          <AnimatePresence>
            {showTaskWindow && (
              <TaskWindow
                taskFolder={showTaskWindow}
                owner={getOwnerFromRepoData(repoData)}
                repoName={repoData.name}
                onClose={() => setShowTaskWindow(false)}
              />
            )}
          </AnimatePresence>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <motion.div
                key={book.path}
                className="relative"
                whileHover={{ y: -8, zIndex: 10 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card
                  className={`cursor-pointer transition-all duration-300 border-sky-200/70 group ${
                    openedBook?.path === book.path
                      ? "ring-2 ring-sky-500 shadow-2xl shadow-sky-200/50"
                      : "hover:shadow-xl"
                  }`}
                  onClick={() => handleOpenBook(book)}
                >
                  <CardContent className="p-8 text-center relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-sky-400 to-cyan-500"></div>
                    <div className="mb-4">{getBookIcon(book.name)}</div>
                    <h3 className="font-bold text-lg mb-2 text-sky-900 group-hover:text-sky-600 transition-colors">
                      {book.name}
                    </h3>
                    <div className="absolute bottom-2 right-2 opacity-30">
                      <div className="flex flex-col gap-1">
                        <div className="w-8 h-1 bg-slate-400 rounded"></div>
                        <div className="w-6 h-1 bg-slate-400 rounded"></div>
                        <div className="w-4 h-1 bg-slate-400 rounded"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

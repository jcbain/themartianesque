import { useState, useRef, useEffect, useCallback } from "react";

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function getPostIdFromPath(pathname, posts) {
  const match = pathname.match(/^\/post\/(\d+)\/?$/);
  if (!match) return null;
  const id = Number(match[1]);
  if (!Number.isInteger(id)) return null;
  return posts.some((post) => post.id === id) ? id : null;
}

function useIsMobile() {
  const [mobile, setMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return mobile;
}

const DARK_MODE_KEY = "mac-classic-dark-mode";

function useDarkModeSetting() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = window.localStorage.getItem(DARK_MODE_KEY);
    if (stored === "dark") return true;
    if (stored === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(DARK_MODE_KEY, darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(DARK_MODE_KEY)) return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event) => setDarkMode(event.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return [darkMode, setDarkMode];
}

// ─── SVG ICONS ───────────────────────────────────────────────────────────────

function HdIcon({ size = 32 }) {
  const s = size / 32;
  return (
    <svg width={size} height={size * 0.875} viewBox="0 0 32 28" fill="none">
      <rect
        x="1"
        y="4"
        width="30"
        height="22"
        rx="2"
        fill="white"
        stroke="black"
        strokeWidth="1.5"
      />
      <rect
        x="4"
        y="7"
        width="16"
        height="12"
        rx="1"
        fill="#ddd"
        stroke="black"
        strokeWidth="1"
      />
      <circle
        cx="24"
        cy="13"
        r="3"
        fill="#bbb"
        stroke="black"
        strokeWidth="1"
      />
      <rect
        x="4"
        y="21"
        width="24"
        height="2"
        rx="1"
        fill="#ccc"
        stroke="black"
        strokeWidth="0.5"
      />
    </svg>
  );
}

function FolderIcon({ size = 32 }) {
  return (
    <svg width={size} height={size * 0.875} viewBox="0 0 32 28" fill="none">
      <path
        d="M2 8 L2 24 L30 24 L30 8 Z"
        fill="white"
        stroke="black"
        strokeWidth="1.5"
      />
      <path
        d="M2 8 L8 4 L16 4 L16 8 Z"
        fill="white"
        stroke="black"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function NoteIcon({ size = 32 }) {
  return (
    <svg width={size * 0.875} height={size} viewBox="0 0 28 32" fill="none">
      <rect
        x="2"
        y="1"
        width="24"
        height="30"
        rx="1"
        fill="white"
        stroke="black"
        strokeWidth="1.5"
      />
      <path
        d="M18 1 L18 8 L25 8"
        fill="white"
        stroke="black"
        strokeWidth="1.5"
      />
      <path d="M18 1 L25 8" stroke="black" strokeWidth="1.5" />
      <line x1="6" y1="13" x2="22" y2="13" stroke="black" strokeWidth="1" />
      <line x1="6" y1="17" x2="22" y2="17" stroke="black" strokeWidth="1" />
      <line x1="6" y1="21" x2="16" y2="21" stroke="black" strokeWidth="1" />
    </svg>
  );
}

function TrashIcon({ size = 32 }) {
  return (
    <svg width={size * 0.875} height={size} viewBox="0 0 28 32" fill="none">
      <rect
        x="4"
        y="8"
        width="20"
        height="22"
        rx="1"
        fill="white"
        stroke="black"
        strokeWidth="1.5"
      />
      <line x1="4" y1="12" x2="24" y2="12" stroke="black" strokeWidth="1" />
      <line x1="10" y1="8" x2="10" y2="4" stroke="black" strokeWidth="1.5" />
      <line x1="18" y1="8" x2="18" y2="4" stroke="black" strokeWidth="1.5" />
      <line x1="10" y1="4" x2="18" y2="4" stroke="black" strokeWidth="1.5" />
    </svg>
  );
}

function PostFileIcon({ size = 26, invert = false }) {
  const stroke = invert ? "white" : "black";
  return (
    <svg width={size * 0.867} height={size} viewBox="0 0 26 30" fill="none">
      <rect
        x="2"
        y="1"
        width="22"
        height="28"
        rx="1"
        fill={invert ? "black" : "white"}
        stroke={stroke}
        strokeWidth="1.5"
      />
      <path
        d="M16 1 L16 7 L22 7"
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
      />
      <line x1="5" y1="11" x2="21" y2="11" stroke={stroke} strokeWidth="1" />
      <line x1="5" y1="15" x2="21" y2="15" stroke={stroke} strokeWidth="1" />
      <line x1="5" y1="19" x2="21" y2="19" stroke={stroke} strokeWidth="1" />
      <line x1="5" y1="23" x2="14" y2="23" stroke={stroke} strokeWidth="1" />
    </svg>
  );
}

function HappyMacIcon({ size = 66 }) {
  return (
    <svg width={size} height={size * 1.09} viewBox="0 0 66 72" fill="none">
      <rect
        x="3"
        y="3"
        width="60"
        height="66"
        rx="8"
        fill="white"
        stroke="black"
        strokeWidth="3"
      />
      <rect x="10" y="10" width="46" height="34" rx="2" fill="black" />
      <rect x="12" y="12" width="42" height="30" rx="1" fill="white" />
      <rect x="18" y="20" width="6" height="8" rx="1" fill="black" />
      <rect x="42" y="20" width="6" height="8" rx="1" fill="black" />
      <path
        d="M20 34 Q33 42 46 34"
        stroke="black"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── BOOT SCREEN ─────────────────────────────────────────────────────────────

function BootScreen({ onDone }) {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 900);
    const t3 = setTimeout(() => setProgress(100), 950);
    const t4 = setTimeout(onDone, 2800);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        background: phase === 0 ? "#000" : "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        transition: "background 0.3s",
      }}
    >
      {phase >= 1 && (
        <>
          <HappyMacIcon size={72} />
          {phase >= 2 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  fontFamily: "Chicago, Geneva, sans-serif",
                  fontSize: 13,
                }}
              >
                Welcome to The Martianesque Blog
              </div>
              <div
                style={{
                  width: 200,
                  height: 14,
                  border: "1px solid black",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    background: "black",
                    width: `${progress}%`,
                    transition: "width 1.6s ease-in-out",
                  }}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

const MENUBAR_H = 20;
const SIDEBAR_W = 300;

function SplitPanelHeader({ title, onClose }) {
  return (
    <div
      style={{
        height: 22,
        flexShrink: 0,
        background: "#f5f5f5",
        borderBottom: "1px solid black",
        display: "flex",
        alignItems: "center",
        position: "relative",
        userSelect: "none",
      }}
    >
      {onClose && (
        <div
          onClick={onClose}
          style={{
            width: 13,
            height: 13,
            border: "1.5px solid black",
            background: "white",
            marginLeft: 6,
            flexShrink: 0,
            cursor: "default",
            zIndex: 1,
          }}
        />
      )}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontFamily: "Chicago, 'Charcoal', Geneva, sans-serif",
            fontSize: 12,
            fontWeight: "bold",
            lineHeight: "22px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "85%",
          }}
        >
          {title}
        </span>
      </div>
    </div>
  );
}

function DesktopWindow({ title, onClose, children, width = 400 }) {
  return (
    <div
      style={{
        position: "absolute",
        top: MENUBAR_H + 48,
        left: "50%",
        transform: "translateX(-50%)",
        width: `min(${width}px, calc(100% - 48px))`,
        maxHeight: `calc(100vh - ${MENUBAR_H + 64}px)`,
        zIndex: 3,
        background: "white",
        border: "1.5px solid black",
        boxShadow: "2px 2px 0 black",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <SplitPanelHeader title={title} onClose={onClose} />
      <div style={{ flex: 1, overflow: "auto", minHeight: 0 }}>{children}</div>
    </div>
  );
}

// ─── MOBILE: SHEET WINDOW ────────────────────────────────────────────────────

function SheetWindow({ title, onClose, children, visible }) {
  const sheetRef = useRef(null);
  const startY = useRef(null);
  const currentY = useRef(0);
  const [translateY, setTranslateY] = useState(0);
  const [closing, setClosing] = useState(false);

  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
    currentY.current = 0;
  };

  const handleTouchMove = (e) => {
    const dy = e.touches[0].clientY - startY.current;
    if (dy > 0) {
      currentY.current = dy;
      setTranslateY(dy);
    }
  };

  const handleTouchEnd = () => {
    if (currentY.current > 120) {
      setClosing(true);
      setTimeout(onClose, 280);
    } else {
      setTranslateY(0);
    }
    currentY.current = 0;
  };

  useEffect(() => {
    if (!visible) setTranslateY(0);
  }, [visible]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1000,
          background: "rgba(0,0,0,0.4)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.25s",
          pointerEvents: visible ? "auto" : "none",
        }}
      />
      {/* Sheet */}
      <div
        ref={sheetRef}
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          height: "88vh",
          zIndex: 1001,
          background: "white",
          border: "1.5px solid black",
          borderBottom: "none",
          boxShadow: "-2px -2px 0 black",
          display: "flex",
          flexDirection: "column",
          transform: `translateY(${
            closing ? "100%" : visible ? `${translateY}px` : "100%"
          })`,
          transition:
            translateY > 0
              ? "none"
              : "transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
          willChange: "transform",
          overflow: "hidden",
        }}
      >
        {/* Drag handle */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            height: 28,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "grab",
            borderBottom: "1px solid #ddd",
            background: "white",
            backgroundImage: `repeating-linear-gradient(to bottom, transparent, transparent 1px, #ddd 1px, #ddd 2px)`,
            backgroundSize: "100% 2px",
          }}
        >
          <div
            style={{
              width: 36,
              height: 4,
              borderRadius: 2,
              background: "#999",
            }}
          />
        </div>

        {/* Title bar */}
        <div
          style={{
            height: 44,
            flexShrink: 0,
            borderBottom: "1.5px solid black",
            display: "flex",
            alignItems: "center",
            position: "relative",
            background: "white",
          }}
        >
          <div
            onClick={onClose}
            style={{
              marginLeft: 14,
              width: 28,
              height: 28,
              border: "1.5px solid black",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
            }}
          >
            ×
          </div>
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <span
              style={{
                fontFamily: "Chicago, 'Charcoal', Geneva, sans-serif",
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              {title}
            </span>
          </div>
        </div>

        <div
          style={{
            flex: 1,
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}

// ─── CONTENT VIEWS ───────────────────────────────────────────────────────────

function PostContent({ post }) {
  return (
    <div
      style={{
        padding: "20px 22px",
        fontFamily: "Georgia, 'Times New Roman', serif",
      }}
    >
      <div
        style={{
          borderBottom: "1px solid black",
          paddingBottom: 10,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontWeight: "bold",
            fontFamily: "Chicago, Geneva, sans-serif",
            lineHeight: 1.3,
          }}
        >
          {post.title}
        </div>
        <div
          style={{
            fontSize: 12,
            color: "#666",
            marginTop: 5,
            fontFamily: "Geneva, sans-serif",
          }}
        >
          {post.date}
        </div>
      </div>
      {post.content.split("\n\n").map((p, i) => (
        <p
          key={i}
          style={{
            margin: "0 0 16px",
            fontSize: 15,
            lineHeight: 1.75,
            color: "#111",
          }}
        >
          {p}
        </p>
      ))}
      <div
        style={{
          marginTop: 24,
          paddingTop: 10,
          borderTop: "1px solid #ddd",
          fontSize: 11,
          color: "#aaa",
          fontFamily: "Geneva, sans-serif",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>{post.wordCount} words</span>
        <span>TextEdit v3.5</span>
      </div>
    </div>
  );
}

function ArchiveContent({ onOpenPost, posts, selectedId: selectedIdProp }) {
  const [internalSelected, setInternalSelected] = useState(null);
  const selected = selectedIdProp ?? internalSelected;
  return (
    <div>
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid black",
          fontFamily: "Geneva, sans-serif",
          fontSize: 11,
          background: "#f5f5f5",
        }}
      >
        <div
          style={{
            flex: 1,
            padding: "5px 10px",
            borderRight: "1px solid #ccc",
          }}
        >
          Name
        </div>
        <div
          style={{
            width: 80,
            padding: "5px 8px",
            borderRight: "1px solid #ccc",
          }}
        >
          Words
        </div>
      </div>
      {posts.map((post) => (
        <div
          key={post.id}
          onClick={() => {
            if (selectedIdProp === undefined) setInternalSelected(post.id);
            onOpenPost(post);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            background: selected === post.id ? "black" : "white",
            color: selected === post.id ? "white" : "black",
            borderBottom: "1px solid #eee",
            padding: "10px 10px",
            cursor: "pointer",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <div
            style={{ flex: 1, display: "flex", alignItems: "center", gap: 10 }}
          >
            <PostFileIcon size={22} invert={selected === post.id} />
            <div>
              <div style={{ fontFamily: "Geneva, sans-serif", fontSize: 13 }}>
                {post.title}
              </div>
              <div
                style={{
                  fontFamily: "Geneva, sans-serif",
                  fontSize: 11,
                  color: selected === post.id ? "#ccc" : "#888",
                  marginTop: 2,
                }}
              >
                {post.date}
              </div>
            </div>
          </div>
          <div
            style={{
              fontFamily: "Geneva, sans-serif",
              fontSize: 12,
              color: selected === post.id ? "#ccc" : "#666",
            }}
          >
            {post.wordCount}
          </div>
        </div>
      ))}
      <div
        style={{
          padding: "8px 10px",
          fontFamily: "Geneva, sans-serif",
          fontSize: 11,
          color: "#999",
          borderTop: "1px solid #eee",
        }}
      >
        {posts.length} items
      </div>
    </div>
  );
}

function AboutContent() {
  return (
    <div
      style={{
        padding: 28,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
        fontFamily: "Geneva, sans-serif",
      }}
    >
      <pre
        style={{
          margin: 0,
          fontFamily: 'Monaco, "Courier New", monospace',
          fontSize: 5.2,
          lineHeight: 0.9,
          letterSpacing: 0,
          whiteSpace: "pre",
          color: "#111",
        }}
      >
        {String.raw`%&%%%%#########%%#%%&%%#%%%%###****%%%%%#*########
%&%%%%########%%%%%%%%%%%&&&&&&%%##%%%&%****######
%&%%%%%########%%%%%#%%%%%%%%%%%%%%%%&&%#***######
%&%%%%%%%%##*#%&%#+-:--=*#&&%%#####%%&&%#**#######
&&&%%%%%%%%%%%&+:.........-*%%%#****%&&%##########
&&%%%%%%%%%%%&*:::::::::::::+&&%##**#&&%##########
&&%%%%%%%%&%&&=::--:::-=+==-:#&%%#%#%&&%##%%%#####
%%###%%%%&&&@&==+###*-:=*#*=--%&&&%%%&&%####%#%%%#
****#%%%%&@@@@#*###%#-.:=+=-:.=%&&@&%%&%####%####*
*##*#**##&@@@@%++**+=-:..:--:::+%&&&%%*#######*+==
#%%%##%%%&@@@@%-:::-==+=--:-=--=-*&&%%*++=+%#***++
%%%%%%%&&@@@@@@*-=++=+#*=-------:-@@@&%==++*%%%%##
%%%%%%%&@@@&&@@&**+*+++++=-:--=:::#@&&&++==*&@&&#%
%%%%%%%%&&@@@@@@&++++++*+=---==:-:*%%**#%%#&@@&&&&
&&&&&&&&&&@@@@@@@&#*******+=++---=%=:...:%@@@@&&&&
&&&&&&&&&&@@@@@@@@@&%%%%%#%%*=-----  ..:=#&&@@&&&%
@@@@@@@@@@&&&@%#@@@&%%%%&&%+-----:  .......:-=+#%&
&&#++++**##%%&&&@&&&####%%=--====-. .   ..      =&
#=-:---+##*%%###%%*&#*##%+----==++-.....      .:+&
:-=-==-+**##*+**#++%&##%*------+*--:::=**++*##%&&&
-=+=+*-++*#*++**+#%#%%#%*======++----==+#&&@@@@&&&
==++++=+***+++*#*&&%%%##****+====-======--=+*%&&&&
=++*+==+++++++*+=++*+###****++===-+=-=====----=*&@
=++#*=+*+++++++====++=*#%+++++==-=*+===++====--:=&
++*#*=*#*++*=-==+=-==-+%&*++++====+====+======-::*
***%+*%*+++=-==++----=*#&#=====+++#+===+++=====-:+
*#%**%#****-==+==--==*#&@*==+=+=---++=***++++==--*
+*%*%%***%=--------=+#&&&#=+++==--:-==***++===--:#`}
      </pre>
      <div
        style={{
          fontSize: 16,
          fontFamily: "Chicago, Geneva, sans-serif",
          fontWeight: "bold",
        }}
      >
        James Bain, PhD
      </div>
      <div style={{ width: "100%", height: 1, background: "black" }} />
      <div
        style={{
          fontSize: 14,
          lineHeight: 1.8,
          textAlign: "center",
          color: "#222",
          maxWidth: 260,
        }}
      >
        Anthropolgist. Software Engineer. Overripe Cheese Stick.
      </div>
      <div
        style={{
          fontSize: 14,
          lineHeight: 1.8,
          textAlign: "center",
          color: "#222",
          maxWidth: 260,
        }}
      >
        Currently building cool stuff at{" "}
        <a
          href="https://www.tugboatqa.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          TugboatQA
        </a>
      </div>
      <div style={{ fontSize: 12, color: "#888" }}>Version 1.0 · © 2026</div>
    </div>
  );
}

// ─── DESKTOP ICON ─────────────────────────────────────────────────────────────

function DesktopIcon({ iconEl, label, onActivate }) {
  const [sel, setSel] = useState(false);
  return (
    <div
      tabIndex={0}
      onClick={() => {
        setSel(true);
        onActivate();
      }}
      onBlur={() => setSel(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 72,
        padding: "6px 4px",
        cursor: "default",
        gap: 4,
        userSelect: "none",
      }}
    >
      <div
        style={{ filter: sel ? "invert(1)" : "none", display: "inline-flex" }}
      >
        {iconEl}
      </div>
      <div
        style={{
          fontSize: 11,
          fontFamily: "Geneva, sans-serif",
          textAlign: "center",
          lineHeight: 1.3,
          background: sel ? "black" : "transparent",
          color: sel ? "white" : "black",
          padding: "1px 4px",
        }}
      >
        {label}
      </div>
    </div>
  );
}

// ─── MOBILE GRID ICON ────────────────────────────────────────────────────────

function MobileIcon({ iconEl, label, onTap }) {
  const [pressed, setPressed] = useState(false);
  return (
    <div
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => {
        setPressed(false);
        onTap();
      }}
      onClick={onTap}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        padding: 8,
        cursor: "pointer",
        WebkitTapHighlightColor: "transparent",
        transform: pressed ? "scale(0.92)" : "scale(1)",
        transition: "transform 0.1s",
        userSelect: "none",
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          background: pressed ? "#eee" : "white",
          border: "1.5px solid black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: pressed ? "none" : "2px 2px 0 black",
          transition: "all 0.1s",
        }}
      >
        {iconEl}
      </div>
      <div
        style={{
          fontSize: 11,
          fontFamily: "Geneva, sans-serif",
          textAlign: "center",
          lineHeight: 1.3,
          color: "black",
        }}
      >
        {label}
      </div>
    </div>
  );
}

// ─── MOBILE MENUBAR (bottom) ─────────────────────────────────────────────────

function MobileFinderBar({
  onOpenArchive,
  onOpenAbout,
  darkMode,
  onToggleDarkMode,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 900,
          }}
        />
      )}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: 56,
          background: "white",
          borderTop: "1.5px solid black",
          display: "flex",
          alignItems: "center",
          zIndex: 950,
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        {/* Apple / menu button */}
        <div
          onClick={() => setMenuOpen((m) => !m)}
          style={{
            width: 56,
            height: "100%",
            borderRight: "1px solid #ddd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            cursor: "pointer",
            fontFamily: "Chicago, Geneva, sans-serif",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          ⌘
        </div>

        {menuOpen && (
          <div
            style={{
              position: "absolute",
              bottom: 56,
              left: 0,
              background: "white",
              border: "1.5px solid black",
              boxShadow: "2px -2px 0 black",
              minWidth: 200,
              zIndex: 960,
            }}
          >
            {[
              {
                label: "Post Archive",
                action: () => {
                  onOpenArchive();
                  setMenuOpen(false);
                },
              },
              {
                label: "About Me",
                action: () => {
                  onOpenAbout();
                  setMenuOpen(false);
                },
              },
              {
                label: darkMode ? "Disable Dark Mode" : "Enable Dark Mode",
                action: () => {
                  onToggleDarkMode();
                  setMenuOpen(false);
                },
              },
              "---",
              { label: "Restart", action: () => window.location.reload() },
            ].map((item, i) =>
              item === "---" ? (
                <div
                  key={i}
                  style={{ height: 1, background: "#aaa", margin: "3px 0" }}
                />
              ) : (
                <div
                  key={i}
                  onClick={item.action}
                  style={{
                    padding: "12px 20px",
                    fontSize: 14,
                    fontFamily: "Geneva, sans-serif",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  {item.label}
                </div>
              )
            )}
          </div>
        )}

        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            fontFamily: "Chicago, Geneva, sans-serif",
            fontSize: 13,
            fontWeight: "bold",
          }}
        >
          The Martianesque
        </div>

        <Clock mobile />
      </div>
    </>
  );
}

function Clock({ mobile }) {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () => {
      const n = new Date();
      setT(n.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div
      style={{
        padding: mobile ? "0 14px" : "0 12px",
        display: "flex",
        alignItems: "center",
        fontSize: mobile ? 13 : 12,
        fontFamily: "Chicago, Geneva, sans-serif",
        ...(mobile ? {} : { marginLeft: "auto" }),
      }}
    >
      {t}
    </div>
  );
}

// ─── DESKTOP MENU BAR ────────────────────────────────────────────────────────

function DesktopMenuBar({ activeMenu, setActiveMenu, menus }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: MENUBAR_H,
        background: "white",
        borderBottom: "1px solid black",
        display: "flex",
        alignItems: "stretch",
        zIndex: 99999,
        fontFamily: "Chicago, Geneva, sans-serif",
        fontSize: 12,
      }}
    >
      <div
        style={{
          padding: "0 10px",
          display: "flex",
          alignItems: "center",
          cursor: "default",
          borderRight: "1px solid #ddd",
          fontSize: 14,
        }}
        onClick={() => setActiveMenu(activeMenu === "apple" ? null : "apple")}
      >
        ⌘
      </div>
      {menus.map((menu) => (
        <div
          key={menu.label}
          onClick={(e) => {
            e.stopPropagation();
            setActiveMenu(activeMenu === menu.label ? null : menu.label);
          }}
          style={{
            padding: "0 10px",
            display: "flex",
            alignItems: "center",
            cursor: "default",
            background: activeMenu === menu.label ? "black" : "transparent",
            color: activeMenu === menu.label ? "white" : "black",
            position: "relative",
          }}
        >
          {menu.label}
          {activeMenu === menu.label && menu.items && (
            <div
              style={{
                position: "absolute",
                top: MENUBAR_H,
                left: 0,
                background: "white",
                border: "1px solid black",
                minWidth: 160,
                zIndex: 100000,
                boxShadow: "2px 2px 0 black",
              }}
            >
              {menu.items.map((item, i) =>
                item === "---" ? (
                  <div
                    key={i}
                    style={{ height: 1, background: "#888", margin: "2px 0" }}
                  />
                ) : (
                  <div
                    key={i}
                    onClick={item.action}
                    style={{
                      padding: "4px 20px",
                      cursor: "default",
                      fontSize: 12,
                      fontFamily: "Geneva, sans-serif",
                      color: "black",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "black";
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "white";
                      e.currentTarget.style.color = "black";
                    }}
                  >
                    {item.label}
                  </div>
                )
              )}
            </div>
          )}
        </div>
      ))}
      <Clock />
    </div>
  );
}

// ─── MOBILE LAYOUT ───────────────────────────────────────────────────────────

function MobileLayout({
  darkMode,
  onToggleDarkMode,
  routedPostId,
  onOpenPostRoute,
  onClearPostRoute,
  posts,
}) {
  const [sheet, setSheet] = useState(null); // { type, post? }
  const [postSheet, setPostSheet] = useState(null);

  const openPost = (post) => {
    setSheet(null);
    setTimeout(() => {
      setPostSheet(post);
      onOpenPostRoute(post.id);
    }, 50);
  };

  useEffect(() => {
    if (!routedPostId) {
      setPostSheet(null);
      return;
    }
    const matched = posts.find((post) => post.id === routedPostId);
    if (matched) setPostSheet(matched);
  }, [routedPostId]);

  const mobileIcons = [
    {
      id: "blog",
      label: "My Blog",
      iconEl: <HdIcon size={30} />,
      action: () => setSheet({ type: "archive" }),
    },
    {
      id: "archive",
      label: "Archive",
      iconEl: <FolderIcon size={30} />,
      action: () => setSheet({ type: "archive" }),
    },
    {
      id: "about",
      label: "About Me",
      iconEl: <NoteIcon size={30} />,
      action: () => setSheet({ type: "about" }),
    },
    {
      id: "trash",
      label: "Trash",
      iconEl: <TrashIcon size={30} />,
      action: () => {},
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Desktop texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#fff",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='4' height='4' fill='%23ffffff'/%3E%3Crect x='0' y='0' width='1' height='1' fill='%23ebebeb'/%3E%3Crect x='2' y='2' width='1' height='1' fill='%23ebebeb'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Icon grid */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 0,
          right: 0,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          padding: "0 8px",
          gap: 8,
        }}
      >
        {mobileIcons.map((icon) => (
          <MobileIcon
            key={icon.id}
            iconEl={icon.iconEl}
            label={icon.label}
            onTap={icon.action}
          />
        ))}
      </div>

      {/* Recent posts label */}
      <div
        style={{
          position: "absolute",
          top: 130,
          left: 16,
          right: 16,
          borderTop: "1px solid black",
          paddingTop: 10,
        }}
      >
        <div
          style={{
            fontFamily: "Chicago, Geneva, sans-serif",
            fontSize: 11,
            color: "#555",
            marginBottom: 4,
          }}
        >
          Recent Posts
        </div>
        {posts.slice(0, 3).map((post) => (
          <div
            key={post.id}
            onClick={() => openPost(post)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 0",
              borderBottom: "1px solid #eee",
              cursor: "pointer",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <PostFileIcon size={20} />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: "Geneva, sans-serif",
                  fontSize: 13,
                  fontWeight: "bold",
                }}
              >
                {post.title}
              </div>
              <div
                style={{
                  fontFamily: "Geneva, sans-serif",
                  fontSize: 11,
                  color: "#888",
                  marginTop: 2,
                }}
              >
                {post.date}
              </div>
            </div>
            <div style={{ fontSize: 14, color: "#bbb" }}>›</div>
          </div>
        ))}
      </div>

      {/* Archive sheet */}
      <SheetWindow
        title="Post Archive"
        visible={sheet?.type === "archive"}
        onClose={() => setSheet(null)}
      >
        <ArchiveContent onOpenPost={openPost} posts={posts} />
      </SheetWindow>

      {/* About sheet */}
      <SheetWindow
        title="About Me"
        visible={sheet?.type === "about"}
        onClose={() => setSheet(null)}
      >
        <AboutContent />
      </SheetWindow>

      {/* Post sheet */}
      <SheetWindow
        title={postSheet?.title || "Post"}
        visible={!!postSheet}
        onClose={() => {
          setPostSheet(null);
          onClearPostRoute();
        }}
      >
        {postSheet && <PostContent post={postSheet} />}
      </SheetWindow>

      {/* Bottom finder bar */}
      <MobileFinderBar
        onOpenArchive={() => setSheet({ type: "archive" })}
        onOpenAbout={() => setSheet({ type: "about" })}
        darkMode={darkMode}
        onToggleDarkMode={onToggleDarkMode}
      />
    </div>
  );
}

// ─── WIDE LAYOUT (split-pane finder + reader) ────────────────────────────────

function WideLayout({
  darkMode,
  onToggleDarkMode,
  routedPostId,
  onOpenPostRoute,
  onClearPostRoute,
  posts,
}) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [splitOpen, setSplitOpen] = useState(() => !!routedPostId);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [rightPanel, setRightPanel] = useState(() =>
    routedPostId ? "post" : "empty"
  );

  const activePost =
    routedPostId != null
      ? posts.find((post) => post.id === routedPostId) ?? null
      : null;

  const openPost = useCallback(
    (post) => {
      setSplitOpen(true);
      setRightPanel("post");
      onOpenPostRoute(post.id);
    },
    [onOpenPostRoute]
  );

  const openArchive = useCallback(() => {
    setSplitOpen(true);
    setRightPanel(routedPostId ? "post" : "empty");
  }, [routedPostId]);

  const openAbout = useCallback(() => {
    setAboutOpen(true);
  }, []);

  const openTrash = useCallback(() => {
    setSplitOpen(true);
    setRightPanel("trash");
    onClearPostRoute();
  }, [onClearPostRoute]);

  const closeSplit = useCallback(() => {
    setSplitOpen(false);
    setRightPanel("empty");
    onClearPostRoute();
  }, [onClearPostRoute]);

  const closeRightPanel = useCallback(() => {
    setRightPanel("empty");
    onClearPostRoute();
  }, [onClearPostRoute]);

  const desktopIcons = [
    {
      id: "hd",
      label: "Weblog",
      iconEl: <HdIcon />,
      action: openArchive,
    },
    {
      id: "folder",
      label: "Drafts",
      iconEl: <FolderIcon />,
      action: openArchive,
    },
  ];
  const bottomIcons = [
    { id: "about", label: "About Me", iconEl: <NoteIcon />, action: openAbout },
    {
      id: "archive",
      label: "Post Archive",
      iconEl: <FolderIcon />,
      action: openArchive,
    },
    { id: "trash", label: "Trash", iconEl: <TrashIcon />, action: openTrash },
  ];

  const menus = [
    {
      label: "File",
      items: [
        { label: "Open Archive…", action: openArchive },
        "---",
        { label: "About Me…", action: openAbout },
      ],
    },
    {
      label: "Edit",
      items: [
        { label: "Undo", action: () => {} },
        "---",
        { label: "Cut", action: () => {} },
        { label: "Copy", action: () => {} },
        { label: "Paste", action: () => {} },
        "---",
        {
          label: darkMode ? "Disable Dark Mode" : "Enable Dark Mode",
          action: onToggleDarkMode,
        },
      ],
    },
    {
      label: "Special",
      items: [
        { label: "Empty Trash…", action: () => {} },
        "---",
        { label: "Restart", action: () => window.location.reload() },
      ],
    },
  ];

  useEffect(() => {
    const h = () => setActiveMenu(null);
    window.addEventListener("click", h);
    return () => window.removeEventListener("click", h);
  }, []);

  useEffect(() => {
    if (routedPostId) {
      setSplitOpen(true);
      setRightPanel("post");
    } else {
      setRightPanel((panel) => (panel === "post" ? "empty" : panel));
    }
  }, [routedPostId]);

  const splitTitle = rightPanel === "trash" ? "Trash" : "Post Archive";

  const rightTitle =
    rightPanel === "trash"
      ? "Trash"
      : activePost
        ? activePost.title
        : "Post";

  const showRightClose = rightPanel === "post" || rightPanel === "trash";

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#fff",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='4' height='4' fill='%23ffffff'/%3E%3Crect x='0' y='0' width='1' height='1' fill='%23e8e8e8'/%3E%3Crect x='2' y='2' width='1' height='1' fill='%23e8e8e8'/%3E%3C/svg%3E")`,
        }}
      />

      <div onClick={(e) => e.stopPropagation()}>
        <DesktopMenuBar
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          menus={menus}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: MENUBAR_H + 8,
          right: 8,
          display: "flex",
          flexDirection: "column",
          gap: 4,
          zIndex: 2,
        }}
      >
        {desktopIcons.map((i) => (
          <DesktopIcon
            key={i.id}
            iconEl={i.iconEl}
            label={i.label}
            onActivate={i.action}
          />
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: 8,
          display: "flex",
          flexDirection: "column",
          gap: 4,
          zIndex: 2,
        }}
      >
        {bottomIcons.map((i) => (
          <DesktopIcon
            key={i.id}
            iconEl={i.iconEl}
            label={i.label}
            onActivate={i.action}
          />
        ))}
      </div>

      {!splitOpen && (
        <div
          style={{
            position: "absolute",
            top: MENUBAR_H + 16,
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "Geneva, sans-serif",
            fontSize: 11,
            color: "#bbb",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            zIndex: 1,
          }}
        >
          Click icons
        </div>
      )}

      {splitOpen && (
        <div
          style={{
            position: "absolute",
            top: MENUBAR_H + 24,
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(960px, calc(100% - 48px))",
            height: `calc(100vh - ${MENUBAR_H + 40}px)`,
            zIndex: 1,
            background: "white",
            border: "1.5px solid black",
            boxShadow: "2px 2px 0 black",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <SplitPanelHeader title={splitTitle} onClose={closeSplit} />

          <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
            <div
              style={{
                width: SIDEBAR_W,
                flexShrink: 0,
                borderRight: "1px solid black",
                display: "flex",
                flexDirection: "column",
                minHeight: 0,
                background: "white",
              }}
            >
              <div style={{ flex: 1, overflow: "auto", minHeight: 0 }}>
                <ArchiveContent
                  onOpenPost={openPost}
                  posts={posts}
                  selectedId={routedPostId}
                />
              </div>
            </div>

            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                minWidth: 0,
                minHeight: 0,
                background: "white",
              }}
            >
              <SplitPanelHeader
                title={rightTitle}
                onClose={showRightClose ? closeRightPanel : undefined}
              />
              <div
                style={{
                  flex: 1,
                  overflow: "auto",
                  minHeight: 0,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {rightPanel === "post" && activePost && (
                  <PostContent post={activePost} />
                )}
                {rightPanel === "trash" && (
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      gap: 8,
                      fontFamily: "Geneva, sans-serif",
                      fontSize: 12,
                      color: "#999",
                    }}
                  >
                    <TrashIcon />
                    <span>The Trash is empty.</span>
                  </div>
                )}
                {rightPanel === "empty" && (
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 12,
                      padding: 32,
                      fontFamily: "Geneva, sans-serif",
                      color: "#999",
                    }}
                  >
                    <PostFileIcon size={40} />
                    <div style={{ fontSize: 13, textAlign: "center" }}>
                      Select a post from the archive
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {aboutOpen && (
        <DesktopWindow title="About Me" onClose={() => setAboutOpen(false)}>
          <AboutContent />
        </DesktopWindow>
      )}
    </div>
  );
}

// ─── ROOT ────────────────────────────────────────────────────────────────────

export default function MacClassicResponsive({ posts = [] }) {
  const [booted, setBooted] = useState(false);
  const isMobile = useIsMobile();
  const [darkMode, setDarkMode] = useDarkModeSetting();
  const [routedPostId, setRoutedPostId] = useState(() => {
    if (typeof window === "undefined") return null;
    return getPostIdFromPath(window.location.pathname, posts);
  });
  const appFilter = darkMode ? "invert(1) hue-rotate(180deg)" : "none";

  const onOpenPostRoute = useCallback((postId) => {
    if (typeof window === "undefined") return;
    const targetPath = `/post/${postId}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, "", targetPath);
    }
    setRoutedPostId(postId);
  }, []);

  const onClearPostRoute = useCallback(() => {
    if (typeof window === "undefined") return;
    if (/^\/post\/\d+\/?$/.test(window.location.pathname)) {
      window.history.pushState({}, "", "/");
    }
    setRoutedPostId(null);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onPopState = () =>
      setRoutedPostId(getPostIdFromPath(window.location.pathname, posts));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [posts]);

  return (
    <>
      {!booted && <BootScreen onDone={() => setBooted(true)} />}
      {booted && (
        <div style={{ width: "100%", height: "100%", filter: appFilter }}>
          {isMobile ? (
            <MobileLayout
              darkMode={darkMode}
              onToggleDarkMode={() => setDarkMode((v) => !v)}
              routedPostId={routedPostId}
              onOpenPostRoute={onOpenPostRoute}
              onClearPostRoute={onClearPostRoute}
              posts={posts}
            />
          ) : (
            <WideLayout
              darkMode={darkMode}
              onToggleDarkMode={() => setDarkMode((v) => !v)}
              routedPostId={routedPostId}
              onOpenPostRoute={onOpenPostRoute}
              onClearPostRoute={onClearPostRoute}
              posts={posts}
            />
          )}
        </div>
      )}
    </>
  );
}

import { useState, useRef, useEffect } from "react";

const CATALOGUE = `
CATALOGUE PARFUMERIE DE LA ZAC — PARFUMS DE PARIS

=== COLLECTION PRESTIGE ===
- Collection Prestige : 25 000 FCFA (stock: 4)
- Collection Igor : 25 000 FCFA (stock: 1)
- La Folie du Délice : 25 000 FCFA (stock: 2)
- Collection Kenzi : 20 000 FCFA (stock: 5)
- Collection Convivium : 17 500 FCFA (stock: 3)
- Collection Privée : 15 000 FCFA (stock: 10)

=== COFFRETS ===
- Coffret Collection Précieuse : 65 000 FCFA (stock: 1)
- Coffret Gris Montaigne : 50 000 FCFA (stock: 1)

=== CLASSIQUES ===
- Phantom Paco Rabanne : 75 000 FCFA (stock: 1)
- Invictus Victory Paco Rabanne : 65 000 FCFA (stock: 1)
- Red Tobacco : 75 000 FCFA (stock: 1)
- Atelier des Essences : 45 000 FCFA (stock: 1)
- Sugar Oud Fleurs des Délices : 35 000 FCFA (stock: 1)
- Gris Montaigne Black Empire : 35 000 FCFA (stock: 1)
- Mauboussin Privée Club : 40 000 FCFA (stock: 1)
- Callisto Holliday : 60 000 FCFA (stock: 1)
- Musc Tahara : 10 000 FCFA (stock: 8)

=== ACCESSOIRES ===
- Déodorant CP Ba Intense : 4 000 FCFA (stock: 3)
- Parfum de Chambre : 5 000 FCFA (stock: 2)
`;

const SYSTEM_PROMPT = `Tu es Matel, la conseillère officielle de la Parfumerie de la Zac, boutique de luxe spécialisée en parfums authentiques de Paris. Tu es élégante, chaleureuse et professionnelle. Tu utilises des emojis sobres (✨🖤🌹).

${CATALOGUE}

Règles :
- Réponds en 2-3 phrases maximum
- Pour commander : WhatsApp au 📱 +221 76 972 43 07
- Suggère toujours selon le budget
- Précise toujours que ce sont des parfums authentiques de Paris
- Ne jamais dépasser le stock indiqué`;

const platforms = [
  { id: "whatsapp", label: "WhatsApp", color: "#25D366", icon: "💬" },
  { id: "instagram", label: "Instagram", color: "#E1306C", icon: "📸" },
  { id: "facebook", label: "Facebook", color: "#1877F2", icon: "👥" },
];

const quickReplies = [
  { text: "Voir les parfums", icon: "🌹" },
  { text: "Meilleure vente", icon: "⭐" },
  { text: "Offrir un cadeau", icon: "🎁" },
  { text: "Commander", icon: "🛍️" },
];

export default function App() {
  const [platform, setPlatform] = useState("whatsapp");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Bienvenue à la Parfumerie de la Zac ✨ Je suis Matel, votre conseillère. Nos parfums authentiques de Paris vous attendent. Comment puis-je vous aider ? 🖤",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);
  const currentPlatform = platforms.find((p) => p.id === platform);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (text) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput("");
    const next = [...messages, { role: "user", content: msg }];
    setMessages(next);
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.REACT_APP_ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      setMessages([
        ...next,
        {
          role: "assistant",
          content: data.content?.[0]?.text || "Désolée, réessayez. ✨",
        },
      ]);
    } catch {
      setMessages([
        ...next,
        { role: "assistant", content: "Connexion indisponible. Réessayez. 🖤" },
      ]);
    }
    setLoading(false);
  };

  const gold = "#C9A84C";
  const pColor = currentPlatform.color;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes dot { 0%,80%,100%{transform:scale(0.6);opacity:0.3} 40%{transform:scale(1);opacity:1} }
        @keyframes glow { 0%,100%{box-shadow:0 0 15px #C9A84C33} 50%{box-shadow:0 0 30px #C9A84C66} }
        .msg { animation: fadeUp 0.3s ease forwards; }
        .btn-plat { transition: all 0.2s; cursor: pointer; border: none; }
        .btn-plat:hover { transform: translateY(-2px); }
        .qr-btn { transition: all 0.18s; cursor: pointer; border: none; }
        .qr-btn:hover { transform: translateY(-2px); background: rgba(201,168,76,0.18) !important; }
        .send-btn { transition: all 0.2s; cursor: pointer; border: none; }
        .send-btn:hover { transform: scale(1.06); }
        input:focus { outline: none; }
        ::-webkit-scrollbar { width: 0px; }
      `}</style>

      {/* HEADER */}
      <div style={{ width: "100%", maxWidth: "480px", background: "#0a0a0a", padding: "12px 20px 0" }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 0 12px",
          borderBottom: `1px solid ${gold}22`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "44px", height: "44px", borderRadius: "50%",
              overflow: "hidden", border: `2px solid ${gold}`,
              boxShadow: `0 0 16px ${gold}44`,
              animation: "glow 3s ease-in-out infinite",
              flexShrink: 0,
            }}>
              <img
                src="/logo.jpg"
                alt="PDZ"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML = "🖤";
                  e.target.parentElement.style.display = "flex";
                  e.target.parentElement.style.alignItems = "center";
                  e.target.parentElement.style.justifyContent = "center";
                  e.target.parentElement.style.fontSize = "20px";
                }}
              />
            </div>
            <div>
              <div style={{ color: gold, fontWeight: "800", fontSize: "15px", letterSpacing: "0.5px" }}>
                Parfumerie de la Zac
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "2px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade80" }} />
                <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "11px" }}>Matel en ligne • Parfums de Paris</span>
              </div>
            </div>
          </div>
          <div style={{
            background: `${gold}15`, border: `1px solid ${gold}33`,
            borderRadius: "20px", padding: "5px 12px",
            color: gold, fontSize: "11px", fontWeight: "600", letterSpacing: "1px",
          }}>LIVE</div>
        </div>

        {/* Platform tabs */}
        <div style={{ display: "flex", gap: "8px", padding: "12px 0 0" }}>
          {platforms.map((p) => (
            <button key={p.id} className="btn-plat" onClick={() => setPlatform(p.id)} style={{
              flex: 1, padding: "8px 6px", borderRadius: "14px",
              background: platform === p.id ? p.color : "rgba(255,255,255,0.05)",
              color: platform === p.id ? "#fff" : "rgba(255,255,255,0.35)",
              fontSize: "11px", fontWeight: "700", letterSpacing: "0.3px",
              boxShadow: platform === p.id ? `0 4px 15px ${p.color}44` : "none",
            }}>
              {p.icon} {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* MESSAGES */}
      <div style={{
        width: "100%", maxWidth: "480px", flex: 1,
        padding: "16px 20px", display: "flex", flexDirection: "column",
        gap: "14px", overflowY: "auto", minHeight: "400px", maxHeight: "50vh",
      }}>
        {messages.map((msg, i) => (
          <div key={i} className="msg" style={{
            display: "flex",
            justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            alignItems: "flex-end", gap: "8px",
          }}>
            {msg.role === "assistant" && (
              <div style={{
                width: "32px", height: "32px", borderRadius: "50%",
                overflow: "hidden", border: `1.5px solid ${gold}55`, flexShrink: 0,
              }}>
                <img
                  src="/logo.jpg"
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.innerHTML = "✨";
                    e.target.parentElement.style.display = "flex";
                    e.target.parentElement.style.alignItems = "center";
                    e.target.parentElement.style.justifyContent = "center";
                    e.target.parentElement.style.fontSize = "14px";
                  }}
                />
              </div>
            )}
            <div style={{
              maxWidth: "72%", padding: "11px 15px",
              borderRadius: msg.role === "user" ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
              background: msg.role === "user"
                ? `linear-gradient(135deg, ${pColor}, ${pColor}bb)`
                : "rgba(255,255,255,0.07)",
              color: msg.role === "user" ? "#fff" : "rgba(255,255,255,0.9)",
              fontSize: "13.5px", lineHeight: "1.6",
              border: msg.role === "assistant" ? "1px solid rgba(255,255,255,0.08)" : "none",
              backdropFilter: "blur(10px)",
            }}>
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
            <div style={{
              width: "32px", height: "32px", borderRadius: "50%",
              overflow: "hidden", border: `1.5px solid ${gold}55`, flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "#1a1408", fontSize: "14px",
            }}>✨</div>
            <div style={{
              padding: "12px 16px", borderRadius: "20px 20px 20px 4px",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex", gap: "4px", alignItems: "center",
            }}>
              {[0, 1, 2].map((j) => (
                <div key={j} style={{
                  width: "7px", height: "7px", borderRadius: "50%",
                  background: gold,
                  animation: `dot 1.2s ease-in-out ${j * 0.15}s infinite`,
                }} />
              ))}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* QUICK REPLIES */}
      <div style={{
        width: "100%", maxWidth: "480px",
        padding: "0 20px 10px",
        display: "flex", gap: "8px", flexWrap: "wrap",
      }}>
        {quickReplies.map((q, i) => (
          <button key={i} className="qr-btn" onClick={() => send(q.text)} style={{
            padding: "7px 14px", borderRadius: "20px",
            border: `1px solid ${gold}30`,
            background: "rgba(201,168,76,0.08)",
            color: "rgba(255,255,255,0.7)",
            fontSize: "12px", fontWeight: "500",
            display: "flex", alignItems: "center", gap: "5px",
          }}>
            <span>{q.icon}</span> {q.text}
          </button>
        ))}
      </div>

      {/* INPUT */}
      <div style={{
        width: "100%", maxWidth: "480px",
        padding: "10px 20px 20px",
        background: "rgba(255,255,255,0.03)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex", gap: "10px", alignItems: "center",
      }}>
        <div style={{
          flex: 1, display: "flex", alignItems: "center",
          background: "rgba(255,255,255,0.07)",
          borderRadius: "24px",
          border: "1px solid rgba(255,255,255,0.1)",
          padding: "0 16px", gap: "8px",
        }}>
          <span style={{ fontSize: "16px" }}>✍️</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Votre message à Matel..."
            style={{
              flex: 1, padding: "12px 0",
              background: "transparent", border: "none",
              color: "#fff", fontSize: "14px", fontFamily: "inherit",
            }}
          />
        </div>
        <button className="send-btn" onClick={() => send()} disabled={loading} style={{
          width: "48px", height: "48px", borderRadius: "50%",
          background: `linear-gradient(135deg, ${gold}, #a07830)`,
          color: "#0a0a0a", fontSize: "18px", fontWeight: "bold",
          flexShrink: 0, opacity: loading ? 0.5 : 1,
          boxShadow: `0 4px 20px ${gold}55`,
        }}>➤</button>
      </div>

      {/* FOOTER */}
      <div style={{
        width: "100%", maxWidth: "480px",
        textAlign: "center", padding: "8px",
        color: "rgba(255,255,255,0.15)",
        fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase",
      }}>
        Parfumerie de la Zac • IA Powered by Claude
      </div>
    </div>
  );
}

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

const SYSTEM_PROMPT = `Tu es l'assistante officielle de la Parfumerie de la Zac, une boutique de luxe spécialisée dans les parfums de Paris. Tu t'appelles "Zara". Tu parles français avec élégance, chaleur et professionnalisme. Tu utilises des emojis sobres (✨🖤🌹💛).

${CATALOGUE}

Ton rôle :
- Accueillir chaque client avec élégance
- Présenter les parfums selon les goûts et préférences du client
- Informer sur les prix, stocks et caractéristiques des parfums
- Guider vers le parfum idéal selon l'occasion, la personnalité, le budget
- Inciter à commander via WhatsApp

Règles importantes :
- Réponds en 2-3 phrases maximum, avec élégance
- Ne jamais dépasser le stock indiqué
- Pour commander : "Envoyez un message WhatsApp au 📱 +221 XX XXX XX XX en précisant le parfum choisi"
- Si budget limité, suggère toujours une option adaptée
- Mentionne toujours que ce sont des parfums authentiques de Paris
- Sois fière de la marque Parfumerie de la Zac`;

const platforms = [
  { id: "whatsapp", label: "WhatsApp", color: "#25D366", icon: "💬" },
  { id: "instagram", label: "Instagram", color: "#C13584", icon: "📸" },
  { id: "facebook", label: "Facebook", color: "#1877F2", icon: "👥" },
];

const suggestions = [
  "Bonjour, que vendez-vous ?",
  "Je cherche un parfum pour offrir",
  "Quel est votre parfum le moins cher ?",
  "Quels coffrets avez-vous ?",
  "Je veux commander",
];

export default function App() {
  const [activePlatform, setActivePlatform] = useState("whatsapp");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Bienvenue à la Parfumerie de la Zac ✨ Je suis Zara, votre conseillère beauté. Nos parfums authentiques de Paris vous attendent. Comment puis-je vous guider aujourd'hui ? 🖤",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const platform = platforms.find((p) => p.id === activePlatform);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;
    setInput("");
    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
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
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await response.json();
      const reply = data.content?.[0]?.text || "Une erreur s'est produite. Réessayez. ✨";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Connexion temporairement indisponible. Réessayez dans un instant. 🖤" }]);
    }
    setLoading(false);
  };

  const gold = "#C9A84C";

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at top, #1a1408 0%, #0a0a0a 60%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Palatino Linotype', Palatino, serif",
      padding: "20px",
    }}>
      <style>{`
        @keyframes slideUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .msg-in { animation: slideUp 0.3s ease forwards; }
        .sugg-btn:hover { background: rgba(201,168,76,0.15) !important; color: #C9A84C !important; transform: translateY(-1px); }
        .send-btn:hover { transform: scale(1.05); }
        input:focus { outline: none; border-color: rgba(201,168,76,0.5) !important; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.2); border-radius: 2px; }
        .plat-btn { transition: all 0.2s; cursor: pointer; }
        .plat-btn:hover { opacity: 0.85; }
      `}</style>

      <div style={{
        width: "100%", maxWidth: "440px",
        background: "#111111",
        borderRadius: "20px",
        border: `1px solid ${gold}33`,
        boxShadow: `0 30px 80px rgba(0,0,0,0.8), 0 0 60px ${gold}08`,
        overflow: "hidden",
      }}>
        {/* Top gold line */}
        <div style={{ height: "2px", background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />

        {/* Header */}
        <div style={{
          padding: "20px 20px 16px",
          background: "linear-gradient(180deg, #1a1408 0%, #111111 100%)",
          borderBottom: `1px solid ${gold}22`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
            {/* Logo */}
            <div style={{
              width: "56px", height: "56px", borderRadius: "50%",
              border: `2px solid ${gold}66`, overflow: "hidden", flexShrink: 0,
              boxShadow: `0 0 20px ${gold}33`,
              background: "#000",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "22px",
            }}>🖤</div>

            <div style={{ flex: 1 }}>
              <div style={{ color: gold, fontSize: "13px", fontWeight: "700", letterSpacing: "3px", textTransform: "uppercase" }}>Parfumerie</div>
              <div style={{ color: "#fff", fontSize: "17px", fontWeight: "700", letterSpacing: "1px", marginTop: "2px" }}>de la Zac</div>
              <div style={{ color: `${gold}99`, fontSize: "10px", letterSpacing: "2px", marginTop: "2px" }}>PARFUMS DE PARIS</div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "5px", justifyContent: "flex-end" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade80" }} />
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px" }}>En ligne</span>
              </div>
              <div style={{ color: `${gold}88`, fontSize: "11px", marginTop: "2px" }}>Zara • Conseillère</div>
            </div>
          </div>

          {/* Platform switcher */}
          <div style={{ display: "flex", gap: "6px" }}>
            {platforms.map((p) => (
              <button key={p.id} className="plat-btn" onClick={() => setActivePlatform(p.id)} style={{
                flex: 1, padding: "7px 4px", borderRadius: "10px",
                border: activePlatform === p.id ? `1px solid ${p.color}` : "1px solid rgba(255,255,255,0.08)",
                background: activePlatform === p.id ? `${p.color}22` : "rgba(255,255,255,0.04)",
                color: activePlatform === p.id ? p.color : "rgba(255,255,255,0.35)",
                fontSize: "10px", fontWeight: "600", letterSpacing: "0.5px",
              }}>
                {p.icon} {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div style={{
          height: "370px", overflowY: "auto", padding: "16px",
          display: "flex", flexDirection: "column", gap: "12px",
          background: "#0d0d0d",
        }}>
          {messages.map((msg, i) => (
            <div key={i} className="msg-in" style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              alignItems: "flex-end", gap: "8px",
            }}>
              {msg.role === "assistant" && (
                <div style={{
                  width: "28px", height: "28px", borderRadius: "50%",
                  border: `1px solid ${gold}44`, background: "#1a1408",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "13px", flexShrink: 0,
                }}>✨</div>
              )}
              <div style={{
                maxWidth: "78%", padding: "10px 14px",
                borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                background: msg.role === "user" ? `linear-gradient(135deg, ${gold}, #a07830)` : "rgba(255,255,255,0.06)",
                color: msg.role === "user" ? "#0a0a0a" : "rgba(255,255,255,0.88)",
                fontSize: "13.5px", lineHeight: "1.55",
                border: msg.role === "assistant" ? `1px solid ${gold}18` : "none",
                fontWeight: msg.role === "user" ? "600" : "400",
              }}>
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
              <div style={{
                width: "28px", height: "28px", borderRadius: "50%",
                border: `1px solid ${gold}44`, background: "#1a1408",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px",
              }}>✨</div>
              <div style={{
                padding: "10px 16px", borderRadius: "16px 16px 16px 4px",
                background: "rgba(255,255,255,0.06)", border: `1px solid ${gold}18`,
                display: "flex", gap: "5px", alignItems: "center",
              }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: "6px", height: "6px", borderRadius: "50%", background: gold,
                    animation: `pulse 1.3s ease-in-out ${i * 0.22}s infinite`,
                  }} />
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        <div style={{
          padding: "10px 14px 6px", background: "#0d0d0d",
          borderTop: `1px solid ${gold}11`,
          display: "flex", gap: "6px", flexWrap: "wrap",
        }}>
          {suggestions.map((s, i) => (
            <button key={i} className="sugg-btn" onClick={() => sendMessage(s)} style={{
              padding: "5px 11px", borderRadius: "20px",
              border: `1px solid ${gold}25`,
              background: `rgba(201,168,76,0.06)`,
              color: `${gold}99`, fontSize: "11px", cursor: "pointer",
              transition: "all 0.2s", whiteSpace: "nowrap", fontFamily: "inherit",
            }}>{s}</button>
          ))}
        </div>

        {/* Input */}
        <div style={{
          padding: "10px 14px 14px", background: "#0d0d0d",
          display: "flex", gap: "10px", alignItems: "center",
        }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Votre message..."
            style={{
              flex: 1, padding: "11px 16px", borderRadius: "24px",
              border: `1px solid ${gold}25`, background: "rgba(255,255,255,0.05)",
              color: "#fff", fontSize: "13px", fontFamily: "inherit",
              transition: "border-color 0.2s",
            }}
          />
          <button className="send-btn" onClick={() => sendMessage()} disabled={loading} style={{
            width: "44px", height: "44px", borderRadius: "50%",
            border: `1px solid ${gold}55`,
            background: `linear-gradient(135deg, ${gold}, #a07830)`,
            color: "#0a0a0a", fontSize: "16px", cursor: "pointer",
            transition: "all 0.2s", flexShrink: 0, fontWeight: "bold",
            opacity: loading ? 0.5 : 1, boxShadow: `0 4px 15px ${gold}44`,
          }}>➤</button>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", padding: "8px", background: "#0a0a0a", borderTop: `1px solid ${gold}11` }}>
          <span style={{ color: `${gold}44`, fontSize: "9px", letterSpacing: "2.5px", textTransform: "uppercase" }}>
            Parfumerie de la Zac • Parfums de Paris • IA Powered
          </span>
        </div>
        <div style={{ height: "2px", background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />
      </div>
    </div>
  );
}

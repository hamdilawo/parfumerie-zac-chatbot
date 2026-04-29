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

const WHATSAPP = "221769724307";
const WHATSAPP_DISPLAY = "+221 76 972 43 07";
const INSTAGRAM = "https://www.instagram.com/parfumerie_de_la_zac";
const FACEBOOK = "https://www.facebook.com/profile.php?id=61576231477609";

const SYSTEM_PROMPT = `Tu es Matel, conseillère officielle de la Parfumerie de la Zac, boutique de luxe spécialisée en parfums authentiques de Paris. Tu es élégante, chaleureuse et professionnelle.

${CATALOGUE}

INFOS BOUTIQUE :
- Adresse : Zac Mbao, Pikine, Dakar
- Horaires : Lundi-Dimanche 9h00 à 20h00
- Livraison : Dakar + Banlieue sous 24h
- WhatsApp : ${WHATSAPP_DISPLAY}

Règles :
- Réponds en 2-3 phrases maximum
- Pour commander : WhatsApp au ${WHATSAPP_DISPLAY}
- Suggère selon le budget
- Parfums authentiques de Paris toujours mentionné
- Ne jamais dépasser le stock`;

const platforms = [
  { id: "whatsapp", label: "WhatsApp", color: "#25D366", icon: "💬" },
  { id: "instagram", label: "Instagram", color: "#E1306C", icon: "📸" },
  { id: "facebook", label: "Facebook", color: "#1877F2", icon: "👥" },
];

const quickReplies = [
  "Voir les parfums 🌹",
  "Commander maintenant",
  "Horaires et adresse",
  "Infos livraison",
];

export default function App() {
  const [platform, setPlatform] = useState("whatsapp");
  const [activePage, setActivePage] = useState("chat");
  const [messages, setMessages] = useState([{
    role: "assistant",
    content: "Bienvenue à la Parfumerie de la Zac ✨ Je suis Matel, votre conseillère. Nos parfums authentiques de Paris vous attendent. Comment puis-je vous aider ? 🖤",
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState({ name: "", phone: "", product: "", quartier: "" });
  const endRef = useRef(null);
  const cp = platforms.find((p) => p.id === platform);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

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
      setMessages([...next, { role: "assistant", content: data.content?.[0]?.text || "Désolée, réessayez. ✨" }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "Connexion indisponible. Réessayez. 🖤" }]);
    }
    setLoading(false);
  };

  const sendOrder = () => {
    const msg = `Bonjour Parfumerie De La Zac ! 🖤%0AJe souhaite commander :%0A%0A👤 Nom : ${order.name}%0A📱 Tel : ${order.phone}%0A🌹 Parfum : ${order.product}%0A📍 Quartier : ${order.quartier}%0A%0AMerci ✨`;
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank");
  };

  const gold = "#C9A84C";
  const canOrder = order.name && order.phone && order.product && order.quartier;

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "'SF Pro Display', -apple-system, sans-serif" }}>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes dot{0%,80%,100%{transform:scale(0.6);opacity:0.3}40%{transform:scale(1);opacity:1}}
        @keyframes glow{0%,100%{box-shadow:0 0 15px #C9A84C33}50%{box-shadow:0 0 30px #C9A84C66}}
        .msg{animation:fadeUp 0.3s ease forwards}
        .tbtn{transition:all 0.2s;cursor:pointer;border:none}
        .tbtn:hover{transform:translateY(-2px);opacity:0.9}
        input:focus{outline:none}
        ::-webkit-scrollbar{width:0}
      `}</style>

      {/* HEADER */}
      <div style={{ width: "100%", maxWidth: "480px", background: "#0a0a0a", padding: "12px 20px 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0 12px", borderBottom: `1px solid ${gold}22` }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "50%", overflow: "hidden", border: `2px solid ${gold}`, boxShadow: `0 0 16px ${gold}44`, animation: "glow 3s ease-in-out infinite", flexShrink: 0, background: "#1a1408", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src="/logo.jpg" alt="PDZ" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.target.style.display = "none"; e.target.parentElement.innerHTML = "🖤"; e.target.parentElement.style.fontSize = "20px"; }} />
            </div>
            <div>
              <div style={{ color: gold, fontWeight: "800", fontSize: "15px" }}>Parfumerie de la Zac</div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "2px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade80" }} />
                <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "11px" }}>Matel en ligne • Parfums de Paris</span>
              </div>
            </div>
          </div>
          <div style={{ background: `${gold}15`, border: `1px solid ${gold}33`, borderRadius: "20px", padding: "5px 12px", color: gold, fontSize: "11px", fontWeight: "600" }}>LIVE</div>
        </div>

        {/* Platforms */}
        <div style={{ display: "flex", gap: "6px", padding: "12px 0 0" }}>
          {platforms.map((p) => (
            <button key={p.id} className="tbtn" onClick={() => setPlatform(p.id)} style={{ flex: 1, padding: "8px 6px", borderRadius: "14px", background: platform === p.id ? p.color : "rgba(255,255,255,0.05)", color: platform === p.id ? "#fff" : "rgba(255,255,255,0.35)", fontSize: "11px", fontWeight: "700", boxShadow: platform === p.id ? `0 4px 15px ${p.color}44` : "none" }}>
              {p.icon} {p.label}
            </button>
          ))}
        </div>

        {/* Pages nav */}
        <div style={{ display: "flex", gap: "6px", padding: "10px 0 0" }}>
          {[{ id: "chat", label: "💬 Chat" }, { id: "order", label: "🛍️ Commander" }, { id: "info", label: "📍 Boutique" }].map((p) => (
            <button key={p.id} className="tbtn" onClick={() => setActivePage(p.id)} style={{ flex: 1, padding: "7px 4px", borderRadius: "10px", background: activePage === p.id ? `${gold}22` : "rgba(255,255,255,0.04)", color: activePage === p.id ? gold : "rgba(255,255,255,0.35)", border: `1px solid ${activePage === p.id ? gold + "55" : "rgba(255,255,255,0.08)"}`, fontSize: "11px", fontWeight: "600" }}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* CHAT */}
      {activePage === "chat" && (
        <>
          <div style={{ width: "100%", maxWidth: "480px", flex: 1, padding: "16px 20px", display: "flex", flexDirection: "column", gap: "14px", overflowY: "auto", minHeight: "350px", maxHeight: "45vh" }}>
            {messages.map((msg, i) => (
              <div key={i} className="msg" style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", alignItems: "flex-end", gap: "8px" }}>
                {msg.role === "assistant" && (
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", overflow: "hidden", border: `1.5px solid ${gold}55`, flexShrink: 0, background: "#1a1408", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img src="/logo.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.target.style.display = "none"; e.target.parentElement.innerHTML = "✨"; e.target.parentElement.style.fontSize = "14px"; }} />
                  </div>
                )}
                <div style={{ maxWidth: "72%", padding: "11px 15px", borderRadius: msg.role === "user" ? "20px 20px 4px 20px" : "20px 20px 20px 4px", background: msg.role === "user" ? `linear-gradient(135deg, ${cp.color}, ${cp.color}bb)` : "rgba(255,255,255,0.07)", color: msg.role === "user" ? "#fff" : "rgba(255,255,255,0.9)", fontSize: "13.5px", lineHeight: "1.6", border: msg.role === "assistant" ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: `1.5px solid ${gold}55`, flexShrink: 0, background: "#1a1408", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>✨</div>
                <div style={{ padding: "12px 16px", borderRadius: "20px 20px 20px 4px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: "4px", alignItems: "center" }}>
                  {[0, 1, 2].map((j) => <div key={j} style={{ width: "7px", height: "7px", borderRadius: "50%", background: gold, animation: `dot 1.2s ease-in-out ${j * 0.15}s infinite` }} />)}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
          <div style={{ width: "100%", maxWidth: "480px", padding: "0 20px 10px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {quickReplies.map((q, i) => (
              <button key={i} className="tbtn" onClick={() => send(q)} style={{ padding: "7px 12px", borderRadius: "20px", border: `1px solid ${gold}30`, background: "rgba(201,168,76,0.08)", color: "rgba(255,255,255,0.7)", fontSize: "11px" }}>{q}</button>
            ))}
          </div>
          <div style={{ width: "100%", maxWidth: "480px", padding: "10px 20px 20px", background: "rgba(255,255,255,0.03)", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: "10px", alignItems: "center" }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center", background: "rgba(255,255,255,0.07)", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.1)", padding: "0 16px", gap: "8px" }}>
              <span style={{ fontSize: "16px" }}>✍️</span>
              <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Votre message à Matel..." style={{ flex: 1, padding: "12px 0", background: "transparent", border: "none", color: "#fff", fontSize: "14px", fontFamily: "inherit" }} />
            </div>
            <button className="tbtn" onClick={() => send()} disabled={loading} style={{ width: "48px", height: "48px", borderRadius: "50%", background: `linear-gradient(135deg, ${gold}, #a07830)`, color: "#0a0a0a", fontSize: "18px", fontWeight: "bold", flexShrink: 0, opacity: loading ? 0.5 : 1, boxShadow: `0 4px 20px ${gold}55` }}>➤</button>
          </div>
        </>
      )}

      {/* ORDER */}
      {activePage === "order" && (
        <div style={{ width: "100%", maxWidth: "480px", padding: "20px", flex: 1 }}>
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "20px", border: `1px solid ${gold}22`, padding: "24px" }}>
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>🛍️</div>
              <div style={{ color: gold, fontSize: "18px", fontWeight: "800" }}>Commander via WhatsApp</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", marginTop: "4px" }}>Remplissez et on vous contacte rapidement !</div>
            </div>
            {[
              { key: "name", label: "👤 Votre nom complet", ph: "Ex: Amadou Diallo" },
              { key: "phone", label: "📱 Votre numéro WhatsApp", ph: "Ex: +221 77 XXX XX XX" },
              { key: "product", label: "🌹 Parfum choisi", ph: "Ex: Phantom Paco Rabanne" },
              { key: "quartier", label: "📍 Votre quartier", ph: "Ex: Pikine, Parcelles, Médina..." },
            ].map((f) => (
              <div key={f.key} style={{ marginBottom: "16px" }}>
                <label style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", display: "block", marginBottom: "6px" }}>{f.label}</label>
                <input value={order[f.key]} onChange={(e) => setOrder({ ...order, [f.key]: e.target.value })} placeholder={f.ph} style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: `1px solid ${gold}25`, background: "rgba(255,255,255,0.06)", color: "#fff", fontSize: "13px", fontFamily: "inherit", boxSizing: "border-box" }} />
              </div>
            ))}
            <button className="tbtn" onClick={sendOrder} disabled={!canOrder} style={{ width: "100%", padding: "16px", borderRadius: "16px", background: canOrder ? "linear-gradient(135deg, #25D366, #1a9e4a)" : "rgba(255,255,255,0.1)", color: canOrder ? "#fff" : "rgba(255,255,255,0.3)", fontSize: "15px", fontWeight: "700", boxShadow: canOrder ? "0 4px 20px #25D36644" : "none" }}>
              💬 Envoyer la commande sur WhatsApp
            </button>
            <div style={{ textAlign: "center", marginTop: "12px", color: `${gold}66`, fontSize: "11px" }}>Livraison Dakar + Banlieue • Réponse sous 2h</div>
          </div>
        </div>
      )}

      {/* INFO */}
      {activePage === "info" && (
        <div style={{ width: "100%", maxWidth: "480px", padding: "20px", flex: 1 }}>
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "20px", border: `1px solid ${gold}22`, padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ textAlign: "center", marginBottom: "8px" }}>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>🏪</div>
              <div style={{ color: gold, fontSize: "18px", fontWeight: "800" }}>Parfumerie De La Zac</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>Parfums authentiques de Paris</div>
            </div>
            {[
              { icon: "📍", label: "Adresse", value: "Zac Mbao, Pikine, Dakar" },
              { icon: "🕐", label: "Horaires", value: "Lundi — Dimanche : 9h00 à 20h00" },
              { icon: "🚚", label: "Livraison", value: "Dakar + Banlieue — Sous 24h" },
              { icon: "📱", label: "WhatsApp", value: WHATSAPP_DISPLAY },
            ].map((info, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "14px 16px", borderRadius: "14px", background: "rgba(255,255,255,0.05)", border: `1px solid ${gold}15` }}>
                <span style={{ fontSize: "22px", flexShrink: 0 }}>{info.icon}</span>
                <div>
                  <div style={{ color: `${gold}99`, fontSize: "11px", marginBottom: "2px" }}>{info.label}</div>
                  <div style={{ color: "#fff", fontSize: "13px", fontWeight: "600" }}>{info.value}</div>
                </div>
              </div>
            ))}
            {/* Social buttons */}
            <div style={{ display: "flex", gap: "10px" }}>
              <button className="tbtn" onClick={() => window.open(`https://wa.me/${WHATSAPP}`, "_blank")} style={{ flex: 1, padding: "14px 8px", borderRadius: "16px", background: "linear-gradient(135deg, #25D366, #1a9e4a)", color: "#fff", fontSize: "13px", fontWeight: "700", boxShadow: "0 4px 20px #25D36644", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                <span style={{ fontSize: "22px" }}>💬</span>
                <span>WhatsApp</span>
              </button>
              <button className="tbtn" onClick={() => window.open(INSTAGRAM, "_blank")} style={{ flex: 1, padding: "14px 8px", borderRadius: "16px", background: "linear-gradient(135deg, #E1306C, #833ab4)", color: "#fff", fontSize: "13px", fontWeight: "700", boxShadow: "0 4px 20px #E1306C44", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                <span style={{ fontSize: "22px" }}>📸</span>
                <span>Instagram</span>
              </button>
              <button className="tbtn" onClick={() => window.open(FACEBOOK, "_blank")} style={{ flex: 1, padding: "14px 8px", borderRadius: "16px", background: "linear-gradient(135deg, #1877F2, #0d5bba)", color: "#fff", fontSize: "13px", fontWeight: "700", boxShadow: "0 4px 20px #1877F244", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                <span style={{ fontSize: "22px" }}>👥</span>
                <span>Facebook</span>
              </button>
            </div>
            <button className="tbtn" onClick={() => setActivePage("order")} style={{ width: "100%", padding: "14px", borderRadius: "16px", background: `linear-gradient(135deg, ${gold}, #a07830)`, color: "#0a0a0a", fontSize: "14px", fontWeight: "700", boxShadow: `0 4px 20px ${gold}44` }}>
              🛍️ Passer une commande
            </button>
          </div>
        </div>
      )}

      <div style={{ width: "100%", maxWidth: "480px", textAlign: "center", padding: "10px", color: "rgba(255,255,255,0.15)", fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        Parfumerie de la Zac • IA Powered by Claude
      </div>
    </div>
  );
}

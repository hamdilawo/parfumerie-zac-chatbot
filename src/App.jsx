import { useState, useRef, useEffect } from "react";

const WHATSAPP = "221769724307";
const WHATSAPP_DISPLAY = "+221 76 972 43 07";
const INSTAGRAM = "https://www.instagram.com/parfumerie_de_la_zac";
const FACEBOOK = "https://www.facebook.com/profile.php?id=61576231477609";

const PRODUITS = [
  { nom: "Collection Prestige (Havana, Rose Oud, Santal, Noir Absolu)", prix: 25000, stock: 4, cat: "Collection", img: "/photos/20250521_130732.jpg", desc: "Fragrance raffinée aux notes chaudes et boisées de Havana. Élégante et inoubliable." },
  { nom: "Collection Igor (Blue Magic)", prix: 25000, stock: 1, cat: "Collection", img: "/photos/20250521_113939.jpg", desc: "Création exclusive Blue Magic by Igor. Notes envoûtantes et mystérieuses. Stock limité !" },
  { nom: "Collection La Folie du Délice (Sweet Mango, Dragibus)", prix: 25000, stock: 2, cat: "Collection", img: "/photos/20250521_114141.jpg", desc: "Notes fruitées de mangue sucrée. Frais et gourmand, authentique de Paris." },
  { nom: "Collection Kenzi (Black Seduction, Legende, Addiction, Elixir, Santal Imperial)", prix: 20000, stock: 5, cat: "Collection", img: "/photos/kenzi_black_seduction.jpg", desc: "Élégance et caractère pour un parfum qui vous ressemble." },
  { nom: "Collection Convivium (Sillage Frais, Gris Intense)", prix: 17500, stock: 3, cat: "Collection", img: "/photos/20250521_114947.jpg", desc: "Sillage Frais de Convivium Paris. Notes fraîches et marines." },
  { nom: "Collection Privée (Bakara, Arabie, Gris, Oud Vanille, Musc Blanc, Diament bleu)", prix: 15000, stock: 11, cat: "Collection", img: "/photos/20250521_121713.jpg", desc: "5 fragrances : Musc Blanc, Oud Vanille, Gris, Bakara, Arabie." },
  { nom: "Coffret Collection Précieuse", prix: 65000, stock: 1, cat: "Coffret", img: "/photos/20250521_113244.jpg", desc: "Coffret 4 parfums luxueux. Le cadeau parfait pour une occasion inoubliable !" },
  { nom: "Coffret Gris Montaigne", prix: 50000, stock: 1, cat: "Coffret", img: "/photos/20250521_113526.jpg", desc: "Coffret prestige Gris Montaigne Paris avec Rouge Absolu à l'huile." },
  { nom: "Phantom Paco Rabanne", prix: 75000, stock: 1, cat: "Classique", img: "/photos/20250521_111950.jpg", desc: "Le légendaire Phantom en flacon robot iconique. Notes boisées et magnétiques." },
  { nom: "Invictus Victory Paco Rabanne", prix: 65000, stock: 1, cat: "Classique", img: "/photos/20250521_112157.jpg", desc: "La victoire dans un flacon trophée noir. Puissant, frais et inoubliable." },
  { nom: "Red Tobacco Mancera Paris", prix: 75000, stock: 1, cat: "Classique", img: "/photos/20250521_112841.jpg", desc: "Mancera Paris Red Tobacco 120ml. Notes de tabac rouge et épices. Sensuel." },
  { nom: "Atelier des Essences (Eclat d'Iris)", prix: 45000, stock: 1, cat: "Classique", img: "/photos/20250521_112051.jpg", desc: "Atelier des Essences Paris, Eclat d'Iris. Notes florales raffinées." },
  { nom: "Sugar Oud Gulf Flowers", prix: 35000, stock: 1, cat: "Classique", img: "/photos/20250521_112942.jpg", desc: "Les Fleurs du Golfe Sugar Oud. Notes de oud et fleurs sucrées. Oriental." },
  { nom: "Gris Montaigne Black Empire", prix: 35000, stock: 1, cat: "Classique", img: "/photos/20250521_112523.jpg", desc: "Black Empire de Gris Montaigne Paris. Notes boisées profondes et sophistiquées." },
  { nom: "Mauboussin Privée Club", prix: 40000, stock: 1, cat: "Classique", img: "/photos/20250521_112711.jpg", desc: "Private Club de Mauboussin. Flacon bleu nuit aux notes fruitées et florales." },
  { nom: "Callisto Holliday Paris", prix: 60000, stock: 1, cat: "Classique", img: "/photos/20250521_112315.jpg", desc: "Callisto Paris. Notes ambrées chaudes et boisées dans un flacon élégant." },
  { nom: "Musc Tahara (Tahara, Oud Cachemire, Barbe à Papa, Rouge )", prix: 10000, stock: 8, cat: "Accessoire", img: "/photos/20250521_132240.jpg", desc: "Musc pur et authentique. Doux, enveloppant, longue tenue." },
  { nom: "Déodorant BA Intense CP", prix: 4000, stock: 3, cat: "Accessoire", img: "/photos/20250521_122352.jpg", desc: "Collection Privée by Birraci — BA Intense Body Spray. Protection longue durée." },
];

// === PROMO TABASKI ===
const PROMO_ACTIVE = true;
const PROMO_TAUX = 0.25; // 15%
const PROMO_LABEL = "PROMO TABASKI -25%";
const PROMO_EXCLUS = ["Déodorant BA Intense CP"];
const enPromo = (p) => PROMO_ACTIVE && !PROMO_EXCLUS.includes(p.nom);
const prixPromo = (p) => Math.round(p.prix * (1 - PROMO_TAUX));

const CATALOGUE_TEXT = PRODUITS.map(p => {
  const ligne = `- ${p.nom} : ${p.prix.toLocaleString('fr-FR')} FCFA (stock: ${p.stock})`;
  return enPromo(p)
    ? `${ligne} 🐏 PROMO TABASKI -15% → ${prixPromo(p).toLocaleString('fr-FR')} FCFA`
    : ligne;
}).join('\n');

const SYSTEM_PROMPT = `Tu es Matel, la conseillère officielle de la Parfumerie de la Zac, boutique de luxe spécialisée en parfums authentiques de Paris. Tu es élégante, chaleureuse et professionnelle. Tu utilises des emojis sobres (✨🖤🌹).

🐏 PROMOTION TABASKI EN COURS : -15% sur TOUS les produits sauf le Déodorant BA Intense CP. Mets en avant cette promo dans tes recommandations !

CATALOGUE COMPLET :
${CATALOGUE_TEXT}

INFOS BOUTIQUE :
- Adresse : Zac Mbao, Pikine, Dakar
- Horaires : Lundi-Dimanche 9h00 à 20h00
- Livraison : Dakar + Banlieue sous 24h
- WhatsApp : ${WHATSAPP_DISPLAY}

Règles :
- Réponds en 2-3 phrases maximum
- Pour commander : invite à cliquer sur "🛒 Ajouter au panier" sur les fiches produits, puis "Commander" pour finaliser
- Suggère selon le budget du client
- Mentionne toujours que ce sont des parfums authentiques de Paris
- Ne jamais dépasser le stock indiqué
- Mentionne la promo Tabaski quand pertinent
- Encourage à ajouter plusieurs articles au panier pour profiter pleinement de la promo`;

const platforms = [
  { id: "whatsapp", label: "WhatsApp", color: "#25D366", icon: "💬" },
];

const PAGES = [
  { id: "catalogue", label: "📦 Boutique" },
  { id: "order", label: "🛍️ Commander" },
  { id: "info", label: "📍 Boutique" },
];

const CATS = ["Tous", "Collection", "Coffret", "Classique", "Accessoire"];
const CAT_ICONS = { Collection: "👑", Coffret: "🎁", Classique: "🌹", Accessoire: "✨" };

export default function App() {
  const [platform, setPlatform] = useState("whatsapp");
  const [activePage, setActivePage] = useState("chat");
  const [messages, setMessages] = useState([{
    role: "assistant",
    content: "Bienvenue à la Parfumerie de la Zac ✨ Je suis Matel, votre conseillère. Nos parfums authentiques de Paris vous attendent. Comment puis-je vous aider ? 🖤",
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState({ name: "", phone: "", quartier: "" });
  const [catFilter, setCatFilter] = useState("Tous");
  const [chatOverlay, setChatOverlay] = useState(false);
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem("pdz_cart") || "[]"); } catch { return []; }
  });
  const [toast, setToast] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    try { localStorage.setItem("pdz_cart", JSON.stringify(cart)); } catch {}
  }, [cart]);

  const addToCart = (produit) => {
    setCart(prev => {
      const existing = prev.find(c => c.nom === produit.nom);
      if (existing) return prev.map(c => c.nom === produit.nom ? { ...c, qty: Math.min(c.qty + 1, produit.stock) } : c);
      return [...prev, { nom: produit.nom, prix: produit.prix, qty: 1, stock: produit.stock }];
    });
    setToast(`✓ ${produit.nom} ajouté au panier`);
    setTimeout(() => setToast(""), 2000);
  };

  const updateQty = (nom, delta) => {
    setCart(prev => prev.map(c => {
      if (c.nom !== nom) return c;
      const newQty = c.qty + delta;
      return { ...c, qty: Math.max(1, Math.min(newQty, c.stock)) };
    }));
  };

  const removeFromCart = (nom) => setCart(prev => prev.filter(c => c.nom !== nom));
  const clearCart = () => setCart([]);
  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0);
  const cartTotal = cart.reduce((sum, c) => {
    const produit = PRODUITS.find(p => p.nom === c.nom);
    const prix = produit && enPromo(produit) ? prixPromo(produit) : c.prix;
    return sum + prix * c.qty;
  }, 0);
  const cp = platforms.find(p => p.id === platform);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async (text) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput("");
    const next = [...messages, { role: "user", content: msg }];
    setMessages(next);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: next.map(m => ({ role: m.role, content: m.content })),
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
    if (cart.length === 0) return;
    const lignes = cart.map(item => {
      const produit = PRODUITS.find(p => p.nom === item.nom);
      const prixUnit = produit && enPromo(produit) ? prixPromo(produit) : item.prix;
      const total = (prixUnit * item.qty).toLocaleString('fr-FR');
      const promoTag = produit && enPromo(produit) ? ` (Promo Tabaski -${Math.round(PROMO_TAUX*100)}%25)` : "";
      return `• ${item.qty}× ${item.nom} — ${total} FCFA${promoTag}`;
    }).join('%0A');
    const msg = `Bonjour Parfumerie De La Zac ! 🖤%0AJe souhaite commander :%0A%0A👤 Nom : ${order.name}%0A📱 Tel : ${order.phone}%0A📍 Quartier : ${order.quartier}%0A%0A🌹 Mes articles :%0A${lignes}%0A%0A💰 Total : ${cartTotal.toLocaleString('fr-FR')} FCFA%0A%0AMerci ✨`;
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank");
  };

  const gold = "#C9A84C";
  const pColor = cp.color;
  const filtered = catFilter === "Tous" ? PRODUITS : PRODUITS.filter(p => p.cat === catFilter);
  const canOrder = order.name && order.phone && order.quartier && cart.length > 0;

  const Logo = ({ size = 32 }) => (
    <div style={{ width: size, height: size, borderRadius: "50%", overflow: "hidden", border: `1.5px solid ${gold}55`, flexShrink: 0, background: "#1a1408", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <img src="/logo.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.style.display = "none"; e.target.parentElement.innerHTML = "🖤"; e.target.parentElement.style.fontSize = size/2+"px"; }} />
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "'SF Pro Display', -apple-system, sans-serif" }}>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes dot{0%,80%,100%{transform:scale(0.6);opacity:0.3}40%{transform:scale(1);opacity:1}}
        @keyframes glow{0%,100%{box-shadow:0 0 15px #C9A84C33}50%{box-shadow:0 0 30px #C9A84C66}}
        .msg{animation:fadeUp 0.3s ease forwards}
        .tbtn{transition:all 0.2s;cursor:pointer;border:none}
        .tbtn:hover{transform:translateY(-2px);opacity:0.9}
        .pcard{transition:all 0.25s;cursor:pointer}
        .pcard:hover{transform:translateY(-3px);box-shadow:0 10px 30px rgba(0,0,0,0.6)!important;border-color:rgba(201,168,76,0.5)!important}
        input:focus{outline:none}
        ::-webkit-scrollbar{width:0}
      `}</style>

      {/* HEADER */}
      <div style={{ width: "100%", maxWidth: "480px", background: "#0a0a0a", padding: "12px 20px 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0 12px", borderBottom: `1px solid ${gold}22` }}>
          <div onClick={() => setActivePage("chat")} title="Retour au chat avec Matel" style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "50%", overflow: "hidden", border: `2px solid ${gold}`, boxShadow: `0 0 16px ${gold}44`, animation: "glow 3s ease-in-out infinite", flexShrink: 0 }}>
              <img src="/logo.jpg" alt="PDZ" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.style.display="none"; e.target.parentElement.innerHTML="🖤"; e.target.parentElement.style.display="flex"; e.target.parentElement.style.alignItems="center"; e.target.parentElement.style.justifyContent="center"; e.target.parentElement.style.fontSize="20px"; }} />
            </div>
            <div>
              <div style={{ color: gold, fontWeight: "800", fontSize: "17px" }}>Parfumerie de la Zac</div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "2px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade80" }} />
                <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px" }}>Matel en ligne • Parfums de Paris</span>
              </div>
            </div>
          </div>
          <div style={{ background: `${gold}15`, border: `1px solid ${gold}33`, borderRadius: "20px", padding: "5px 12px", color: gold, fontSize: "13px", fontWeight: "600" }}>LIVE</div>
        </div>
        <div style={{ display: "flex", gap: "4px", padding: "10px 0 0", overflowX: "auto" }}>
          {PAGES.map(p => (
            <button key={p.id} className="tbtn" onClick={() => setActivePage(p.id)} style={{ flex: "0 0 auto", padding: "7px 10px", borderRadius: "10px", background: activePage===p.id ? `${gold}22` : "rgba(255,255,255,0.04)", color: activePage===p.id ? gold : "rgba(255,255,255,0.35)", border: `1px solid ${activePage===p.id ? gold+"55" : "rgba(255,255,255,0.08)"}`, fontSize: "13px", fontWeight: "600", whiteSpace: "nowrap", position: "relative" }}>
              {p.label}
              {p.id === "order" && cartCount > 0 && (
                <span style={{ position: "absolute", top: "-6px", right: "-6px", background: "#c0392b", color: "#fff", borderRadius: "50%", minWidth: "20px", height: "20px", padding: "0 5px", fontSize: "11px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 6px rgba(192,57,43,0.5)" }}>{cartCount}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* CHAT */}
      {activePage === "chat" && (
        <>
          <div style={{ width: "100%", maxWidth: "480px", flex: 1, padding: "16px 20px", display: "flex", flexDirection: "column", gap: "14px", overflowY: "auto", minHeight: "350px", maxHeight: "45vh" }}>
            {messages.map((msg, i) => (
              <div key={i} className="msg" style={{ display: "flex", justifyContent: msg.role==="user" ? "flex-end" : "flex-start", alignItems: "flex-end", gap: "8px" }}>
                {msg.role === "assistant" && <Logo />}
                <div style={{ maxWidth: "72%", padding: "11px 15px", borderRadius: msg.role==="user" ? "20px 20px 4px 20px" : "20px 20px 20px 4px", background: msg.role==="user" ? `linear-gradient(135deg, ${pColor}, ${pColor}bb)` : "rgba(255,255,255,0.07)", color: msg.role==="user" ? "#fff" : "rgba(255,255,255,0.9)", fontSize: "15.5px", lineHeight: "1.6", border: msg.role==="assistant" ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
                <Logo />
                <div style={{ padding: "12px 16px", borderRadius: "20px 20px 20px 4px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: "4px", alignItems: "center" }}>
                  {[0,1,2].map(j => <div key={j} style={{ width: "7px", height: "7px", borderRadius: "50%", background: gold, animation: `dot 1.2s ease-in-out ${j*0.15}s infinite` }} />)}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
          <div style={{ width: "100%", maxWidth: "480px", padding: "0 20px 10px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {["Voir le catalogue 📦", "Meilleure vente ⭐", "Offrir un cadeau 🎁", "Commander 🛍️"].map((q, i) => (
              <button key={i} className="tbtn" onClick={() => q.includes("catalogue") ? setActivePage("catalogue") : send(q)} style={{ padding: "7px 12px", borderRadius: "20px", border: `1px solid ${gold}30`, background: "rgba(201,168,76,0.08)", color: "rgba(255,255,255,0.7)", fontSize: "13px" }}>{q}</button>
            ))}
          </div>
          <div style={{ width: "100%", maxWidth: "480px", padding: "10px 20px 20px", background: "rgba(255,255,255,0.03)", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: "10px", alignItems: "center" }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center", background: "rgba(255,255,255,0.07)", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.1)", padding: "0 16px", gap: "8px" }}>
              <span>✍️</span>
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==="Enter" && send()} placeholder="Votre message à Matel..." style={{ flex: 1, padding: "12px 0", background: "transparent", border: "none", color: "#fff", fontSize: "16px", fontFamily: "inherit" }} />
            </div>
            <button className="tbtn" onClick={() => send()} disabled={loading} style={{ width: "48px", height: "48px", borderRadius: "50%", background: `linear-gradient(135deg, ${gold}, #a07830)`, color: "#0a0a0a", fontSize: "20px", fontWeight: "bold", flexShrink: 0, opacity: loading ? 0.5 : 1, boxShadow: `0 4px 20px ${gold}55` }}>➤</button>
          </div>
        </>
      )}

      {/* CATALOGUE */}
      {activePage === "catalogue" && (
        <div style={{ width: "100%", maxWidth: "480px", flex: 1, padding: "16px 16px 30px", overflowY: "auto" }}>
          <div style={{ display: "flex", gap: "6px", marginBottom: "16px", overflowX: "auto", paddingBottom: "4px" }}>
            {CATS.map(cat => (
              <button key={cat} className="tbtn" onClick={() => setCatFilter(cat)} style={{ flexShrink: 0, padding: "5px 10px", borderRadius: "20px", background: catFilter===cat ? gold : "rgba(255,255,255,0.05)", color: catFilter===cat ? "#0a0a0a" : "rgba(255,255,255,0.5)", border: `1px solid ${catFilter===cat ? gold : "rgba(255,255,255,0.1)"}`, fontSize: "11px", fontWeight: "600" }}>
                {cat==="Tous" ? "🛍️ Tous" : `${CAT_ICONS[cat]} ${cat}`}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {filtered.map((p, i) => (
              <div key={i} className="pcard" style={{ background: "#161616", border: `1px solid ${gold}18`, borderRadius: "16px", overflow: "hidden" }}>
                <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                  <img src={p.img} alt={p.nom} style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", background: "#0d0d0d" }}
                    onError={e => { e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }} />
                  <div style={{ display: "none", width: "100%", height: "100%", background: "linear-gradient(135deg, #1a1408, #111)", alignItems: "center", justifyContent: "center", fontSize: "48px" }}>🌹</div>
                  <div style={{ position: "absolute", top: "10px", right: "10px", background: p.stock<=1 ? "rgba(192,57,43,0.9)" : p.stock<=3 ? "rgba(230,126,34,0.9)" : "rgba(39,174,96,0.9)", color: "#fff", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "700" }}>
                    {p.stock<=1 ? "⚠️ Dernier !" : p.stock<=3 ? `⚡ ${p.stock} restants` : `✅ ${p.stock} en stock`}
                  </div>
                </div>
                <div style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                    <div style={{ flex: 1, marginRight: "10px" }}>
                      <div style={{ color: "#fff", fontWeight: "700", fontSize: "16px", lineHeight: "1.3" }}>{p.nom}</div>
                      {enPromo(p) && (
                        <div style={{ display: "inline-block", marginTop: "6px", background: "linear-gradient(135deg, #c0392b, #8e2419)", color: "#fff", padding: "3px 10px", borderRadius: "12px", fontSize: "10px", fontWeight: "700", letterSpacing: "0.5px" }}>
                          🐏 {PROMO_LABEL}
                        </div>
                      )}
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      {enPromo(p) && (
                        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", textDecoration: "line-through", marginBottom: "2px" }}>{p.prix.toLocaleString('fr-FR')}</div>
                      )}
                      <div style={{ color: gold, fontWeight: "800", fontSize: "18px" }}>{(enPromo(p) ? prixPromo(p) : p.prix).toLocaleString('fr-FR')}</div>
                      <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px" }}>FCFA</div>
                    </div>
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", lineHeight: "1.5", marginBottom: "12px" }}>{p.desc}</div>
                  <button className="tbtn" onClick={() => addToCart(p)} style={{ width: "100%", padding: "10px", borderRadius: "12px", background: `linear-gradient(135deg, ${gold}, #a07830)`, color: "#0a0a0a", fontSize: "14px", fontWeight: "700", boxShadow: `0 3px 10px ${gold}44` }}>
                    🛒 Ajouter au panier
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ORDER */}
      {activePage === "order" && (
        <div style={{ width: "100%", maxWidth: "480px", padding: "20px", flex: 1 }}>
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "20px", border: `1px solid ${gold}22`, padding: "24px" }}>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>🛒</div>
              <div style={{ color: gold, fontSize: "20px", fontWeight: "800" }}>Mon panier</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", marginTop: "4px" }}>{cartCount === 0 ? "Votre panier est vide" : `${cartCount} article${cartCount > 1 ? "s" : ""} • Prêt à commander`}</div>
            </div>

            {cart.length === 0 ? (
              <div style={{ textAlign: "center", padding: "30px 0" }}>
                <div style={{ fontSize: "48px", marginBottom: "12px", opacity: 0.5 }}>🌹</div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", marginBottom: "20px" }}>Aucun parfum sélectionné pour le moment.</div>
                <button className="tbtn" onClick={() => setActivePage("catalogue")} style={{ padding: "12px 24px", borderRadius: "14px", background: `linear-gradient(135deg, ${gold}, #a07830)`, color: "#0a0a0a", fontSize: "15px", fontWeight: "700", border: "none" }}>📦 Voir le catalogue</button>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  {cart.map(item => {
                    const produit = PRODUITS.find(p => p.nom === item.nom);
                    const prixUnit = produit && enPromo(produit) ? prixPromo(produit) : item.prix;
                    return (
                      <div key={item.nom} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${gold}15`, borderRadius: "12px", padding: "12px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                          <div style={{ flex: 1, marginRight: "10px" }}>
                            <div style={{ color: "#fff", fontWeight: "700", fontSize: "13px", lineHeight: "1.3" }}>{item.nom}</div>
                            {produit && enPromo(produit) && <div style={{ color: "#e74c3c", fontSize: "10px", fontWeight: "700", marginTop: "3px" }}>🐏 Promo Tabaski -15%</div>}
                          </div>
                          <button onClick={() => removeFromCart(item.nom)} style={{ background: "rgba(192,57,43,0.15)", border: "1px solid rgba(192,57,43,0.3)", color: "#e74c3c", borderRadius: "8px", padding: "4px 8px", fontSize: "12px", cursor: "pointer" }}>🗑️</button>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.06)", borderRadius: "10px", padding: "4px" }}>
                            <button onClick={() => updateQty(item.nom, -1)} disabled={item.qty <= 1} style={{ width: "28px", height: "28px", borderRadius: "8px", border: "none", background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: "16px", cursor: item.qty <= 1 ? "not-allowed" : "pointer", opacity: item.qty <= 1 ? 0.4 : 1 }}>−</button>
                            <div style={{ minWidth: "24px", textAlign: "center", color: "#fff", fontSize: "14px", fontWeight: "700" }}>{item.qty}</div>
                            <button onClick={() => updateQty(item.nom, 1)} disabled={item.qty >= item.stock} style={{ width: "28px", height: "28px", borderRadius: "8px", border: "none", background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: "16px", cursor: item.qty >= item.stock ? "not-allowed" : "pointer", opacity: item.qty >= item.stock ? 0.4 : 1 }}>+</button>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <div style={{ color: gold, fontWeight: "800", fontSize: "15px" }}>{(prixUnit * item.qty).toLocaleString('fr-FR')} <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)" }}>FCFA</span></div>
                            {item.qty > 1 && <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "10px" }}>{prixUnit.toLocaleString('fr-FR')} × {item.qty}</div>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ background: `${gold}15`, border: `1px solid ${gold}44`, borderRadius: "12px", padding: "14px 16px", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ color: gold, fontSize: "14px", fontWeight: "700" }}>💰 Total</div>
                  <div style={{ color: gold, fontSize: "20px", fontWeight: "800" }}>{cartTotal.toLocaleString('fr-FR')} <span style={{ fontSize: "12px" }}>FCFA</span></div>
                </div>

                <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", margin: "20px 0" }} />

                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", marginBottom: "14px", fontWeight: "600" }}>Vos coordonnées de livraison</div>

                {[
                  { key: "name", label: "👤 Votre nom complet", ph: "Ex: Amadou Diallo" },
                  { key: "phone", label: "📱 Votre numéro WhatsApp", ph: "Ex: +221 77 XXX XX XX" },
                  { key: "quartier", label: "📍 Votre quartier", ph: "Ex: Pikine, Parcelles, Médina..." },
                ].map(f => (
                  <div key={f.key} style={{ marginBottom: "14px" }}>
                    <label style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", display: "block", marginBottom: "6px" }}>{f.label}</label>
                    <input value={order[f.key]} onChange={e => setOrder({...order,[f.key]:e.target.value})} placeholder={f.ph} style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: `1px solid ${gold}25`, background: "rgba(255,255,255,0.06)", color: "#fff", fontSize: "14px", fontFamily: "inherit", boxSizing: "border-box" }} />
                  </div>
                ))}

                <button className="tbtn" onClick={sendOrder} disabled={!canOrder} style={{ width: "100%", padding: "16px", borderRadius: "16px", background: canOrder ? "linear-gradient(135deg, #25D366, #1a9e4a)" : "rgba(255,255,255,0.1)", color: canOrder ? "#fff" : "rgba(255,255,255,0.3)", fontSize: "16px", fontWeight: "700", boxShadow: canOrder ? "0 4px 20px #25D36644" : "none", border: "none", cursor: canOrder ? "pointer" : "not-allowed" }}>
                  💬 Finaliser sur WhatsApp
                </button>
                <button className="tbtn" onClick={() => setActivePage("catalogue")} style={{ width: "100%", padding: "12px", borderRadius: "16px", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)", fontSize: "14px", marginTop: "10px", border: "1px solid rgba(255,255,255,0.08)" }}>
                  ← Continuer mes achats
                </button>
                <div style={{ textAlign: "center", marginTop: "12px", color: `${gold}66`, fontSize: "12px" }}>Livraison Dakar + Banlieue • Réponse sous 2h</div>
              </>
            )}
          </div>
        </div>
      )}

      {/* INFO */}
      {activePage === "info" && (
        <div style={{ width: "100%", maxWidth: "480px", padding: "20px", flex: 1 }}>
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "20px", border: `1px solid ${gold}22`, padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ textAlign: "center", marginBottom: "8px" }}>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>🏪</div>
              <div style={{ color: gold, fontSize: "20px", fontWeight: "800" }}>Parfumerie De La Zac</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>Parfums authentiques de Paris</div>
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
                  <div style={{ color: `${gold}99`, fontSize: "13px", marginBottom: "2px" }}>{info.label}</div>
                  <div style={{ color: "#fff", fontSize: "15px", fontWeight: "600" }}>{info.value}</div>
                </div>
              </div>
            ))}
            <div style={{ display: "flex", gap: "10px" }}>
              <button className="tbtn" onClick={() => window.open(`https://wa.me/${WHATSAPP}`,"_blank")} style={{ width: "100%", padding: "14px 8px", borderRadius: "16px", background: "linear-gradient(135deg, #25D366, #1a9e4a)", color: "#fff", fontSize: "13px", fontWeight: "700", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", boxShadow: "0 4px 20px #25D36644" }}>
                <span style={{ fontSize: "20px" }}>💬</span><span>WhatsApp</span>
              </button>
            </div>
            <button className="tbtn" onClick={() => setActivePage("order")} style={{ width: "100%", padding: "14px", borderRadius: "16px", background: `linear-gradient(135deg, ${gold}, #a07830)`, color: "#0a0a0a", fontSize: "16px", fontWeight: "700", boxShadow: `0 4px 20px ${gold}44` }}>
              🛍️ Passer une commande
            </button>
          </div>
        </div>
      )}

      <div style={{ width: "100%", maxWidth: "480px", textAlign: "center", padding: "10px", color: "rgba(255,255,255,0.15)", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        Parfumerie de la Zac • Tous droits réservés 2024
      </div>

      {/* TOAST de confirmation ajout au panier */}
      {toast && (
        <div style={{ position: "fixed", bottom: "100px", left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg, #1a9e4a, #25D366)", color: "#fff", padding: "12px 20px", borderRadius: "30px", fontSize: "14px", fontWeight: "600", boxShadow: "0 8px 24px rgba(37,211,102,0.4)", zIndex: 1100, animation: "fadeUp 0.3s ease forwards", maxWidth: "90%", textAlign: "center" }}>
          {toast}
        </div>
      )}

      {/* FLOATING CHAT BUTTON — visible sur les pages autres que Chat */}
      {activePage !== "chat" && !chatOverlay && (
        <button onClick={() => setChatOverlay(true)} title="Discuter avec Matel" style={{ position: "fixed", bottom: "24px", right: "24px", width: "60px", height: "60px", borderRadius: "50%", background: `linear-gradient(135deg, ${gold}, #a07830)`, border: "none", cursor: "pointer", boxShadow: `0 8px 24px ${gold}66, 0 0 0 4px rgba(201,168,76,0.15)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", zIndex: 999, animation: "glow 2.5s ease-in-out infinite" }}>
          💬
        </button>
      )}

      {/* CHAT OVERLAY — fenêtre flottante de discussion avec Matel */}
      {chatOverlay && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 1000, display: "flex", alignItems: "flex-end", justifyContent: "center", animation: "fadeUp 0.25s ease forwards" }}>
          <div style={{ width: "100%", maxWidth: "480px", height: "85vh", background: "#0a0a0a", borderRadius: "20px 20px 0 0", border: `1px solid ${gold}33`, display: "flex", flexDirection: "column", boxShadow: `0 -10px 40px ${gold}33` }}>
            {/* Header overlay */}
            <div style={{ padding: "14px 18px", borderBottom: `1px solid ${gold}22`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Logo size={36} />
                <div>
                  <div style={{ color: gold, fontWeight: "800", fontSize: "15px" }}>Matel</div>
                  <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "11px" }}>Conseillère en parfums</div>
                </div>
              </div>
              <button onClick={() => setChatOverlay(false)} style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.08)", border: "none", color: "#fff", fontSize: "18px", cursor: "pointer" }}>✕</button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, padding: "16px 18px", display: "flex", flexDirection: "column", gap: "12px", overflowY: "auto" }}>
              {messages.map((msg, i) => (
                <div key={i} className="msg" style={{ display: "flex", justifyContent: msg.role==="user" ? "flex-end" : "flex-start", alignItems: "flex-end", gap: "8px" }}>
                  {msg.role === "assistant" && <Logo size={28} />}
                  <div style={{ maxWidth: "75%", padding: "11px 14px", borderRadius: msg.role==="user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", background: msg.role==="user" ? `linear-gradient(135deg, ${pColor}, ${pColor}bb)` : "rgba(255,255,255,0.07)", color: msg.role==="user" ? "#fff" : "rgba(255,255,255,0.9)", fontSize: "14px", lineHeight: "1.5", border: msg.role==="assistant" ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
                  <Logo size={28} />
                  <div style={{ padding: "10px 14px", borderRadius: "18px 18px 18px 4px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: "4px", alignItems: "center" }}>
                    {[0,1,2].map(j => <div key={j} style={{ width: "6px", height: "6px", borderRadius: "50%", background: gold, animation: `dot 1.2s ease-in-out ${j*0.15}s infinite` }} />)}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div style={{ padding: "10px 18px 16px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: "10px", alignItems: "center" }}>
              <div style={{ flex: 1, display: "flex", alignItems: "center", background: "rgba(255,255,255,0.07)", borderRadius: "22px", border: "1px solid rgba(255,255,255,0.1)", padding: "0 14px", gap: "6px" }}>
                <span>✍️</span>
                <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==="Enter" && send()} placeholder="Votre message à Matel..." style={{ flex: 1, padding: "11px 0", background: "transparent", border: "none", color: "#fff", fontSize: "14px", fontFamily: "inherit" }} />
              </div>
              <button className="tbtn" onClick={() => send()} disabled={loading} style={{ width: "44px", height: "44px", borderRadius: "50%", background: `linear-gradient(135deg, ${gold}, #a07830)`, color: "#0a0a0a", fontSize: "18px", fontWeight: "bold", flexShrink: 0, opacity: loading ? 0.5 : 1, boxShadow: `0 4px 14px ${gold}55`, border: "none" }}>➤</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


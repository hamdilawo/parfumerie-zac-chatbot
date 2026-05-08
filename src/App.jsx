import { useState, useRef, useEffect } from "react";

const WHATSAPP = "221769724307";
const WHATSAPP_DISPLAY = "+221 76 972 43 07";
const INSTAGRAM = "https://www.instagram.com/parfumerie_de_la_zac";
const FACEBOOK = "https://www.facebook.com/profile.php?id=61576231477609";

const PRODUITS = [
  { nom: "Collection Prestige", prix: 25000, cat: "Collection", volume: 50, desc: "Fragrance raffinée aux notes chaudes et boisées. Élégante et inoubliable.",
    senteurs: [
      { nom: "Havana", img: "/photos/prestige_havana.jpg", stock: 1 },
      { nom: "Rose Oud", img: "/photos/prestige_rose_oud.jpg", stock: 1 },
      { nom: "Santal", img: "/photos/prestige_santal.jpg", stock: 1 },
      { nom: "Noir Absolu", img: "/photos/prestige_noir_absolu.jpg", stock: 1 },
    ] },
  { nom: "Collection Igor", prix: 25000, cat: "Collection", volume: 50, desc: "Création exclusive by Igor. Notes envoûtantes et mystérieuses.",
    senteurs: [
      { nom: "Blue Magic", img: "/photos/igor_blue_magic.jpg", stock: 1 },
    ] },
  { nom: "Collection La Folie du Délice", prix: 25000, cat: "Collection", volume: 50, desc: "Fragrances fruitées et gourmandes, authentiques de Paris.",
    senteurs: [
      { nom: "Sweet Mango", img: "/photos/folie_sweet_mango.jpg", stock: 1 },
      { nom: "Dragibus", img: "/photos/folie_dragibus.jpg", stock: 1 },
    ] },
  { nom: "Collection Kenzi", prix: 20000, cat: "Collection", volume: 50, desc: "Élégance et caractère pour un parfum qui vous ressemble.",
    senteurs: [
      { nom: "Black Seduction", img: "/photos/kenzi_black_seduction.jpg", stock: 1 },
      { nom: "Legende", img: "/photos/kenzi_legende.jpg", stock: 1 },
      { nom: "Addiction", img: "/photos/kenzi_addiction.jpg", stock: 1 },
      { nom: "Elixir", img: "/photos/kenzi_elixir.jpg", stock: 1 },
      { nom: "Santal Imperial", img: "/photos/kenzi_santal_imperial.jpg", stock: 1 },
    ] },
  { nom: "Collection Convivium", prix: 17500, cat: "Collection", volume: 50, desc: "Convivium Paris. Notes fraîches et marines.",
    senteurs: [
      { nom: "Sillage Frais", img: "/photos/convivium_sillage_frais.jpg", stock: 1 },
      { nom: "Gris Intense", img: "/photos/convivium_gris_intense.jpg", stock: 1 },
    ] },
  { nom: "Collection Privée", prix: 15000, cat: "Collection", volume: 50, desc: "Six fragrances exclusives : Musc Blanc, Oud Vanille, Gris, Bakara, Arabie, Diament Bleu.",
    senteurs: [
      { nom: "Bakara", img: "/photos/privee_bakara.png", stock: 2 },
      { nom: "Arabie", img: "/photos/privee_arabie.jpeg", stock: 2 },
      { nom: "Gris", img: "/photos/privee_gris.jpg", stock: 2 },
      { nom: "Oud Vanille", img: "/photos/privee_oud_vanille.jpeg", stock: 2 },
      { nom: "Musc Blanc", img: "/photos/privee_musc_blanc.jpeg", stock: 2 },
      { nom: "Diament Bleu", img: "/photos/privee_diament_bleu.jpg", stock: 1 },
    ] },
  { nom: "Coffret Collection Précieuse", prix: 65000, stock: 1, cat: "Coffret", img: "/photos/coffret_collection_precieuse.jpg", desc: "Coffret 4 parfums luxueux. Le cadeau parfait pour une occasion inoubliable !" },
  { nom: "Coffret Gris Montaigne", prix: 50000, stock: 1, cat: "Coffret", img: "/photos/coffret_gris_montaigne.jpg", desc: "Coffret Gris Montaigne Paris" },
  { nom: "Phantom Paco Rabanne", prix: 75000, stock: 1, cat: "Classique", img: "/photos/phantom_paco_rabanne.jpg", desc: "Le légendaire Phantom en flacon robot iconique. Notes boisées et magnétiques." },
  { nom: "Invictus Victory Paco Rabanne", prix: 65000, stock: 1, cat: "Classique", img: "/photos/invictus_victory.jpg", desc: "La victoire dans un flacon trophée noir. Puissant, frais et inoubliable." },
  { nom: "Red Tobacco Mancera Paris", prix: 75000, stock: 1, cat: "Classique", volume: 125, img: "/photos/red_tobacco.jpg", desc: "Mancera Paris Red Tobacco. Notes de tabac rouge et épices. Sensuel." },
  { nom: "Atelier des Essences (Eclat d'Iris)", prix: 45000, stock: 1, cat: "Classique", img: "/photos/atelier_des_essences.jpg", desc: "Atelier des Essences Paris, Eclat d'Iris. Notes florales raffinées." },
  { nom: "Sugar Oud Gulf Flowers", prix: 35000, stock: 1, cat: "Classique", img: "/photos/sugar_oud.jpg", desc: "Les Fleurs du Golfe Sugar Oud. Notes de oud et fleurs sucrées. Oriental." },
  { nom: "Gris Montaigne Black Empire", prix: 35000, stock: 1, cat: "Classique", img: "/photos/black_empire.jpg", desc: "Black Empire de Gris Montaigne Paris. Notes boisées profondes et sophistiquées." },
  { nom: "Mauboussin Privée Club", prix: 40000, stock: 1, cat: "Classique", img: "/mauboussin_private_club.jpg", desc: "Private Club de Mauboussin. Flacon bleu nuit aux notes fruitées et florales." },
  { nom: "Callisto Holliday Paris", prix: 60000, stock: 1, cat: "Classique", img: "/photos/callisto_holliday.jpg", desc: "Callisto Paris. Notes ambrées chaudes et boisées dans un flacon élégant." },
  { nom: "Musc Tahara", prix: 10000, cat: "Accessoire", volume: 12, desc: "Musc pur et authentique. Doux, enveloppant, longue tenue.",
    senteurs: [
      { nom: "Tahara", img: "/photos/tahara_tahara.jpg", stock: 3 },
      { nom: "Oud Cachemire", img: "/photos/tahara_oud_cachemire.webp", stock: 2 },
      { nom: "Barbe à Papa", img: "/photos/tahara_barbe_a_papa.jpeg", stock: 2 },
      { nom: "Rouge", img: "/photos/tahara_rouge_absolue.jpeg", stock: 1 },
    ] },
  { nom: "Déodorant BA Intense CP", prix: 4000, stock: 3, cat: "Accessoire", img: "/photos/deodorant_cp_ba_intense.jpg", desc: "Collection Privée by Birraci — BA Intense Body Spray. Protection longue durée." },
];

const isMultiSenteur = (p) => Array.isArray(p.senteurs) && p.senteurs.length > 1;
const stockTotal = (p) => Array.isArray(p.senteurs) ? p.senteurs.reduce((sum, s) => sum + s.stock, 0) : (p.stock || 0);

const PROMO_ACTIVE = true;
const PROMO_TAUX = 0.25;
const PROMO_LABEL = "PROMO TABASKI -25%";
const PROMO_EXCLUS = ["Déodorant BA Intense CP"];
const enPromo = (p) => PROMO_ACTIVE && !PROMO_EXCLUS.includes(p.nom);
const prixPromo = (p) => Math.round(p.prix * (1 - PROMO_TAUX));

const CATALOGUE_TEXT = PRODUITS.map(p => {
  const stockTotalProd = Array.isArray(p.senteurs) ? p.senteurs.reduce((s, x) => s + x.stock, 0) : (p.stock || 0);
  const volumeTag = p.volume ? ` ${p.volume}ml` : "";
  const senteursTag = Array.isArray(p.senteurs)
    ? ` — Senteurs: ${p.senteurs.map(s => `${s.nom} (stock: ${s.stock})`).join(", ")}`
    : "";
  const promoTag = enPromo(p) ? ` 🐏 PROMO TABASKI -25% → ${prixPromo(p).toLocaleString('fr-FR')} FCFA` : "";
  return `- ${p.nom}${volumeTag} : ${p.prix.toLocaleString('fr-FR')} FCFA (stock total: ${stockTotalProd})${senteursTag}${promoTag}`;
}).join('\n');

const SYSTEM_PROMPT = `Tu es Matel, la conseillère officielle de la Parfumerie de la Zac, boutique de luxe spécialisée en parfums authentiques de Paris. Tu es élégante, chaleureuse et professionnelle. Tu utilises des emojis sobres (✨🖤🌹).

🐏 PROMOTION TABASKI EN COURS : -25% sur TOUS les produits sauf le Déodorant BA Intense CP. Mets en avant cette promo dans tes recommandations !

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
  { id: "info", label: "📍 Localisation" },
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
  const [senteurIdx, setSenteurIdx] = useState({});
  const endRef = useRef(null);

  useEffect(() => {
    try { localStorage.setItem("pdz_cart", JSON.stringify(cart)); } catch {}
  }, [cart]);

  const addToCart = (produit, senteurChoisie = null) => {
    const senteur = senteurChoisie || (Array.isArray(produit.senteurs) ? produit.senteurs[0] : null);
    const cleUnique = senteur ? `${produit.nom}__${senteur.nom}` : produit.nom;
    const stockDispo = senteur ? senteur.stock : (produit.stock || 0);
    const labelToast = senteur ? `${produit.nom} - ${senteur.nom}` : produit.nom;

    if (stockDispo === 0) {
      setToast(`⚠️ Rupture de stock pour ${labelToast}`);
      setTimeout(() => setToast(""), 2200);
      return;
    }

    setCart(prev => {
      const existing = prev.find(c => c.cle === cleUnique);
      if (existing) {
        return prev.map(c => c.cle === cleUnique ? { ...c, qty: Math.min(c.qty + 1, stockDispo) } : c);
      }
      return [...prev, {
        cle: cleUnique,
        nom: produit.nom,
        senteur: senteur ? senteur.nom : null,
        prix: produit.prix,
        volume: produit.volume || null,
        qty: 1,
        stock: stockDispo,
        img: senteur ? senteur.img : (produit.img || null),
      }];
    });
    setToast(`✓ ${labelToast} ajouté au panier`);
    setTimeout(() => setToast(""), 2000);
  };

  const updateQty = (cle, delta) => {
    setCart(prev => prev.map(c => {
      if (c.cle !== cle) return c;
      const newQty = c.qty + delta;
      return { ...c, qty: Math.max(1, Math.min(newQty, c.stock)) };
    }));
  };

  const removeFromCart = (cle) => setCart(prev => prev.filter(c => c.cle !== cle));
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
        headers: { "Content-Type": "application/json" },
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
      const labelArticle = item.senteur ? `${item.nom} - ${item.senteur}` : item.nom;
      const volumeTag = item.volume ? ` ${item.volume}ml` : "";
      return `• ${item.qty}× ${labelArticle}${volumeTag} — ${total} FCFA${promoTag}`;
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {filtered.map((p, i) => {
              const senteurs = Array.isArray(p.senteurs) ? p.senteurs : null;
              const idx = senteurIdx[p.nom] || 0;
              const senteurActive = senteurs ? senteurs[idx] : null;
              const imgAffichee = senteurActive ? senteurActive.img : p.img;
              const stockAffiche = senteurActive ? senteurActive.stock : (p.stock || 0);
              const goPrev = (e) => { e.stopPropagation(); setSenteurIdx(prev => ({ ...prev, [p.nom]: idx === 0 ? senteurs.length - 1 : idx - 1 })); };
              const goNext = (e) => { e.stopPropagation(); setSenteurIdx(prev => ({ ...prev, [p.nom]: (idx + 1) % senteurs.length })); };

              return (
                <div key={i} className="pcard" style={{ background: "#161616", border: `1px solid ${gold}18`, borderRadius: "16px", overflow: "hidden", display: "flex", flexDirection: "column" }}>

                  {/* IMAGE / CARROUSEL */}
                  <div style={{ position: "relative", height: "160px", overflow: "hidden", background: "#0d0d0d" }}>
                    <img
                      src={imgAffichee}
                      alt={p.nom}
                      style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", transition: "opacity 0.25s" }}
                      onError={e => { e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }}
                    />
                    <div style={{ display: "none", width: "100%", height: "100%", background: "linear-gradient(135deg, #1a1408, #111)", alignItems: "center", justifyContent: "center", fontSize: "48px", flexDirection: "column", gap: "8px" }}>
                      <span>🌹</span>
                      {senteurActive && <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", letterSpacing: "1px" }}>{senteurActive.nom}</span>}
                    </div>

                    {/* Flèches carrousel */}
                    {senteurs && senteurs.length > 1 && (
                      <>
                        <button onClick={goPrev} aria-label="Senteur précédente" style={{ position: "absolute", left: "8px", top: "50%", transform: "translateY(-50%)", width: "34px", height: "34px", borderRadius: "50%", background: "rgba(0,0,0,0.6)", border: `1px solid ${gold}55`, color: gold, fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
                        <button onClick={goNext} aria-label="Senteur suivante" style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", width: "34px", height: "34px", borderRadius: "50%", background: "rgba(0,0,0,0.6)", border: `1px solid ${gold}55`, color: gold, fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
                      </>
                    )}

                    {/* Badge stock */}
                    <div style={{ position: "absolute", top: "10px", right: "10px", background: stockAffiche<=1 ? (stockAffiche === 0 ? "rgba(80,80,80,0.9)" : "rgba(192,57,43,0.9)") : stockAffiche<=3 ? "rgba(230,126,34,0.9)" : "rgba(39,174,96,0.9)", color: "#fff", padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "700" }}>
                      {stockAffiche === 0 ? "❌ Rupture" : stockAffiche<=1 ? "⚠️ Dernier !" : stockAffiche<=3 ? `⚡ ${stockAffiche} restants` : `✅ ${stockAffiche} en stock`}
                    </div>
                  </div>
                  {/* FIN bloc image */}

                  {/* Indicateurs points — uniquement si plusieurs senteurs */}
                  {senteurs && senteurs.length > 1 && (
                    <div style={{ display: "flex", justifyContent: "center", gap: "5px", padding: "6px 0 4px", background: "#0d0d0d" }}>
                      {senteurs.map((_, j) => (
                        <button key={j} onClick={() => setSenteurIdx(prev => ({ ...prev, [p.nom]: j }))} style={{ width: idx === j ? "20px" : "6px", height: "6px", borderRadius: "3px", border: "none", background: idx === j ? gold : "rgba(255,255,255,0.2)", cursor: "pointer", transition: "all 0.25s", padding: 0 }} />
                      ))}
                    </div>
                  )}

                  {/* INFO PRODUIT */}
                  <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px", gap: "8px" }}>
                      <div style={{ flex: 1 }}>
                        {/* Nom du produit */}
                        <div style={{ color: "#fff", fontWeight: "700", fontSize: "12px", lineHeight: "1.3", overflow: "hidden", display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical" }}>{p.nom}</div>

                        {/* Senteur active + volume inline juste après */}
                        {senteurActive && (
                          <div style={{ color: gold, fontWeight: "600", fontSize: "12px", marginTop: "3px", letterSpacing: "0.3px" }}>
                            ✨ {senteurActive.nom}
                            {p.volume && (
                              <span style={{ color: "rgba(255,255,255,0.4)", fontWeight: "500", marginLeft: "5px" }}>
                                {p.volume}ml
                              </span>
                            )}
                          </div>
                        )}

                        {/* Volume seul si pas de senteur active */}
                        {!senteurActive && p.volume && (
                          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", marginTop: "2px" }}>
                            {p.volume}ml
                          </div>
                        )}

                        {/* Badge promo compact */}
                        {enPromo(p) && (
                          <div style={{ display: "inline-block", marginTop: "4px", background: "linear-gradient(135deg, #c0392b, #8e2419)", color: "#fff", padding: "2px 7px", borderRadius: "10px", fontSize: "9px", fontWeight: "700", letterSpacing: "0.3px" }}>
                            🐏 -25%
                          </div>
                        )}
                      </div>

                      {/* Prix */}
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        {enPromo(p) && (
                          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", textDecoration: "line-through", marginBottom: "2px" }}>{p.prix.toLocaleString('fr-FR')}</div>
                        )}
                        <div style={{ color: gold, fontWeight: "800", fontSize: "17px" }}>{(enPromo(p) ? prixPromo(p) : p.prix).toLocaleString('fr-FR')}</div>
                        <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px" }}>FCFA</div>
                      </div>
                    </div>

                    <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", lineHeight: "1.5", marginBottom: "12px", flex: 1 }}>{p.desc}</div>

                    <button className="tbtn" onClick={() => addToCart(p, senteurActive)} disabled={stockAffiche === 0} style={{ width: "100%", padding: "10px", borderRadius: "12px", background: stockAffiche === 0 ? "rgba(255,255,255,0.08)" : `linear-gradient(135deg, ${gold}, #a07830)`, color: stockAffiche === 0 ? "rgba(255,255,255,0.3)" : "#0a0a0a", fontSize: "13px", fontWeight: "700", boxShadow: stockAffiche === 0 ? "none" : `0 3px 10px ${gold}44`, border: "none", cursor: stockAffiche === 0 ? "not-allowed" : "pointer" }}>
                      {stockAffiche === 0 ? "❌ Rupture de stock" : "🛒 Ajouter au panier"}
                    </button>
                  </div>
                </div>
              );
            })}
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
                      <div key={item.cle} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${gold}15`, borderRadius: "12px", padding: "12px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px", gap: "10px" }}>
                          {item.img && (
                            <img src={item.img} alt="" style={{ width: "44px", height: "44px", borderRadius: "8px", objectFit: "cover", flexShrink: 0, background: "#0d0d0d" }} onError={e => { e.target.style.display="none"; }} />
                          )}
                          <div style={{ flex: 1 }}>
                            <div style={{ color: "#fff", fontWeight: "700", fontSize: "13px", lineHeight: "1.3" }}>{item.nom}</div>
                            {item.senteur && <div style={{ color: gold, fontSize: "11px", fontWeight: "600", marginTop: "2px" }}>✨ {item.senteur}{item.volume ? ` • ${item.volume}ml` : ""}</div>}
                            {produit && enPromo(produit) && <div style={{ color: "#e74c3c", fontSize: "10px", fontWeight: "700", marginTop: "3px" }}>🐏 Promo Tabaski -{Math.round(PROMO_TAUX*100)}%</div>}
                          </div>
                          <button onClick={() => removeFromCart(item.cle)} style={{ background: "rgba(192,57,43,0.15)", border: "1px solid rgba(192,57,43,0.3)", color: "#e74c3c", borderRadius: "8px", padding: "4px 8px", fontSize: "12px", cursor: "pointer" }}>🗑️</button>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.06)", borderRadius: "10px", padding: "4px" }}>
                            <button onClick={() => updateQty(item.cle, -1)} disabled={item.qty <= 1} style={{ width: "28px", height: "28px", borderRadius: "8px", border: "none", background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: "16px", cursor: item.qty <= 1 ? "not-allowed" : "pointer", opacity: item.qty <= 1 ? 0.4 : 1 }}>−</button>
                            <div style={{ minWidth: "24px", textAlign: "center", color: "#fff", fontSize: "14px", fontWeight: "700" }}>{item.qty}</div>
                            <button onClick={() => updateQty(item.cle, 1)} disabled={item.qty >= item.stock} style={{ width: "28px", height: "28px", borderRadius: "8px", border: "none", background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: "16px", cursor: item.qty >= item.stock ? "not-allowed" : "pointer", opacity: item.qty >= item.stock ? 0.4 : 1 }}>+</button>
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

      {/* TOAST */}
      {toast && (
        <div style={{ position: "fixed", bottom: "100px", left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg, #1a9e4a, #25D366)", color: "#fff", padding: "12px 20px", borderRadius: "30px", fontSize: "14px", fontWeight: "600", boxShadow: "0 8px 24px rgba(37,211,102,0.4)", zIndex: 1100, animation: "fadeUp 0.3s ease forwards", maxWidth: "90%", textAlign: "center" }}>
          {toast}
        </div>
      )}

      {/* FLOATING CHAT BUTTON */}
      {activePage !== "chat" && !chatOverlay && (
        <button onClick={() => setChatOverlay(true)} title="Discuter avec Matel" style={{ position: "fixed", bottom: "24px", right: "24px", width: "60px", height: "60px", borderRadius: "50%", background: `linear-gradient(135deg, ${gold}, #a07830)`, border: "none", cursor: "pointer", boxShadow: `0 8px 24px ${gold}66, 0 0 0 4px rgba(201,168,76,0.15)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", zIndex: 999, animation: "glow 2.5s ease-in-out infinite" }}>
          💬
        </button>
      )}

      {/* CHAT OVERLAY */}
      {chatOverlay && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 1000, display: "flex", alignItems: "flex-end", justifyContent: "center", animation: "fadeUp 0.25s ease forwards" }}>
          <div style={{ width: "100%", maxWidth: "480px", height: "85vh", background: "#0a0a0a", borderRadius: "20px 20px 0 0", border: `1px solid ${gold}33`, display: "flex", flexDirection: "column", boxShadow: `0 -10px 40px ${gold}33` }}>
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
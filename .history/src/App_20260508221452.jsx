import { useState, useRef, useEffect, useMemo, useCallback } from "react";

// ─── CONSTANTES ───────────────────────────────────────────────────────────────
const WHATSAPP         = "221769724307";
const WHATSAPP_DISPLAY = "+221 76 972 43 07";
const GOLD             = "#C9A84C";
const WA_GREEN         = "#25D366";
const BG               = "#0a0a0a";

const PRODUITS = [
  { nom: "Collection Prestige", prix: 25000, cat: "Collection", volume: 50, desc: "Fragrance raffinée aux notes chaudes et boisées. Élégante et inoubliable.",
    senteurs: [
      { nom: "Havana",      img: "/photos/prestige_havana.jpg",      stock: 1 },
      { nom: "Rose Oud",    img: "/photos/prestige_rose_oud.jpg",    stock: 1 },
      { nom: "Santal",      img: "/photos/prestige_santal.jpg",      stock: 1 },
      { nom: "Noir Absolu", img: "/photos/prestige_noir_absolu.jpg", stock: 1 },
    ] },
  { nom: "Collection Igor", prix: 25000, cat: "Collection", volume: 50, desc: "Création exclusive by Igor. Notes envoûtantes et mystérieuses.",
    senteurs: [{ nom: "Blue Magic", img: "/photos/igor_blue_magic.jpg", stock: 1 }] },
  { nom: "Collection La Folie du Délice", prix: 25000, cat: "Collection", volume: 50, desc: "Fragrances fruitées et gourmandes, authentiques de Paris.",
    senteurs: [
      { nom: "Sweet Mango", img: "/photos/folie_sweet_mango.jpg", stock: 1 },
      { nom: "Dragibus",    img: "/photos/folie_dragibus.jpg",    stock: 1 },
    ] },
  { nom: "Collection Kenzi", prix: 20000, cat: "Collection", volume: 50, desc: "Élégance et caractère pour un parfum qui vous ressemble.",
    senteurs: [
      { nom: "Black Seduction", img: "/photos/kenzi_black_seduction.jpg", stock: 1 },
      { nom: "Legende",         img: "/photos/kenzi_legende.jpg",         stock: 1 },
      { nom: "Addiction",       img: "/photos/kenzi_addiction.jpg",       stock: 1 },
      { nom: "Elixir",          img: "/photos/kenzi_elixir.jpg",          stock: 1 },
      { nom: "Santal Imperial", img: "/photos/kenzi_santal_imperial.jpg", stock: 1 },
    ] },
  { nom: "Collection Convivium", prix: 17500, cat: "Collection", volume: 50, desc: "Convivium Paris. Notes fraîches et marines.",
    senteurs: [
      { nom: "Sillage Frais", img: "/photos/convivium_sillage_frais.jpg", stock: 1 },
      { nom: "Gris Intense",  img: "/photos/convivium_gris_intense.jpg",  stock: 1 },
    ] },
  { nom: "Collection Privée", prix: 15000, cat: "Collection", volume: 50, desc: "Six fragrances exclusives : Musc Blanc, Oud Vanille, Gris, Bakara, Arabie, Diament Bleu.",
    senteurs: [
      { nom: "Bakara",       img: "/photos/privee_bakara.png",          stock: 2 },
      { nom: "Arabie",       img: "/photos/privee_arabie.jpeg",         stock: 2 },
      { nom: "Gris",         img: "/photos/privee_gris.jpeg",           stock: 3 },
      { nom: "Oud Vanille",  img: "/photos/privee_oud_vanille.jpeg",    stock: 2 },
      { nom: "Musc Blanc",   img: "/photos/privee_musc_blanc.jpeg",     stock: 1 },
      { nom: "Diament Bleu", img: "/photos/privee_diament_bleu.jpeg",   stock: 1 },
    ] },
  { nom: "Coffret Collection Précieuse", prix: 65000, stock: 1, cat: "Coffret", volume: 50,  img: "/photos/coffret_collection_precieuse.jpg", desc: "Coffret 4 parfums luxueux. Le cadeau parfait pour une occasion inoubliable !" },
  { nom: "Coffret Gris Montaigne",       prix: 50000, stock: 1, cat: "Coffret", volume: 80,  img: "/photos/coffret_gris_montaigne.jpg",        desc: "Coffret Gris Montaigne Paris avec un extrait de parfum 80ml, une mousse de douche 150ml et un déodorant spray 150ml." },
  { nom: "Phantom Paco Rabanne",          prix: 75000, stock: 1, cat: "Classique", volume: 100, img: "/photos/phantom_paco_rabanne.jpg",       desc: "Le légendaire Phantom en flacon robot iconique. Notes boisées et magnétiques." },
  { nom: "Invictus Victory Paco Rabanne", prix: 65000, stock: 1, cat: "Classique", volume: 100, img: "/photos/invictus_victory.jpg",           desc: "La victoire dans un flacon trophée noir. Puissant, frais et inoubliable." },
  { nom: "Red Tobacco Mancera Paris",     prix: 75000, stock: 1, cat: "Classique", volume: 120, img: "/photos/red_tobacco.jpg",                desc: "Mancera Paris Red Tobacco. Notes de tabac rouge et épices. Sensuel." },
  { nom: "Atelier des Essences (Eclat d'Iris)", prix: 45000, stock: 1, cat: "Classique", volume: 100, img: "/photos/atelier_des_essences.jpg", desc: "Atelier des Essences Paris, Eclat d'Iris. Notes florales raffinées." },
  { nom: "Sugar Oud Gulf Flowers",        prix: 35000, stock: 1, cat: "Classique", volume: 50,  img: "/photos/sugar_oud.jpg",                  desc: "Les Fleurs du Golfe Sugar Oud. Notes de oud et fleurs sucrées. Oriental." },
  { nom: "Gris Montaigne Black Empire",   prix: 35000, stock: 1, cat: "Classique", volume: 75,  img: "/photos/black_empire.jpg",               desc: "Black Empire de Gris Montaigne Paris. Notes boisées profondes et sophistiquées." },
  { nom: "Mauboussin Privée Club",        prix: 40000, stock: 1, cat: "Classique", volume: 100, img: "/photos/mauboussin_private_club.jpg",    desc: "Private Club de Mauboussin. Flacon bleu nuit aux notes fruitées et florales." },
  { nom: "Callisto Holliday Paris",       prix: 60000, stock: 1, cat: "Classique", volume: 100, img: "/photos/callisto_holliday.jpg",          desc: "Callisto Paris. Notes ambrées chaudes et boisées dans un flacon élégant." },
  { nom: "Musc Tahara", prix: 10000, cat: "Accessoire", volume: 12, desc: "Musc pur et authentique. Doux, enveloppant, longue tenue.",
    senteurs: [
      { nom: "Tahara",        img: "/photos/tahara_tahara.jpg",         stock: 3 },
      { nom: "Oud Cachemire", img: "/photos/tahara_oud_cachemire.webp", stock: 2 },
      { nom: "Barbe à Papa",  img: "/photos/tahara_barbe_a_papa.jpeg",  stock: 2 },
      { nom: "Rouge",         img: "/photos/tahara_rouge_absolue.jpeg", stock: 1 },
    ] },
  { nom: "Déodorant BA Intense CP", prix: 4000, stock: 3, cat: "Accessoire", img: "/photos/deodorant_cp_ba_intense.jpg", desc: "Collection Privée by Birraci — BA Intense Body Spray. Protection longue durée." },
];

const PROMO_ACTIVE = true;
const PROMO_TAUX   = 0.25;
const PROMO_EXCLUS = ["Déodorant BA Intense CP"];
const enPromo   = (p) => PROMO_ACTIVE && !PROMO_EXCLUS.includes(p.nom);
const prixPromo = (p) => Math.round(p.prix * (1 - PROMO_TAUX));

const CATALOGUE_TEXT = PRODUITS.map(p => {
  const st   = Array.isArray(p.senteurs) ? p.senteurs.reduce((s, x) => s + x.stock, 0) : (p.stock || 0);
  const vol  = p.volume ? ` ${p.volume}ml` : "";
  const sent = Array.isArray(p.senteurs) ? ` — Senteurs: ${p.senteurs.map(s => `${s.nom}(stock:${s.stock})`).join(", ")}` : "";
  const promo = enPromo(p) ? ` 🐏 -25% → ${prixPromo(p).toLocaleString("fr-FR")} FCFA` : "";
  return `- ${p.nom}${vol} : ${p.prix.toLocaleString("fr-FR")} FCFA (stock:${st})${sent}${promo}`;
}).join("\n");

const SYSTEM_PROMPT = `Tu es Matel, la conseillère officielle de la Parfumerie de la Zac, boutique de luxe spécialisée en parfums authentiques de Paris. Tu es élégante, chaleureuse et professionnelle. Tu utilises des emojis sobres (✨🖤🌹).

🐏 PROMOTION TABASKI EN COURS : -25% sur TOUS les produits sauf le Déodorant BA Intense CP.

CATALOGUE :
${CATALOGUE_TEXT}

INFOS BOUTIQUE :
- Adresse : Zac Mbao, Pikine, Dakar
- Horaires : Lundi-Dimanche 9h00 à 20h00
- Livraison : Dakar + Banlieue sous 24h
- WhatsApp : ${WHATSAPP_DISPLAY}

Règles :
- Réponds en 2-3 phrases maximum
- Pour commander : invite à cliquer sur "🛒 Ajouter au panier" puis "Commander"
- Suggère selon le budget du client
- Mentionne toujours que ce sont des parfums authentiques de Paris
- Ne jamais dépasser le stock indiqué
- Mentionne la promo Tabaski quand pertinent`;

const CATS      = ["Tous", "Collection", "Coffret", "Classique", "Accessoire"];
const CAT_ICONS = { Collection: "👑", Coffret: "🎁", Classique: "🌹", Accessoire: "✨" };
const PAGES     = [
  { id: "catalogue", label: "📦 Boutique" },
  { id: "order",     label: "🛍️ Commander" },
  { id: "favoris",   label: "❤️ Favoris" },
  { id: "info",      label: "📍 Localisation" },
];

const safeLS = {
  get: (k, fb) => { try { return JSON.parse(localStorage.getItem(k) ?? "null") ?? fb; } catch { return fb; } },
  set: (k, v)  => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

// ─── SOUS-COMPOSANTS (hors App pour éviter les re-renders) ────────────────────

const Logo = ({ size = 32 }) => (
  <div style={{ width: size, height: size, borderRadius: "50%", overflow: "hidden", border: `1.5px solid ${GOLD}55`, flexShrink: 0, background: "#1a1408", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <img src="/logo.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}
      onError={e => { e.target.style.display = "none"; e.target.parentElement.innerHTML = "🖤"; e.target.parentElement.style.fontSize = size / 2 + "px"; }} />
  </div>
);

const DotLoader = () => (
  <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
    {[0, 1, 2].map(j => (
      <div key={j} style={{ width: "7px", height: "7px", borderRadius: "50%", background: GOLD, animation: `dot 1.2s ease-in-out ${j * 0.15}s infinite` }} />
    ))}
  </div>
);

const ChatMessage = ({ msg }) => (
  <div className="msg" style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", alignItems: "flex-end", gap: "8px" }}>
    {msg.role === "assistant" && <Logo />}
    <div style={{
      maxWidth: "72%", padding: "11px 15px",
      borderRadius: msg.role === "user" ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
      background: msg.role === "user" ? `linear-gradient(135deg,${WA_GREEN},${WA_GREEN}bb)` : "rgba(255,255,255,0.07)",
      color: msg.role === "user" ? "#fff" : "rgba(255,255,255,0.9)",
      fontSize: "15.5px", lineHeight: "1.6",
      border: msg.role === "assistant" ? "1px solid rgba(255,255,255,0.08)" : "none",
    }}>
      {msg.content}
    </div>
  </div>
);

// ChatInput sorti de App ✅ — reçoit tout par props
const ChatInput = ({ input, setInput, onSend, loading, small }) => (
  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
    <div style={{ flex: 1, display: "flex", alignItems: "center", background: "rgba(255,255,255,0.07)", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.1)", padding: "0 16px", gap: "8px" }}>
      <span>✍️</span>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === "Enter" && onSend()}
        placeholder="Votre message à Matel..."
        style={{ flex: 1, padding: small ? "11px 0" : "12px 0", background: "transparent", border: "none", color: "#fff", fontSize: "16px", fontFamily: "inherit" }}
      />
    </div>
    <button className="tbtn" onClick={onSend} disabled={loading}
      style={{ width: small ? "44px" : "48px", height: small ? "44px" : "48px", borderRadius: "50%", background: `linear-gradient(135deg,${GOLD},#a07830)`, color: BG, fontSize: small ? "18px" : "20px", fontWeight: "bold", flexShrink: 0, opacity: loading ? 0.5 : 1, boxShadow: `0 4px 20px ${GOLD}55`, border: "none", cursor: "pointer" }}>➤</button>
  </div>
);

// ProductCard sorti de App ✅
const ProductCard = ({ p, senteurIdx, setSenteurIdx, onAddToCart, onToggleFavori, favoris }) => {
  const senteurs      = Array.isArray(p.senteurs) ? p.senteurs : null;
  const idx           = senteurIdx[p.nom] || 0;
  const senteurActive = senteurs ? senteurs[idx] : null;
  const imgAffichee   = senteurActive ? senteurActive.img : p.img;
  const stockAffiche  = senteurActive ? senteurActive.stock : (p.stock || 0);
  const fav           = favoris.includes(p.nom);
  const touchStart    = useRef(null);

  const goPrev = (e) => { e.stopPropagation(); setSenteurIdx(prev => ({ ...prev, [p.nom]: idx === 0 ? senteurs.length - 1 : idx - 1 })); };
  const goNext = (e) => { e.stopPropagation(); setSenteurIdx(prev => ({ ...prev, [p.nom]: (idx + 1) % senteurs.length })); };

  const handleTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const handleTouchEnd   = (e) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) < 40) return;
    setSenteurIdx(prev => {
      const cur  = prev[p.nom] || 0;
      const next = diff > 0 ? (cur + 1) % senteurs.length : (cur === 0 ? senteurs.length - 1 : cur - 1);
      return { ...prev, [p.nom]: next };
    });
    touchStart.current = null;
  };

  return (
    <div className="pcard" style={{ background: "#161616", border: `1px solid ${GOLD}18`, borderRadius: "16px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ position: "relative", height: "160px", overflow: "hidden", background: "#0d0d0d" }}
        onTouchStart={senteurs?.length > 1 ? handleTouchStart : undefined}
        onTouchEnd={senteurs?.length > 1   ? handleTouchEnd   : undefined}>
        <img src={imgAffichee} alt={p.nom} style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", transition: "opacity 0.25s" }}
          onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
        <div style={{ display: "none", width: "100%", height: "100%", background: "linear-gradient(135deg,#1a1408,#111)", alignItems: "center", justifyContent: "center", fontSize: "48px", flexDirection: "column", gap: "8px" }}>
          <span>🌹</span>
          {senteurActive && <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>{senteurActive.nom}</span>}
        </div>

        {senteurs && senteurs.length > 1 && (<>
          <button onClick={goPrev} aria-label="Précédent" style={{ position: "absolute", left: "8px", top: "50%", transform: "translateY(-50%)", width: "34px", height: "34px", borderRadius: "50%", background: "rgba(0,0,0,0.6)", border: `1px solid ${GOLD}55`, color: GOLD, fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
          <button onClick={goNext} aria-label="Suivant"   style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", width: "34px", height: "34px", borderRadius: "50%", background: "rgba(0,0,0,0.6)", border: `1px solid ${GOLD}55`, color: GOLD, fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
        </>)}

        <div style={{ position: "absolute", top: "10px", right: "10px", background: stockAffiche === 0 ? "rgba(80,80,80,0.9)" : stockAffiche <= 1 ? "rgba(192,57,43,0.9)" : stockAffiche <= 3 ? "rgba(230,126,34,0.9)" : "rgba(39,174,96,0.9)", color: "#fff", padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "700" }}>
          {stockAffiche === 0 ? "❌ Rupture" : stockAffiche <= 1 ? "⚠️ Dernier !" : stockAffiche <= 3 ? `⚡ ${stockAffiche} restants` : `✅ ${stockAffiche} en stock`}
        </div>

        <button onClick={() => onToggleFavori(p.nom)} aria-label="Favori"
          style={{ position: "absolute", top: "10px", left: "10px", width: "32px", height: "32px", borderRadius: "50%", background: "rgba(0,0,0,0.55)", border: `1px solid ${fav ? "#e74c3c" : "rgba(255,255,255,0.2)"}`, color: fav ? "#e74c3c" : "rgba(255,255,255,0.5)", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
          {fav ? "❤️" : "🤍"}
        </button>
      </div>

      {senteurs && senteurs.length > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: "5px", padding: "6px 0 4px", background: "#0d0d0d" }}>
          {senteurs.map((_, j) => (
            <button key={j} onClick={() => setSenteurIdx(prev => ({ ...prev, [p.nom]: j }))}
              style={{ width: idx === j ? "20px" : "6px", height: "6px", borderRadius: "3px", border: "none", background: idx === j ? GOLD : "rgba(255,255,255,0.2)", cursor: "pointer", transition: "all 0.25s", padding: 0 }} />
          ))}
        </div>
      )}

      <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px", gap: "8px" }}>
          <div style={{ flex: 1 }}>
            <div style={{ color: "#fff", fontWeight: "700", fontSize: "12px", lineHeight: "1.3", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{p.nom}</div>
            {senteurActive && (
              <div style={{ color: GOLD, fontWeight: "600", fontSize: "12px", marginTop: "3px" }}>
                ✨ {senteurActive.nom}
                {p.volume && <span style={{ color: "rgba(255,255,255,0.4)", marginLeft: "5px" }}>{p.volume}ml</span>}
              </div>
            )}
            {!senteurActive && p.volume && <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", marginTop: "2px" }}>{p.volume}ml</div>}
            {enPromo(p) && (
              <div style={{ display: "inline-block", marginTop: "4px", background: "linear-gradient(135deg,#c0392b,#8e2419)", color: "#fff", padding: "2px 7px", borderRadius: "10px", fontSize: "9px", fontWeight: "700" }}>
                🐏 Promo tabaski -25%
              </div>
            )}
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            {enPromo(p) && <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", textDecoration: "line-through", marginBottom: "2px" }}>{p.prix.toLocaleString("fr-FR")}</div>}
            <div style={{ color: GOLD, fontWeight: "800", fontSize: "17px" }}>{(enPromo(p) ? prixPromo(p) : p.prix).toLocaleString("fr-FR")}</div>
            <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px" }}>FCFA</div>
          </div>
        </div>
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", lineHeight: "1.5", marginBottom: "12px", flex: 1 }}>{p.desc}</div>
        <button className="tbtn" onClick={() => onAddToCart(p, senteurActive)} disabled={stockAffiche === 0}
          style={{ width: "100%", padding: "10px", borderRadius: "12px", background: stockAffiche === 0 ? "rgba(255,255,255,0.08)" : `linear-gradient(135deg,${GOLD},#a07830)`, color: stockAffiche === 0 ? "rgba(255,255,255,0.3)" : "#0a0a0a", fontSize: "13px", fontWeight: "700", boxShadow: stockAffiche === 0 ? "none" : `0 3px 10px ${GOLD}44`, border: "none", cursor: stockAffiche === 0 ? "not-allowed" : "pointer" }}>
          {stockAffiche === 0 ? "❌ Rupture de stock" : "🛒 Ajouter au panier"}
        </button>
      </div>
    </div>
  );
};

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [activePage, setActivePage]   = useState("chat");
  const [messages, setMessages]       = useState([{ role: "assistant", content: "Bienvenue à la Parfumerie de la Zac ✨ Je suis Matel, votre conseillère. Nos parfums authentiques de Paris vous attendent. Comment puis-je vous aider ? 🖤" }]);
  const [input, setInput]             = useState("");
  const [loading, setLoading]         = useState(false);
  const [order, setOrder]             = useState({ name: "", phone: "", quartier: "" });
  const [catFilter, setCatFilter]     = useState("Tous");
  const [search, setSearch]           = useState("");
  const [chatOverlay, setChatOverlay] = useState(false);
  const [cart, setCart]               = useState(() => safeLS.get("pdz_cart",   []));
  const [favoris, setFavoris]         = useState(() => safeLS.get("pdz_favoris", []));
  const [toast, setToast]             = useState("");
  const [senteurIdx, setSenteurIdx]   = useState({});

  const endRef        = useRef(null);
  const overlayEndRef = useRef(null);
  const msgCount      = messages.length;

  useEffect(() => { safeLS.set("pdz_cart",    cart);   }, [cart]);
  useEffect(() => { safeLS.set("pdz_favoris", favoris); }, [favoris]);

  // Scroll uniquement quand un nouveau message est ajouté ✅
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgCount]);
  useEffect(() => { if (chatOverlay) overlayEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgCount, chatOverlay]);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  }, []);

  const addToCart = useCallback((produit, senteurChoisie = null) => {
    const senteur    = senteurChoisie || (Array.isArray(produit.senteurs) ? produit.senteurs[0] : null);
    const cle        = senteur ? `${produit.nom}__${senteur.nom}` : produit.nom;
    const stockDispo = senteur ? senteur.stock : (produit.stock || 0);
    const label      = senteur ? `${produit.nom} - ${senteur.nom}` : produit.nom;
    if (stockDispo === 0) { showToast(`⚠️ Rupture de stock pour ${label}`); return; }
    setCart(prev => {
      const ex = prev.find(c => c.cle === cle);
      if (ex) return prev.map(c => c.cle === cle ? { ...c, qty: Math.min(c.qty + 1, stockDispo) } : c);
      return [...prev, { cle, nom: produit.nom, senteur: senteur?.nom ?? null, prix: produit.prix, volume: produit.volume ?? null, qty: 1, stock: stockDispo, img: senteur ? senteur.img : (produit.img ?? null) }];
    });
    showToast(`✓ ${label} ajouté au panier`);
  }, [showToast]);

  const updateQty      = (cle, d) => setCart(prev => prev.map(c => c.cle !== cle ? c : { ...c, qty: Math.max(1, Math.min(c.qty + d, c.stock)) }));
  const removeFromCart = (cle)    => setCart(prev => prev.filter(c => c.cle !== cle));
  const clearCart      = ()       => { setCart([]); showToast("🗑️ Panier vidé"); };

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const cartTotal = cart.reduce((s, c) => {
    const p = PRODUITS.find(x => x.nom === c.nom);
    return s + (p && enPromo(p) ? prixPromo(p) : c.prix) * c.qty;
  }, 0);

  const toggleFavori = useCallback((nom) => {
    setFavoris(prev => prev.includes(nom) ? prev.filter(n => n !== nom) : [...prev, nom]);
  }, []);

  const filtered = useMemo(() => {
    let list = catFilter === "Tous" ? PRODUITS : PRODUITS.filter(p => p.cat === catFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.nom.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        (Array.isArray(p.senteurs) && p.senteurs.some(s => s.nom.toLowerCase().includes(q)))
      );
    }
    return list;
  }, [catFilter, search]);

  const produitsFavoris = useMemo(() => PRODUITS.filter(p => favoris.includes(p.nom)), [favoris]);

  const messagesRef = useRef(messages);
  useEffect(() => { messagesRef.current = messages; }, [messages]);

  const inputRef = useRef(input);
  useEffect(() => { inputRef.current = input; }, [input]);

  const send = useCallback(async (text) => {
    const msg = text || inputRef.current.trim();
    if (!msg || loading) return;
    setInput("");

    if (msg.toLowerCase().includes("catalogue")) {
      setActivePage("catalogue");
      setChatOverlay(false);
      return;
    }

    const next = [...messagesRef.current, { role: "user", content: msg }];
    setMessages(next);
    setLoading(true);

    try {
      const res  = await fetch("/api/chat", {
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
      setMessages(cur => [...cur, { role: "assistant", content: data.content?.[0]?.text || "Désolée, réessayez. ✨" }]);
    } catch {
      setMessages(cur => [...cur, { role: "assistant", content: "Connexion indisponible. Réessayez. 🖤" }]);
    }
    setLoading(false);
  }, [loading]);

  const sendOrder = () => {
    if (!cart.length) return;
    const lignes = cart.map(item => {
      const p  = PRODUITS.find(x => x.nom === item.nom);
      const pu = p && enPromo(p) ? prixPromo(p) : item.prix;
      const pt = p && enPromo(p) ? ` (Promo Tabaski -${Math.round(PROMO_TAUX * 100)}%25)` : "";
      const lb = item.senteur ? `${item.nom} - ${item.senteur}` : item.nom;
      const vl = item.volume  ? ` ${item.volume}ml` : "";
      return `• ${item.qty}× ${lb}${vl} — ${(pu * item.qty).toLocaleString("fr-FR")} FCFA${pt}`;
    }).join("%0A");
    const txt = `Bonjour Parfumerie De La Zac ! 🖤%0AJe souhaite commander :%0A%0A👤 Nom : ${order.name}%0A📱 Tel : ${order.phone}%0A📍 Quartier : ${order.quartier}%0A%0A🌹 Mes articles :%0A${lignes}%0A%0A💰 Total : ${cartTotal.toLocaleString("fr-FR")} FCFA%0A%0AMerci ✨`;
    window.open(`https://wa.me/${WHATSAPP}?text=${txt}`, "_blank");
  };

  const canOrder = order.name && order.phone && order.quartier && cart.length > 0;

  return (
    <div style={{ minHeight: "100vh", background: BG, display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "'SF Pro Display',-apple-system,sans-serif" }}>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes dot{0%,80%,100%{transform:scale(0.6);opacity:0.3}40%{transform:scale(1);opacity:1}}
        @keyframes glow{0%,100%{box-shadow:0 0 15px #C9A84C33}50%{box-shadow:0 0 30px #C9A84C66}}
        .msg{animation:fadeUp 0.3s ease forwards}
        .tbtn{transition:all 0.2s;cursor:pointer;border:none}
        .tbtn:hover{transform:translateY(-2px);opacity:0.9}
        .pcard:hover{transform:translateY(-3px);box-shadow:0 10px 30px rgba(0,0,0,0.6)!important;border-color:rgba(201,168,76,0.5)!important}
        input:focus{outline:none}
        ::-webkit-scrollbar{width:0}
      `}</style>

      {/* HEADER */}
      <div style={{ width: "100%", maxWidth: "480px", background: BG, padding: "12px 20px 0", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0 12px", borderBottom: `1px solid ${GOLD}22` }}>
          <div onClick={() => setActivePage("chat")} style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "50%", overflow: "hidden", border: `2px solid ${GOLD}`, boxShadow: `0 0 16px ${GOLD}44`, animation: "glow 3s ease-in-out infinite", flexShrink: 0 }}>
              <img src="/logo.jpg" alt="PDZ" style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={e => { e.target.style.display = "none"; e.target.parentElement.innerHTML = "🖤"; e.target.parentElement.style.cssText += "display:flex;align-items:center;justify-content:center;font-size:20px"; }} />
            </div>
            <div>
              <div style={{ color: GOLD, fontWeight: "800", fontSize: "17px" }}>Parfumerie de la Zac</div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "2px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade80" }} />
                <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px" }}>Matel en ligne • Parfums de Paris</span>
              </div>
            </div>
          </div>
          <div style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}33`, borderRadius: "20px", padding: "5px 12px", color: GOLD, fontSize: "13px", fontWeight: "600" }}>LIVE</div>
        </div>
        <div style={{ display: "flex", gap: "4px", padding: "10px 0 0", overflowX: "auto" }}>
          {PAGES.map(pg => (
            <button key={pg.id} className="tbtn" onClick={() => setActivePage(pg.id)}
              style={{ flex: "0 0 auto", padding: "7px 10px", borderRadius: "10px", background: activePage === pg.id ? `${GOLD}22` : "rgba(255,255,255,0.04)", color: activePage === pg.id ? GOLD : "rgba(255,255,255,0.35)", border: `1px solid ${activePage === pg.id ? GOLD + "55" : "rgba(255,255,255,0.08)"}`, fontSize: "13px", fontWeight: "600", whiteSpace: "nowrap", position: "relative" }}>
              {pg.label}
              {pg.id === "order"   && cartCount > 0    && <span style={{ position: "absolute", top: "-6px", right: "-6px", background: "#c0392b", color: "#fff", borderRadius: "50%", minWidth: "20px", height: "20px", padding: "0 5px", fontSize: "11px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 6px rgba(192,57,43,0.5)" }}>{cartCount}</span>}
              {pg.id === "favoris" && favoris.length > 0 && <span style={{ position: "absolute", top: "-6px", right: "-6px", background: "#e74c3c", color: "#fff", borderRadius: "50%", minWidth: "20px", height: "20px", padding: "0 5px", fontSize: "11px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>{favoris.length}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* CHAT */}
      {activePage === "chat" && (
        <>
          <div style={{ width: "100%", maxWidth: "480px", flex: 1, padding: "16px 20px", display: "flex", flexDirection: "column", gap: "14px", overflowY: "auto", minHeight: "350px", maxHeight: "45vh" }}>
            {messages.map((msg, i) => <ChatMessage key={i} msg={msg} />)}
            {loading && (
              <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
                <Logo />
                <div style={{ padding: "12px 16px", borderRadius: "20px 20px 20px 4px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <DotLoader />
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
          <div style={{ width: "100%", maxWidth: "480px", padding: "0 20px 10px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {["Voir le catalogue 📦", "Meilleure vente ⭐", "Offrir un cadeau 🎁", "Commander 🛍️"].map((q, i) => (
              <button key={i} className="tbtn" onClick={() => send(q)}
                style={{ padding: "7px 12px", borderRadius: "20px", border: `1px solid ${GOLD}30`, background: `rgba(201,168,76,0.08)`, color: "rgba(255,255,255,0.7)", fontSize: "13px" }}>{q}</button>
            ))}
          </div>
          <div style={{ width: "100%", maxWidth: "480px", padding: "10px 20px 20px", background: "rgba(255,255,255,0.03)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <ChatInput input={input} setInput={setInput} onSend={send} loading={loading} />
          </div>
        </>
      )}

      {/* CATALOGUE */}
      {activePage === "catalogue" && (
        <div style={{ width: "100%", maxWidth: "480px", flex: 1, padding: "16px 16px 30px", overflowY: "auto" }}>
          <div style={{ position: "relative", marginBottom: "12px" }}>
            <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "16px", pointerEvents: "none" }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher un parfum ou une senteur..."
              style={{ width: "100%", padding: "11px 16px 11px 42px", borderRadius: "14px", border: `1px solid ${GOLD}25`, background: "rgba(255,255,255,0.06)", color: "#fff", fontSize: "14px", fontFamily: "inherit", boxSizing: "border-box" }} />
            {search && <button onClick={() => setSearch("")} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: "18px", cursor: "pointer" }}>✕</button>}
          </div>
          <div style={{ display: "flex", gap: "6px", marginBottom: "16px", overflowX: "auto", paddingBottom: "4px" }}>
            {CATS.map(cat => (
              <button key={cat} className="tbtn" onClick={() => setCatFilter(cat)}
                style={{ flexShrink: 0, padding: "5px 10px", borderRadius: "20px", background: catFilter === cat ? GOLD : "rgba(255,255,255,0.05)", color: catFilter === cat ? "#0a0a0a" : "rgba(255,255,255,0.5)", border: `1px solid ${catFilter === cat ? GOLD : "rgba(255,255,255,0.1)"}`, fontSize: "11px", fontWeight: "600" }}>
                {cat === "Tous" ? "🛍️ Tous" : `${CAT_ICONS[cat]} ${cat}`}
              </button>
            ))}
          </div>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 0", color: "rgba(255,255,255,0.4)" }}>
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔍</div>
              <div>Aucun résultat pour "<strong>{search}</strong>"</div>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {filtered.map((p, i) => (
                <ProductCard key={i} p={p} senteurIdx={senteurIdx} setSenteurIdx={setSenteurIdx}
                  onAddToCart={addToCart} onToggleFavori={toggleFavori} favoris={favoris} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* FAVORIS */}
      {activePage === "favoris" && (
        <div style={{ width: "100%", maxWidth: "480px", flex: 1, padding: "16px 16px 30px", overflowY: "auto" }}>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <div style={{ fontSize: "32px", marginBottom: "8px" }}>❤️</div>
            <div style={{ color: GOLD, fontSize: "20px", fontWeight: "800" }}>Mes Favoris</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", marginTop: "4px" }}>{favoris.length === 0 ? "Aucun favori pour l'instant" : `${favoris.length} parfum${favoris.length > 1 ? "s" : ""} sauvegardé${favoris.length > 1 ? "s" : ""}`}</div>
          </div>
          {produitsFavoris.length === 0 ? (
            <div style={{ textAlign: "center", padding: "30px 0" }}>
              <div style={{ fontSize: "48px", marginBottom: "12px", opacity: 0.4 }}>🤍</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", marginBottom: "20px" }}>Appuyez sur 🤍 dans le catalogue pour sauvegarder vos parfums préférés.</div>
              <button className="tbtn" onClick={() => setActivePage("catalogue")} style={{ padding: "12px 24px", borderRadius: "14px", background: `linear-gradient(135deg,${GOLD},#a07830)`, color: "#0a0a0a", fontSize: "15px", fontWeight: "700", border: "none" }}>📦 Voir le catalogue</button>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {produitsFavoris.map((p, i) => (
                <ProductCard key={i} p={p} senteurIdx={senteurIdx} setSenteurIdx={setSenteurIdx}
                  onAddToCart={addToCart} onToggleFavori={toggleFavori} favoris={favoris} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ORDER */}
      {activePage === "order" && (
        <div style={{ width: "100%", maxWidth: "480px", padding: "20px", flex: 1 }}>
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "20px", border: `1px solid ${GOLD}22`, padding: "24px" }}>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>🛒</div>
              <div style={{ color: GOLD, fontSize: "20px", fontWeight: "800" }}>Mon panier</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", marginTop: "4px" }}>{cartCount === 0 ? "Votre panier est vide" : `${cartCount} article${cartCount > 1 ? "s" : ""} • Prêt à commander`}</div>
            </div>
            {cart.length === 0 ? (
              <div style={{ textAlign: "center", padding: "30px 0" }}>
                <div style={{ fontSize: "48px", marginBottom: "12px", opacity: 0.5 }}>🌹</div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", marginBottom: "20px" }}>Aucun parfum sélectionné.</div>
                <button className="tbtn" onClick={() => setActivePage("catalogue")} style={{ padding: "12px 24px", borderRadius: "14px", background: `linear-gradient(135deg,${GOLD},#a07830)`, color: "#0a0a0a", fontSize: "15px", fontWeight: "700", border: "none" }}>📦 Voir le catalogue</button>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: "12px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  {cart.map(item => {
                    const prod = PRODUITS.find(x => x.nom === item.nom);
                    const pu   = prod && enPromo(prod) ? prixPromo(prod) : item.prix;
                    return (
                      <div key={item.cle} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${GOLD}15`, borderRadius: "12px", padding: "12px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px", gap: "10px" }}>
                          {item.img && <img src={item.img} alt="" style={{ width: "44px", height: "44px", borderRadius: "8px", objectFit: "cover", flexShrink: 0, background: "#0d0d0d" }} onError={e => { e.target.style.display = "none"; }} />}
                          <div style={{ flex: 1 }}>
                            <div style={{ color: "#fff", fontWeight: "700", fontSize: "13px", lineHeight: "1.3" }}>{item.nom}</div>
                            {item.senteur && <div style={{ color: GOLD, fontSize: "11px", fontWeight: "600", marginTop: "2px" }}>✨ {item.senteur}{item.volume ? ` • ${item.volume}ml` : ""}</div>}
                            {prod && enPromo(prod) && <div style={{ color: "#e74c3c", fontSize: "10px", fontWeight: "700", marginTop: "3px" }}>🐏 Promo Tabaski -{Math.round(PROMO_TAUX * 100)}%</div>}
                          </div>
                          <button onClick={() => removeFromCart(item.cle)} style={{ background: "rgba(192,57,43,0.15)", border: "1px solid rgba(192,57,43,0.3)", color: "#e74c3c", borderRadius: "8px", padding: "4px 8px", fontSize: "12px", cursor: "pointer" }}>🗑️</button>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.06)", borderRadius: "10px", padding: "4px" }}>
                            <button onClick={() => updateQty(item.cle, -1)} disabled={item.qty <= 1}          style={{ width: "28px", height: "28px", borderRadius: "8px", border: "none", background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: "16px", cursor: item.qty <= 1 ? "not-allowed" : "pointer", opacity: item.qty <= 1 ? 0.4 : 1 }}>−</button>
                            <div style={{ minWidth: "24px", textAlign: "center", color: "#fff", fontSize: "14px", fontWeight: "700" }}>{item.qty}</div>
                            <button onClick={() => updateQty(item.cle, 1)}  disabled={item.qty >= item.stock} style={{ width: "28px", height: "28px", borderRadius: "8px", border: "none", background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: "16px", cursor: item.qty >= item.stock ? "not-allowed" : "pointer", opacity: item.qty >= item.stock ? 0.4 : 1 }}>+</button>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <div style={{ color: GOLD, fontWeight: "800", fontSize: "15px" }}>{(pu * item.qty).toLocaleString("fr-FR")} <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)" }}>FCFA</span></div>
                            {item.qty > 1 && <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "10px" }}>{pu.toLocaleString("fr-FR")} × {item.qty}</div>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button className="tbtn" onClick={clearCart}
                  style={{ width: "100%", padding: "9px", borderRadius: "10px", background: "rgba(192,57,43,0.1)", border: "1px solid rgba(192,57,43,0.25)", color: "#e74c3c", fontSize: "13px", fontWeight: "600", marginBottom: "16px" }}>
                  🗑️ Vider le panier
                </button>
                <div style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}44`, borderRadius: "12px", padding: "14px 16px", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ color: GOLD, fontSize: "14px", fontWeight: "700" }}>💰 Total</div>
                  <div style={{ color: GOLD, fontSize: "20px", fontWeight: "800" }}>{cartTotal.toLocaleString("fr-FR")} <span style={{ fontSize: "12px" }}>FCFA</span></div>
                </div>
                <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", margin: "20px 0" }} />
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", marginBottom: "14px", fontWeight: "600" }}>Vos coordonnées de livraison</div>
                {[
                  { key: "name",     label: "👤 Votre nom complet",    ph: "Ex: Amadou Diallo" },
                  { key: "phone",    label: "📱 Votre numéro WhatsApp", ph: "Ex: +221 77 XXX XX XX" },
                  { key: "quartier", label: "📍 Votre quartier",        ph: "Ex: Pikine, Parcelles, Médina..." },
                ].map(f => (
                  <div key={f.key} style={{ marginBottom: "14px" }}>
                    <label style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", display: "block", marginBottom: "6px" }}>{f.label}</label>
                    <input value={order[f.key]} onChange={e => setOrder({ ...order, [f.key]: e.target.value })} placeholder={f.ph}
                      style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: `1px solid ${GOLD}25`, background: "rgba(255,255,255,0.06)", color: "#fff", fontSize: "16px", fontFamily: "inherit", boxSizing: "border-box" }} />
                  </div>
                ))}
                <button className="tbtn" onClick={sendOrder} disabled={!canOrder}
                  style={{ width: "100%", padding: "16px", borderRadius: "16px", background: canOrder ? `linear-gradient(135deg,${WA_GREEN},#1a9e4a)` : "rgba(255,255,255,0.1)", color: canOrder ? "#fff" : "rgba(255,255,255,0.3)", fontSize: "16px", fontWeight: "700", boxShadow: canOrder ? `0 4px 20px ${WA_GREEN}44` : "none", border: "none", cursor: canOrder ? "pointer" : "not-allowed" }}>
                  💬 Finaliser sur WhatsApp
                </button>
                <button className="tbtn" onClick={() => setActivePage("catalogue")}
                  style={{ width: "100%", padding: "12px", borderRadius: "16px", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)", fontSize: "14px", marginTop: "10px", border: "1px solid rgba(255,255,255,0.08)" }}>
                  ← Continuer mes achats
                </button>
                <div style={{ textAlign: "center", marginTop: "12px", color: `${GOLD}66`, fontSize: "12px" }}>Livraison Dakar + Banlieue • Réponse sous 2h</div>
              </>
            )}
          </div>
        </div>
      )}

      {/* INFO */}
      {activePage === "info" && (
        <div style={{ width: "100%", maxWidth: "480px", padding: "20px", flex: 1 }}>
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "20px", border: `1px solid ${GOLD}22`, padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ textAlign: "center", marginBottom: "8px" }}>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>🏪</div>
              <div style={{ color: GOLD, fontSize: "20px", fontWeight: "800" }}>Parfumerie De La Zac</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>Parfums authentiques de Paris</div>
            </div>
            {[
              { icon: "📍", label: "Adresse",   value: "Zac Mbao, Pikine, Dakar" },
              { icon: "🕐", label: "Horaires",  value: "Lundi — Dimanche : 9h00 à 20h00" },
              { icon: "🚚", label: "Livraison", value: "Dakar + Banlieue — Sous 24h" },
              { icon: "📱", label: "WhatsApp",  value: WHATSAPP_DISPLAY },
            ].map((info, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "14px 16px", borderRadius: "14px", background: "rgba(255,255,255,0.05)", border: `1px solid ${GOLD}15` }}>
                <span style={{ fontSize: "22px", flexShrink: 0 }}>{info.icon}</span>
                <div>
                  <div style={{ color: `${GOLD}99`, fontSize: "13px", marginBottom: "2px" }}>{info.label}</div>
                  <div style={{ color: "#fff", fontSize: "15px", fontWeight: "600" }}>{info.value}</div>
                </div>
              </div>
            ))}
            <button className="tbtn" onClick={() => window.open(`https://wa.me/${WHATSAPP}`, "_blank")}
              style={{ width: "100%", padding: "14px", borderRadius: "16px", background: `linear-gradient(135deg,${WA_GREEN},#1a9e4a)`, color: "#fff", fontSize: "15px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", boxShadow: "0 4px 20px #25D36644" }}>
              <span style={{ fontSize: "20px" }}>💬</span> WhatsApp
            </button>
            <button className="tbtn" onClick={() => setActivePage("order")}
              style={{ width: "100%", padding: "14px", borderRadius: "16px", background: `linear-gradient(135deg,${GOLD},#a07830)`, color: "#0a0a0a", fontSize: "16px", fontWeight: "700", boxShadow: `0 4px 20px ${GOLD}44` }}>
              🛍️ Passer une commande
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div style={{ width: "100%", maxWidth: "480px", textAlign: "center", padding: "10px", color: "rgba(255,255,255,0.15)", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        Parfumerie de la Zac • Tous droits réservés 2025
      </div>

      {/* TOAST */}
      {toast && (
        <div style={{ position: "fixed", bottom: "100px", left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#1a9e4a,#25D366)", color: "#fff", padding: "12px 20px", borderRadius: "30px", fontSize: "14px", fontWeight: "600", boxShadow: "0 8px 24px rgba(37,211,102,0.4)", zIndex: 1100, animation: "fadeUp 0.3s ease forwards", maxWidth: "90%", textAlign: "center" }}>
          {toast}
        </div>
      )}

      {/* BOUTON FLOTTANT */}
      {activePage !== "chat" && !chatOverlay && (
        <button onClick={() => setChatOverlay(true)} title="Discuter avec Matel"
          style={{ position: "fixed", bottom: "24px", right: "24px", width: "60px", height: "60px", borderRadius: "50%", background: `linear-gradient(135deg,${GOLD},#a07830)`, border: "none", cursor: "pointer", boxShadow: `0 8px 24px ${GOLD}66,0 0 0 4px rgba(201,168,76,0.15)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", zIndex: 999, animation: "glow 2.5s ease-in-out infinite" }}>
          💬
        </button>
      )}

      {/* CHAT OVERLAY */}
      {chatOverlay && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 1000, display: "flex", alignItems: "flex-end", justifyContent: "center", animation: "fadeUp 0.25s ease forwards" }}>
          <div style={{ width: "100%", maxWidth: "480px", height: "85vh", background: BG, borderRadius: "20px 20px 0 0", border: `1px solid ${GOLD}33`, display: "flex", flexDirection: "column", boxShadow: `0 -10px 40px ${GOLD}33` }}>
            <div style={{ padding: "14px 18px", borderBottom: `1px solid ${GOLD}22`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Logo size={36} />
                <div>
                  <div style={{ color: GOLD, fontWeight: "800", fontSize: "15px" }}>Matel</div>
                  <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "11px" }}>Conseillère en parfums</div>
                </div>
              </div>
              <button onClick={() => setChatOverlay(false)} style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.08)", border: "none", color: "#fff", fontSize: "18px", cursor: "pointer" }}>✕</button>
            </div>
            <div style={{ flex: 1, padding: "16px 18px", display: "flex", flexDirection: "column", gap: "12px", overflowY: "auto" }}>
              {messages.map((msg, i) => (
                <div key={i} className="msg" style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", alignItems: "flex-end", gap: "8px" }}>
                  {msg.role === "assistant" && <Logo size={28} />}
                  <div style={{ maxWidth: "75%", padding: "11px 14px", borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", background: msg.role === "user" ? `linear-gradient(135deg,${WA_GREEN},${WA_GREEN}bb)` : "rgba(255,255,255,0.07)", color: msg.role === "user" ? "#fff" : "rgba(255,255,255,0.9)", fontSize: "14px", lineHeight: "1.5", border: msg.role === "assistant" ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
                  <Logo size={28} />
                  <div style={{ padding: "10px 14px", borderRadius: "18px 18px 18px 4px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <DotLoader />
                  </div>
                </div>
              )}
              <div ref={overlayEndRef} />
            </div>
            <div style={{ padding: "10px 18px 16px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <ChatInput input={input} setInput={setInput} onSend={send} loading={loading} small />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
import { useState, useRef, useEffect, useMemo } from "react";

const WHATSAPP         = "221769724307";
const WHATSAPP_DISPLAY = "+221 76 972 43 07";
const WAVE_NUMBER      = "221769724307";
const WAVE_DISPLAY     = "+221 76 972 43 07";
const WAVE_MERCHANT_ID = "M_sn_pI5AUOtFql3a"; // Wave Business — lien marchand
const GOLD             = "#C9A84C";
const WA_GREEN         = "#25D366";
const WAVE_BLUE        = "#1DC3F0";
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
      { nom: "Bakara",       img: "/photos/privee_bakara.png",        stock: 2 },
      { nom: "Arabie",       img: "/photos/privee_arabie.jpeg",       stock: 2 },
      { nom: "Gris",         img: "/photos/privee_gris.jpeg",         stock: 3 },
      { nom: "Oud Vanille",  img: "/photos/privee_oud_vanille.jpeg",  stock: 2 },
      { nom: "Musc Blanc",   img: "/photos/privee_musc_blanc.jpeg",   stock: 1 },
      { nom: "Diament Bleu", img: "/photos/privee_diament_bleu.jpeg", stock: 1 },
    ] },
  { nom: "Collection Shaima", prix: 4000, cat: "Collection", volume: 20, desc: "Extraits de parfum 20ml par Shaima — inspirations des plus grandes maisons (Y, J'adore, Libre, One Million, Kayali...). Haute concentration, longue tenue. Exemplaires uniques.",
    senteurs: [
      { nom: "Mon Blanc",      img: "/photos/shaima_mon_blanc.jpg",      stock: 1 },
      { nom: "Y",              img: "/photos/shaima_y.jpg",              stock: 1 },
      { nom: "L'Homme Idéal",  img: "/photos/shaima_lhomme_ideal.jpg",   stock: 1 },
      { nom: "Erba Pura",      img: "/photos/shaima_erba_pura.jpg",      stock: 1 },
      { nom: "Libre",          img: "/photos/shaima_libre.jpg",          stock: 1 },
      { nom: "My Way",         img: "/photos/shaima_my_way.jpg",         stock: 1 },
      { nom: "Baccara Gold",   img: "/photos/shaima_baccara_gold.jpg",   stock: 1 },
      { nom: "J'adore",        img: "/photos/shaima_jadore.jpg",         stock: 1 },
      { nom: "Oud Essentiel",  img: "/photos/shaima_oud_essentiel.jpg",  stock: 1 },
      { nom: "Black XS",       img: "/photos/shaima_black_xs.jpg",       stock: 1 },
      { nom: "Azzaro Wanted",  img: "/photos/shaima_azzaro_wanted.jpg",  stock: 1 },
      { nom: "Scandale Homme", img: "/photos/shaima_scandale_homme.jpg", stock: 1 },
      { nom: "One Million",    img: "/photos/shaima_one_million.jpg",    stock: 1 },
      { nom: "Kayali",         img: "/photos/shaima_kayali.jpg",         stock: 1 },
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

// ─── PROMO DÉSACTIVÉE ─────────────────────────────────────────────────────────
const PROMO_ACTIVE = false; // 👈 Mettre true pour réactiver la promo
const PROMO_TAUX   = 0.25;
const PROMO_EXCLUS = ["Déodorant BA Intense CP", "Collection Shaima"];
const enPromo      = (p) => PROMO_ACTIVE && !PROMO_EXCLUS.includes(p.nom);
const prixPromo    = (p) => Math.round(p.prix * (1 - PROMO_TAUX));

const CATALOGUE_TEXT = PRODUITS.map(p => {
  const st    = Array.isArray(p.senteurs) ? p.senteurs.reduce((s, x) => s + x.stock, 0) : (p.stock || 0);
  const vol   = p.volume ? ` ${p.volume}ml` : "";
  const sent  = Array.isArray(p.senteurs) ? ` — Senteurs: ${p.senteurs.map(s => `${s.nom}(stock:${s.stock})`).join(", ")}` : "";
  const promo = enPromo(p) ? ` 🐏 -25% → ${prixPromo(p).toLocaleString("fr-FR")} FCFA` : "";
  return `- ${p.nom}${vol} : ${p.prix.toLocaleString("fr-FR")} FCFA (stock:${st})${sent}${promo}`;
}).join("\n");

const SYSTEM_PROMPT = `Tu es Matel, la conseillère officielle de la Parfumerie de la Zac, boutique de luxe spécialisée en parfums authentiques de Paris. Tu es élégante, chaleureuse et professionnelle. Tu utilises des emojis sobres (✨🖤🌹).

CATALOGUE :
${CATALOGUE_TEXT}

INFOS BOUTIQUE :
- Adresse : Zac Mbao, Pikine, Dakar
- Horaires : Lundi-Dimanche 9h00 à 20h00
- Livraison : Dakar + Banlieue sous 24h
- WhatsApp : ${WHATSAPP_DISPLAY}
- Paiement : Wave (${WAVE_DISPLAY}) ou Cash à la livraison

Règles :
- Réponds en 2-3 phrases maximum
- Pour commander : invite à cliquer sur "🛒 Ajouter au panier" puis "Commander"
- Suggère selon le budget du client
- Mentionne toujours que ce sont des parfums authentiques de Paris
- Ne jamais dépasser le stock indiqué

TRÈS IMPORTANT — FORMAT DES PRODUITS :
Quand tu mentionnes un produit ou une senteur du catalogue, entoure TOUJOURS son nom exact avec [[ ]]
Exemples :
- "Je vous recommande [[Collection Privée - Bakara]], une senteur boisée envoûtante ✨"
- "Nos best-sellers sont [[Phantom Paco Rabanne]] et [[Collection Prestige - Rose Oud]] 🌹"
- "Pour un cadeau, [[Coffret Collection Précieuse]] est parfait 🎁"
Le nom entre [[ ]] doit correspondre EXACTEMENT à : "Nom de Collection - Nom de Senteur" pour les collections avec senteurs, ou juste "Nom du produit" pour les produits simples.`;

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

// ─── COMPOSANTS EXTERNES ──────────────────────────────────────────────────────

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

const WaveIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, display: "block" }}>
    <rect width="24" height="24" rx="6" fill={WAVE_BLUE} />
    <path d="M3 13.5 Q 6 8.5, 9 13.5 T 15 13.5 T 21 13.5" stroke="white" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 17 Q 6 12, 9 17 T 15 17 T 21 17" stroke="white" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.45" />
  </svg>
);

const ProductCard = ({ p, senteurIdx, setSenteurIdx, onAddToCart, onToggleFavori, favoris, cibleRef }) => {
  const senteurs      = Array.isArray(p.senteurs) ? p.senteurs : null;
  const idx           = senteurIdx[p.nom] || 0;
  const senteurActive = senteurs ? senteurs[idx] : null;
  const imgAffichee   = senteurActive ? senteurActive.img : p.img;
  const stockAffiche  = senteurActive ? senteurActive.stock : (p.stock || 0);
  const fav           = favoris.includes(p.nom);
  const touchStart    = useRef(null);
  const cardRef       = useRef(null);

  useEffect(() => {
    if (cibleRef && cibleRef.current === p.nom && cardRef.current) {
      setTimeout(() => {
        cardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        cardRef.current.style.boxShadow = `0 0 0 2px ${GOLD}, 0 0 24px ${GOLD}88`;
        setTimeout(() => { if (cardRef.current) cardRef.current.style.boxShadow = ""; cibleRef.current = null; }, 1800);
      }, 300);
    }
  });

  const goPrev = (e) => { e.stopPropagation(); setSenteurIdx(prev => ({ ...prev, [p.nom]: idx === 0 ? senteurs.length - 1 : idx - 1 })); };
  const goNext = (e) => { e.stopPropagation(); setSenteurIdx(prev => ({ ...prev, [p.nom]: (idx + 1) % senteurs.length })); };
  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchStart.current === null || !senteurs) return;
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
    <div ref={cardRef} style={{ background: "#161616", border: `1px solid ${GOLD}18`, borderRadius: "16px", overflow: "hidden", display: "flex", flexDirection: "column", transition: "box-shadow 0.4s" }}>
      <div style={{ position: "relative", height: "160px", overflow: "hidden", background: "#0d0d0d" }}
        onTouchStart={senteurs?.length > 1 ? onTouchStart : undefined}
        onTouchEnd={senteurs?.length > 1   ? onTouchEnd   : undefined}>
        <img src={imgAffichee} alt={p.nom} style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
          onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
        <div style={{ display: "none", width: "100%", height: "100%", background: "linear-gradient(135deg,#1a1408,#111)", alignItems: "center", justifyContent: "center", fontSize: "48px", flexDirection: "column", gap: "8px" }}>
          <span>🌹</span>
          {senteurActive && <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>{senteurActive.nom}</span>}
        </div>
        {senteurs && senteurs.length > 1 && (<>
          <button onClick={goPrev} style={{ position: "absolute", left: "8px", top: "50%", transform: "translateY(-50%)", width: "34px", height: "34px", borderRadius: "50%", background: "rgba(0,0,0,0.6)", border: `1px solid ${GOLD}55`, color: GOLD, fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
          <button onClick={goNext} style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", width: "34px", height: "34px", borderRadius: "50%", background: "rgba(0,0,0,0.6)", border: `1px solid ${GOLD}55`, color: GOLD, fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
        </>)}
        <div style={{ position: "absolute", top: "10px", right: "10px", background: stockAffiche === 0 ? "rgba(80,80,80,0.9)" : stockAffiche <= 1 ? "rgba(192,57,43,0.9)" : stockAffiche <= 3 ? "rgba(230,126,34,0.9)" : "rgba(39,174,96,0.9)", color: "#fff", padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "700" }}>
          {stockAffiche === 0 ? "❌ Rupture" : stockAffiche <= 1 ? "⚠️ Dernier !" : stockAffiche <= 3 ? `⚡ ${stockAffiche} restants` : `✅ ${stockAffiche} en stock`}
        </div>
        <button onClick={() => onToggleFavori(p.nom)}
          style={{ position: "absolute", top: "10px", left: "10px", width: "32px", height: "32px", borderRadius: "50%", background: "rgba(0,0,0,0.55)", border: `1px solid ${fav ? "#e74c3c" : "rgba(255,255,255,0.2)"}`, color: fav ? "#e74c3c" : "rgba(255,255,255,0.5)", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
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
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div style={{ color: GOLD, fontWeight: "800", fontSize: "17px" }}>{p.prix.toLocaleString("fr-FR")}</div>
            <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px" }}>FCFA</div>
          </div>
        </div>
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", lineHeight: "1.5", marginBottom: "12px", flex: 1 }}>{p.desc}</div>
        <button onClick={() => onAddToCart(p, senteurActive)} disabled={stockAffiche === 0}
          style={{ width: "100%", padding: "10px", borderRadius: "12px", background: stockAffiche === 0 ? "rgba(255,255,255,0.08)" : `linear-gradient(135deg,${GOLD},#a07830)`, color: stockAffiche === 0 ? "rgba(255,255,255,0.3)" : "#0a0a0a", fontSize: "13px", fontWeight: "700", border: "none", cursor: stockAffiche === 0 ? "not-allowed" : "pointer" }}>
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
  const [cart, setCart]               = useState(() => safeLS.get("pdz_cart",    []));
  const [favoris, setFavoris]         = useState(() => safeLS.get("pdz_favoris", []));
  const [toast, setToast]             = useState("");
  const [senteurIdx, setSenteurIdx]   = useState({});
  const [paymentMode, setPaymentMode] = useState("wave");
  const [orderSent, setOrderSent]     = useState(false);

  const endRef        = useRef(null);
  const overlayEndRef = useRef(null);

  useEffect(() => { safeLS.set("pdz_cart",    cart);   }, [cart]);
  useEffect(() => { safeLS.set("pdz_favoris", favoris); }, [favoris]);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages.length]);
  useEffect(() => { if (chatOverlay) overlayEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages.length, chatOverlay]);
  useEffect(() => { setOrderSent(false); }, [cart, paymentMode]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2200); };

  const addToCart = (produit, senteurChoisie = null) => {
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
  };

  const updateQty      = (cle, d) => setCart(prev => prev.map(c => c.cle !== cle ? c : { ...c, qty: Math.max(1, Math.min(c.qty + d, c.stock)) }));
  const removeFromCart = (cle)    => setCart(prev => prev.filter(c => c.cle !== cle));
  const clearCart      = ()       => { setCart([]); showToast("🗑️ Panier vidé"); };
  const toggleFavori   = (nom)    => setFavoris(prev => prev.includes(nom) ? prev.filter(n => n !== nom) : [...prev, nom]);

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const cartTotal = cart.reduce((s, c) => s + c.prix * c.qty, 0);

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

  const send = async (text) => {
    const msg = (typeof text === "string" ? text : input).trim();
    if (!msg || loading) return;
    setInput("");

    if (msg.toLowerCase().includes("catalogue")) {
      setActivePage("catalogue");
      setChatOverlay(false);
      return;
    }

    const next = [...messages, { role: "user", content: msg }];
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
  };

  const openWave = () => {
    const url = `https://pay.wave.com/m/${WAVE_MERCHANT_ID}/c/sn/?amount=${cartTotal}`;
    window.open(url, "_blank");
    showToast(`💸 Wave ouvert • ${cartTotal.toLocaleString("fr-FR")} FCFA pré-rempli`);
  };

  const sendOrder = () => {
    if (!cart.length) return;
    const lignes = cart.map(item => {
      const lb = item.senteur ? `${item.nom} - ${item.senteur}` : item.nom;
      const vl = item.volume  ? ` ${item.volume}ml` : "";
      return `• ${item.qty}× ${lb}${vl} — ${(item.prix * item.qty).toLocaleString("fr-FR")} FCFA`;
    }).join("%0A");
    const paiementTxt = paymentMode === "wave"
      ? `💳 Paiement : Wave Business (je paie maintenant en ligne)`
      : `💵 Paiement : Cash a la livraison`;
    const txt = `Bonjour Parfumerie De La Zac ! 🖤%0AJe souhaite commander :%0A%0A👤 Nom : ${order.name}%0A📱 Tel : ${order.phone}%0A📍 Quartier : ${order.quartier}%0A%0A🌹 Mes articles :%0A${lignes}%0A%0A💰 Total : ${cartTotal.toLocaleString("fr-FR")} FCFA%0A${paiementTxt}%0A%0AMerci ✨`;
    window.open(`https://wa.me/${WHATSAPP}?text=${txt}`, "_blank");
  };

  const handleFinaliser = () => {
    if (paymentMode === "wave" && orderSent) { openWave(); return; }
    sendOrder();
    if (paymentMode === "wave") setOrderSent(true);
  };

  const coordsOk        = order.name && order.phone && order.quartier;
  const canFinaliser    = coordsOk && cart.length > 0;
  const finaliserLabel  =
    paymentMode === "wave" && !orderSent ? "💬 Envoyer ma commande sur WhatsApp" :
    paymentMode === "wave" &&  orderSent ? `Payer ${cartTotal.toLocaleString("fr-FR")} FCFA sur Wave` :
                                           "💬 Finaliser sur WhatsApp";
  const finaliserBg     =
    paymentMode === "wave" && orderSent ? `linear-gradient(135deg,${WAVE_BLUE},#0ea5d4)` :
                                          `linear-gradient(135deg,${WA_GREEN},#1a9e4a)`;

  const produitCibleRef = useRef(null);

  const goToProduit = (label) => {
    const [nomProduit, nomSenteur] = label.split(" - ").map(s => s.trim());
    const produit = PRODUITS.find(p => p.nom === nomProduit);
    if (!produit) return;
    if (nomSenteur && Array.isArray(produit.senteurs)) {
      const idx = produit.senteurs.findIndex(s => s.nom === nomSenteur);
      if (idx !== -1) setSenteurIdx(prev => ({ ...prev, [produit.nom]: idx }));
    }
    produitCibleRef.current = nomProduit;
    setCatFilter("Tous");
    setSearch("");
    setActivePage("catalogue");
    setChatOverlay(false);
  };

  const parseMessage = (text, small) => {
    const parts = text.split(/\[\[(.+?)\]\]/g);
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        return (
          <button key={i} onClick={() => goToProduit(part)}
            style={{ display: "inline-block", margin: "2px 3px", padding: "3px 10px", borderRadius: "20px", background: `${GOLD}22`, border: `1px solid ${GOLD}66`, color: GOLD, fontSize: small ? "13px" : "14px", fontWeight: "700", cursor: "pointer", verticalAlign: "middle", lineHeight: "1.5" }}>
            ✨ {part}
          </button>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  const renderMessages = (small) => (
    <>
      {messages.map((msg, i) => (
        <div key={i} className="msg" style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", alignItems: "flex-end", gap: "8px" }}>
          {msg.role === "assistant" && <Logo size={small ? 28 : 32} />}
          <div style={{ maxWidth: "75%", padding: "11px 15px", borderRadius: msg.role === "user" ? "20px 20px 4px 20px" : "20px 20px 20px 4px", background: msg.role === "user" ? `linear-gradient(135deg,${WA_GREEN},${WA_GREEN}bb)` : "rgba(255,255,255,0.07)", color: msg.role === "user" ? "#fff" : "rgba(255,255,255,0.9)", fontSize: small ? "14px" : "15.5px", lineHeight: "1.8", border: msg.role === "assistant" ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
            {msg.role === "assistant" ? parseMessage(msg.content, small) : msg.content}
          </div>
        </div>
      ))}
      {loading && (
        <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
          <Logo size={small ? 28 : 32} />
          <div style={{ padding: "12px 16px", borderRadius: "20px 20px 20px 4px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <DotLoader />
          </div>
        </div>
      )}
    </>
  );

  const renderInput = (small) => (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <div style={{ flex: 1, display: "flex", alignItems: "center", background: "rgba(255,255,255,0.07)", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.1)", padding: "0 16px", gap: "8px" }}>
        <span>✍️</span>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Votre message à Matel..."
          style={{ flex: 1, padding: small ? "11px 0" : "12px 0", background: "transparent", border: "none", color: "#fff", fontSize: "16px", fontFamily: "inherit" }}
        />
      </div>
      <button onClick={() => send()} disabled={loading}
        style={{ width: small ? "44px" : "48px", height: small ? "44px" : "48px", borderRadius: "50%", background: `linear-gradient(135deg,${GOLD},#a07830)`, color: BG, fontSize: small ? "18px" : "20px", fontWeight: "bold", flexShrink: 0, opacity: loading ? 0.5 : 1, boxShadow: `0 4px 20px ${GOLD}55`, border: "none", cursor: "pointer" }}>➤</button>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: BG, display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "'SF Pro Display',-apple-system,sans-serif" }}>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes dot{0%,80%,100%{transform:scale(0.6);opacity:0.3}40%{transform:scale(1);opacity:1}}
        @keyframes glow{0%,100%{box-shadow:0 0 15px #C9A84C33}50%{box-shadow:0 0 30px #C9A84C66}}
        @keyframes pulseBlue{0%,100%{box-shadow:0 0 0 0 #1DC3F066}50%{box-shadow:0 0 0 8px #1DC3F000}}
        .msg{animation:fadeUp 0.3s ease forwards}
        .tbtn{transition:all 0.2s;cursor:pointer;border:none}
        .tbtn:hover{transform:translateY(-2px);opacity:0.9}
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
              {pg.id === "order"   && cartCount > 0    && <span style={{ position: "absolute", top: "-6px", right: "-6px", background: "#c0392b", color: "#fff", borderRadius: "50%", minWidth: "20px", height: "20px", padding: "0 5px", fontSize: "11px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>{cartCount}</span>}
              {pg.id === "favoris" && favoris.length > 0 && <span style={{ position: "absolute", top: "-6px", right: "-6px", background: "#e74c3c", color: "#fff", borderRadius: "50%", minWidth: "20px", height: "20px", padding: "0 5px", fontSize: "11px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>{favoris.length}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* CHAT */}
      {activePage === "chat" && (
        <>
          <div style={{ width: "100%", maxWidth: "480px", flex: 1, padding: "16px 20px", display: "flex", flexDirection: "column", gap: "14px", overflowY: "auto", minHeight: "350px", maxHeight: "45vh" }}>
            {renderMessages(false)}
            <div ref={endRef} />
          </div>
          <div style={{ width: "100%", maxWidth: "480px", padding: "0 20px 10px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {["Voir le catalogue 📦", "Meilleure vente ⭐", "Offrir un cadeau 🎁", "Commander 🛍️"].map((q, i) => (
              <button key={i} className="tbtn" onClick={() => send(q)}
                style={{ padding: "7px 12px", borderRadius: "20px", border: `1px solid ${GOLD}30`, background: `rgba(201,168,76,0.08)`, color: "rgba(255,255,255,0.7)", fontSize: "13px" }}>{q}</button>
            ))}
          </div>
          <div style={{ width: "100%", maxWidth: "480px", padding: "10px 20px 20px", background: "rgba(255,255,255,0.03)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {renderInput(false)}
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
                <ProductCard key={p.nom} p={p} senteurIdx={senteurIdx} setSenteurIdx={setSenteurIdx}
                  onAddToCart={addToCart} onToggleFavori={toggleFavori} favoris={favoris} cibleRef={produitCibleRef} />
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
                  {cart.map(item => (
                    <div key={item.cle} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${GOLD}15`, borderRadius: "12px", padding: "12px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px", gap: "10px" }}>
                        {item.img && <img src={item.img} alt="" style={{ width: "44px", height: "44px", borderRadius: "8px", objectFit: "cover", flexShrink: 0 }} onError={e => { e.target.style.display = "none"; }} />}
                        <div style={{ flex: 1 }}>
                          <div style={{ color: "#fff", fontWeight: "700", fontSize: "13px" }}>{item.nom}</div>
                          {item.senteur && <div style={{ color: GOLD, fontSize: "11px", fontWeight: "600", marginTop: "2px" }}>✨ {item.senteur}{item.volume ? ` • ${item.volume}ml` : ""}</div>}
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
                          <div style={{ color: GOLD, fontWeight: "800", fontSize: "15px" }}>{(item.prix * item.qty).toLocaleString("fr-FR")} <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)" }}>FCFA</span></div>
                          {item.qty > 1 && <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "10px" }}>{item.prix.toLocaleString("fr-FR")} × {item.qty}</div>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="tbtn" onClick={clearCart} style={{ width: "100%", padding: "9px", borderRadius: "10px", background: "rgba(192,57,43,0.1)", border: "1px solid rgba(192,57,43,0.25)", color: "#e74c3c", fontSize: "13px", fontWeight: "600", marginBottom: "16px" }}>
                  🗑️ Vider le panier
                </button>
                <div style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}44`, borderRadius: "12px", padding: "14px 16px", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ color: GOLD, fontSize: "14px", fontWeight: "700" }}>💰 Total</div>
                  <div style={{ color: GOLD, fontSize: "20px", fontWeight: "800" }}>{cartTotal.toLocaleString("fr-FR")} <span style={{ fontSize: "12px" }}>FCFA</span></div>
                </div>

                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", marginBottom: "10px", fontWeight: "600" }}>Mode de paiement</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
                  <button onClick={() => setPaymentMode("wave")}
                    style={{ padding: "14px 8px", borderRadius: "14px", border: `1.5px solid ${paymentMode === "wave" ? WAVE_BLUE : "rgba(255,255,255,0.1)"}`, background: paymentMode === "wave" ? `${WAVE_BLUE}1f` : "rgba(255,255,255,0.04)", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    <WaveIcon size={32} />
                    <div style={{ color: paymentMode === "wave" ? WAVE_BLUE : "rgba(255,255,255,0.75)", fontSize: "13px", fontWeight: "800" }}>Wave</div>
                    <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "10px" }}>Paiement immédiat</div>
                  </button>
                  <button onClick={() => setPaymentMode("livraison")}
                    style={{ padding: "14px 8px", borderRadius: "14px", border: `1.5px solid ${paymentMode === "livraison" ? GOLD : "rgba(255,255,255,0.1)"}`, background: paymentMode === "livraison" ? `${GOLD}1f` : "rgba(255,255,255,0.04)", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                    <div style={{ fontSize: "24px" }}>💵</div>
                    <div style={{ color: paymentMode === "livraison" ? GOLD : "rgba(255,255,255,0.75)", fontSize: "13px", fontWeight: "800" }}>À la livraison</div>
                    <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "10px" }}>Cash</div>
                  </button>
                </div>

                {paymentMode === "wave" && (
                  <div style={{ background: `${WAVE_BLUE}10`, border: `1px solid ${WAVE_BLUE}44`, borderRadius: "14px", padding: "16px", marginBottom: "18px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                      <WaveIcon size={24} />
                      <span style={{ color: WAVE_BLUE, fontSize: "14px", fontWeight: "800" }}>Paiement Wave Business</span>
                      {orderSent && <span style={{ marginLeft: "auto", background: "#27ae60", color: "#fff", fontSize: "10px", fontWeight: "800", padding: "3px 10px", borderRadius: "20px" }}>✅ Commande envoyée</span>}
                    </div>
                    <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: "10px", padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", border: `1px dashed ${WAVE_BLUE}66`, marginBottom: "10px" }}>
                      <div>
                        <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "10px", fontWeight: "700", letterSpacing: "0.5px", marginBottom: "4px" }}>💰 MONTANT À PAYER</div>
                        <div style={{ color: "#fff", fontSize: "20px", fontWeight: "800" }}>{cartTotal.toLocaleString("fr-FR")} <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>FCFA</span></div>
                      </div>
                      <div style={{ background: `${WAVE_BLUE}33`, color: WAVE_BLUE, fontSize: "10px", fontWeight: "800", padding: "5px 10px", borderRadius: "20px", textAlign: "center", lineHeight: "1.3" }}>AUTO<br/>REMPLI ✓</div>
                    </div>
                    <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "11px", lineHeight: "1.5" }}>
                      💡 <strong>1.</strong> Envoyez votre commande sur WhatsApp • <strong>2.</strong> Revenez ici et cliquez sur "Payer sur Wave" • <strong>3.</strong> Validez le paiement ✨
                    </div>
                  </div>
                )}

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
                <button className="tbtn" onClick={handleFinaliser} disabled={!canFinaliser}
                  style={{ width: "100%", padding: "16px", borderRadius: "16px", background: canFinaliser ? finaliserBg : "rgba(255,255,255,0.1)", color: canFinaliser ? "#fff" : "rgba(255,255,255,0.3)", fontSize: "15px", fontWeight: "800", border: "none", cursor: canFinaliser ? "pointer" : "not-allowed", animation: paymentMode === "wave" && orderSent && canFinaliser ? "pulseBlue 1.8s ease-in-out infinite" : "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                  {paymentMode === "wave" && orderSent && <WaveIcon size={22} />}
                  <span>{finaliserLabel}</span>
                </button>
                {paymentMode === "wave" && orderSent && (
                  <button className="tbtn" onClick={() => setOrderSent(false)}
                    style={{ width: "100%", padding: "9px", borderRadius: "12px", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)", fontSize: "12px", marginTop: "8px", border: "1px solid rgba(255,255,255,0.08)" }}>
                    ↻ Renvoyer la commande WhatsApp
                  </button>
                )}
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
              { icon: <WaveIcon size={24} />, label: "Wave", value: WAVE_DISPLAY },
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
              style={{ width: "100%", padding: "14px", borderRadius: "16px", background: `linear-gradient(135deg,${WA_GREEN},#1a9e4a)`, color: "#fff", fontSize: "15px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              <span>💬</span> WhatsApp
            </button>
            <button className="tbtn" onClick={() => setActivePage("order")}
              style={{ width: "100%", padding: "14px", borderRadius: "16px", background: `linear-gradient(135deg,${GOLD},#a07830)`, color: "#0a0a0a", fontSize: "16px", fontWeight: "700" }}>
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
        <div style={{ position: "fixed", bottom: "100px", left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#1a9e4a,#25D366)", color: "#fff", padding: "12px 20px", borderRadius: "30px", fontSize: "14px", fontWeight: "600", zIndex: 1100, animation: "fadeUp 0.3s ease forwards", maxWidth: "90%", textAlign: "center" }}>
          {toast}
        </div>
      )}

      {/* BOUTON FLOTTANT */}
      {activePage !== "chat" && !chatOverlay && (
        <button onClick={() => setChatOverlay(true)}
          style={{ position: "fixed", bottom: "24px", right: "24px", width: "60px", height: "60px", borderRadius: "50%", background: `linear-gradient(135deg,${GOLD},#a07830)`, border: "none", cursor: "pointer", boxShadow: `0 8px 24px ${GOLD}66`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", zIndex: 999, animation: "glow 2.5s ease-in-out infinite" }}>
          💬
        </button>
      )}

      {/* CHAT OVERLAY */}
      {chatOverlay && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 1000, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
          <div style={{ width: "100%", maxWidth: "480px", height: "85vh", background: BG, borderRadius: "20px 20px 0 0", border: `1px solid ${GOLD}33`, display: "flex", flexDirection: "column" }}>
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
              {renderMessages(true)}
              <div ref={overlayEndRef} />
            </div>
            <div style={{ padding: "10px 18px 16px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              {renderInput(true)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages, system } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages invalides" });
  }

  // Nettoyer : Anthropic exige que le 1er message soit "user"
  // On retire tout message assistant au début (message de bienvenue)
  let cleanMessages = [...messages];
  while (cleanMessages.length > 0 && cleanMessages[0].role !== "user") {
    cleanMessages.shift();
  }

  // Filtrer les messages vides
  cleanMessages = cleanMessages.filter(
    m => m.content && m.content.trim().length > 0
  );

  if (cleanMessages.length === 0) {
    return res.status(400).json({ error: "Aucun message valide" });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        system: system,
        messages: cleanMessages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error("Erreur API:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}

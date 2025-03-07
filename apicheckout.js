const mercadopago = require("mercadopago");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  mercadopago.configure({
    access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
  });

  const preference = {
    items: [
      {
        title: req.body.title,
        unit_price: Number(req.body.price),
        quantity: 1,
        currency_id: "ARS",
      },
    ],
    back_urls: {
      success: "https://tu-frontend.github.io/success.html",
      failure: "https://tu-frontend.github.io/failure.html",
      pending: "https://tu-frontend.github.io/pending.html",
    },
    auto_return: "approved",
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    res.status(200).json({ id: response.body.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

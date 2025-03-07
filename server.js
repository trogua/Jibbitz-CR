const express = require("express");
const cors = require("cors");
const MercadoPago = require("mercadopago");

const app = express();
app.use(express.json());
app.use(cors());

MercadoPago.configure({
    access_token: "TEST-ce494564-06ec-418f-9348-4d798239d13b"
});

app.post("/crear-preferencia", async (req, res) => {
    try {
        const preference = {
            items: [
                {
                    title: "Producto de prueba",
                    unit_price: 100,
                    quantity: 1
                }
            ],
            payer: {
                name: req.body.nombre,
                email: req.body.email
            },
            back_urls: {
                success: "https://tutienda.com/success",
                failure: "https://tutienda.com/failure",
                pending: "https://tutienda.com/pending"
            },
            auto_return: "approved"
        };

        const response = await MercadoPago.preferences.create(preference);
        res.json({ preferenceId: response.body.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});

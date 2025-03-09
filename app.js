const express = require('express');
const mercadopago = require('mercadopago');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 3000;

// Configurar MercadoPago en la versión 2.x.x
const mp = new mercadopago.MercadoPagoConfig({
    accessToken: 'APP_USR-4431373143893500-030702-862ae24038e78fc326d0a9246dbc69d2-59967965'
});

const preferenceClient = new mercadopago.Preference(mp);

// Middleware para parsear formularios y servir archivos estáticos
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para mostrar el formulario de pago
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para crear la preferencia de pago
app.post('/create_payment', async (req, res) => {
    try {
        const { title, unit_price, quantity } = req.body;

        const preference = {
            body: {
                items: [
                    {
                        title: title,
                        quantity: parseInt(quantity),
                        unit_price: parseFloat(unit_price),
                        currency_id: 'MXN'
                    }
                ],
                back_urls: {
                    success: 'https://tu-sitio.com/success',
                    pending: 'https://tu-sitio.com/pending',
                    failure: 'https://tu-sitio.com/failure'
                },
                auto_return: 'approved'
            }
        };

        // Crear la preferencia con la nueva sintaxis
        const response = await preferenceClient.create(preference);
        const payment_link = response.init_point;

        // Renderizar el HTML con el enlace
        
        res.redirect(payment_link);
    } catch (error) {
        console.error("Error al crear la preferencia:", error);
        res.status(500).send(`Error al crear la preferencia: ${error.message}`);
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

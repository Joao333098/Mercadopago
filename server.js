const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/auth/callback', async (req, res) => {
    const { code } = req.query;

    try {
        const response = await axios.post('https://api.mercadopago.com/oauth/token', null, {
            params: {
                client_id: '1487720379742562',
                client_secret: '2u4k9zMnAvmyY7eQwExZjx511tGPTnv3',
                code: code,
                grant_type: 'authorization_code',
                redirect_uri: 'https://your-replit-url.repl.co/auth/callback'
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const accessToken = response.data.access_token;
        res.send(`
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Autorização Mercado Pago</title>
                <style>
                    body {
                        background-color: #f8f9fa;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                    }
                    .container {
                        text-align: center;
                        background: #ffffff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }
                    .token {
                        background-color: #e9ecef;
                        border: 1px solid #ced4da;
                        padding: 10px;
                        border-radius: 5px;
                        margin-top: 20px;
                        word-break: break-all;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1 class="mb-4">Autorização Mercado Pago</h1>
                    <p class="lead">Seu token de acesso é:</p>
                    <div class="token">
                        ${accessToken}
                    </div>
                    <a href="/" style="display: inline-block; margin-top: 20px; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007bff; border: none; border-radius: 5px; text-decoration: none;">Voltar</a>
                </div>
            </body>
            </html>
        `);
    } catch (error) {
        res.status(500).send('Erro ao obter o token de acesso.');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
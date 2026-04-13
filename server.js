const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// onde ficam as fotos
app.use('/fotos', express.static(path.join(__dirname, 'fotos')));

// lista as fotos automaticamente
app.get('/api/fotos', (req, res) => {
  const pastaFotos = path.join(__dirname, 'fotos');
  fs.readdir(pastaFotos, (err, arquivos) => {
    if (err) return res.status(500).json({ error: "Não foi possível ler a pasta fotos" });
    const imagens = arquivos.filter(f =>
      f.toLowerCase().endsWith('.jpg') ||
      f.toLowerCase().endsWith('.jpeg') ||
      f.toLowerCase().endsWith('.png') ||
      f.toLowerCase().endsWith('.gif')
    );
    res.json(imagens);
  });
});

// serve o index.html
app.use(express.static(__dirname));

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando: http://localhost:${PORT}`);
});
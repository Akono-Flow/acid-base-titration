const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const appsDir = path.join(__dirname, 'apps');
const templatesDir = path.join(__dirname, 'templates');
const publicDir = path.join(__dirname, 'public');

// Serve static assets
app.use('/css', express.static(path.join(publicDir, 'css')));
app.use('/js', express.static(path.join(publicDir, 'js')));
app.use('/app', express.static(appsDir));

// Home Page: Dynamic App Gallery
app.get('/', (req, res) => {
  const indexTemplate = fs.readFileSync(path.join(templatesDir, 'index-template.html'), 'utf-8');

  const apps = fs.readdirSync(appsDir).filter(folder => {
    const configPath = path.join(appsDir, folder, 'config.json');
    return fs.existsSync(configPath);
  }).map(folder => {
    const config = JSON.parse(fs.readFileSync(path.join(appsDir, folder, 'config.json')));
    return {
      ...config,
      route: `/app/${folder}`
    };
  });

  const sidebarLinks = apps.map(app => `
    <li><a href="${app.route}/${app.id}"><i class="${app.icon}"></i>${app.name}</a></li>
  `).join('\n');

  const cardsHtml = apps.map(app => `
    <div class="card">
      <i class="${app.icon}" style="font-size: 24px; color: #3498db; margin-bottom: 15px;"></i>
      <h3>${app.name}</h3>
      <p>${app.description}</p>
      <a href="${app.route}/${app.id}" class="card-button">Launch <i class="fas fa-arrow-right"></i></a>
    </div>
  `).join('\n');

  const finalHtml = indexTemplate
    .replace(/<!--\s*DYNAMIC-LINKS\s*-->/, sidebarLinks)
    .replace(/<!--\s*DYNAMIC-CARDS\s*-->/, cardsHtml);

  res.send(finalHtml);
});

// Start server
app.listen(PORT, () => {
  console.log(`SPA Gallery running at http://localhost:${PORT}`);
});

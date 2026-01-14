# 🌐 COMMUNITIES INTEGRATION GUIDE

## Files Created:
1. ✅ `communities.js` - Data for 40+ tech communities
2. ✅ `communities-app.js` - JavaScript functionality
3. ✅ `communities.css` - Styling
4. ✅ `communities-section.html` - HTML template

## Integration Steps:

### Step 1: Add CSS Link (in `<head>` section)
```html
<link rel="stylesheet" href="communities.css">
```

### Step 2: Add Communities Section (after Research section, before Satellite section)
Copy content from `communities-section.html` and paste it in index.html after the Research section.

### Step 3: Add JavaScript Files (before `</body>`)
```html
<script src="communities.js"></script>
<script src="communities-app.js"></script>
```

### Step 4: Update Stats Card (optional)
Add a new stat card in the stats grid:
```html
<div class="stat-card">
  <span class="stat-card__number">40+</span>
  <span class="stat-card__label">🌐 COMMUNITIES</span>
</div>
```

## Complete Script Order:
```html
<!-- At the end of body, before </body> -->
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js"></script>
<script src="quiz-questions.js"></script>
<script src="intelligence-data.js"></script>
<script src="indian-labs.js"></script>
<script src="communities.js"></script>
<script src="app.js"></script>
<script src="communities-app.js"></script>
```

## Features:
- ✅ 40+ Tech Communities
- ✅ 6 Discord Servers
- ✅ 8 Telegram Groups
- ✅ 5 WhatsApp Groups
- ✅ 6 LinkedIn Groups
- ✅ 7 Reddit Communities
- ✅ 4 YouTube Channels
- ✅ GitHub Organizations
- ✅ Tech Forums

## Platforms Covered:
1. **Discord** - Real-time chat servers
2. **Telegram** - Quick messaging groups
3. **WhatsApp** - Mobile communities
4. **LinkedIn** - Professional networking
5. **Reddit** - Discussion forums
6. **YouTube** - Educational channels
7. **GitHub** - Open source orgs
8. **Forums** - Q&A platforms

## Filter Options:
- All Communities
- Discord
- Telegram
- WhatsApp
- LinkedIn
- Reddit
- YouTube

## Community Card Features:
- Community name
- Member count
- Description
- Topics covered
- Language
- Active status
- Direct join link

## Responsive Design:
- Desktop: 3-4 cards per row
- Tablet: 2-3 cards per row
- Mobile: 1 card per row

## Next Steps:
1. Open `index.html`
2. Add CSS link in `<head>`
3. Copy HTML from `communities-section.html` to appropriate location
4. Add script tags before `</body>`
5. Save and test!

---

**Created by:** Tech Mastery Lab Team
**Date:** January 14, 2026
**Status:** Ready for Integration

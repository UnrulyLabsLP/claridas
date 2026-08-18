      const geo = JSON.parse(document.getElementById('claridas-geo')?.textContent || '[]');
      const R = 3959; // miles
      const rad = (x) => (x * Math.PI) / 180;
      const hav = (la1, lo1, la2, lo2) => {
        const dLa = rad(la2 - la1), dLo = rad(lo2 - lo1);
        const s = Math.sin(dLa / 2) ** 2 + Math.cos(rad(la1)) * Math.cos(rad(la2)) * Math.sin(dLo / 2) ** 2;
        return 2 * R * Math.asin(Math.sqrt(s));
      };
      const byId = Object.fromEntries(geo.map((g) => [g.id, g.places]));
      const zipEl = document.getElementById('zip');
      const setBtn = document.getElementById('zipset');
      const clearBtn = document.getElementById('zipclear');
      const status = document.getElementById('zipstatus');
      const list = document.getElementById('articlelist');

      function scoreFor(places, loc) {
        let best = Infinity, label = '';
        for (const pl of places || []) {
          if (pl.statewide && pl.state === loc.state) return { dist: 0, label: `Statewide — ${pl.state}` };
          if (typeof pl.lat === 'number') {
            const d = hav(loc.lat, loc.lng, pl.lat, pl.lng);
            if (d < best) { best = d; label = `${Math.round(d)} mi away — ${pl.city || pl.state}`; }
          }
        }
        return { dist: best, label };
      }

      function apply(loc) {
        const items = [...list.querySelectorAll('.story-item')];
        const scored = items.map((el) => ({ el, s: scoreFor(byId[el.dataset.id], loc) }));
        scored.sort((a, b) => a.s.dist - b.s.dist);
        let near = 0;
        for (const { el, s } of scored) {
          list.appendChild(el); // reorder nearest-first
          const tag = el.querySelector('.geo-label');
          if (s.dist <= 250) {
            near++;
            tag.textContent = s.label;
            tag.hidden = false;
            el.style.display = '';
          } else {
            tag.hidden = true;
            el.style.display = 'none'; // hide far-away coverage
          }
        }
        clearBtn.hidden = false;
        if (near > 0) {
          status.textContent = `Showing ${near} stor${near === 1 ? 'y' : 'ies'} nearest ${loc.city}, ${loc.state}.`;
        } else {
          // honest empty state — reveal all as "elsewhere"
          for (const { el, s } of scored) { el.style.display = ''; const t = el.querySelector('.geo-label'); t.textContent = s.label || 'elsewhere'; t.hidden = false; }
          status.textContent = `No Claridas local coverage within 250 miles of ${loc.city}, ${loc.state} yet — we're expanding. Everything we have, nearest first:`;
        }
      }

      async function locate(zip) {
        status.textContent = 'Locating…';
        try {
          const r = await fetch(`https://api.zippopotam.us/us/${zip}`);
          if (!r.ok) { status.textContent = "That ZIP didn't resolve — check the digits."; return; }
          const d = await r.json();
          const p = d.places[0];
          const loc = { city: p['place name'], state: p['state abbreviation'], lat: +p.latitude, lng: +p.longitude };
          localStorage.setItem('claridas_zip', zip);
          try { localStorage.setItem('claridas_loc', JSON.stringify({ lat: loc.lat, lng: loc.lng, state: loc.state, src: 'zip' })); } catch (e) {}
          apply(loc);
        } catch (e) { status.textContent = 'Location lookup is unavailable right now.'; }
      }

      function reset() {
        localStorage.removeItem('claridas_zip');
        zipEl.value = '';
        clearBtn.hidden = true;
        status.textContent = '';
        for (const el of list.querySelectorAll('.story-item')) { el.style.display = ''; el.querySelector('.geo-label').hidden = true; }
      }

      setBtn.addEventListener('click', () => { const z = (zipEl.value || '').trim(); if (/^\d{5}$/.test(z)) locate(z); else status.textContent = 'Enter a 5-digit ZIP code.'; });
      zipEl.addEventListener('keydown', (e) => { if (e.key === 'Enter') setBtn.click(); });
      clearBtn.addEventListener('click', reset);
      const saved = localStorage.getItem('claridas_zip');
      if (saved && /^\d{5}$/.test(saved)) { zipEl.value = saved; locate(saved); }
    

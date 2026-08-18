  // Location-gated Local tab (Ryan-directed): hide Local if no local coverage within 30 miles.
  const localPlaces = JSON.parse(document.getElementById('claridas-local-places')?.textContent || '[]');
  const R = 3959, RADIUS = 30;                 // miles
  const rad = (x) => (x * Math.PI) / 180;
  const hav = (la1, lo1, la2, lo2) => {
    const dLa = rad(la2 - la1), dLo = rad(lo2 - lo1);
    const s = Math.sin(dLa / 2) ** 2 + Math.cos(rad(la1)) * Math.cos(rad(la2)) * Math.sin(dLo / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(s));
  };
  const localEl = document.querySelector('.nav-local');
  function inRange(places, loc) {
    for (const p of places || []) {
      if (typeof p.lat !== 'number') continue;
      const lim = p.statewide ? 200 : RADIUS;   // statewide ≈ centroid radius; city = 30mi
      if (hav(loc.lat, loc.lng, p.lat, p.lng) <= lim) return true;
    }
    return false;
  }
  function gate(loc) {
    const noLocalAnywhere = !inRange(localPlaces, loc);
    // 1) nav tab + homepage "Local" beat tile: hide if NO local coverage anywhere is in range
    if (localEl && noLocalAnywhere) localEl.style.display = 'none';
    if (noLocalAnywhere) document.querySelectorAll('.local-beat').forEach((el) => { el.style.display = 'none'; });
    // 2) local articles in the main feed: hide each whose own place(s) are out of range
    document.querySelectorAll('.local-item').forEach((el) => {
      let places = [];
      try { places = JSON.parse(el.getAttribute('data-places') || '[]'); } catch (e) {}
      if (!inRange(places, loc)) el.style.display = 'none';
    });
  }
  // Run the gate AFTER the DOM is parsed — this script sits in the masthead (top of body),
  // but .local-item articles are lower in the page and don't exist yet during parse.
  function runGate(loc) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => gate(loc));
    else gate(loc);
  }
  let loc = null;
  try { loc = JSON.parse(localStorage.getItem('claridas_loc') || 'null'); } catch (e) {}
  if (loc && typeof loc.lat === 'number') {
    runGate(loc);
  } else if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => { const l = { lat: pos.coords.latitude, lng: pos.coords.longitude, src: 'geo' }; try { localStorage.setItem('claridas_loc', JSON.stringify(l)); } catch (e) {} runGate(l); },
      () => { /* denied/unavailable → leave Local visible with its ZIP prompt */ },
      { timeout: 8000, maximumAge: 86400000 }
    );
  }

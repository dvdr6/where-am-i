(function () {

  const terminalOutput = document.getElementById('terminalOutput');
  let termLines = [];
  let terminalReady = false;

  function addTermLine(key, val, isSection) {
    const div = document.createElement('div');
    if (isSection) {
      div.className = 't-line';
      div.innerHTML = `<span class="t-section">— ${key} —</span>`;
    } else {
      div.className = 't-line';
      div.innerHTML = `<span class="t-prompt">$</span><span class="t-key">${key}</span><span class="t-val">${val}</span>`;
    }
    terminalOutput.appendChild(div);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function addCursor() {
    const existing = terminalOutput.querySelector('.cursor');
    if (existing) existing.remove();
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    terminalOutput.appendChild(cursor);
  }

  function setCard(id, value) {
    const valEl = document.getElementById('val-' + id);
    if (valEl) {
      valEl.textContent = value;
      valEl.classList.remove('skeleton');
    }
  }

  function setMeta(id, value) {
    const el = document.getElementById('val-' + id);
    if (el) el.textContent = value;
  }

  function detectBrowser(ua) {
    if (/Edg\//.test(ua)) return 'Microsoft Edge';
    if (/OPR\/|Opera/.test(ua)) return 'Opera';
    if (/Chrome\//.test(ua) && !/Chromium/.test(ua)) return 'Google Chrome';
    if (/Chromium/.test(ua)) return 'Chromium';
    if (/Firefox\//.test(ua)) return 'Mozilla Firefox';
    if (/Safari\//.test(ua) && !/Chrome/.test(ua)) return 'Apple Safari';
    if (/MSIE|Trident/.test(ua)) return 'Internet Explorer';
    return 'Unknown Browser';
  }

  function detectBrowserVersion(ua) {
    let match;
    if (/Edg\/(\S+)/.test(ua)) return 'Edge ' + ua.match(/Edg\/(\S+)/)[1];
    if (/OPR\/(\S+)/.test(ua)) return 'Opera ' + ua.match(/OPR\/(\S+)/)[1];
    if (/Firefox\/(\S+)/.test(ua)) return 'Firefox ' + ua.match(/Firefox\/(\S+)/)[1];
    if (/Chrome\/(\S+)/.test(ua)) return 'Chrome ' + ua.match(/Chrome\/(\S+)/)[1];
    if (/Safari\/(\S+)/.test(ua) && /Version\/(\S+)/.test(ua)) return 'Safari ' + ua.match(/Version\/(\S+)/)[1];
    return detectBrowser(ua);
  }

  function detectOS(ua) {
    if (/Windows NT 10/.test(ua)) return 'Windows 10/11';
    if (/Windows NT 6\.3/.test(ua)) return 'Windows 8.1';
    if (/Windows NT 6\.1/.test(ua)) return 'Windows 7';
    if (/Windows/.test(ua)) return 'Windows';
    if (/Mac OS X ([\d_]+)/.test(ua)) {
      const v = ua.match(/Mac OS X ([\d_]+)/)[1].replace(/_/g, '.');
      return 'macOS ' + v;
    }
    if (/Android ([\d.]+)/.test(ua)) return 'Android ' + ua.match(/Android ([\d.]+)/)[1];
    if (/iPhone OS ([\d_]+)/.test(ua)) return 'iOS ' + ua.match(/iPhone OS ([\d_]+)/)[1].replace(/_/g, '.');
    if (/iPad/.test(ua)) return 'iPadOS';
    if (/Linux/.test(ua)) return 'Linux';
    if (/CrOS/.test(ua)) return 'ChromeOS';
    return 'Unknown OS';
  }

  function detectDevice(ua) {
    if (/iPhone/.test(ua)) return 'iPhone';
    if (/iPad/.test(ua)) return 'iPad';
    if (/Android/.test(ua) && /Mobile/.test(ua)) return 'Android Phone';
    if (/Android/.test(ua)) return 'Android Tablet';
    if (/Mobi|Mobile/.test(ua)) return 'Mobile Device';
    return 'Desktop / Laptop';
  }

  function getLocalTime(timezone) {
    try {
      return new Intl.DateTimeFormat('en-GB', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).format(new Date());
    } catch (e) {
      return new Date().toLocaleString();
    }
  }

  function getConnectionType() {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (!conn) return ['Unknown', 'Connection API not available'];
    const type = conn.effectiveType || conn.type || 'Unknown';
    const speed = conn.downlink ? conn.downlink + ' Mbps downlink' : '';
    return [type.toUpperCase(), speed || 'No speed data'];
  }

  function delay(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  async function typeLines(lines, delayMs) {
    for (const [k, v] of lines) {
      await delay(delayMs);
      addTermLine(k, v);
    }
  }

  async function init() {
    addCursor();

    await delay(400);
    addTermLine('NETWORK', null, true);
    addCursor();

    let ipData = null;

    try {
      const res = await fetch('https://ipapi.co/json/');
      if (!res.ok) throw new Error('primary failed');
      ipData = await res.json();
    } catch (e) {
      try {
        const res2 = await fetch('https://geo.kamero.ai/api/geo');
        if (!res2.ok) throw new Error('fallback failed');
        const d2 = await res2.json();
        ipData = {
          ip: d2.ip,
          city: d2.city,
          region: d2.countryRegion || '',
          country_name: d2.country || '',
          country_code: d2.country || '',
          postal: d2.postalCode || '',
          latitude: d2.latitude || '',
          longitude: d2.longitude || '',
          timezone: d2.timezone || '',
          org: '',
          asn: '',
          version: d2.ip && d2.ip.includes(':') ? 'IPv6' : 'IPv4'
        };
      } catch (e2) {
        addTermLine('ERROR', 'Could not reach geolocation API. Check your connection.');
        addCursor();
      }
    }

    const ua = navigator.userAgent;
    const browser = detectBrowserVersion(ua);
    const os = detectOS(ua);
    const device = detectDevice(ua);
    const lang = navigator.language || 'Unknown';
    const langs = (navigator.languages || [lang]).join(', ');
    const screen_res = `${window.screen.width}×${window.screen.height}`;
    const viewport = `${window.innerWidth}×${window.innerHeight}`;
    const [connType, connSpeed] = getConnectionType();
    const dpr = window.devicePixelRatio || 1;
    const doNotTrack = navigator.doNotTrack === '1' ? 'Enabled' : 'Disabled';
    const cookiesEnabled = navigator.cookieEnabled ? 'Yes' : 'No';
    const platform = navigator.platform || 'Unknown';
    const touchSupport = ('ontouchstart' in window || navigator.maxTouchPoints > 0) ? 'Yes' : 'No';

    if (ipData) {
      const ipType = ipData.version || (ipData.ip && ipData.ip.includes(':') ? 'IPv6' : 'IPv4');
      const city = ipData.city || 'Unknown';
      const region = ipData.region || '';
      const country = ipData.country_name || ipData.country_code || '';
      const postal = ipData.postal || '';
      const lat = ipData.latitude ? parseFloat(ipData.latitude).toFixed(4) : '';
      const lon = ipData.longitude ? parseFloat(ipData.longitude).toFixed(4) : '';
      const tz = ipData.timezone || '';
      const isp = ipData.org || ipData.isp || 'Unknown';
      const asn = ipData.asn || '';

      await typeLines([
        ['IP Address', ipData.ip],
        ['IP Version', ipType],
        ['ISP / Org', isp],
        ['ASN', asn || 'N/A']
      ], 180);

      addTermLine('LOCATION', null, true);
      addCursor();

      await typeLines([
        ['City', city],
        ['Region', region || 'N/A'],
        ['Country', country],
        ['Postal Code', postal || 'N/A'],
        ['Coordinates', lat && lon ? `${lat}, ${lon}` : 'N/A'],
        ['Timezone', tz || 'N/A'],
        ['Local Time', tz ? getLocalTime(tz) : 'N/A']
      ], 150);

      setCard('ip', ipData.ip);
      setMeta('ip-type', ipType);
      setCard('location', `${city}${region ? ', ' + region : ''}, ${country}`);
      setMeta('coords', lat && lon ? `${lat}° N, ${lon}° E` : '');
      setCard('isp', isp);
      setMeta('asn', asn || '');
      setCard('timezone', tz || 'Unknown');
      setMeta('localtime', tz ? getLocalTime(tz) : '');

      if (lat && lon) {
        const mapFrame = document.getElementById('mapFrame');
        const mapLoading = document.getElementById('mapLoading');
        const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(lon) - 0.08},${parseFloat(lat) - 0.08},${parseFloat(lon) + 0.08},${parseFloat(lat) + 0.08}&layer=mapnik&marker=${lat},${lon}`;
        mapFrame.src = mapSrc;
        mapFrame.style.display = 'block';
        mapLoading.style.display = 'none';
      }

      const proxyHint = ipData.proxy ? '⚠️ Proxy/VPN Detected' : (ipData.hosting ? '⚠️ Hosting/Datacenter IP' : 'No proxy/VPN detected');
      setCard('network', connType);
      setMeta('proxy', proxyHint);
    }

    addTermLine('CLIENT', null, true);
    addCursor();

    await typeLines([
      ['Browser', browser],
      ['Operating System', os],
      ['Device Type', device],
      ['Platform', platform],
      ['Language', lang],
      ['All Languages', langs],
      ['Screen Res', screen_res],
      ['Viewport', viewport],
      ['Device Pixel Ratio', `${dpr}x`],
      ['Touch Support', touchSupport],
      ['Cookies Enabled', cookiesEnabled],
      ['Do Not Track', doNotTrack]
    ], 120);

    setCard('browser', browser);
    setMeta('os', os);
    setCard('device', device);
    setMeta('screen', `Screen: ${screen_res} · DPR: ${dpr}x`);
    setCard('language', lang);
    setMeta('region', langs);

    addTermLine('STATUS', null, true);
    addCursor();
    await delay(200);
    addTermLine('scan complete', '✓ all data collected without any permissions');
    addCursor();

    terminalReady = true;
    document.querySelector('.t-cmd').textContent = 'scan complete — data displayed below';
  }

  function toggleFaq(btn) {
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-item.open').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.faq-answer').classList.remove('visible');
    });

    if (!isOpen) {
      item.classList.add('open');
      answer.classList.add('visible');
    }
  }

  window.toggleFaq = toggleFaq;

  document.addEventListener('DOMContentLoaded', init);

})();

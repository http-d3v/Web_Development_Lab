/**
 * ============================================================================
 * EXPERIMENT 05: REAL-TIME WEATHER APPLICATION
 * Course: B.Tech Computer Science & Engineering - Web Development Lab
 * File: app.js
 * Description: Client-side JavaScript Fetch API implementation querying
 *              Open-Meteo REST API for real-time global weather observations.
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Application State & Storage
  // --------------------------------------------------------------------------
  const STORAGE_KEY_RECENT = 'weather_recent_cities';
  const STORAGE_KEY_UNIT = 'weather_unit_pref';

  let currentUnit = localStorage.getItem(STORAGE_KEY_UNIT) || 'C'; // 'C' or 'F'
  let cachedWeatherData = null; // Store current API response for instant unit toggling
  let recentSearches = loadRecentSearches();

  // --------------------------------------------------------------------------
  // 2. DOM Selectors
  // --------------------------------------------------------------------------
  const weatherSearchForm = document.getElementById('weatherSearchForm');
  const cityInput = document.getElementById('cityInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const searchBtn = document.getElementById('searchBtn');
  const geoBtn = document.getElementById('geoBtn');
  const retryBtn = document.getElementById('retryBtn');

  // Unit toggles
  const unitCelsius = document.getElementById('unitCelsius');
  const unitFahrenheit = document.getElementById('unitFahrenheit');

  // Containers & States
  const loadingState = document.getElementById('loadingState');
  const errorState = document.getElementById('errorState');
  const errorMessage = document.getElementById('errorMessage');
  const errorSubMessage = document.getElementById('errorSubMessage');
  const weatherData = document.getElementById('weatherData');

  // Weather data display elements
  const cityName = document.getElementById('cityName');
  const countryCode = document.getElementById('countryCode');
  const localTime = document.getElementById('localTime');
  const tempValue = document.getElementById('tempValue');
  const conditionText = document.getElementById('conditionText');
  const feelsLike = document.getElementById('feelsLike');
  const weatherArt = document.getElementById('weatherArt');

  // Metric elements
  const humidityVal = document.getElementById('humidityVal');
  const humidityHint = document.getElementById('humidityHint');
  const windVal = document.getElementById('windVal');
  const windDirHint = document.getElementById('windDirHint');
  const pressureVal = document.getElementById('pressureVal');
  const precipVal = document.getElementById('precipVal');
  const precipHint = document.getElementById('precipHint');
  const forecastList = document.getElementById('forecastList');

  // Chips
  const popularChips = document.getElementById('popularChips');
  const recentContainer = document.getElementById('recentContainer');
  const recentChips = document.getElementById('recentChips');

  // --------------------------------------------------------------------------
  // 3. WMO Meteorological Code Definitions & SVG Icons
  // --------------------------------------------------------------------------
  function getWMOInfo(code, isDay = 1) {
    // Reference: World Meteorological Organization (WMO) Weather interpretation codes (WW)
    switch (code) {
      case 0:
        return {
          title: isDay ? 'Clear Sky' : 'Clear Night',
          icon: isDay ? getSunSVG() : getMoonSVG()
        };
      case 1:
      case 2:
        return {
          title: isDay ? 'Partly Cloudy' : 'Partly Cloudy Night',
          icon: getPartlyCloudySVG(isDay)
        };
      case 3:
        return {
          title: 'Overcast',
          icon: getCloudySVG()
        };
      case 45:
      case 48:
        return {
          title: 'Fog / Mist',
          icon: getFogSVG()
        };
      case 51:
      case 53:
      case 55:
      case 56:
      case 57:
        return {
          title: 'Light Drizzle',
          icon: getDrizzleSVG()
        };
      case 61:
      case 63:
      case 65:
      case 66:
      case 67:
        return {
          title: 'Rain',
          icon: getRainSVG()
        };
      case 71:
      case 73:
      case 75:
      case 77:
      case 85:
      case 86:
        return {
          title: 'Snowfall',
          icon: getSnowSVG()
        };
      case 80:
      case 81:
      case 82:
        return {
          title: 'Rain Showers',
          icon: getRainSVG()
        };
      case 95:
      case 96:
      case 99:
        return {
          title: 'Thunderstorm',
          icon: getThunderstormSVG()
        };
      default:
        return {
          title: 'Fair Atmosphere',
          icon: getPartlyCloudySVG(isDay)
        };
    }
  }

  // Minimal Vector SVG Weather Icons
  function getSunSVG() {
    return `
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <circle cx="50" cy="50" r="22" fill="#B88338"/>
        <g stroke="#B88338" stroke-width="4" stroke-linecap="round">
          <line x1="50" y1="12" x2="50" y2="20"/>
          <line x1="50" y1="80" x2="50" y2="88"/>
          <line x1="12" y1="50" x2="20" y2="50"/>
          <line x1="80" y1="50" x2="88" y2="50"/>
          <line x1="23" y1="23" x2="29" y2="29"/>
          <line x1="71" y1="71" x2="77" y2="77"/>
          <line x1="23" y1="77" x2="29" y2="71"/>
          <line x1="71" y1="29" x2="77" y2="23"/>
        </g>
      </svg>
    `;
  }

  function getMoonSVG() {
    return `
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <path d="M55 20 A30 30 0 1 0 75 75 A34 34 0 0 1 55 20 Z" fill="#B88338"/>
        <circle cx="35" cy="30" r="2.5" fill="#A25E3E"/>
        <circle cx="75" cy="25" r="2" fill="#A25E3E"/>
      </svg>
    `;
  }

  function getPartlyCloudySVG(isDay) {
    return `
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        ${isDay ? '<circle cx="38" cy="38" r="16" fill="#B88338"/>' : '<path d="M42 24 A18 18 0 1 0 54 56 A20 20 0 0 1 42 24 Z" fill="#B88338"/>'}
        <path d="M30 68 C30 58, 40 54, 46 56 C50 48, 62 48, 66 55 C74 55, 78 62, 75 68 C78 74, 72 80, 66 80 L32 80 C26 80, 24 72, 30 68 Z" fill="#EAE0D1" stroke="#D2C4B0" stroke-width="2"/>
      </svg>
    `;
  }

  function getCloudySVG() {
    return `
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <path d="M26 62 C26 50, 38 46, 45 49 C50 38, 65 38, 70 48 C80 48, 85 57, 81 64 C85 72, 77 78, 70 78 L29 78 C21 78, 19 68, 26 62 Z" fill="#E2D7C8" stroke="#C5B5A0" stroke-width="2"/>
      </svg>
    `;
  }

  function getRainSVG() {
    return `
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <path d="M26 50 C26 38, 38 34, 45 37 C50 26, 65 26, 70 36 C80 36, 85 45, 81 52 C85 60, 77 66, 70 66 L29 66 C21 66, 19 56, 26 50 Z" fill="#D6CBBB" stroke="#B8A995" stroke-width="2"/>
        <line x1="36" y1="74" x2="32" y2="84" stroke="#3E6178" stroke-width="3" stroke-linecap="round"/>
        <line x1="50" y1="74" x2="46" y2="84" stroke="#3E6178" stroke-width="3" stroke-linecap="round"/>
        <line x1="64" y1="74" x2="60" y2="84" stroke="#3E6178" stroke-width="3" stroke-linecap="round"/>
      </svg>
    `;
  }

  function getDrizzleSVG() {
    return `
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <path d="M26 50 C26 38, 38 34, 45 37 C50 26, 65 26, 70 36 C80 36, 85 45, 81 52 C85 60, 77 66, 70 66 L29 66 C21 66, 19 56, 26 50 Z" fill="#DFD5C7" stroke="#C5B6A2" stroke-width="2"/>
        <line x1="38" y1="74" x2="35" y2="80" stroke="#3E6178" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="2 3"/>
        <line x1="54" y1="74" x2="51" y2="80" stroke="#3E6178" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="2 3"/>
      </svg>
    `;
  }

  function getSnowSVG() {
    return `
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <path d="M26 50 C26 38, 38 34, 45 37 C50 26, 65 26, 70 36 C80 36, 85 45, 81 52 C85 60, 77 66, 70 66 L29 66 C21 66, 19 56, 26 50 Z" fill="#E8DFD1" stroke="#CCC0AD" stroke-width="2"/>
        <circle cx="36" cy="78" r="2.5" fill="#3E6178"/>
        <circle cx="50" cy="78" r="2.5" fill="#3E6178"/>
        <circle cx="64" cy="78" r="2.5" fill="#3E6178"/>
      </svg>
    `;
  }

  function getThunderstormSVG() {
    return `
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <path d="M26 48 C26 36, 38 32, 45 35 C50 24, 65 24, 70 34 C80 34, 85 43, 81 50 C85 58, 77 64, 70 64 L29 64 C21 64, 19 54, 26 48 Z" fill="#C9BCAC" stroke="#A99B89" stroke-width="2"/>
        <polygon points="50,66 42,78 48,78 44,88 56,74 50,74" fill="#B88338"/>
      </svg>
    `;
  }

  function getFogSVG() {
    return `
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <line x1="22" y1="40" x2="78" y2="40" stroke="#C5B8A7" stroke-width="4" stroke-linecap="round"/>
        <line x1="16" y1="52" x2="84" y2="52" stroke="#C5B8A7" stroke-width="4" stroke-linecap="round"/>
        <line x1="24" y1="64" x2="76" y2="64" stroke="#C5B8A7" stroke-width="4" stroke-linecap="round"/>
        <line x1="30" y1="76" x2="70" y2="76" stroke="#C5B8A7" stroke-width="4" stroke-linecap="round"/>
      </svg>
    `;
  }

  // --------------------------------------------------------------------------
  // 4. Fetch API Asynchronous Weather Engine
  // --------------------------------------------------------------------------

  /**
   * Primary orchestrator function to search a city name, geocode its coordinates,
   * query Open-Meteo REST API, and render UI.
   */
  async function fetchWeatherByCity(cityNameQuery) {
    const query = cityNameQuery.trim();
    if (!query) return;

    showLoadingState();

    try {
      // Step 1: Geocoding via Open-Meteo Geocoding REST API
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`;
      const geoRes = await fetch(geoUrl);

      if (!geoRes.ok) {
        throw new Error(`Geocoding server error (HTTP ${geoRes.status})`);
      }

      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        showErrorState(`Location "${query}" not found`, 'Please verify the city or town spelling and try again.');
        return;
      }

      const location = geoData.results[0];
      const { name, latitude, longitude, country, country_code } = location;

      // Step 2: Fetch Meteorological Forecast Telemetry
      await fetchForecastByCoordinates(latitude, longitude, name, country, country_code);

      // Save to recent searches
      saveRecentSearch(name);

    } catch (err) {
      console.error('Fetch API Error:', err);
      showErrorState(
        'Unable to retrieve weather data',
        err.message || 'Please check your internet connection and try again.'
      );
    }
  }

  /**
   * Queries forecast telemetry for given latitude and longitude.
   */
  async function fetchForecastByCoordinates(lat, lon, displayName, countryName, countryIso) {
    try {
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;

      const weatherRes = await fetch(weatherUrl);

      if (!weatherRes.ok) {
        throw new Error(`Meteorological provider error (HTTP ${weatherRes.status})`);
      }

      const data = await weatherRes.json();

      // Cache data for instant unit toggle
      cachedWeatherData = {
        location: {
          name: displayName,
          country: countryName || '',
          code: countryIso || ''
        },
        telemetry: data
      };

      renderWeatherData();

    } catch (err) {
      console.error('Forecast Telemetry Error:', err);
      showErrorState('Telemetry fetch failed', err.message);
    }
  }

  // --------------------------------------------------------------------------
  // 5. Rendering Meteorological Data to the DOM
  // --------------------------------------------------------------------------
  function renderWeatherData() {
    if (!cachedWeatherData) return;

    const { location, telemetry } = cachedWeatherData;
    const current = telemetry.current;
    const daily = telemetry.daily;

    // Location header
    cityName.textContent = `${location.name}${location.country ? ', ' + location.country : ''}`;
    countryCode.textContent = location.code || 'GL';
    countryCode.style.display = location.code ? 'inline-block' : 'none';

    // Local timestamp
    const dateObj = new Date(current.time);
    const timeFormatted = dateObj.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
    localTime.textContent = `Observed at ${timeFormatted} &bull; Timezone: ${telemetry.timezone}`;

    // Condition info
    const wmo = getWMOInfo(current.weather_code, current.is_day);
    conditionText.textContent = wmo.title;
    weatherArt.innerHTML = wmo.icon;

    // Temperatures formatted according to selected unit
    const tempCelsius = current.temperature_2m;
    const feelsCelsius = current.apparent_temperature;

    tempValue.innerHTML = `${formatTemp(tempCelsius)}&deg;`;
    feelsLike.innerHTML = `Feels like ${formatTemp(feelsCelsius)}&deg;`;

    // Metrics Cards
    humidityVal.textContent = `${current.relative_humidity_2m}%`;
    if (current.relative_humidity_2m > 70) {
      humidityHint.textContent = 'High ambient moisture';
    } else if (current.relative_humidity_2m < 35) {
      humidityHint.textContent = 'Dry atmospheric air';
    } else {
      humidityHint.textContent = 'Optimal comfort range';
    }

    // Wind speed & compass direction
    const windSpeedKmh = current.wind_speed_10m;
    const windDirectionDeg = current.wind_direction_10m;
    const compassDir = getCompassDirection(windDirectionDeg);
    windVal.textContent = `${windSpeedKmh} km/h`;
    windDirHint.textContent = `Direction: ${windDirectionDeg}&deg; (${compassDir})`;

    // Surface pressure
    pressureVal.textContent = `${Math.round(current.surface_pressure)} hPa`;

    // Precipitation
    precipVal.textContent = `${current.precipitation.toFixed(1)} mm`;
    if (current.precipitation > 0) {
      precipHint.textContent = 'Active precipitation recorded';
    } else {
      precipHint.textContent = 'No rainfall detected';
    }

    // 5-Day Forecast
    renderForecast(daily);

    showContentState();
  }

  function renderForecast(daily) {
    if (!daily || !daily.time) return;

    const daysCount = Math.min(daily.time.length, 5);
    let html = '';

    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 0; i < daysCount; i++) {
      const dateStr = daily.time[i];
      const parts = dateStr.split('-');
      const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      
      const dayName = i === 0 ? 'Today' : weekdays[d.getDay()];
      const dateFormatted = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      const wmoCode = daily.weather_code[i];
      const wmo = getWMOInfo(wmoCode, 1);

      const maxT = formatTemp(daily.temperature_2m_max[i]);
      const minT = formatTemp(daily.temperature_2m_min[i]);

      html += `
        <div class="forecast-item">
          <span class="forecast-day">${dayName}</span>
          <span class="forecast-date">${dateFormatted}</span>
          <div class="forecast-icon" title="${wmo.title}">
            ${wmo.icon}
          </div>
          <div class="forecast-temp">
            <span class="temp-max">${maxT}&deg;</span>
            <span class="temp-min">${minT}&deg;</span>
          </div>
        </div>
      `;
    }

    forecastList.innerHTML = html;
  }

  // --------------------------------------------------------------------------
  // 6. Temperature Conversion & Compass Utilities
  // --------------------------------------------------------------------------
  function formatTemp(celsius) {
    if (currentUnit === 'F') {
      return Math.round((celsius * 9) / 5 + 32);
    }
    return Math.round(celsius);
  }

  function getCompassDirection(degrees) {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const idx = Math.round((degrees % 360) / 22.5);
    return directions[idx % 16];
  }

  // --------------------------------------------------------------------------
  // 7. Geolocation Handling (HTML5 Geolocation API)
  // --------------------------------------------------------------------------
  geoBtn.addEventListener('click', () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    showLoadingState();

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Attempt reverse geocoding via Open-Meteo search or fallback to coordinates
          const revRes = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${latitude.toFixed(2)},${longitude.toFixed(2)}&count=1&language=en&format=json`
          ).catch(() => null);

          let name = 'My GPS Coordinates';
          let country = '';
          let code = 'GPS';

          if (revRes && revRes.ok) {
            const revData = await revRes.json();
            if (revData.results && revData.results.length > 0) {
              name = revData.results[0].name;
              country = revData.results[0].country;
              code = revData.results[0].country_code;
            }
          }

          await fetchForecastByCoordinates(latitude, longitude, name, country, code);
        } catch (err) {
          console.error('Geo fetch error:', err);
          showErrorState('Geolocation lookup failed', err.message);
        }
      },
      (geoError) => {
        let msg = 'Unable to determine GPS location.';
        if (geoError.code === geoError.PERMISSION_DENIED) {
          msg = 'Geolocation access was denied in browser permissions.';
        } else if (geoError.code === geoError.POSITION_UNAVAILABLE) {
          msg = 'Location network information is currently unavailable.';
        } else if (geoError.code === geoError.TIMEOUT) {
          msg = 'Location request timed out.';
        }
        showErrorState('GPS Location Error', msg);
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  });

  // --------------------------------------------------------------------------
  // 8. Search Form & Event Listeners
  // --------------------------------------------------------------------------
  weatherSearchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = cityInput.value.trim();
    if (query) {
      fetchWeatherByCity(query);
    }
  });

  cityInput.addEventListener('input', () => {
    clearSearchBtn.style.display = cityInput.value.trim() ? 'block' : 'none';
  });

  clearSearchBtn.addEventListener('click', () => {
    cityInput.value = '';
    clearSearchBtn.style.display = 'none';
    cityInput.focus();
  });

  retryBtn.addEventListener('click', () => {
    const q = cityInput.value.trim() || 'New Delhi';
    fetchWeatherByCity(q);
  });

  // Popular Chips click
  popularChips.querySelectorAll('.city-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const city = chip.getAttribute('data-city');
      cityInput.value = city;
      clearSearchBtn.style.display = 'block';
      fetchWeatherByCity(city);
    });
  });

  // Unit Toggle buttons
  unitCelsius.addEventListener('click', () => {
    if (currentUnit !== 'C') {
      currentUnit = 'C';
      localStorage.setItem(STORAGE_KEY_UNIT, 'C');
      unitCelsius.classList.add('active');
      unitCelsius.setAttribute('aria-checked', 'true');
      unitFahrenheit.classList.remove('active');
      unitFahrenheit.setAttribute('aria-checked', 'false');
      renderWeatherData();
    }
  });

  unitFahrenheit.addEventListener('click', () => {
    if (currentUnit !== 'F') {
      currentUnit = 'F';
      localStorage.setItem(STORAGE_KEY_UNIT, 'F');
      unitFahrenheit.classList.add('active');
      unitFahrenheit.setAttribute('aria-checked', 'true');
      unitCelsius.classList.remove('active');
      unitCelsius.setAttribute('aria-checked', 'false');
      renderWeatherData();
    }
  });

  // --------------------------------------------------------------------------
  // 9. Recent Searches Storage
  // --------------------------------------------------------------------------
  function loadRecentSearches() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_RECENT);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  function saveRecentSearch(cityNameStr) {
    if (!cityNameStr) return;
    recentSearches = recentSearches.filter((c) => c.toLowerCase() !== cityNameStr.toLowerCase());
    recentSearches.unshift(cityNameStr);
    if (recentSearches.length > 4) recentSearches.pop();
    try {
      localStorage.setItem(STORAGE_KEY_RECENT, JSON.stringify(recentSearches));
    } catch (e) {
      console.warn('Storage failed:', e);
    }
    renderRecentChips();
  }

  function renderRecentChips() {
    if (recentSearches.length === 0) {
      recentContainer.style.display = 'none';
      return;
    }

    recentContainer.style.display = 'flex';
    recentChips.innerHTML = recentSearches
      .map(
        (city) => `<button type="button" class="city-chip recent-chip">${escapeHTML(city)}</button>`
      )
      .join('');

    recentChips.querySelectorAll('.recent-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        const query = chip.textContent.trim();
        cityInput.value = query;
        clearSearchBtn.style.display = 'block';
        fetchWeatherByCity(query);
      });
    });
  }

  // --------------------------------------------------------------------------
  // 10. UI State Switchers
  // --------------------------------------------------------------------------
  function showLoadingState() {
    loadingState.style.display = 'flex';
    errorState.style.display = 'none';
    weatherData.style.display = 'none';
  }

  function showErrorState(title, subtitle) {
    loadingState.style.display = 'none';
    errorState.style.display = 'block';
    weatherData.style.display = 'none';
    errorMessage.textContent = title;
    errorSubMessage.textContent = subtitle;
  }

  function showContentState() {
    loadingState.style.display = 'none';
    errorState.style.display = 'none';
    weatherData.style.display = 'flex';
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, (tag) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  // --------------------------------------------------------------------------
  // 11. Initial Startup
  // --------------------------------------------------------------------------
  // Initialize Unit UI from localStorage
  if (currentUnit === 'F') {
    unitFahrenheit.classList.add('active');
    unitFahrenheit.setAttribute('aria-checked', 'true');
    unitCelsius.classList.remove('active');
    unitCelsius.setAttribute('aria-checked', 'false');
  }

  renderRecentChips();

  // Load default city (New Delhi) on launch so examiner sees instant data
  fetchWeatherByCity('New Delhi');
});

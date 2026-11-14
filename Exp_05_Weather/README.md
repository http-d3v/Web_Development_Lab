# Experiment 05: Real-Time Weather Application

**Course:** B.Tech CSE (Data Science) — Web Development Laboratory  
**Author:** Dev Kumar Tiwari ([@http-d3v](https://github.com/http-d3v))  
**Academic Year:** 2nd Year (IV Semester)  
**Live URL:** [https://exp-05-weather.vercel.app](https://exp-05-weather.vercel.app)  
**GitHub Repository:** [https://github.com/http-d3v/Web_Development_Lab](https://github.com/http-d3v/Web_Development_Lab)  

---

## 1. Aim
To design and develop a responsive real-time weather web application using HTML5, CSS3, and the JavaScript Fetch API (`fetch`, `async/await`) to query open meteorological endpoints, parse JSON payloads, and dynamically render current atmospheric readings, 5-day forecasts, and error states without exposing sensitive API credentials.

---

## 2. Technologies Used
- **Semantic HTML5:** Form elements (`<form>`, `<input type="text">`, `<button>`), accessible ARIA states (`aria-live="polite"`, `role="radiogroup"`), and clean content structure.
- **CSS3:**
  - Responsive layout with CSS Grid and Flexbox.
  - Warm minimalist color palette:
    - Cream Base: `#FDFBF7`
    - Soft Surface: `#F4EFE6`
    - Card Fill: `#FFFFFF`
    - Charcoal: `#2C2522`
    - Terracotta Accent: `#A25E3E`
    - Forest Olive: `#3A5B44`
    - Slate Blue: `#3E6178`
  - Subtle pulsing loading animation (`@keyframes spin`).
  - Media queries for mobile, tablet, and desktop viewports.
- **Vanilla JavaScript (ES6+):**
  - Asynchronous Fetch API (`fetch()`, `async`, `await`, `try...catch...finally`).
  - Response validation (`response.ok`, HTTP status code verification).
  - WMO (World Meteorological Organization) weather interpretation mapping.
  - HTML5 Geolocation API (`navigator.geolocation.getCurrentPosition`).
  - Web Storage API (`localStorage`) for recent city searches and temperature unit preferences (&deg;C / &deg;F).

---

## 3. API Integration Architecture & Safe Config

### Legitimate Open Meteorological Provider
This application queries the **Open-Meteo REST API** (`https://api.open-meteo.com/v1/forecast` and `https://geocoding-api.open-meteo.com/v1/search`), maintained by national weather services (NOAA, ECMWF, DWD).

**Key Security & Architecture Advantages:**
1. **Zero Secret Key Exposure:** Does not require embedding a private API key into client-side source code, eliminating secret leakage risks on public GitHub repositories and static Vercel deployments.
2. **Environment Variable Configuration:** Includes `.env.example` defining optional provider endpoints and proxy keys for production environments.
3. **Promise Lifecycle:** Each search executes a two-stage asynchronous workflow:
   - Stage 1: Geocoding search query &rarr; Latitude and Longitude resolution.
   - Stage 2: Meteorological telemetry query &rarr; Real-time atmospheric metrics &amp; 5-day daily forecast.

---

## 4. Features Implemented

1. **Global City Search:**
   - Instant search across world capitals, regional cities, and towns.
   - Popular city quick-chips (New Delhi, Mumbai, Bengaluru, London, Tokyo, New York).
   - Recent search history chips persisted via `localStorage`.

2. **GPS Geolocation Detection:**
   - One-click "My Location" button utilizing the browser's native HTML5 Geolocation API.
   - Graceful permission denial, timeout, and coordinate resolution error handling.

3. **Real-Time Atmospheric Metrics:**
   - **Current Temperature:** Large digital readout with dynamic Celsius (&deg;C) and Fahrenheit (&deg;F) unit toggle.
   - **Apparent Temperature:** "Feels like" calculation based on wind and relative humidity.
   - **Weather Condition:** WMO-coded description paired with custom minimalist SVG vector icons (Sunny, Partly Cloudy, Overcast, Rain, Snow, Thunderstorm, Fog).
   - **Humidity:** Relative humidity percentage with ambient moisture comfort guidance.
   - **Wind Velocity & Compass Direction:** Measured in km/h with 16-point cardinal compass directions (e.g. NNW, ESE).
   - **Surface Pressure:** Barometric reading in hectopascals (hPa).
   - **Precipitation:** Real-time rainfall measurement in millimeters (mm).

4. **5-Day Weather Forecast:**
   - Daily outlook displaying day names, calendar dates, condition icons, and high/low temperature ranges.

5. **Robust State Management:**
   - **Loading State:** Minimalist spinner and satellite query indicator.
   - **Error State:** Contextual alert card with specific failure explanations and a quick "Retry" button.
   - **Content State:** Clean presentation of meteorological telemetry.

---

## 5. File Structure

```text
Exp_05_Weather/
├── assets/
│   └── favicon.svg           # Weather monogram favicon
├── index.html                # Semantic HTML5 layout and state containers
├── style.css                 # Custom styling, color tokens & responsive rules
├── app.js                    # Fetch API integration, async logic & DOM rendering
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore configuration
└── README.md                 # Complete experiment documentation
```

---

## 6. How to Run Locally

### Option A: Direct Browser Opening
1. Navigate to `Web_Development_Lab/Exp_05_Weather/`.
2. Double-click `index.html` to open in any web browser with active internet connectivity.

### Option B: VS Code Live Server
1. Open the `Exp_05_Weather` folder in VS Code.
2. Right-click `index.html` &rarr; **Open with Live Server**.

### Option C: Python HTTP Server
```bash
cd Web_Development_Lab/Exp_05_Weather
python -m http.server 3000
```
Open `http://localhost:3000` in your web browser.

---

## 7. Expected Output

- **Initial Load:** Automatically queries and renders current weather for New Delhi (21&deg;C, partly cloudy, 78% humidity, 4.5 km/h wind) and displays the 5-day daily outlook.
- **Search Query:** Typing "London" and pressing Enter fetches coordinates, updates the city banner, converts temperatures, and updates the recent search chips.
- **Unit Toggle:** Clicking &deg;F recalculates and smoothly updates all current and forecast temperatures instantly from the cached telemetry.
- **Offline / Error State:** Entering a non-existent city displays the "Location not found" alert with the retry action.

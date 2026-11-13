/**
 * ============================================================================
 * EXPERIMENT 04: SEO & WEB ACCESSIBILITY AUDIT LAB
 * Course: B.Tech Computer Science & Engineering - Web Development Lab
 * File: app.js
 * Description: Interactive tab switching and real-time WCAG 2.1 relative 
 *              luminance & contrast ratio calculation engine.
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Tabbed Navigation Switcher
  // --------------------------------------------------------------------------
  const tabAuditBtn = document.getElementById('tabAuditBtn');
  const tabLiveBtn = document.getElementById('tabLiveBtn');
  const tabToolsBtn = document.getElementById('tabToolsBtn');

  const panelAudit = document.getElementById('panelAudit');
  const panelLive = document.getElementById('panelLive');
  const panelTools = document.getElementById('panelTools');

  const tabs = [
    { btn: tabAuditBtn, panel: panelAudit },
    { btn: tabLiveBtn, panel: panelLive },
    { btn: tabToolsBtn, panel: panelTools }
  ];

  tabs.forEach((tab) => {
    tab.btn?.addEventListener('click', () => {
      // Deactivate all
      tabs.forEach((t) => {
        t.btn.classList.remove('active');
        t.btn.setAttribute('aria-selected', 'false');
        t.panel.style.display = 'none';
      });

      // Activate clicked tab
      tab.btn.classList.add('active');
      tab.btn.setAttribute('aria-selected', 'true');
      tab.panel.style.display = 'block';
    });
  });

  // --------------------------------------------------------------------------
  // 2. WCAG 2.1 Contrast Ratio Calculation Engine
  // --------------------------------------------------------------------------
  const textColorPicker = document.getElementById('textColorPicker');
  const textColorText = document.getElementById('textColorText');
  const bgColorPicker = document.getElementById('bgColorPicker');
  const bgColorText = document.getElementById('bgColorText');

  const contrastPreviewBox = document.getElementById('contrastPreviewBox');
  const sampleText = document.getElementById('sampleText');
  const contrastRatioVal = document.getElementById('contrastRatioVal');
  const contrastBadge = document.getElementById('contrastBadge');

  const presetBefore = document.getElementById('presetBefore');
  const presetAfter = document.getElementById('presetAfter');

  // Helper: Convert hex to RGB object
  function hexToRgb(hex) {
    hex = hex.replace('#', '').trim();
    if (hex.length === 3) {
      hex = hex.split('').map((c) => c + c).join('');
    }
    if (hex.length !== 6) return null;

    const num = parseInt(hex, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  }

  // Helper: Calculate WCAG relative luminance
  // Formula: L = 0.2126 * R + 0.7152 * G + 0.0722 * B (linearized RGB)
  function getLuminance(rgb) {
    const a = [rgb.r, rgb.g, rgb.b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

  // Calculate Contrast Ratio between two hex colors: (L1 + 0.05) / (L2 + 0.05)
  function calculateContrast(hex1, hex2) {
    const rgb1 = hexToRgb(hex1);
    const rgb2 = hexToRgb(hex2);

    if (!rgb1 || !rgb2) return null;

    const lum1 = getLuminance(rgb1);
    const lum2 = getLuminance(rgb2);

    const brighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);

    return (brighter + 0.05) / (darker + 0.05);
  }

  // Update Contrast UI
  function updateContrastUI() {
    const textHex = textColorPicker.value;
    const bgHex = bgColorPicker.value;

    const ratio = calculateContrast(textHex, bgHex);
    if (ratio === null) return;

    const formattedRatio = ratio.toFixed(1) + ':1';
    contrastRatioVal.textContent = formattedRatio;

    // Apply live styling to sample box
    if (contrastPreviewBox && sampleText) {
      contrastPreviewBox.style.backgroundColor = bgHex;
      sampleText.style.color = textHex;
      contrastRatioVal.style.color = textHex;
    }

    // Evaluate WCAG compliance thresholds
    if (ratio >= 7.0) {
      contrastBadge.textContent = 'Pass (AAA Enhanced)';
      contrastBadge.className = 'contrast-badge';
    } else if (ratio >= 4.5) {
      contrastBadge.textContent = 'Pass (WCAG AA Normal)';
      contrastBadge.className = 'contrast-badge';
    } else if (ratio >= 3.0) {
      contrastBadge.textContent = 'Pass (Large Text Only &ge;18pt)';
      contrastBadge.className = 'contrast-badge';
    } else {
      contrastBadge.textContent = 'Fail (Non-Compliant < 3:1)';
      contrastBadge.className = 'contrast-badge fail';
    }
  }

  // Sync inputs
  textColorPicker?.addEventListener('input', (e) => {
    textColorText.value = e.target.value.toUpperCase();
    updateContrastUI();
  });

  textColorText?.addEventListener('input', (e) => {
    let val = e.target.value.trim();
    if (!val.startsWith('#')) val = '#' + val;
    if (hexToRgb(val)) {
      textColorPicker.value = val;
      updateContrastUI();
    }
  });

  bgColorPicker?.addEventListener('input', (e) => {
    bgColorText.value = e.target.value.toUpperCase();
    updateContrastUI();
  });

  bgColorText?.addEventListener('input', (e) => {
    let val = e.target.value.trim();
    if (!val.startsWith('#')) val = '#' + val;
    if (hexToRgb(val)) {
      bgColorPicker.value = val;
      updateContrastUI();
    }
  });

  // Preset Buttons
  presetBefore?.addEventListener('click', () => {
    textColorPicker.value = '#999999';
    textColorText.value = '#999999';
    bgColorPicker.value = '#FFFFFF';
    bgColorText.value = '#FFFFFF';
    updateContrastUI();
  });

  presetAfter?.addEventListener('click', () => {
    textColorPicker.value = '#2C2522';
    textColorText.value = '#2C2522';
    bgColorPicker.value = '#FDFBF7';
    bgColorText.value = '#FDFBF7';
    updateContrastUI();
  });

  // Initial Calculation
  updateContrastUI();
});

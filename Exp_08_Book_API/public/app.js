/**
 * Experiment 08: Book REST API Client & Tester
 * Student: Dev Kumar Tiwari (http-d3v | httpd3v)
 * 2nd Year B.Tech CSE (Data Science)
 */

document.addEventListener('DOMContentLoaded', () => {
  const reqMethod = document.getElementById('reqMethod');
  const reqUrl = document.getElementById('reqUrl');
  const reqBody = document.getElementById('reqBody');
  const bodyWrapper = document.getElementById('bodyWrapper');
  const sendBtn = document.getElementById('sendBtn');
  const respStatus = document.getElementById('respStatus');
  const respTime = document.getElementById('respTime');
  const respSize = document.getElementById('respSize');
  const respOutput = document.getElementById('respOutput');
  const copyRespBtn = document.getElementById('copyRespBtn');
  const presetPills = document.querySelectorAll('.preset-pill');

  // Toggle body textarea based on HTTP method
  function updateBodyVisibility() {
    const method = reqMethod.value;
    if (method === 'POST' || method === 'PUT') {
      bodyWrapper.style.display = 'block';
    } else {
      bodyWrapper.style.display = 'none';
    }
  }

  reqMethod.addEventListener('change', updateBodyVisibility);

  // Handle Preset Clicks
  presetPills.forEach(pill => {
    pill.addEventListener('click', () => {
      presetPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const method = pill.dataset.method;
      const url = pill.dataset.url;
      const body = pill.dataset.body || '';

      reqMethod.value = method;
      reqUrl.value = url;
      reqBody.value = body ? JSON.stringify(JSON.parse(body), null, 2) : '';

      updateBodyVisibility();
      executeRequest();
    });
  });

  // Execute API Request
  async function executeRequest() {
    const method = reqMethod.value;
    const url = reqUrl.value.trim();
    let payload = null;

    if (method === 'POST' || method === 'PUT') {
      const rawBody = reqBody.value.trim();
      if (rawBody) {
        try {
          payload = JSON.parse(rawBody);
        } catch (err) {
          showResponse(400, { error: true, message: 'Invalid JSON request body: ' + err.message }, 0);
          return;
        }
      }
    }

    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending...';
    respStatus.className = 'status-badge status-idle';
    respStatus.textContent = 'Executing...';

    const startTime = performance.now();

    try {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };

      if (payload) {
        options.body = JSON.stringify(payload);
      }

      const response = await fetch(url, options);
      const endTime = performance.now();
      const duration = Math.round(endTime - startTime);

      let data;
      const text = await response.text();
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }

      showResponse(response.status, data, duration);
    } catch (err) {
      const endTime = performance.now();
      const duration = Math.round(endTime - startTime);
      showResponse(500, {
        error: true,
        message: 'Network / Fetch Error: ' + err.message,
        hint: 'Ensure the Express server is running on the target port or check network connection.'
      }, duration);
    } finally {
      sendBtn.disabled = false;
      sendBtn.textContent = 'Send Request →';
    }
  }

  function showResponse(status, data, duration) {
    respStatus.textContent = `${status} ${getStatusText(status)}`;
    respStatus.className = 'status-badge';
    if (status >= 200 && status < 300) {
      respStatus.classList.add('status-2xx');
    } else if (status >= 400 && status < 500) {
      respStatus.classList.add('status-4xx');
    } else {
      respStatus.classList.add('status-5xx');
    }

    respTime.textContent = `${duration} ms`;

    const jsonStr = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
    respSize.textContent = `${new Blob([jsonStr]).size} bytes`;
    respOutput.textContent = jsonStr;
  }

  function getStatusText(code) {
    const map = {
      200: 'OK',
      201: 'Created',
      400: 'Bad Request',
      404: 'Not Found',
      500: 'Internal Server Error'
    };
    return map[code] || '';
  }

  sendBtn.addEventListener('click', executeRequest);

  // Copy response
  copyRespBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(respOutput.textContent).then(() => {
      const orig = copyRespBtn.textContent;
      copyRespBtn.textContent = 'Copied!';
      setTimeout(() => { copyRespBtn.textContent = orig; }, 1500);
    });
  });

  // Initial auto-run first preset
  updateBodyVisibility();
  executeRequest();
});

// Helper for snippet copy
window.copySnippet = function(elemId) {
  const elem = document.getElementById(elemId);
  if (elem) {
    navigator.clipboard.writeText(elem.textContent).then(() => {
      alert('Copied snippet to clipboard!');
    });
  }
};

/**
 * ============================================================================
 * EXPERIMENT 06: RESPONSIVE BLOG PLATFORM
 * Course: B.Tech Computer Science & Engineering - Web Development Lab
 * File: script.js
 * Description: Client-side DOM filtering, live keyword search, newsletter
 *              validation, and Bootstrap 5 article modal management.
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Article Full Text Database (for Modal Reader)
  // --------------------------------------------------------------------------
  const ARTICLES = {
    featured: {
      title: 'Modern CSS Layouts: How CSS Grid & Subgrid Reshaped Student Web Projects',
      category: 'Web Tech',
      meta: 'Nov 12, 2026 &bull; 6 min read',
      body: `
        <p>For years, frontend development relied heavily on cumbersome float hacks, negative margins, and oversized CSS utility frameworks just to achieve responsive multi-column layouts. With the widespread adoption of native CSS Grid, Subgrid, and Flexbox, modern web design has entered an era of lean, high-performance styling.</p>
        <p>CSS Grid provides true two-dimensional control over both rows and columns simultaneously. Features like <code>repeat(auto-fill, minmax(280px, 1fr))</code> enable fluidly responsive grids that adapt smoothly across mobile, tablet, and widescreen viewports without requiring dozens of media query overrides.</p>
        <p>Furthermore, CSS Subgrid solves one of the oldest challenges in card-based web design: aligning child elements (such as article headers, descriptions, and action buttons) across adjacent cards regardless of dynamic content heights.</p>
      `
    },
    'post-1': {
      title: 'Understanding Asynchronous JavaScript: Promises, Async/Await, and Event Loop Mechanics',
      category: 'Web Tech',
      meta: 'Nov 08, 2026 &bull; 5 min read',
      body: `
        <p>JavaScript operates as a single-threaded runtime with a non-blocking, asynchronous event loop. While synchronous statements execute immediately on the call stack, asynchronous tasks such as network requests, timers, and filesystem reads are delegated to browser Web APIs.</p>
        <p>Once a background task finishes, its callback is enqueued into the microtask or macrotask queue. The JavaScript engine continuously monitors the call stack; when the stack is empty, it flushes queued tasks in priority order.</p>
        <p>Modern <code>async/await</code> syntax abstracts over raw promise chaining with <code>.then()</code> and <code>.catch()</code>, enabling developers to write asynchronous code that reads like procedural synchronous logic while retaining non-blocking concurrency.</p>
      `
    },
    'post-2': {
      title: 'Zero-Downtime Static Deployments: How Modern Edge Networks and CDNs Serve Web Apps',
      category: 'Cloud & DevOps',
      meta: 'Nov 02, 2026 &bull; 7 min read',
      body: `
        <p>Traditional web hosting required managing physical Linux virtual machines, configuring Apache or NGINX reverse proxies, and renewing SSL certificates manually. Modern static site deployments leverage globally distributed Content Delivery Networks (CDNs) and edge networks.</p>
        <p>Every time a commit is pushed to a Git repository, platforms like Vercel build the project in an isolated container, upload static assets to an immutable content-addressed storage layer, and assign a unique deployment URL.</p>
        <p>Once deployment health checks pass, production DNS aliases are switched atomically, guaranteeing zero-downtime rollouts and instantaneous rollbacks if an error is detected.</p>
      `
    },
    'post-3': {
      title: 'Demystifying Graph Traversal Algorithms: BFS, DFS, and Shortest Paths in C++ STL',
      category: 'AI & Systems',
      meta: 'Oct 28, 2026 &bull; 8 min read',
      body: `
        <p>Graphs form the backbone of social networks, road mapping engines, and compiler optimization dependency trees. In technical problem solving, mastering Breadth-First Search (BFS) and Depth-First Search (DFS) using C++ Standard Template Library (STL) is fundamental.</p>
        <p>BFS employs a <code>std::queue</code> to explore nodes level-by-level, making it ideal for unweighted shortest path queries. DFS utilizes recursion or an explicit <code>std::stack</code>, ideal for cycle detection, topological sorting, and connected component analysis.</p>
        <p>For weighted graphs with non-negative edge costs, Dijkstra's algorithm combines BFS with a min-heap priority queue (<code>std::priority_queue&lt;pair&lt;int,int&gt;, vector&lt;pair&lt;int,int&gt;&gt;, greater&lt;&gt;&gt;</code>) achieving an optimal $O((V + E) \log V)$ time complexity.</p>
      `
    },
    'post-4': {
      title: 'Engineering Undergraduate Roadmap: Balancing College CGPA, Practical Labs, and Git Projects',
      category: 'Campus Insights',
      meta: 'Oct 19, 2026 &bull; 4 min read',
      body: `
        <p>One of the most persistent hurdles for computer science engineering undergraduates is striking the balance between theoretical coursework, high laboratory grades, and practical personal projects.</p>
        <p>Rather than treating lab assignments as disconnected compliance tasks, forward-thinking students turn every lab experiment into a production-grade, portfolio-worthy project stored in clean GitHub repositories.</p>
        <p>Consistency in data structure problem solving paired with understanding foundational web development concepts builds the confidence required for campus placement interviews and summer internships.</p>
      `
    }
  };

  // --------------------------------------------------------------------------
  // 2. DOM Selectors
  // --------------------------------------------------------------------------
  const postCols = document.querySelectorAll('.post-col');
  const navFilters = document.querySelectorAll('.nav-filter');
  const pillBtns = document.querySelectorAll('.pill-btn');
  const articleSearchInput = document.getElementById('articleSearchInput');
  const blogSearchForm = document.getElementById('blogSearchForm');
  const noPostsFound = document.getElementById('noPostsFound');
  const filterStatus = document.getElementById('filterStatus');

  // Modal elements
  const articleModalEl = document.getElementById('articleModal');
  const modalPostCategory = document.getElementById('modalPostCategory');
  const modalPostMeta = document.getElementById('modalPostMeta');
  const modalPostTitle = document.getElementById('modalPostTitle');
  const modalPostContent = document.getElementById('modalPostContent');
  const bootstrapModal = articleModalEl ? new bootstrap.Modal(articleModalEl) : null;

  // Newsletter
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterEmail = document.getElementById('newsletterEmail');
  const newsletterSuccess = document.getElementById('newsletterSuccess');

  let activeCategory = 'all';
  let activeSearchQuery = '';

  // --------------------------------------------------------------------------
  // 3. Filtering & Search Logic
  // --------------------------------------------------------------------------
  function filterPosts() {
    let visibleCount = 0;

    postCols.forEach((col) => {
      const category = col.getAttribute('data-category');
      const title = (col.getAttribute('data-title') || '').toLowerCase();
      const desc = col.querySelector('.post-desc')?.textContent.toLowerCase() || '';

      const matchesCategory = activeCategory === 'all' || category === activeCategory;
      const matchesSearch =
        !activeSearchQuery || title.includes(activeSearchQuery) || desc.includes(activeSearchQuery);

      if (matchesCategory && matchesSearch) {
        col.style.display = 'block';
        visibleCount++;
      } else {
        col.style.display = 'none';
      }
    });

    // Update empty search state
    if (noPostsFound) {
      noPostsFound.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    // Update status text if filtering
    if (filterStatus) {
      if (activeCategory !== 'all' || activeSearchQuery) {
        filterStatus.style.display = 'block';
        filterStatus.textContent = `Showing ${visibleCount} article(s) matching criteria.`;
      } else {
        filterStatus.style.display = 'none';
      }
    }
  }

  // Handle Pill buttons click
  pillBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      pillBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      activeCategory = btn.getAttribute('data-category');
      syncNavFilters(activeCategory);
      filterPosts();
    });
  });

  // Handle Navbar Category links click
  navFilters.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      activeCategory = link.getAttribute('data-category');
      syncPillFilters(activeCategory);
      syncNavFilters(activeCategory);
      filterPosts();

      // Close mobile navbar if open
      const collapseEl = document.getElementById('navbarContent');
      if (collapseEl && collapseEl.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(collapseEl);
        bsCollapse?.hide();
      }
    });
  });

  function syncNavFilters(cat) {
    navFilters.forEach((link) => {
      if (link.getAttribute('data-category') === cat) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  function syncPillFilters(cat) {
    pillBtns.forEach((btn) => {
      if (btn.getAttribute('data-category') === cat) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Search input event
  articleSearchInput?.addEventListener('input', (e) => {
    activeSearchQuery = e.target.value.trim().toLowerCase();
    filterPosts();
  });

  blogSearchForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    filterPosts();
  });

  // --------------------------------------------------------------------------
  // 4. Modal Post Reader
  // --------------------------------------------------------------------------
  document.querySelectorAll('.read-post-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const postId = btn.getAttribute('data-post');
      const article = ARTICLES[postId];

      if (article && bootstrapModal) {
        modalPostTitle.textContent = article.title;
        modalPostCategory.textContent = article.category;
        modalPostMeta.innerHTML = article.meta;
        modalPostContent.innerHTML = article.body;
        bootstrapModal.show();
      }
    });
  });

  // --------------------------------------------------------------------------
  // 5. Newsletter Subscription Handling
  // --------------------------------------------------------------------------
  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailVal = newsletterEmail.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailVal)) {
      newsletterEmail.classList.add('is-invalid');
      return;
    }

    newsletterEmail.classList.remove('is-invalid');
    newsletterSuccess.style.display = 'block';
    newsletterForm.reset();

    setTimeout(() => {
      newsletterSuccess.style.display = 'none';
    }, 4000);
  });
});

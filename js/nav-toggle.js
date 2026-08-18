  const btn = document.querySelector('.nav__toggle');
  const links = document.getElementById('navlinks');
  btn?.addEventListener('click', () => {
    const open = links?.classList.toggle('nav__links--open');
    btn.setAttribute('aria-expanded', String(!!open));
  });

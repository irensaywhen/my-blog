// Mobile menu
(function () {
  //Select DOM Items

  const menuBtn = document.getElementById('menu-btn');
  const menu = document.getElementById('mobile-menu');
  const body = document.body;

  //Set Initial State Of Menu
  let showMenu = false;

  menuBtn.addEventListener('click', () => {
    if (!showMenu) {
      menuBtn.classList.add('close');
      menu.classList.add('show');
      body.classList.add('mobile-menu');

      // Set menu state
      showMenu = true;
    } else {
      menuBtn.classList.remove('close');
      menu.classList.remove('show');
      body.classList.remove('mobile-menu');

      // Set menu state
      showMenu = false;
    }
  });
})();

// Text truncation
(function () {
  const clampElements = Array.from(
    document.querySelectorAll('.clamp-excerpt p')
  );
  // Clamp text
  clampElements.forEach(element => $clamp(element, { clamp: 4 }));
})();

// Copy email address on click
(function () {
  const email = document.getElementById('email');
  const emailAddress = email.dataset.email,
    tooltipInitialTitle = email.title,
    $email = $(email);

  let emailCopied = false;

  function copyToClipboard(text) {
    // Input to copy text to clipboard
    var dummy = document.createElement('input');

    document.body.appendChild(dummy);

    dummy.setAttribute('value', text);
    dummy.select();

    document.execCommand('copy');

    emailCopied = true;

    // Delete input
    document.body.removeChild(dummy);
  }

  $email.click(event => {
    event.preventDefault();

    copyToClipboard(emailAddress);

    $email
      .tooltip('dispose')
      .first()
      .attr('title', 'Copied!')
      .tooltip()
      .tooltip('show');

    setTimeout(() => {
      $email
        .tooltip('dispose')
        .first()
        .attr('title', tooltipInitialTitle)
        .tooltip();
    }, 1000);
  });
})();

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

(function () {
  let about = document.getElementById('about');

  if (!about) return;

  const observerOptions = {
    rootMargin: '0px',
    threshold: 0,
  };

  let observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      let { target, isIntersecting } = entry;

      if (target.classList.contains('show-on-scroll')) {
        isIntersecting
          ? $(target).addClass('shown').removeClass('hidden')
          : $(target).removeClass('shown').addClass('hidden');
      }
    });
  }, observerOptions);

  Array.from(about.querySelectorAll('.show-on-scroll')).forEach(item => {
    observer.observe(item);
  });

  // Scroll to next paragraph
  about.addEventListener('click', event => {
    let $target = $(event.target);

    if ($target.closest('.navigation-arrow').length === 0) return;

    $('html, body').animate(
      {
        scrollTop: $target.closest('.paragraph').next('.paragraph').offset()
          .top,
      },
      2000
    );
  });

  document.getElementById('meet').addEventListener('click', event => {});
})();

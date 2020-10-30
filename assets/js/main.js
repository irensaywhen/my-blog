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

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

// Copy email address on click
(function () {
  const $email = $('.email');
  const emailAddress = $email.first().data('email'),
    tooltipInitialTitle = $email.attr('title');

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

  document.addEventListener('click', event => {
    let $target = $(event.target).closest('.email');
    if ($target.length === 0) return;

    event.preventDefault();

    copyToClipboard(emailAddress);

    $target
      .tooltip('dispose')
      .first()
      .attr('title', 'Copied!')
      .tooltip()
      .tooltip('show');

    setTimeout(() => {
      $target
        .tooltip('dispose')
        .first()
        .attr('title', tooltipInitialTitle)
        .tooltip();
    }, 1000);
  });
})();

(function () {
  let about = document.getElementById('about');

  if (!about) return;

  const observerOptions = {
      rootMargin: '0px',
      threshold: 0,
    },
    myPhotoSection = document.getElementById('my-photo'),
    scrollTime = 1200,
    aboutBlogFirstSection = document.getElementById('about-blog-first-section'),
    aboutMeFirstSection = document.getElementById('about-me-first-section');

  let observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      let { target, isIntersecting } = entry;

      if (target.classList.contains('show-on-scroll')) {
        isIntersecting
          ? $(target).addClass('shown').removeClass('hidden')
          : $(target).removeClass('shown').addClass('hidden');
      } else if (target.classList.contains('my-photo')) {
        isIntersecting
          ? $(target).removeClass('blurred').addClass('unblurred')
          : $(target).addClass('blurred').removeClass('unblurred');
      }
    });
  }, observerOptions);

  // Observe sections with paragraphs
  Array.from(about.querySelectorAll('.show-on-scroll')).forEach(item => {
    observer.observe(item);
  });

  // Observe photo section
  observer.observe(myPhotoSection);

  // Scroll to next paragraph
  about.addEventListener('click', event => {
    let $target = $(event.target);

    if ($target.closest('.navigation-arrow').length === 0) return;

    $('html, body').animate(
      {
        scrollTop: $target.closest('.paragraph').next('.paragraph').offset()
          .top,
      },
      scrollTime
    );
  });

  document.getElementById('meet').addEventListener('click', event => {
    $('html, body').animate(
      {
        scrollTop: $(myPhotoSection).offset().top,
      },
      scrollTime
    );
  });

  document
    .getElementById('move-to-blog-description')
    .addEventListener('click', event => {
      $('html, body').animate(
        {
          scrollTop: $(aboutBlogFirstSection).offset().top,
        },
        scrollTime
      );
    });

  document.getElementById('who-btn').addEventListener('click', event => {
    $('html, body').animate(
      {
        scrollTop: $(aboutMeFirstSection).offset().top,
      },
      scrollTime
    );
  });

  document.getElementById('what-btn').addEventListener('click', event => {
    $('html, body').animate(
      {
        scrollTop: $(aboutBlogFirstSection).offset().top,
      },
      scrollTime
    );
  });
})();

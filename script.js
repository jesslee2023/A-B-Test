document.addEventListener('DOMContentLoaded', function () {
  const gdprBanner = document.getElementById('gdpr-consent-banner');
  const acceptCookies = document.getElementById('accept-cookies');
  const refuseCookies = document.getElementById('refuse-cookies');
  const ctaButton = document.getElementById('cta-button');
  let userGroup = 'A';

  const gdprConsent = localStorage.getItem('gdprConsent');
  if (gdprConsent === 'true') {
    loadABTestContent();
  } else if (gdprConsent === 'false') {
    showRefusalMessage();
  } else {
    gdprBanner.style.display = 'block';
  }

  acceptCookies.addEventListener('click', function () {
    localStorage.setItem('gdprConsent', 'true');
    gdprBanner.style.display = 'none';
    loadABTestContent();
  });

  refuseCookies.addEventListener('click', function () {
    localStorage.setItem('gdprConsent', 'false');
    gdprBanner.style.display = 'none';
    showRefusalMessage();
  });

  function showRefusalMessage() {
    const dynamicContent = document.getElementById('dynamic-content');
    dynamicContent.innerHTML = `<p>Cookies are required for dynamic content. If you change your mind, <button id="reconsider-cookies">click here</button> to accept cookies.</p>`;

    const reconsiderButton = document.getElementById('reconsider-cookies');
    if (reconsiderButton) {
      reconsiderButton.addEventListener('click', function () {
        localStorage.setItem('gdprConsent', 'true');
        gdprBanner.style.display = 'none';
        loadABTestContent();
      });
    }
  }

  function loadABTestContent() {
    userGroup = Math.random() < 0.5 ? 'A' : 'B';
    document.getElementById(
      'dynamic-content'
    ).innerHTML = `<p>You are in Group <strong>${userGroup}</strong>.</p>     <p>If you like being in  Group ${userGroup}, click the button below to let us know. </p> <p>If you refresh the webpage,  you might be assigned to a different group, or not.</p> <p> It's random, you know.</p>  <p>It's a test, after all.</p> `;
    ctaButton.style.display = 'block';
  }

  ctaButton.addEventListener('click', function () {
    console.log(`User in Group ${userGroup} liked it.`);
  });
});

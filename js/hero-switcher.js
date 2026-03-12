/**
 * Hero Section Image Switcher
 * Maddy Group Ltd - Dynamic hero background per service category
 *
 * Behaviour:
 *  - On first/direct page load  → hero shows the page's own default image (CSS background)
 *  - When user clicks a sidebar service category link → hero updates to that service's
 *    representative image, then navigates to the target page.
 *  - On the target page, sessionStorage carries the chosen image so the hero shows it
 *    instead of the default, giving visual continuity.
 *  - A direct reload always restores the default CSS hero image.
 */

(function () {
  "use strict";

  /* ------------------------------------------------------------------ */
  /*  Map: page filename  →  hero image path                             */
  /* ------------------------------------------------------------------ */
  var heroImages = {
    "cybersecurity-services.html": "images/service-1.jpg",
    "software-development.html":   "images/service-2.jpg",
    "website-development.html":    "images/service-3.jpg",
    "iot-services.html":           "images/service-1.jpg",
    "web-solutions.html":          "images/websolutions1.jpg",
    "ict-procurement.html":        "images/service-2.jpg",
    "uav.html":                    "images/uav-image.jpg",
  };

  /* ------------------------------------------------------------------ */
  /*  Helper: apply image to the .page-header element with fade effect   */
  /* ------------------------------------------------------------------ */
  function applyHeroImage(imgPath) {
    var header = document.querySelector(".page-header");
    if (!header || !imgPath) return;

    var img = new Image();
    img.onload = function () {
      header.style.transition = "background-image 0.5s ease-in-out";
      header.style.backgroundImage =
        "linear-gradient(270deg,rgba(1,5,53,.28) 43.57%,rgba(1,5,53,.8) 100%), url('" +
        imgPath +
        "')";
      header.style.backgroundSize     = "cover";
      header.style.backgroundPosition = "center center";
      header.style.backgroundRepeat   = "no-repeat";
    };
    img.src = imgPath;
  }

  /* ------------------------------------------------------------------ */
  /*  On page load: check sessionStorage for an incoming hero image      */
  /* ------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", function () {
    var incomingImg = sessionStorage.getItem("maddyHeroImg");

    if (incomingImg) {
      applyHeroImage(incomingImg);
      sessionStorage.removeItem("maddyHeroImg");
    }

    /* ---------------------------------------------------------------- */
    /*  Intercept sidebar category link clicks                           */
    /* ---------------------------------------------------------------- */
    var categoryLinks = document.querySelectorAll(
      ".page-catagery-list ul li a"
    );

    categoryLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        var href = link.getAttribute("href");
        if (!href) return;
        var filename = href.split("/").pop().split("?")[0];
        var targetImg = heroImages[filename];
        if (!targetImg) return;
        sessionStorage.setItem("maddyHeroImg", targetImg);
        applyHeroImage(targetImg);
      });
    });

    /* ---------------------------------------------------------------- */
    /*  Also intercept navbar submenu service links (desktop + mobile)   */
    /* ---------------------------------------------------------------- */
    var navServiceLinks = document.querySelectorAll(
      ".main-menu ul li.submenu ul li a, .slicknav_nav a"
    );

    navServiceLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        var href = link.getAttribute("href");
        if (!href) return;
        var filename = href.split("/").pop().split("?")[0];
        var targetImg = heroImages[filename];
        if (targetImg) {
          sessionStorage.setItem("maddyHeroImg", targetImg);
        }
      });
    });
  });
})();
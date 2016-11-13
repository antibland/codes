(function app(window) {
  "use strict";

  var doc = window.document;
  var pencil = doc.querySelector(".button--pencil");
  var email = doc.querySelector(".button--email");
  var dialog = doc.querySelector(".dialog");
  var close_dialog_btns = doc.querySelectorAll(".button--close-dialog");

  function showSection(section) {
    document.querySelector(".message-success").setAttribute("aria-hidden", true);
    document.querySelector("[data-section=" + section + "]").style.display = "block";
  }

  function hideSection(section) {
    document.querySelector("[data-section=" + section + "]").style.display = "none";
  }

  function closeDialogHandler() {
    var body = document.body;
    var success_msg = document.querySelector(".message-success");
    var success_props = {};

    success_props.style = window.getComputedStyle(success_msg);
    success_props.display = success_props.style.getPropertyValue("display");

    if (body.classList.contains("animation--writing--on")) {
      document.body.classList.remove("animation--writing--on");
      pencil.focus();
    } else if (body.classList.contains("animation--contact--on")) {
      document.body.classList.remove("animation--contact--on");
      email.focus();
    } else {
      if (location.hash === "#thanks" && success_props.display === "block") {
        document.querySelector(".message-success").setAttribute("aria-hidden", true);
      }
    }

    dialog.setAttribute("aria-hidden", true);
  }

  function emailClickHandler() {
    showSection("contact");
    hideSection("writing");
    setTimeout(function() {
      document.body.classList.add("animation--contact--on");
    }, 0);
    dialog.setAttribute("aria-hidden", false);
    dialog.focus();
  }

  function pencilClickHandler() {
    showSection("writing");
    hideSection("contact");
    setTimeout(function() {
      document.body.classList.add("animation--writing--on");
    }, 0);
    dialog.setAttribute("aria-hidden", false);
    dialog.focus();
  }

  function init() {
    setTimeout(function() {
      document.body.classList.add("on");
    }, 500);
  }

  function dialogIsHidden() {
    return document.querySelector(".dialog").getAttribute("aria-hidden");
  }

  document.onkeydown = function(evt) {
    evt = evt || window.event;
    var is_escape = false;
    var body = document.body;

    if (dialogIsHidden() === "false" || location.hash === "#thanks") {
      if (evt.hasOwnProperty("key")) {
        is_escape = (evt.key === "Escape" || evt.key === "Esc");
      } else {
        is_escape = (evt.keyCode === 27);
      }

      if (is_escape &&
         (body.classList.contains("animation--writing--on") ||
          body.classList.contains("animation--contact--on") ||
          location.hash === "#thanks")) {
        closeDialogHandler();
      }
    }
  };

  pencil.addEventListener("click", pencilClickHandler, false);
  email.addEventListener("click", emailClickHandler, false);

  [].forEach.call(close_dialog_btns, function(btn) {
    btn.addEventListener("click", closeDialogHandler);
  });

  window.onload = init;
}(window));
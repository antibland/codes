(function(window) {
  var pencil       = document.querySelector(".button--pencil"),
      email        = document.querySelector(".button--email"),
      dialog       = document.querySelector(".dialog"),
      close_dialog = document.querySelector(".button--close-dialog");

  pencil.addEventListener("click", pencilClickHandler, false);
  email.addEventListener("click", emailClickHandler, false);
  close_dialog.addEventListener("click", closeDialogHandler);
  document.body.addEventListener("click", function(e) {
    if (location.hash === "#thanks") {
      if (!hasSomeParentTheClass(e.target, "message-success")) {
        document.querySelector(".message-success").setAttribute("aria-hidden", true);
      }
    }
  }, false);

  function hasSomeParentTheClass(element, classname) {
    if (element.classList && element.classList.contains(classname)) {
      return true;
    }

    return element.parentNode && hasSomeParentTheClass(element.parentNode, classname);
  }

  function closeDialogHandler() {
    var body = document.body;

    if (body.classList.contains("animation--writing--on")) {
      document.body.classList.remove("animation--writing--on");
      pencil.focus();
    } else if (body.classList.contains("animation--contact--on")) {
      document.body.classList.remove("animation--contact--on");
      email.focus();
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
    }, 500)
  }

  function showSection(section) {
    document.querySelector("[data-section=" + section + "]").style.display = "block";
  }

  function hideSection(section) {
    document.querySelector("[data-section=" + section + "]").style.display = "none";
  }

  function dialogIsHidden() {
    return document.querySelector(".dialog").getAttribute("aria-hidden");
  }

  document.onkeydown = function(evt) {
    evt = evt || window.event;
    var is_escape = false,
        body      = document.body;

    if (dialogIsHidden() === "false") {
      if ("key" in evt) {
        is_escape = (evt.key == "Escape" || evt.key == "Esc");
      } else {
        is_escape = (evt.keyCode == 27);
      }

      if (is_escape &&
         (body.classList.contains("animation--writing--on") ||
          body.classList.contains("animation--contact--on"))) {
        closeDialogHandler();
      }
    }
  };

  window.onload = init;
})(window)
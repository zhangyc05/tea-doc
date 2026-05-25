(function () {
  "use strict";

  var params = new URLSearchParams(window.location.search);
  var modalRoot;
  var lastTrigger;

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
    });
  }

  function query(name, fallback) {
    return params.get(name) || fallback;
  }

  function setState(state) {
    params.set("state", state);
    window.history.replaceState({}, "", window.location.pathname + "?" + params.toString());
  }

  function closeLayer() {
    if (!modalRoot) return;
    modalRoot.classList.add("hidden");
    modalRoot.innerHTML = "";
    if (lastTrigger) lastTrigger.focus();
  }

  function layer(title, content, actions, drawer, trigger) {
    lastTrigger = trigger || document.activeElement;
    modalRoot.className = "overlay" + (drawer ? " drawer-wrap" : "");
    modalRoot.innerHTML =
      '<section class="dialog' + (drawer ? " drawer" : "") + '" role="dialog" aria-modal="true" aria-labelledby="layer-title">' +
        '<header class="dialog-head"><h2 id="layer-title">' + escapeHtml(title) + '</h2>' +
        '<button class="close" type="button" data-close aria-label="关闭">x</button></header>' +
        '<div class="dialog-body">' + content + '</div>' +
        (actions ? '<footer class="dialog-actions">' + actions + '</footer>' : "") +
      "</section>";
    modalRoot.classList.remove("hidden");
    modalRoot.querySelector("[data-close]").focus();
  }

  function toast(message) {
    var el = document.getElementById("toast");
    el.textContent = message;
    el.classList.remove("hidden");
    window.clearTimeout(el._timer);
    el._timer = window.setTimeout(function () { el.classList.add("hidden"); }, 3200);
  }

  function pendingPage(id, name, objectId, journey, trigger) {
    layer(
      "后续页面待创建",
      '<p><strong>' + escapeHtml(name) + "（" + escapeHtml(id) + '）</strong>已登记在页面路由中，但不属于当前获准创建批次。</p>' +
      '<div class="divider"></div><p class="muted">后续启用真实跳转时将继续携带：<br>对象 ' +
      escapeHtml(objectId) + " / 旅程 " + escapeHtml(journey) + "</p>",
      '<button class="btn primary" type="button" data-close>知道了</button>',
      false,
      trigger
    );
  }

  function deny(requiredLabel) {
    var page = document.getElementById("page");
    page.className = "permission";
    page.innerHTML = '<section class="card"><span class="badge warning">无权限访问</span><h1>当前身份不能查看此页面</h1>' +
      '<p class="subtitle">此页面仅对' + escapeHtml(requiredLabel) + '开放，请切换到具有权限的演示身份后查看。</p></section>';
  }

  document.addEventListener("DOMContentLoaded", function () {
    modalRoot = document.getElementById("layer");
    if (modalRoot) {
      modalRoot.addEventListener("click", function (event) {
        if (event.target === modalRoot || event.target.closest("[data-close]")) closeLayer();
      });
    }
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && modalRoot && !modalRoot.classList.contains("hidden")) closeLayer();
    });
  });

  window.Prototype = {
    query: query,
    setState: setState,
    layer: layer,
    closeLayer: closeLayer,
    toast: toast,
    pendingPage: pendingPage,
    deny: deny,
    escapeHtml: escapeHtml
  };
})();

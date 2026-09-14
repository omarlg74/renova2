(function () {
  var C = window.RENOVA2_CONTACTO, P = window.RENOVA2_PROPIEDADES || [];
  var state = { op: "Todas", tipo: "Todos", ciudad: "Todas", q: "", precio: "Todos" };
  var gallery = {};

  var WA_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.15c-1.5 0-2.97-.4-4.25-1.16l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.25-4.37c0-4.54 3.7-8.23 8.25-8.23 4.54 0 8.23 3.69 8.23 8.23 0 4.55-3.69 8.24-8.19 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.4-.12-.56.13-.17.25-.64.81-.79.98-.14.16-.29.19-.54.06-.25-.12-1.06-.39-2.01-1.24-.75-.67-1.25-1.49-1.4-1.74-.14-.25-.01-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.42.06-.64.31-.22.25-.85.83-.85 2.02 0 1.19.87 2.34.99 2.5.12.17 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.47-.28Z"/></svg>';
  var MAP_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M12 21s7-6.06 7-11a7 7 0 1 0-14 0c0 4.94 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/></svg>';

  function money(n, m) {
    return (m === "USD" ? "USD " : "$") + n.toLocaleString("es-MX") + (m === "USD" ? "" : " MXN");
  }
  function waLink(p) {
    var detalle = [];
    if (p.m2) detalle.push(p.m2 + " m²");
    if (p.precio && p.precioVisible) detalle.push(money(p.precio, p.moneda));
    if (p.colonia) detalle.push(p.colonia);
    var msg = (C.mensaje || "Hola, me interesa {propiedad} ({detalle}). ¿Sigue disponible?")
      .replace("{propiedad}", p.titulo)
      .replace("{detalle}", detalle.join(" · ") || p.tipo + " en " + p.operacion.toLowerCase());
    return "https://wa.me/" + C.whatsapp + "?text=" + encodeURIComponent(msg);
  }
  function uniq(key) {
    var out = [];
    P.forEach(function (p) { if (p[key] && out.indexOf(p[key]) < 0) out.push(p[key]); });
    return out.sort();
  }
  function priceBand(p) {
    if (!p.precio) return null;
    if (p.precio < 500000) return "b1";
    if (p.precio < 1500000) return "b2";
    if (p.precio < 3000000) return "b3";
    return "b4";
  }

  function matches(p) {
    if (state.op !== "Todas" && p.operacion !== state.op) return false;
    if (state.tipo !== "Todos" && p.tipo !== state.tipo) return false;
    if (state.ciudad !== "Todas" && p.ciudad !== state.ciudad) return false;
    if (state.precio !== "Todos" && priceBand(p) !== state.precio) return false;
    if (state.q) {
      var hay = [p.titulo, p.colonia, p.ciudad, p.tipo, p.operacion, p.referencia, (p.puntos || []).join(" ")].join(" ").toLowerCase();
      if (hay.indexOf(state.q.toLowerCase()) < 0) return false;
    }
    return true;
  }

  function photo(p, i) {
    if (!p.fotos || !p.fotos.length) return '<div class="ph-empty">Foto próximamente</div>';
    return '<img src="fotos/' + p.fotos[i] + '" alt="' + p.titulo + '" loading="lazy">';
  }

  function card(p, feat) {
    var idx = gallery[p.id] || 0;
    var h = '<article class="card" data-id="' + p.id + '">';
    h += '<div class="media"><div class="ph">' + photo(p, idx) + '<div class="tags"><span class="tag op">' + p.operacion + '</span>';
    if (p.etiqueta) h += '<span class="tag ' + p.etiqueta.toLowerCase() + '">' + p.etiqueta + '</span>';
    h += '</div></div>';
    if (p.fotos && p.fotos.length > 1) {
      h += '<div class="thumbs">';
      p.fotos.forEach(function (f, i) {
        h += '<button type="button" data-thumb="' + i + '" aria-pressed="' + (i === idx) + '" aria-label="Foto ' + (i + 1) + '"><img src="fotos/' + f + '" alt="" loading="lazy"></button>';
      });
      h += '</div>';
    }
    h += '</div>';
    h += '<div class="body">';
    h += '<div><div class="eyebrow">' + p.tipo + " · " + (p.ciudad || "") + '</div><h3>' + p.titulo + '</h3></div>';
    h += '<div class="loc">' + [p.colonia, p.referencia].filter(Boolean).join(" · ") + '</div>';
    if (p.precio && p.precioVisible) {
      h += '<div class="price">' + money(p.precio, p.moneda) + (p.periodo ? ' <small>/ ' + p.periodo + '</small>' : '') + '</div>';
    } else {
      h += '<div class="price ask">Precio a consultar</div>';
    }
    var sp = [];
    if (p.m2) sp.push("<b>" + p.m2 + "</b> m² de terreno");
    if (p.m2Construccion) sp.push("<b>" + p.m2Construccion + "</b> m² construidos");
    if (p.recamaras) sp.push("<b>" + p.recamaras + "</b> rec.");
    if (p.banos) sp.push("<b>" + p.banos + "</b> baños");
    if (p.estacionamiento) sp.push("<b>" + p.estacionamiento + "</b> autos");
    if (sp.length) h += '<div class="specs">' + sp.map(function (s) { return '<span class="spec">' + s + '</span>'; }).join("") + '</div>';
    if (p.puntos && p.puntos.length) {
      var pts = feat ? p.puntos : p.puntos.slice(0, 2);
      h += '<ul class="points">' + pts.map(function (t) { return "<li>" + t + "</li>"; }).join("") + '</ul>';
    }
    if (feat && p.medidas) h += '<div class="measures">Medidas: ' + p.medidas + '</div>';
    h += '<div class="actions"><a class="btn btn-wa" href="' + waLink(p) + '" target="_blank" rel="noopener">' + WA_SVG + 'Preguntar por WhatsApp</a>';
    if (p.mapa) h += '<a class="btn btn-map" href="' + p.mapa + '" target="_blank" rel="noopener">' + MAP_SVG + 'Ubicación</a>';
    h += '</div></div></article>';
    return h;
  }

  function render() {
    var list = P.filter(matches);
    var grid = document.getElementById("grid");
    if (!list.length) {
      grid.innerHTML = '<div class="empty"><h3 class="r2-h3">Sin resultados con estos filtros</h3><p>Ajusta la búsqueda o cuéntanos qué buscas: conseguimos propiedades por encargo.</p></div>';
    } else {
      var ordered = list.filter(function (p) { return p.destacada; }).concat(list.filter(function (p) { return !p.destacada; }));
      grid.innerHTML = ordered.map(function (p) { return card(p, true); }).join("");
    }

    document.querySelectorAll("[data-op]").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.op === state.op); });
  }

  function fillSelect(id, label, values) {
    var s = document.getElementById(id);
    s.innerHTML = '<option value="' + label + '">' + label + '</option>' + values.map(function (v) { return '<option value="' + v + '">' + v + '</option>'; }).join("");
  }

  function init() {
    document.querySelectorAll("[data-op]").forEach(function (b) {
      b.addEventListener("click", function () { state.op = b.dataset.op; render(); });
    });
    fillSelect("f-tipo", "Todos", uniq("tipo"));
    fillSelect("f-ciudad", "Todas", uniq("ciudad"));
    document.getElementById("f-tipo").addEventListener("change", function (e) { state.tipo = e.target.value; render(); });
    document.getElementById("f-ciudad").addEventListener("change", function (e) { state.ciudad = e.target.value; render(); });
    document.getElementById("f-q").addEventListener("input", function (e) { state.q = e.target.value.trim(); render(); });
    document.getElementById("f-clear").addEventListener("click", function () {
      state = { op: "Todas", tipo: "Todos", ciudad: "Todas", q: "", precio: "Todos" };
      document.getElementById("f-q").value = "";
      document.getElementById("f-tipo").value = "Todos";
      document.getElementById("f-ciudad").value = "Todas";
      render();
    });
    document.getElementById("grid").addEventListener("click", function (e) {
      var t = e.target.closest("[data-thumb]");
      if (!t) return;
      gallery[t.closest(".card").dataset.id] = +t.dataset.thumb;
      render();
    });

    // Contacto genérico
    var hi = "Hola, vi su catálogo y me interesa una propiedad.";
    document.querySelectorAll("[data-wa-general]").forEach(function (a) {
      a.href = "https://wa.me/" + C.whatsapp + "?text=" + encodeURIComponent(hi);
    });
    document.querySelectorAll("[data-tel]").forEach(function (el) {
      el.textContent = C.telefono;
      if (el.tagName === "A") el.href = "tel:+52" + C.telefono.replace(/\s/g, "");
    });

    // Formulario → WhatsApp
    document.getElementById("ask-form").addEventListener("submit", function (e) {
      e.preventDefault();
      var f = e.target;
      var msg = "Solicitud desde el catálogo Renova2\n" +
        "Nombre: " + (f.nombre.value || "—") + "\n" +
        "Busco: " + f.busco.value + " en " + f.operacion.value + "\n" +
        "Zona: " + (f.zona.value || "—") + "\n" +
        "Presupuesto: " + (f.presupuesto.value || "—") + "\n" +
        (f.detalles.value ? "Detalles: " + f.detalles.value : "");
      window.open("https://wa.me/" + C.whatsapp + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
    });

    render();
  }

  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", init) : init();
})();

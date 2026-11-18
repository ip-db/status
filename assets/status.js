(function () {
  "use strict";

  var REPO = "ip-db/status";
  var RAW = "https://raw.githubusercontent.com/" + REPO + "/master/";
  var SINCE = "2026-11-18";
  var DAYS = 14;
  var REFRESH_MS = 5 * 60 * 1000;
  var INCIDENT_REFRESH_MS = 15 * 60 * 1000;

  var I18N = {
    en: {
      brand_tag: "Status", nav_api: "API", nav_contact: "Contact", language: "Language",
      title: "IP-DB Service Status",
      intro: "Real-time availability of ip-db.com services. Every service is checked every five minutes from outside our infrastructure.",
      overall_ok: "All services are operating normally",
      overall_degraded: "Some services are responding slowly",
      overall_down: "Some services are currently unavailable",
      affected: "{n} of {total} services affected",
      checked: "Last checked {t}", updates: "Refreshes automatically every five minutes",
      error_data: "Status data is temporarily unavailable. Please try again in a few minutes.",
      board_title: "Service health", board_sub: "Last {n} days, dates in UTC", today: "Today",
      col_service: "Service", col_uptime30: "30-day uptime",
      legend_ok: "Available", legend_disruption: "Partial disruption", legend_outage: "Service outage", legend_nodata: "No data",
      cell_ok: "No downtime recorded", cell_minutes: "{n} min of downtime", cell_nodata: "Monitoring was not active",
      cell_now_down: "Currently unavailable", cell_now_degraded: "Currently responding slowly",
      metrics_title: "Uptime and response time",
      col_status: "Status", col_response: "Avg. response (24 h)", col_24h: "24 hours", col_7d: "7 days", col_30d: "30 days", col_last: "Last check",
      status_up: "Operational", status_degraded: "Degraded", status_down: "Outage",
      incidents_title: "Incident history",
      incidents_none: "No incidents have been recorded since monitoring began on {date}.",
      incidents_unavailable: "Incident history could not be loaded right now.",
      ongoing: "Ongoing", resolved: "Resolved", started: "Started", duration: "Duration", unit_h: "h", unit_min: "min",
      about_title: "About this page",
      about_text: "Checks run every five minutes from independent servers outside our network. An incident is opened automatically when a service stops responding and closed when it recovers. If something is not working for you while this page shows it as available, ",
      about_link: "contact us", rights: "All rights reserved."
    },
    tr: {
      brand_tag: "Durum", nav_api: "API", nav_contact: "İletişim", language: "Dil",
      title: "IP-DB Servis Durumu",
      intro: "ip-db.com servislerinin anlık erişilebilirliği. Her servis, altyapımızın dışından beş dakikada bir kontrol edilir.",
      overall_ok: "Tüm servisler normal çalışıyor",
      overall_degraded: "Bazı servisler yavaş yanıt veriyor",
      overall_down: "Bazı servislere şu anda erişilemiyor",
      affected: "{total} servisten {n} tanesi etkileniyor",
      checked: "Son kontrol {t}", updates: "Sayfa beş dakikada bir kendiliğinden yenilenir",
      error_data: "Durum verileri şu anda alınamıyor. Lütfen birkaç dakika sonra tekrar deneyin.",
      board_title: "Servis sağlığı", board_sub: "Son {n} gün, tarihler UTC", today: "Bugün",
      col_service: "Servis", col_uptime30: "30 günlük erişim",
      legend_ok: "Erişilebilir", legend_disruption: "Kısmi kesinti", legend_outage: "Hizmet dışı", legend_nodata: "Veri yok",
      cell_ok: "Kesinti kaydı yok", cell_minutes: "{n} dk kesinti", cell_nodata: "İzleme henüz başlamamıştı",
      cell_now_down: "Şu anda erişilemiyor", cell_now_degraded: "Şu anda yavaş yanıt veriyor",
      metrics_title: "Erişim ve yanıt süresi",
      col_status: "Durum", col_response: "Ort. yanıt (24 sa)", col_24h: "24 saat", col_7d: "7 gün", col_30d: "30 gün", col_last: "Son kontrol",
      status_up: "Çalışıyor", status_degraded: "Yavaş", status_down: "Kesinti",
      incidents_title: "Olay geçmişi",
      incidents_none: "İzleme {date} tarihinde başladığından beri kayıtlı bir olay yok.",
      incidents_unavailable: "Olay geçmişi şu anda yüklenemedi.",
      ongoing: "Devam ediyor", resolved: "Çözüldü", started: "Başlangıç", duration: "Süre", unit_h: "sa", unit_min: "dk",
      about_title: "Bu sayfa hakkında",
      about_text: "Kontroller, ağımızın dışındaki bağımsız sunuculardan beş dakikada bir yapılır. Bir servis yanıt vermeyi bıraktığında otomatik olarak bir olay kaydı açılır, servis düzelince kapanır. Bu sayfa bir servisi çalışıyor gösterirken siz sorun yaşıyorsanız ",
      about_link: "bize yazın", rights: "Tüm hakları saklıdır."
    },
    de: {
      brand_tag: "Status", nav_api: "API", nav_contact: "Kontakt", language: "Sprache",
      title: "IP-DB Dienststatus",
      intro: "Aktuelle Verfügbarkeit der Dienste von ip-db.com. Jeder Dienst wird alle fünf Minuten von außerhalb unserer Infrastruktur geprüft.",
      overall_ok: "Alle Dienste laufen normal",
      overall_degraded: "Einige Dienste antworten langsam",
      overall_down: "Einige Dienste sind derzeit nicht erreichbar",
      affected: "{n} von {total} Diensten betroffen",
      checked: "Zuletzt geprüft {t}", updates: "Die Seite aktualisiert sich alle fünf Minuten",
      error_data: "Statusdaten sind vorübergehend nicht verfügbar. Bitte versuchen Sie es in einigen Minuten erneut.",
      board_title: "Zustand der Dienste", board_sub: "Letzte {n} Tage, Datumsangaben in UTC", today: "Heute",
      col_service: "Dienst", col_uptime30: "Verfügbarkeit 30 Tage",
      legend_ok: "Verfügbar", legend_disruption: "Teilweise Störung", legend_outage: "Ausfall", legend_nodata: "Keine Daten",
      cell_ok: "Keine Ausfallzeit erfasst", cell_minutes: "{n} Min. Ausfallzeit", cell_nodata: "Überwachung noch nicht aktiv",
      cell_now_down: "Derzeit nicht erreichbar", cell_now_degraded: "Antwortet derzeit langsam",
      metrics_title: "Verfügbarkeit und Antwortzeit",
      col_status: "Status", col_response: "Antwortzeit (24 Std.)", col_24h: "24 Stunden", col_7d: "7 Tage", col_30d: "30 Tage", col_last: "Letzte Prüfung",
      status_up: "In Betrieb", status_degraded: "Eingeschränkt", status_down: "Ausfall",
      incidents_title: "Störungsverlauf",
      incidents_none: "Seit Beginn der Überwachung am {date} wurden keine Störungen erfasst.",
      incidents_unavailable: "Der Störungsverlauf konnte gerade nicht geladen werden.",
      ongoing: "Andauernd", resolved: "Behoben", started: "Beginn", duration: "Dauer", unit_h: "Std.", unit_min: "Min.",
      about_title: "Über diese Seite",
      about_text: "Die Prüfungen laufen alle fünf Minuten von unabhängigen Servern außerhalb unseres Netzes. Antwortet ein Dienst nicht mehr, wird automatisch eine Störung eröffnet und nach der Wiederherstellung geschlossen. Wenn bei Ihnen etwas nicht funktioniert, obwohl diese Seite es als verfügbar anzeigt, ",
      about_link: "schreiben Sie uns", rights: "Alle Rechte vorbehalten."
    },
    es: {
      brand_tag: "Estado", nav_api: "API", nav_contact: "Contacto", language: "Idioma",
      title: "Estado de los servicios de IP-DB",
      intro: "Disponibilidad en tiempo real de los servicios de ip-db.com. Cada servicio se comprueba cada cinco minutos desde fuera de nuestra infraestructura.",
      overall_ok: "Todos los servicios funcionan con normalidad",
      overall_degraded: "Algunos servicios responden con lentitud",
      overall_down: "Algunos servicios no están disponibles en este momento",
      affected: "{n} de {total} servicios afectados",
      checked: "Última comprobación {t}", updates: "La página se actualiza cada cinco minutos",
      error_data: "Los datos de estado no están disponibles temporalmente. Inténtelo de nuevo en unos minutos.",
      board_title: "Estado de los servicios", board_sub: "Últimos {n} días, fechas en UTC", today: "Hoy",
      col_service: "Servicio", col_uptime30: "Disponibilidad 30 días",
      legend_ok: "Disponible", legend_disruption: "Interrupción parcial", legend_outage: "Caída del servicio", legend_nodata: "Sin datos",
      cell_ok: "Sin caídas registradas", cell_minutes: "{n} min de caída", cell_nodata: "La supervisión no estaba activa",
      cell_now_down: "No disponible en este momento", cell_now_degraded: "Responde con lentitud en este momento",
      metrics_title: "Disponibilidad y tiempo de respuesta",
      col_status: "Estado", col_response: "Respuesta media (24 h)", col_24h: "24 horas", col_7d: "7 días", col_30d: "30 días", col_last: "Última comprobación",
      status_up: "Operativo", status_degraded: "Reducido", status_down: "Caída",
      incidents_title: "Historial de incidencias",
      incidents_none: "No se ha registrado ninguna incidencia desde que comenzó la supervisión el {date}.",
      incidents_unavailable: "No se pudo cargar el historial de incidencias en este momento.",
      ongoing: "En curso", resolved: "Resuelta", started: "Inicio", duration: "Duración", unit_h: "h", unit_min: "min",
      about_title: "Acerca de esta página",
      about_text: "Las comprobaciones se realizan cada cinco minutos desde servidores independientes fuera de nuestra red. Cuando un servicio deja de responder se abre una incidencia automáticamente y se cierra cuando se recupera. Si algo no le funciona mientras esta página lo muestra como disponible, ",
      about_link: "escríbanos", rights: "Todos los derechos reservados."
    }
  };

  var DESC = {
    "website": { en: "Web application and IP reputation lookups", tr: "Web uygulaması ve IP itibar sorguları", de: "Webanwendung und IP-Reputationsabfragen", es: "Aplicación web y consultas de reputación IP" },
    "ip-lookup-api": { en: "REST API v1 on api.ip-db.com", tr: "api.ip-db.com üzerindeki REST API v1", de: "REST-API v1 auf api.ip-db.com", es: "API REST v1 en api.ip-db.com" },
    "api-gateway": { en: "API host and request routing", tr: "API sunucusu ve istek yönlendirme", de: "API-Host und Anfrage-Routing", es: "Host de la API y enrutamiento" },
    "statistics-api": { en: "Public statistics endpoint", tr: "Herkese açık istatistik uç noktası", de: "Öffentlicher Statistik-Endpunkt", es: "Endpoint público de estadísticas" },
    "whois-lookup": { en: "Domain WHOIS and RDAP lookups", tr: "Alan adı WHOIS ve RDAP sorguları", de: "WHOIS- und RDAP-Abfragen für Domains", es: "Consultas WHOIS y RDAP de dominios" },
    "api-documentation": { en: "Developer documentation", tr: "Geliştirici dokümantasyonu", de: "Entwicklerdokumentation", es: "Documentación para desarrolladores" }
  };

  var LOCALES = { en: "en-GB", tr: "tr-TR", de: "de-DE", es: "es-ES" };
  var state = { summary: null, checks: {}, incidents: null, incidentsError: false, error: false };
  var lang = pickLang();
  var target = (location.pathname.match(/^\/history\/([a-z0-9-]+)/) || [])[1] || null;
  var scrolledToTarget = false;

  function $(id) { return document.getElementById(id); }

  function pickLang() {
    try {
      var saved = localStorage.getItem("ipdb-status-lang");
      if (saved && I18N[saved]) return saved;
    } catch (e) { /* storage unavailable */ }
    var nav = (navigator.language || "en").slice(0, 2).toLowerCase();
    return I18N[nav] ? nav : "en";
  }

  function t(key, vars) {
    var s = (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
    if (vars) Object.keys(vars).forEach(function (k) { s = s.split("{" + k + "}").join(vars[k]); });
    return s;
  }

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c];
    });
  }

  function icon(kind, label) {
    var a11y = label ? ' role="img" aria-label="' + esc(label) + '"' : ' aria-hidden="true"';
    return '<svg class="ico ' + kind + '"' + a11y + '><use href="#i-' + kind + '"/></svg>';
  }

  function locale() { return LOCALES[lang] || "en-GB"; }

  function isoDay(date) { return date.toISOString().slice(0, 10); }

  function lastDays(n) {
    var now = new Date();
    var out = [];
    for (var i = n - 1; i >= 0; i--) {
      out.push(isoDay(new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - i))));
    }
    return out;
  }

  function fmtDay(iso, opts) {
    var o = { timeZone: "UTC" };
    Object.keys(opts).forEach(function (k) { o[k] = opts[k]; });
    return new Intl.DateTimeFormat(locale(), o).format(new Date(iso + "T00:00:00Z"));
  }

  function fmtDateTime(value) {
    return new Intl.DateTimeFormat(locale(), { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
  }

  function relTime(value) {
    var diff = (new Date(value).getTime() - Date.now()) / 1000;
    var rtf = new Intl.RelativeTimeFormat(locale(), { numeric: "auto" });
    var abs = Math.abs(diff);
    if (abs < 60) return rtf.format(Math.round(diff), "second");
    if (abs < 3600) return rtf.format(Math.round(diff / 60), "minute");
    if (abs < 86400) return rtf.format(Math.round(diff / 3600), "hour");
    return rtf.format(Math.round(diff / 86400), "day");
  }

  function fmtDuration(ms) {
    var mins = Math.max(1, Math.round(ms / 60000));
    var h = Math.floor(mins / 60);
    var m = mins % 60;
    return (h ? h + " " + t("unit_h") + " " : "") + (m || !h ? m + " " + t("unit_min") : "");
  }

  function dayClass(i) {
    return i < DAYS - 7 ? "old mid" : i < DAYS - 4 ? "mid" : "";
  }

  function currentKind(status) {
    return status === "down" ? "outage" : status === "degraded" ? "disruption" : "ok";
  }

  function dayInfo(site, iso, today) {
    if (iso < SINCE) return { kind: "nodata", text: t("cell_nodata") };
    var mins = (site.dailyMinutesDown || {})[iso] || 0;
    if (iso === today && site.status === "down") return { kind: "outage", text: t("cell_now_down") };
    if (iso === today && site.status === "degraded" && !mins) return { kind: "disruption", text: t("cell_now_degraded") };
    if (!mins) return { kind: "ok", text: t("cell_ok") };
    return { kind: mins >= 60 ? "outage" : "disruption", text: t("cell_minutes", { n: mins }) };
  }

  function parseYml(text) {
    var out = {};
    (text || "").split("\n").forEach(function (line) {
      var m = line.match(/^(\w+):\s*(.*)$/);
      if (m) out[m[1]] = m[2].trim();
    });
    return out;
  }

  function lastChecked() {
    var latest = 0;
    Object.keys(state.checks).forEach(function (slug) {
      var ts = Date.parse(state.checks[slug].lastUpdated || "");
      if (ts > latest) latest = ts;
    });
    return latest || null;
  }

  function applyStatic() {
    document.documentElement.lang = lang;
    document.title = t("title");
    Array.prototype.forEach.call(document.querySelectorAll("[data-i18n]"), function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    $("lang").value = lang;
    $("legend").innerHTML = ["ok", "disruption", "outage", "nodata"].map(function (k) {
      return "<li>" + icon(k) + "<span>" + esc(t("legend_" + k)) + "</span></li>";
    }).join("");
  }

  function renderOverall() {
    var el = $("overall");
    var title = $("overall-title");
    var meta = $("overall-meta");
    var use = el.querySelector("use");
    el.className = "overall";
    if (!state.summary) {
      if (state.error) {
        el.classList.add("is-error");
        title.textContent = t("error_data");
        meta.innerHTML = "&nbsp;";
      }
      return;
    }
    var total = state.summary.length;
    var down = state.summary.filter(function (s) { return s.status === "down"; }).length;
    var slow = state.summary.filter(function (s) { return s.status === "degraded"; }).length;
    var kind = down ? "down" : slow ? "degraded" : "ok";
    el.classList.add("is-" + kind);
    use.setAttribute("href", kind === "down" ? "#i-outage" : kind === "degraded" ? "#i-disruption" : "#i-ok");
    title.textContent = kind === "ok" ? t("overall_ok") : (kind === "down" ? t("overall_down") : t("overall_degraded"));
    var parts = [];
    if (kind !== "ok") parts.push(t("affected", { n: down + slow, total: total }));
    var checked = lastChecked();
    if (checked) parts.push(t("checked", { t: relTime(checked) }));
    parts.push(t("updates"));
    meta.textContent = parts.join(" · ");
  }

  function renderGrid() {
    var days = lastDays(DAYS);
    var today = days[days.length - 1];
    var head = '<th class="svc-h" scope="col">' + esc(t("col_service")) + "</th>";
    days.forEach(function (iso, i) {
      var cls = dayClass(i) + (iso === today ? " today" : "");
      var label = iso === today ? t("today") : fmtDay(iso, { day: "numeric", month: "short" });
      head += '<th scope="col" class="' + cls.trim() + '">' + esc(label) + "</th>";
    });
    head += '<th class="up-h" scope="col">' + esc(t("col_uptime30")) + "</th>";
    $("grid-head").innerHTML = head;

    var body = "";
    if (!state.summary) {
      for (var r = 0; r < 6; r++) {
        body += '<tr class="skeleton"><th class="svc" scope="row"><span class="bar" style="width:' + (120 + r * 9) + 'px"></span></th>';
        days.forEach(function (iso, i) { body += '<td class="day ' + dayClass(i) + '"><span class="bar" style="width:18px;margin:auto"></span></td>'; });
        body += '<td class="up"><span class="bar" style="width:52px;margin-left:auto"></span></td></tr>';
      }
      $("grid-body").innerHTML = body;
      return;
    }
    state.summary.forEach(function (site) {
      var desc = (DESC[site.slug] || {})[lang] || (DESC[site.slug] || {}).en || "";
      var now = currentKind(site.status);
      body += '<tr id="svc-' + esc(site.slug) + '"' + (site.slug === target ? ' class="is-target"' : "") + ">";
      body += '<th class="svc" scope="row"><div class="svc-name">' + icon(now, t("status_" + site.status)) + "<span>" + esc(site.name) + "</span></div>";
      if (desc) body += '<div class="svc-desc">' + esc(desc) + "</div>";
      body += "</th>";
      days.forEach(function (iso, i) {
        var info = dayInfo(site, iso, today);
        var dateLabel = fmtDay(iso, { weekday: "short", day: "numeric", month: "long", year: "numeric" });
        body += '<td class="day ' + dayClass(i) + '"><span class="cell" tabindex="0" data-tip-title="' + esc(dateLabel) + '" data-tip-text="' + esc(info.text) + '">' + icon(info.kind, dateLabel + ": " + info.text) + "</span></td>";
      });
      body += '<td class="up">' + esc(site.uptimeMonth || site.uptime || "") + "</td></tr>";
    });
    $("grid-body").innerHTML = body;

    var wrap = $("grid").parentNode;
    wrap.scrollLeft = wrap.scrollWidth;

    if (target && !scrolledToTarget) {
      var row = $("svc-" + target);
      if (row) { row.scrollIntoView({ block: "center" }); scrolledToTarget = true; }
    }
  }

  function renderMetrics() {
    var cols = ["col_service", "col_status", "col_response", "col_24h", "col_7d", "col_30d", "col_last"];
    $("metrics-head").innerHTML = cols.map(function (c) { return '<th scope="col">' + esc(t(c)) + "</th>"; }).join("");
    if (!state.summary) { $("metrics-body").innerHTML = ""; return; }
    $("metrics-body").innerHTML = state.summary.map(function (site) {
      var kind = currentKind(site.status);
      var check = state.checks[site.slug] || {};
      var last = check.lastUpdated ? '<span title="' + esc(fmtDateTime(check.lastUpdated)) + '">' + esc(relTime(check.lastUpdated)) + "</span>" : '<span class="muted">-</span>';
      var ms = site.timeDay || site.time;
      return "<tr><td>" + esc(site.name) + '</td><td><span class="pill ' + kind + '">' + icon(kind) + esc(t("status_" + site.status)) + "</span></td>" +
        "<td>" + (ms ? esc(ms) + " ms" : "-") + "</td><td>" + esc(site.uptimeDay || "-") + "</td><td>" + esc(site.uptimeWeek || "-") + "</td><td>" + esc(site.uptimeMonth || "-") + "</td><td>" + last + "</td></tr>";
    }).join("");
  }

  function renderIncidents() {
    var box = $("incidents");
    if (state.incidents === null && !state.incidentsError) { box.innerHTML = ""; return; }
    if (state.incidentsError && !state.incidents) {
      box.innerHTML = '<div class="empty">' + icon("nodata") + "<span>" + esc(t("incidents_unavailable")) + "</span></div>";
      return;
    }
    if (!state.incidents.length) {
      var since = fmtDay(SINCE, { day: "numeric", month: "long", year: "numeric" });
      box.innerHTML = '<div class="empty">' + icon("ok") + "<span>" + esc(t("incidents_none", { date: since })) + "</span></div>";
      return;
    }
    box.innerHTML = state.incidents.map(function (it) {
      var open = it.state === "open";
      var title = String(it.title || "").replace(/^[^A-Za-z0-9]+/, "");
      var end = open ? Date.now() : Date.parse(it.closed_at);
      var meta = t("started") + ": " + fmtDateTime(it.created_at) + " · " + t("duration") + ": " + fmtDuration(end - Date.parse(it.created_at));
      return '<div class="inc">' + icon(open ? "outage" : "ok") +
        '<a class="inc-title" href="' + esc(it.html_url) + '" rel="noopener">' + esc(title) + "</a>" +
        '<span class="inc-state ' + (open ? "open" : "closed") + '">' + esc(open ? t("ongoing") : t("resolved")) + "</span>" +
        '<div class="inc-meta">' + esc(meta) + "</div></div>";
    }).join("");
  }

  function render() {
    renderOverall();
    renderGrid();
    renderMetrics();
    renderIncidents();
  }

  function loadStatus() {
    var bust = Math.floor(Date.now() / 60000);
    return fetch(RAW + "history/summary.json?t=" + bust, { cache: "no-store" })
      .then(function (r) { if (!r.ok) throw new Error(String(r.status)); return r.json(); })
      .then(function (summary) {
        return Promise.all(summary.map(function (s) {
          return fetch(RAW + "history/" + s.slug + ".yml?t=" + bust, { cache: "no-store" })
            .then(function (r) { return r.ok ? r.text() : ""; })
            .catch(function () { return ""; });
        })).then(function (texts) {
          var checks = {};
          summary.forEach(function (s, i) { checks[s.slug] = parseYml(texts[i]); });
          state.summary = summary;
          state.checks = checks;
          state.error = false;
        });
      })
      .catch(function () { state.error = true; })
      .then(render);
  }

  function loadIncidents() {
    return fetch("https://api.github.com/repos/" + REPO + "/issues?state=all&labels=status&per_page=30", { headers: { Accept: "application/vnd.github+json" } })
      .then(function (r) { if (!r.ok) throw new Error(String(r.status)); return r.json(); })
      .then(function (items) {
        state.incidents = items.filter(function (i) { return !i.pull_request; });
        state.incidentsError = false;
      })
      .catch(function () { state.incidentsError = true; })
      .then(renderIncidents);
  }

  var tip = $("tip");
  function showTip(el) {
    tip.innerHTML = "<b>" + esc(el.getAttribute("data-tip-title")) + "</b>" + esc(el.getAttribute("data-tip-text"));
    tip.hidden = false;
    var r = el.getBoundingClientRect();
    var w = tip.offsetWidth;
    var h = tip.offsetHeight;
    var left = Math.min(window.innerWidth - w - 8, Math.max(8, r.left + r.width / 2 - w / 2));
    var top = r.top - h - 8;
    if (top < 72) top = r.bottom + 8;
    tip.style.left = left + "px";
    tip.style.top = top + "px";
  }
  function hideTip() { tip.hidden = true; }
  document.addEventListener("mouseover", function (e) {
    var cell = e.target.closest && e.target.closest(".cell");
    if (cell) showTip(cell); else hideTip();
  });
  document.addEventListener("focusin", function (e) {
    if (e.target.classList && e.target.classList.contains("cell")) showTip(e.target);
  });
  document.addEventListener("focusout", hideTip);
  window.addEventListener("scroll", hideTip, { passive: true });

  $("lang").addEventListener("change", function () {
    lang = I18N[this.value] ? this.value : "en";
    try { localStorage.setItem("ipdb-status-lang", lang); } catch (e) { /* storage unavailable */ }
    applyStatic();
    render();
  });

  applyStatic();
  render();
  loadStatus();
  loadIncidents();
  setInterval(loadStatus, REFRESH_MS);
  setInterval(loadIncidents, INCIDENT_REFRESH_MS);
  setInterval(function () { renderOverall(); renderMetrics(); }, 60000);
})();

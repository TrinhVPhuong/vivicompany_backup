/*! Localize - v0.2.0 - 2016-10-13
 * https://github.com/coderifous/jquery-localize
 * Copyright (c) 2016 coderifous; Licensed MIT */
!(function (a) {
  var b;
  return (
    (b = function (a) {
      return (a = a.replace(/_/, "-").toLowerCase()), a.length > 3 && (a = a.substring(0, 3) + a.substring(3).toUpperCase()), a;
    }),
    (a.defaultLanguage = b(navigator.languages && navigator.languages.length > 0 ? navigator.languages[0] : navigator.language || navigator.userLanguage)),
    (a.localize = function (c, d) {
      var e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v;
      return (
        null == d && (d = {}),
        (v = this),
        (h = {}),
        (g = d.fileExtension || "json"),
        (f = a.Deferred()),
        (k = function (a, b, c) {
          var e;
          switch ((null == c && (c = 1), c)) {
            case 1:
              return (h = {}), d.loadBase ? ((e = a + ("." + g)), i(e, a, b, c)) : k(a, b, 2);
            case 2:
              return (e = "" + a + "-" + b.split("-")[0] + "." + g), i(e, a, b, c);
            case 3:
              return (e = "" + a + "-" + b.split("-").slice(0, 2).join("-") + "." + g), i(e, a, b, c);
            default:
              return f.resolve();
          }
        }),
        (i = function (b, c, e, f) {
          var g, i, j;
          return (
            null != d.pathPrefix && (b = "" + d.pathPrefix + "/" + b),
            (j = function (b) {
              return a.extend(h, b), q(h), k(c, e, f + 1);
            }),
            (i = function () {
              return 2 === f && e.indexOf("-") > -1 ? k(c, e, f + 1) : d.fallback && d.fallback !== e ? k(c, d.fallback) : void 0;
            }),
            (g = { url: b, dataType: "json", async: !0, timeout: null != d.timeout ? d.timeout : 500, success: j, error: i }),
            "file:" === window.location.protocol &&
              (g.error = function (b) {
                return j(a.parseJSON(b.responseText));
              }),
            a.ajax(g)
          );
        }),
        (q = function (a) {
          return null != d.callback ? d.callback(a, e) : e(a);
        }),
        (e = function (b) {
          return (
            (a.localize.data[c] = b),
            v.each(function () {
              var c, d, e;
              return (c = a(this)), (d = c.data("localize")), d || (d = c.attr("rel").match(/localize\[(.*?)\]/)[1]), (e = u(d, b)), null != e ? l(c, d, e) : void 0;
            })
          );
        }),
        (l = function (b, c, d) {
          return b.is("input") ? o(b, c, d) : b.is("textarea") ? o(b, c, d) : b.is("img") ? n(b, c, d) : b.is("optgroup") ? p(b, c, d) : a.isPlainObject(d) || b.html(d), a.isPlainObject(d) ? m(b, d) : void 0;
        }),
        (o = function (b, c, d) {
          var e;
          return (e = a.isPlainObject(d) ? d.value : d), b.is("[placeholder]") ? b.attr("placeholder", e) : b.val(e);
        }),
        (m = function (a, b) {
          return s(a, "title", b), s(a, "href", b), t(a, "text", b);
        }),
        (p = function (a, b, c) {
          return a.attr("label", c);
        }),
        (n = function (a, b, c) {
          return s(a, "alt", c), s(a, "src", c);
        }),
        (u = function (a, b) {
          var c, d, e, f;
          for (c = a.split(/\./), d = b, e = 0, f = c.length; f > e; e++) (a = c[e]), (d = null != d ? d[a] : null);
          return d;
        }),
        (s = function (a, b, c) {
          return (c = u(b, c)), null != c ? a.attr(b, c) : void 0;
        }),
        (t = function (a, b, c) {
          return (c = u(b, c)), null != c ? a.text(c) : void 0;
        }),
        (r = function (a) {
          var b;
          return "string" == typeof a
            ? "^" + a + "$"
            : null != a.length
            ? (function () {
                var c, d, e;
                for (e = [], c = 0, d = a.length; d > c; c++) (b = a[c]), e.push(r(b));
                return e;
              })().join("|")
            : a;
        }),
        (j = b(d.language ? d.language : a.defaultLanguage)),
        d.skipLanguage && j.match(r(d.skipLanguage)) ? f.resolve() : k(c, j, 1),
        (v.localizePromise = f),
        v
      );
    }),
    (a.fn.localize = a.localize),
    (a.localize.data = {})
  );
})(jQuery);

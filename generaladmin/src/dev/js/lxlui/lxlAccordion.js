//lxlAccordion
(function($) {
  $.fn.lxlAccordion = function() {
    return $.lxlui.run.call(this, "lxlAccordion", arguments);
  };
  $.fn.lxlAccordionMgr = function() {
    return $.lxlui.run.call(this, "lxlAccordionMgr", arguments);
  };
  $.lxlDefaults.Accordion = {
    height: '100%',
    changeHeightOnResize: true
  };
  $.lxlMethos.Accordion = {};
  $.lxlui.controls.Accordion = function(element, options) {
    $.lxlui.controls.Accordion.base.constructor.call(this, element, options);
  };
  $.lxlui.controls.Accordion.lxlExtend($.lxlui.core.UIComponent, {
    __getType: function() {
      return 'Accordion';
    },
    __idPrev: function() {
      return 'Accordion';
    },
    _extendMethods: function() {
      return $.lxlMethos.Accordion;
    },
    _render: function() {
      var g = this,
        p = this.options;
      var selectedIndex = 0;
      g.accordion = $(g.element).addClass('accordion');
      g.accordion.current = $("> div[selected='true']", g.accordion);
      if (g.accordion.current.length > 0) selectedIndex = $("> div", g.accordion).index(g.accordion.current);
      $.each($("> div", g.accordion), function(i, box) {
        var header = $('<div class="accordion-header"><div class="accordion-header-inner"></div><div class="accordion-toggle"></div></div>');
        if (i == selectedIndex) {
          $(".accordion-toggle", header).addClass("accordion-toggle-open");
          if (g.accordion.current.attr("data-url")) {
            g.accordion.current.html('<p class="loaddata"><span class="loading">loading...</span></p>');
            setTimeout(function() {
              g.accordion.current.load(ajaxPath2 + g.accordion.current.attr("data-url"), function() {
                // $('.tree', $(this)).lxlTree({
                //   target: g.accordion
                // });
              }).removeAttr("data-url");
            }, 1000);
          }
        }
        $(box).before(header);
        if ($(box).attr("title")) {
          $(".accordion-header-inner", header).html($(box).attr("title"));
          $(box).removeAttr("title");
        }
        if ($(box).attr("icon")) {
          $(".accordion-header-inner", header).before('<div class="accordion-ico"><img src="' + $(box).attr("icon") + '"></div>');
          $(box).removeAttr("icon");
        }
        if ($(box).attr("headerStyle")) {
          var attroptions = $(box).attr("headerStyle");
          if (attroptions.indexOf('{') !== 0) attroptions = '{"' + attroptions.substr(0, attroptions.length - 1).replace(/[\s]+/g, '').replace(/[;]/g, '","').replace(/[:]/g, '":"') + '"}';
          eval("attroptions = " + attroptions + ";");
          $(".accordion-header-inner", header).css(attroptions);
          $(box).attr("headerStyle", "");
        }
        if (!$(box).hasClass("accordion-content")) $(box).addClass("accordion-content");
      });
      $(".accordion-toggle", g.accordion).each(function() {
        if (!$(this).hasClass("accordion-toggle-open") && !$(this).hasClass("accordion-toggle-close")) {
          $(this).addClass("accordion-toggle-close");
        }
        if ($(this).hasClass("accordion-toggle-close")) {
          $(this).parent().next(".accordion-content:visible").hide();
        }
      });
      $("> div.accordion-header", g.accordion).eq(selectedIndex + 1).addClass("accordion-header-next");
      $("> div.accordion-header", g.accordion).hover(function() {
        $(this).addClass("accordion-header-hover");
        if ($(this).find(".accordion-toggle").hasClass("accordion-toggle-open")) {
          $(this).find(".accordion-toggle").addClass("accordion-toggle-open-hover");
        } else {
          $(this).find(".accordion-toggle").addClass("accordion-toggle-close-hover");
        }
      }, function() {
        $(this).removeClass("accordion-header-hover");
        if ($(this).find(".accordion-toggle").hasClass("accordion-toggle-open")) {
          $(this).find(".accordion-toggle").removeClass("accordion-toggle-open-hover");
        } else {
          $(this).find(".accordion-toggle").removeClass("accordion-toggle-close-hover");
        }
      });
      $("> div.accordion-header", g.accordion).click(function() {
        var togglebtn = $(".accordion-toggle:first", this),
          togglecnt = $(this).next(".accordion-content");
        if (togglebtn.hasClass("accordion-toggle-close")) {
          togglebtn.removeClass("accordion-toggle-close").removeClass("accordion-toggle-close-hover").addClass("accordion-toggle-open");
          togglecnt.show().siblings(".accordion-content:visible").hide();
          //togglecnt.slideDown(200).siblings(".accordion-content:visible").slideUp(200);
          $(this).siblings(".accordion-header").find(".accordion-toggle").removeClass("accordion-toggle-open").addClass("accordion-toggle-close");
          $(this).parent().children().removeClass("accordion-header-next");
          $(this).next().next().addClass("accordion-header-next");
          if (togglecnt.attr("data-url")) {
            togglecnt.html('<p class="loaddata"><span class="loading">loading...</span></p>')
              .load(ajaxPath2 + togglecnt.attr("data-url"), function() {
                // $('.tree', $(this)).lxlTree({
                //   target: g.accordion
                // });
              }).removeAttr("data-url");
          }
        } else {
          return false;
        }
      });
      g.headerHoldHeight = 0;
      $("> .accordion-header", g.accordion).each(function() {
        g.headerHoldHeight += $(this).outerHeight();
      });
      if (p.height && typeof(p.height) == 'string' && p.height.indexOf('%') > 0) {
        g.onResize();
        if (p.changeHeightOnResize) $(window).resize(function() {
          g.onResize();
        });
      } else {
        if (p.height) {
          g.height = p.height;
          g.accordion.height(g.height);
          g.setHeight(p.height);
        } else {
          g.header = g.accordion.height();
        }
      }
      g.set(p);
    },
    onResize: function() {
      var g = this,
        p = this.options;
      if (!p.height || typeof(p.height) != 'string' || p.height.indexOf('%') == -1) return false;
      if (g.accordion.parent()[0].tagName.toLowerCase() == "body") {
        var windowHeight = $(window).height();
        windowHeight -= parseInt(g.accordion.parent().css('paddingTop'));
        windowHeight -= parseInt(g.accordion.parent().css('paddingBottom'));
        g.height = windowHeight;
      } else {
        g.height = g.accordion.parent().height() * parseFloat(p.height) * 0.01;
        if (g.accordion.prev().length > 0) g.height -= g.accordion.prev().outerHeight();
        // if (!-[1, ] && !window.XMLHttpRequest) g.height = $(window).height() - 85;
      }
      g.accordion.height(g.height);
      $("> .accordion-content", g.accordion).height(g.height - g.headerHoldHeight);
    },
    setHeight: function(height) {
      var g = this,
        p = this.options;
      g.accordion.height(height);
      height -= g.headerHoldHeight;
      $("> .accordion-content", g.accordion).height(height);
    }
  });
})(jQuery);

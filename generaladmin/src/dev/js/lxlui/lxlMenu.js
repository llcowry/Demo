//lxlMenu
(function($) {
  $.lxlMenu = function() {
    return $.lxlui.run.call(null, "lxlMenu", arguments);
  };
  $.lxlDefaults.Menu = {
    width: 120,
    top: 0,
    left: 0,
    items: null
  };
  $.lxlMethos.Menu = {};
  $.lxlui.controls.Menu = function(options) {
    $.lxlui.controls.Menu.base.constructor.call(this, null, options);
  };
  $.lxlui.controls.Menu.lxlExtend($.lxlui.core.UIComponent, {
    __getType: function() {
      return 'Menu';
    },
    __idPrev: function() {
      return 'Menu';
    },
    _extendMethods: function() {
      return $.lxlMethos.Menu;
    },
    _render: function() {
      var g = this,
        p = this.options;
      g.menuItemCount = 0;
      g.menus = {};
      g.menu = g.createMenu();
      g.element = g.menu[0];
      g.menu.css({
        top: p.top,
        left: p.left,
        width: p.width
      });
      p.items && $(p.items).each(function(i, item) {
        g.addItem(item);
      });
      $(document).bind('click.menu', function() {
        for (var menuid in g.menus) {
          var menu = g.menus[menuid];
          if (!menu) return;
          menu.hide();
        }
      });
      g.set(p);
    },
    show: function(options, menu) {
      var g = this,
        p = this.options;
      if (menu === undefined) menu = g.menu;
      if (options && options.left !== undefined) {
        menu.css({
          left: options.left
        });
      }
      if (options && options.top !== undefined) {
        menu.css({
          top: options.top
        });
      }
      menu.show();
      $(".menu[lxluiid!='" + menu.attr("lxluiid") + "']").each(function() {
        $(this).remove();
      });
    },
    hide: function(menu) {
      var g = this,
        p = this.options;
      if (menu === undefined) menu = g.menu;
      g.hideAllSubMenu(menu);
      menu.hide();
    },
    toggle: function() {
      var g = this,
        p = this.options;
      g.menu.toggle();
    },
    removeItem: function(itemid) {
      var g = this,
        p = this.options;
      $("> .menu-item[menuitemid=" + itemid + "]", g.menu.items).remove();
    },
    setEnabled: function(itemid) {
      var g = this,
        p = this.options;
      $("> .menu-item[menuitemid=" + itemid + "]", g.menu.items).removeClass("menu-item-disable");
    },
    setDisabled: function(itemid) {
      var g = this,
        p = this.options;
      $("> .menu-item[menuitemid=" + itemid + "]", g.menu.items).addClass("menu-item-disable");
    },
    isEnable: function(itemid) {
      var g = this,
        p = this.options;
      return !$("> .menu-item[menuitemid=" + itemid + "]", g.menu.items).hasClass("menu-item-disable");
    },
    getItemCount: function() {
      var g = this,
        p = this.options;
      return $("> .menu-item", g.menu.items).length;
    },
    addItem: function(item, menu) {
      var g = this,
        p = this.options;
      if (!item) return;
      if (menu === undefined) menu = g.menu;
      if (item.line) {
        menu.items.append('<div class="menu-item-line"></div>');
        return;
      }
      var ditem = $('<div class="menu-item"><div class="menu-item-text"></div> </div>');
      var itemcount = $("> .menu-item", menu.items).length;
      menu.items.append(ditem);
      ditem.attr("lxluimenutemid", ++g.menuItemCount);
      item.id && ditem.attr("menuitemid", item.id);
      item.text && $(">.menu-item-text:first", ditem).html(item.text);
      item.icon && ditem.prepend('<div class="menu-item-icon icon-' + item.icon + '"></div>');
      if (item.disable || item.disabled) ditem.addClass("menu-item-disable");
      if (item.children) {
        ditem.append('<div class="menu-item-arrow"></div>');
        var newmenu = g.createMenu(ditem.attr("lxluimenutemid"));
        g.menus[ditem.attr("lxluimenutemid")] = newmenu;
        newmenu.width(p.width);
        newmenu.hover(null,
          function() {
            if (!newmenu.showedSubMenu) g.hide(newmenu);
          });
        $(item.children).each(function() {
          g.addItem(this, newmenu);
        });
      }
      item.click && ditem.click(function() {
        if ($(this).hasClass("menu-item-disable")) return;
        item.click(item, itemcount);
      });
      item.dblclick && ditem.dblclick(function() {
        if ($(this).hasClass("menu-item-disable")) return;
        item.dblclick(item, itemcount);
      });
      var menuover = $("> .menu-over:first", menu);
      ditem.hover(function() {
          if ($(this).hasClass("menu-item-disable")) return;
          var itemtop = $(this).offset().top;
          var top = itemtop - menu.offset().top;
          menuover.css({
            top: top
          });
          g.hideAllSubMenu(menu);
          if (item.children) {
            var lxluimenutemid = $(this).attr("lxluimenutemid");
            if (!lxluimenutemid) return;
            if (g.menus[lxluimenutemid]) {
              g.show({
                  top: itemtop,
                  left: $(this).offset().left + $(this).width() - 5
                },
                g.menus[lxluimenutemid]);
              menu.showedSubMenu = true;
            }
          }
        },
        function() {
          if ($(this).hasClass("menu-item-disable")) return;
          var lxluimenutemid = $(this).attr("lxluimenutemid");
          if (item.children) {
            var lxluimenutemid = $(this).attr("lxluimenutemid");
            if (!lxluimenutemid) return;
          }
        });
    },
    hideAllSubMenu: function(menu) {
      var g = this,
        p = this.options;
      if (menu === undefined) menu = g.menu;
      $("> .menu-item", menu.items).each(function() {
        if ($("> .menu-item-arrow", this).length > 0) {
          var lxluimenutemid = $(this).attr("lxluimenutemid");
          if (!lxluimenutemid) return;
          g.menus[lxluimenutemid] && g.hide(g.menus[lxluimenutemid]);
        }
      });
      menu.showedSubMenu = false;
    },
    createMenu: function(parentMenuItemID) {
      var g = this,
        p = this.options,
        mihtml;
      mihtml = '<div class="menu-yline"></div><div class="menu-over"><div class="menu-over-l"></div><div class="menu-over-r"></div></div><div class="menu-inner"></div>';
      var menu = $('<div class="menu" style="display:none">' + mihtml + '</div>');
      parentMenuItemID && menu.attr("lxluiparentmenuitemid", parentMenuItemID);
      menu.items = $("> .menu-inner:first", menu);
      menu.appendTo('body');
      menu.hover(null, function() {
        if (!menu.showedSubMenu) $("> .menu-over:first", menu).css({
          top: -24
        });
      });
      if (parentMenuItemID) g.menus[parentMenuItemID] = menu;
      else g.menus[0] = menu;
      return menu;
    }
  });
})(jQuery);

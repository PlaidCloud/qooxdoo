/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2010 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Tristan Koch (tristankoch)

************************************************************************ */

qx.Class.define("demobrowser.demo.ui.overview.TabView",
{
  extend : qx.ui.tabview.TabView,


  construct : function()
  {
    this.base(arguments);

    this.__init();
    this.addListener("changeSelection", this.__rememberCurrentTab, this);
    this.__setCurrentTab();
  },

  members :
  {
    __init: function(){
      // Basic
      var basic = new demobrowser.demo.ui.overview.pages.Basic();
      this.add(basic);

      // Control
      var control = new demobrowser.demo.ui.overview.pages.Control();
      this.add(control);

      // Form
      var form = new demobrowser.demo.ui.overview.pages.Form();
      this.add(form);

      // Embed
      var embed = new demobrowser.demo.ui.overview.pages.Embed();
      this.add(embed);

      // EmbedFrame
      var embedFrame = new demobrowser.demo.ui.overview.pages.EmbedFrame();
      this.add(embedFrame);

      // Menu
      var menu = new demobrowser.demo.ui.overview.pages.ToolBar();
      this.add(menu);

      // Window
      var window = new demobrowser.demo.ui.overview.pages.Window();
      this.add(window);

    },

    __rememberCurrentTab: function(e) {
      qx.bom.Cookie.set("currentTab", e.getData()[0].getLabel());
    },

    __setCurrentTab: function() {
      var cookie = qx.bom.Cookie.get("currentTab") ||
                   qx.bom.Cookie.set("currentTab", "basic");

      var currentTab = new qx.type.Array().append(this.getSelectables()).filter(function(tab) {
        return tab.getLabel() == cookie;
      })[0];

      if (currentTab) {
        this.setSelection([currentTab]);
      }
    }
  }
});

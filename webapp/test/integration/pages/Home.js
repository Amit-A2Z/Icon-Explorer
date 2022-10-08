sap.ui.define(["sap/ui/test/Opa5","sap/ui/test/actions/Press","sap/ui/test/actions/EnterText","sap/ui/demo/iconexplorer/controls/TitleLink"],function(e,t,n,i){"use strict";var o="Home";e.createPageObjects({onTheHomePage:{actions:{iClickOnTheTNTTitleLink:function(){return this.waitFor({controlType:i,matchers:function(e){return e.getCustomData().length&&e.getCustomData()[0].getValue()==="SAP-icons-TNT"},viewName:o,actions:new t,errorMessage:"Did not find the SAP icons TNT Title Link"})},iSearchForAnIcon:function(e){return this.waitFor({id:"search",viewName:o,actions:[new n({text:e}),new t],errorMessage:"Can't find the Input Field"})},iEnterTextIntoSearchField:function(){return this.waitFor({id:"search",viewName:o,actions:new n({text:"xxx"}),errorMessage:"Can't find the Input Field"})},iSelectASuggestion:function(e){return this.waitFor({id:"search-popup-table",viewName:o,actions:function(n){var i=n.getItems();for(var o=0;o<i.length;o++){if(i[o].getCells()[1].getText()===e){(new t).executeOn(i[o]);return}}},errorMessage:"Can't see the Input Field"})}},assertions:{iShouldSeeSomeFontTiles:function(){return this.waitFor({controlType:"sap.ui.layout.BlockLayoutCell",viewName:o,success:function(t){e.assert.ok(t.length>3,"Found at least 3 block layout cells")},errorMessage:"Can't find block layout cells on the home page"})},theSearchFieldShouldBeEmpty:function(){return this.waitFor({id:"search",viewName:o,success:function(t){e.assert.ok(!t.getProperty("value"))}})}}}})});
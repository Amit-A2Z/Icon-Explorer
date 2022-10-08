sap.ui.define(["sap/ui/test/Opa5","./Common","sap/ui/test/actions/Press","sap/ui/test/actions/EnterText","sap/ui/test/matchers/Ancestor","sap/ui/test/matchers/AggregationLengthEquals","sap/ui/test/matchers/AggregationFilled","sap/ui/test/matchers/Properties","sap/ui/test/matchers/PropertyStrictEquals"],function(e,t,n,i,r,s,o,a,c){"use strict";var h="Overview",u="results",l="searchField",g="*!-Q@@||";function m(e){var t=e[0],n=e[1],i=t.getItems();if(i.length===0){return false}return i.every(function(e){return e.getCells()[1].getText().indexOf(n.getValue())!==-1})}function f(e,t){var n=t.getItems();if(n.length===0){return false}return!!n.some(function(t){var n;if(t.getCells){n=t.getCells()[1].getText()}else{n=t.getContent()[0].getItems()[1].getText()}return n.indexOf(e)!==-1})}function w(e,t){var n=t.getItems();if(n.length!==1){return false}return n[0].getCells()[1].getText().indexOf(e)!==-1}function d(e,t,n){var i=n.getItems();if(i.length===0){return false}return i.every(function(n){return n.getBindingContext(t).getProperty("tagString").search(e)>=0})}function T(e){var t=e.name;return{id:u,viewName:h,matchers:function(e){return e.getItems().filter(function(e){return e.getCells()[1].getText()===t})},actions:e.actions,success:e.success,errorMessage:'Table in view "'+h+'" does not contain an Item with name "'+t+'"'}}function v(e){var t=e.name;return{id:u,viewName:h,matchers:function(e){return e.getItems().filter(function(e){return e.getCells()[1].getText()===t})},success:function(t){var n=t[0];if(n){return this.waitFor({controlType:"sap.m.RatingIndicator",matchers:new r(n),actions:e.actions,success:e.success})}},errorMessage:'Table in view "'+h+'" does not contain an Item with name "'+t+'"'}}function b(e){var t=e.position;return{id:u,viewName:h,matchers:function(e){return e.getItems()[t]},actions:e.actions,success:e.success,errorMessage:'Table in view "'+h+'" does not contain an Item at position "'+t+'"'}}e.createPageObjects({onTheOverviewPage:{baseClass:t,actions:{iPressTheNavigationBackButton:function(){return this.waitFor({id:"buttonNavigateBack",viewName:h,actions:new n,errorMessage:"The Button is not there"})},iPressATableItemWithName:function(e){return this.waitFor(T({name:e,actions:new n}))},iPressATableItemAtPosition:function(e){return this.waitFor(b({position:e,actions:new n}))},iRememberTheItemAtPosition:function(e){return this.waitFor(b({position:e,success:function(e){var t=e.getBindingContext();this.getContext().currentItem={name:t.getProperty("name")}}}))},iMarkAnIconAsFavorite:function(e){return this.waitFor(v({name:e,actions:new n({idSuffix:"selector"})}))},iPressOnMoreData:function(){return this.waitFor({id:u,viewName:h,actions:new n,errorMessage:"The Table does not have a trigger"})},iWaitUntilTheTableIsLoaded:function(){return this.waitFor({id:u,viewName:h,matchers:new o({name:"items"}),errorMessage:"The Table has not been loaded"})},iSearchForTheFirstObject:function(e){var t;return this.waitFor({id:u,viewName:h,matchers:new o({name:"items"}),success:function(n){t=n.getItems()[0].getCells()[1].getText();if(e){this.iSearchForValueWithEnter(t)}else{this.iSearchForValue(t)}this.waitFor({id:[u,l],viewName:h,check:m,errorMessage:"Did not find any table entries or too many while trying to search for the first object"})},errorMessage:"Did not find table entries while trying to search for the first object"})},iSearchForValueWithActions:function(e){return this.waitFor({id:l,viewName:h,actions:e,errorMessage:"Failed to find search field in Overview view"})},iSearchForValue:function(e){return this.iSearchForValueWithActions([new i({text:e})])},iSearchForValueWithEnter:function(e){return this.iSearchForValueWithActions([new i({text:e}),new n])},iTypeSomethingInTheSearchThatCannotBeFound:function(){return this.iSearchForValueWithActions([new i({text:g})])},iClearTheSearch:function(){return this.iSearchForValueWithActions([new i({text:""})])},iSearchForSomethingWithNoResults:function(){return this.iSearchForValueWithActions([new i({text:g})])},iPressOnTheTabWithTheKey:function(e){return this.waitFor({controlType:"sap.m.IconTabFilter",viewName:h,matchers:new a({key:e}),actions:new n,errorMessage:"Cannot find the icon tab filter"})},iPressTheSurpriseMeButton:function(){return this.waitFor({id:"surprise",viewName:h,actions:new n,errorMessage:"Failed to find surprise me button field in overview view"})},iSelectTheTagWithName:function(e){return this.waitFor({id:"tagSelection",viewName:h,matchers:new o({name:"content"}),success:function(t){return this.waitFor({controlType:"sap.m.ToggleButton",viewName:h,matchers:[new r(t),new a({text:e})],actions:new n,errorMessage:"Cannot find a toggle button"})},actions:new n,errorMessage:"Failed to find the tag selection bar in overview view"})},iSelectTheCategoryWithName:function(e){return this.waitFor({id:"categorySelection",viewName:h,actions:[new n],success:function(t){return this.waitFor({controlType:"sap.m.StandardListItem",matchers:new r(t),success:function(t){t.some(function(t){if(t.getTitle()===e){(new n).executeOn(t);return true}})}})},errorMessage:"Failed to find the category selection in overview view"})},iClickonTheFontSelectionButton:function(){return this.waitFor({id:"fontSelector",viewName:h,actions:new n,errorMessage:"The font selection button is not there"})},iSelectTheIconFont:function(e){return this.waitFor({id:"selectFont",viewName:h,actions:function(t){var i=t.getContent()[0].getItems();for(var r=0;r<i.length;r++){var s=i[r].getCustomData()[0].getValue();if(s===e){(new n).executeOn(i[r])}}},errorMessage:"Can't select the icon font \""+e+'"'})}},assertions:{iShouldSeeTheTNTFontPage:function(){return this.waitFor({id:"fontSelector",viewName:h,matchers:function(e){return this.I18NTextExtended(e,"fontName_SAPIconsTNT","text")}.bind(this),success:function(){e.assert.ok(true,"Showing the TNT font page")},errorMessage:"Can't find the TNT font page"})},iShouldSeeTheTable:function(){return this.waitFor({id:u,viewName:h,success:function(t){e.assert.ok(t,"Found the result table")},errorMessage:"Can't find the result table"})},theTableShouldShowOnlyObjectsWithTheSearchStringInTheirTitle:function(){return this.waitFor({id:[u,l],viewName:h,check:m,success:function(){e.assert.ok(true,"Every item did contain the search term")},errorMessage:"The table did not have items matching the search term"})},theTableShouldShowOnlyObjectsWithTheTag:function(t,n){return this.waitFor({id:u,viewName:h,check:function(){return d.apply(this,[t,n].concat(Array.prototype.slice.apply(arguments)))},success:function(){e.assert.ok(true,"Every item did contain the tag")},errorMessage:'The table does not show items with the tag "'+t+'"'})},theTableShouldShowTheCategory:function(t){return this.waitFor({id:u,viewName:h,check:function(e){var n=e.getBinding("items").getPath();if(n.startsWith("/")){return e.getModel().getProperty(n.replace("/icons","")).text===t}else{return false}},success:function(){e.assert.ok(true,"The category is bound to the table")},errorMessage:'The table does not show items with the category "'+t+'"'})},theTableShouldContainTheIcon:function(t){return this.waitFor({id:u,viewName:h,check:function(){return f.apply(this,[t].concat(Array.prototype.slice.apply(arguments)))},success:function(){e.assert.ok(true,"The item is in the result set")},errorMessage:"The table did not have items"})},theTableShouldContainOnlyTheIcon:function(t){return this.waitFor({id:u,viewName:h,check:function(e){return w(t,e)},success:function(){e.assert.ok(true,'Only one single item with the substring "'+t+'" in the title is in the result set')},errorMessage:'The table does not show only one single item with the substring "'+t+'" in its title'})},theTableShouldNotContainTheIcon:function(t){return this.waitFor({id:u,viewName:h,check:function(){return!f.apply(this,[t].concat(Array.prototype.slice.apply(arguments)))},success:function(){e.assert.ok(true,"The item is not in the result set")},errorMessage:"The table did not have items"})},theIconShouldBeMarkedAsFavorite:function(t){return this.waitFor(v({name:t,success:function(t){var n=t[0];e.assert.ok(n.getValue(),"The item is a favorite")}}))},theTableShouldHaveNoEntries:function(){return this.waitFor({viewName:h,id:u,matchers:new s({name:"items",length:0}),success:function(){e.assert.ok(true,"The list has no entries")},errorMessage:"The list does contain entries"})},theTableShouldHaveAllEntries:function(){var t=23,n;return this.waitFor({id:u,viewName:h,matchers:function(e){n=Math.min(e.getGrowingThreshold(),t);return new s({name:"items",length:n}).isMatching(e)},success:function(t){e.assert.strictEqual(t.getItems().length,n,"The growing Table has "+n+" items")},errorMessage:"Table does not have all entries"})},theTitleShouldDisplayTheTotalAmountOfItems:function(){return this.waitFor({id:u,viewName:h,matchers:new o({name:"items"}),success:function(t){var n=t.getBinding("items").getLength();return this.waitFor({controlType:"sap.m.IconTabFilter",viewName:h,matchers:new a({key:"all"}),success:function(t){var i=t[0];e.assert.strictEqual(parseInt(i.getCount()),n,'The icon tab fillter "all" shows the total number of icons '+n)},errorMessage:'The icon tab fillter "all" does not contain the number of items '+n})},errorMessage:"The table has no items"})},theTableShouldHaveTheDoubleAmountOfInitialEntries:function(){var t=23,n;return this.waitFor({id:u,viewName:h,matchers:function(e){n=Math.min(e.getGrowingThreshold()*2,t);return new s({name:"items",length:n}).isMatching(e)},success:function(){e.assert.ok(true,"The growing Table had the double amount: "+n+" of entries")},errorMessage:"Table does not have the double amount of entries"})},iShouldSeeTheNoDataTextForNoSearchResults:function(){return this.waitFor({id:u,viewName:h,success:function(t){e.assert.strictEqual(t.getNoDataText(),t.getModel("i18n").getProperty("overviewNoDataWithSearchText"),"The no data should be shown in the tabular results section")},errorMessage:"The tabular results do not show the no data text for search"})}}}})});
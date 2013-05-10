/**********************
FileName:syncpanel.js
Version:1.0.0.1
VersionDate:2011/5/24
Created:Phiree
Changelog: remove/add/modify some notes.
************************
* useage:$(jquerySelector).SyncPanel(params);
* 
*/
(function ($) {
    $.fn.SyncPanel = function (options) {
        var that = this;
        var params = $.extend(
		{
		       serviceUrls: [{
						baseUrl:"/service/Handler.ashx?country=china",
						pageIndexParam:"page",
						pageIndex:0,
						pagesizeParam:"pagesize",
						pagesize:20
					},{
						baseUrl:"/service/Handler.ashx?country=Iraq",
						pageIndexParam:"page",
						pageIndex:0,
						pagesizeParam:"pagesize",
						pagesize:20
					}]
		 ,
		    panelDefine:
			{
			    containerDivId: "sp_containerDiv",
			    contentDivId: "sp_contentDiv",
			    navDivId: "sp_navDiv",
			    prevButtonId: "sp_prevButton",
			    nextButtonId: "sp_nextButton", 
			    containerDivClass: "synPcontainer",
			    contentDivClass: "synPcontent",
			    navDivClass: "synPnav",
			    prevButtonClass: "synPnavPrev",
			    nextButtonClass: "synPnavNext",
			    itemClass: "synPitem",
			    itemAltClass: "synPitemAlt"
			}
		}
		, options
		);
        if (!params.serviceUrls) {
            alert("must define ajaxData.serviceUrls");
            return
        }
       
        params.panelAmount = params.serviceUrls.length;
        var objContentDivs = [];
        that.MaxIndex = 0;//max index of the panels, used for create id for new added panel.
        that.AddPanel = function () {
            var index = that.MaxIndex;
            var oneContainerDiv = EnsureElement(params.panelDefine.containerDivId + index, that, "div",
			{
			    "class": params.panelDefine.containerDivClass
			}
			);
            var oneContentDiv = EnsureElement(params.panelDefine.contentDivId + index, oneContainerDiv, "div",
			{
			    "class": params.panelDefine.contentDivClass
			}
			);
			var currentServiceUrl=params.serviceUrls[index];
            var oneObjContentDiv = new objContentDiv(oneContentDiv,
									            	currentServiceUrl.baseUrl,
									            	currentServiceUrl.pageIndexParam,
													currentServiceUrl.pageIndex,
													currentServiceUrl.pagesizeParam,
													currentServiceUrl.pagesize
            										);
           
                oneObjContentDiv.BuildUrl();
            oneObjContentDiv.LoadData();
            // oneContentDiv.onclick = function () { oneObjContentDiv.Scroll(); };
            objContentDivs[index] = oneObjContentDiv;
            var oneNavDiv = EnsureElement(params.panelDefine.navDivId + index, oneContainerDiv, "div",
			{
			    "class": params.panelDefine.navDivClass
			}
			);
            var onePrevButton = EnsureElement(params.panelDefine.prevButtonId + index, oneNavDiv, "input",
			{
			    type: "button", value: "Prev", action: "prev"
			}
			);
            var oneNextButton = EnsureElement(params.panelDefine.nextButtonId + index, oneNavDiv, "input",
			{
			    type: "button", value: "Next", action: "next"
			}
			);
           
            oneNavDiv.PrevButton = onePrevButton;
            var oneObjectNavButton = new objNavButton(onePrevButton, oneObjContentDiv);
            oneNavDiv.NextButton = oneNextButton;
            var oneObjectNavButton = new objNavButton(oneNextButton, oneObjContentDiv);
            
            oneContainerDiv.ContentDiv = oneContentDiv;
            oneContainerDiv.NavDiv = oneNavDiv;
            that.MaxIndex++;
        }
        function objContentDiv(element,baseUrl,pageindexParam,pageindex,pagesizeParam,pagesize) {
            var objContent = this;
            objContent.ignoreScrollEvent = false;
            objContent.DrivenByClick = false;
            objContent.element = element;
            objContent.baseUrl=baseUrl;
            objContent.pageIndexParam=pageindexParam;
            objContent.pageIndex=pageindex;
            objContent.pagesizeParam=pagesizeParam;
            objContent.pagesize=pagesize;
            //  objContent.currentTop = $(objContent.element).offset().top;//
            element.onscroll = function () {
                objContent.Scroll();
            }
			;
        }
       objContentDiv.prototype.BuildUrl=function(){
       	 var objContent = this;
       	 objContent.serviceUrl=objContent.baseUrl	
       	 +"&"+objContent.pageIndexParam
       	 +"="+objContent.pageIndex
       	 +"&"+objContent.pagesizeParam
       	 +"="+objContent.pagesize;
       }
        objContentDiv.prototype.LoadData = function () {
            var objContent = this;
            // this.element.innerHTML = this.element.id;
           
                $.get(objContent.serviceUrl, function (data) {
                    objContent.FillData(data);
                }
				);
			
        }
       
        objContentDiv.prototype.GetCurrentItemIndex = function () {
            var objContent = this;
            var objContentElement = $(objContent.element);
            var minBetweenItemPanel = 9999999;
            var currentItemIndex = 0;
            var items = objContentElement.children("." + params.panelDefine.itemClass + ",." + params.panelDefine.itemAltClass);
            for (var i = 0; i < items.length; i++) {
                //clear style 
                var item = $(items[i]);
                var scapBetweenItemPanel = 0;
                var itemOffsetTop = item.offset().top;
                var itemHeight = item.outerHeight(true);
                var contentOffsetTop = objContentElement.offset().top
                             + (parseInt(objContentElement.css("border-top")) || 0);
                var contentHeight = objContentElement.outerHeight(true);
                if (itemOffsetTop + itemHeight <= contentOffsetTop)
                    continue;
                if (itemOffsetTop >= contentOffsetTop + contentHeight)
                    continue;
              
                //which is the currentItem,option 1: the item that is closest to the container's top
              
                var useCondition1 = true;
                if (useCondition1) {
                    if (itemOffsetTop < contentOffsetTop) {
                        scapBetweenItemPanel = itemHeight - (contentOffsetTop - itemOffsetTop);
                    }
                    else {
                        scapBetweenItemPanel = itemOffsetTop - contentOffsetTop;
                    }
                }
                //条件2 :底部离container顶部在最近.且在container下方.
                //which is the currentItem,option 2: the item's bottom is closest to the container's top,and  is below the container 
              
                else {
                    if (itemOffsetTop < contentOffsetTop) {
                        scapBetweenItemPanel = contentOffsetTop - itemOffsetTop;
                    }
                }
              
                if (scapBetweenItemPanel < minBetweenItemPanel) {
                    minBetweenItemPanel = scapBetweenItemPanel;
                    currentItemIndex = i;
                    objContent.ItemChanged = (objContent.ItemChanged != undefined) && (objContent.PrevItemIndex != currentItemIndex);
                   
                }
            }
            objContent.PrevItemIndex = currentItemIndex;
           
            return currentItemIndex;
        }
        objContentDiv.prototype.Scroll = function () {
            var objContent = this;
            var ignore = objContent.ignoreScrollEvent;
            objContent.ignoreScrollEvent = false;
            if (ignore) return false;
            var currentItemIndex = objContent.GetCurrentItemIndex();
            var items = $(objContent.element).children("." + params.panelDefine.itemClass + ",." + params.panelDefine.itemAltClass);
            var lastItemIndex = items.length - 1;
            var currentItem = $(items[currentItemIndex]);
            var lastItem = $(items[lastItemIndex]);
            var bottomDistance = lastItem.outerHeight(true)
                                - $(objContent.element).offset().top
                                - $(objContent.element).outerHeight(true)
                                + lastItem.offset().top;
            if (lastItemIndex == currentItemIndex || (bottomDistance >= 0 && bottomDistance < 40)) {
                objContent.LoadData();
            }
            $(objContent.element).find("." + params.panelDefine.itemClass + ",." + params.panelDefine.itemAltClass).css("backgroundColor", "");
            currentItem.css("backgroundColor", "#ccc");
            var hiddenHeight = $(objContent.element).offset().top - currentItem.offset().top;
            var itemHeight = currentItem.outerHeight(true);
            for (var panelIndex in objContentDivs) {
                if (objContentDivs[panelIndex] != objContent) {
                    objContentDivs[panelIndex].BeScrolled(currentItemIndex, false, itemHeight, hiddenHeight);
                }
            }
        }
        objContentDiv.prototype.BeScrolled = function (itemIndex, drivenByClick, scrollingHeight, hiddenHeigh) {
            var objContent = this;
            var itemCount = $(objContent.element).children("." + params.panelDefine.itemClass + ",." + params.panelDefine.itemAltClass).length;
            if (itemCount - 1 <= parseInt(itemIndex)) {
                objContent.LoadData();
            }
            var targetItem = $($(objContent.element).children("." + params.panelDefine.itemClass + ",." + params.panelDefine.itemAltClass)[itemIndex]);
              var scrollDistance = 0;
            if (drivenByClick) {
                scrollDistance = targetItem.offset().top - $(objContent.element).offset().top + $(objContent.element).scrollTop();
            }
            else {
                objContent.ignoreScrollEvent = true;
                var targetOffsetTop = (hiddenHeigh * targetItem.outerHeight(true) / scrollingHeight) - $(objContent.element).offset().top;
                var targetHiddenHeight = (hiddenHeigh * targetItem.outerHeight(true) / scrollingHeight);
                targetOffsetTop = $(objContent.element).offset().top - targetHiddenHeight;
                scrollDistance = $(objContent.element).scrollTop() + targetItem.offset().top - targetOffsetTop;
            }
            $(objContent.element).find("." + params.panelDefine.itemClass + ",." + params.panelDefine.itemAltClass).css("backgroundColor", "");
            targetItem.css("backgroundColor", "#ccc");
            $(objContent.element).scrollTop(scrollDistance);
        }
        objContentDiv.prototype.FillData = function (data) {
            var objContent = this;
            for (var d in data) {
                var item = document.createElement("div");
                if (d % 2 == 1) {
                    item.className = params.panelDefine.itemAltClass;
                } else {
                    item.className = params.panelDefine.itemClass;
                }
                item.innerHTML = data[d].Id + ':' + data[d].Content.replace(new RegExp("\r\n", "gm"), "<br/>");
                item.id = "item" + data[d].Id;
                $(item).attr("itemindex", data[d].Id);
                $(objContent.element).append(item);
               
            }
             objContent.pageIndex++;
             objContent.BuildUrl();
        }
        function objNavButton(element, objContentDiv) {
            var objButton = this;
            objButton.element = element;
            objButton.objContentDiv = objContentDiv;
            element.onclick = function () {
                objButton.Click();
            }
        }
        objNavButton.prototype.Click = function () {
            var objButton = this;
            //get the contentdiv
            var targetItemId = 0;
            var currentItemID = objButton.objContentDiv.GetCurrentItemIndex();
            switch ($(objButton.element).attr("action")) {
                case "prev": targetItemID = currentItemID == 0 ? 0 : currentItemID - 1;
                    objButton.objContentDiv.DrivenByClick = true;
                    objButton.objContentDiv.BeScrolled(targetItemID, true);
                    break;
                case "next": targetItemID = currentItemID + 1;
                    objButton.objContentDiv.DrivenByClick = true;
                    objButton.objContentDiv.BeScrolled(targetItemID, true);
                    break;
                case "remove":
                    objButton.objContentDiv.RemoveMe();
                    break;
            }
        }
        for (var index = 0; index < params.panelAmount; index++) {
            this.AddPanel();
        }
        function EnsureElement(elementId, container, tag, otherAttributes) {
            if (tag == undefined)
                tag = "div";
            var element = $("#" + elementId);
            if (element.length == 0) {
                var freshElement = document.createElement(tag);
                freshElement.id = elementId;
                $(freshElement).attr(otherAttributes);
                $(container).append(freshElement);
                element = freshElement;
            }
            return element;
        }
        return this;
    }
}
)(jQuery);
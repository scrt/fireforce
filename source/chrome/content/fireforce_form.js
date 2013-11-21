///////////////////////////////////////////////////////////////////////
// (C) SCRT - Information Security, 2011 - Author Manoé Zwahlen      //
///////////////////////////////////////////////////////////////////////
// This program is free software: you can redistribute it and/or     //
// modify it under the terms of the GNU General Public License as    //
// published by the Free Software Foundation, either version 3 of    //
// the License, or (at your option) any later version.               //
// This program is distributed in the hope that it will be useful,   //
// but WITHOUT ANY WARRANTY; without even the implied warranty of    //
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the     //
// GNU General Public License for more details.                      //
// You should have received a copy of the GNU General Public License //
// along with this program. If not, see http://www.gnu.org/licenses. //
///////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////
// Function Name : getGoodForm
// Objective     : Return information of selected form
// Author        : Manoé Zwahlen
// Date          : 05.01.2010
// Return        : Return the form in a object
///////////////////////////////////////////////////
function getGoodForm(){
	
	var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator);	
	var win = wm.getMostRecentWindow("navigator:browser");
	
	var tagName = win.content.document.activeElement.tagName + " ";
	var activeElement = win.content.document.activeElement;
	var parentNodeTemp = activeElement;
	if (parentNodeTemp){
		
		while(!tagName.toLowerCase().match("form")){
			parentNodeTemp = parentNodeTemp.parentNode;
			tagName = parentNodeTemp.tagName + " ";
		}

		return parentNodeTemp;
	}else{
		alert("No form or selected field found!");	
	}
}


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
// Function Name : selectFile
// Objective     : open a file explorer
// Author        : Manoé Zwahlen
// Date          : 06.01.2010
// Return        : table with the path of selected files
///////////////////////////////////////////////////
function selectFile() {
	const nsIFilePicker = Components.interfaces.nsIFilePicker;

	var fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
	
	fp.init(window, "Choose a file", nsIFilePicker.modeOpenMultiple);
	fp.appendFilters(nsIFilePicker.filterAll | nsIFilePicker.filterText);

	var rv = fp.show();
	if (rv == nsIFilePicker.returnOK || rv == nsIFilePicker.returnReplace) {
		var files = fp.files;
		var paths = [];
		while (files.hasMoreElements()){
			var arg = files.getNext().QueryInterface(Components.interfaces.nsIFile).path;
			paths.push(arg);
		}
		
		return paths;
	}
}

///////////////////////////////////////////////////
// Function Name : readFileLine
// Objective     : Read all line of the file
// Author        : Manoé Zwahlen
// Date          : 06.01.2010
// Parameter 1   : file path
// Parameter 2   : table of pasword
// Return        : table of pasword
///////////////////////////////////////////////////
function readFileLine(path, passwords) {
	var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsIFile);
	file.initWithPath(path);	
	
	var istream = Components.classes["@mozilla.org/network/file-input-stream;1"].createInstance(Components.interfaces.nsIFileInputStream);
	istream.init(file, 0x01, 0444, 0);
	istream.QueryInterface(Components.interfaces.nsILineInputStream);
 
	var line = {};
	var lines = []; 
	var hasmore = null;
	
	do {
		hasmore = istream.readLine(line);
		lines.push(line.value);
		passwords.push(line.value);
	} while(hasmore);

	istream.close();
	
	return passwords;
}

///////////////////////////////////////////////////
// Function Name : makePasswordTab
// Objective     : Get value of all lines of all files 
// Author        : Manoé Zwahlen
// Date          : 06.01.2010
// Return        : table of password
///////////////////////////////////////////////////
function makePasswordsTab(){
	
	paths = selectFile();
	
	if (paths){
		
		var passwords = [];
		for (values in paths){readFileLine(paths[values], passwords);}
		  
		return passwords;
	} else {
		alert("No file selected!");
	}
}


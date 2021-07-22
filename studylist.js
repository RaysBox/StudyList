"use strict";

var total, rows, cols, done;

// initial
window.onload = function(){
	init();
}

function init() {
	var jdata = JSON.parse(data.toString());

	done = ["CSS", "HTML", "RWD", "Tableau", "JavaScript", "jQuery", "Python", "Git",
			"程式設計", "資料結構", "國營聯招考古題", "資料庫", "計算機原理", "RAID", "網路概論",
			"資訊管理", "國文", "英文"];
	cols = 5;
	total = jdata.title.length;
	rows = parseInt((total-1) / cols) + 1;

	setMainTitle(jdata.main);
	setContent(jdata.title)
	hideAll();
}

function setMainTitle(main_title) {
	$("#main_title").text(main_title);
	$("#main_title_bar").text(main_title);
	//document.getElementById("main_title").innerHTML= main_title;
	//document.getElementById("main_title_bar").innerHTML= main_title;
}

function setContent(list) {
	//取得table元件
	var table = document.getElementById("table");

	// 跑list迴圈
	for(let i=0;i<rows;i++) {
		//取的目前有的td數量
		var num = table.rows.length;
		//從最後一筆開始加入
		var row = table.insertRow(num);
		// 設Subtitle
		for(let j=0;j<cols;j++) {
			var subtitNum = (i*cols)+j;
			var subtitleNm = subtitNum > list.length-1 ? "-" : list[subtitNum].subtitle;
			setSubtitle(row, subtitleNm, j, subtitNum+1);
		}

		num++;
		//從最後一筆開始加入
		row = table.insertRow(num);
		// 設列表清單
		for(let j=0;j<cols;j++) {
			var subtitNum = (i*cols)+j;
			var subContent = subtitNum > list.length-1 ? [{"item":"", "url":""}] : list[subtitNum].content;
			setItem(row, subContent, j, subtitNum+1);
		}
	}
}

function setSubtitle(row, name, colNum, subtitNum) {
	var cell = row.insertCell(colNum);
	var rowClass = "tab_td_style border_style";
	cell.setAttribute("onclick", "change("+ subtitNum +");");
	for(let v of done) {
	    if(v == name) {
	        rowClass = "tab_td_style border_style done";
	    }
	}
	cell.setAttribute("class", rowClass);
	cell.innerHTML = '<div class="pgm_lang_title">'+ name +'</div>';
}

function setItem(row, arrContent, colNum, subtitNum) {
	var strList = getItemListStr(arrContent);
	var cell = row.insertCell(colNum);
	cell.setAttribute("class", "list_item");
	cell.setAttribute("id", "list"+ subtitNum);
	cell.innerHTML = strList;
}

function getItemListStr(arrContent) {
	var str = "";
	for(let i=0;i<arrContent.length;i++) {
		str = str + "<li><a href='" + arrContent[i].url + "'>" + arrContent[i].item + "</a></li>";
	}
	return str;
}

function change(num) {
	let item = document.getElementById("list" + num);
	if(item.style.visibility != "") {
		if(item.style.display == "none") {
			showRow(parseInt((num-1) / cols));
		}
		// show list
		item.style.visibility = "";
	} else {
		item.style.visibility = "hidden";
	}

	let c = checkRow(num);
	if(c==cols) {
		hideRow(parseInt((num-1) / cols));
	}
}

function showRow(row) {
	var item;
	for(let i=1;i<=cols;i++) {
		item = document.getElementById("list" + (row*cols + i));
		item.style.display = "";
	}
}

function hideRow(row) {
	var item;
	for(let i=1;i<=cols;i++) {
		item = document.getElementById("list" + (row*cols + i));
		item.style.display = "none"; 
		item.style.visibility = "hidden";
	}
}

function changeAll() {
	let c = 0;
	for(let i=0;i<rows;i++) {
		c += checkRow(i*rows);			
	}
	if(c==rows*cols) {
		showAll();
	} else {
		hideAll();
	}
}

function showAll() {
	for(let i=0;i<rows;i++) {
		showRow(i);
	}

	var item;
	for(let i=1;i<=total;i++) {
		item = document.getElementById("list" + i);
		item.style.visibility = "";		
	}
}

function hideAll() {
	for(let i=0;i<rows;i++) {
		hideRow(i);				
	}
}

function checkRow(num) {
	var row = parseInt((num-1) / cols);
	var item;
	var c = 0;
	for(let i=1;i<=cols;i++) {
		item = document.getElementById("list" + (row*cols + i));
		c = item.style.visibility == "hidden" ? c+1 : c;
	}

	return c;
}
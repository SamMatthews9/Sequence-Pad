// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

$(document).ready(function() {
	console.log('loaded');
	fetchCells();
	$(document.body).on('click', '#exit', hideModals);
	$(document.body).on('click', 'button.color', changeCurrentColor);
	$(document.body).on('click', 'button.background', changeBackground);
	$(document.body).on('click', 'button.play', looper);
	$(document.body).on('click', 'button.pause', pauseLoop);
	$(document.body).on('click', 'button.clear', clearBoard);
	$(document.body).on('mouseover', '.cell', activateCell);
	board = new Board();
	modalReady();
})

var blue = '#275EFF';
var yellow = '#FEC227';
var purple = '#4B177E';
var green = '#147E21';
var active_blue = '#A7BEFF';
var active_yellow = '#FED773';
var active_purple = '#972EFE';
var active_green = '#20CA35';

var Board = function(){
	this.currentColor = "purple";
	this.playStatus = false;
} 

function fetchCells() {
	console.log('loaded')
	$.get('/').done(displayCells);
}

function changeCurrentColor() {
	var color = this.id;
	board.currentColor = color;
	console.log(board.currentColor);
}

function displayCells(data){
	console.log('loaded')
	data.cells.forEach(renderCells);
}

function renderCells(data){

		var purple_audio = $('<audio>').attr('id', 'purple_audio')
		var purple_source = $('<source>').attr('src', data.purple_note).attr('type', 'audio/mpeg');

		var green_audio = $('<audio>').attr('id', 'green_audio')
		var green_source = $('<source>').attr('src', data.green_note).attr('type', 'audio/mpeg');

		var yellow_audio = $('<audio>').attr('id', 'yellow_audio')
		var yellow_source = $('<source>').attr('src', data.yellow_note).attr('type', 'audio/mpeg');

		var blue_audio = $('<audio>').attr('id', 'blue_audio')
		var blue_source = $('<source>').attr('src', data.blue_note).attr('type', 'audio/mpeg');
		
		purple_audio.append(purple_source);
		green_audio.append(green_source);
		yellow_audio.append(yellow_source);
		blue_audio.append(blue_source);
		
		var cellsContainer = $('.cellsContainer')

		var cell = $('<div>')
								.addClass('cell')
								.attr('row', data.row)
								.attr('active', "none")
								.attr('column', data.column)
								.append(purple_audio)
								.append(green_audio)
								.append(yellow_audio)
								.append(blue_audio);
		cell.appendTo(cellsContainer)
}

function activateCell() {
	if (this.active === board.currentColor) {
		this.active = "none";
		$(this).css("background-color", "dimgray");
	} else if (this.active = board.currentColor) {
		if (this.active === "blue") {
				$(this).css("background-color", blue);
				// $(this).find('#blue_audio')[0].play();
		} else if (this.active === "purple") {
				$(this).css("background-color", purple);
				// $(this).find('#purple_audio')[0].play();
		} else if (this.active === "yellow") {
				$(this).css("background-color", yellow);	
				// $(this).find('#yellow_audio')[0].play();
		} else if (this.active === "green") {
				$(this).css("background-color", green);
				// $(this).find('#green_audio')[0].play();		
		}	
	}		
}

var resetColors = function(){
	var cellDivs = ($('div.cell'))
	for (var i = 0; i < cellDivs.length; i++) {
		if (cellDivs[i].active === "blue" ) {
			$(cellDivs[i]).css('background-color', blue)
			} else if ( cellDivs[i].active === "purple") {
				$(cellDivs[i]).css('background-color', purple)
			} else if ( cellDivs[i].active === "yellow") {
				$(cellDivs[i]).css('background-color', yellow)
			} else if ( cellDivs[i].active === "green") {
				$(cellDivs[i]).css('background-color', green)
			};
	};
						
};

var cellLoop = function(column){

		for (var i = 0; i < 12; i++) {
			if (column[i].active === "blue" ) {
				$(column[i]).find('#blue_audio')[0].play();
				$(column[i]).css('background-color', active_blue)

			} else if ( column[i].active === "purple") {
				$(column[i]).find('#purple_audio')[0].play();
				$(column[i]).css('background-color', active_purple)

			} else if ( column[i].active === "yellow") {
				$(column[i]).find('#yellow_audio')[0].play();
				$(column[i]).css('background-color', active_yellow)

			} else if ( column[i].active === "green") {
				$(column[i]).find('#green_audio')[0].play();
				$(column[i]).css('background-color', active_green)
			};
		};	
};

function columnLoop() {
	console.log('play loop')

var columnsArray = [];

	column1 = $( "[class='cell'][column='1']" );
	column2 = $( "[class='cell'][column='2']" );
	column3 = $( "[class='cell'][column='3']" );
	column4 = $( "[class='cell'][column='4']" );
	column5 = $( "[class='cell'][column='5']" );
	column6 = $( "[class='cell'][column='6']" );
	column7 = $( "[class='cell'][column='7']" );
	column8 = $( "[class='cell'][column='8']" );
	column9 = $( "[class='cell'][column='9']" );
	column10 = $( "[class='cell'][column='10']" );
	column11 = $( "[class='cell'][column='11']" );
	column12 = $( "[class='cell'][column='12']" );
	column13 = $( "[class='cell'][column='13']" );
	column14 = $( "[class='cell'][column='14']" );
	column15 = $( "[class='cell'][column='15']" );
	column16 = $( "[class='cell'][column='16']" );

columnsArray.push( column1, column2, column3, column4, column5, column6,
  								 column7, column8, column9, column10, column11, column12,
  								 column13, column14, column15, column16 )


	// for (var i = 0; i < 16; i++) {
	// 	setTimeout(function(){	
	// 	cellLoop(columnsArray[i])}, interval += 250);
	// }  
				// WHY DOESN'T THIS LOOP WORK!! 

	var interval = 0;
	setTimeout(function(){	
		cellLoop(columnsArray[0])}, interval = 250);
	setTimeout(function(){
		cellLoop(columnsArray[1])}, interval = 500);
	setTimeout(function(){
		cellLoop(columnsArray[2])}, interval = 750);
	setTimeout(function(){
		cellLoop(columnsArray[3])}, interval = 1000);
	setTimeout(function(){
		cellLoop(columnsArray[4])}, interval = 1250);
	setTimeout(function(){
		cellLoop(columnsArray[5])}, interval = 1500);
	setTimeout(function(){
		cellLoop(columnsArray[6])}, interval = 1750);
	setTimeout(function(){
		cellLoop(columnsArray[7])}, interval = 2000);
	setTimeout(function(){
		cellLoop(columnsArray[8])}, interval = 2250);
	setTimeout(function(){
		cellLoop(columnsArray[9])}, interval = 2500);
	setTimeout(function(){
		cellLoop(columnsArray[10])}, interval = 2750);
	setTimeout(function(){
		cellLoop(columnsArray[11])}, interval = 3000);	
	setTimeout(function(){
		cellLoop(columnsArray[12])}, interval = 3250);	
	setTimeout(function(){
		cellLoop(columnsArray[13])}, interval = 3500);	
	setTimeout(function(){
		cellLoop(columnsArray[14])}, interval = 3750);	
	setTimeout(function(){
		cellLoop(columnsArray[15])}, interval = 4000);
}	

var looper = function(){
	if (board.playStatus === false) {	
		columnLoop();
		setTimeout(resetColors, 300);
		playInterval = setInterval(columnLoop, 4000);
		colorResetInterval = setInterval(resetColors, 300);
		board.playStatus = true;
	}
	else {
		return;
	}	
}	
	
function pauseLoop() {
	board.playStatus = false;
	clearInterval(playInterval);
	colorResetInterval = setInterval(resetColors, 300);
	clearInterval(colorResetInterval);
}

function clearBoard(){
	pauseLoop()
	var cellDivs = ($('div.cell'))
	for (var i = 0; i < cellDivs.length; i++) {
		cellDivs[i].active = 'none';
		$(cellDivs[i]).css("background-color", 'dimgray');
	};
}


// need to add functionality to change header/menu text color
function changeBackground(){
	console.log(($(document.body).css("background-image")))
	if ($(document.body).css("background-image") === "url(http://localhost:3000/assets/black_water_background.jpg)") {
		$(document.body).css('background-image', 'url(/assets/white_water_background.jpg)')
	}	else if ($(document.body).css("background-image") === "url(http://localhost:3000/assets/white_water_background.jpg)") {
		$(document.body).css('background-image', 'url(/assets/black_water_background.jpg)')
	}
}	


(function() {
    var canvas;
    var context;
    var width;
    var height;
    var solved = false;
    var boardParts;
    var clickLoc = new Object;
    var emptyLoc = new Object;
    var tileChoice;
    var choice;
    clickLoc.x = 0;
    clickLoc.y = 0;
    emptyLoc.x = 0;
    emptyLoc.y = 0;
    var tileCount=3;
    var image2;
	var seconds=0;
	var firstClick = false;
	var numClicks = 0;
	var tileWidth;
	var tileHeight;
	var change=.75;
    
    document.addEventListener('DOMContentLoaded', init, false);
    
    function init(){
	canvas = document.querySelector('canvas');
    context = canvas.getContext('2d');
    width = canvas.width;
    height = canvas.height;
	canvasWidth = width;
	canvasHeight = height;
	window.addEventListener('resize', resizeCanvas, false);
	//resizeCanvas();
	tileChoice = document.getElementById("form");
	/*tileChoice.submit = function(e){
	    console.log("hello");
	    choice = getElementsByName("difficulty");
	    for(var i =0;i<3;i+=1){
		if(choice[i].checked){
		    tileCount = choice[i].value;
		}
	    }
	}*/
	tileChoice.addEventListener('submit',difficulty,false);
        tileWidth = width/tileCount;
        tileHeight = height/tileCount;
        /*
        var image = new Image();
        image.onload = function(){
        	context.drawImage(image,0,0);
		}
		image.src = "rsz_times-square_opacity.png";
		*/
		image2 = new Image();
        image2.src = "rsz_times-square.jpg";
        image2.addEventListener('load',drawTiles,false);
		setBoard();
        document.getElementById('canvas').onclick = function(e) {
			if (firstClick === false){
				interval = window.setInterval(increment,1000);
				firstClick = true;
			}
			var clicks = document.getElementById("moves");
			numClicks +=1;
			clicks.innerHTML = "moves: " +numClicks;
			clickLoc.x = Math.floor((e.pageX - this.offsetLeft) / (tileWidth*change));
            clickLoc.y = Math.floor((e.pageY - this.offsetTop) / (tileHeight*change));
            //console.log(this.offsetLeft, this.offsetTop);
            //console.log(tileWidth,tileHeight);
			//console.log(tileChangedWidth,tileChangedHeight);
            //console.log(e.pageX,e.pageY);
            //console.log(clickLoc.x,clickLoc.y);
			//console.log(canvas.width,canvas.height);
			//console.log(change);
			//console.log("hello1");
            if (distance(clickLoc.x, clickLoc.y, emptyLoc.x, emptyLoc.y) == 1) {
                slideTile(emptyLoc, clickLoc);
                drawTiles();
            }
            if (solved) {
                setTimeout(function() {alert("You solved it!");}, 500);
				stop();
            }
        }
    }
	function increment(){
		var time = document.getElementById("time");
		seconds += 1;
		time.innerHTML = "time: "+seconds;
	}
	function resizeCanvas() {
		if(window.matchMedia("(min-width:1024px)").matches){
			change = .75;
		}
		else if(window.matchMedia("(min-width:896px)").matches){
			change = .70;
		}
		else if(window.matchMedia("(min-width:768px)").matches){
			change = .58;
		}
		else if(window.matchMedia("(min-width:680px)").matches){
			change = .50;
		}
		else if(window.matchMedia("(min-width:600px)").matches){
			change = .45;
		}
		else if(window.matchMedia("(min-width:480px)").matches){
			change = .35;
		}
		else if(window.matchMedia("(min-width:320px)").matches){
			change = .30;
		}
	}
    function drawTiles() {
        context.clearRect ( 0 , 0 , width, height);
        for (var i = 0; i < tileCount; ++i) {
            for (var j = 0; j < tileCount; ++j) {
                var x = boardParts[i][j].x;
                var y = boardParts[i][j].y;
                if(i != emptyLoc.x || j != emptyLoc.y || solved == true) {
                    context.drawImage(image2, x * tileWidth, y * tileHeight, tileWidth, tileHeight,
                        i * tileWidth, j * tileHeight, tileWidth, tileHeight);
                }
            }
        }
    }
    function difficulty(event){
	choice = getElementsByName("difficulty");
	for(var i =0;i<3;i+=1){
	    if(choice[i].checked){
		tileCount = choice[i].value;
	    }
	}
	console.log(tileCount);
    }
    function distance(x1, y1, x2, y2) {
        return Math.abs(x1 - x2) + Math.abs(y1 - y2);
    }
    function slideTile(toLoc, fromLoc) {
        if (!solved) {
            boardParts[toLoc.x][toLoc.y].x = boardParts[fromLoc.x][fromLoc.y].x;
            boardParts[toLoc.x][toLoc.y].y = boardParts[fromLoc.x][fromLoc.y].y;
            boardParts[fromLoc.x][fromLoc.y].x = tileCount - 1;
            boardParts[fromLoc.x][fromLoc.y].y = tileCount - 1;
            toLoc.x = fromLoc.x;
            toLoc.y = fromLoc.y;
            checkSolved();
        }
    }
    function checkSolved() {
        var flag = true;
        for (var i = 0; i < tileCount; ++i) {
            for (var j = 0; j < tileCount; ++j) {
                if (boardParts[i][j].x != i || boardParts[i][j].y != j) {
                    flag = false;
                }
            }
        }
        solved = flag;
    }
    function setBoard() {
        boardParts = new Array(tileCount);
        for (var i = 0; i < tileCount; ++i) {
            boardParts[i] = new Array(tileCount);
            for (var j = 0; j < tileCount; ++j) {
                boardParts[i][j] = new Object;
                boardParts[i][j].x = (tileCount - 1) - i;
                boardParts[i][j].y = (tileCount - 1) - j;
            }
        }
        emptyLoc.x = boardParts[tileCount - 1][tileCount - 1].x;
        emptyLoc.y = boardParts[tileCount - 1][tileCount - 1].y;
        solved = false;
    }
	function handle_response(){
		if(request.readyState ===4){
			if(request.status === 200){
				//hello;
			}
		}
	}
	function stop(){
		clearInterval(interval);
		window.removeEventListener('submit');
		var username = document.querySelector("username");
		var url = 'index.py?difficulty=-1&username'+username+'&score='+score+'&time='+seconds;
		var request = new XMLHttpRequest();
		request.addEventListener('readystatechange', handle_response, false);
		request.open("GET", url, true);
		request.send(null);
	}
})();

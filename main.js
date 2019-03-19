var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');

autoSetCanvas(yyy);

listenToMouse(yyy);

var eraserEnabled = false;
eraser.onclick = function() {
    eraserEnabled = true;
    actions.className = 'actions x'
}

brush.onclick = function() {
    eraserEnabled = false;
    actions.className = 'actions'
}

/* 所有函数 */

/* 自动设置宽高 */
function autoSetCanvas(canvas) {
    setCanvasSize()
    window.onresize = function(){       //监听宽高变化
        setCanvasSize();
    }
    function setCanvasSize(){         //获取页面宽高
        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;
    
        canvas.width = pageWidth;
        canvas.height = pageHeight;
    }
}

/* 监听鼠标操作 */
function listenToMouse(canvas) {
    var using = false;
    var lastPoint = {x: undefined, y:undefined}
    
    canvas.onmousedown = function(down){
        using = true;
        var x = down.clientX;           //相对于视窗的位置而非canvas的位置
        var y = down.clientY;
        if (eraserEnabled) {
            context.clearRect(x-5, y-5, 10, 10)
        } else {
            lastPoint = {"x": x, "y": y}
        }
    }
    
    canvas.onmousemove = function(move){
        var x = move.clientX;       //相对于视窗的位置而非canvas的位置
        var y = move.clientY;

        if (!using) {return}

        if (eraserEnabled){
            context.clearRect(x-5, y-5, 10, 10)
        } else {
            var newPoint = {"x": x, "y": y}
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint;           //更新上一个点
        }
    }

    canvas.onmouseup = function(){
        using = false;
    }
}


function drawCircle(x, y, radius){
    context.fillStyle = 'cyan';
    context.beginPath();
    context.arc (x,y,radius,0, Math.PI*2);
    context.fill();
}

function drawLine(x1, y1, x2, y2){
    context.strokeStyle = 'blue';
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineWidth = 2;
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}
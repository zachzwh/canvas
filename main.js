var yyy = document.getElementById("xxx");
var context = yyy.getContext("2d");

autoSetCanvas(yyy);

listenToUser(yyy);

var eraserEnabled = false;
brush.classList.add("active");
eraser.onclick = function () {
    eraserEnabled = true;
    eraser.classList.add("active");
    brush.classList.remove("active");
};

brush.onclick = function () {
    eraserEnabled = false;
    brush.classList.add("active");
    eraser.classList.remove("active");
};

clear.onclick = function () {
    context.clearRect(0, 0, yyy.width, yyy.height);
};

download.onclick = function () {
    var url = yyy.toDataURL("image/png");
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.href = url;
    a.download = "image";
    a.target = "_blank";
    a.click();
};

red.onclick = function () {
    console.log("点击红色");
    context.fillStyle = "red";
    context.strokeStyle = "red";
    red.classList.add("active");
    green.classList.remove("active");
    blue.classList.remove("active");
};

green.onclick = function () {
    context.fillStyle = "green";
    context.strokeStyle = "green";
    red.classList.remove("active");
    green.classList.add("active");
    blue.classList.remove("active");
};

blue.onclick = function () {
    context.fillStyle = "blue";
    context.strokeStyle = "blue";
    red.classList.remove("active");
    green.classList.remove("active");
    blue.classList.add("active");
};

/* 所有函数 */

/* 自动设置宽高 */
function autoSetCanvas(canvas) {
    setCanvasSize();
    window.onresize = function () {
        //监听宽高变化
        setCanvasSize();
    };
    function setCanvasSize() {
        //获取页面宽高
        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;

        canvas.width = pageWidth;
        canvas.height = pageHeight;
    }
}

/* 监听鼠标操作 */
function listenToUser(canvas) {
    var using = false;
    var lastPoint = { x: undefined, y: undefined };

    if (document.body.ontouchstart !== undefined) {
        //特性检测
        //支持触屏为 null
        canvas.ontouchstart = function (down) {
            using = true;
            var x = down.touches[0].clientX; //相对于视窗的位置而非canvas的位置
            var y = down.touches[0].clientY;
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10);
            } else {
                lastPoint = { x: x, y: y };
            }
        };

        canvas.ontouchmove = function (move) {
            var x = move.touches[0].clientX; //相对于视窗的位置而非canvas的位置
            var y = move.touches[0].clientY;

            if (!using) {
                return;
            }

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10);
            } else {
                var newPoint = { x: x, y: y };
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                lastPoint = newPoint; //更新上一个点
            }
        };

        canvas.ontouchend = function () {
            using = false;
        };
    } else {
        //不支持触屏为 undefined
        canvas.onmousedown = function (down) {
            using = true;
            var x = down.clientX; //相对于视窗的位置而非canvas的位置
            var y = down.clientY;
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10);
            } else {
                lastPoint = { x: x, y: y };
            }
        };

        canvas.onmousemove = function (move) {
            var x = move.clientX; //相对于视窗的位置而非canvas的位置
            var y = move.clientY;

            if (!using) {
                return;
            }

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10);
            } else {
                var newPoint = { x: x, y: y };
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                lastPoint = newPoint; //更新上一个点
            }
        };

        canvas.onmouseup = function () {
            using = false;
        };
    }
}

function drawCircle(x, y, radius) {
    context.fillStyle = "cyan";
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineWidth = 2;
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}

(function () {
    var CSS = {
        arena: {
            width: 900,
            height: 600,
            background: '#62247B',
            position: 'fixed',
            top: '50%',
            left: '50%',
            zIndex: '999',
            transform: 'translate(-50%, -50%)'
        },
        ball: {
            width: 15,
            height: 15,
            position: 'absolute',
            top: 0,
            left: 350,
            borderRadius: 50,
            background: '#C6A62F'
        },
        line: {
            width: 0,
            height: 600,
            borderLeft: '2px dashed #C6A62F',
            position: 'absolute',
            top: 0,
            left: '50%'
        },
        stick: {
            width: 12,
            height: 85,
            position: 'absolute',
            background: '#C6A62F'
        },
        stick1: {
            left: 0,
            top: 150
        },
        stick2: {
            left: 888,
            top: 150
        },
        scoreBoard:{
            padding:0,
            display:"flex",
            flexDirection: "row",
            justifyContent:'space-between',
            margin:'auto',
            width: '50%',
            marginTop:"0%",

        },
        score1:{
            fontSize:"18px",
            fontFamily:"Verdana",
            fontWeight:700,
            color:"white"
        },
        score2:{
            fontSize:"18px",
            fontFamily:"Verdana",
            fontWeight:700,
            color:"white"
        },
        scores:{
            position:"relative",
            left:"17%",
            marginTop:"50px",
            width:"150px",
            height:"20px",
            color:"white",
            borderRadius:"8px",
            border:"0px",
            fontFamily:"verdana",
            visibility:"hidden",
            textAlign:"center"
        }
    };

    var CONSTS = {
        stopFlag: true,
    	gameSpeed: 20,
        score1: 0,
        score2: 0,
        stick1Speed: 0,
        stick2Speed: 0,
        ballTopSpeed: 0,
        ballLeftSpeed: 0,
        
    };

    function start() {
        draw();
        setEvents();
        roll();
        loop();
    }

    function draw() {
        $('<div/>', {id: 'pong-game'}).css(CSS.arena).appendTo('body');
        $('<div/>', {id: 'score-board'}).css(CSS.scoreBoard).appendTo('#pong-game');
        $('<p/>', {id: 'score1', html:"0"}).css(CSS.score1).appendTo('#score-board');
        $('<p/>', {id: 'score2', html:"0"}).css(CSS.score2).appendTo('#score-board');
        $('<p/>', {id: 'play-again', html:"Play Again?"})
        .css(CSS.scores).on({'click': function() { roll() }}).appendTo('#pong-game');
        $('<div/>', {id: 'pong-line'}).css(CSS.line).appendTo('#pong-game');
        $('<div/>', {id: 'pong-ball'}).css(CSS.ball).appendTo('#pong-game');
        $('<div/>', {id: 'stick-1'}).css($.extend(CSS.stick1, CSS.stick))
        .appendTo('#pong-game');
        $('<div/>', {id: 'stick-2'}).css($.extend(CSS.stick2, CSS.stick))
        .appendTo('#pong-game');
    }

    function setEvents() {
        $(document).on('keydown', function (e) {
            //W button
            if (e.keyCode == 87) {
                CONSTS.stick1Speed = -15;
            }
            if(e.keyCode == 87 && CSS.stick1.top <= 0){
                CONSTS.stick1Speed = 0;
            }
            //S button
            if (e.keyCode == 83) {
                CONSTS.stick1Speed = 15;
            }
            if(e.keyCode == 83 && CSS.stick1.top >= CSS.arena.height - CSS.stick.height){
                CONSTS.stick1Speed = 0;
            }
            //Up Button
            if (e.keyCode == 38) {
                CONSTS.stick2Speed = -15;
            }
            if(e.keyCode == 38 && CSS.stick2.top <= 0){
                CONSTS.stick2Speed = 0;
            }
            //Down Button
            if (e.keyCode == 40) {
                CONSTS.stick2Speed = 15;
            }
            if(e.keyCode == 40 && CSS.stick2.top >= CSS.arena.height - CSS.stick.height){
                CONSTS.stick2Speed = 0;
            }
            //R button for restart
            if (e.keyCode == 82) {
                CONSTS.score1 = 0;
                CONSTS.score2 = 0;
                $("#score1").html(CONSTS.score1)
                $("#score2").html(CONSTS.score2)
                $("#play-again").css("visibility","hidden")
                CONSTS.stopFlag=true;
                loop();
                roll();
            }
            
        });
        $(document).on('keyup', function (e) {
            if (e.keyCode == 87) {
                CONSTS.stick1Speed = 0;
            }
            if (e.keyCode == 83) {
                CONSTS.stick1Speed = 0;
            }
            if (e.keyCode == 38) {
                CONSTS.stick2Speed = 0;
            }
            if (e.keyCode == 40) {
                CONSTS.stick2Speed = 0;
            }
        });
    }

    function loop() {
        let game = window.pongLoop = setInterval(function () {
            CSS.stick1.top += CONSTS.stick1Speed;
            $('#stick-1').css('top', CSS.stick1.top);

            CSS.stick2.top += CONSTS.stick2Speed;
            $('#stick-2').css('top', CSS.stick2.top);

            control();

            CSS.ball.top += CONSTS.ballTopSpeed;
            CSS.ball.left += CONSTS.ballLeftSpeed;;

            if (CSS.ball.top <= 0 ||
                CSS.ball.top >= CSS.arena.height - CSS.ball.height) {
                CONSTS.ballTopSpeed = CONSTS.ballTopSpeed * -1;
            }

            $('#pong-ball').css({top: CSS.ball.top,left: CSS.ball.left});

            if (CSS.ball.left <= CSS.stick.width) {
                CSS.ball.top > CSS.stick1.top && 
                CSS.ball.top < CSS.stick1.top + CSS.stick.height && 
                (CONSTS.ballLeftSpeed = CONSTS.ballLeftSpeed * -1) || score("left");
            }
            console.log(CSS.arena.width - CSS.stick.width - CSS.ball.width)
            if (CSS.ball.left >= CSS.arena.width - CSS.stick.width - CSS.ball.width + 0.5) {
                console.log(CSS.arena.width - CSS.stick.width - CSS.ball.width + 0.5)
                CSS.ball.top > CSS.stick2.top && 
                CSS.ball.top < CSS.stick2.top + CSS.stick.height && 
                (CONSTS.ballLeftSpeed = CONSTS.ballLeftSpeed * -1) || score("right");
            }
            if(CONSTS.stopFlag === false){
                clearInterval(game);

            }

            /*
            if (CSS.ball.left >= CSS.arena.width - CSS.ball.width - CSS.stick.width) {
                score()
                roll();
            }
            */
            
        }, CONSTS.gameSpeed);
    }

    function control(){
        if(CSS.stick1.top <= 0){
            CONSTS.stick1Speed=0;
        }
        if(CSS.stick2.top <= 0){
            CONSTS.stick2Speed=0;
        }

        if(CSS.stick1.top >= CSS.arena.height - CSS.stick.height){
            CONSTS.stick1Speed=0;
        }
        if(CSS.stick2.top >= CSS.arena.height - CSS.stick.height){
            CONSTS.stick2Speed=0;
        }
    }

    function score(param){
        if(param === "right"){
            CONSTS.score2 +=1; 
        } else if(param === "left"){
            CONSTS.score1 +=1; 
        }
        $("#score1").html(CONSTS.score1);
        $("#score2").html(CONSTS.score2);
        roll();
        if(CONSTS.score1 === 5 || CONSTS.score2 === 5){
            CONSTS.score1 > CONSTS.score2 ? gameover([1,CONSTS.score1]) :gameover([2,CONSTS.score2]);
        }
    }

    function gameover(param){
        CONSTS.stopFlag = false;
        if(param[0] === 1){
            $("#play-again").html("Birinci oyuncu kazandı.\n Yeniden oynamak için lütfen r tuşuna basın.")
            $("#play-again").css("visibility","visible")
        }
        if(param[0] === 2){
            console.log("ikinci")
            $("#play-again").html("İkinci oyuncu kazandı.\n Yeniden oynamak için lütfen r tuşuna basın.")
            $("#play-again").css("visibility","visible")
        }
    }

    function roll() {
        CSS.ball.top = 250;
        CSS.ball.left = 350;

        var side = -1;

        if (Math.random() < 0.5) {
            side = 1;
        }

        CONSTS.ballTopSpeed = Math.random() * -2 - 3;
        CONSTS.ballLeftSpeed = side * (Math.random() * 2 + 3);
    }

    start();
})();
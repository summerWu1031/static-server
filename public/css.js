const string = `
  /*
  *首先我们需要皮卡丘的皮
  */

  .skin {
    position: relative;
    background-color: #ffe600;
    min-height: 50vh;
  }

  /*
  *然后需要一个小巧的鼻子
  */

 .nose {
  position: relative;
  left: 50%;
  top: 40px;
  margin-left: -5px;
  border: 5px solid red;
  border-color: black transparent transparent transparent;
  height: 10px;
  width: 10px;
  z-index: 1;
}

.yuan {
  height: 4px;
  width: 10px;
  position: absolute;
  top: -9px;
  left: -5px;
  border-radius: 50% 50% 0 0;
  background-color: #000;
}

/*
*然后画皮卡丘的眼睛
*/
.eyes {
  width: 32px;
  height: 32px;
  border: 2px solid black;
  position: absolute;
  left: 50%;
  margin-left: -16px;
  top: 20px;
  border-radius: 50%;
  background-color: #2e2e2e;
}

/*
*画眼睛里面白色的部分
*/
.eyes::before {
  content: "";
  display: block;
  border: 2px solid black;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #fff;
  position: relative;
  left: 4px;
}

/*
*把眼睛放到合适的位置
*/
.eyes.left {
  transform: translateX(-75px);
}
.eyes.right {
  transform: translateX(75px);
}

/*
*开始画皮卡丘的嘴巴
*/
.mouth {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 70px;
  left: 50%;
  margin-left: -50px;
}

/*
*首先画它的上嘴唇
*/
.mouth .up {
  position: relative;
  top: -25px;
}
.mouth .up .lip {
  width: 60px;
  height: 15px;
  border: 2px solid black;
  border-top-color: transparent;
  position: absolute;
  left: 50%;
  margin-left: -30px;
  background-color: #ffe600;
  z-index: 1;
}

/*
*上嘴唇是像胡子形状的
*画好后把它放在对应位置
*/
.mouth .up .lip.left {
  border-radius: 0 0 0 50px;
  transform: rotate(-15deg) translateX(-31px);
}

.mouth .up .lip.right {
  border-radius: 0 0 50px 0;
  transform: rotate(15deg) translateX(31px);
}

.mouth .up .lip::before {
  content: "";
  display: block;
  width: 4px;
  height: 15px;
  position: absolute;
  bottom: -0.5px;
  background-color: #ffe600;
}
.mouth .up .lip.left::before {
  right: -3px;
}
.mouth .up .lip.right::before {
  left: -3px;
}


/*
*然后我们来画下嘴唇
*/
.mouth .down {
  width: 100px;
  height: 100px;
  position: absolute;
  top: -11px;
  overflow: hidden;
}
.mouth .down .yuan1 {
  width: 94px;
  height: 1000px;
  border: 3px solid black;
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -47px;
  border-radius: 75px/300px;
  background-color: #9b000a;
  overflow: hidden;
}

/*
*然后是小舌头
*/
.mouth .down .yuan2 {
  width: 100px;
  height: 100px;
  position: absolute;
  background-color: #ff485f;
  bottom: -17px;
  left: 50%;
  margin-left: -50px;
  border-radius: 50% 50% 0 0;
}

/*
*接着我们来画皮卡丘的脸
*/
.face {
  width: 44px;
  height: 44px;
  border: 2px solid black;
  position: absolute;
  top: 85px;
  left: 50%;
  margin-left: -22px;
  border-radius: 50%;
  background-color: #ff0000;
  z-index: 3;
}

/*
*把脸颊放到合适的位置
*/
.face.left {
  transform: translateX(-100px);
}
.face.right {
  transform: translateX(100px);
}

/*
*然后把皮卡丘的放电技能放到合适的地方
*/
.face > img {
  position: absolute;
  top: 50%;
  left: 50%;
  display:block;
}

.face.left > img {
  transform: rotateY(180deg);
  transform-origin: 0 0;
}

/*
*画好了，把皮卡丘送你
*/

/*
*让我们来画一个精灵球吧
*首先需要画一个圆
*/
.ball {
  width: 100px;
  height: 100px;
  border: 4px solid black;
  position: absolute;
  top: 200px;
  left: 50%;
  margin-left: -50px;
  border-radius: 50%;
}

/*
*然后画一个里面的小球球
*/
.innerBall {
  width: 50px;
  height: 50px;
  border: 4px solid black;
  border-radius: 50%;
  background-color: #fff;
  position: absolute;
  top: 23px;
  left: 50%;
  margin-left: -25px;
  z-index: 1;
}

/*
*接着把开关红色的部分图上
*/
.innerBall::after {
  content: "";
  display: block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 4px solid #d9171a;
  background-color: #ff1b1b;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -15px;
  margin-top: -15px;
  transform-origin: bottom center;
  animation: blink 1s infinite;
}

/*
*最后加点阴影让他看起来更立体
*/
.ball::before {
  content: "";
  display: block;
  width: 95px;
  height: 95px;
  border-radius: 50%;
  border-right: 20px solid rgba(0, 0, 0, 0.2);
}

/*
*精灵球画好啦，希望你可以收服皮卡丘哦
*/
  `

  export default string
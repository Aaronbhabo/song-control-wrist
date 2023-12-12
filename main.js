song="";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;
function setup(){
    canvas = createCanvas(420,420);
    canvas.position(450,190);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelloaded);
    poseNet.on("pose",gotPoses);
}

function draw(){
    image(video,0,0,420,420);

if(scoreRightWrist>0.2){



    circle(rightWristX,rightWristY,20);

    if(rightWristY>0&&rightWristY<=100){
        document.getElementById("speed").innerHTML="Speed = 0.5x";
        song.rate(0.5);
    }
    if(rightWristY>100&&rightWristY<=200){
        document.getElementById("speed").innerHTML="Speed = 1x";
        song.rate(1);
    }

    if(rightWristY>200&&rightWristY<=300){
        document.getElementById("speed").innerHTML="Speed = 1.5x";
        song.rate(1.5);
    }

    if(rightWristY>300&&rightWristY<=400){
        document.getElementById("speed").innerHTML="Speed = 2x";
        song.rate(2);
    }

    if(rightWristY>400&&rightWristY<=500){
        document.getElementById("speed").innerHTML="Speed = 2.5x";
        song.rate(2.5);
    }
}

if(scoreLeftWrist>0.2){
    fill("#FF0000");
    stroke("#FF0000");
    circle(leftWristX-120,leftWristY-30,20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = (remove_decimals/1000)*2;
    document.getElementById("volume").innerHTML="Volume: "+volume;
    song.setVolume(volume);
}

   


}

function preload(){
    song = loadSound("music.mp3");
    
}

function Play(){
    song.play();
    song.setVolume(1);
    song.rate(0.5);
}

function modelloaded(){
    console.log("PoseNet is Initialised");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;



        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("left - "+leftWristX);
        console.log("left - "+leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("right - "+rightWristX);
        console.log("right - "+rightWristY);
    }
  

}



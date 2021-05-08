img="";
status="";
objects=[];

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model has been loaded.");
    status=true;
}

function gotresult(error,result){

if(error){
    console.error(error);
}
else{
    console.log(result);
    objects=result;
}

}

function draw(){
    image(video,0,0,600,500);
        if(status != ""){
            r=random(255);
            g=random(255);
            b=random(255);
            objectDetector.detect(video,gotresult);
            for(i=0; i<objects.length; i++){
                    document.getElementById("status").innerHTML="Status: Object Detected";
                    document.getElementById("number_of_objects").innerHTML="Number of Objects Detected: "+objects.length;
                    fill(r,g,b);
                    percent=floor(objects[i].confidence*100);
                    text(objects[i].label+" "+percent+"%", objects[i].x, objects[i].y);
                    noFill();
                    stroke(r,g,b);
                    rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            }
        }



        
   // text("Dog",110,80);
    //noFill();
    //stroke("red");
    //rect(50,50,500,440);
    //rect(270,100,260,400);
    //text("Cat",370,140); 
}
//sound, pic transition---------------------------------------------------------new code--
var win = new Audio('audio/win.wav');
var lose = new Audio('audio/lose.wav');
// d.style.border = "thick solid #0000FF";
// d.style.border = "thick solid red";
// win.play();
//randomInteger will create a random integer between mininteger and maxinteger, both inclusive
randomInteger = function(mininteger,maxinteger){
  return Number(mininteger+Math.floor((Math.random() * (maxinteger+1-mininteger))));
}
//------------------------------------------------------------------------
//samplingNonRepeat will create a random sample of length b from l
//it is non repeatative
samplingNonRepeat = function(l,b){
g = []
for (i = 0; i < b; i++) {
      r = randomInteger(0,l.length-1);
      g.push(l[r]);
      l.splice(r,1);
  }
  return g
};
//--------------------------------------------------------------------------
//auto increment numbers
numGenerate = function(first,last){
  g = [];
  for (i = first; i<last+1 ;i++){
    g.push(i);
  };
  return g;
};
//-------------------------------------------------------------------------
//given an array l and number of options variable b
//it will generate target and options as an array
//c is the additional repeat for target
//c is the number of additional repeatation
//if c = 1, then in options target will present twice, other options are unique
//if c = 0, there is no repeatation , just one target in options
targetsRepeat = function(l,b,c){
    targetindex = randomInteger(0,l.length-1)
    var target = l[targetindex]; //this is our target
    l.splice(targetindex,1)//removing the target from l
    gg = numGenerate(0,b-1);
    myindexforoptions = samplingNonRepeat(gg,b-c-1) //index of others in options
    var g = samplingNonRepeat(l,b-(c+1));//get others
    var pp = [];
for (k = 0;k<b;k++){
  if (myindexforoptions.includes(k)){
      pp[k] = g[myindexforoptions.indexOf(k)];
    }
    else {
      pp[k] = target;
    }
};
    pp.splice(0,0,target);
    return pp;
};
// ----------------------------------
// string = String[2,3,4,5]; gives "2,3,4,5"
// var array = JSON.parse("[" + string + "]"); gives array =[2,3,4,5]
// var arrays = string.split(","); gives arrays =["2","3","4","5"]
//------------------------------------------------------------------------new code
//var allpics = { 'one': 1111, 'two': 1112, 'three': 1121,'four':1122,'five':1211,'six':1212,'seven':1221,'eight':1222 };
// Put the object into storage
myNewgame = function(){
localStorage.clear();
var allpics = ['1111','1112','1121','1122','1211','1212','1221','1222'];
var coverPics = [1,2,3,4]
var dcover = samplingNonRepeat(coverPics,1);
dcover = dcover.toString();
var b = 6;//number of options
var c = samplingNonRepeat(allpics,3);
c = c.concat(c)
// console.log(c);
c = samplingNonRepeat(c,6);
// console.log(c);
// document.getElementById("pic0").src = "pics/"+ c[0]+".png";
// document.getElementById("pic1").src = "pics/"+ c[1]+".png";
// document.getElementById("pic2").src = "pics/"+ c[2]+".png";
// document.getElementById("pic3").src = "pics/"+ c[3]+".png";
// document.getElementById("pic4").src = "pics/"+ c[4]+".png";
// document.getElementById("pic5").src = "pics/"+ c[5]+".png";
document.getElementById("pic0").src = "pics/"+ dcover+".jpg";
document.getElementById("pic1").src = "pics/"+ dcover+".jpg";
document.getElementById("pic2").src = "pics/"+ dcover+".jpg";
document.getElementById("pic3").src = "pics/"+ dcover+".jpg";
document.getElementById("pic4").src = "pics/"+ dcover+".jpg";
document.getElementById("pic5").src = "pics/"+ dcover+".jpg";
var picId = ['pic0','pic1','pic2','pic3','pic4','pic5']
for (j in picId){
document.getElementById(picId[j]).style.border = "none";}


document.getElementById("mypara").innerHTML = "Game starts...";
document.getElementById("buttonId1").style.visibility = "hidden";
//-------------------------------------------------------------------
localStorage.coverPic = dcover;
localStorage.pics = c;
localStorage.isCompleted = 0;//0 means middle of game, 1 means game over
localStorage.state = [1,1,1,1,1,1];//active state of 6 positions, 1 means active
localStorage.comparison = [];
localStorage.button = 1;//button is hidden; 1 for hidden
// comparison is is empty [] or some number such as [4]
// it takes the previous one, or if matching occurs it is empty []
// it initiates with []
//localStorage.removeItem(picId);
// var picId = ['pic0','pic1','pic2','pic3','pic4','pic5']
// localStorage.picId = picId;
// for (j in picId){
//   document.getElementById(picId[j]).classList.remove("nullCursor");
//   // console.log(picId[j]);
// }
document.getElementById("buttonId").classList.add("disabled");
};
//----------------------------------
// --------------------------------------
myNewgame();
//console.log(localStorage);
//------------------------------------
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
// -----------------------------------
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// -----------------------------------
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
// ------------------------------------
myFunction = function(){
  if (Number(localStorage.isCompleted)){
myNewgame();}
//console.log(localStorage);
                        };
//----------------------------------------
myFunction1 = function(){
  // // console.log(localStorage.d);
  // d = localStorage.d;
  // // d = JSON.parse(localStorage.d)
  // d1 = localStorage.d1;
  // console.log(typeof d);
  // console.log(d1);
  var d = document.getElementById("pic"+localStorage.d)
  var d1 = document.getElementById("pic"+localStorage.d1)
  d.src = "pics/"+ localStorage.coverPic+".jpg";
  d1.src = "pics/"+ localStorage.coverPic+".jpg";
  d.style.border = "none";
  d1.style.border = "none";
  document.getElementById("buttonId1").style.visibility = "hidden";
  localStorage.button = 1;//button is hidden; 1 for hidden
                         };

//----------------------------------------
comparisonAction = function(nuM){
  // var cArray = localStorage.comparison
  // cArray = JSON.parse("[" + cArray + "]");
  // console.log(localStorage.isCompleted);
  // console.log(localStorage.state);
  // console.log(cArray);
  var isActive = JSON.parse("[" + localStorage.state + "]")[nuM];
  var button = Number(localStorage.button);
  // console.log(button);
  // console.log(isActive && button);
  if (isActive && button){
    // it the pic is active, then only it works
    var d = document.getElementById("pic"+String(nuM)) // get the clicked pic
    // console.log(d);
    var cArray = localStorage.comparison
    cArray = JSON.parse("[" + cArray + "]"); // get the earlier playing state
    if (cArray.length){
    // it means there is some open pic before
    var d1 = document.getElementById("pic"+String(cArray[0]))
    // get that pic now
                      }
    // cArray = cArray.split(",")
    // console.log(cArray);
    // console.log(nuM);
    var myPic = localStorage.pics;
    // console.log(myPic);
    myPic = myPic.split(",")
    // console.log(myPic);
    // console.log(d);
    // console.log(cArray.length);
    if (cArray.length === 0){
        // it means there is nothing earlier open
        // i.e either game just starts or a matching just occurs earlier
        d.src = "pics/"+ myPic[nuM]+".png";
        localStorage.comparison = [nuM];
                            }
    else if (nuM !== cArray[0]) {
        // it means user does not click the same pic as he did earlier
        d.src = "pics/"+ myPic[nuM]+".png";
        localStorage.comparison = [];
        // matching or non-matching both case it is empty
        if (myPic[nuM]!== myPic[cArray[0]]){
            // non matching occurs
            lose.play();
            d.style.border = "thick solid red";
            d1.style.border = "thick solid red";
            document.getElementById("buttonId1").style.visibility = "visible";
            localStorage.button = 0;
            localStorage.d = nuM;
            localStorage.d1 = cArray[0];

                //  setTimeout(function()
                //           {
                //             d.src = "pics/"+ localStorage.coverPic+".jpg";
                //             d1.src = "pics/"+ localStorage.coverPic+".jpg";
                //           }, 700);
                 //
                //   console.log('hi');
                                                }
        else {    win.play();
                  d.style.border = "thick solid #0000FF";
                  d1.style.border = "thick solid #0000FF";
                  var temp = localStorage.state
                  temp = JSON.parse("[" + temp + "]");
                  temp[nuM] = 0 ;
                  temp[cArray[0]] = 0;
                  var sum = temp.reduce((a, b) => a + b, 0);
                  // sum of temp
                  if (sum === 0){
                      localStorage.isCompleted = 1;// game over
                      document.getElementById("mypara").innerHTML = "Game over...";
                      document.getElementById("buttonId").classList.remove("disabled");
                                    }
                  localStorage.state=temp;
                  // console.log('hii');
             }
    }
    // var c1Array = localStorage.comparison
    // c1Array = JSON.parse("[" + c1Array + "]");
    // console.log(localStorage.isCompleted);
    // console.log(localStorage.state);
    // console.log(c1Array);
  }
// console.log(localStorage.comparison);
// console.log(localStorage.state);

  // if (Number(localStorage.state)){
  //   //console.log('Inside if');
  //   if (top===bot[nuM-1]){
  //     d.src = "pics/"+"y1"+".jpg";
  //     d.classList.add("nullCursor");
  //     localStorage.repeat = Number(localStorage.repeat) - 1;
  //     //console.log(localStorage.repeat);
  //     document.getElementById("mypara").innerHTML = "Get them all..";
  //     if (!(Number(localStorage.repeat))){
  //       localStorage.state = 0;
  //       //d.className += "nullCursor";
  //       var picId = localStorage.picId;
  //       picId = picId.split(",");
  //       for (j in picId){document.getElementById(picId[j]).classList.add("nullCursor");}
  //       localStorage.isCompleted = 1;
  //       document.getElementById("buttonId").classList.remove("disabled");
  //       document.getElementById("mypara").innerHTML = "Game over...";
  //       // document.getElementById("mypara").textContent = "hioo";
  //       //console.log(localStorage);
  //     }
  //   }
  //   else {d.src = "pics/"+"x1"+".jpg";
  //         d.classList.add("nullCursor");}
  //   }
};
//----------------------------------------

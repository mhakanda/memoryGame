//sound, pic transition---------------------------------------------------------new code--
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
var coverPics = [1,2,3,4,5,6]
var dcover = samplingNonRepeat(coverPics,1);
dcover = dcover.toString();
var b = 6;//number of options
var c = samplingNonRepeat(allpics,3);
c = c.concat(c)
// console.log(c);
c = samplingNonRepeat(c,6);
console.log(c);
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

document.getElementById("mypara").innerHTML = "Game starts...";
//-------------------------------------------------------------------
localStorage.coverPic = dcover;
localStorage.pics = c;
localStorage.isCompleted = 0;//0 means middle of game, 1 means game over
localStorage.state = [1,1,1,1,1,1];//active state of 6 positions, 1 means active
localStorage.comparison = [];
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
comparisonAction = function(nuM){
  var isActive = JSON.parse("[" + localStorage.state + "]")[nuM];
  if (isActive){
    var d = document.getElementById("pic"+String(nuM))
    var cArray = localStorage.comparison
    cArray = JSON.parse("[" + cArray + "]");
    if (cArray.length){
    var d1 = document.getElementById("pic"+String(cArray[0]))
    }
    // cArray = cArray.split(",")
    console.log(cArray);
    console.log(nuM);

    var myPic = localStorage.pics
    // console.log(myPic);
    myPic = myPic.split(",")
    // console.log(myPic);
    // console.log(d);
    // console.log(cArray.length);
    if (cArray.length === 0){
      d.src = "pics/"+ myPic[nuM]+".png";
      localStorage.comparison = [nuM];
    }
    else if (nuM !== cArray[0]) {
              d.src = "pics/"+ myPic[nuM]+".png";
              localStorage.comparison = [];
              if (myPic[nuM]!== myPic[cArray[0]]){
              //   sleep(9000);
              //   d.src = "pics/"+ localStorage.coverPic+".jpg";
              //  d1.src = "pics/"+ localStorage.coverPic+".jpg";

                // sleep(4500).then(() => {
                //                 // Do something after the sleep!
                //                 d.src = "pics/"+ localStorage.coverPic+".jpg";
                //                 d1.src = "pics/"+ localStorage.coverPic+".jpg";
                //                       });
                setTimeout(function()
                          {
                            d.src = "pics/"+ localStorage.coverPic+".jpg";
                            d1.src = "pics/"+ localStorage.coverPic+".jpg";
                          }, 700);

                  console.log('hi');
                }else {
                      var temp = localStorage.state
                      temp = JSON.parse("[" + temp + "]");
                      temp[nuM] = 0 ;
                      temp[cArray[0]] = 0;
                      var sum = temp.reduce((a, b) => a + b, 0);
                      if (sum === 0){
                        localStorage.isCompleted = 1;// game over
                        document.getElementById("mypara").innerHTML = "Game over...";
                        document.getElementById("buttonId").classList.remove("disabled");
                      }
                      localStorage.state=temp;
                      console.log('hii');
                      }
      // console.log('hello');
    }
  }

console.log(localStorage.comparison);
console.log(localStorage.state);

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

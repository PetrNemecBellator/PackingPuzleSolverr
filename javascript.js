window.onload = function() { // this function is called when is javascript fully loaded

 let my_table;
 let x = 3;
 let y = 3;
 dinamic_table();
 
  

  let drawB = document.getElementById("drawB");
  let otocB = document.getElementById("otocB");
  let addShapeB = document.getElementById("addShape");
  let body = document.getElementsByTagName("body");
  let inpX = document.getElementById("inpX");
  let inpY = document.getElementById("inpY");
  my_table = document.getElementById("tableInput");

let recalcB = document.getElementById("reCalcButton");
recalcB.onclick =function (){
  x=   Number(inpX.value) -1;
  y= Number(inpY.value)-1;
  my_table.innerHTML = "";
  dinamic_table();
}
enumSides = {
  up:1,
  down:2,
  left:3,
  right:4,
  wronSide: 5555
  
};
const enumCor = {
  X:0,
  Y:1
};

addShapeB.onclick = () =>{
  console.log("zmackl sem tlacitko")  
  let shap = new BlockG();
  //shap.blocksF = [[1,1][1,2]]//je vpravo
  //shap._conversionToDegrees();
  shap.addBlock(my_table);
  
  
}

function testOutput(stringM){
  var testOUtput = document.getElementById("testL");
  var li = document.createElement("li");
  li.innerHTML =stringM;
  testOUtput.appendChild(li);
} 

var BlockG =  function(){
        const blockSize= 25;//px?
        this.numberOfSides =0;
        this.blocksF = [];
        
          
          
        this.addrealBlock = () =>{
            this.blocksF.sort();
            for (let i = 0 ; i < this.blocksF.length; i ++){
              this.blocksF[0].sort(); 
            }
            this._getBlockfValues();
          }


        this._getBlocksFromTable = (my_table) =>{
            //init
            let rowL = my_table.rows.length;
            for(let rowI=0; rowI < rowL ; rowI++){
              collumsL = my_table.rows[rowI].cells.length
              for (let collumsI=0; collumsI < collumsL; collumsI++ ){
              console.log("x:", collumsI, " y:", rowI ,my_table.rows[rowI].cells[collumsI].style.getPropertyValue("background-color"));
              if (my_table.rows[rowI].cells[collumsI].style.getPropertyValue("background-color")== "none" ||my_table.rows[rowI].cells[collumsI].style.getPropertyValue("background-color")==""){
              
                continue;
              }
              //collumsI = Xpos , rowI = Ypos
                this.blocksF.push([collumsI,rowI]);
                console.log("true". rowI ," " ,collumsI);
                continue;

              }
            }  
            return;
        }
        this.degresFormat= [];

        this._conversionToDegrees = () =>{
            
            this.relativDirection = function(originalBlockX,originalBlockY , newBlockX , newBlockY){
            if(originalBlockY == newBlockY ){
              if (originalBlockX - newBlockX == -1  ){
                return enumSides.right;
              }
              if (originalBlockX - newBlockX == 1){
                return enumSides.left;
              }
            }
            if (originalBlockX == newBlockX){
              if (originalBlockY - newBlockY == -1 ){
                return enumSides.down;
              }
              if(originalBlockY - newBlockY == 1){
                return enumSides.up;
              }
            } 
              return enumSides.wronSide;
          }
          this.findBlockonSpecificSide =(actualBlockX,actulaBlockY,sideYouNeedTofind) => {
           
                console.log("vstupni blok existuje")
                if (sideYouNeedTofind == enumSides.down){
                  console.log("kontroluju dolu")
                  let value = (this.blocksF.find(function(element){
                    console.log("porovnavany block X" + element[0]+ " porovnavany block Y" + element[1])
                    
                    return actualBlockX - element[0] == 0   && actulaBlockY -  element[1] == -1;
                  }))

                  if ( isDefined(value)){
                    return -1;
                  }
                  return value;
                 
                }else if(sideYouNeedTofind == enumSides.up){ 
                  console.log("kontroluju nahoru")
                  let value = (this.blocksF.find(function(element){
                    
                    return actualBlockX - element[0] == 0   && actulaBlockY -  element[1] ==1;
                  }))
                  if ( isDefined(value)){
                    return -1;
                  }
                  return value;

                  
                }else if (sideYouNeedTofind == enumSides.left){
                  let value = (this.blocksF.find(function(element){
                    
                    return actualBlockX - element[0] == 1   && actulaBlockY -  element[1] ==0;
                  }))
                  if ( isDefined(value)){
                    return -1;
                  }
                  return value
                  
                }else if (sideYouNeedTofind == enumSides.right){
                  let value =(this.blocksF.find(function(element){
                    
                    return actualBlockX - element[0] == -1   && actulaBlockY -  element[1] ==0;//searching for curent block
                  }))
                  if ( isDefined(value)){
                    return -1;
                  }
                  return value
                 
                }else{
                  console.log("blok nenalezen");
                   return -1;//searching was unsuccesfull
                }
          /*}else{
                console.log("blok vuci kteremu se vyhledava neexistuje");
                return -1;//searching was unsuccesfull
              }*/
            
            
          };

          console.log("vypis hodnot")
          console.log(this.blocksF)
          
          let first =true;
          let originalBlockX,originalBlockY,newBlockX,newBlockY;  
          let directionRight, directionLeft, directionUp, directionDown;//true false
          let tempDegres;
          let usedCoordinates=[]
          
          for (let x=0 ; x<this.blocksF.length-1 ;x++){ 
            console.log("zmackl sem tlacitko"+ enumCor.X + " " + enumCor.Y)
            originalBlockX = this.blocksF[x][0];
            originalBlockY = this.blocksF[x][1];
            console.log("original X=" +"[" +originalBlockX+ "]"  + "Y=" + "[" + originalBlockY + "]");
            console.log("____________________________________");
            
            usedCoordinates.push([originalBlockX,originalBlockY]);
            let blockRight = this.findBlockonSpecificSide(originalBlockX,originalBlockY,enumSides.right);
            let blockDown = this.findBlockonSpecificSide(originalBlockX,originalBlockY,enumSides.down);
            console.log("pravej block")
            console.log(blockRight)
            console.log("down block")
            console.log(blockDown)
            console.log("block v pravo" + "X "+ blockRight[0] +" Y: " + blockRight[1] + " block dole " +"X "+ blockDown[0] +" Y: " + blockDown[1] )

            for(let y=x; y< this.blocksF ; y++){
              newBlockX = this.blocksF[y][0];//0=X 
              newBlockY = this.blocksF[y][1];//1=Y
              console.log("new blok X=" +"[" +newBlockX+ "]"  + "Y="  + "[" + newBlockY + "]");

              let direction = this.relativDirection(originalBlockX,originalBlockY,newBlockX,newBlockY);
              if(direction == enumSides.right){
                console.log("right");
                directionRight = true;
                
              }
              if (direction == enumSides.down){
                console.log("down");
              }
             
              if (direction== enumSides.up){
                console.log("up");

              } else if (direction == enumSides.left){
                console.log("left");
              } else{
                console.log("neco je fakt spatne nespravny smer");
              }  
              console.log("****************************");
            }
          
          }      
          
      }

            this.addBlock = ( my_table) =>{
            this._getBlocksFromTable(my_table); //get x y coordinates of each block
            this.blocksF.sort();
            this._getBlockfValues(this.blocksF);
            this._conversionToDegrees();
            testOutput("vypis pole true false")
           
              
                //addrealBlock();
            }
        
            
        
            this._getBlockfValues = function(array){
              let rowL = array.length;
              
              for (let row = 0 ; row < rowL ; row++){
                
                  testOutput("<li>block<b>[X]</b>= "+ array[row][0] +" <b> [Y]: </b>"+ array[row][1]) + "</li>";  
                  
                
                
              }
              testOutput("<br>")
              return;
            }
     }//konec objektu 
          
          
          
isDefined = (variable) =>{
  return !( variable === undefined);
}

        
        // this._getBlockfValues(this.blocksF);
  
  




otocB.onclick = function(){
  mujPuz.otoc();
};


function create_cell(){
  let td = document.createElement("td");
  this.ithasbeenClicked = false;
  td.innerHTML = "";
  
  td.onclick = function (){
    if (!this.ithasbeenClicked){
      td.setAttribute("style","background-color:black;");
      this.ithasbeenClicked = true;
    }else{
      this.ithasbeenClicked=false;
      td.setAttribute("style","background-color:none;");
      
      }
    }
    return td;
  }

  function dinamic_table(){
    /*
    dinamic table with interactiv collums it 
    serves as input for our puzzle solver.
    */
    my_table = document.getElementById("tableInput");
      for (let iy = 0 ; iy< y +1;iy++ ){
        myRow = my_table.insertRow(0);
        
        for(let ix = 0; ix < x +1 ; ix++){
          
          myRow.appendChild(create_cell());//insertCell(ix).innerHTML="[X: " +( ix) + "Y: " +(y- iy)+"]";
          
        }
      }
    }
}

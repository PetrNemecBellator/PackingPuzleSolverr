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
        this.degresFormat= [];
        
          
          
        this.addrealBlock = () =>{
           // this.blocksF.sort(0);
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
                this.blocksF.push([     [(collumsI.valueOf()),(rowI.valueOf())],    [((collumsI+1).valueOf()),(rowI.valueOf())],
                                    [ ((collumsI+1).valueOf()) , ( (rowI+1).valueOf()) ],[( (collumsI).valueOf() ) , ((rowI+1).valueOf())] ]);
                
                continue;

              }
            }
            console.log("vypis hodnot")
            console.log(this.blocksF)  
            return;
        }
       

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

                console.log("funkce na hledani sousedniho blocku")
                console.log("vstupni souradnice X " + actualBlockX + " Y: " + actulaBlockY )
                if (sideYouNeedTofind == enumSides.down){
                  console.log("kontroluju dolu")
                  let value = (this.blocksF.find(function(element){
                    console.log("porovnavany block X" + element[0]+ " porovnavany block Y" + element[1])
                    console.log("aktulani block X: " + actualBlockX + " Y: " + actulaBlockY);
                    console.log(actualBlockX - element[0]);
                    console.log(actulaBlockY -  element[1]);
                    console.log( actualBlockX - element[0] == 0   && actulaBlockY -  element[1] == -1);
                    return actualBlockX-element[0] == 0   && actulaBlockY- element[1] == -1;
                  }))
                  console.log("value");
                  console.log(""+value)
                  if ( !isDefined(value)){
                    return -1;
                  }
                  return value.slice();
                 
                }else if(sideYouNeedTofind == enumSides.up){ 
                  console.log("kontroluju nahoru")
                  let value = (this.blocksF.find(function(element){
                    
                    return actualBlockX - element[0] == 0   && actulaBlockY -  element[1] ==1;
                  }))
                  if (! isDefined(value)){
                    return -1;
                  }
                  return value.slice();

                  
                }else if (sideYouNeedTofind == enumSides.left){
                  console.log("kontroluju v levo")
                  console.log("aktualni block X" + actualBlockX + " Y: " + actulaBlockY)
                  let value = (this.blocksF.find(function(element){
                    console.log("---------------------------")  
                    console.log("porovnavany block X" + element[0]+ " porovnavany block Y" + element[1])
                    return actualBlockX - element[0] == 1   && actulaBlockY -  element[1] ==0;
                  }))
                  if ( !isDefined(value)){
                    return -1;
                  }
                  return value.slice()
                  
                }else if (sideYouNeedTofind == enumSides.right){
                 
                  console.log("??????????????????????????????????")
                  console.log("kontroluji v pravo")
                  console.log("aktualni block X" + actualBlockX + " Y: " + actulaBlockY)
                  let value = (this.blocksF.find(function(element){
                    console.log("---------------------------")
                    console.log("porovnavany block X" + element[0]+ " porovnavany block Y" + element[1])
                    console.log(actualBlockX - element[0] == -1   && actulaBlockY -  element[1] ==0)
                    return actualBlockX - element[0] == -1   && actulaBlockY -  element[1] ==0;//searching for curent block
                  }))
                  console.log("??????????????????????????????????")
                  console.log("navratova hodnota "+value);
                  console.log("" +value)
                  console.log("value vypsana")
                  if (! isDefined(value)){
                    return -1;
                  }

                  return value.slice();
                 
                }else{
                  console.log("blok nenalezen");
                   return -1;//searching was unsuccesfull
                }
            
          };
         
          enumSidesBetterVersion={
            left: [-1,0],
            right: [1,0],
            up: [0,-1],
            down:[0,1]  

          };

          this.numberNeiberOfBlocks =(blockX,blockY) =>{
            console.log("/t searching for neighbors");
            console.log("/t block X: " + blockX + " Y: " + blockY);
            
            let rowL = this.blocksF.length;
            let numberOfSides = 0;
            for (let row = 0 ; row < rowL ; row++){
                for (let nextL =0 ; nextL < this.blocksF[row].length; nextL++){
                  console.log("/t/t porovnavany block: X : " + this.blocksF[row][nextL][enumCor.X] +
                  " Y: " + this.blocksF[row][nextL][enumCor.Y] );
                  
              
                  if ((this.blocksF[row][nextL][enumCor.X] == blockX) && (this.blocksF[row][nextL][enumCor.Y])){
                    numberOfSides++;
                    continue;
                  }
                  
                
            }
            console.log("/t/t/t numbero of nighbors: " + numberOfSides)
            return numberOfSides;
          
           }    
         }
      
          console.log("vypis hodnot")
          console.log(this.blocksF)
          let directionNub = 0
          let clockWiseDirection = [enumSidesBetterVersion.right,enumSidesBetterVersion.down,enumSidesBetterVersion.left, enumSidesBetterVersion.up];
          
          this.changeOfDirection = (number)=>{
            if (number < 0) return numberOfSides.length +1+ number; 
            return number%clockWiseDirection.length
          };

          
          let originalBlockX,originalBlockY;  
              
         
         clockWiseDirection[directionNub][enumCor.X]

          originalBlockX = this.blocksF[0][0][enumCor.X];//coordinates where searching have begun
          originalBlockY = this.blocksF[0][0][enumCor.Y ];//
          
          console.log("originalX " + originalBlockX);
          console.log("originalY " +originalBlockY);
          console.log("block direc: " + clockWiseDirection[directionNub][enumCor.X])
          console.log("block direc: " + clockWiseDirection[directionNub][enumCor.Y])

          newBlockX = originalBlockX + clockWiseDirection[directionNub][enumCor.X];
          newBlockY = originalBlockY + clockWiseDirection[directionNub][enumCor.Y];
          
          let firstRun = false;;
          let numb;
          let firstNeighbor = true;
          let numberOfNeighborBlocks= 0;
          console.log((originalBlockX =! newBlockX)  + " "+(originalBlockX =! newBlockY))
          while((originalBlockX =! newBlockX) ||(originalBlockX =! newBlockY)){
            if (!firstRun){
              numb =this.numberNeiberOfBlocks(newBlockX , newBlockY );              
              firstRun  = true;              
            }else{
              numb =this.numberNeiberOfBlocks(newBlockX +clockWiseDirection[directionNub][enumCor.X], newBlockY + clockWiseDirection[directionNub][enumCor.Y]);              
            }
            

            console.log("pocet sousednich " + numb);  
            if(numb == 2){ // mam jednoho soudesa
              if(firstNeighbor){
                firstNeighbor = false;
                numberOfNeighborBlocks +=2;
              }else{
                numberOfNeighborBlocks++;
              }

            }else if(numb == 1  ){
              if(numberOfNeighborBlocks == 0){
                //probadly something wrong

              }else{
                this.degresFormat.push(numberOfNeighborBlocks);
              }
              this.degresFormat.push(90);
              directionNub = this.changeOfDirection(directionNub+1)
              console.log("actual direction is: " + directionNub);
            }else if(numb == 3){
              if(numberOfNeighborBlocks == 0){
                //probadly something wrong

              }else{
                this.degresFormat.push(numberOfNeighborBlocks);
              }
              this.degresFormat.push(270);
              directionNub = this.changeOfDirection(directionNub-1);
              console.log("actual direction is: " + directionNub);
            }
            newBlockX = newBlockX + clockWiseDirection[directionNub][enumCor.X];
            newBlockY = newBlockY + clockWiseDirection[directionNub][enumCor.Y];
            break; //infinite loop
          }
          
           // blockDown = (this.findBlockonSpecificSide(originalBlockX,originalBlockY,enumSides.down));
            /*
            console.log("block down check")
            console.log(blockDown);           
            console.log();
            console.log("||||||||||||||||||||||||||||||||||||||||||");
            console.log("hledaci smycka");
*/
         
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
                testOutput("???????????????????????????????????????????? ");
                console.log("--------------------------------------------");

                  for (let nextL =0 ; nextL < array[row].length; nextL++){
                    console.log( "X"+ array[row][nextL][0] + "  Y:"+ array[row][nextL][1] );
                    testOutput("X"+ array[row][nextL][0] + "  Y:"+ array[row][nextL][1]);
                  }
                  console.log();
                  console.log("--------------------------------------------");
                
              }
              testOutput("???????????????????????????????????????????? ");             
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

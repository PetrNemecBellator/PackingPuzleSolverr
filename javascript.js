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

addShapeB.onclick = () =>{
  
  let shap = new BlockG();
  shap.addBlock(my_table);
  
  
}
let enumCor = {
  X:0,
  Y:1
};
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
            for (let i = 0 ; i < this.blocksF.length; i ++){
              this.blocksF[0].sort(); 
            }
            this.getBlockfValues();
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
          console.log("vypis hodnot")
          console.log(isDefined(undefined));
          console.log(this.blocksF)
          let first =true;
          let prevusCorX = 0 ;
          let prevusCorY = 0;  
          let directionUp, directionDown, directionLeft, directionRight;
          let tempDegres;
          let crosingS=[]
          for (let x=0 ; x<this.blocksF.length ;x++){ 
                if (isDefined(this.blocksF[x][enumCor.Y]) && isDefined(this.blocksF[x][enumCor.X]) ){ // does this point realy exists
                  console.log("souradnice jsou definovany X:" + this.blocksF[x][enumCor.X] + "Y:" + this.blocksF[x][enumCor.Y])
                  console.log("aktualni prubeh: " + x);
                  if (first){
                    prevusCorX = this.blocksF[x][enumCor.X];
                    prevusCorY = this.blocksF[x][enumCor.Y]; 
                    first = false;
                    continue;
                  }
                  
                  if (this.blocksF[x][enumCor.Y] == prevusCorY ){ // is on the same y level
                    if (directionUp){ //is that a corner 
                      console.log("push 90 nahoru");
                      this.degresFormat.push(90);
                      directionUp =false;
                      directionDown = false;
                      directionLeft = false;
                      directionRight = false;
                    }else{
                      directionRight = true;
                      console.log("stejne y")
                      tempDegres = 180; //same Y
                    }

                    if (isDefined(this.blocksF[x][enumCor.Y+1]) && isDefined(this.blocksF[x][enumCor.X])){ //&& this.blocksF{ //does block continue up
                      console.log("shape goes sudenly up");
                      tempDegres = 270;
                      directionUp = true;
                       // to store upper block not old one
                    
                    }
                    if(isDefined(this.blocksF[x][enumCor.Y-1]) && isDefined(this.blocksF[x][enumCor.X])){ //&& this.blocksF ){//does block continue down
                      console.log("shape goes sudenly down");
                      if (directionUp){// if there is eather way up and donw if yes remember croosing
                        console.log("krizovatka pitoma na: " + x)
                        crosingS.push([x]);
                     
                      }else{
                        console.log("tvar a pak cesta dolu")
                        directionDown = true;
                        tempDegres = 180;
                        
                      }
                   }
         
                }
                console.log("aktualni prubeh: " + x);
                prevusCorX = this.blocksF[x][enumCor.X];
                prevusCorY = this.blocksF[x][enumCor.Y]; 
                console.log(this.degresFormat)
                if (tempDegres != 0){
                  console.log("push tempDegress:" + tempDegres)
                  this.degresFormat.push(tempDegres) 

                }
                
              }         
                
              
              
                console.log("X=" +"[" + this.blocksF[x][0]+ "]"  + "Y=" + y + "[" + this.blocksF[x][1] + "]");
            } 
          }
          isDefined = (variable) =>{
            return !( variable === undefined);
          }


         
          this.addBlock = ( my_table) =>{
            this._getBlocksFromTable(my_table); //get x y coordinates of each block
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
        
        // this._getBlockfValues(this.blocksF);
  }
  




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






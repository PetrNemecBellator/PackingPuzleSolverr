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
  this.tilesMap= [[]];
    
    
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
  this._conversionToTrueFalseTable = (my_table) => {
    //get min max vlaues of x y to minimaze table    
    let minX, maxX, minY, maxY;
    minX = this.blocksF[0][0];
    maxX = this.blocksF[0][0];
    minY = this.blocksF[0][1];
    maxY = this.blocksF[0][1];
    for (let i =1 ; i< this.blocksF.length ; i++){
       if (this.blocksF[i][0] < minX ) {
         minX = this.blocksF[i][0];
         continue;
       }
       if (this.blocksF[i][0]> maxX){
         maxX = this.blocksF[i][0];
         continue;
       }
       if(this.blocksF[i][1]< minY){
         minY = this.blocksF[i][1];
         continue;
       }
       if (this.blocksF[i][1] > maxY){
         maxY = this.blocksF[i][1];
         continue;
       }
       
    }

    maxX -= minX;
    maxY -= minY;
    maxX++;
    minY++;
    testOUtput("maxX " + maxX);
    testOUtput("maxY"+maxY);
    
   var i = 0;
    for(let x = 0 ; x < maxX ; x++){
      for(let y = 0; y< maxY ; y++ ){
        
        
         testOutput(maxX + " " + maxY    + " x= " + x+ " y= " + y) ;/*
          if ( typeof this.blocksF[y][x] == undefined){
            this.tilesMap[y][x] == "false";
          }else{
            this.tilesMap[y][x] == "true";
          } 
                       */
       
      }
    }
    testOutput("vypis pole true false")
    this._getBlockfValues(this.tilesMap);
  }
  this.addBlock = ( my_table) =>{
    this._getBlocksFromTable(my_table); //get x y coordinates of each block
    this._conversionToTrueFalseTable(my_table);
    this._getBlockfValues(this.blocksF);
      
        //addrealBlock();
    }

   

    this._getBlockfValues = (array) =>{
      let rowL = array.length;
      
      for (let row = 0 ; row < rowL ; row++){
        
          testOutput("<li>block<b>[X]</b>= "+ array[row][0] +" <b> [Y]: </b>"+ array[row][1]) + "</li>";  
          
        
        
      }
      testOutput("<br>")
      return;
    }

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





};
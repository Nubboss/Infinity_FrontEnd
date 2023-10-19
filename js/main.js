

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext("2d");

    const buttonsFigure = document.getElementsByClassName("navigation-button");
    const selectElement = document.getElementById("color-select");
    const UndoButton = document.getElementById('undoButton');
    const RedoButton = document.getElementById('redoButton');
    const clearButton = document.getElementById('clear');
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;

    let currentFigure = "square";
    let color = "black";


    const history = [];
    let currentIndex = 0;
  

    
    for (let i = 0; i < buttonsFigure.length; i++) {
        buttonsFigure[i].addEventListener("click", () => {
          currentFigure = buttonsFigure[i].getAttribute("data-shape");
          for (let j = 0; j < buttonsFigure.length; j++) {
            buttonsFigure[j].style.backgroundColor = "#9499ef";
          }
          buttonsFigure[i].style.backgroundColor = 'red';
          console.log(currentFigure)
        });
      }

    UndoButton.addEventListener('click', undo);
    RedoButton.addEventListener('click', redo);
    clearButton.addEventListener('click', clear);


    window.addEventListener("DOMContentLoaded",()=>{
      saveCanvasState();
    })

    canvas.addEventListener('click' , (e)=>{
      const canvasRect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - canvasRect.left; //расстояние относитеьно окна браузера и сдвига canvas
      const mouseY = e.clientY - canvasRect.top;
      const width = 100;
      const height = 100;
      const radius = 50;
      switch (currentFigure) {
        case 'square':
          drawSquare(mouseX,mouseY,width);
          saveCanvasState();

          break;
        case 'circle':
          drawCircle(mouseX,mouseY,radius);
          saveCanvasState();

          break;
        case 'hexagon':
          drawHexagon(mouseX,mouseY,width);
          saveCanvasState();

          break;
        case 'oval':
          drawOval(mouseX,mouseY,radius);
          saveCanvasState();

          break;
        case 'parallelogram':
          drawParallelogram(mouseX,mouseY,width,height);
          saveCanvasState();

          break;
        case 'rectangle':
          drawRectangle(mouseX,mouseY,width,height);
          saveCanvasState();

          break;
        case 'rhombus':
          drawRhombus(mouseX,mouseY,width,height);
          saveCanvasState();

          break;
        case 'trapezoid':
          drawTrapezoid(mouseX,mouseY,width,height);
          saveCanvasState();

          break;
        case 'triangle':
          drawTriangle(mouseX,mouseY,width,height);
          saveCanvasState();

          break;
        default:
          console.log('Неизвестная фигура');
    }
        }
      )
    selectElement.addEventListener('click',()=>{

      if(color!=selectElement.value){
        color = selectElement.value;
        console.log(color);
      }
      
      
    })


    
    function saveCanvasState() {
      const canvasState = canvas.toDataURL();
      history.push(canvasState);
      currentIndex++;
    }
    
    function redrawCanvas(state) {
      const img = new Image();
      img.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      }
      img.src = state;
    }
    
    function undo() {
      if (currentIndex > 0) {
        currentIndex--;
      }
        redrawCanvas(history[currentIndex]);

    

    }
    
    function redo() {
      if (currentIndex < history.length) {
        currentIndex++;
       
      }
      redrawCanvas(history[currentIndex]);
    }
    
    function clear(){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      saveCanvasState();
    }
    function drawSquare(mouseX,mouseY, width) {
      //Рисование квадрата
      ctx.strokeStyle = color;

      ctx.beginPath();
      mouseX = mouseX-width/2; //опять ж поиск середины 
      mouseY = mouseY-width/2

      ctx.strokeRect(mouseX, mouseY, width, width);
    }
    function drawCircle(mouseX,mouseY , radius) {
      //Рисование круга 
      ctx.strokeStyle = color;

      ctx.beginPath();
      ctx.arc(mouseX,mouseY, radius, 0, 2 * Math.PI);
      ctx.stroke();
    }
    
    function drawHexagon(mouseX,mouseY , lineLength) {
      //Рисование шестиугольника
      ctx.strokeStyle = color;

      lineLength = lineLength/2;  //сторона в 2 раза меньше  
      ctx.beginPath();
      ctx.moveTo(mouseX + lineLength * Math.cos(0), mouseY + lineLength * Math.sin(0));
    
      for (let i = 1; i <= 6; i++) {
        ctx.lineTo(mouseX + lineLength * Math.cos(i * 2 * Math.PI / 6),
        mouseY + lineLength * Math.sin(i * 2 * Math.PI / 6));
      }
    
      ctx.closePath();
      ctx.stroke();
    }
    
    function drawOval(mouseX,mouseY , radius) {
      // Рисование овала
      ctx.strokeStyle = color;

      ctx.beginPath();
      ctx.ellipse(mouseX, mouseY, radius, 75, Math.PI , 0, 2 * Math.PI);
      ctx.closePath();
      ctx.stroke();
    }
    
    function drawParallelogram(mouseX,mouseY,width , height) {
      // Рисование параллелограмма
      ctx.strokeStyle = color;

      mouseX = mouseX - (width / 8)
      mouseY =  mouseY - (height / 2)

      ctx.beginPath();
      ctx.moveTo(mouseX, mouseY);
      ctx.lineTo(mouseX + width, mouseY);
      ctx.lineTo(mouseX + width - height, mouseY + height);
      ctx.lineTo(mouseX - height, mouseY + height);
      ctx.closePath();
      ctx.stroke();
    }
    
    function drawRectangle(mouseX,mouseY , width , height) {
      ctx.strokeStyle = color;

      mouseX = mouseX -width/2; // поиск середины 
      mouseY = mouseY-height/4;
      ctx.beginPath();
      ctx.strokeRect(mouseX, mouseY, width, height/2);
    }
    
    function drawRhombus(mouseX,mouseY, width , height) {
      ctx.strokeStyle = color;

      mouseX = mouseX - width/2; // поиск середины 
      mouseY = mouseY - height/2;
    
      // Рисование ромба
      ctx.beginPath();
      ctx.moveTo(mouseX, mouseY + height/2);
      ctx.lineTo(mouseX + width/2, mouseY);
      ctx.lineTo(mouseX + width, mouseY + height/2);
      ctx.lineTo(mouseX + width/2, mouseY + height);
      ctx.closePath();
      ctx.stroke();
    }
    
    function drawTrapezoid(mouseX,mouseY,width , height) {
      // Рисование трапеции
      ctx.strokeStyle = color;

      mouseX = mouseX - width/4; // поиск середины 
      mouseY = mouseY - height/2;
      ctx.beginPath();
      ctx.moveTo(mouseX,mouseY);
      ctx.lineTo(mouseX + width/2, mouseY);
      ctx.lineTo(mouseX + width, mouseY+height);
      ctx.lineTo(mouseX -width+width/2, mouseY+height);
      ctx.lineTo(mouseX , mouseY);
      ctx.closePath();
      ctx.stroke();
    }
    
    function drawTriangle(mouseX,mouseY,width , height) {
      // Рисование треугольника
      ctx.strokeStyle = color;

      mouseY = mouseY-height/2 // поиск середины 
      ctx.beginPath(); 
      ctx.moveTo(mouseX, mouseY);
      ctx.lineTo(mouseX + width/2, mouseY + height);
      ctx.lineTo(mouseX - width/2, mouseY + height);
      ctx.closePath();
      ctx.stroke();
    }

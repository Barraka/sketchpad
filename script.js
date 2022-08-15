
let reset=document.querySelector('#reset');
let grid=document.querySelector('#gridplacement');
let show=document.createElement('div');
show.id='show';
document.body.appendChild(show);
show=document.querySelector('#show');
let random=document.querySelector("#random");
let single=document.querySelector("#single");
let picker=document.querySelector("#picker");
let checkgrid=document.querySelector("#checkgrid");
let gridclass=document.querySelectorAll(".grid");
let mouseStatus=0;
let paintMode=1;
let currentTarget;
let slider=document.querySelector("#range");
let returnvalue=document.querySelector("#returnvalue");
let lightentool=document.querySelector("#lightentool");
let darkentool=document.querySelector("#darkentool");
let brushtool=document.querySelector("#brushtool");

reset.addEventListener('click',gridreset);
random.addEventListener('change',toggleColorPicker);
single.addEventListener('change',toggleColorPicker);
checkgrid.addEventListener('change',togglegrid);
slider.addEventListener('input',slidervalue);
lightentool.addEventListener('click',selectMode);
darkentool.addEventListener('click',selectMode);
brushtool.addEventListener('click',selectMode);

function selectMode(e) {
    e.currentTarget.style.border="1px solid cyan";
    switch(e.currentTarget.id) {
        case 'brushtool':
            lightentool.style.border="1px solid transparent";
            darkentool.style.border="1px solid transparent";
            paintMode=1;
            break;
        case 'lightentool':
            brushtool.style.border="1px solid transparent";
            darkentool.style.border="1px solid transparent";
            paintMode=2;
            break;
        default:
            brushtool.style.border="1px solid transparent";
            lightentool.style.border="1px solid transparent";
            paintMode=3;
    }
}   
function toggleColorPicker() {
    if(window.getComputedStyle(picker).visibility==="hidden")picker.style.visibility="visible";
    else picker.style.visibility="hidden";
}
function togglegrid() {
    if(checkgrid.checked===false) {
        gridclass=document.querySelectorAll(".grid");
        gridclass.forEach(x=>x.style.border="1px solid transparent");
    }
    else {
        gridclass=document.querySelectorAll(".grid");
        gridclass.forEach(x=>x.style.border="1px dotted cyan");
    }
}
function slidervalue() {returnvalue.textContent=slider.value+"x"+slider.value;}

function gridreset() {
    let currentvalue=slider.value;
    makegrid(currentvalue);
}

function colorgrid(e) {
    
    if(paintMode===2)grid.style.cursor=`url("White.png"), auto`;
    else if(paintMode===3)grid.style.cursor=`url("Black.png"), auto`;
    else grid.style.cursor=`url("Brush.png"), auto`;
    if(mouseStatus===0)return;
    if(currentTarget===e.target)return;
    currentTarget=e.target;

    if(random.checked===true && paintMode===1){
        let r=Math.floor(Math.random()*255);
        let g=Math.floor(Math.random()*255);
        let b=Math.floor(Math.random()*255);
        e.target.style.backgroundColor=`rgb(${r},${g},${b})`;
    }
    if(random.checked===false && paintMode===1){
        let mycolor=picker.value;
        e.target.style.backgroundColor=mycolor;
    }
    else if(paintMode===2) {
        let curstyle=e.target.style.backgroundColor;
         let rep=curstyle.replace(/[^\d,]/g, '').split(',');
         let rep2=curstyle.match(/\d+/g);
         let red=Number(rep[0]);
         let green=Number(rep[1]);
         let blue=Number(rep[2]);
         red=Math.floor(red*1.2);
         green=Math.floor(green*1.2);
         blue=Math.floor(blue*1.2);
         e.target.style.backgroundColor=`rgb(${red},${green},${blue})`;
    }
    else if(paintMode===3) {
        let curstyle=e.target.style.backgroundColor;
         let rep=curstyle.replace(/[^\d,]/g, '').split(',');
         let rep2=curstyle.match(/\d+/g);
         let red=Number(rep[0]);
         let green=Number(rep[1]);
         let blue=Number(rep[2]);
         red=Math.floor(red*0.8);
         green=Math.floor(green*0.8);
         blue=Math.floor(blue*0.8);
         e.target.style.backgroundColor=`rgb(${red},${green},${blue})`;
    }
    
}

function makegrid(units) {;
    grid.innerHTML="";
    //Check for dimensions
    let vheight=screen.availHeight-300;
    let unit=vheight/units;
    for(let i=1;i<=units;i++) {
        let string='';
        let row=document.createElement('div');
        row.className='row';
        for(let  j=1;j<=units;j++) {
            let addme=document.createElement('div');
            addme.id="mydiv"+i+"-"+j;
            addme.classList.add('grid');
            if(checkgrid.checked===false)addme.style.border="1px solid transparent";
            addme.style.setProperty('width',10+'px'); //unit
            addme.style.setProperty('height',10+'px'); //unit
            row.appendChild(addme);
        }
        grid.appendChild(row);
        
    }
    grid.addEventListener('mousedown',e=>mouseStatus=1);
    grid.addEventListener('mouseup',e=>mouseStatus=0);
    grid.addEventListener('mousemove',colorgrid);
    grid.addEventListener('mousedown',colorgrid);
}

makegrid(20);
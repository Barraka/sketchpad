
let btn=document.createElement('button');
let reset=document.querySelector('#reset');
btn.id='btn';
btn.textContent="New Grid";
btn.addEventListener('click',newgrid);
document.body.appendChild(btn);
let grid=document.querySelector('#grid');
let show=document.createElement('div');
show.id='show';
document.body.appendChild(show);
show=document.querySelector('#show');

reset.addEventListener('click',gridreset);

// let slider=document.querySelector("#slider");
// let sliderelem=document.createElement('input');
// slider.appendChild(sliderelem);
let slider=document.querySelector("#range");
let returnvalue=document.querySelector("#returnvalue");
slider.addEventListener('input',slidervalue);
slider.addEventListener('change',changegrid);
function slidervalue() {returnvalue.textContent=slider.value+"x"+slider.value;}
function changegrid() {makegrid(slider.value);}

function gridreset() {
    let currentvalue=slider.value;
    makegrid(currentvalue);
}


function changebg(e) {
    let curstyle=e.target.style.backgroundColor;
    if(!curstyle){
        let r=Math.floor(Math.random()*255);
        let g=Math.floor(Math.random()*255);
        let b=Math.floor(Math.random()*255);
        e.target.style.backgroundColor=`rgb(${r},${g},${b})`;
    }
    else {
        let r=curstyle;
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
    
    show.textContent=window.getComputedStyle(e.target).width+ "  -  "+window.getComputedStyle(e.target).height;
}
function newgrid(){
    let newrow=Number(prompt('How many squares per row?'));
    if(newrow>100) {
        alert("Max number per row is 100!");
        return;
    }
    makegrid(newrow);
}

function makegrid(units) {
    // let find=document.querySelector('#container');
    // if(find)document.body.removeChild(find);
    // let container=document.createElement('div');
    // container.id='container';
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
            addme.style.setProperty('width',unit+'px');
            addme.style.setProperty('height',unit+'px');
            addme.addEventListener('mouseover',changebg);
            row.appendChild(addme);
        }
        grid.appendChild(row);
        
    }
    // document.body.appendChild(grid);
}

makegrid(20);
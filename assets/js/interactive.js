/*
Important Variables
*/
var graphDrawn = false;
var descShown = false;
var uiDrawn = false;
var homeDrawn = false;
/*
Helper Functions
*/
function isInViewport(element){
  const rect = element.getBoundingClientRect();
  return (
      (rect.top >= 0 && rect.left >= 0) &&
      rect.bottom <= ((window.innerHeight + 180) || (document.documentElement.clientHeight + 180)) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
/*
D3 bar graph on about page
*/

function animateUI(){
  uiDrawn = true;
  let menu = document.getElementsByClassName("menu")[0];
  let left = document.getElementById("left");
  menu.classList.add("slide");
  left.classList.add("fade");
}
function animateExperience(){

}
function animateRadio(){

}
function animateContact(){

}
function showDesc(){
  descShown = true;
  let description = document.getElementById("description");
  description.classList.add("fade");

}
function drawGraph(){
  let skills = ["HTML", "CSS", "Python", "Java", "C++", "C", "Javascript", "JQuery", "D3", "Django"];
  let data = [95,95,90,90,80,80,95,95,80,70];
  let barHeight = 30;
  graphDrawn = true;

  let graph = d3.select("#skills")
                .append("svg")
                .attr("width", "100%")
                .attr("height", "100%");

  let bar = graph.selectAll("g")
                 .data(skills)
                 .enter()
                 .append("g")
                 .attr("transform", function(d,i){
                   return "translate(0,"+(i*1.5*barHeight) + ")";
                 });

  let background = bar.append("rect")
                      .attr("width", "100%")
                      .attr("height", barHeight-1)
                      .style("fill", "#140918");

  let main_bars = bar.append("rect")
                     .attr("width", 0)
                     .attr("height", barHeight-1);


  let labels = bar.append("rect")
                  .attr("id", "label")
                  .attr("width", function(d,i){
                    return "85px";
                  })
                  .attr("height", barHeight-1)
                  .style("opacity", "0");

  let text = bar.append("text")
                .attr("x", "10px")
                .attr("y", barHeight/2)
                .attr("dy", ".35em")
                .text(function(d,i) { return skills[i]; })
                .style("opacity", "0");

  main_bars.transition()
           .ease(d3.easeLinear)
           .delay(1000)
           .duration(2000)
           .style("fill", "#FF7D61")
           .attr("width",function(d,i){
             return data[i].toString()+"%";
           });

  labels.transition()
        .ease(d3.easeLinear)
        .delay(2500)
        .duration(1500)
        .style("opacity", "1");

  text.transition()
      .ease(d3.easeLinear)
      .delay(3000)
      .duration(1000)
      .style("opacity", "1");


}
/*
Tab changing in experience page
 */
function displayexp(e){
  let target, tabcontents, tabs;
  let slider = document.getElementsByClassName("slider")[0];
  target = e.target;
  if (target.tagName == "LI"){
    tabcontents = document.getElementsByClassName("tabcontent");
    tabs = document.getElementsByClassName("tablinks");
    for (var i=0; i<tabcontents.length; i++){
      if(tabcontents[i].id == target.textContent){
        tabcontents[i].style.display = "block";
      } else {
      tabcontents[i].style.display = "none";
      }
      if(tabs[i] != target){
        tabs[i].classList.remove("active");
      }
    }
    target.className += " active";
  }
  let width = target.clientWidth;
  console.log(width);
  slider.style.width = "" + width + "px";
  slider.style.left = "" + target.offsetLeft + "px";
}
/*
Starry Night
*/
function drawSky(){
  let mySVG =  document.getElementById("sky");
  let skyContainer =  document.getElementById("sky-container");
  let skyWidth = skyContainer.clientWidth;
  let skyHeight = skyContainer.clientHeight;
  let viewValues = "-" + skyWidth/2 + " " + "-" + skyHeight/2 + " " + skyWidth + " " + skyHeight + "";
  mySVG.setAttribute("viewBox", viewValues);

  createSky(500, 100);

  function createSVGElement(element){
    return document.createElementNS("http://www.w3.org/2000/svg", element);
  }

  function createStar({size, color, x, y}){
    const starShape = createSVGElement("circle");
    const star =  createSVGElement("g");
    const delay = Math.round(-1*Math.random()*4000);

    star.appendChild(starShape);

    starShape.setAttribute('r', size + '');
    starShape.setAttribute('fill', color);

    starShape.classList.add("twinkle-little-star");
    starShape.style.setProperty('--animation-twinkle-delay', delay + 'ms');
    star.setAttribute('transform', 'translate(' + x + ',' + y + ')');

    return star;
  }

  function createShootingStar({x,y,radius,angle, angleStart, size}){
    const shootingStarShape = createSVGElement('circle');
    const shootingStar = createSVGElement('g');
    shootingStar.appendChild(shootingStarShape);

    shootingStarShape.classList.add('shooting-star');
    shootingStarShape.setAttribute('transform', 'translate(' + x + ',' + y + ')');

    shootingStarShape.style.setProperty('--shooting-orbit-radius', radius + 'px');
    shootingStarShape.style.setProperty('--shooting-orbit-angle', angle + 'deg');
    shootingStarShape.style.setProperty('--shooting-orbit-angle-start', angleStart + 'deg');
    shootingStarShape.setAttribute('r', size);
    shootingStarShape.setAttribute('fill', 'white');

    return shootingStar;
  }

  function getRandomCoordinate(svgElement){
    let r1 = (Math.random()*2)-1;
    let r2 = (Math.random()*2)-1;
    let {width, height} = mySVG.viewBox.baseVal;
    let x1 = Math.floor(r1*Math.floor(width/2));
    let y1 = Math.floor(r2*Math.floor(height/2));
    return {x:x1, y:y1};
  }

  function getRandomColor(){
    let blue = [97,228,256];
    let orange = [256,125,97];
    let r = Math.floor(Math.random()*(orange[0]-blue[0])+blue[0]);
    let g = Math.floor(Math.random()*(blue[1]-orange[1])+orange[1]);
    let b = Math.floor(Math.random()*(blue[2]-orange[2])+orange[2]);
    let rgb = "rgb(" + r + "," + g + "," + b + ")";
    return {color:rgb};
  }

  function getRandomRadius(){
    let r = Math.floor(Math.random()*600);
    return {radius: r};
  }

  function getRandomAngle(){
    let rand = (Math.random()*2)-1;
    let angle = Math.floor(rand*360);
    return angle;
  }

  function generateShootingStar(){
    const {x,y} = getRandomCoordinate(mySVG);
    const {radius} = getRandomRadius();
    const {angleStart} = {angleStart: getRandomAngle()};
    const {angle} = {angle: getRandomAngle()};
    const shootingStar = createShootingStar({x,y,radius,angleStart,angle, size:2});
    return shootingStar;
  }

  function createSky(count){
    for(let i=0; i<count; i++){
      const {x,y} = getRandomCoordinate(mySVG);
      const {color} = getRandomColor();
      const star = createStar({color, size: 1, x, y });
      mySVG.appendChild(star);
    }
    setInterval(shootStar, 7000);
    function shootStar(){
      let shootingStar = generateShootingStar();
      mySVG.appendChild(shootingStar);
      setTimeout(function(){
        mySVG.removeChild(mySVG.lastChild)
      }, 2000);
    }
  }
}
/*
Hamburger navigation
*/
function toggleMenu(e){
  console.log("yes");
  if (window.innerWidth < 990){
    if (menu.classList.contains("show")){
      menu.classList.remove("show");
      e.stopPropagation();
      document.body.style.overflow = "auto";
    } else {
      menu.classList.add("show");
      document.body.style.overflow = "hidden";
    }
  }
}
/* Remove Class from list of elements */
function removeClass(list, my_class){
  for (let i = 0; i<list.length; i++){
    list[i].classList.remove(my_class);
  }
}
/* Event listeners*/
var nav_bar = document.getElementById("exp_tab");
nav_bar.addEventListener('click', displayexp, false);

var hamburger = document.querySelector("#hamburger");
hamburger.addEventListener("click", toggleMenu, false);

var menu = document.querySelector(".menu");
menu.addEventListener("click", toggleMenu, false);

var bargraph = document.getElementById("skills");
var description = document.getElementById("description");
window.addEventListener("load",
      function () {
        drawSky();
        animateUI();
        if (isInViewport(bargraph) && !graphDrawn){
          drawGraph();
        }
        if (isInViewport(description) && !descShown){
          console.log("desc");
          showDesc();
        }
        let slider = document.getElementsByClassName("slider")[0];
        let tablink = document.getElementsByClassName("tablinks")[0];
        slider.style.left = "" + tablink.offsetLeft + "px";
        slider.style.width = "" + tablink.clientWidth + "px";
      }, false);
window.addEventListener("resize",
      function () {
        location.reload();
      }, false);

window.addEventListener("scroll",
      function (){
        if (isInViewport(bargraph) && !graphDrawn){
          drawGraph();
        }
        if (isInViewport(description) && !descShown){
          showDesc();
        }
      let links = document.getElementsByClassName("main_link");
      if(isInViewport(document.getElementById("about")) ||
         isInViewport(document.getElementById("description")) ||
         isInViewport(document.getElementById("skills"))){
        removeClass(links, "active");
        links[0].classList.add("active");
      } else if(isInViewport(document.getElementById("experience"))){
        removeClass(links, "active");
        links[1].classList.add("active");
      } else if(isInViewport(document.getElementById("radio"))){
        removeClass(links, "active");
        links[2].classList.add("active");
      } else if(isInViewport(document.getElementById("contact"))){
        removeClass(links, "active");
        links[3].classList.add("active");
      } else {
        removeClass(links, "active");
      }
      },false);

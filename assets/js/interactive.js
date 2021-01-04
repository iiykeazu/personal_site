/*
Important Variables
*/
var windowWidth = window.innerWidth;

/*
D3 bar graph on about page
*/
var skills = ["HTML", "CSS", "Python", "Java", "C++", "C", "Javascript", "JQuery", "D3", "Django"];
var data = [95,95,90,90,80,80,95,95,80,70];
var barHeight = 30;

var graph = d3.select("#skills")
            .append("svg")
            .attr("width", "100%")
            .attr("height", "100%");

var bar = graph.selectAll("g")
               .data(skills)
               .enter()
               .append("g")
               .attr("transform", function(d,i){
                 return "translate(0,"+(i*1.5*barHeight) + ")";
               });

bar.append("rect")
   .attr("width", function(d,i){
        return data[i].toString()+"%";
   })
   .attr("height", barHeight-1);


bar.append("rect")
   .attr("id", "label")
   .attr("width", "20%")
   .attr("height", barHeight-1);

bar.append("text")
   .attr("x", "5%")
   .attr("y", barHeight/2)
   .attr("dy", ".35em")
   .text(function(d,i) { return skills[i]; });


/*
Tab changing in experience page
 */
function displayexp(e){
  var target, tabcontents, tabs;
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
}

/*
Hamburger navigation
*/
function toggleMenu(e){
  console.log("yes");
  if (window.innerWidth <= 1099){
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

/* Event listeners*/
var nav_bar = document.getElementById("exp_tab");
nav_bar.addEventListener('click', displayexp, false);

var hamburger = document.querySelector("#hamburger");
hamburger.addEventListener("click", toggleMenu, false);

var menu = document.querySelector(".menu");
menu.addEventListener("click", toggleMenu, false);

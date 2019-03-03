function showDetails() {
  var elem = document.getElementById("details");
  var less = document.getElementById("less-details");
  var more = document.getElementById("more-details");
  var displayType = window.getComputedStyle(elem, null).getPropertyValue("display");
  console.log(displayType);
  if (displayType === "none") {
    elem.style.display = "block";
    more.style.display = "none";
    less.style.display = "inline"
  } else {
    elem.style.display = "none";
    more.style.display = "inline";
    less.style.display = "none"
  }
}

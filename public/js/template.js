var button = document.getElementById("printBtn");
var makepdf = document.querySelector("html");
button.addEventListener("click", function () {
  var mywindow = window.open("", "PRINT", width="600px", height="600px");
  mywindow.document.write(makepdf.innerHTML);
  mywindow.document.close();
  mywindow.focus();
  mywindow.print();
  return true;
});
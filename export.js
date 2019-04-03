function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text.replace(/\n/gmi, '\r\n')));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function exportTxt() {
  download(document.getElementById("titel").value + ".txt", document.getElementById("text").value.replace(/\n/gmi, '\r\n'));
}

function exportHtml() {
  var source = tagsToElements(document.getElementById("text").value.replace(/\n/gmi, '<br>'));
  download(document.getElementById("titel").value + ".html", source);
}

function exportPdf() {
  var doc = new jsPDF();

  var elementHandler = {
    '#ignorePDF': function(element, renderer) {
      return true;
    }
  };

  var source = getSource();
  alert(source);
  doc.fromHTML(
    source,
    15,
    15, {
      'width': 180,
      'elementHandlers': elementHandler
    });

  doc.setFont("arial");

  doc.save(document.getElementById("titel").value);
}

function getSource() {
  var source = document.getElementById("text").value;
  source = tagsToElements(source);
  source = source.replace(/\n/gmi, '<br> ');
  return source;
}

function tagsToElements(a) {
  var output = a;
  output = htmlprestyle + output;
  output = output.replace("((", "<strong>");
  output = output.replace("))", "</strong>");
  output = output.replace("(~", "<i>");
  output = output.replace("~)", "</i>");
  output = output.replace("--->", "<h3>");
  output = output.replace("<---", "</h3>");
  output = output.replace("-->", "<h2>");
  output = output.replace("<--", "</h3>");
  output = output.replace("->", "<h1>");
  output = output.replace("<-", "</h1>");



  return output;
}

function newFile() {
  localStorage.clear();
  location.reload();
}

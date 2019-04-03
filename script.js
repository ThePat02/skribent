function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text.replace(/\n/gmi, '\r\n')));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function exportTxt()
{
  download(document.getElementById("titel").value + ".txt", document.getElementById("text").value.replace(/\n/gmi, '\r\n'));
}

function exportHtml()
{
  var source = tagsToElements(document.getElementById("text").value.replace(/\n/gmi, '<br>'));
  download(document.getElementById("titel").value + ".html", source);
}

function exportPdf()
{
  var doc = new jsPDF();
  
  var elementHandler = {
  '#ignorePDF': function (element, renderer) {
    return true;
    }
    };

     var source = document.getElementById("text").value;
  source = tagsToElements(source);
  source = source.replace(/\n/gmi, "" + '<br>');
  doc.fromHTML(
    source,
    15,
    15,
    {
      'width': 180,'elementHandlers': elementHandler
    });
  
  doc.setFont("arial");
  
  doc.save(document.getElementById("titel").value);
}

function saving()
{
  localStorage.setItem("titel", document.getElementById("titel").value);
  localStorage.setItem("body", document.getElementById("text").value );
  console.log("Saved");
  
    $("#text").on('keyup', function() {
    var words = this.value.match(/\S+/g).length;
;
    
      $('#display_count').text(words);
    }
  );
}

function tagsToElements(a)
{
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

function newFile()
{
 localStorage.clear();
  location.reload();
}


$(document).ready(function() {
  $("#text").on('keyup', function() {
    var words = this.value.match(/\S+/g).length;
;
    
      $('#display_count').text(words);
    saving();
    }
  );
});


var htmlprestyle = "<style>html{font-family:Arial}</style>";

function insertHtmlAtSelectionEnd(html, isBefore) {
    var sel, range, node;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = window.getSelection().getRangeAt(0);
            range.collapse(isBefore);

            // Range.createContextualFragment() would be useful here but was
            // until recently non-standard and not supported in all browsers
            // (IE9, for one)
            var el = document.createElement("div");
            el.innerHTML = html;
            var frag = document.createDocumentFragment(), node, lastNode;
            while ( (node = el.firstChild) ) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.collapse(isBefore);
        range.pasteHTML(html);
    }
}
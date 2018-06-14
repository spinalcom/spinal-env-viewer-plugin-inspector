var myObj = {};

myObj.create_group_Rapport = function (detail, alert, name) {
  let is_ref = false;
  if (!name) {
    name = alert.name;
  } else
    is_ref = true;
  var div = document.createElement("div");
  div.className = alert.id;

  var title = document.createElement("h4");
  title.className = "pdfTitle";
  title.innerText = "  " + name;

  var span = document.createElement('div');
  span.className = "color_span"
  span.style.background = alert.color;

  var titleDiv = document.createElement('div');
  titleDiv.className = "titleDiv"
  titleDiv.appendChild(span);
  titleDiv.appendChild(title);
  // titleDiv.appendChild(document.createElement("hr"));
  title.className = "__title"

  div.appendChild(titleDiv);
  var ol = document.createElement("ul");
  var li;
  let empty = true;
  if (alert.BIMObjects.length > 0) {
    for (var j = 0; j < alert.BIMObjects.length; j++) {
      var item = alert.BIMObjects[j]
      empty = false;
      li = document.createElement('li');
      li.innerText = item.dbId + " - " + item.name;
      ol.appendChild(li);
    }
  }
  if (empty) {
    li = document.createElement('li');
    li.innerText = "Groupe Vide.";
    ol.appendChild(li);

  }
  div.appendChild(ol);
  detail.appendChild(div);
}


myObj.createRapport = function (theme) {

  /*-------------------------------------------A Modifier ------------------------------------------------*/
  var data = {
    datasets: [{
      data: [],
      backgroundColor: [],
      borderWidth: 0,
    }],
    labels: [],
  }

  // let percent;
  for (let i = 0; i < theme.group.length; i++) {
    data.datasets[0].data.push(theme.group[i].BIMObjects.length);
    data.labels.push(theme.group[i].name.get());
    data.datasets[0].backgroundColor.push(theme.group[i].color.get());
  }


  /*-------------------------------------------Fin A Modifier ------------------------------------------------*/


  var printWindow = window.open('', '', 'height=400,width=900');
  printWindow.document.write('<html style="height:100%;overflow: auto"><head><title>Rapport SpinalBIM - ' + theme.name + '</title>');
  printWindow.document.write('</head><body style="height:100%; overflow: auto">');
  // printWindow.document.write(divContents);
  printWindow.document.write($templateCache.get('pdfTemplate.html'));
  printWindow.document.write('</body></html>');


  // var body = document.getElementsByTagName("body")[0];
  // body.innerHTML += ($templateCache.get('pdfTemplate.html'));


  var graph = printWindow.document.getElementById("pdfGraph").getContext('2d');

  var myChart = new Chart(graph, {
    type: "doughnut",
    data: data,
    options: {
      legend: {
        position: "top",
        labels: {
          fontColor: "#000000" //"#F8F8F8"
        }
      },
      responsive: true,
      animation: {
        duration: 0
      }
    }
  })

  var detail = printWindow.document.getElementById("pdfGraphDetail");
  console.log(detail)

  for (var i = 0; i < theme.group.length; i++) {
    var alert = theme.group[i]
    create_group_Rapport(detail, alert);
  }

  let _title = printWindow.document.querySelector(".title > ._answer");
  _title.innerHTML = theme.name.get();

  let date_now = new Date();
  let _date = printWindow.document.querySelector(".date > ._answer");
  _date.innerHTML = date_now.toLocaleDateString("en-GB");

  let _username = printWindow.document.querySelector(".username > ._answer");
  _username.innerHTML = $scope.user.username;


  // html2canvas(document.getElementById("myPdfTemplate"), {
  //   // width: 730, 
  //   // height: 1050,
  //   onrendered: function (canvas) {
  //     var imgData = canvas.toDataURL('image/jpeg');
  //     var doc = new jsPDF({
  //       unit: "px",
  //       format: "a4"
  //     });
  //     doc.addImage(imgData, 'jpeg', 0, 10);
  //     doc.save('test.pdf');
  //     // doc.output("dataurlnewwindow");
  //   }
  // })
  setTimeout(() => {
    let quotes = printWindow.document.getElementById("myPdfTemplate")
    html2canvas(quotes).then(function (canvas) {
      // la taille du container n'est pas la taille total ainsi il faut récuperer la bonne taille pour pouvoir faire le parsing du pdf
      // printWindow.document.appendChild(canvas);
      var contentWidth = canvas.width;
      var contentHeight = canvas.height;
      console.log(contentWidth);
      console.log(contentHeight);
      var pageHeight = contentWidth / 592.28 * 841.89;

      var tailleTotal = contentHeight;
      console.log(pageHeight);
      var position = 0;

      var imgWidth = 595.28;
      var imgHeight = 592.28 / contentWidth * contentHeight;

      var imgData = canvas.toDataURL('image/jpeg', 1.0);

      var doc = new jspdf.default("p", "pt", "a4");

      // if (tailleTotal < pageHeight) {
      //   console.log("FAIL : une page");
      //   doc.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
      // } else {
      //   console.log("MULTI PAGE");
      //   let i = 0;
      //   while (tailleTotal > 0) {
      //     console.log(i);
      //     i++;
      //     doc.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      //     tailleTotal -= pageHeight;
      //     position -= 841.89;
      //     if (tailleTotal > 0) {
      //       doc.addPage();
      //     }
      //   }
      // }


      // var doc = new jspdf.default("p", "mm", "a4");

      doc.save('Rapport SpinalBIM -' + theme.name.get() + ' - ' + date_now.toLocaleDateString("en-GB") + '.pdf');
      // // console.log(jsPDF);
      // var imgData = canvas.toDataURL('image/jpeg');

      // var doc = new jspdf.default("p", "mm", "a4");
      // // var doc = new jspdf.default({
      // //   unit: "px",
      // //   format: "a4"
      // // });
      // let canvasList = [];
      // // console.log(quotes.clientHeight);

      // // doc.addImage(imgData, 'jpeg', 0, 10);
      // doc.save('Rapport SpinalBIM - ' + theme.name.get() + ' - ' +
      //   date_now.toLocaleDateString("en-GB") + '.pdf');

      // setTimeout(() => {
      //   // quotes.remove();
      //   // for (var i = 0; i < canvasList.length; i++) {
      //   //   canvasList[i].remove();
      //   // }
      // }, 200);
      // // printWindow.close();

    })
  }, 200);
}

module.exports = myObj;
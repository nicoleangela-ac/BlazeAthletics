import { Injectable } from '@angular/core';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }


  docCreate(table) {
    const doc = new jsPDF();
    this.generateHeader(doc)
    this.generateTable(doc,table)
    this.addFooters(doc)
    doc.save("a4.pdf");
  }

  generateHeader(doc){
    var centerPage = doc.internal.pageSize.width / 2 ; 
    doc
    .setFontSize(20)
     .setFont('helvetica', 'bold')
   // .setFontType('bold')
    .text("ART ANGELS MERCHANDISING", centerPage, 15,{align: 'center'})
    doc
    .setFontSize(17)
    .text("INVENTORY SUMMARY REPORT", centerPage, 22,{align: 'center'})

   doc
    .setFontSize(10)
    .text("123 Meycauayan, Bulacan", doc.internal.pageSize.width / 2, 27, { align: "center" })
  doc
    .setFontSize(10)
   // .setFontStyle('italics')
    .text("01/01/21 - 01/30/21", doc.internal.pageSize.width / 2, 32, { align: "center" })
  }

  generateTable(doc,table) {
    autoTable(
      doc, 
      
      {
        headStyles :{fillColor : '#00000'}  ,       
      html: table,
      margin: { top: 37 },
      theme: 'grid',
      })     
  }

  addFooters = doc => {
    var pageCount = doc.internal.getNumberOfPages()
  
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(8)
    for (var i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.text('Page ' + String(i) + ' of ' + String(pageCount), doc.internal.pageSize.width / 2, 287, {
        align: 'center'
      })
    }
  }




}

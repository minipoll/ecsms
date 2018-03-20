import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
export default class Utils {
    static today():string
    {
      let date = new Date();
      var yyyy = date.getFullYear().toString();
      var mm = (date.getMonth()+1).toString();
      var dd  = date.getDate().toString();

      var mmChars = mm.split('');
      var ddChars = dd.split('');
      return yyyy +  (mmChars[1]?mm:"0"+mmChars[0]) + (ddChars[1]?dd:"0"+ddChars[0]);
    }

    static convertDate(p:string):string {

      if(!p || p.length < 8){
        return "";
      }
      p = p.substr(0,4) + "-" + p.substr(4,2) + "-" + p.substr(6,2);
      var timestamp = Date.parse(p)
      if (isNaN(timestamp)==false)
      {
        let date = new Date(p);
        var yyyy = date.getFullYear().toString();
        var mm = (date.getMonth()+1).toString();
        var dd  = date.getDate().toString();

        var mmChars = mm.split('');
        var ddChars = dd.split('');
        p = yyyy + "." + (mmChars[1]?mm:"0"+mmChars[0]) + "." + (ddChars[1]?dd:"0"+ddChars[0])
      }else {
        p = "";
      }

      return p;
    }

    static firstDayOfMonth(addMonth:number = 0):string
    {
      let date = new Date();
      date.setMonth(date.getMonth()+addMonth);
      var yyyy = date.getFullYear().toString();
      var mm = (date.getMonth()+1).toString();
      var dd  = date.getDate().toString();

      var mmChars = mm.split('');
      var ddChars = dd.split('');
      return yyyy +  (mmChars[1]?mm:"0"+mmChars[0]) + "01";
    }

    static getPdfHtml(res: any,_sanitizer: DomSanitizer) :SafeHtml
    {

      var file = new Blob([res], {type: 'application/pdf'});
      var fileURL = URL.createObjectURL(file);
       return _sanitizer.bypassSecurityTrustHtml(
         "<object  data='" + fileURL + "' type='application/pdf' class='embed-responsive-item' width='100%' height='1000px'>" +
           "Object " + fileURL + " failed" +
           "</object>"
          // "<embed ng-src='"+pdfurl+ "' width='500' height='500' alt='pdf' pluginspage='http://www.adobe.com/products/acrobat/readstep2.html'>"
        );
    }

}

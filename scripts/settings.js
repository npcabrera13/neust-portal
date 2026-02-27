function classobject(classname) { return document.getElementsByClassName(classname);}
function object(id) { return document.getElementById(id);}
function obj(id) { return document.getElementById(id);}
function isBlank(str) { if (str=='') { return true;} else {return false;}}
var is_foreign = 0; 
function clickIE() {if (document.all) {(message);return false;}}function clickNS(e) 
{if (document.layers||(document.getElementById&&!document.all)) {if (e.which==2||e.which==3) {(message);return false;}}}
if (document.layers) {document.captureEvents(Event.MOUSEDOWN);document.onmousedown=clickNS;}
else{document.onmouseup=clickNS;document.oncontextmenu=clickIE;}
document.oncontextmenu=new Function("return false")

function validateDateString(s) {
	var day, A= s.match(/[1-9][\d]*/g);
    try{
        A[0]-= 1;
        day= new Date(+A[2], A[0], +A[1]);
        if(day.getMonth()== A[0] && day.getDate()== A[1]) return true;
        return false;
    }
    catch(er){
        return false;
    }
}


function assistMe() {
	if (regvalidateEmail(obj('emailaddress').value.trim())) {
			fillcontent('pages/submit_request.php?campusid='+obj('campusid').value+'&progid='+obj('progid').value+'&studentno='+
			 encodeURIComponent(obj('studentno').value.trim())+'&dateofbirth='+
			 obj('d_month').value+' '+ obj('d_day').value +', '+ obj('d_year').value +'&lastname='+
			 encodeURIComponent(obj('lastname').value.trim())+'&firstname='+
			 encodeURIComponent(obj('firstname').value.trim())+'&emailaddress='+
			 encodeURIComponent(obj('emailaddress').value.trim())+'&concern='+
			 encodeURIComponent(obj('concern').value.trim()),'selection');
	} else { swal('Error:','Invalid Email Address! Please use (@gmail.com; @qq.com; @msn.com)','error'); }
}

       function regvalidateEmail(email) {
                      if(email.match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                                return false;
                      }	
					  	  var n = email.includes("@gmail.com");
						  var o = email.includes("@msn.com");
						  var p = email.includes("@qq.com");
						  if (n) { return n; } else if (o) { return o; } else if (p) { return p;
						  } else { return false; }
        }
				function validMobileNum(contactnum) {
						if (contactnum.trim()!='') { 
							if(!isValidLong(contactnum.trim() ) || contactnum.trim().length !=11 ) {
								swal("Error", "Invalid Mobile Number! Format must be 09xxxxxxxxx","error");result = 0; 
							} else if(contactnum.trim().substring(0, 2) != '09') {
								swal("Error", "Invalid Mobile Number! Format must be 09xxxxxxxxx","error");result = 0;
							} else { result = 1; }
						} else {
							result = 1;
						}	
						return result;
				}
				function processRegEnroll() {
					var emailaddress = obj('emailaddress').value;
					var re_email = obj('re_email').value;
					var contactnum = obj('contactnum').value;
					var yearlevelid = obj('yearlevelid').value;
					if (regvalidateEmail(emailaddress)) {
						if (emailaddress.trim() == re_email.trim()) {
							if (validMobileNum(contactnum)) {
								if (yearlevelid!=0) {
								 
									 swal({
									  title: "Proceed with Online Enrollment Registration?\n\n YEAR LEVEL: "+ $( "#yearlevelid option:selected" ).text(),
									  text: "Email:"+emailaddress+"\n\n",
									  type: "info",
									  showCancelButton: true,
									  cancelButtonClass: "btn-danger",
									  confirmButtonText: "Yes, I Confirm!",
									  closeOnConfirm: false
									},
									function(){
									  document.getElementById('reg_button').style.visibility = 'hidden';
									  document.getElementById('loader').style.visibility = 'visible';
									  document.forms['register_account'].submit(); 
									});
									
								} else { swal("Error", "Please Select Year Level to Enroll","error");  }
							} 
						} else { swal("Error", "Email Address did not match!","error");  }
					} else { swal("Error", "Invalid Email Address! Use @gmail.com; @qq.com; @msn.com","error");  }
				}
				
function validateEmail(email) {
	  if(email.match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
      }	
	  var n = email.includes("@gmail.com");
	  var o = email.includes("@msn.com");
	  var p = email.includes("@qq.com");
	  if (n) { return n; } else if (o) { return o; } else if (p) { return p;
	  } else { return false; }
}

function ajax_function(loc,eid) {
	var locfile = loc;
	 if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		  xmlhttp=new XMLHttpRequest();
	   } else {// code for IE6, IE5
		  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	   }
	   
	   xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
		 document.getElementById(eid).innerHTML="";
		 document.getElementById(eid).innerHTML=xmlhttp.responseText;
		
		}
	   }
	   
	   xmlhttp.open("GET",locfile,true);
	   xmlhttp.send(); 
	  //$.get(loc, function( data ) { $("#"+eid).html( data ); });
}

function param(w,h) {
	 var width  = w;
	 var height = h;
	 var left   = (screen.width  - width)/2;
	 var top    = (screen.height - height)/2;
	 var params = 'width='+width+', height='+height;
	 params += ', top='+top+', left='+left;
	 params += ', directories=no';
	 params += ', location=no';
	 params += ', menubar=no';
	 params += ', resizable=no';
	 params += ', status=no';
	 params += ', toolbar=no';
	return params;
}

function openWin(url) {
	myWindow=window.open(url,'mywin',param(800,500));
	myWindow.focus();
}

function login_admission() {
	var username = object('username').value;
	var password = object('pass').value;
	var loc = 'loginform.php?username='+encodeURIComponent(username)+'&password='+
				encodeURIComponent(password);
	ajax_fn(loc,'main_div');		
}

function loginkeyp_admission(evt) {
		var keyCode = evt.keyCode;
		if (keyCode==13) {
			login_admission();
		}
}

function logout_admission() {
		swal({
			title: "Log-out",
			text: "Are you sure you want to Logout?",
			icon: "info",
			buttons: true,
			dangerMode: false,
		})
		.then((willAdd) => {
			if (willAdd) {
				ajax_fn('logout.php','main_div');
			} else {

			}
		});
		
}

function timedRefresh(timeoutPeriod) {
	/* setInterval(function () { isonlist(); },timeoutPeriod); */
}
function setActiveNavigate(loc,lid) {
	var i = 1;
	do {
	    if (object('menu_li'+i)!=null) {
	       $('#menu_li'+i).removeClass('active');
	    }
	    i++;
	}
	while (i <= 15);
	$('#menu_li'+lid).addClass('active');
	fillcontent(loc);
}
function ajax_fn(loc,eid,isWait) { 
	if (isWait === undefined) { 
		var wait_me = true;
	} else {
	    var wait_me = true;
	    if (isWait==0) {
		var wait_me = false;
	    } 
	} 
	
	   if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		  xmlhttp=new XMLHttpRequest();
	   } else {// code for IE6, IE5
		  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	   }
	   
	   xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
		 document.getElementById(eid).innerHTML="";
		 document.getElementById(eid).innerHTML=xmlhttp.responseText;
		
		}
	   }
	   
	   xmlhttp.open("GET",loc,wait_me);
	   xmlhttp.send(); 
	   //$.get(loc, function( data ) { $("#"+eid).html( data ); });
}



function isItNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
function isValidNumber(val) {   
	if (val!='') {
		if (val==0) {
			return false;
		} else {
			var validChars = '-0123456789.,';
			for(var i = 0; i < val.length; i++) {
			    if(validChars.indexOf(val.charAt(i)) == -1)
				return false;
			}
			return true;
		}
	} else {
		return false;
	}
} 
function isValidNumberAndZero(val) {   
	if (val!='') {
		
			var validChars = '0123456789.,';
			for(var i = 0; i < val.length; i++) {
			    if(validChars.indexOf(val.charAt(i)) == -1)
				return false;
			}
			return true;
		
	} else {
		return false;
	}
} 
function isValidPosNum(val) {   
	if (val!='') {
		if (val==0) {
			return false;
		} else {
			var validChars = '0123456789.';
			for(var i = 0; i < val.length; i++) {
			    if(validChars.indexOf(val.charAt(i)) == -1)
				return false;
			}
			return true;
		}
	} else {
		return false;
	}
} 
function isValidLong(val) {   
	if (val!='') {
		if (val==0) {
			return false;
		} else {
			var validChars = '0123456789';
			for(var i = 0; i < val.length; i++) {
			    if(validChars.indexOf(val.charAt(i)) == -1)
				return false;
			}
			return true;
		}
	} else {
		return false;
	}
} 

function isValidDouble(val) {   
	if (val!='') {
		if (val==0) {
			return false;
		} else {
			var validChars = '0123456789.';
			for(var i = 0; i < val.length; i++) {
			    if(validChars.indexOf(val.charAt(i)) == -1)
				return false;
			}
			return true;
		}
	} else {
		return false;
	}
} 

function ajax_getResult(loc) {
	var locfile = loc;
	
	   if (window.XMLHttpRequest) {
		  xmlhttp=new XMLHttpRequest();
	   } else {
		  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	   }
	   
	   xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			return xmlhttp.responseText;
		}
	   }
	   xmlhttp.open("GET",locfile,true);
	   xmlhttp.send(); 
	   
	  // $.get(loc, function( data ) { return data; });
}


function fillSubContentGIF(loc,eid) {
	document.getElementById(eid).innerHTML="<img src='../images/please_wait.gif' alt='loading2' />";
	ajax_fn(loc,eid);
}


function fillcontent(loc,eid) {
	if (eid === undefined) { 
		var eid = 'content'; 
		if (object('tmp_content') != null) { 
			eid = 'tmp_content';  
		} else if (object('prodtmp') != null) { 
			eid = 'prodtmp'; 
		} else if (object('content_inv') != null) { 
			eid = 'content_inv'; 
		} else { 
			if (object(eid) == null) { eid = 'main_content'; }
		}
	}
	if (object(eid) == null) { eid = possible_eid(); }
	var locfile = loc; var loading_image = "<div align='center'><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><img src='images/wait.gif' alt='loading' /></div>";
	var verify = object('verifyexit');
		if (verify == null) {
					object(eid).innerHTML=loading_image;
					
					ajax_fn(loc,eid);
		} else {
			
					ajax_fn(loc,eid);
						
		}
}


function fillcontent_applicant(loc,eid) {
if (eid === undefined) { 
	var eid = 'content'; 
	if (object('tmp_content') != null) { 
		eid = 'tmp_content';  
	} else if (object('prodtmp') != null) { 
		eid = 'prodtmp'; 
	} else if (object('content_inv') != null) { 
		eid = 'content_inv'; 
	} else { 
		if (object(eid) == null) { eid = 'main_content'; }
	}
}
if (object(eid) == null) { eid = possible_eid(); }
var locfile = loc; var loading_image = "<div align='center'><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><img src='images/wait.gif' alt='loading' /></div>";

/* <p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><img src='../images/loading_image.gif' alt='loading' /><p>&nbsp;</p><img src='../images/ajax-loader2.gif' alt='loading2' /><p><span style='color:blue;font-size:14px;font-weight:bold;'>Please Wait.....</span></p> */
var verify = object('verifyexit');
	if (verify == null) {
                object(eid).innerHTML=loading_image;
				
				ajax_fn(loc,eid);
    } else {
			
	     
                      object(eid).innerHTML=loading_image;
		      			ajax_fn(loc,eid);
               	
	}
}


function fillcontentNL(loc) {
	var eid = 'content'; 
	if (object('tmp_content') != null) { 
		eid = 'tmp_content'; 
	} else { 
		if (object(eid) == null) { eid = 'main_content'; }
	}
	if (object(eid) == null) { eid = possible_eid(); }
	var verify = object('verifyexit');
	if (verify == null) {
		ajax_fn(loc,'content');
    } else {
	      ajax_fn(loc,eid);
	}
}

function fillSubContent(loc,eid) {
	
	if (eid === undefined) { 
		
		if (object('tmp_content') != null) { 
			eid = 'tmp_content'; 
		} else if (object('prodtmp') != null) { 
			eid = 'prodtmp'; 
		} else { 
			if (object('content') == null) { 
				eid = 'main_content'; 
			} else { eid = 'content'; }
		} 
	} 
	if (object(eid) == null) {  eid = 'main_content'; }
    if (object(eid) == null) { eid = possible_eid(); }
	var verify = object('verifyexit');
	if (verify == null) {
			if (eid!='xmenu') {
			document.getElementById(eid).innerHTML="<img src='images/ajax-loader3.gif' alt='loading2' />";
			}
		ajax_fn(loc,eid);
    } else {
	   
			document.getElementById(eid).innerHTML="<img src='images/ajax-loader3.gif' alt='loading2' />";

		    ajax_fn(loc,eid);
		
     }
}

function printDivContent(elem) {
    var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    mywindow.document.write('<html><head><title>' + document.title  + '</title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write(document.getElementById(elem).innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();
    return true;
}

function fillSubContentAdmin(loc,eid) {
	
	if (eid === undefined) { 
		
		if (object('tmp_content') != null) { 
			eid = 'tmp_content'; 
		} else if (object('prodtmp') != null) { 
			eid = 'prodtmp'; 
		} else { 
			if (object('content') == null) { 
				eid = 'main_content'; 
			} else { eid = 'content'; }
		} 
	} if (object(eid) == null) {  eid = 'main_content'; }
        if (object(eid) == null) { eid = possible_eid(); }
	var verify = object('verifyexit');
	if (verify == null) {
			if (eid!='xmenu') {
			document.getElementById(eid).innerHTML="<img src='images/ajax-loader3.gif' alt='loading2' />";
			}
		ajax_fn(loc,eid);
    } else {
	     
			document.getElementById(eid).innerHTML="<img src='images/ajax-loader3.gif' alt='loading2' />";
			
		    ajax_fn(loc,eid);
	}
}

function fillSubContentNL(loc,eid) {
	if (eid === undefined) { 
			if (object('tmp_content') != null) { eid = 'tmp_content'; } else { 
				if (object('content') == null) { eid = 'main_content'; }
				else { eid = 'content'; }
			} 
	} if (object(eid) == null) { eid = 'main_content'; }
	if (object(eid) == null) { eid = 'tmp_hotel'; }
	var verify = object('verifyexit');
	if (verify == null) {
		ajax_fn(loc,eid);
    } else {
	      ajax_fn(loc,eid);
	}
}

function param(w,h) {
 var width  = w;

 var height = h;

 var left   = (screen.width  - width)/2;

 var top    = (screen.height - height)/2;

 var params = 'width='+width+', height='+height;

 params += ', top='+top+', left='+left;

 params += ', directories=no';

 params += ', location=no';

 params += ', resizable=no';

 params += ', status=no';

 params += ', toolbar=no';
return params;
}


function openWin(url)
{
myWindow=window.open(url,'mywin',param(800,500));
myWindow.focus();
}

function openCustom(url,w,h)
{
	myWindow=window.open(url,'mywin',param(w,h));
	myWindow.focus();
	
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function openCustomAnd_Ajax(url,w,h,loc,div)
{
	myWindow=window.open(url,'mywin',param(w,h));
	myWindow.onbeforeunload  = function(){ 
				sleep(2000).then(() => {
						ajax_function(loc,div); 
				});
				
			};
	myWindow.focus();
}
function openCal(id,def) {
openCustom('calendar/?id='+id+'&def='+def,200,200);
//showDT(id,def);
}
function showDT(id,def) {
	document.getElementById("dtpicker").visibility = "visible";
	fillSubContent('calendar/?id='+id+'&def='+def,'dtpicker');
}
function hideDT() {
document.getElementById("dtpicker").visibility = "hidden";
}

function fillcontentNLMC(loc) {
var verify = object('verifyexit');
	if (verify == null) {
              object("main_content").innerHTML="<p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><img src='images/loading_image.gif' alt='loading' /><p>&nbsp;</p><img src='images/ajax-loader2.gif' alt='loading2' /><p><span style='color:blue;font-size:14px;font-weight:bold;'>Please Wait.....</span></p>";
		
		ajax_fn(loc,'main_content');
    } else {
	     
		object("main_content").innerHTML="<p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><img src='images/loading_image.gif' alt='loading' /><p>&nbsp;</p><img src='images/ajax-loader2.gif' alt='loading2' /><p><span style='color:blue;font-size:14px;font-weight:bold;'>Please Wait.....</span></p>";
		
			ajax_fn(loc,'main_content'); 
           
	}
}




function fnExcelReport() {
		
              var tab_text="<table border='2px'><tr bgcolor='#87AFC6'>";
              var textRange; var j=0;
              tab = document.getElementById('headerTable'); // id of table
	        if (tab==null) {
			tab = document.getElementById('trhovergreen');
			if (tab==null) {
				tab = document.getElementById('trhover');
			}
	        }	

              for(j = 0 ; j < tab.rows.length ; j++) 
              {     
                    tab_text=tab_text+tab.rows[j].innerHTML+"</tr>";
                    //tab_text=tab_text+"</tr>";
              }

              tab_text=tab_text+"</table>";
              tab_text= tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
              tab_text= tab_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
              tab_text= tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params
	      tab_text= tab_text.replace(/&nbsp;<\//gi, "</");
	      tab_text= tab_text.replace(/&nbsp;<\//gi, "</");

                   var ua = window.navigator.userAgent;
                  var msie = ua.indexOf("MSIE "); 

                     if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
                        {
                               txtArea1.document.open("txt/html","replace");
                               txtArea1.document.write(tab_text);
                               txtArea1.document.close();
                               txtArea1.focus(); 
                                sa=txtArea1.document.execCommand("SaveAs",true,"exported.xls");
                              }  
                      else                 //other browser not tested on IE 11
					 
                          sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));  
                          return (sa);
}	  

/* 
function setActiveAndNavigate(loc,lid) {
	var i = 1;
	do {
	    if (object('li'+i)!=null) {
	       $('#li'+i).removeClass('current_page_item');
	       $('#li'+i).removeClass('active');
	    }
	    i++;
	}
	while (i <= 10);
	$('#li'+lid).addClass('current_page_item');
	$('#li'+lid).addClass('active');
	fillcontentNLMC(loc);
} */

function setActiveAndNavigate(loc,lid) {
	var i = 1;
	do {
	    if (object('li'+i)!=null) {
	       $('#li'+i).removeClass('active');
	    }
	    i++;
	} while (i <= 20);
	
	$('#li'+lid).addClass('active');
	fillcontentNLMC(loc);
}

function setActive(lid) {
	var i = 1;
	do {
	    if (object('li'+i)!=null) {
	       $('#li'+i).removeClass('active');
	    }
	    i++;
	} while (i <= 20);
	$('#li'+lid).addClass('active');
}

 
document.addEventListener('keydown', function(zEvent) {
    run_shortcut_key(zEvent);
}); 
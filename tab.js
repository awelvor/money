/* url */





function loaddb(){
console.log("mark1");
rq= indexedDB.deleteDatabase("dblx");
console.log("mark2");
rq.onsuccess = function(){
	console.log("mark3");
	console.log("delete:success");
	credb();
};
rq.onblocked = function(){console.log("delete:blocked");};
}

function credb(){	
	rq = indexedDB.open("dblx");
	console.log("IDBFactory indexedDB: ", rq.indexedDB);
	rq.onsuccess = function(){console.log("open:success");};
	rq.onupgradeneeded = function(e){
		console.log("open:upgradeneeded");
		console.log("IDBFactory indexedDB: ", rq.indexedDB);
		var db = e.target.result;
		var st = db.createObjectStore("stlx", {keyPath: 'a',autoIncrement: true});
  		st.createIndex("b", "b", { unique: false });
  		st.createIndex("c", "c", { unique: false });
		st.createIndex("d", "d", { unique: false });
  		st.createIndex("e", "e", { unique: false });
  		st.createIndex("f", "f", { unique: false });
  		st.createIndex("g", "g", { unique: false });
		st.createIndex("h", "h", { unique: false });
		st.createIndex("i", "i", { unique: false });
		mytab.forEach(function(el){
			st.put({b:el[0],c:el[1],d:el[2],e:el[3],f:el[4],g:el[5],h:el[6], i:el[7]});
			nn1++;
		});
		stx = db.createObjectStore("idlx", {keyPath: 'a',autoIncrement: true});
		stx.createIndex("b", "b", { unique: true });
		mycbid.forEach(function(el){
			stx.put({b:el[0],c:el[1]});
			nn2++;
		});
		stb = db.createObjectStore("bglx", {keyPath: 'a',autoIncrement: true});
		stb.createIndex("b", "b", { unique: true });
		mybdg.forEach(function(el){stb.put({b:el[0]})});
		//tst2();
		console.log("iDBDatabase.objectStoreNames: ", db.objectStoreNames);
		console.log("credb-end:upgradeneeded");
	};
}
function history(){
	indexedDB.open("dblx").onsuccess = function(e){
		var tx = e.target.result.transaction("stlx", "readonly");
		rq = tx.objectStore("stlx").index("c").openCursor();
		html = "<table>";
		rq.onsuccess = function(){
			var cr = rq.result;
			if (cr){
				html += cr2html(cr);
				cr.continue();
			}
			else html += "</table>";
		}
		tx.oncomplete = function(){
			document.getElementById("content2").innerHTML = html;
			document.getElementById("content3").innerHTML = "";
			document.getElementById("content4").innerHTML = "";
		};
	};
}
function operations(){
	indexedDB.open("dblx").onsuccess = function(e){
		var tx = e.target.result.transaction("stlx", "readonly");
		var st = tx.objectStore("stlx");
		console.log("IDBRequest.count: ", st.count());
		html = "<table>";
		st.openCursor().onsuccess = function(e1){
			var cr = e1.target.result;
  			if (cr){
				//console.log("IDBCursor.source: ",cr.source);
				html += cr2html(cr);
				cr.continue();
			}
			else html += "</table>";
		};
		tx.oncomplete = function(){
			document.getElementById("content2").innerHTML = html;
			document.getElementById("content3").innerHTML = "";
			document.getElementById("content4").innerHTML = "";
		};
	};
}
function tst22(){
	indexedDB.open("dblx").onsuccess = function(e){
		var tx = e.target.result.transaction("bglx", "readonly");
		var st = tx.objectStore("bglx");
		html += "<p>budgets</p><table>";
		st.openCursor().onsuccess = function(e){
			var cr = e.target.result;
  			if (cr){
				html += "<tr><td class='l' width= 2% >"+cr.primaryKey+"</td><td class='l' width= 8% >"+cr.value.b+"</td><tr>";
				cr.continue();
			}
			else html += "</table>";
		};
		tx.oncomplete = function(){tst3();};
	};
}
function tst3(){
	indexedDB.open("dblx").onsuccess = function(e){
		var tx = e.target.result.transaction("idlx", "readonly");
		var st = tx.objectStore("idlx");
		html += "<p>cbid</p><table>";
		st.openCursor().onsuccess = function(e){
			var cr = e.target.result;
  			if (cr){
				html += "<tr><td>"+cr.primaryKey+"</td><td>"+cr.value.b+"</td><td>"+cr.value.c+"</td></tr>";
				cr.continue();
			}
			else html += "</table>";
		};
		tx.oncomplete = function(){
			//tst4();
			document.getElementById("content").innerHTML = html;
		};
			
	};
}

function cr2html(cr){
	var ht = "<tr>";
	ht += "<td class='l' width= 2% >"+cr.primaryKey+"</td>";
	ht += "<td class='l' width= 8% >"+cr.value.b+"</td>";
	ht += "<td class='l' width=10% >"+cr.value.c+"</td>";
	ht += "<td class='l' width=20% >"+cr.value.d+"</td>";
	ht += "<td class='r' width=10% >"+cr.value.e+"</td>";
	ht += "<td class='r' width=10% >"+cr.value.f+"</td>";
	ht += "<td class='r' width=10% >"+cr.value.g+"</td>";
	ht += "<td class='r' width=10% >"+cr.value.h+"</td>";
	ht += "<td class='r' width=10% >"+cr.value.i+"</td>";
	ht += "</tr>";
	return ht;
}
function tst4(){
	console.log('tst4');
	var rq = indexedDB.open("dblx");//IDBRequest
	rq.onsuccess = function(e){
		var tx = e.target.result.transaction(["stlx","idlx"], "readonly");
		var st1 = tx.objectStore("stlx");
		var st2 = tx.objectStore("idlx");
		var ind2 = st2.index("b");
		html += "<p>tst4</p><table>";
		for (i=1; i<21; i++){
			st1.get(i).onsuccess = function(e1){
  				ind2.get(e1.target.result.i).onsuccess = function(e2){
					html += "<tr><td>"+e1.target.result.i+"</td><td>"+e2.target.result.c+"</td></tr>";
				};
			};
		};
		tx.oncomplete = function(){
			html += "</table>";
			tst5();
			//document.getElementById("content").innerHTML = html;
		};
	};
}

function byid(){
	indexedDB.open("dblx").onsuccess = function(e){
		var tx = e.target.result.transaction(["stlx","idlx"], "readonly");
		console.log(" IDBTransaction.objectStoreNames: ", tx.objectStoreNames);
		console.log(" IDBTransaction.mode: ", tx.mode);
		console.log(" IDBTransaction.db: ", tx.db);
		html = "<table>";
		loopid(1, tx.objectStore("idlx"), tx.objectStore("stlx").index("i") , tx);
	}
}
function loopid(i, st2, ind1, tx){
	st2.get(i).onsuccess = function(e2){
		cc = 0;
		dd = 0;
		ind1.openCursor(IDBKeyRange.only(e2.target.result.b)).onsuccess = function(e1){
			var cr1 = e1.target.result;
  			if (cr1){
				cc += cr1.value.e;
				dd += cr1.value.f;
				cr1.continue();
			}
			else {
				html += "<tr onclick='cbid("+e2.target.result.b+")'>";
				html +=  "<td>"+e2.target.result.c + "</td><td>"+cc+"</td><td>"+dd +"</td></tr>"; 
				if (i<nn2) loopid(i+1, st2, ind1, tx);
			}
		}
		tx.oncomplete = function(){
			html += "</table>";
			document.getElementById("content2").innerHTML = html;
			document.getElementById("content3").innerHTML = "";
			document.getElementById("content4").innerHTML = "";
		};
	};
}
function cbid(nn){
	indexedDB.open("dblx").onsuccess = function(e){
		var ind1 = e.target.result.transaction("stlx").objectStore("stlx").index("i");
		html = "<p>cbid</p><table>";
		e.target.result.transaction("stlx").objectStore("stlx").index("i").openCursor(IDBKeyRange.only(nn)).onsuccess = function(e1){
			var cr1 = e1.target.result;
  			if (cr1){
				html += cr2html(cr1);
				cr1.continue();
			}
			else {
				html += "</table>";
				document.getElementById("content3").innerHTML = html;
			}
		}
	}
}
function budgets(){
	indexedDB.open("dblx").onsuccess = function(e){
		var tx = e.target.result.transaction(["stlx","bglx"], "readonly");
		html = "<table>";
		loopidxx(1, tx.objectStore("bglx") , tx.objectStore("stlx").index("g"), tx);
	}
}
function loopidxx(i, st3, ind1, tx){
	st3.get(i).onsuccess = function(e3){
		cc = 0;
		dd = 0;
		ind1.openCursor(IDBKeyRange.only(e3.target.result.b)).onsuccess = function(e1){
			var cr1 = e1.target.result;
			
			if (cr1){
				console.log("source: ", cr1.source);
				console.log("direction: ", cr1.direction);
				console.log("key: ", cr1.key);
				console.log("primryKey: ", cr1.primaryKey);
				cc += cr1.value.e;
				dd += cr1.value.f;
				cr1.continue();
			}
			else {
				html += "<tr onclick='bdg(\""+e3.target.result.b+"\")'>"; 
				html += "<td>"+e3.target.result.b + "</td><td>"+cc+"</td><td>"+dd +"</td></tr>"; 
				if (i<3) loopidxx(i+1, st3, ind1, tx);
			}
		}
		tx.oncomplete = function(){
			html += "</table>";
			document.getElementById("content2").innerHTML = html;
			document.getElementById("content3").innerHTML = "";
			document.getElementById("content4").innerHTML = "";
		};
	};
}
function bdg(budget){
	indexedDB.open("dblx").onsuccess = function(e){
		var ind1 = e.target.result.transaction("stlx").objectStore("stlx").index("i");
		html = "<table>";
		e.target.result.transaction("stlx").objectStore("stlx").index("g").openCursor(IDBKeyRange.only(budget)).onsuccess = function(e1){
			var cr1 = e1.target.result;
  			if (cr1){
				html += cr2html(cr1);
				cr1.continue();
			}
			else {
				html += "</table>";
				document.getElementById("content4").innerHTML = html;
			}
		}
	}
}
function sql(){
	indexedDB.open("dblx").onsuccess = function(e){
		var tx = e.target.result.transaction("stlx", "readonly");
		var st = tx.objectStore("stlx");
		console.log("IDBRequest.count: ", st.count());
		html  = "<p>insert into mymoney</p>";
		html += "<p>(compte, date, libelle, credit, debit, budget, banque, cbid)</p>";
		html += "<p>values</p>";
		html += "<table>";
		st.openCursor().onsuccess = function(e1){
			var cr = e1.target.result;
  			if (cr){
				//console.log("IDBCursor.source: ",cr.source);
				html += "<tr>";
				html += "<td>("+cr.value.b+",</td>";
				html += "<td>"+cr.value.c+",</td>";
				html += "<td>"+cr.value.d+",</td>";
				html += "<td>"+cr.value.e+",</td>";
				html += "<td>"+cr.value.f+",</td>";
				html += "<td>"+cr.value.g+",</td>";
				html += "<td>"+cr.value.h+",</td>";
				html += "<td>"+cr.value.i+"),</td>";
				html += "</tr>";
				cr.continue();
			}
			else html += "</table>";
		};
		tx.oncomplete = function(){
			//console.log(html);
			//document.getElementById("content").innerHTML = html;
			document.getElementById("content2").innerHTML = html;
			document.getElementById("content3").innerHTML = "";
			document.getElementById("content4").innerHTML = "";
		};
	};
}
		



/* end of file */

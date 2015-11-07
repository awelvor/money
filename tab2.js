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
		nn1=0;
		nn2=0;
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
function operations(){
	indexedDB.open("dblx").onsuccess = function(e){
		var tx = e.target.result.transaction("stlx", "readonly");
		var st = tx.objectStore("stlx");
		console.log("IDBRequest.count: ", st.count());
		html = "";
		st.openCursor().onsuccess = function(e1){
			var cr = e1.target.result;
  			if (cr){
				//console.log("IDBCursor.source: ",cr.source);
				html += cr2html(cr);
				cr.continue();
			};
			//else html += "</table>";
		};
		tx.oncomplete = function(){
			document.getElementById("content2").innerHTML = html;
			document.getElementById("content3").innerHTML = "";
			document.getElementById("content4").innerHTML = "";
		};
	};
}
function hist(){
	indexedDB.open("dblx").onsuccess = function(e){
		var tx = e.target.result.transaction("stlx", "readonly");
		rq = tx.objectStore("stlx").index("c").openCursor();
		html = "";
		rq.onsuccess = function(){
			var cr = rq.result;
			if (cr){
				html += cr2html(cr);
				cr.continue();
			}
			//else html += "</table>";
		}
		tx.oncomplete = function(){
			document.getElementById("content2").innerHTML = html;
			document.getElementById("content3").innerHTML = "";
			document.getElementById("content4").innerHTML = "";
		};
	};
}
function budgets(){
	indexedDB.open("dblx").onsuccess = function(e){
		var tx = e.target.result.transaction(["stlx","bglx"], "readonly");
		html = "";
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
				html += "<div class='ui-grid-b'>";
				html += "<div class='ui-block-a'>"+e3.target.result.b+"</div>";
				html += "<div class='ui-block-b'>"+cc+"</div>";
				html += "<div class='ui-block-c'>"+dd+"</div>";
				html += "</div>"; 
				if (i<3) loopidxx(i+1, st3, ind1, tx);
			}
		}
		tx.oncomplete = function(){
			
			document.getElementById("content2").innerHTML = html;
			document.getElementById("content3").innerHTML = "";
			document.getElementById("content4").innerHTML = "";
		};
	};
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
function cr2html(cr){
	ht = "<div class='ui-grid-d'>";
	ht += "<div class='ui-block-a'>"+cr.primaryKey+"</div>";
	ht += "<div class='ui-block-b'>"+cr.value.b+"</div>";
	ht += "<div class='ui-block-c'>"+cr.value.c+"</div>";
	ht += "<div class='ui-block-d'>"+cr.value.d+"</div>";
	ht += "<div class='ui-block-e'>"+cr.value.g+"</div>";
	ht += "</div>";
	return ht;
}

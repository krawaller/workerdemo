var synclib = require("./lib/heavylib");

// _async and _worker created by running `npm run wrap`
workerlibFactory = require("./lib/heavylib_async.js");
var singlelib = workerlibFactory('./lib/heavylib_worker.js',1);
var multilib = workerlibFactory('./lib/heavylib_worker.js',3);

var el = document.getElementById.bind(document);

var msgs = {};
var nextMsgId = 0;

function setLogMsg(id,msg){
  msgs[id] = msg;
  el("log").innerHTML = Object.keys(msgs).reduce(function(mem,id){
    return mem + "<li><strong>" + id.split(" ")[1] + "</strong> " + msgs[id] + "</li>";
  }, "");
}

el("sync").addEventListener("click",function(){
  var timestamp = +(new Date)
  var id = ++nextMsgId + " sync";
  setLogMsg(id, "...calculating...");
  var result = synclib.anotherHeavyMethod("a","b");
  var took = +(new Date) - timestamp;
  setLogMsg(id, "received, took " +  took);
});

el("singleworker").addEventListener("click",function(){
  var timestamp = +(new Date)
  var id = ++nextMsgId + " single";
  setLogMsg(id, "...calculating...");
  singlelib.anotherHeavyMethod("a","b").then(function(result){
    var took = +(new Date) - timestamp;
    setLogMsg(id, "received, took " + took);
  });
});

el("multiworker").addEventListener("click",function(){
  var timestamp = +(new Date)
  var id = ++nextMsgId + " multi";
  setLogMsg(id, "...calculating...");
  multilib.anotherHeavyMethod("a","b").then(function(result){
    var took = +(new Date) - timestamp;
    setLogMsg(id, "received, took " + took);
  });
});

el("clear").addEventListener("click",function(){
  el("log").innerHTML = "";
  msgs = {};
});

module.exports = {
  aHeavyMethod: function(arg1,arg2){
    console.log("aHeavyMethod called in lib");
    for(var a=0; a<100000; a++){
      for(var b=0; b<10000; b++){
        
      }
    }
    return arg1 + arg2;
  },
  anotherHeavyMethod: function(arg1, arg2){
    console.log("anotherHeavyMethod called in lib");
    for(var a=0; a<70000; a++){
      for(var b=0; b<70000; b++){
        
      }
    }
    return arg1 + arg2;
  }
}
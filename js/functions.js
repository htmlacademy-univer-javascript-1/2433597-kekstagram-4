const checkLength = function(string,length){
  if(string.length<=length){
    return true;
  }else{
    return false;
  }
};

const isPalindrome = function(string){
  string=string.toLowerCase().replaceAll(' ','');
  let reversedString = '';
  for(let i = string.length-1; i>=0; i--){
    reversedString+=string[i];
  }
  return string===reversedString;
};

const getNumber = function(string){
  string=string.toString().replaceAll(' ','');
  let result ='';
  for(let i = 0; i<string.length; i++){
    if(!isNaN(string[i])){
      const number=parseInt(string[i],10);
      result+=number;
    }
  }
  if(result==''){
    return 'NaN';
  }else{
    return result;
  }
};


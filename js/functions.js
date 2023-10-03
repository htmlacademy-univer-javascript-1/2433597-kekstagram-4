//Функция 1
const checkLength = function(string,length){
  return string.length<=length;
};
checkLength('привет',6);

//Функция 2
const isPalindrome = function(string){
  string=string.toLowerCase().replaceAll(' ','');
  let reversedString = '';
  for(let i = string.length-1; i>=0; i--){
    reversedString+=string[i];
  }
  return string===reversedString;
};
isPalindrome('А роза упала на лапу Азора');

//Функция 3
const getNumber = function(string){
  string=string.toString().replaceAll(' ','');
  let result ='';
  for(let i = 0; i<string.length; i++){
    if(!isNaN(string[i])){
      const number=parseInt(string[i],10);
      result+=number;
    }
  }
  if(result ===''){
    return 'NaN';
  }
  return result;
};
getNumber('2023 год');


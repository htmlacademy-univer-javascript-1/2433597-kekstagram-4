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

//Функция 4


const getCorrect = function(origin){
  const data = origin.split(':');
  for(let i=0; i<data.length; i++){
    if (data[i].length===2 && data[i][0]==='0'){
      data[i][0]='';
    }
  }
  return data;
};

const workDayFit = function(startWorkDay, endWorkDay, startMeeting, meetingDuration){
  const workStart = getCorrect(startWorkDay);
  const workEnd = getCorrect(endWorkDay);
  const meetingStart = getCorrect(startMeeting);
  const meeting = meetingStart;
  if (workStart[0]<=meetingStart[0] && workStart[1]<= meetingStart[1]){
    while(meetingDuration>=60){
      meeting[0]++;
      meetingDuration-=60;
    }
    if(meetingDuration!==0){
      meeting[1]+=meetingDuration;
    }
    if(meeting[1]>=60){
      meeting[0]++;
      meeting[1]-=60;
    }
    return meeting<=workEnd;
  }else{
    return false;
  }
};

workDayFit('08:00', '14:30', '14:00', 90);


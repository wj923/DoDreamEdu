winning_numbers = []
bonus_number = 0
user_lotto_numbers_list = []

// 1 ~ 45 사이의 랜덤한 숫자 반환
function getRandomNum(){
  return Math.floor(Math.random() * 45) + 1;
}

// lotto_nums(list) 값들 중 ball_num(number)값과 중복되는 값이 있는지 확인한다.
// 중복되는 값이 있으면 true 그렇지 않으면 false 반환
function checkDuplicatedNum(lotto_nums, ball_num){
    return lotto_nums.find(function(n){return n==ball_num;}) ? true : false;
}

// getRandomNum 함수를 통해 lotto_nums(list)에 숫자 6개를 넣어 반환한다.
// checkDuplicatedNum 함수를 통해 lotto 숫자에 중복된 숫자가 들어가지 않도록 한다.
function getLottoNums(){
    var lotto_nums = [];
    while(lotto_nums.length < 6){
        var random_num = getRandomNum();
        if(!checkDuplicatedNum(lotto_nums, random_num))
            lotto_nums.push(random_num);
    }
    return lotto_nums;
}

// lotto_nums(list)에서 중복된 값이 있으면 true 그렇지 않으면 false 반환
function checkDuplicatedNumInList(lotto_nums){
   return [...new Set(lotto_nums)].length != 6 ? true : false;
}

// getLottoNums 함수를 통해 winning_numbers에 당첨번호를 위한 숫자 6개를 얻는다.
// checkDuplicatedNum 함수를 통해 winning_numbers와 중복되지 않는 bonus_number를 얻는다.
function getWinningNumbersAndBonusNumber(){
    winning_numbers = getLottoNums();
    do{
        bonus_number = getRandomNum();
    }while(checkDuplicatedNum(winning_numbers, bonus_number));
}

// 파라미터 a와 b를 더한 값을 리턴한다.
function add(a, b){
    return a+b;
}

// 당첨번호 winning_number와 자신의 lotto_nums 중 일치하는 번호의 개수를 반환한다.
function getMachedNum(lotto_nums){
    return 12 - [...new Set([...lotto_nums, ...winning_numbers])].length;
}

// getMachedNum 함수를 통해 얻은 값을 통해 '꽝', '5등', '4등', '3등', '2등', '1등'을 반환한다.
// 꽝  -> 2개 이하 동일
// 5등 -> 3개 동일
// 4등 -> 4개 동일
// 3등 -> 5개 동일
// 2등 -> 5개 동일, 보너스 동일
// 1등 -> 6개 동일
function getWinningResult(lotto_nums){
   var correct_cnt = getMachedNum(lotto_nums);
   var result;
   switch(correct_cnt){
       case 6 : result = "1등"; break;
       case 5 : result = checkDuplicatedNum(lotto_nums, bonus_number) ? "2등" : "3등"; break;
       case 4 : result = "4등"; break;
       case 3 : result = "5등"; break;
       default : result = "꽝"; break;
   }
   return result;
}

function addLottoNum(){
    // 이 부분은 수정하지 마세요.
    let lotto_nums = getLottoNums();
    user_lotto_numbers_list.push(lotto_nums);
    drawCircle(lotto_nums);
}

function checkWinLotto(){
    // 이 부분은 수정하지 마세요.
  getWinningNumbersAndBonusNumber();

  let result = $(".result")

  for(let i in user_lotto_numbers_list) {
      result[i].textContent = getWinningResult(user_lotto_numbers_list[i])
      if(result[i].textContent == "꽝") {
          result[i].style.color = "red";
      }
  }

  winning_numbers.push(bonus_number);
  drawWinCircle(winning_numbers);

  $("#buy-lotto").attr("disabled", true)
  $("#check-winner").attr("disabled", true)
}
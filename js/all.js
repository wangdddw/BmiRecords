//指定DOM元素
var countBmiBtn = document.querySelector('.btn');
var list = document.querySelector('.bmiRecords');
var data = JSON.parse(localStorage.getItem('listData')) || [];
//改變btn裡的字
var btnValue = document.querySelector('.value');
//顯示BMI狀態
var checkStatus = document.querySelector('.checkStatus');

//監聽與更新
countBmiBtn.addEventListener('click',addData,false);
list.addEventListener('click',toggleDone,false);
updateList(data);
//計算日期
var toDay = new Date();
var year = toDay.getFullYear();
var month = toDay.getMonth() + 1 ; //從0開始
var day = toDay.getDate();
var date = year +'/'+month+'/'+day;
console.log(date);

//加入列表並同步更新網頁與localStorage
function addData(e){

    e.preventDefault();
    var heightInput = document.querySelector('#heightId').value;
    var weightInput = document.querySelector('#weightId').value;

    //結果輸出後消除輸入的值
    let removeHeightInput = document.querySelector('#heightId');
    let removeWeightInput = document.querySelector('#weightId');

    var cm = heightInput;
    var m = cm/100;
    var kg = weightInput;
    var bmi = (kg/(m*m)).toFixed(2);
    
    //判斷數值是否輸入正確
    if (bmi == "NaN") {
        alert('請輸入正確的數值!');
        return;
    } else if (heightInput == '') {
        alert("您尚未輸入身高！");
        return;
    } else if (weightInput == '') {
        alert("您尚未輸入體重！");
        return;
    };

    //判斷狀態，並修改btn的樣式與文字、按鈕右側藏p，加入BMI狀態文字
    var bmiText , colorClass;
    if(bmi < 18.5){
        bmiText = '體重過輕';
        colorClass = 'blue';
        countBmiBtn.setAttribute('id','btnBlue');
        countBmiBtn.setAttribute('value',bmi);
        checkStatus.textContent = bmiText;
    }else if(bmi >= 18.5 && bmi<25){
        bmiText = '體重正常';
        colorClass = 'green';
        countBmiBtn.setAttribute('id','btnGreen');
        countBmiBtn.setAttribute('value',bmi);
        checkStatus.textContent = bmiText;
    }else if(bmi >= 25 && bmi <30){
        bmiText = '體重過重';
        colorClass = 'orange';
        countBmiBtn.setAttribute('id','btnOrange');
        countBmiBtn.setAttribute('value',bmi);
        checkStatus.textContent = bmiText;
    }else if(bmi >= 30 && bmi < 35){
        bmiText = '中等肥胖';
        colorClass = 'orangeRed';
        countBmiBtn.setAttribute('id','btnOrangeRed');
        countBmiBtn.setAttribute('value',bmi);
        checkStatus.textContent = bmiText;
    }else if(bmi >= 35 && bmi < 40){
        bmiText = '嚴重肥胖';
        colorClass = 'red';
        countBmiBtn.setAttribute('id','btnRed');
        countBmiBtn.setAttribute('value',bmi);
        checkStatus.textContent = bmiText;
    }else if (bmi >= 40){
        bmiText = '極度肥胖';
        colorClass = 'brown';
        countBmiBtn.setAttribute('id','btnBrown');
        countBmiBtn.setAttribute('value',bmi);
        checkStatus.textContent = bmiText;
    }
    
    //將資料存入陣列
    var bmiData = {
        bmiStatus : bmiText ,
        BMI : bmi ,
        height : cm,
        weight : kg,
        day : date,
        color : colorClass,
    };
    //console.log(bmiData);
    data.push(bmiData);
    updateList(data);
    localStorage.setItem('listData',JSON.stringify(data));
    //結果輸出後消除輸入的值
    removeHeightInput.value = '';
    removeWeightInput.value = '';
    
}

//更新紀錄
function updateList(items){
    var str = '';
    var len = items.length;
    for(var i = 0 ; i < len ; i++){
        str += '<li class="'+items[i].color+'"><p class="status">'+items[i].bmiStatus+'</p><p>BMI：'+items[i].BMI+'</p><p>身高：'+items[i].height+'</p><p>體重：'+items[i].weight+'</p><p class="day">輸入日期：'+items[i].day+'</p><a class="del" href="#" data-index='+i+'>X</a></li>';   
    }
    list.innerHTML = str;
}


//刪除紀錄
function toggleDone(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'A') {
        return;
    };
    var index = e.target.dataset.index;
    console.log(e.target.dataset.index);
    data.splice(index, 1);
    localStorage.setItem('bmiData', JSON.stringify(data));
    updateList(data);
}
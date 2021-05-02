
        function calPrice() {
            var enter_time_hour = document.getElementById('enter-time').value;
            var out_time_hour = document.getElementById('out-time').value;
            var hours = (out_time_hour - enter_time_hour);

            var early_hours = 12 - enter_time_hour;
            var early_total = 0; // 早場統計
            var common_total = 0; // 一般場統計
            var total = 0; // 全部統計

            var people = document.getElementsByName('people')[0].value;

            var is_vacation = document.getElementById('vacation').checked;

            var crosso_g5000 = document.getElementById('crosso_g5000').checked; // 是否爲 crosso or g5000
            var f1_g8000 = document.getElementById('f1_g8000').checked; // 是否爲 f1 or g8000

            var discount = document.getElementById('discount').value;


            if (enter_time_hour == out_time_hour) {
                Swal.fire({
                    title: '噢喔',
                    html: '進場時間等於出場時間',
                    icon: 'warning'
                    }
                )
                return
            }


            if (out_time_hour < 6 || out_time_hour > 23) {
                Swal.fire({
                    title: '噢喔',
                    html: '離開時間不合理，夜場必須要待滿時段',
                    icon: 'warning'
                    }
                )
                return
            }

            if ((is_vacation && enter_time_hour < 9) || (!is_vacation && enter_time_hour < 10)) {
                Swal.fire({
                    title: '噢喔',
                    html: '進場時間不合理，這時間可能還沒營業噢',
                    icon: 'warning'
                    }
                )
                return
            }

            if (out_time_hour-enter_time_hour < 0) {
                Swal.fire({
                    title: '噢喔',
                    html: '目前不支援跨夜及夜場的計算<br>早場時段只有假日爲9:00-12:00<br>一般場次時段爲12:00-23:00',
                    icon: 'warning'
                    }
                )
                return
            }



            // 早場價格計算
            if (is_vacation && enter_time_hour < 12) { // 假日才有早場
                if (people < 3) {
                    if (f1_g8000) {
                        early_total += (240 + 50) * 3 // 早場不足3人要補滿3人且 f1 or g8000 每人加價 50
                    } else {
                        early_total += 240 * 3
                    }
                }else if (people == 4) { // 早場4人價
                    if (f1_g8000) {
                        early_total += (230 + 45) * people 
                    } else {
                        early_total += 230 * people
                    }
                }else if (people == 5) { // 早場5人價
                    if (f1_g8000) {
                        early_total += (220 + 40) * people
                    } else {
                        early_total += 220 * people
                    }
                }else if (people == 6) { // 早場6人價
                    if (f1_g8000) {
                        early_total += (210 + 35) * people
                    } else {
                        early_total += 210 * people
                    }
                }else { // 早場7人含以上價
                    if (f1_g8000) {
                        early_total += (200 + 30) * people
                    } else {
                        early_total += 200 * people
                    }
                }
                total += early_total
                hours -= early_hours // 扣掉早上時數
            }


            // 開始統計一般時間
            if (people > 3) { // 如果大於 3 人 增加多於的人數費用
                var extra_people = people - 3;
                if (is_vacation) {
                    common_total += extra_people * 280; // 假日每多一人多280元
                }else {
                    // 平日看是否爲下午四點前
                    if (enter_time_hour < 16) { 
                        common_total += extra_people * 220; // 下午四點前 每多一人多220元
                    }else{
                        common_total += extra_people * 250; // 下午四點後 每多一人多250元
                    }
                }
            }

            if (is_vacation) { // 判斷是否爲假日
                if (crosso_g5000) {
                    common_total += 340 * hours;
                }else if (f1_g8000) {
                    common_total += 420 * hours;
                }
                
            }else{
                // 平日看是否爲下午四點前
                if (enter_time_hour < 16) { 
                    if (crosso_g5000) {
                        common_total += 230 * hours;
                    }else if (f1_g8000) {
                        common_total += 280 * hours;
                    }
                }else {
                    if (crosso_g5000) {
                        common_total += 300 * hours;
                    }else if (f1_g8000) {
                        common_total += 340 * hours;
                    }
                }
            }

            var discounted_total = discount * hours; // 乘上一般可優惠時數

            total += common_total;

            if (early_hours > 0) {
                Swal.fire({
                    title: '消費價格',
                    html: '早場金額：' + early_total.toString() + '<br>一般場金額：' + common_total.toString() + '<br>總金額：' + total.toString() + '<br>共折價' + discounted_total.toString() + '元，總金額：' + (total - discounted_total).toString() + '<br>共' + people.toString() + '人，平均一人：' + ((total - discounted_total)/people).toString(),
                    icon: 'success'
                    }
                )
            }else {
                Swal.fire({
                    title: '消費價格',
                    html: '總金額：' + total.toString() + '<br>共折價' + discounted_total.toString() + '元，總金額：' + (total - discounted_total).toString() + '<br>共' + people.toString() + '人，平均一人：' + ((total - discounted_total)/people).toString(),
                    icon: 'success'
                    }
                )
            }
            
        }
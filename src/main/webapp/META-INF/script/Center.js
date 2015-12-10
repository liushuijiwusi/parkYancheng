var user = {
    alt: function (str) {
        closedShowMsg();
        Alert.showMsg(str);
    },
    init: function (obj) {
        if ($('#right_con > #action_title').size() < 1) {
            $('#right_con').html('<h1 class="title2 font24 color_3" id="action_title"></h1><div id="action_area"></div>');
        }
        user.closeloading();
        user.loading();
        if (obj) {
            switch (obj) {
                case 'info':
                    user.info();
                    break;
                case 'password':
                    user.password();
                    break;
                case 'paypassword':
                    user.paypassword();
                    break;
                case 'bill':
                    user.bill();
                    break;
                case 'consume':
                    user.consume();
                    break;
                case 'balance':
                    user.balance();
                    break;
                case 'recharge':
                    user.recharge();
                    break;
                case 'withdraw':
                    user.withdraw();
                    break;
                case 'order':
                    user.order();
                    break;
                case 'car':
                    user.car();
                    break;
                case 'monthcard':
                    user.monthcard();
                    break;
                case 'caradd':
                    user.caradd();
                    break;
                case 'reservation':
                    user.reservation();
                    break;
            } 
            window.location.hash = obj;
        }
    },
    closeloading: function () {
        Alert.closedLoading();
    },
    loading: function () {
        Alert.loading('right_contain', $('#right_contain').position().left, $('#right_contain').position().top, $('#right_contain').width(), $('#right_contain').height());
    },
    info: function () {
        user.init();
        $.ajax({
            type: 'Get',
            url: '/User/Info/',
            success: function (data) {
                if (data.success == 1) {
                    user.closeloading();
                    $('#action_area').html( template('temp_info', data));
                    $('#action_title').html($('#temp_info').attr('title'));
                    user.info_setting();
                } else {
                    if (data.loginstatus != undefined && data.loginstatus == 'false') {
                        user.alt(data.msg);
                    } else
                        user.alt(data.msg);
                }
            },
            dataType: 'json'
        });
    },
    info_setting: function () {
        $('#info_form').submit(function () {
            if ($('#nickname').val() == '') {
                $('#nickname').focus();
                return false;
            }
            if ($('#info_btn').val() == '保存中') {
                return false;
            }
            $('#info_btn').val('保存中');
            $.ajax({
                type: 'PUT',
                url: '/User/Info/',
                data: $(this).serialize(),
                success: function (data) {
                    if (data.success == 1) {
                        user.alt('修改成功');
                    } else {
                        user.alt(data.msg);
                    }
                    $('#info_btn').val('保存修改');
                },
                dataType: 'json'
            });
            return false;
        });
    },

    password: function () {
        user.init();
        user.closeloading();
        $('#action_area').html(template('temp_password'), {});
        $('#action_title').html($('#temp_password').attr('title'));
        $('#password_form').submit(function () {
            if ($('#password_oldpassword').val() == '') {
                $('#password_oldpassword').focus();
                return false;
            }
            if ($('#password_newpassword').val() == '') {
                $('#password_newpassword').focus();
                return false;
            }
            if ($('#password_newpassword').val().length < 6) {
                user.alt('密码长度最少为6位');
                $('#password_newpassword').focus();
                return false;
            }
            if ($('#password_newpassword').val() != $('#password_surepassword').val()) {
                user.alt('两次输入的密码不一致');
                $('#password_surepassword').focus();
                return false;
            }
            if ($('#password_oldpassword').val() == $('#password_newpassword').val()) {
                user.alt('新密码和旧密码不能相同');
                $('#password_newpassword').focus();
                return false;
            }
            if ($('#password_btn').val() == '保存中') {
                return false;
            }
            $('#password_btn').val('保存中');
            $.ajax({
                type: 'PUT',
                url: '/User/Password/',
                data: $(this).serialize(),
                success: function (data) {
                    if (data.success == 1) {
                        $('#password_form')[0].reset();
                        user.alt('修改成功');
                    } else {
                        user.alt(data.msg);
                    }
                    $('#password_btn').val('保存修改');
                },
                dataType: 'json'
            });
            return false;
        });
    },
    paypassword: function () {
        user.init();
        user.closeloading();
        $('#action_area').html(template('temp_paypassword', userinfo));
        $('#action_title').html($('#temp_paypassword').attr('title')); 
        $('#paypassword_form').submit(function () {
            if (userinfo.paypwd == 'true') {
                if ($('#paypassword_oldpassword').val() == '') {
                    $('#paypassword_oldpassword').focus();
                    return false;
                }
            } else {
                if ($('#paypassword_loginpassword').val() == '') {
                    $('#paypassword_loginpassword').focus();
                    return false;
                }
            }
            if ($('#paypassword_newpassword').val() == '') {
                $('#paypassword_newpassword').focus();
                return false;
            }
            if ($('#paypassword_newpassword').val() != $('#paypassword_surepassword').val()) {
                user.alt('两次输入的密码不一致');
                $('#paypassword_surepassword').focus();
                return false;
            }
            if ($('#paypassword_oldpassword').val() == $('#paypassword_newpassword').val()) {
                user.alt('新密码和旧密码不能相同');
                $('#paypassword_newpassword').focus();
                return false;
            }
            if ($('#paypassword_btn').val() == '保存中') {
                return false;
            }
            $('#paypassword_btn').val('保存中');
            $.ajax({
                type: 'PUT',
                url: '/User/PayPassword/',
                data: $(this).serialize(),
                success: function (data) {
                    if (data.success == 1) {
                        $('#paypassword_form')[0].reset();
                        userinfo.paypwd = 'true';
                        user.alt('修改成功');
                    } else {
                        user.alt(data.msg);
                    }
                    $('#paypassword_btn').val('保存修改');
                },
                dataType: 'json'
            });
            return false;
        });

        $('#findpaypwd_a').click(function () {
            $('#action_area').html(template('temp_findpaypwd', {}));
            $('#action_title').html($('#temp_findpaypwd').attr('title'));

            var timeinterval;
            function startwaitcount(obj) {
                $('#' + obj).attr('disabled', 'disabled');
                timeinterval = window.setInterval(function (obj) {
                    return function () {
                        var v = $('#' + obj).attr('t');
                        if (v == undefined) v = 60;
                        v--;
                        if (v < 0) {
                            $('#' + obj).removeAttr('disabled t');
                            $('#' + obj).html($('#' + obj).attr('data-default-txt'));
                            $('#getCode').removeAttr('disabled');
                            window.clearInterval(timeinterval);
                        }
                        else {
                            $('#' + obj).attr('t', v);
                            $('#' + obj).html($('#' + obj).attr('data-text').replace('{s}', v));
                        }
                    }
                }(obj), 1000);
            }


            $('#findpaypwd_form').submit(function () {
                var step = $('#step').val();
                if (step == '1') {
                } else if (step == '2') {
                    if ($('#verify').val() == '') {
                        $('#verify').focus();
                        return false;
                    }
                    if ($('#verify').val().length != 5) {
                        alert('验证码不正确');
                        $('#verify').focus();
                        return false;
                    }
                } else if (step == '2') {
                    if ($('#password').val() == '') {
                        $('#password').focus();
                        return false;
                    }
                    if ($('#password').val() != $('#surepassword').val()) {
                        alert('两次输入的新密码不一致');
                        $('#surepassword').focus();
                        return false;
                    }
                }

                if ($('#findpaypwd_btn').val() == '处理中...') {
                    return false;
                }
                $('#findpaypwd_btn').val('处理中...');

                $.ajax({
                    type: 'POST',
                    url: '/user/findpaypwd/',
                    data: $('#findpaypwd_form').serialize(),
                    success: function (data) {
                        if (data.success == 1) {
                            if (step == "1") { 
                                $('#tr_verify').show();
                                $('#findpaypwd_btn').val('下一步');
                                $('#step').val('2');
                                $('#sendmobile').html(userinfo.mobile).parent().show();
                                startwaitcount('getmobileverify');
                            }
                            else if (step == "2") {
                                $('#tr_verify').hide();
                                $('#tr_password,#tr_surepassword').show();
                                $('#findpaypwd_btn').val('下一步');
                                $('#step').val('3');
                            }
                            else if (step == "3") {
                                alert('密码修改成功');
                                user.paypassword(); 
                            }
                        } else {
                            alert(data.msg);
                            $('#findpaypwd_btn').val('下一步');
                        }
                    },
                    dataType: 'json'
                });
                return false;
            })
            $('#getmobileverify').click(function () {
                if ($(this).attr('disabled') == 'disabled') return false;
                $(this).attr('disabled', 'disabled');

                $.ajax({
                    type: 'POST',
                    url: '/user/findpaypwd/',
                    data: { step: 1 },
                    success: function (data) {
                        if (data.success == 1) {
                            startwaitcount('getmobileverify');
                            $('#step').val('2');
                            $('#sendmobile').html(userinfo.mobile).parent().show();
                            $('#verify').show();
                            $('#getmobileverify').removeAttr('disabled');
                        } else {
                            alert(data.msg);
                        }
                    },
                    dataType: 'json'
                });
                return false;
            })
            //$('#getmobileverify').click();
        })
    },
    recharge: function () {
        user.init();
        user.closeloading();

        $('#action_area').html(template('temp_recharge', null));
        $('#action_title').html($('#temp_recharge').attr('title'));


        $('#recharge_form').submit(function () {
            if ($('#recharge_money').val() == '' || isNaN($('#recharge_money').val()) || parseFloat($('#recharge_money').val()) <= 0) {
                user.alt('请输入充值金额');
                return false;
            }
            if ($('#recharge_btn').val() == '充值中') {
                return false;
            }
            $('#recharge_btn').val('充值中');
            $.ajax({
                type: 'POST',
                url: '/User/Recharge/',
                data: $(this).serialize(),
                success: function (data) {
                    if (data.success == 1) {
                        if ($('input[name=paytype]:checked').val() == 'weixin') {
                            $('.container').one('click', function () {
                                $('#pay_ewm').hide();
                            })
                            var ewm = $('#pay_ewm');
                            if (ewm.size() < 1) {
                                $(document.body).append('<div id="pay_ewm" style="width:300px; height:340px; padding:10px; background:#fff;position: absolute;text-align: center; border:1px solid #ccc"></div>');
                                ewm = $('#pay_ewm');
                                ewm.css({ 'left': ($(window).width() - 340) / 2, 'top': ($(window).height() - 330) / 2 })
                            }
                            var poid = $(this).attr('poid');
                            ewm.html('<img src="' + data.url + '" width="300" height="300" />微信扫码支付').show();
                            ewm.click(function () {
                                return false;
                            })
                        }
                        else {
                            var winname = window.open('', "_blank", '');
                            winname.document.open('text/html', 'replace');
                            winname.opener = null
                            winname.document.write('<script>window.location.href="' + data.url + '"</script>');
                            winname.document.close();

                            Alert.showConfirmMsg('充值成功？', function () {
                                user.balance();
                            }, function () {
                                Alert.show3sMsg('充值失败，请联系客服');
                                user.recharge();
                            }, '充值成功', '遇到问题');
                        }
                    } else {
                        user.alt(data.msg);
                    }
                    $('#recharge_btn').val('立即充值');
                },
                dataType: 'json'
            });
            return false;
        });
    },
    withdraw: function () {
        user.init();
        user.closeloading();

        $.ajax({
            type: 'Get',
            url: '/User/Balance/',
            success: function (data) {
                user.withdrawlist();
                if (data.success == 1) {
                    user.closeloading();
                    $('#action_area').html(template('temp_withdraw', data));
                    $('#action_title').html($('#temp_withdraw').attr('title'));
                    window.balance = data.balance;
                    $('#withdraw_form').submit(function () {
                        if ($('#withdraw_money').val() == '' || isNaN($('#withdraw_money').val()) || parseFloat($('#withdraw_money').val()) <= 0) {
                            user.alt('请输入提现金额');
                            return false;
                        }
                        if (parseFloat($('#withdraw_money').val()) > window.balance) {
                            user.alt('输入的提现金额超出当前余额');
                            return false;
                        }
                        if ($('#withdraw_btn').val() == '提现中') {
                            return false;
                        }
                        $('#withdraw_btn').val('提现中');
                        $.ajax({
                            type: 'POST',
                            url: '/User/Withdraw/',
                            data: $(this).serialize(),
                            success: function (data) {
                                if (data.success == 1) {
                                    user.alt('提现成功，信息正在审核中');
                                } else {
                                    user.alt(data.msg);
                                }
                                $('#withdraw_btn').val('提现');
                            },
                            dataType: 'json'
                        });
                        return false;
                    });

                } else {
                    if (data.loginstatus != undefined && data.loginstatus == 'false') {
                        user.alt(data.msg);
                    } else
                        user.alt(data.msg);
                }
            },
            dataType: 'json'
        });
    },
    withdrawlist: function () {
        $.ajax({
            type: 'Get',
            url: '/User/Withdraw/',
            success: function (data) {



                user.withdrawlist_init(data);
            },
            dataType: 'json'
        });
    },
    withdrawlist_init: function (data) {
        if (data.success == 1) {
            user.closeloading();

            $('#withdraw_list').html(template('temp_withdrawlist', data));
             

            $("#pagerlist").pagination(data.total, {
                callback: PageCallback,  //PageCallback() 为翻页调用次函数。
                prev_text: "« 上一页",
                next_text: "下一页 »",
                items_per_page: data.pagesize,
                num_edge_entries: 2,       //两侧首尾分页条目数
                num_display_entries: 6,    //连续分页主体部分分页条目数
                current_page: data.pageno - 1,   //当前页索引
            });
            //翻页调用   
            function PageCallback(index, jq) {
                user.loading();
                $.ajax({
                    type: "GET",
                    url: '/User/Withdraw/',      //提交到一般处理程序请求数据   
                    data: "pageno=" + index,          //提交两个参数：pageIndex(页面索引)，pageSize(显示条数)   
                    success: function (data) {
                        user.withdrawlist_init(data);
                    },
                    dataType: "json"
                });
            }
        } else {
            if (data.loginstatus != undefined && data.loginstatus == 'false') {
                user.alt(data.msg);
            } else
                user.alt(data.msg);
        }
    },
    bill: function () {
        user.init();
        user.closeloading();
        $('#action_area').html(template('temp_bill', userinfo));
        $('#action_title').html($('#temp_bill').attr('title'));
    },
    consume: function () {
        user.init();
        $.ajax({
            type: 'Get',
            url: '/User/UserConsume/',
            success: function (data) {
                user.consume_init(data);
            },
            dataType: 'json'
        });
    },
    consume_init: function (data) {
        if (data.success == 1) {
            user.closeloading();
            $('#action_area').html(template('temp_consume', data));
            $('#action_title').html($('#temp_consume').attr('title'));

            $("#pagerlist").pagination(data.total, {
                callback: PageCallback,  //PageCallback() 为翻页调用次函数。
                prev_text: "« 上一页",
                next_text: "下一页 »",
                items_per_page: data.pagesize,
                num_edge_entries: 2,       //两侧首尾分页条目数
                num_display_entries: 6,    //连续分页主体部分分页条目数
                current_page: data.pageno - 1,   //当前页索引
            });
            //翻页调用   
            function PageCallback(index, jq) {
                user.loading();
                $.ajax({
                    type: "GET",
                    url: '/User/UserConsume/',      //提交到一般处理程序请求数据   
                    data: "pageno=" + index,          //提交两个参数：pageIndex(页面索引)，pageSize(显示条数)   
                    success: function (data) {
                        user.consume_init(data);
                    },
                    dataType: "json"
                });
            }
        } else {
            if (data.loginstatus != undefined && data.loginstatus == 'false') {
                user.alt(data.msg);
            } else
                user.alt(data.msg);
        }
    },
    balance: function () {
        user.init();
        $.ajax({
            type: 'Get',
            url: '/User/Bill/',
            success: function (data) {
                if (data.success == 1) {
                    $('#action_area').html(template('temp_balance', data));
                    $('#action_title').html($('#temp_balance').attr('title'));

                    user.bill_init(data);
                } else {
                    if (data.loginstatus != undefined && data.loginstatus == 'false') {
                        user.alt(data.msg);
                    } else
                        user.alt(data.msg);
                }
            },
            dataType: 'json'
        });
    },
    bill_init: function (data) {
        if (data.success == 1) {
            user.closeloading();

            $('#bill_list').html(template('temp_bill', data));
            window.bill_payed = data.payed;
            window.bill_billed = data.billed;
            $("#pagerlist").pagination(data.total, {
                callback: PageCallback,  //PageCallback() 为翻页调用次函数。
                prev_text: "« 上一页",
                next_text: "下一页 »",
                items_per_page: data.pagesize,
                num_edge_entries: 2,       //两侧首尾分页条目数
                num_display_entries: 6,    //连续分页主体部分分页条目数
                current_page: data.pageno - 1,   //当前页索引
            });
            //翻页调用   
            function PageCallback(index, jq) {
                user.loading();
                $.ajax({
                    type: "GET",
                    url: '/User/Bill/',      //提交到一般处理程序请求数据   
                    data: "pageno=" + index,          //提交两个参数：pageIndex(页面索引)，pageSize(显示条数)   
                    success: function (data) {
                        user.bill_init(data);
                    },
                    dataType: "json"
                });
            }

            $('#billadd_a').click(function () {
                $('#action_area').html(template('temp_billadd', data));
                $('#action_title').html($('#temp_billadd').attr('title'));


                initProCity(['Province', 'City', 'Area'], ['请选择省份', '请选择城市', '请选择片区'])

                $('#bill_form').submit(function () { 
                    if ($('#money').val() == '' || isNaN($('#money').val()) || parseFloat($('#money').val()) <= 0) {
                        user.alt('请输入票据金额');
                        $('#money').focus();
                        return false;
                    }
                    var money = parseFloat($('#money').val());
                    if (money > window.bill_payed - window.bill_billed) {
                        user.alt('输入的票据金额大于未开票据金额');
                        $('#truename').focus();
                        return false;
                    }
                    if ($('#truename').val().replace(/\s/ig,'') == '') {
                        user.alt('请输入收件人姓名');
                        $('#truename').focus();
                        return false;
                    }
                    if ($('#tel').val().replace(/\s/ig, '') == '') {
                        user.alt('请输入收件人电话');
                        $('#tel').focus();
                        return false;
                    }
                    if ($('#Province').val() == '' || $('#City').val() == '') {
                        user.alt('请选择省市区'); 
                        return false;
                    }
                    if ($('#address').val().replace(/\s/ig, '') == '') {
                        user.alt('请输入详细地址');
                        $('#address').focus();
                        return false;
                    }

                    if ($('#bill_btn').val() == '保存中') {
                        return false;
                    }
                    $('#bill_btn').val('保存中');
                    $.ajax({
                        type: 'POST',
                        url: '/User/Bill/',
                        data: $(this).serialize(),
                        success: function (data) {
                            if (data.success == 1) {
                                user.alt('票据提交成功');
                                user.balance();
                            } else {
                                user.alt(data.msg);
                            }
                            $('#bill_btn').val('申请票据');
                        },
                        dataType: 'json'
                    });
                    return false;
                });
            })

        } else {
            if (data.loginstatus != undefined && data.loginstatus == 'false') {
                user.alt(data.msg);
            } else
                user.alt(data.msg);
        }
    },
    order: function (car_info) {
        user.init();
        console.log(car_info);
        $.ajax({
            type: 'Get',
            url: '/Order/ParkingOrder/' + (car_info != undefined ? '?car_id=' + car_info.id : ''),
            success: function (data) {
                console.log(car_info);
                user.order_init(car_info,data);
            },
            dataType: 'json'
        });
    },
    order_init: function (car_info, data) {
        console.log(car_info);
        if (data.success == 1) {
            user.closeloading();
            $('#action_area').html(template('temp_order', data));
            $('#action_title').html($('#temp_order').attr('title'));
            if (car_info != undefined) {
                $('#action_title').html(car_info.carno + '的' + $('#action_title').html())
            }

            $('.xl_an').hover(function () {
                $(this).find('ul').css({ 'z-index': '9999' }).slideDown();
            }, function () {
                $(this).find('ul').css({ 'z-index': '0' }).slideUp();
            });

            user.bindpayandlock();

            $("#pagerlist").pagination(data.total, {
                callback: PageCallback,  //PageCallback() 为翻页调用次函数。
                prev_text: "« 上一页",
                next_text: "下一页 »",
                items_per_page: data.pagesize,
                num_edge_entries: 2,       //两侧首尾分页条目数
                num_display_entries: 6,    //连续分页主体部分分页条目数
                current_page: data.pageno - 1,   //当前页索引
            });
            //翻页调用   
            function PageCallback(index, jq) {
                user.loading();
                $.ajax({
                    type: "GET",
                    url: '/Order/ParkingOrder/' + (car_info != undefined ? '?car_id=' + car_info.id : ''),    //提交到一般处理程序请求数据   
                    data: "pageno=" + index,          //提交两个参数：pageIndex(页面索引)，pageSize(显示条数)   
                    success: function (data) {
                        user.order_init(car_info,data);
                    },
                    dataType: "json"
                });
            }
        } else {
            if (data.loginstatus != undefined && data.loginstatus == 'false') {
                user.alt(data.msg);
            } else
                user.alt(data.msg);
        }
    },
    bindpayandlock: function () {


        $('.tcsf').hover(function () {
            $(this).data('ison', true);
            setTimeout(function (obj) {
                return function () {
                    if (obj.data('ison') != true) return;
                    var tinfo = obj.find('.tcsf_nr');
                    tinfo.css({ 'z-index': '9999' }).show();
                    var orderid = obj.attr('orderid');
                    if (tinfo.html() == '加载中。。。') {
                        return false;
                    }
                    else if (tinfo.html() == '') {
                        tinfo.html('加载中。。。');
                        $.ajax({
                            type: 'Get',
                            url: '/Order/ParkingOrder/' + orderid,
                            success: function (data) {
                                if (data.feelist.length < 1) {
                                    tinfo.html('未查询到收费标准');
                                }
                                else {
                                    tinfo.html('');
                                }
                                for (var i = 0; i < data.feelist.length; i++) {
                                    tinfo.append(data.feelist[i].title + ' ' + data.feelist[i].price + ' ' + data.feelist[i].unit + '<br />');
                                }
                            },
                            dataType: 'json'
                        });
                    }
                }
            }($(this)), 300);
        }, function () {
            $(this).find('.tcsf_nr').css({ 'z-index': '0' }).hide();
            $(this).data('ison', false);
        });

        $('.pay_a').click(function () {
            $('#select_paytype').remove();
            $(this).html('处理中');
            window.poid = $(this).attr('poid');

            $(document.body).append('<div id="select_paytype" style="width:400px; height:300px; padding:10px; background:#fff;position: absolute;text-align: center; border:1px solid #ccc"><h1 class="title2 font24 color_3" id="action_title">选择支付类型</h1><div style="padding:25px 0 25px 0"><label><input type="radio" name="paytype" checked value="balance" checked />余额支付</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label><input type="radio" name="paytype" value="alipay" />支付宝</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label><input type="radio" name="paytype" value="weixin" />微信支付</label><div style="padding:25px 0 0 0"><input type="password" name="paypassword" id="paypassword"  placeholder="支付密码" class="input_a w280" maxlength="6" /></div></div><div><input class="but_a back_green color_f font18 radius_3 pointer" style="width:80%; margin:0 auto" type="button" id="pay_btn" value="立即支付"></div></div>');

            $('.container').one('click', function () {
                $('#select_paytype').remove();
                $('.pay_a[poid=' + poid + ']').html('支付');
                window.poid = 0;
            })
            $('input[name=paytype]').click(function () {
                if ($(this).val() == 'balance') {
                    $('#paypassword').parent().show();
                } else {
                    $('#paypassword').parent().hide();
                }
            })
            $('#select_paytype').css({ 'left': ($(window).width() - 420) / 2, 'top': ($(window).height() - 300) / 2 })
            $('#select_paytype div').click(function (e) {
                event.stopPropagation();
            })
            $('#pay_btn').click(function () {
                if ($('#select_paytype input[name=paytype]:checked').size() < 1) {
                    alert('请选择一种支付方式');
                    return false;
                }
                if ($('#select_paytype input[name=paytype]:checked').val() == 'balance' && $('#paypassword').val().replace(/\s/ig, '') == '') {
                    alert('请输入支付密码');
                    return false;
                }
                if ($('#pay_btn').val() == '支付中') {
                    return false;
                }
                $('#pay_btn').val('支付中');
                $.ajax({
                    type: 'POST',
                    url: '/Order/Pay/' + window.poid,
                    data: { paytype: $('#select_paytype input[name=paytype]:checked').val(), paypassword: $('#paypassword').val() },
                    success: function (data) {
                        var poid = window.poid;
                        if (data.success == 1) {
                            var paytype = $('input[name=paytype]:checked').val();
                            if (paytype == 'weixin') {
                                $('.container').one('click', function () {
                                    $('#pay_ewm').hide();
                                })
                                var ewm = $('#pay_ewm');
                                if (ewm.size() < 1) {
                                    $(document.body).append('<div id="pay_ewm" style="width:300px; height:340px; padding:10px; background:#fff;position: absolute;text-align: center; border:1px solid #ccc"></div>');
                                    ewm = $('#pay_ewm');
                                    ewm.css({ 'left': ($(window).width() - 340) / 2, 'top': ($(window).height() - 330) / 2 })
                                }
                                ewm.html('<img src="' + data.url + '" width="300" height="300" />微信扫码支付').show();
                                ewm.click(function () {
                                    return false;
                                })
                                $('#select_paytype').remove();
                            }
                            else if (paytype == 'alipay') {
                                var winname = window.open('', "_blank", '');
                                winname.document.open('text/html', 'replace');
                                winname.opener = null
                                winname.document.write('<script>window.location.href="' + data.url + '"</script>');
                                winname.document.close();

                                Alert.showConfirmMsg('支付成功？', function () {
                                    user.order();
                                }, function () {
                                    Alert.show3sMsg('支付失败，请联系客服');
                                }, '支付成功', '遇到问题');
                                $('#select_paytype').remove();
                            } else {
                                $('#select_paytype').remove();
                                user.alt('支付成功');
                                user.order();
                            }
                        } else {
                            user.alt(data.msg);
                        }
                        $('.pay_a[poid=' + poid + ']').html('支付');
                        $('#pay_btn').val('立即支付');
                    },
                    dataType: 'json'
                });
            })

            return false;
        })

        $('.lock_a').click(function () {
            var carno = $(this).attr('carno');
            var thtml = $(this).html();
            user.loading();
            $.ajax({
                type: 'POST',
                url: '/Order/' + (thtml == '锁车' ? 'lock' : 'unlock'),
                data: { carno: carno },
                success: function (data) {
                    if (data.success == 1) {
                        user.closeloading();
                        var trobj = $('.lock_a[poid=' + data.id + ']');
                        var thtml = trobj.html();
                        user.alt(thtml + '成功');
                        trobj.html(thtml == '锁车' ? '解锁' : '锁车');
                        if (thtml == '锁车') {
                            trobj.addClass('back_orange').removeClass('back_green');
                        } else {
                            trobj.removeClass('back_orange').addClass('back_green');
                        }
                    } else {
                        if (data.loginstatus != undefined && data.loginstatus == 'false') {
                            user.alt(data.msg);
                        } else
                            user.alt(data.msg);
                    }
                },
                dataType: 'json'
            });
            return false;
        })

    },
    reservation: function () {
        user.init();
        $.ajax({
            type: 'Get',
            url: '/Order/Reservation/',
            success: function (data) {
                user.reservation_init(data);
            },
            dataType: 'json'
        });
    },
    reservation_init: function (data) {

        if (data.success == 1) {
            user.closeloading();
            $('#action_area').html(template('temp_reservation', data));
            $('#action_title').html($('#temp_reservation').attr('title'));

            $("#pagerlist").pagination(data.total, {
                callback: PageCallback,  //PageCallback() 为翻页调用次函数。
                prev_text: "« 上一页",
                next_text: "下一页 »",
                items_per_page: data.pagesize,
                num_edge_entries: 2,       //两侧首尾分页条目数
                num_display_entries: 6,    //连续分页主体部分分页条目数
                current_page: data.pageno - 1,   //当前页索引
            });
            //翻页调用   
            function PageCallback(index, jq) {
                user.loading();
                $.ajax({
                    type: "GET",
                    url: '/Order/Reservation/',   //提交到一般处理程序请求数据   
                    data: "pageno=" + index,          //提交两个参数：pageIndex(页面索引)，pageSize(显示条数)   
                    success: function (data) {
                        user.reservation_init(data);
                    },
                    dataType: "json"
                });
            }
        } else {
            if (data.loginstatus != undefined && data.loginstatus == 'false') {
                user.alt(data.msg);
            } else
                user.alt(data.msg);
        }
    },
    car: function () {
        user.init();
        $.ajax({
            type: 'Get',
            url: '/User/Car/',
            success: function (data) {
                user.car_init(data);
            },
            dataType: 'json'
        });
    },
    car_init: function (data) {
        if (data.success == 1) {
            if (data.success == 1) {
                user.closeloading();
                $('#action_area').html(template('temp_car', data));
                $('#action_title').html($('#temp_car').attr('title'));
                window.car_list = data;
                $('.del_car').click(function () {
                    var car_id = $(this).attr('car_id');
                    window.car_id = car_id;
                    Alert.showConfirmMsg('确定要删除该车辆信息吗？', function () {
                        var car_id = window.car_id;
                        user.loading();
                        $.ajax({
                            type: 'DELETE',
                            url: '/User/Car/' + car_id,
                            success: function (data) {
                                user.closeloading();
                                if (data.success == 1) {
                                    $('#tr_car_' + car_id).remove();
                                } else {
                                    user.alt(data.msg);
                                }
                            },
                            dataType: 'json'
                        });
                    })
                });

                $('.vieworder').click(function () {
                    var car_index = $(this).attr('car_index');
                    user.order(window.car_list.list[car_index]);
                    return false;
                });

                $('.rereg').click(function () {
                    var car_id = $(this).attr('car_id');
                    user.caredit(car_id);
                    return false;
                });
                 

            } else {
                if (data.loginstatus != undefined && data.loginstatus == 'false') {
                    user.alt(data.msg);
                } else
                    user.alt(data.msg);
            }

            $("#pagerlist").pagination(data.total, {
                callback: PageCallback,  //PageCallback() 为翻页调用次函数。
                prev_text: "« 上一页",
                next_text: "下一页 »",
                items_per_page: data.pagesize,
                num_edge_entries: 2,       //两侧首尾分页条目数
                num_display_entries: 6,    //连续分页主体部分分页条目数
                current_page: data.pageno - 1,   //当前页索引
            });
            //翻页调用   
            function PageCallback(index, jq) {
                user.loading();
                $.ajax({
                    type: "GET",
                    url: '/User/Car/',      //提交到一般处理程序请求数据   
                    data: "pageno=" + index,          //提交两个参数：pageIndex(页面索引)，pageSize(显示条数)   
                    success: function (data) {
                        user.car_init(data);
                    },
                    dataType: "json"
                });
            }
        } else {
            if (data.loginstatus != undefined && data.loginstatus == 'false') {
                user.alt(data.msg);
            } else
                user.alt(data.msg);
        }
    },
    caradd: function (data) {
        user.init();
        user.closeloading();
        $('#action_area').html(template('temp_caradd', data));
        $('#action_title').html($('#temp_caradd').attr('title'));




        var reg_car_no_pattern = /^[\u4e00-\u9fa5]{1}[A-Za-z]{1}[A-Za-z_0-9]{5}$/;
        function checkCardNo(carNo) {
            if (carNo.search(reg_car_no_pattern) == -1) {
                alert('车牌号码不正确');
                return false;
            } else {
                return true;
            }
        }
         
            //
            $("body").click(function () {
                $(".cp_pull").hide();
                $("body").height("auto");
                $(".cp_pai").find("i").html("▼");
            });
            $(".cp_pull").click(function (event) {
                event.stopPropagation();
            });
            $(".cp_pai").click(function (event) {
                if ($(this).find("i").html() == "▼") {
                    $(this).find("i").html("▲");
                } else {
                    $(this).find("i").html("▼");
                };
                $("#pull_word").hide();
                pullpos();
                $("#pull_city").toggle();
                event.stopPropagation();
            });

            $("#pull_city li,.dqxz span").each(
                function (index, item) {
                    if ($(this).html() == $("#cp_pai span:nth-child(1)").html()) $(item).addClass('cur');
                }
            );
            $("#pull_word li,.dqxz span").each(
                function (index, item) {
                    if ($(this).html() == $("#cp_pai span:nth-child(2)").html()) $(item).addClass('cur');
                }
            );
            $("#pull_city li,.dqxz span").click(function (event) {
                $(this).addClass("cur").siblings().removeClass("cur");
                $("#pull_city").hide();
                $("#pull_word").show();
                $("#cp_pai span:nth-child(1)").html($(this).html());
                $('#cp_pai_prefix').val($(this).html());
            });
            $("#pull_word li").click(function (event) {
                $(this).addClass("cur").siblings().removeClass("cur");
                $(".cp_pull").hide();
                $("body").height("auto");
                $("#cp_pai span:nth-child(2)").html($(this).html());
                $(".cp_pai").find("i").html("▼");
                $('#cp_pai_prefix').val($('#cp_pai_prefix').val() + $(this).html());
            });

            //单选操作
            $(".radiolist li").click(function (e) {
                if (!$(e.target).hasClass("a_del")) {
                    $(this).addClass("cur").siblings().removeClass("cur");
                    try { $('.one_btn').show(); } catch (ex) { }
                }
            });


            function pullpos() {
                var postop = $(".searchbar").offset().top;
                $(".cp_pull").css("top", 76);
                //$("body").height(postop+500).scrollTop(postop-10);	//页面补高
            }

        


        $('#cp_pai_suffix').on('keyup', function (e) {
            $(this).val($(this).val().trim());
        });
        $('#cp_pai_suffix').on('blur', function (e) {
            $('.cp_btn a').addClass('gray');
        });
        $('#cp_pai_suffix').on('focus', function (e) {
            $('.cp_btn a').removeClass('gray');
        });
        $('.cp_btn').bind("click", function () {
            var carNo = ($("#cp_pai span:nth-child(1)").html() + $("#cp_pai span:nth-child(2)").html() + $('#cp_pai_suffix').val()).toUpperCase();
            if (!checkCardNo(carNo)) {
                return;
            }
            if ($('.cp_btn > a').html() == '保存中') {
                return false;
            }
            $('.cp_btn > a').html('保存中');
            $.ajax({
                type: 'POST',
                url: '/User/Car/',
                data: { carNo: carNo, },
                success: function (data) {
                    $('.cp_btn > a').html('添加');
                    if (data.success == 1) {
                        user.car();
                    }
                    else {
                        if (data.exist == 0) {
                            alert(data.msg);
                        }
                        else {
                            var ss = confirm("该车辆已被其他人添加，是否申诉");
                            if (ss) {
                                user.caradd_1(carNo);
                            }
                        }
                    }
                },
                dataType: 'json'
            });

        });




















        return false;
        $('#caradd_form').submit(function () {
            if ($('#driving_fileid').val() == '' || $('#driving_fileid').val() == '0') {
                user.alt('请上传行驶证');
                return false;
            }
            if ($('#caradd_btn').val() == '保存中') {
                return false;
            }
            $('#caradd_btn').val('保存中');
            $.ajax({
                type: 'POST',
                url: '/User/Car/',
                data: $(this).serialize(),
                success: function (data) {
                    if (data.success == 1) {
                        user.alt('添加成功');
                        user.car();
                    } else {
                        user.alt(data.msg);
                    }
                    $('#caradd_btn').val('添加车辆');
                },
                dataType: 'json'
            });
            return false;
        });
        $("#upload_car").uploadify({
            buttonText: '点击上传',
            buttonClass: 'but_c',
            swf: '/content/uploadify/uploadify.swf',
            uploader: 'http://upload.168parking.com/upload/car/',
            auto: true,
            multi: false,
            queueID: 'queue',
            fileTypeExts: '*.jpg;*.jpeg;*.bmp;*.gif;*.png;',
            fileTypeDesc: '请选择',
            fileObjName: 'filedata',
            formData: { uid: userid },
            onUploadProgress: function (file, bytesUploaded, bytesTotal, totalBytesUploaded, totalBytesTotal) {
                $('#upload_car_press').html(Math.ceil((bytesUploaded / bytesTotal) * 100) + '%');
            },
            onUploadSuccess: function (file, data, response) {
                eval('var d = ' + data);
                if (d.status == '1') {
                    $('#upload_car_img').html('<img src="' + d.url + '" width="300" /><br /><br /><a href="#" class="but_b back_green color_f font14" id="del_car_img">删除并重新上传</a>').show();
                    $("#upload_car").css({ height: '0', overflow: 'hidden' });
                    $('#driving_fileid').val(d.fileid);
                } else {
                    user.alt(d.msg);
                }
            },
            onQueueComplete: function (queueData) {
                $('#upload_car_press').html('');
            }
        });
    },
    caradd_1: function (carNo) {
        user.init();

        user.closeloading();

        $('#action_area').html(template('temp_caradd_1', null));
        $('#action_title').html($('#temp_caradd_1').attr('title'));
         



        var uploadifycar = $("#upload_car").uploadify({
            buttonText: '点击上传',
            buttonClass: 'but_c',
            swf: '/content/uploadify/uploadify.swf',
            uploader: 'http://upload.168parking.com/upload/carappeal/',
            auto: false,
            multi: false,
            queueID: 'queue',
            fileTypeExts: '*.jpg;*.jpeg;*.bmp;*.gif;*.png;',
            fileTypeDesc: '请选择',
            fileObjName: 'filedata',
            formData: { uid: userid, carno: carNo },
            onSelect: function (file) {
                $('#upload_car').css({ 'height': '0', 'overflow': 'hidden' });
                $('#selectfile').html(file.name + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" id="del_car_file">删除</a>');
                $('#del_car_file').click(function () {
                    $('#upload_car').css({ 'height': 'auto', 'overflow': 'auto' });
                    $('#selectfile').html('');
                    return false;
                })
            },
            //
            onUploadProgress: function (file, bytesUploaded, bytesTotal, totalBytesUploaded, totalBytesTotal) {
                $('#upload_car_press').html(Math.ceil((bytesUploaded / bytesTotal) * 100) + '%');
            },
            onUploadSuccess: function (file, data, response) {
                eval('var d = ' + data);
                if (d.status == '1') {
                    alert('您的验证资料提交成功，我们立即处理');
                    user.car();
                } else {
                    user.alt(d.msg);
                }
            },
            onQueueComplete: function (queueData) {
                $('#upload_car_press').html('');
            }
        });

        $('#ss_carno').html(carNo);
        $('#caradd_btn').click(function () {
            if ($('#caradd_btn').val() == '提交中') {
                return false;
            }
            $('#caradd_btn').val('提交中');
            $("#upload_car").uploadify('upload',''); 

            return false;
        })

    },
    caredit: function (id) {
        user.init();
        window.car_id = id;
        $.ajax({
            type: 'GET',
            url: '/User/Car/' + id,
            data: {},
            success: function (data) {
                user.closeloading();
                if (data.success == 1) {
                    if (data.status < 2 || data.status == 4) {
                        user.alt('行驶证正在审核中');
                        return;
                    } else if (data.status == 5) {
                        user.alt('行驶证已被禁用');
                        return;
                    } else if (data.status == 88 || data.status == 99) {
                        user.alt('行驶证不存在');
                        return;
                    }

                    $('#action_area').html(template('temp_caradd', data));
                    $('#action_title').html($('#temp_caradd').attr('title'));
                    if (data.status == 3) {
                        $('#caradd_form').submit(function () {
                            if ($('#driving_fileid').val() == '' || $('#driving_fileid').val() == '0') {
                                user.alt('请上传新的行驶证');
                                return false;
                            }
                            if ($('#caradd_btn').val() == '保存中') {
                                return false;
                            }
                            $('#caradd_btn').val('保存中');
                            $.ajax({
                                type: 'PUT',
                                url: '/User/Car/' + window.car_id,
                                data: $(this).serialize(),
                                success: function (data) {
                                    if (data.success == 1) {
                                        user.alt('修改成功');
                                        user.car();
                                    } else {
                                        user.alt(data.msg);
                                    }
                                    $('#caradd_btn').val('修改');
                                },
                                dataType: 'json'
                            });
                            return false;
                        });
                        $("#upload_car").uploadify({
                            buttonText: '点击上传',
                            buttonClass: 'but_c',
                            swf: '/content/uploadify/uploadify.swf',
                            uploader: 'http://upload.168parking.com/upload/car/',
                            auto: true,
                            multi: false,
                            queueID: 'queue',
                            fileTypeExts: '*.jpg;*.jpeg;*.bmp;*.gif;*.png;',
                            fileTypeDesc: '请选择',
                            fileObjName: 'filedata',
                            formData: { uid: userid },
                            onUploadProgress: function (file, bytesUploaded, bytesTotal, totalBytesUploaded, totalBytesTotal) {
                                $('#upload_car_press').html(Math.ceil((bytesUploaded / bytesTotal) * 100) + '%');
                            },
                            onUploadSuccess: function (file, data, response) {
                                eval('var d = ' + data);
                                if (d.status == '1') {
                                    $('#upload_car_img').html('<img src="' + d.url + '" width="300" /><br /><br /><a href="#" class="but_b back_green color_f font14" id="del_car_img">删除并重新上传</a>').show();
                                    $("#upload_car").css({ height: '0', overflow: 'hidden' });
                                    $('#driving_fileid').val(d.fileid);
                                } else {
                                    user.alt(d.code);
                                }
                            },
                            onQueueComplete: function (queueData) {
                                $('#upload_car_press').html('');
                            }
                        });
                        if (data.driving_fileid > 0) {
                            $('#upload_car_img').html('<img src="' + data.driving_file + '" width="300" /><br /><br /><a href="#" class="but_b back_green color_f font14" id="del_car_img">删除并重新上传</a>').show();
                            $("#upload_car").css({ height: '0', overflow: 'hidden' });
                        }
                        $('#caradd_btn').val('修改');
                    } else {
                        $('#caradd_btn').val('删除车辆');
                        $('#caradd_form').submit(function () {
                            Alert.showConfirmMsg('确定要删除该车辆信息吗？', function () {
                                if ($('#caradd_btn').val() == '删除中') {
                                    return false;
                                }
                                $('#caradd_btn').val('删除中');
                                var car_id = window.car_id;
                                $.ajax({
                                    type: 'DELETE',
                                    url: '/User/Car/' + car_id,
                                    data: $(this).serialize(),
                                    success: function (data) {
                                        if (data.success == 1) {
                                            user.car();
                                        } else {
                                            user.alt(data.msg);
                                        }
                                        $('#caradd_btn').val('删除成功');
                                    },
                                    dataType: 'json'
                                });
                                return false;
                            })
                        });

                    }
                } else {
                    user.alt(data.msg);
                }
            },
            dataType: 'json'
        });

    },
    monthcard: function () {
        user.init();
        $.ajax({
            type: 'Get',
            url: '/User/ParkingCard/',
            success: function (data) {
                user.monthcard_init(data);
            },
            dataType: 'json'
        });
    },
    monthcard_init: function (data) {
        if (data.success == 1) {
            if (data.success == 1) {
                user.closeloading();
                $('#action_area').html(template('temp_monthcard', data));
                $('#action_title').html($('#temp_monthcard').attr('title'));
                window.monthcard = data.list;
                $('.recharge_monthcard').click(function () {
                    $('#select_paytype').remove();
                    var cindex = $(this).attr('cardindex');
                    var cardid = window.monthcard[cindex].id;

                    var monthlist='<ul style="width:600px; margin:0 auto">';
                    for(var i=0;i<window.monthcard[cindex].monthlist.length;i++){
                        monthlist += '<li style="width:200px;float:left; text-align: left;"><label><input type="radio" name="parkingcardmonth" value="' + window.monthcard[cindex].monthlist[i].month + '" /> ' + window.monthcard[cindex].monthlist[i].price + '元/' + window.monthcard[cindex].monthlist[i].month + '个月</label></li>';
                    }
                    if (window.monthcard[cindex].monthlist.length < 1) {
                        monthlist += '<li>该停车场暂不支持月卡充值</li>';
                    }
                    monthlist+='</ul>';
                    $(document.body).append('<div id="select_paytype" style="width:800px; height:auto; padding:10px; background:#fff;position: absolute;text-align: center; border:1px solid #ccc"><h1 class="title2 font24 color_3" id="action_title">选择充值月数</h1><div style="padding:25px 0 25px 0">' + monthlist + '</div>' + (window.monthcard[cindex].monthlist.length > 0 ? '<h1 class="title2 font24 color_3" id="action_title">选择充值方式</h1><div style="padding:25px 0 25px 0"><label><input type="radio" name="paytype" checked value="balance" checked />余额支付</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label><input type="radio" name="paytype" value="alipay" />支付宝</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label><input type="radio" name="paytype" value="weixin" />微信支付</label><div style="padding:25px 0 0 0"><input type="password" name="paypassword" id="paypassword" maxlength="6"  placeholder="支付密码" class="input_a w280" /></div></div><div><input class="but_a back_green color_f font18 radius_3 pointer" style="width:80%; margin:0 auto" type="button" id="pay_btn" value="立即充值"></div>' : '') + '</div>');
                     

                    $('.container').one('click', function () {
                        $('#select_paytype').remove(); 
                        window.poid = 0;
                    })
                    $('input[name=paytype]').click(function () {
                        if ($(this).val() == 'balance') {
                            $('#paypassword').parent().show();
                        } else {
                            $('#paypassword').parent().hide();
                        }
                    })
                    $('input[name=parkingcardmonth]').first().attr('checked', true);
                    $('#select_paytype').css({ 'left': ($(window).width() - 820) / 2, 'top': ($(window).height() - $('#select_paytype').height()) / 2 })
                    $('#select_paytype div').click(function (e) {
                        event.stopPropagation();
                    })
                    $('#pay_btn').click(function () {
                        if ($('input[name=parkingcardmonth]:checked').size() < 1) {
                            alert('请选择充值的月份');
                            return false;
                        }
                        if ($('#select_paytype input[name=paytype]:checked').size() < 1) {
                            alert('请选择一种支付方式');
                            return false;
                        }
                        if ($('#select_paytype input[name=paytype]:checked').val() == 'balance' && $('#paypassword').val().replace(/\s/ig, '') == '') {
                            alert('请输入支付密码');
                            return false;
                        }
                        var month = $('input[name=parkingcardmonth]:checked').val();
                        if ($('#pay_btn').val() == '支付中') {
                            return false;
                        }
                        $('#pay_btn').val('支付中');
                        $.ajax({
                            type: 'POST',
                            url: '/User/ParkingCardRecharge/' + window.monthcard[cindex].id,
                            data: { paytype: $('#select_paytype input[name=paytype]:checked').val(), month: month, paypassword: $('#paypassword').val() },
                            success: function (data) {
                                var poid = window.poid;
                                if (data.success == 1) {
                                    var paytype = $('input[name=paytype]:checked').val();
                                    if (paytype == 'weixin') {
                                        $('.container').one('click', function () {
                                            $('#pay_ewm').hide();
                                        })
                                        var ewm = $('#pay_ewm');
                                        if (ewm.size() < 1) {
                                            $(document.body).append('<div id="pay_ewm" style="width:300px; height:340px; padding:10px; background:#fff;position: absolute;text-align: center; border:1px solid #ccc"></div>');
                                            ewm = $('#pay_ewm');
                                            ewm.css({ 'left': ($(window).width() - 340) / 2, 'top': ($(window).height() - 330) / 2 })
                                        }
                                        ewm.html('<img src="' + data.url + '" width="300" height="300" />微信扫码支付').show();
                                        ewm.click(function () {
                                            return false;
                                        })
                                        $('#select_paytype').remove();
                                    }
                                    else if (paytype == 'alipay') {
                                        var winname = window.open('', "_blank", '');
                                        winname.document.open('text/html', 'replace');
                                        winname.opener = null
                                        winname.document.write('<script>window.location.href="' + data.url + '"</script>');
                                        winname.document.close();

                                        Alert.showConfirmMsg('支付成功？', function () {
                                            user.monthcard();
                                        }, function () {
                                            Alert.show3sMsg('支付失败，请联系客服');
                                        }, '支付成功', '遇到问题');
                                        $('#select_paytype').remove();
                                    } else {
                                        $('#select_paytype').remove();
                                        user.alt('支付成功');
                                        user.monthcard();
                                    }
                                } else {
                                    user.alt(data.msg);
                                } 
                                $('#pay_btn').val('立即充值');
                            },
                            dataType: 'json'
                        });
                    });
                    return false;
                });
            } else {
                if (data.loginstatus != undefined && data.loginstatus == 'false') {
                    user.alt(data.msg);
                } else
                    user.alt(data.msg);
            }

            $("#pagerlist").pagination(data.total, {
                callback: PageCallback,  //PageCallback() 为翻页调用次函数。
                prev_text: "« 上一页",
                next_text: "下一页 »",
                items_per_page: data.pagesize,
                num_edge_entries: 2,       //两侧首尾分页条目数
                num_display_entries: 6,    //连续分页主体部分分页条目数
                current_page: data.pageno - 1,   //当前页索引
            });
            //翻页调用   
            function PageCallback(index, jq) {
                user.loading();
                $.ajax({
                    type: "GET",
                    url: '/User/ParkingCard/',      //提交到一般处理程序请求数据   
                    data: "pageno=" + index,          //提交两个参数：pageIndex(页面索引)，pageSize(显示条数)   
                    success: function (data) {
                        user.monthcard_init(data);
                    },
                    dataType: "json"
                });
            }
        } else {
            if (data.loginstatus != undefined && data.loginstatus == 'false') {
                user.alt(data.msg);
            } else
                user.alt(data.msg);
        }
    },
}
$('#left_head dd a').click(function () {
    var rel = $(this).attr('rel');
    $('#pay_ewm').hide();
    if (rel != undefined) {
        $('#left_head li').removeClass('on');
        $(this).parent().addClass('on');
        user.init(rel);

        return false;
    }
})
$('#left_head dt a').click(function () {
    if ($(this).parent().hasClass('on')) {
        $(this).parent().removeClass('on');
    } else {
        $(this).parent().addClass('on');
    }
    $('#pay_ewm').hide();
    $(this).parent().next('dd').toggle();
    return false;
})
$('#logout_btn').click(function () {
    if ($(this).val() == '退出中') {
        return false;
    }
    $(this).val('退出中');
    $.ajax({
        type: 'Get',
        url: '/Logout/?ajax=1',
        success: function (data) {
            if (data.success == 1) {
                window.location.href = '/login';
            } else {
                user.alt(data.msg);
            }
            $(this).val('退出登录');
        },
        dataType: 'json'
    });
})
$('body').on('click', '#recharge_a', function (e) {
    user.init('recharge');
    return false;
});
$('body').on('click', '#withdraw_a', function (e) {
    user.init('withdraw');
    return false;
});
$('body').on('click', '#order_a', function (e) {
    user.init('order');
    return false;
});
$('body').on('click', '#caradd_a', function (e) {
    user.init('caradd');
    return false;
});
$(document).on("click", '#del_car_img', function () {
    $('#upload_car_img').html('').hide();
    $("#upload_car").css({ height: 'auto', overflow: 'visible' });
    $('#driving_fileid').val('');
    return false;
});

var hash = window.location.hash.substring(1, window.location.hash.length);
if (hash != '') {
    user.init(hash);
    $('#left_head dd a').each(function () {
        var rel = $(this).attr('rel');
        if (rel == hash) {
            $('#left_head li').removeClass('on');
            $(this).parent().addClass('on');
            return false;
        }
    })
} else {
    user.loading();
    $.ajax({
        type: 'Get',
        url: '/Order/ParkingOrder/Homepage',
        success: function (data) {
            if (data.success == 1) {
                user.closeloading();
                $('#index_orderlist').html(template('temp_index_order', data));
                var parking_size = $('.par_rec_list .par_rec').size();
                if (parking_size > 1)
                    $('.par_rec_list .par_rec').css({ 'width': (parking_size < 4 ? 100 / parking_size : 33) + '%', 'float': 'left' });
                $('.par_rec_list .par_rec .stoptime span').each(function () {
                    var txt = $(this).html();
                    if (txt.indexOf('天') > -1) {
                        var txtarr = txt.split('天');
                        txt = '<h2>' + txtarr[0] + '天</h2>' + txtarr[1];
                    } else if (txt.indexOf('时') > -1) {
                        var txtarr = txt.split('时');
                        txt = '<h2>' + txtarr[0] + '时</h2>' + txtarr[1];
                    }
                    $(this).html(txt);
                })


                $('.xl_an').hover(function () {
                    $(this).find('ul').css({ 'z-index': '9999' }).slideDown();
                }, function () {
                    $(this).find('ul').css({ 'z-index': '0' }).slideUp();
                });

                $('.tcsf').hover(function () {
                    $(this).find('.tcsf_nr').css({ 'z-index': '9999' }).show();
                }, function () {
                    $(this).find('.tcsf_nr').css({ 'z-index': '0' }).hide();
                });


                user.bindpayandlock();
                
            } else {
                if (data.loginstatus != undefined && data.loginstatus == 'false') {
                    user.alt(data.msg);
                } else
                    user.alt(data.msg);
            }
        },
        dataType: 'json'
    });
}
 
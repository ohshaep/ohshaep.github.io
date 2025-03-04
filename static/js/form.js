var yzbtn_id = '0';
var phone_id = '0';
var bdtype = '0';
var widths = 348;

var lang = '';
var gs = '用户的公司名称'; //用户公司
var namestr = ''; //用户姓名
var yx = ''; //用户邮箱
var qh = ''; //区号
var dh = ''; //电话号码
var mt = ''; //社媒账号
var msg = ''; //留言信息

var url = encodeURIComponent(location.href);
var eml = '';
var type = '';

var loading_url = 'https://us-loading.ctmon.net';
var tjmsg = {
  mag: '请填写信息',
  fail: '提交失败',
  success: '提交成功'
};
if (document.querySelector('.form.en')) {
  tjmsg = {
    mag: 'Please fill in the information',
    fail: 'Submission failed',
    success: 'succeeded'
  };
}
var silde = document.querySelector('.silde');
var rec = document.querySelector('.rec');
var rect = document.querySelector('.rect');
var img = document.querySelector('.yzimg');

$(function () {
  $('.form-btn').click(function () {
    namestr = $('input[name="username"]').val();
    yx = $('input[name="email"]').val();
    mt = $('input[name="whatsappId"]').val();
    qh = $('input[name="area_code"]').val();
    dh = $('input[name="mobile"]').val();
    msg = $('textarea[name="message"]').val();
    gs = $('input[name="company"]').val();

    $('.hkyztc').removeClass('on');
    Tjbd();
  });

  $('.hkyztc .gb ').click(function () {
    $('.hkyztc').removeClass('on');
    img.src = '../images/qj.png';
    silde.style.left = 0;
    rec.style.width = 0;
    document.getElementById('hktxt').innerText = 'Slider drag verification';
    rect.style.color = 'black';
  });

  if (!/windows phone|iphone|android/gi.test(window.navigator.userAgent)) {
    //pc
    // console.log('进入PC端');
    $('#m-hkyz').hide();
  } else {
    //h5
    // console.log('进入手机端');
    $('#hkyz').hide();
    $('#m-hkyz').show();
    yzbtn_id = 1;
    phone_id = 1;
  }

  $(function () {
    $('.m-yzm div').click(function () {
      var st = $('.m-yzmdiv-div .ipt1').val();
      $('.m-yzmdiv-div .ipt1').val(st + $(this).attr('data-id'));
    });
    $('#m-hkyz').click(function () {
      $('.m-yzmdiv').show();
    });
    $('.m-yzmdiv-div .ipt3').click(function () {
      $('.m-yzmdiv-div .ipt1').val('');
    });
  });
});

//表单验证
$(function () {
  $('button[name="submit"]').click(function () {
    namestr = $('input[name="b-username"]').val();
    yx = $('input[name="b-email"]').val();
    mt = $('input[name="whatsappId"]').val();
    qh = $('input[name="area_code"]').val();
    dh = $('input[name="b-mobile"]').val();
    msg = $('textarea[name="b-message"]').val();
    gs = $('input[name="b-company"]').val();

    var fields = [namestr, yx];
    var fieldNames = ['name', 'email'];
    for (var i = 0; i < fields.length; i++) {
      if (fields[i] === '' || fields[i].length < 2) {
        alert('please enter your ' + fieldNames[i] + '!');
        return;
      }
    }
    // $('.hkyztc').addClass('on');
    Tjbd();
  });
});

//提交信息
function Tjbd() {
  if (
    !$('input[name="username"]').val() ||
    !$('input[name="company"]').val() ||
    !$('input[name="email"]').val() ||
    !$('input[name="mobile"]').val() ||
    !$('textarea[name="message"]').val()
  ) {
    layer.msg(tjmsg.mag, {
      time: 2000
    });
    return;
  }
  // var custom_email = 'mygtsonic@gmail.com';
  var custom_email = 'business@astribot.com';
  //开始提交留言
  var body = {
    title: '客户留言',
    lang: 'en',
    company_name: gs,
    username: namestr,
    email: yx,
    mobile: qh + '@' + dh,
    whatsapp: mt, // whatsappId: mt,
    message: msg,
    url: url,
    custom_mail: custom_email, //客户邮箱
    custom_company: '固特英文',
    bc_mail_master: custom_email, // 客户邮箱
    bc_mail_slave: 'fengyuyuan@ctmon.cn',
    bc_mail_three: 'graysonx@163.com',
    bc_mail_three_name: '抄送人2',
    bc_mail_four: custom_email,
    bc_mail_four_name: '客户邮箱2'
  };
  $('.load-box').addClass('on');
  $(document).ready(function () {
    $.ajax({
      type: 'POST',
      url: loading_url,
      data: JSON.stringify(body),
      crossDomain: true,
      success: function (data) {
        $('.load-box').removeClass('on');
        setTimeout(function () {
          layer.msg(tjmsg.success);
        }, 100);
      },
      error: function (xhr, status, error) {
        layer.msg(tjmsg.fail);
      }
    });
  });
}

const areas = [
  { text: '中国', en: 'China', code: '+86', abbr3: 'CHN', abbr2: 'CN' },
  { text: '阿富汗', en: 'Afghanistan', code: '+93', abbr3: 'AFG', abbr2: 'AF' },
  {
    text: '阿尔巴尼亚',
    en: 'Albania',
    code: '+355',
    abbr3: 'ALB',
    abbr2: 'AL'
  },
  {
    text: '阿尔及利亚',
    en: 'Algeria',
    code: '+213',
    abbr3: 'DZA',
    abbr2: 'DZ'
  },
  { text: '安道尔', en: 'Andorra', code: '+376', abbr3: 'AND', abbr2: 'AD' },
  { text: '安哥拉', en: 'Angola', code: '+244', abbr3: 'AGO', abbr2: 'AO' },
  { text: '安圭拉', en: 'Anguilla', code: '+1264', abbr3: 'AIA', abbr2: 'AI' },
  {
    text: '阿森松岛',
    en: 'Ascension Island',
    code: '+247',
    abbr3: 'ASQ',
    abbr2: 'AC'
  },
  {
    text: '安提瓜和巴布达',
    en: 'Antigua and Barbuda',
    code: '+1268',
    abbr3: 'ATG',
    abbr2: 'AG'
  },
  { text: '阿根廷', en: 'Argentina', code: '+54', abbr3: 'ARG', abbr2: 'AR' },
  { text: '亚美尼亚', en: 'Armenia', code: '+374', abbr3: 'ARM', abbr2: 'AM' },
  { text: '阿鲁巴', en: 'Aruba', code: '+297', abbr3: 'ABW', abbr2: 'AW' },
  { text: '澳大利亚', en: 'Australia', code: '+61', abbr3: 'AUS', abbr2: 'AU' },
  { text: '奥地利', en: 'Austria', code: '+43', abbr3: 'AUT', abbr2: 'AT' },
  {
    text: '阿塞拜疆',
    en: 'Azerbaijan',
    code: '+994',
    abbr3: 'AZE',
    abbr2: 'AZ'
  },
  { text: '巴哈马', en: 'Bahamas', code: '+1242', abbr3: 'BHS', abbr2: 'BS' },
  { text: '巴林', en: 'Bahrain', code: '+973', abbr3: 'BHR', abbr2: 'BH' },
  {
    text: '孟加拉国',
    en: 'Bangladesh',
    code: '+880',
    abbr3: 'BGD',
    abbr2: 'BD'
  },
  {
    text: '巴巴多斯',
    en: 'Barbados',
    code: '+1246',
    abbr3: 'BRB',
    abbr2: 'BB'
  },
  { text: '白俄罗斯', en: 'Belarus', code: '+375', abbr3: 'BLR', abbr2: 'BY' },
  { text: '比利时', en: 'Belgium', code: '+32', abbr3: 'BEL', abbr2: 'BE' },
  { text: '伯利兹', en: 'Belize', code: '+501', abbr3: 'BLZ', abbr2: 'BZ' },
  { text: '贝宁', en: 'Benin', code: '+229', abbr3: 'BEN', abbr2: 'BJ' },
  { text: '百慕大', en: 'Bermuda', code: '+1441', abbr3: 'BMU', abbr2: 'BM' },
  { text: '不丹', en: 'Bhutan', code: '+975', abbr3: 'BTN', abbr2: 'BT' },
  { text: '玻利维亚', en: 'Bolivia', code: '+591', abbr3: 'BOL', abbr2: 'BO' },
  {
    text: '波斯尼亚和黑塞哥维那',
    en: 'Bosnia and Herzegovina',
    code: '+387',
    abbr3: 'BIH',
    abbr2: 'BA'
  },
  { text: '博茨瓦纳', en: 'Botwana', code: '+267', abbr3: 'BWA', abbr2: 'BW' },
  { text: '巴西', en: 'Brazill', code: '+55', abbr3: 'BRA', abbr2: 'BR' },
  { text: '文莱', en: 'Brunei', code: '+673', abbr3: 'BRN', abbr2: 'BN' },
  { text: '保加利亚', en: 'Bulgaria', code: '+359', abbr3: 'BGR', abbr2: 'BG' },
  {
    text: '布基纳法索',
    en: 'Burkina Faso',
    code: '+226',
    abbr3: 'BFA',
    abbr2: 'BF'
  },
  { text: '布隆迪', en: 'Burundi', code: '+257', abbr3: 'BDI', abbr2: 'BI' },
  { text: '柬埔寨', en: 'Cambodia', code: '+855', abbr3: 'KHM', abbr2: 'KH' },
  { text: '喀麦隆', en: 'Cameroon', code: '+237', abbr3: 'CMR', abbr2: 'CM' },
  { text: '加拿大', en: 'Canada', code: '+1', abbr3: 'CAN', abbr2: 'CA' },
  { text: '佛得角', en: 'Cape Verde', code: '+238', abbr3: 'CPV', abbr2: 'CV' },
  {
    text: '开曼群岛',
    en: 'Cayman Islands',
    code: '+1345',
    abbr3: 'CYM',
    abbr2: 'KY'
  },
  {
    text: '中非共和国',
    en: 'Central African Republic',
    code: '+236',
    abbr3: 'CAF',
    abbr2: 'CF'
  },
  { text: '乍得', en: 'Chad', code: '+235', abbr3: 'TCD', abbr2: 'TD' },
  { text: '智利', en: 'Chile', code: '+56', abbr3: 'CHL', abbr2: 'CL' },
  { text: '哥伦比亚', en: 'Colombia', code: '+57', abbr3: 'COL', abbr2: 'CO' },
  { text: '科摩罗', en: 'Comoros', code: '+269', abbr3: 'COM', abbr2: 'KM' },
  {
    text: '刚果共和国',
    en: 'Republic of the Congo',
    code: '+242',
    abbr3: 'COG',
    abbr2: 'CG'
  },
  {
    text: '刚果民主共和国',
    en: 'Democratic Republic of the Congo',
    code: '+243',
    abbr3: 'COD',
    abbr2: 'CD'
  },
  {
    text: '库克群岛',
    en: 'Cook Islands',
    code: '+682',
    abbr3: 'COK',
    abbr2: 'CK'
  },
  {
    text: '哥斯达黎加',
    en: 'Costa Rica',
    code: '+506',
    abbr3: 'CRI',
    abbr2: 'CR'
  },
  {
    text: '科特迪沃',
    en: 'Cote divoire',
    code: '+225',
    abbr3: 'CIV',
    abbr2: 'CI'
  },
  { text: '克罗地亚', en: 'Croatia', code: '+385', abbr3: 'HRV', abbr2: 'HR' },
  { text: '古巴', en: 'Cuba', code: '+53', abbr3: 'CUB', abbr2: 'CU' },
  { text: '塞浦路斯', en: 'Cyprus', code: '+357', abbr3: 'CYP', abbr2: 'CY' },
  {
    text: '捷克共和国',
    en: 'Czech Republic',
    code: '+420',
    abbr3: 'CZE',
    abbr2: 'CZ'
  },
  { text: '丹麦', en: 'Denmark', code: '+45', abbr3: 'DNK', abbr2: 'DK' },
  { text: '吉布提', en: 'Djibouti', code: '+253', abbr3: 'DJI', abbr2: 'DJ' },
  {
    text: '多米尼加',
    en: 'Dominica',
    code: '+1767',
    abbr3: 'DMA',
    abbr2: 'DM'
  },
  {
    text: '多米尼加共和国',
    en: 'Dominican Republic',
    code: '+1809',
    abbr3: 'DOM',
    abbr2: 'DO'
  },
  { text: '厄瓜多尔', en: 'Ecuador', code: '+593', abbr3: 'ECU', abbr2: 'EC' },
  { text: '埃及', en: 'Egypt', code: '+20', abbr3: 'EGY', abbr2: 'EG' },
  {
    text: '萨尔瓦多',
    en: 'EISalvador',
    code: '+503',
    abbr3: 'SLV',
    abbr2: 'SV'
  },
  { text: '爱沙尼亚', en: 'Estonia', code: '+372', abbr3: 'EST', abbr2: 'EE' },
  {
    text: '埃塞俄比亚',
    en: 'Ethiopia',
    code: '+251',
    abbr3: 'ETH',
    abbr2: 'ET'
  },
  {
    text: '法罗群岛',
    en: 'Faroe Islands',
    code: '+298',
    abbr3: 'FRO',
    abbr2: 'FO'
  },
  { text: '斐济', en: 'Fiji', code: '+679', abbr3: 'FJI', abbr2: 'FJ' },
  { text: '芬兰', en: 'Finland', code: '+358', abbr3: 'FIN', abbr2: 'FI' },
  { text: '法国', en: 'France', code: '+33', abbr3: 'FRA', abbr2: 'FR' },
  {
    text: '法属圭亚那',
    en: 'French Guiana',
    code: '+594',
    abbr3: 'GUF',
    abbr2: 'GF'
  },
  {
    text: '法属波利尼西亚',
    en: 'French Polynesia',
    code: '+689',
    abbr3: 'PYF',
    abbr2: 'PF'
  },
  { text: '加蓬', en: 'Gabon', code: '+241', abbr3: 'GAB', abbr2: 'GA' },
  { text: '冈比亚', en: 'Gambia', code: '+220', abbr3: 'GMB', abbr2: 'GM' },
  { text: '格鲁吉亚', en: 'Georgia', code: '+995', abbr3: 'GEO', abbr2: 'GE' },
  { text: '德国', en: 'Germany', code: '+94', abbr3: 'DEU', abbr2: 'DE' },
  { text: '加纳', en: 'Ghana', code: '+233', abbr3: 'GHA', abbr2: 'GH' },
  {
    text: '直布罗陀',
    en: 'Gibraltar',
    code: '+350',
    abbr3: 'GIB',
    abbr2: 'GI'
  },
  { text: '希腊', en: 'Greece', code: '+30', abbr3: 'GRC', abbr2: 'GR' },
  { text: '格陵兰', en: 'Greenland', code: '+299', abbr3: 'GRL', abbr2: 'GL' },
  { text: '格林纳达', en: 'Grenada', code: '+1473', abbr3: 'GRD', abbr2: 'GD' },
  {
    text: '瓜德罗普',
    en: 'Guadeloupe',
    code: '+590',
    abbr3: 'GLP',
    abbr2: 'GP'
  },
  { text: '关岛', en: 'Guam', code: '+1671', abbr3: 'GUM', abbr2: 'GU' },
  {
    text: '危地马拉',
    en: 'Guatemala',
    code: '+502',
    abbr3: 'GTM',
    abbr2: 'GT'
  },
  { text: '几内亚', en: 'Guinea', code: '+240', abbr3: 'GIN', abbr2: 'GN' },
  { text: '根西', en: 'Guernsey', code: '+44', abbr3: 'GGY', abbr2: 'GG' },
  { text: '几内亚', en: 'Guinea', code: '+224', abbr3: 'GIN', abbr2: 'GN' },
  { text: '圭亚那', en: 'Guyana', code: '+592', abbr3: 'GUY', abbr2: 'GY' },
  { text: '海地', en: 'Haiti', code: '+509', abbr3: 'HTI', abbr2: 'HT' },
  { text: '洪都拉斯', en: 'Honduras', code: '+504', abbr3: 'HND', abbr2: 'HN' },
  { text: '香港', en: 'Hong Kong', code: '+852', abbr3: 'HKG', abbr2: 'HK' },
  { text: '缅甸', en: 'Myanmar', code: '+95', abbr3: 'MMR', abbr2: 'MM' },
  { text: '匈牙利', en: 'Hungary', code: '+36', abbr3: 'HUN', abbr2: 'HU' },
  { text: '冰岛', en: 'Iceland', code: '+354', abbr3: 'ISL', abbr2: 'IS' },
  { text: '印度', en: 'Indea', code: '+91', abbr3: 'IND', abbr2: 'IN' },
  {
    text: '印度尼西亚',
    en: 'Indonesia',
    code: '+62',
    abbr3: 'IDN',
    abbr2: 'ID'
  },
  { text: '伊朗', en: 'Iran', code: '+98', abbr3: 'IRN', abbr2: 'IR' },
  { text: '伊拉克', en: 'Iraq', code: '+964', abbr3: 'IRQ', abbr2: 'IQ' },
  { text: '爱尔兰', en: 'Ireland', code: '+353', abbr3: 'IRL', abbr2: 'IE' },
  { text: '马恩岛', en: 'Isle of Man', code: '+44', abbr3: 'IMN', abbr2: 'IM' },
  { text: '以色列', en: 'Israel', code: '+972', abbr3: 'ISR', abbr2: 'IL' },
  { text: '意大利', en: 'Italy', code: '+93', abbr3: 'ITA', abbr2: 'IT' },
  { text: '牙买加', en: 'Jamaica', code: '+1876', abbr3: 'JAM', abbr2: 'JM' },
  { text: '日本', en: 'Japan', code: '+81', abbr3: 'JPN', abbr2: 'JP' },
  { text: '泽西岛', en: 'Jersey', code: '+44', abbr3: 'JEY', abbr2: 'JE' },
  { text: '约旦', en: 'Jordan', code: '+962', abbr3: 'JOR', abbr2: 'JO' },
  {
    text: '哈萨克斯坦',
    en: 'Kazeakhstan',
    code: '+7',
    abbr3: 'KAZ',
    abbr2: 'KZ'
  },
  { text: '肯尼亚', en: 'Kenya', code: '+254', abbr3: 'KEN', abbr2: 'KE' },
  { text: '科索沃', en: 'Kosovo', code: '+383', abbr3: 'XKX', abbr2: 'XK' },
  { text: '科威特', en: 'Kuwait', code: '+965', abbr3: 'KWT', abbr2: 'KW' },
  {
    text: '吉尔吉斯斯坦',
    en: 'Kyrgyzstan',
    code: '+996',
    abbr3: 'KGZ',
    abbr2: 'KG'
  },
  { text: '老挝', en: 'Laos', code: '+856', abbr3: 'LAO', abbr2: 'LA' },
  { text: '拉脱维亚', en: 'Latvia', code: '+371', abbr3: 'LVA', abbr2: 'LV' },
  { text: '黎巴嫩', en: 'Lebanon', code: '+961', abbr3: 'LBN', abbr2: 'LB' },
  { text: '莱索托', en: 'Lesotho', code: '+266', abbr3: 'LSO', abbr2: 'LS' },
  { text: '利比里亚', en: 'Liberia', code: '+231', abbr3: 'LBR', abbr2: 'LR' },
  { text: '利比亚', en: 'Libya', code: '+218', abbr3: 'LBY', abbr2: 'LY' },
  {
    text: '列支敦士登',
    en: 'Liechtenstein',
    code: '+423',
    abbr3: 'LIE',
    abbr2: 'LI'
  },
  { text: '立陶宛', en: 'Lithuania', code: '+370', abbr3: 'LTU', abbr2: 'LT' },
  { text: '卢森堡', en: 'Luxembourg', code: '+352', abbr3: 'LUX', abbr2: 'LU' },
  { text: '澳门', en: 'Macao', code: '+853', abbr3: 'MAC', abbr2: 'MO' },
  { text: '马其顿', en: 'Macedonia', code: '+389', abbr3: 'MKD', abbr2: 'MK' },
  {
    text: '马达加斯加',
    en: 'Madagascar',
    code: '+261',
    abbr3: 'MDG',
    abbr2: 'MG'
  },
  { text: '马拉维', en: 'Malawi', code: '+265', abbr3: 'MWI', abbr2: 'MW' },
  { text: '马来西亚', en: 'Malaysia', code: '+60', abbr3: 'MYS', abbr2: 'MY' },
  { text: '马尔代夫', en: 'Maldives', code: '+960', abbr3: 'MDV', abbr2: 'MV' },
  { text: '马里', en: 'Mali', code: '+223', abbr3: 'MLI', abbr2: 'ML' },
  { text: '马耳他', en: 'Malta', code: '+356', abbr3: 'MLT', abbr2: 'MT' },
  {
    text: '马提尼克',
    en: 'Martinique',
    code: '+596',
    abbr3: 'MTQ',
    abbr2: 'MQ'
  },
  {
    text: '毛里塔尼亚',
    en: 'Mauritania',
    code: '+222',
    abbr3: 'MRT',
    abbr2: 'MR'
  },
  {
    text: '毛里求斯',
    en: 'Mauritius',
    code: '+230',
    abbr3: 'MUS',
    abbr2: 'MU'
  },
  { text: '马约特', en: 'Mayotte', code: '+262', abbr3: 'MYT', abbr2: 'YT' },
  { text: '墨西哥', en: 'Mexico', code: '+52', abbr3: 'MEX', abbr2: 'MX' },
  { text: '摩尔多瓦', en: 'Moldova', code: '+373', abbr3: 'MDA', abbr2: 'MD' },
  { text: '摩纳哥', en: 'Monaco', code: '+377', abbr3: 'MCO', abbr2: 'MC' },
  { text: '蒙古', en: 'Mongolia', code: '+976', abbr3: 'MNG', abbr2: 'MN' },
  { text: '黑山', en: 'Montenegro', code: '+382', abbr3: 'MNE', abbr2: 'ME' },
  {
    text: '蒙特塞拉特',
    en: 'Montserrat',
    code: '+1664',
    abbr3: 'MSR',
    abbr2: 'MS'
  },
  { text: '摩洛哥', en: 'Morocco', code: '+212', abbr3: 'MAR', abbr2: 'MA' },
  {
    text: '莫桑比克',
    en: 'Mozambique',
    code: '+258',
    abbr3: 'MOZ',
    abbr2: 'MZ'
  },
  { text: '纳米比亚', en: 'Namibia', code: '+264', abbr3: 'NAM', abbr2: 'NA' },
  { text: '尼泊尔', en: 'Nepal', code: '+977', abbr3: 'NPL', abbr2: 'NP' },
  { text: '荷兰', en: 'Netherlands', code: '+31', abbr3: 'NLD', abbr2: 'NL' },
  {
    text: '荷属安的列斯',
    en: 'Netherlands Antillse',
    code: '+599',
    abbr3: 'ANT',
    abbr2: 'AN'
  },
  {
    text: '新喀里多尼亚',
    en: 'New Caledonia',
    code: '+687',
    abbr3: 'NCL',
    abbr2: 'NC'
  },
  { text: '新西兰', en: 'NewZealand', code: '+64', abbr3: 'NZL', abbr2: 'NZ' },
  {
    text: '尼加拉瓜',
    en: 'Nicaragua',
    code: '+505',
    abbr3: 'NIC',
    abbr2: 'NI'
  },
  { text: '尼日尔', en: 'Niger', code: '+227', abbr3: 'NER', abbr2: 'NE' },
  { text: '尼日利亚', en: 'Nigeria', code: '+234', abbr3: 'NGA', abbr2: 'NG' },
  { text: '挪威', en: 'Norway', code: '+47', abbr3: 'NOR', abbr2: 'NO' },
  { text: '阿曼', en: 'Oman', code: '+968', abbr3: 'OMN', abbr2: 'OM' },
  { text: '巴基斯坦', en: 'Pakistan', code: '+92', abbr3: 'PAK', abbr2: 'PK' },
  {
    text: '巴勒斯坦',
    en: 'Palestinian',
    code: '+970',
    abbr3: 'PSE',
    abbr2: 'PS'
  },
  { text: '巴拿马', en: 'Panama', code: '+507', abbr3: 'PAN', abbr2: 'PA' },
  {
    text: '巴布亚新几内亚',
    en: 'Papua New Guinea',
    code: '+675',
    abbr3: 'PNG',
    abbr2: 'PG'
  },
  { text: '巴拉圭', en: 'Paraguay', code: '+595', abbr3: 'PRY', abbr2: 'PY' },
  { text: '秘鲁', en: 'Peru', code: '+51', abbr3: 'PER', abbr2: 'PE' },
  { text: '菲律宾', en: 'Philippines', code: '+63', abbr3: 'PHL', abbr2: 'PH' },
  { text: '波兰', en: 'Poland', code: '+48', abbr3: 'POL', abbr2: 'PL' },
  { text: '葡萄牙', en: 'Portugal', code: '+351', abbr3: 'PRT', abbr2: 'PT' },
  { text: '波多黎各', en: 'PuertoRico', code: '+1', abbr3: 'PUR', abbr2: 'PR' },
  { text: '卡塔尔', en: 'Qatar', code: '+974', abbr3: 'QAT', abbr2: 'QA' },
  { text: '留尼汪', en: 'Reunion', code: '+262', abbr3: 'REU', abbr2: 'RE' },
  { text: '罗马尼亚', en: 'Romania', code: '+40', abbr3: 'ROU', abbr2: 'RO' },
  { text: '俄罗斯', en: 'Russia', code: '+7', abbr3: 'RUS', abbr2: 'RU' },
  { text: '卢旺达', en: 'Rwanda', code: '+250', abbr3: 'RWA', abbr2: 'RW' },
  {
    text: '萨摩亚东部',
    en: 'Samoa Eastern',
    code: '+684',
    abbr3: 'AAU',
    abbr2: 'AS'
  },
  {
    text: '萨摩亚西部',
    en: 'Samoa Western',
    code: '+685',
    abbr3: 'WSM',
    abbr2: 'WS'
  },
  {
    text: '圣马力诺',
    en: 'San Marino',
    code: '+378',
    abbr3: 'SMR',
    abbr2: 'SM'
  },
  {
    text: '圣多美和普林西比',
    en: 'Sao Tome and Principe',
    code: '+239',
    abbr3: 'STP',
    abbr2: 'ST'
  },
  {
    text: '沙特阿拉伯',
    en: 'Saudi Arabia',
    code: '+966',
    abbr3: 'SAU',
    abbr2: 'SA'
  },
  { text: '塞内加尔', en: 'Senegal', code: '+221', abbr3: 'SEN', abbr2: 'SN' },
  { text: '塞尔维亚', en: 'Serbia', code: '+381', abbr3: 'SRB', abbr2: 'RS' },
  { text: '塞舌尔', en: 'Seychelles', code: '+248', abbr3: 'SYC', abbr2: 'SC' },
  {
    text: '塞拉利昂',
    en: 'Sierra Leone',
    code: '+232',
    abbr3: 'SLE',
    abbr2: 'SL'
  },
  { text: '新加坡', en: 'Singapore', code: '+65', abbr3: 'SGP', abbr2: 'SG' },
  { text: '斯洛伐克', en: 'Slovakia', code: '+421', abbr3: 'SVK', abbr2: 'SK' },
  {
    text: '斯洛文尼亚',
    en: 'Slovenia',
    code: '+386',
    abbr3: 'SVN',
    abbr2: 'SI'
  },
  { text: '南非', en: 'South Africa', code: '+27', abbr3: 'ZAF', abbr2: 'ZA' },
  { text: '韩国', en: 'Korea', code: '+82', abbr3: 'KOR', abbr2: 'KR' },
  { text: '西班牙', en: 'Spain', code: '+34', abbr3: 'ESP', abbr2: 'ES' },
  { text: '斯里兰卡', en: 'SriLanka', code: '+94', abbr3: 'LKA', abbr2: 'LK' },
  {
    text: '圣基茨和尼维斯',
    en: 'St Kitts and Nevis',
    code: '+1869',
    abbr3: 'KNA',
    abbr2: 'KN'
  },
  {
    text: '圣卢西亚',
    en: 'St.Lucia',
    code: '+1758',
    abbr3: 'LCA',
    abbr2: 'LC'
  },
  {
    text: '圣文森特',
    en: 'St.Vincent',
    code: '+1784',
    abbr3: 'VCT',
    abbr2: 'VC'
  },
  { text: '苏丹', en: 'Sudan', code: '+249', abbr3: 'SDN', abbr2: 'SD' },
  { text: '苏里南', en: 'Suriname', code: '+597', abbr3: 'SUR', abbr2: 'SR' },
  {
    text: '斯威士兰',
    en: 'Swaziland',
    code: '+268',
    abbr3: 'SWZ',
    abbr2: 'SZ'
  },
  { text: '瑞典', en: 'Sweden', code: '+46', abbr3: 'SWE', abbr2: 'SE' },
  { text: '瑞士', en: 'Switzerland', code: '+41', abbr3: 'CHE', abbr2: 'CH' },
  { text: '叙利亚', en: 'Syria', code: '+963', abbr3: 'SYR', abbr2: 'SY' },
  { text: '台湾', en: 'Taiwan', code: '+886', abbr3: 'TWN', abbr2: 'TW' },
  {
    text: '塔吉克斯坦',
    en: 'Tajikistan',
    code: '+992',
    abbr3: 'TJK',
    abbr2: 'TJ'
  },
  { text: '坦桑尼亚', en: 'Tanzania', code: '+255', abbr3: 'TZA', abbr2: 'TZ' },
  { text: '泰国', en: 'Thailand', code: '+66', abbr3: 'THA', abbr2: 'TH' },
  {
    text: '东帝汶',
    en: 'Timor Leste',
    code: '+670',
    abbr3: 'TLS',
    abbr2: 'TL'
  },
  { text: '多哥', en: 'Togo', code: '+228', abbr3: 'TGO', abbr2: 'TG' },
  { text: '汤加', en: 'Tonga', code: '+676', abbr3: 'TON', abbr2: 'TO' },
  {
    text: '特立尼达和多巴哥',
    en: 'Trinidad and Tobago',
    code: '+1868',
    abbr3: 'TTO',
    abbr2: 'TT'
  },
  { text: '突尼斯', en: 'Tunisia', code: '+216', abbr3: 'TUN', abbr2: 'TN' },
  { text: '土耳其', en: 'Turkey', code: '+90', abbr3: 'TUR', abbr2: 'TR' },
  {
    text: '土库曼斯坦',
    en: 'Turkmenistan',
    code: '+993',
    abbr3: 'TKM',
    abbr2: 'TM'
  },
  {
    text: '特克斯和凯科斯群岛',
    en: 'Turks and Caicos Islands',
    code: '+1649',
    abbr3: 'TCA',
    abbr2: 'TC'
  },
  { text: '乌干达', en: 'Uganda', code: '+256', abbr3: 'UGA', abbr2: 'UG' },
  { text: '乌克兰', en: 'Ukraine', code: '+380', abbr3: 'UKR', abbr2: 'UA' },
  {
    text: '阿拉伯联合酋长国',
    en: 'United Arab Emirates',
    code: '+971',
    abbr3: 'ARE',
    abbr2: 'AE'
  },
  {
    text: '英国',
    en: 'United Kingdom',
    code: '+44',
    abbr3: 'GBR',
    abbr2: 'GB'
  },
  { text: '美国', en: 'United States', code: '+1', abbr3: 'USA', abbr2: 'US' },
  { text: '乌拉圭', en: 'Uruguay', code: '+598', abbr3: 'URY', abbr2: 'UY' },
  {
    text: '乌兹别克斯坦',
    en: 'Uzbekistan',
    code: '+998',
    abbr3: 'UZB',
    abbr2: 'UZ'
  },
  { text: '瓦努阿图', en: 'Vanuatu', code: '+678', abbr3: 'VUT', abbr2: 'VU' },
  { text: '委内瑞拉', en: 'Venezuela', code: '+58', abbr3: 'VEN', abbr2: 'VE' },
  { text: '越南', en: 'Vietnam', code: '+84', abbr3: 'VNM', abbr2: 'VN' },
  {
    text: '维尔京群岛',
    en: 'Virgin Islands',
    code: '+1340',
    abbr3: 'BVI',
    abbr2: 'VI'
  },
  { text: '也门', en: 'Yemen', code: '+967', abbr3: 'YEM', abbr2: 'YE' },
  { text: '赞比亚', en: 'Zambia', code: '+260', abbr3: 'ZMB', abbr2: 'ZM' },
  { text: '津巴布韦', en: 'Zimbabwe', code: '+263', abbr3: 'ZWE', abbr2: 'ZW' }
];
//按英文名称 A-Z排序
areas.sort(function (a, b) {
  return a.abbr2.localeCompare(b.abbr2);
});
//按中文名称 A-Z排序
/*
        areas.sort(function(a, b) {
            return (a.text).localeCompare(b.text)
        })
        */
$(function () {
  var html = '';

  for (var i = 0; i < areas.length; i++) {
    html =
      html +
      '<li  title=' +
      areas[i].en +
      ' data-id=' +
      areas[i].code +
      ' onclick=getqh(this)>' +
      '<span>' +
      areas[i].abbr2 +
      '</span>' +
      areas[i].code +
      '</li>';
  }

  $('.qhlist').html(html);

  $('.qhjsdy').click(function (event) {
    event.stopPropagation();
    if ($(this).find('.qhlist').hasClass('on')) {
      $(this).find('.qhlist').removeClass('on');
    } else {
      $(this).find('.qhlist').addClass('on');
    }
  });
  $(document).click(function (event) {
    if ($('.qhlist').hasClass('on')) {
      $('.qhlist').removeClass('on');
      $('.qhjsdy>.input').focus();
    }
  });

  $('.tsbd').click(function () {
    console.log('1');
    var set = $(this).find('.seletlist');
    if (set.hasClass('on')) {
      $(this).find('.seletlist').removeClass('on');
    } else {
      $(this).find('.seletlist').addClass('on');
    }
  });

  $('.seletlist p').click(function () {
    var ipt = $(this).parent().prev();
    ipt.val($(this).text());
  });
});

function getqh(e) {
  var ipt = $(e).parent().prev().prev();
  var ip = $(e).parent().prev();
  ip.text($(e).attr('data-id'));
  ipt.val($(e).attr('data-id'));
}

$(function () {
  $.ajax({
    type: 'POST',
    url: loading_url + '?ip=1',
    crossDomain: true,
    success: function (data) {
      console.log(data);
      if (data.data.area_code) {
        $('.qhjsdy p').text(data.data.area_code);
        $('input[name="area_code"]').val(data.data.area_code);
        $('input[name="area_code1"]').val(data.data.area_code);
      }
    },
    error: function (error) {
      console.error('Error:', error);
    }
  });
});

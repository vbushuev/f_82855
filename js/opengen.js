$(function(){

    $('.generator').click(function(){
        window.location = $(this).find('a').attr('href');
    });

    $('.dropdown-toggle').dropdown();

    $('#hide-img').hide();
    
    function VerificationEmail(el, event){
          var tmpEmail = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,8}|[0-9]{1,3})(\]?)$\.?$/i;
          var result = tmpEmail.test($(el).val())
          if (!result) {
            $(el).css({'border':'1px solid #E9322D', 'box-shadow':'0 0 6px #F8B9B7', 'color':'#B94A48'});
            return false;
          }
          else {
            $(el).css({'border':'1px solid #ccc', 'box-shadow':'0 1px 1px rgba(0, 0, 0, 0.075) inset', 'color':'#555'});
            return true;
          }
    }
    
    function CheckNumberFields(el, typeNum){
    	var oldStr = $(el).val();
    	var newStr = symbol = "";
        var count = oldStr.length;
        var point = 0; 
    	for (var i = 0; i < count; i++){
    		symbol = oldStr.substr(i,1);
            if (typeNum == 'float'){
                if (symbol == ","){ 
                    symbol = ".";
                } 
                if (symbol == "."){
                  point++;  
                }
                if(point > 1 && symbol == "." && (oldStr.split('.').length-1) > 1){
                    symbol = "";
                }
        		if(symbol != " " && ((symbol == "." && i != 0) || (symbol == "-" && i == 0) || isNaN(symbol) == false)){
        			newStr += symbol;
        		}
            }
            else {
        		symbol = oldStr.substr(i,1);
        		if(symbol!=" " && isNaN(symbol) == false){
        			newStr += symbol;
        		}
            }
    	}
    	$(el).val(newStr);
    }
    
    
    /* donate in footer
    ------------------------------------------------ */
    $('.webmoney').hover(
        function(){
           $(this).find('.ico').css('background-position', '0 0'); 
        },
        function(){
           $(this).find('.ico').css('background-position', '-32px 0'); 
        }
    );  
    $('.yamoney').hover(
        function(){
           $(this).find('.ico').css('background-position', '-64px 0');
        },
        function(){
           $(this).find('.ico').css('background-position', '-96px 0');
        }
    ); 
    
    
    /* margin for top-10
    ------------------------------------------------ */
    if($('.top-link').size() > 0) {
        $('.top-link').closest('.generator_block').css('margin', '20px 0 35px 0');
    }
   
    
    /* modal feedback
    ------------------------------------------------ */
    $('#sendMsg').on('shown', function () {
        $(this).find('.alert').remove().end()
        .find('textarea').val('').focus();
    });
    
    $('#sendMsg .modal-footer button').live('click', function(event){
        var email = $('#sendMsg input[name="_email"]');
        if ($('#sendMsg textarea').val().length > 10 && VerificationEmail(email, event)) {
            var THIS = $(this);
            $(THIS).button('loading');
            var formData = $('#sendMsg form').serialize();
            $.ajax({
              url: "/ajax.php",
              data: formData,
              type: "POST",
              error: function() {
                alert('Ошибка AJAX! Пожалуйста, попробуйте ещё раз или свяжитесь с администрацией ресурса.');
              },
              success: function(result) {
                  $(THIS).button('reset');
                  $('#sendMsg .alert').remove();
                  if(result == 0) {
                      $('#sendMsg form').prepend('<div class="alert alert-info fade in"><button data-dismiss="alert" class="close" type="button">×</button>Сообщение успешно отправлено!</div>');
                  }
                  else {
                      $('#sendMsg form').prepend('<div class="alert alert-error fade in"><button data-dismiss="alert" class="close" type="button">×</button>Ошибка! Пожалуйста, попробуйте ещё раз или свяжитесь с администрацией ресурса.</div>');
                  }
              }
            });
        } else {
            $('#sendMsg .alert').remove();
            $('#sendMsg form').prepend('<div class="alert alert-error fade in"><button data-dismiss="alert" class="close" type="button">×</button>Пожалуйста, заполните корректно все поля.</div>');
        }
    });
    
    $('#sendMsg form').submit(function(){
        return false;
    });
    
    $('#sendMsg input[name="_email"]').live('keyup', function(event){
        if($(this).val() != ''){
            VerificationEmail(this, event);    
        }
    }).live('change', function(event){
        VerificationEmail(this, event);
    }).live('keypress', function(eventObject){
        if (eventObject.which == 13){
                $('#sendMsg .modal-footer button').click();
        }
    });
    


    /* passwords generator
    ------------------------------------------------ */
    if ($('.generator_block').hasClass('passwords')){

      $('div.passwords input[name="num"],div.passwords input[name="lower"]').prop('checked', true);
      $('div.passwords input[name="upper"],div.passwords input[name="symbol"]').prop('checked', false);
      $('div.passwords input[name="count"]').val($('.title strong').text());

      function PasswordsForm(el, event){
        var formData = $(el).closest('form').serialize();
        $('div.passwords button[data="passwords"]').button('loading');
        $.ajax({
          url: "/ajax.php",
          data: formData,
          type: "POST",
          success: function(result) {
              var PassArray = result.split(" ");
              var OutList = $('.out li');
              for(var i = 1; i < PassArray.length; ++i){
                $(OutList).find('span').eq(i-1).css('opacity', '0').html(PassArray[i]).animate({"opacity": "1"}, "400");
              }
              $('div.passwords button[data="passwords"]').button('reset');
          }
        });
      }

      $("div.passwords #slider").slider({
        animate: true,
        range: 'min',
        min: 4,
        max: 20,
        step: 1,
        value: 9,
        slide: function(event, ui) {
           $(".title strong").text(ui.value);
           $("input[name=count]").val(ui.value);
           if (ui.value < 8) {
             $("#slider .ui-widget-header").css("background-position", "0px 0px");
             $(".title strong").css("color", "#ff342c");
           }
           else if (ui.value >= 8 && ui.value < 14) {
             $("#slider .ui-widget-header").css("background-position", "0px 18px");
             $(".title strong").css("color", "#ffc83a");
           }
           else {
             $("#slider .ui-widget-header").css("background-position", "0px 9px");
             $(".title strong").css("color", "#69e774");
           }
        },
        stop: function(event, ui){
          $('div.passwords button').click();
        }
      });


      $('div.passwords button').click(function(event){
        PasswordsForm(this, event);
      });

      $('div.passwords input[type="checkbox"]').change(function(event){
        PasswordsForm(this, event);
      });
    }
    /* END passwords generator  ------------------------------------------------ */


    /* dice generator
    ------------------------------------------------ */
    if ($('.generator_block').hasClass('dice')){

      $('div.dice input[name="count"]').val(1);

      function GetCube(){
        var Num = Math.floor(Math.random() * 6) + 1;
        switch (Num) {
          case 1:
            var cube = '<tr> <td class="dot-side"></td> <td class="dot-center"></td> <td class="dot-side"></td> </tr> <tr> <td></td> <td><img src="/img/dot.png" width="28" height="28" border="0" /></td> <td></td> </tr> <tr> <td></td> <td></td> <td></td> </tr>';
            break;
          case 2:
            var cube = '<tr> <td class="dot-side"><img src="/img/dot.png" width="28" height="28" border="0" /></td> <td class="dot-center"></td> <td class="dot-side"></td> </tr> <tr> <td></td> <td></td> <td></td> </tr> <tr> <td></td> <td></td> <td><img src="/img/dot.png" width="28" height="28" border="0" /></td> </tr>';
            break;
          case 3:
            var cube = '<tr> <td class="dot-side"><img src="/img/dot.png" width="28" height="28" border="0" /></td> <td class="dot-center"></td> <td class="dot-side"></td> </tr> <tr> <td></td> <td><img src="/img/dot.png" width="28" height="28" border="0" /></td> <td></td> </tr> <tr> <td></td> <td></td> <td><img src="/img/dot.png" width="28" height="28" border="0" /></td> </tr>';
            break;
          case 4:
            var cube = '<tr> <td class="dot-side"><img src="/img/dot.png" width="28" height="28" border="0" /></td> <td class="dot-center"></td> <td class="dot-side"><img src="/img/dot.png" width="28" height="28" border="0" /></td> </tr> <tr> <td></td> <td></td> <td></td> </tr> <tr> <td><img src="/img/dot.png" width="28" height="28" border="0" /></td> <td></td> <td><img src="/img/dot.png" width="28" height="28" border="0" /></td> </tr>';
            break;
          case 5:
            var cube = '<tr> <td class="dot-side"><img src="/img/dot.png" width="28" height="28" border="0" /></td> <td class="dot-center"></td> <td class="dot-side"><img src="/img/dot.png" width="28" height="28" border="0" /></td> </tr> <tr> <td></td> <td><img src="/img/dot.png" width="28" height="28" border="0" /></td> <td></td> </tr> <tr> <td><img src="/img/dot.png" width="28" height="28" border="0" /></td> <td></td> <td><img src="/img/dot.png" width="28" height="28" border="0" /></td> </tr>';
            break;
          default:
            var cube = '<tr> <td class="dot-side"><img src="/img/dot.png" width="28" height="28" border="0" /></td> <td class="dot-center"></td> <td class="dot-side"><img src="/img/dot.png" width="28" height="28" border="0" /></td> </tr> <tr> <td><img src="/img/dot.png" width="28" height="28" border="0" /></td> <td></td> <td><img src="/img/dot.png" width="28" height="28" border="0" /></td> </tr> <tr> <td><img src="/img/dot.png" width="28" height="28" border="0" /></td> <td></td> <td><img src="/img/dot.png" width="28" height="28" border="0" /></td> </tr>';
        }
        return cube;
      }

      function ThrowDice(){
          var count = $("input[name=count]").val();
          if(count == 1) {
            $('.cube-group').html('<div class="cube"><table cellpadding="0" cellspacing="0">' + GetCube() + '</table></div>');
          }
          else if(count == 2) {
            $('.cube-group').html('<div class="cube"><table cellpadding="0" cellspacing="0">' + GetCube() + '</table></div><div class="cube"><table cellpadding="0" cellspacing="0">' + GetCube() + '</table></div>');
          }
          else {
            $('.cube-group').html('<div class="cube"><table cellpadding="0" cellspacing="0">' + GetCube() + '</table></div><div class="cube"><table cellpadding="0" cellspacing="0">' + GetCube() + '</table></div><div class="cube"><table cellpadding="0" cellspacing="0">' + GetCube() + '</table></div>');
          }
      }

      ThrowDice(); 

      $('div.dice .btn-group button').click(function(){
          $(this).parent().find('button').removeClass('btn-info').end().end().addClass('btn-info');
          $("input[name=count]").val($(this).text());
          ThrowDice();
      });

      $('div.dice form button[data="dice"]').click(function(event){
          if(!$(this).prop('disabled')) {
            $(this).button('loading');
            ID = setInterval(ThrowDice,10);
            setTimeout(function() { clearInterval(ID); $('div.dice form button[data="dice"]').button('reset');  }, 3000);
          }
      });

      $('body').keypress(function(eventObject){
          if (eventObject.which == 32 && $('.modal-backdrop').size() == 0){
             $('div.dice form button[data="dice"]').click();
          }
      });
    }
    /* END dice generator ------------------------------------------------ */


    /* qrcode generator
    ------------------------------------------------ */
    if ($('.generator_block').hasClass('qrcode')){

      $('div.qrcode input[name="size"]').val(4);
      $('div.qrcode input[name="backColor"]').val('ffffff');
      $('div.qrcode input[name="foreColor"]').val('000000');

      function QRForm(el, event){
        var formData = $(el).closest('form').serialize();
        $.ajax({
          url: "/ajax.php",
          data: formData,
          type: "POST",
          error: function() {
            alert('Ошибка AJAX! Пожалуйста, попробуйте ещё раз или свяжитесь с администрацией ресурса.');
          },
          success: function(result) {
              $('.show-qrcode').html(result);
              $(el).button('reset');
              $('.qrcode .out .title_text span').text($('.show-qrcode img').attr('width') + '×' + $('.show-qrcode img').attr('height') + ' pixels');
              $('.qrcode .download-qrcode').attr('href', $('.show-qrcode img').attr('src'));

          }
        });
      }

      $('div.qrcode .input button[data="qrcode"]').click(function(event){
          if(!$(this).prop('disabled') && $('div.qrcode textarea').val() != '') {
            $(this).button('loading');
            QRForm(this, event);
          }
      });

      $('div.qrcode .btn-group button').click(function(){
          $(this).parent().find('button').removeClass('btn-info').end().end().addClass('btn-info');
          if($(this).parent().hasClass('size-img')) $("input[name=size]").val($(this).text());
          if($(this).parent().hasClass('format-img')) $("input[name=format]").val($(this).text());
          $('div.qrcode .input button[data="qrcode"]').click();
      });

      $('#backColor').ColorPicker({
            color: '#ffffff',
            onShow: function (cp) {
              $(cp).fadeIn(500);
              return false;
            },
            onHide: function (cp) {
              $(cp).fadeOut(500);
              $('div.qrcode .input button[data="qrcode"]').click();
              return false;
            },
            onChange: function (hsb, hex, rgb) {
              $('#backColor div').css('backgroundColor', '#'+hex);
              $('input[name="backColor"]').val(hex);
            }
      });

      $('#foreColor').ColorPicker({
            color: '#000000',
            onShow: function (cp) {
              $(cp).fadeIn(500);
              return false;
            },
            onHide: function (cp) {
              $(cp).fadeOut(500);
              $('div.qrcode .input button[data="qrcode"]').click();
              return false;
            },
            onChange: function (hsb, hex, rgb) {
              $('#foreColor div').css('backgroundColor', '#'+hex);
              $('input[name="foreColor"]').val(hex);
            }
      });

      $('#sendImgModal').on('shown', function () {
        $(this).find('.alert').remove().end()
        .find('input[name="email"]').focus();
      });

      $('#sendImgModal .modal-footer button').live('click', function(event){
            var email = $('#sendImgModal input[name="email"]');
            var THIS = $(this);
            if(VerificationEmail(email, event)){
                $(THIS).button('loading');
                $('input[name="path"]').val($('.qrcode .download-qrcode').attr('href'));
                var formData = $('#sendImgModal form').serialize();
                $.ajax({
                  url: "/ajax.php",
                  data: formData,
                  type: "POST",
                  error: function() {
                    alert('Ошибка AJAX! Пожалуйста, попробуйте ещё раз или свяжитесь с администрацией ресурса.');
                  },
                  success: function(result) {
                      $(THIS).button('reset');
                      $('#sendImgModal .alert').remove();
                      if(result == 0) {
                          $('#sendImgModal form').prepend('<div class="alert alert-info fade in"><button data-dismiss="alert" class="close" type="button">×</button>QR-код успешно отправлен на указанный вами e-mail.</div>');
                      }
                      else {
                          $('#sendImgModal form').prepend('<div class="alert alert-error fade in"><button data-dismiss="alert" class="close" type="button">×</button>Ошибка! Пожалуйста, попробуйте ещё раз или свяжитесь с администрацией ресурса.</div>');
                      }
                  }
                });
            }
            else {
                $('#sendImgModal .alert').remove();
                $('#sendImgModal form').prepend('<div class="alert alert-error fade in"><button data-dismiss="alert" class="close" type="button">×</button>Пожалуйста, введите e-mail корректно.</div>');
            }
      });

      $('#sendImgModal form').submit(function(){
        return false;
      });

      $('#sendImgModal input[name="email"]').live('keyup', function(event){
            VerificationEmail(this, event);
      }).live('change', function(event){
            VerificationEmail(this, event);
      }).live('keypress', function(eventObject){
          if (eventObject.which == 13) {
                $('#sendImgModal .modal-footer button').click();
          }
      });
    }
    /* END qrcode generator ------------------------------------------------ */
    
   
    /* numbers generator
    ------------------------------------------------ */
    if ($('.generator_block').hasClass('numbers')){

      $('div.numbers input[name="repeat"]').prop('checked', false);
      $('div.numbers input[name="min"]').val('1');
      $('div.numbers input[name="max"]').val('99');
      $('div.numbers input[name="count"]').val('1');
      $('div.numbers select').val('space');
      
      function CopyToClipboardNumbers() {
        ZeroClipboard.setMoviePath('/js/clipboard.swf');
        var clip = new ZeroClipboard.Client();
        clip.setHandCursor(true);    
        clip.glue('idCopyToClipboard');
        var txt = $('.out p').text();
        clip.setText(txt);
        if(!$.browser.mozilla){
            clip.addEventListener('onComplete', ClipboardComplete);
            function ClipboardComplete(client, txt) {
                    alert('Все числа скопированы в буфер обмена');
            }
        }
      }
      if($.browser.mozilla){
          $('[name^="ZeroClipboardMovie"]').live('click', function(){
            alert('Все числа скопированы в буфер обмена');
          });
      }
      CopyToClipboardNumbers();
      
      function RndForm(el){
        var THIS = $(el);
        $(THIS).button('loading');
        var formData = $(el).closest('form').serialize();
        $.ajax({
          url: "/ajax.php",
          data: formData,
          type: "POST",
          error: function() {
            alert('Ошибка AJAX! Пожалуйста, попробуйте ещё раз или свяжитесь с администрацией ресурса.');
          },
          success: function(result) {
              $(THIS).button('reset');
              $p = $('.out p');
              $p.css('opacity', '0').html(result).animate({"opacity": "1"}, "500");
              if (result.length < 4) {
                    $p.addClass('one');  
              }
              else {
                   $p.removeClass('one'); 
              }
              CopyToClipboardNumbers();
          }
        });
      }
      
    
    $('div.numbers .check-float-fields').keyup(function(){
        CheckNumberFields(this, 'float');
    }).change(function(){
        CheckNumberFields(this, 'float');
    });
    
    $('div.numbers .check-int-fields').keyup(function(){
        CheckNumberFields(this, 'int');
    }).change(function(){
        CheckNumberFields(this, 'int');
    });
      
    $('div.numbers button[name="numbers"]').click(function(){
        RndForm(this);
    });
  /*
    $('div.numbers .input input,  div.numbers .input select').change(function(){
        $('div.numbers button[name="numbers"]').click();
    });
  */  
 
      $('#sendNumbersModal').on('shown', function () {
        $(this).find('.alert').remove().end()
        .find('input[name="email"]').focus();
      });

      $('#sendNumbersModal .modal-footer button').live('click', function(event){
            var email = $('#sendNumbersModal input[name="email"]');
            var THIS = $(this);
            if(VerificationEmail(email, event)){
                $(THIS).button('loading');
                $('input[name="text"]').val($('.out p').text());
                var formData = $('#sendNumbersModal form').serialize();
                $.ajax({
                  url: "/ajax.php",
                  data: formData,
                  type: "POST",
                  error: function() {
                    alert('Ошибка AJAX! Пожалуйста, попробуйте ещё раз или свяжитесь с администрацией ресурса.');
                  },
                  success: function(result) {
                      $(THIS).button('reset');
                      $('#sendNumbersModal .alert').remove();
                      if(result == 0) {
                          $('#sendNumbersModal form').prepend('<div class="alert alert-info fade in"><button data-dismiss="alert" class="close" type="button">×</button>Cгенерированные числа успешно отправлены на e-mail.</div>');
                      }
                      else {
                          $('#sendNumbersModal form').prepend('<div class="alert alert-error fade in"><button data-dismiss="alert" class="close" type="button">×</button>Ошибка! Пожалуйста, попробуйте ещё раз или свяжитесь с администрацией ресурса.</div>');
                      }
                  }
                });
            }
            else {
                $('#sendNumbersModal .alert').remove();
                $('#sendNumbersModal form').prepend('<div class="alert alert-error fade in"><button data-dismiss="alert" class="close" type="button">×</button>Пожалуйста, введите e-mail корректно.</div>');
            }
      });

      $('#sendNumbersModal form').submit(function(){
        return false;
      });

      $('#sendNumbersModal input[name="email"]').live('keyup', function(event){
            VerificationEmail(this, event);
      }).live('change', function(event){
            VerificationEmail(this, event);
      }).live('keypress', function(eventObject){
          if (eventObject.which == 13) {
                $('#sendNumbersModal .modal-footer button').click();
          }
      });
      
    }
    /* END numbers generator  ------------------------------------------------ */
        
   
    /* text generator
    ------------------------------------------------ */
    if ($('.generator_block').hasClass('text')){

      $('div.text input[name="paragraph"]').val(3);
      $('div.text input[name="word"]').val(60);
      $('div.text select').val('fish');
      
      function CopyToClipboardText() {
        ZeroClipboard.setMoviePath('/js/clipboard.swf');
        var clip = new ZeroClipboard.Client();
        clip.setHandCursor(true);    
        clip.glue('idCopyToClipboard');
        var txt = '';
        $('.out p').each(function(i, el){
            txt = txt + $(el).text() + '\r\n';    
        });
        clip.setText(txt);
        if(!$.browser.mozilla){
            clip.addEventListener('onComplete', ClipboardComplete);
            function ClipboardComplete(client, txt) {
                    alert('Весь текст скопирован в буфер обмена');
            }
        }
      }
      if($.browser.mozilla){
          $('[name^="ZeroClipboardMovie"]').live('click', function(){
            alert('Весь текст скопирован в буфер обмена');
          });
      }
      CopyToClipboardText();
      
      
      
      function CountSymbols() {
        var symbolBlock = $(".count_symbols");
        if($(symbolBlock).is(":hidden")) {
          $(symbolBlock).show();  
        }
        $(symbolBlock).find('.withspace').text($('.out').text().length);
        $(symbolBlock).find('.nospace').text($('.out').text().replace(/\s+/g,'').length);
      }
      CountSymbols();
      
      function LoremIpsumFrom(el){
        var THIS = $(el);
        $(THIS).button('loading');
        var formData = $(el).closest('form').serialize();
        $.ajax({
          url: "/ajax.php",
          data: formData,
          type: "POST",
          error: function() {
            alert('Ошибка AJAX! Пожалуйста, попробуйте ещё раз или свяжитесь с администрацией ресурса.');
          },
          success: function(result) {
              $(THIS).button('reset');
              $('.out p').css('opacity', '0').parent().html(result).animate({"opacity": "1"}, "200");
              CopyToClipboardText();
              CountSymbols();
          }
        });
      }
      
    $('div.text .check-int-fields').keyup(function(){
        CheckNumberFields(this, 'int');
    }).change(function(){
        CheckNumberFields(this, 'int');
    });
      
    $('div.text button[name="text"]').click(function(){
        LoremIpsumFrom(this);
    });
  
    $('div.text .input input,  div.text .input select').change(function(){
        $('div.text button[name="text"]').click();
    });
    
      $('#sendTextModal').on('shown', function () {
        $(this).find('.alert').remove().end()
        .find('input[name="email"]').focus();
      });

      $('#sendTextModal .modal-footer button').live('click', function(event){
            var email = $('input[name="email"]');
            var THIS = $(this);
            if(VerificationEmail(email, event)){
                $(THIS).button('loading');
                $('#sendTextModal input[name="text"]').val($('.out').html());
                var formData = $('#sendTextModal form').serialize();
                $.ajax({
                  url: "/ajax.php",
                  data: formData,
                  type: "POST",
                  error: function() {
                    alert('Ошибка AJAX! Пожалуйста, попробуйте ещё раз или свяжитесь с администрацией ресурса.');
                  },
                  success: function(result) {
                      $(THIS).button('reset');
                      $('#sendTextModal .alert').remove();
                      if(result == 0) {
                          $('#sendTextModal form').prepend('<div class="alert alert-info fade in"><button data-dismiss="alert" class="close" type="button">×</button>Cгенерированный текст успешно отправлен на e-mail.</div>');
                      }
                      else {
                          $('#sendTextModal form').prepend('<div class="alert alert-error fade in"><button data-dismiss="alert" class="close" type="button">×</button>Ошибка! Пожалуйста, попробуйте ещё раз или свяжитесь с администрацией ресурса.</div>');
                      }
                  }
                });
            }
            else {
                $('#sendTextModal .alert').remove();
                $('#sendTextModal form').prepend('<div class="alert alert-error fade in"><button data-dismiss="alert" class="close" type="button">×</button>Пожалуйста, введите e-mail корректно.</div>');
            }
      });

      $('#sendTextModal form').submit(function(){
        return false;
      });

      $('#sendTextModal input[name="email"]').live('keyup', function(event){
            VerificationEmail(this, event);
      }).live('change', function(event){
            VerificationEmail(this, event);
      }).live('keypress', function(eventObject){
          if (eventObject.which == 13) {
                $('#sendTextModal .modal-footer button').click();
          }
      });
    }
    /* END text generator  ------------------------------------------------ */
            
   
    /* names generator
    ------------------------------------------------ */
    if ($('.generator_block').hasClass('names')){

      $('div.names input[name="count"]').val(10);
      $('div.names input[type="checkbox"], div.names input[value="fullname"]').prop('checked', true);
      $('div.names select').val('all');
      $('div.names .sub_control input, div.names .sub_control select').prop('disabled', false);
      
      function GetNickname(){
        var rndType = Math.floor(Math.random() * 3) + 1;
        var firstName = "";
        var lastName = "";
        var nickname = "";
        var h_fnpre = new Array("Te", "Ni", "Nila", "Andro", "Androma", "Sha", "Ara", "Ma", "Mana", "La", "Landa", "Do", "Dori", "Pe", "Peri", "Conju", "Co", "Fo", "Fordre", "Da", "Dala", "Ke", "Kele", "Gra", "Grani", "Jo", "Sa", "Mala", "Ga", "Gavi", "Gavinra", "Mo", "Morlu", "Aga", "Agama", "Ba", "Balla", "Ballado", "Za", "Ari", "Ariu", "Au", "Auri", "Bra", "Ka", "Bu", "Buza", "Coi", "Bo", "Mu", "Muni", "Tho", "Thorga", "Ke", "Gri", "Bu", "Buri", "Hu", "Hugi", "Tho", "Thordi", "Ba", "Bandi", "Ga", "Bea", "Beaze", "Mo", "Modi", "Ma", "Malo", "Gholbi", "Gho", "Da", "Dagda", "Nua", "Nuada", "Oghma", "Ce", "Centri", "Cere", "Ce", "Ka", "Kathri", "Ado", "Adora", "Mora", "Mo", "Fe", "Felo", "Ana", "Anara", "Kera", "Mave", "Dela", "Mira", "Theta", "Tygra", "Adrie", "Diana", "Alsa", "Mari", "Shali", "Sira", "Sai", "Saithi", "Mala", "Kiri", "Ana", "Anaya", "Felha", "Drela", "Corda", "Nalme", "Na", "Um", "Ian", "Opi", "Lai", "Ygg", "Mne", "Ishn", "Kula", "Yuni");
        var h_fnsuf = new Array("", "nn", "las", "", "math", "th", "", "ath", "zar", "ril", "ris", "rus", "jurus", "dred", "rdred", "lar", "len", "nis", "rn", "ge", "lak", "nrad", "rad", "lune", "kus", "mand", "gamand", "llador", "dor", "dar", "nadar", "rius", "nius", "zius", "tius", "sius", "wield", "helm", "zan", "tus", "bor", "nin", "rgas", "gas", "lv", "kelv", "gelv", "rim", "sida", "ginn", "grinn", "nn", "huginn", "rdin", "ndis", "bandis", "gar", "zel", "di", "ron", "rne", "lbine", "gda", "ghma", "ntrius", "dwyn", "wyn", "swyn", "thris", "dora", "lore", "nara", "ra", "las", "gra", "riel", "lsa", "rin", "lis", "this", "lace", "ri", "naya", "rana", "lhala", "lanim", "rdana", "lmeena", "meena", "fym", "fyn", "hara");
        var h_lnpre = new Array("Flame", "Arcane", "Light", "Mage", "Spell", "Rex", "Dawn", "Dark", "Red", "Truth", "Might", "True", "Bright", "Pure", "Fearless", "Dire", "Blue", "White", "Black", "Rain", "Doom", "Rune", "Sword", "Force", "Axe", "Stone", "Iron", "Broad", "Stern", "Thunder", "Frost", "Rock", "Doom", "Blud", "Blood", "Stone", "Steel", "Golden", "Gold", "Silver", "White", "Black", "Gravel", "Sharp", "Star", "Night", "Moon", "Chill", "Whisper", "White", "Black", "Saber", "Snow", "Rain", "Dark", "Light", "Wind", "Iron", "Blade", "Shadow", "Flame", "Sin", "Pain", "Hell", "Wrath", "Rage", "Blood", "Terror");
        var h_lnsuf = new Array("seeker", "caster", "binder", "weaver", "singer", "font", "hammer", "redeemer", "bearer", "bringer", "defender", "conjuror", "eye", "staff", "flame", "fire", "shaper", "breaker", "cliff", "worm", "hammer", "brew", "beard", "fire", "forge", "stone", "smith", "fist", "pick", "skin", "smasher", "crusher", "worker", "shaper", "song", "shade", "singer", "ray", "wind", "fang", "dragon", "mane", "scar", "moon", "wood", "raven", "wing", "hunter", "warden", "stalker", "grove", "walker", "master", "blade", "fury", "weaver", "terror", "dweller", "killer", "seeker", "bourne", "bringer", "runner", "brand", "wrath");
        var o_fnpre = new Array("To", "Toja", "Ni", "Niko", "Ka", "Kaji", "Mi", "Mika", "Sa", "Samu", "Aki", "Akino", "Ma", "Mazu", "Yo", "Yozshu", "Da", "Dai", "Ki", "Kiga", "Ara", "Arashi", "Mo", "Moogu", "Ju", "Ga", "Garda", "Ne", "Ka", "Ma", "Ba", "Go", "Kaga", "Na", "Mo", "Kazra", "Kazi", "Fe", "Fenri", "Ma", "Tygo", "Ta", "Du", "Ka", "Ke", "Mu", "Gro", "Me", "Mala", "Tau", "Te", "Tu", "Mau", "Zu", "Zulki", "JoJo", "Sha", "Shaka", "Shakti", "Me", "Mezi", "Mezti", "Vo", "Do", "Du", "Di", "Vu", "Vi", "Dou", "Ga", "Gu", "Fae", "Fau", "Go", "Golti", "Vudo", "Voodoo", "Zolo", "Zulu", "Bra", "Net");
        var o_fnsuf = new Array("jora", "kora", "jind", "kasa", "muro", "nos", "kinos", "zuru", "zshura", "shura", "ra", "sho", "gami", "mi", "shicage", "cage", "gul", "bei", "dal", "gal", "zil", "gis", "le", "rr", "gar", "gor", "grel", "rg", "gore", "zragore", "nris", "sar", "risar", "rn", "gore", "m", "rn", "t", "ll", "k", "lar", "r", "taur", "taxe", "lkis", "labar", "bar", "jas", "lrajas", "lmaran", "ran", "kazahn", "zahn", "hn", "lar", "tilar", "ktilar", "zilkree", "kree", "lkree", "jin", "jinn", "shakar", "jar", "ramar", "kus", "sida", "Worm");
        if(rndType == 1){
            var fnprefix1 = Math.floor(Math.random() * 122);
            var fnsuffix1 = Math.floor(Math.random() * 91);
            var lnprefix1 = Math.floor(Math.random() * 67);
            var lnsuffix1 = Math.floor(Math.random() * 64);
            firstName = h_fnpre[fnprefix1] + h_fnsuf[fnsuffix1];
            lastName = h_lnpre[lnprefix1] + h_lnsuf[lnsuffix1];
            firstName1 = firstName.substr(0,1).toUpperCase();
            firstName = firstName1 + firstName.substr(1, firstName.length);
            lastName1 = lastName.substr(0,1).toUpperCase();
            lastName = lastName1 + lastName.substr(1, lastName.length);
            var rnd = Math.floor(Math.random() * 2) + 1;
            if (rnd == 1) nickname = firstName; else nickname = lastName;
        }
        else if(rndType == 2){
            var fnprefix1 = Math.floor(Math.random() * 80);
            var fnsuffix1 = Math.floor(Math.random() * 67);
            firstName = o_fnpre[fnprefix1] + o_fnsuf[fnsuffix1];
            nickname = firstName;
        }
        else {
            var fnprefix1 = Math.floor(Math.random() * 122);
            var fnsuffix1 = Math.floor(Math.random() * 91);
            firstName = h_fnpre[fnprefix1] + h_fnsuf[fnsuffix1];
            nickname = firstName;
        }
        return nickname; 
    }
      
      function CopyToClipboardNames() {
        ZeroClipboard.setMoviePath('/js/clipboard.swf');
        var clip = new ZeroClipboard.Client();
        clip.setHandCursor(true);    
        clip.glue('idCopyToClipboard');
        var txt = '';
        $('.out li').each(function(i, el){
            txt = txt + $(el).text() + '\r\n';    
        });
        clip.setText(txt);
        if(!$.browser.mozilla){
            clip.addEventListener('onComplete', ClipboardComplete);
            function ClipboardComplete(client, txt) {
                    alert('Текст скопирован в буфер обмена');
            }
        }
      }
      if($.browser.mozilla){
          $('[name^="ZeroClipboardMovie"]').live('click', function(){
            alert('Текст скопирован в буфер обмена');
          });
      }
      CopyToClipboardNames();
      
      function NamesFrom(el){
        
        if ($('input[value="nickname"]').prop('checked')) {
        
              var count = $('div.names input[name="count"]').val(); 
              function generateNicknames(count, callback){
                    var nicknamesText = '';
                    for (var i = 0; i < count; ++i){
                        nicknamesText = nicknamesText + '<li><i class="icon-user"></i><span>' + GetNickname() + '</span></li>';
                    }
                    $('.out ul').css('opacity', '0').html(nicknamesText).animate({"opacity": "1"}, "400");
                    if (callback && typeof(callback) === "function") {  
                        callback();  
                    }  
              }  
              generateNicknames(count, function() { 
                    CopyToClipboardNames();
                    $('.sub_control input, .sub_control select').prop('disabled', true); 
                    $('.sub_control label').css('color', '#555');
              });     
        }
        else {
            var THIS = $(el);
            $(THIS).button('loading');
            $('.sub_control input, .sub_control select').prop('disabled', false); 
            $('.sub_control label').css('color', '#fff'); 
            var formData = $(el).closest('form').serialize();
            $.ajax({
              url: "/ajax.php",
              data: formData,
              type: "POST",
              error: function() {
                alert('Ошибка AJAX! Пожалуйста, попробуйте ещё раз или свяжитесь с администрацией ресурса.');
              },
              success: function(result) {
                  $(THIS).button('reset');
                  $('.out ul').css('opacity', '0').html(result).animate({"opacity": "1"}, "400");
                  CopyToClipboardNames();
              }
            });
        }
        
      }
      
    $('div.names .check-int-fields').keyup(function(){
        CheckNumberFields(this, 'int');
    }).change(function(){
        CheckNumberFields(this, 'int');
    });
      
      
    $('div.names button[data="names"]').click(function(){
        NamesFrom(this);
    }).click();
  
    $('div.names .input input, div.names .input select').change(function(){
        $('div.names button[data="names"]').click();
    });

      $('#sendNamesModal').on('shown', function () {
        $(this).find('.alert').remove().end()
        .find('input[name="email"]').focus();
      });

      $('#sendNamesModal .modal-footer button').live('click', function(event){
            var email = $('input[name="email"]');
            var THIS = $(this);
            if(VerificationEmail(email, event)){
                $(THIS).button('loading');
                $('#sendNamesModal input[name="text"]').val($('.out').html());
                var formData = $('#sendNamesModal form').serialize();
                $.ajax({
                  url: "/ajax.php",
                  data: formData,
                  type: "POST",
                  error: function() {
                    alert('Ошибка AJAX! Пожалуйста, попробуйте ещё раз или свяжитесь с администрацией ресурса.');
                  },
                  success: function(result) {
                      $(THIS).button('reset');
                      $('#sendNamesModal .alert').remove();
                      if(result == 0) {
                          $('#sendNamesModal form').prepend('<div class="alert alert-info fade in"><button data-dismiss="alert" class="close" type="button">×</button>Cгенерированный текст успешно отправлен на e-mail.</div>');
                      }
                      else {
                          $('#sendNamesModal form').prepend('<div class="alert alert-error fade in"><button data-dismiss="alert" class="close" type="button">×</button>Ошибка! Пожалуйста, попробуйте ещё раз или свяжитесь с администрацией ресурса.</div>');
                      }
                  }
                });
            }
            else {
                $('#sendNamesModal .alert').remove();
                $('#sendNamesModal form').prepend('<div class="alert alert-error fade in"><button data-dismiss="alert" class="close" type="button">×</button>Пожалуйста, введите e-mail корректно.</div>');
            }
      });

      $('#sendNamesModal form').submit(function(){
        return false;
      });

      $('#sendNamesModal input[name="email"]').live('keyup', function(event){
            VerificationEmail(this, event);
      }).live('change', function(event){
            VerificationEmail(this, event);
      }).live('keypress', function(eventObject){
          if (eventObject.which == 13) {
                $('#sendNamesModal .modal-footer button').click();
          }
      });
    }
    /* END names generator  ------------------------------------------------ */
    
    
    
    /* jokes generator
    ------------------------------------------------ */
    if ($('.generator_block').hasClass('jokes')){

      $('.joke-mark div').hover(
            function(){
               $(this).find('span').addClass('active'); 
            },
            function(){
               $(this).find('span').removeClass('active'); 
            }
      );  

      function GetJoke(el){
            var THIS = $(el);
            $(THIS).button('loading');
            var formData = $(el).closest('form').serialize();
            $.ajax({
              url: "/ajax.php",
              data: formData,
              type: "POST",
              error: function() {
                alert('Ошибка AJAX! Пожалуйста, попробуйте ещё раз или свяжитесь с администрацией ресурса.');
              },
              success: function(result) {
                  $(THIS).button('reset');
                  var joke = result.split('##'); 
                  $('.joke-rating').hide();
                  $('.joke-mark').show();
                  $('.out .joke-text').css('opacity', '0').html(joke[0]).animate({"opacity": "1"}, "400").each(function(){
                      var wordArray = $(this).text().split(" ");
                      var finalTitle = "";
                      for (i = 0; i <= wordArray.length-1; i++){
                        finalTitle += wordArray[i];
                        if(i == (wordArray.length-2))
                          finalTitle += "&nbsp;";
                        else
                          finalTitle += " ";
                      }
                      $(this).html(finalTitle);
                }).attr('data', joke[1]);
                $.cookie('gj', joke[1]);
                noClick = 0;
              }
            });
      }
      
      function GetRatingJoke(el){
            var THIS = $(el);
            var ID = $('.out .joke-text').attr('data');
            $.ajax({
              url: "/ajax.php",
              data: ({
                   id : ID,
                   type : $(THIS).attr('data'),
                   processor : 'jokes'
   			  }),
              type: "POST",
              error: function(){
                alert('Ошибка AJAX! Пожалуйста, попробуйте ещё раз или свяжитесь с администрацией ресурса.');
              },
              beforeSend: function(){
                $(THIS).parent().hide();      
              },
              success: function(result){
                  if ($.isNumeric(result)){
                    var plus = '';
                    if (result > 0) {
                        plus = '+';
                        $('.joke-rating b').removeClass('red');
                    }
                    $('.joke-rating').show().find('b').html(plus + '' + result);
                    if (result < 0 && !$('.joke-rating b').hasClass('red')){
                        $('.joke-rating b').addClass('red');    
                    }
                  }
              }
            });
      }
      
      noClick = 0;
      $('body').keyup(function(eventObject){
         if (eventObject.which == 32 && $('.modal-backdrop').size() == 0){
             noClick = 1;
             GetJoke('button[data="jokes"]');
          }
      });
      
      $('div.jokes button[data="jokes"]').click(function(){
         if (noClick == 0) {
             GetJoke(this);
         }
      });
      

      
      
      $('div.jokes .joke-mark div').click(function(){
            GetRatingJoke(this);
      });

      $('#sendJoke').on('shown', function () {
        $(this).find('.alert').remove().end()
        .find('textarea').val('').focus();
      });

      $('#sendJoke .modal-footer button').live('click', function(event){
            if ($('#sendJoke textarea').val().length > 10) {
                var THIS = $(this);
                $(THIS).button('loading');
                var formData = $('#sendJoke form').serialize();
                $.ajax({
                  url: "/ajax.php",
                  data: formData,
                  type: "POST",
                  error: function() {
                    alert('Ошибка AJAX! Пожалуйста, попробуйте ещё раз или свяжитесь с администрацией ресурса.');
                  },
                  success: function(result) {
                      $(THIS).button('reset');
                      $('#sendJoke .alert').remove();
                      if(result == 0) {
                          $('#sendJoke form').prepend('<div class="alert alert-info fade in"><button data-dismiss="alert" class="close" type="button">×</button>Шутка успешно отправлена!</div>');
                      }
                      else {
                          $('#sendJoke form').prepend('<div class="alert alert-error fade in"><button data-dismiss="alert" class="close" type="button">×</button>Ошибка! Пожалуйста, попробуйте ещё раз или свяжитесь с администрацией ресурса.</div>');
                      }
                  }
                });
            } else {
                $('#sendJoke .alert').remove();
                $('#sendJoke form').prepend('<div class="alert alert-error fade in"><button data-dismiss="alert" class="close" type="button">×</button>Пожалуйста, введите смешную шутку:)</div>');
            }
      });

      $('#sendJoke form').submit(function(){
        return false;
      });

    }
    /* END jokes generator  ------------------------------------------------ */
        
    
    
    /* facts generator
    ------------------------------------------------ */
    if ($('.generator_block').hasClass('facts')){

      $('.fact-mark div').hover(
            function(){
               $(this).find('span').addClass('active'); 
            },
            function(){
               $(this).find('span').removeClass('active'); 
            }
      );  

      function GetFact(el){
            var THIS = $(el);
            $(THIS).button('loading');
            var formData = $(el).closest('form').serialize();
            $.ajax({
              url: "/ajax.php",
              data: formData,
              type: "POST",
              error: function() {
                alert('Ошибка AJAX! Пожалуйста, попробуйте ещё раз или свяжитесь с администрацией ресурса.');
              },
              success: function(result) {
                  $(THIS).button('reset');
                  var fact = result.split('##'); 
                  $('.fact-rating').hide();
                  $('.fact-mark').show();
                  $('.out .fact-text').css('opacity', '0').html(fact[0]).animate({"opacity": "1"}, "400").each(function(){
                      var wordArray = $(this).text().split(" ");
                      var finalTitle = "";
                      for (i = 0; i <= wordArray.length-1; i++){
                        finalTitle += wordArray[i];
                        if(i == (wordArray.length-2))
                          finalTitle += "&nbsp;";
                        else
                          finalTitle += " ";
                      }
                      $(this).html(finalTitle);
                }).attr('data', fact[1]);
                $.cookie('gf', fact[1]);
                noClick = 0;
              }
            });
      }
      
      function GetRatingFact(el){
            var THIS = $(el);
            var ID = $('.out .fact-text').attr('data');
            $.ajax({
              url: "/ajax.php",
              data: ({
                   id : ID,
                   type : $(THIS).attr('data'),
                   processor : 'facts'
   			  }),
              type: "POST",
              error: function(){
                alert('Ошибка AJAX! Пожалуйста, попробуйте ещё раз или свяжитесь с администрацией ресурса.');
              },
              beforeSend: function(){
                $(THIS).parent().hide();      
              },
              success: function(result){
                  if ($.isNumeric(result)){
                    var plus = '';
                    if (result > 0) {
                        plus = '+';
                        $('.fact-rating b').removeClass('red');
                    }
                    $('.fact-rating').show().find('b').html(plus + '' + result);
                    if (result < 0 && !$('.fact-rating b').hasClass('red')){
                        $('.fact-rating b').addClass('red');    
                    }
                  }
              }
            });
      }
      

      noClick = 0;
      $('body').keyup(function(eventObject){
         if (eventObject.which == 32 && $('.modal-backdrop').size() == 0){
             noClick = 1;
             GetFact('button[data="facts"]');
          }
      });
      
      $('div.facts button[data="facts"]').click(function(){
         if (noClick == 0) {
             GetFact(this);
         }
      });
      
      $('div.facts .fact-mark div').click(function(){
            GetRatingFact(this);
      });

    }
    /* END facts generator  ------------------------------------------------ */
    
    
    
    /* sex generator
    ------------------------------------------------ */
    if ($('.generator_block').hasClass('sex')){

      function GetPose(el){
            var THIS = $(el);
            $(THIS).button('loading');
            $('.out .sex_img').html('<img class="preloaders" src="/img/preloaders.gif" width="180" height="180" />');
            var formData = $(el).closest('form').serialize();
            $.ajax({
              url: "/ajax.php",
              data: formData,
              type: "POST",
              error: function() {
                alert('Ошибка AJAX! Пожалуйста, попробуйте ещё раз или свяжитесь с администрацией ресурса.');
              },
              success: function(result) {
                  $(THIS).button('reset');
                  var sex = result.split('##'); 
                  if (sex[1] == 1) {
                    $('.out .sex_img').html(sex[0]);
                  }
                  else {
                    $('.out .sex_img').html('Ошибка! Пожалуйста, попробуйте ещё раз или свяжитесь с администрацией ресурса.');
                  }
                  noClick = 0;
              }
            });
      }
      
      noClick = 0;
      $('body').keyup(function(eventObject){
         if (eventObject.which == 32 && $('.modal-backdrop').size() == 0){
             noClick = 1;
             GetPose('button[data="sex"]');
          }
      });
      $('div.sex button[data="sex"]').click(function(){
         if (noClick == 0) {
             GetPose(this);
         }
      });
    }
    /* END sex generator  ------------------------------------------------ */
    
    
    
    
    
    /* quotes generator
    ------------------------------------------------ */
    if ($('.generator_block').hasClass('quotes')){

      $('.quote-mark div').hover(
            function(){
               $(this).find('span').addClass('active'); 
            },
            function(){
               $(this).find('span').removeClass('active'); 
            }
      );  

      function GetQuote(el){
            var THIS = $(el);
            $(THIS).button('loading');
            var formData = $(el).closest('form').serialize();
            $.ajax({
              url: "/ajax.php",
              data: formData,
              type: "POST",
              error: function() {
                alert('Ошибка AJAX! Пожалуйста, попробуйте ещё раз или свяжитесь с администрацией ресурса.');
              },
              success: function(result) {
                  $(THIS).button('reset');
                  var quote = result.split('##'); 
                  $('.quote-rating').hide();
                  $('.quote-mark').show();
                  
                  $('.out .quote-text').css('opacity', '0')
                      .find('small').html(quote[1])
                      .end().find('p').html(quote[0])
                      .each(function(){
                          var wordArray = $(this).text().split(" ");
                          var finalTitle = "";
                          for (i = 0; i <= wordArray.length-1; i++){
                            finalTitle += wordArray[i];
                            if(i == (wordArray.length-2))
                              finalTitle += "&nbsp;";
                            else
                              finalTitle += " ";
                          }
                          $(this).html(finalTitle);
                      })
                      .end().animate({"opacity": "1"}, "400").attr('data', quote[2]);
                  
                $.cookie('gq', quote[2]);
                noClick = 0;
              }
            });
      }
      
      function GetRatingQuote(el){
            var THIS = $(el);
            var ID = $('.out .quote-text').attr('data');
            $.ajax({
              url: "/ajax.php",
              data: ({
                   id : ID,
                   type : $(THIS).attr('data'),
                   processor : 'quotes'
   			  }),
              type: "POST",
              error: function(){
                alert('Ошибка AJAX! Пожалуйста, попробуйте ещё раз или свяжитесь с администрацией ресурса.');
              },
              beforeSend: function(){
                $(THIS).parent().hide();      
              },
              success: function(result){
                  if ($.isNumeric(result)){
                    var plus = '';
                    if (result > 0) {
                        plus = '+';
                        $('.quote-rating b').removeClass('red');
                    }
                    $('.quote-rating').show().find('b').html(plus + '' + result);
                    if (result < 0 && !$('.quote-rating b').hasClass('red')){
                        $('.quote-rating b').addClass('red');    
                    }
                  }
              }
            });
      }
      
      noClick = 0;
      $('body').keyup(function(eventObject){
          if (eventObject.which == 32 && $('.modal-backdrop').size() == 0){
             noClick = 1;
             GetQuote('button[data="quotes"]');
          }
      });
      
      $('div.quotes button[data="quotes"]').click(function(){
         if (noClick == 0) {
             GetQuote(this);
         }
      });
      
      $('div.quotes .quote-mark div').click(function(){
            GetRatingQuote(this);
      });
    }
    /* END quotes generator  ------------------------------------------------ */
            
    
    
    /* compliments generator
    ------------------------------------------------ */
    if ($('.generator_block').hasClass('compliments')){

      $('div.compliments input[name="sex"]').val(0);
      $('div.compliments input[name="type_compl"]').val(0);

      $('.compliment-mark div').hover(
            function(){
               $(this).find('span').addClass('active'); 
            },
            function(){
               $(this).find('span').removeClass('active'); 
            }
      );  

      function GetCompliment(el){
            var THIS = $(el);
            $(THIS).button('loading');
            var formData = $(el).closest('form').serialize();
            $.ajax({
              url: "/ajax.php",
              data: formData,
              type: "POST",
              error: function() {
                alert('Ошибка AJAX! Пожалуйста, попробуйте ещё раз или свяжитесь с администрацией ресурса.');
              },
              success: function(result) {
                  $(THIS).button('reset');
                  var compliment = result.split('##'); 
                  $('.compliment-rating').hide();
                  $('.compliment-mark').show();
                  $('.out .compliment-text').css('opacity', '0').html(compliment[0]).animate({"opacity": "1"}, "400").each(function(){
                      var wordArray = $(this).text().split(" ");
                      var finalTitle = "";
                      for (i = 0; i <= wordArray.length-1; i++){
                        finalTitle += wordArray[i];
                        if(i == (wordArray.length-2))
                          finalTitle += "&nbsp;";
                        else
                          finalTitle += " ";
                      }
                      $(this).html(finalTitle);
                }).attr('data', compliment[1]);
                noClick = 0;
              }
            });
      }
      
      function GetRatingCompliment(el){
            var THIS = $(el);
            var ID = $('.out .compliment-text').attr('data');
            $.ajax({
              url: "/ajax.php",
              data: ({
                   id : ID,
                   type : $(THIS).attr('data'),
                   processor : 'compliments'
   			  }),
              type: "POST",
              error: function(){
                alert('Ошибка AJAX! Пожалуйста, попробуйте ещё раз или свяжитесь с администрацией ресурса.');
              },
              beforeSend: function(){
                $(THIS).parent().hide();      
              },
              success: function(result){
                  if ($.isNumeric(result)){
                    var plus = '';
                    if (result > 0) {
                        plus = '+';
                        $('.compliment-rating b').removeClass('red');
                    }
                    $('.compliment-rating').show().find('b').html(plus + '' + result);
                    if (result < 0 && !$('.compliment-rating b').hasClass('red')){
                        $('.compliment-rating b').addClass('red');    
                    }
                  }
              }
            });
      }
      
      
      noClick = 0;
      $('body').keyup(function(eventObject){
          if (eventObject.which == 32 && $('.modal-backdrop').size() == 0){
             noClick = 1;
             GetCompliment('button[data="compliments"]');
          }
      });
      
      $('div.compliments form button[data="compliments"]').click(function(){
         if (noClick == 0) {
             GetCompliment(this);
         }
      });
      
      $('div.compliments .btn-group button').click(function(){
          $(this).parent().find('button').removeClass('btn-info').end().end().addClass('btn-info');
          $("input[name=sex]").val($('.sex .btn-info').attr('data'));
          $("input[name=type_compl]").val($('.type .btn-info').attr('data'));
          $('div.compliments form button[data="compliments"]').focus().click();
      });
      

      $('div.compliments .compliment-mark div').click(function(){
            GetRatingCompliment(this);
      });
    }
    /* END compliments generator  ------------------------------------------------ */
    
    
    /* Google fonts
    ------------------------------------------------ */
    WebFontConfig = {
        google: { families: [ 'Didact+Gothic::latin,cyrillic' ] }
    };
    (function() {
        var wf = document.createElement('script');
        wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
        wf.type = 'text/javascript';
        wf.async = 'true';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wf, s);
    })();
    
    

    
    
    /* banners animate
    ------------------------------------------------ */
    /*
    (function($) {
         $.extend($.fx.step,{
         backgroundPosition: function(fx) {
         if (fx.pos === 0 && typeof fx.end == 'string') {
         var start = $.css(fx.elem,'backgroundPosition');
         start = toArray(start);
         fx.start = [start[0],start[2]];
         var end = toArray(fx.end);
         fx.end = [end[0],end[2]];
         fx.unit = [end[1],end[3]];
         }
         var nowPosX = [];
         nowPosX[0] = ((fx.end[0] - fx.start[0]) * fx.pos) + fx.start[0] + fx.unit[0];
         nowPosX[1] = ((fx.end[1] - fx.start[1]) * fx.pos) + fx.start[1] + fx.unit[1];
         fx.elem.style.backgroundPosition = nowPosX[0]+' '+nowPosX[1];
        
        function toArray(strg){
         strg = strg.replace(/left|top/g,'0px');
         strg = strg.replace(/right|bottom/g,'100%');
         strg = strg.replace(/([0-9\.]+)(\s|\)|$)/g,"$1px$2");
         var res = strg.match(/(-?[0-9\.]+)(px|\%|em|pt)\s(-?[0-9\.]+)(px|\%|em|pt)/);
         return [parseFloat(res[1],10),res[2],parseFloat(res[3],10),res[4]];
         }
         }
         });
    })(jQuery);
    */    
        
    /*
    $(".footer .banner").hover(function() {  
        $(this).stop(true, true).animate({ backgroundPosition: '0 0' }, 500);  
    }, function() {  
        $(this).animate({ backgroundPosition: '0 -80'}, 500);  
    });
    
    function showBannerInColor() {
        $('.footer .banner').stop(true, true).animate({ backgroundPosition: '0 0' }, 500); 
        setTimeout(hideBannerInColor, 1000*10);
        setTimeout(showBannerInColor, 1000*30);
    }
    function hideBannerInColor() {
        $('.footer .banner').stop(true, true).animate({ backgroundPosition: '0 -80' }, 500); 
    }
    setTimeout(showBannerInColor, 1000*20);
  */
  
    // banner cityads.ru
    function cityadsBanner() {
        $('.bnp').find('a[href*="cityads.ru"]').hide();
        if ($('.ca-tizer').size() > 0) { $('.bnp').hide(); }
    }
    setTimeout(cityadsBanner, 1200);
  
});
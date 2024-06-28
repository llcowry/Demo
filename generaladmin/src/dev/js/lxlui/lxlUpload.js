//lxlUpload 
(function($) {
  var ELEM_FILE = 'upload-file',
    ELEM_FORM = 'upload-form',
    ELEM_IFRAME = 'upload-iframe',
    ELEM_CHOOSE = 'upload-choose',
    ELEM_DRAG = 'upload-drag';
  $.lxlUpload = function() {
    return $.lxlui.run.call(null, "lxlUpload", arguments, {
      isStatic: true
    });
  };
  $.lxlDefaults.Upload = {
    elem: null, //绑定对象
    accept: 'images', //允许上传的文件类型：images/file/video/audio
    exts: '', //允许上传的文件后缀名
    auto: true, //是否选完文件后自动上传
    bindAction: '', //手动上传触发的元素
    url: '', //上传地址
    field: 'file', //文件字段名
    method: 'post', //请求上传的 http 类型
    data: {}, //请求上传的额外参数
    drag: true, //是否允许拖拽上传
    size: 0, //文件限制大小，默认不限制
    number: 0, //允许同时上传的文件数，默认不限制
    multiple: false //是否允许多文件上传，不支持ie8-9
  };
  $.lxlMethos.Upload = $.lxlMethos.Upload || {};
  $.lxlui.controls.Upload = function(options) {
    $.lxlui.controls.Upload.base.constructor.call(this, null, options);
  };
  $.lxlui.controls.Upload.lxlExtend($.lxlui.core.UIComponent, {
    __getType: function() {
      return 'Upload';
    },
    __idPrev: function() {
      return 'Upload';
    },
    _extendMethods: function() {
      return $.lxlMethos.Upload;
    },
    _render: function() {
      var g = this,
        options = this.options;
      g.elem = $(options.elem);
      g.bindAction = $(options.bindAction);
      g.initFile();
      g.initEvents();
    },
    showMsg: function(content) {
      return $.lxlDialog.alert(content);
    },
    initFile: function() {
      var g = this,
        options = this.options,
        elemFile = g.elemFile = $(['<input class="' + ELEM_FILE + '" type="file" accept="' + options.acceptMime + '" name="' + options.field + '"', (options.multiple ? ' multiple' : ''), '>'].join('')),
        next = g.elem.next();
      if (next.hasClass(ELEM_FILE) || next.hasClass(ELEM_FORM)) {
        next.remove();
      }
      //包裹ie8/9容器
      if ($.browser.msie && $.browser.version < 10) {
        g.elem.wrap('<div class="upload-wrap"></div>');
      }
      g.isFile() ? (g.elemFile = g.elem, options.field = g.elem[0].name) : g.elem.after(elemFile);
      //初始化ie8/9的Form域
      if ($.browser.msie && $.browser.version < 10) {
        g.initIE();
      }
    },
    initIE: function() {
      var g = this,
        options = this.options,
        iframe = $('<iframe id="' + ELEM_IFRAME + '" class="' + ELEM_IFRAME + '" name="' + ELEM_IFRAME + '" frameborder="0"></iframe>'),
        elemForm = $(['<form target="' + ELEM_IFRAME + '" class="' + ELEM_FORM + '" method="post" key="set-mine" enctype="multipart/form-data" action="' + options.url + '">', '</form>'].join(''));
      //插入iframe    
      $('#' + ELEM_IFRAME)[0] || $('body').append(iframe);
      //包裹文件域
      if (!g.elem.next().hasClass(ELEM_FORM)) {
        g.elemFile.wrap(elemForm);
        //追加额外的参数
        g.elem.next('.' + ELEM_FORM).append(function() {
          var arr = [];
          $.lxlui.each(options.data, function(key, value) {
            value = typeof value === 'function' ? value() : value;
            arr.push('<input type="hidden" name="' + key + '" value="' + value + '">')
          });
          return arr.join('');
        }());
      }
    },
    isFile: function() {
      var options = this.options;
      try {
        var elem = options.elem[0];
        if (!elem) return;
        return elem.tagName.toLocaleLowerCase() === 'input' && elem.type === 'file';
      } catch (e) {}
    },
    preview: function(callback) {
      var g = this;
      if (window.FileReader) {
        $.lxlui.each(g.chooseFiles, function(index, file) {
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function() {
            callback && callback(index, file, this.result);
          }
        });
      }
    },
    upload: function(files, type) {
      var g = this,
        options = this.options,
        elemFile = g.elemFile[0],
        //高级浏览器处理方式，支持跨域
        ajaxSend = function() {
          var successful = 0,
            aborted = 0,
            items = files || g.files || g.chooseFiles || elemFile.files,
            allDone = function() { //多文件全部上传完毕的回调
              if (options.multiple && successful + aborted === g.fileLength) {
                typeof options.allDone === 'function' && options.allDone({
                  total: g.fileLength,
                  successful: successful,
                  aborted: aborted
                });
              }
            };
          $.lxlui.each(items, function(index, file) {
            var formData = new FormData();
            formData.append(options.field, file);
            //追加额外的参数
            $.lxlui.each(options.data, function(key, value) {
              value = typeof value === 'function' ? value() : value;
              formData.append(key, value);
            });
            //提交文件
            $.ajax({
              url: options.url,
              type: 'post',
              data: formData,
              contentType: false,
              processData: false,
              dataType: 'json',
              headers: options.headers || {},
              success: function(res) {
                successful++;
                done(index, res);
                allDone();
              },
              error: function() {
                aborted++;
                g.showMsg('请求上传接口出现异常');
                error(index);
                allDone();
              }
            });
          });
        },
        //低版本IE处理方式，不支持跨域
        iframeSend = function() {
          var iframe = $('#' + ELEM_IFRAME);
          g.elemFile.parent().submit();
          //获取响应信息
          clearInterval(Class.timer);
          Class.timer = setInterval(function() {
            var res, iframeBody = iframe.contents().find('body');
            try {
              res = iframeBody.text();
            } catch (e) {
              g.showMsg('获取上传后的响应信息出现异常');
              clearInterval(Class.timer);
              error();
            }
            if (res) {
              clearInterval(Class.timer);
              iframeBody.html('');
              done(0, res);
            }
          }, 30);
        },
        //统一回调
        done = function(index, res) {
          g.elemFile.next('.' + ELEM_CHOOSE).remove();
          elemFile.value = '';
          if (typeof res !== 'object') {
            try {
              res = JSON.parse(res);
            } catch (e) {
              res = {};
              return g.showMsg('请对上传接口返回有效JSON');
            }
          }
          typeof options.done === 'function' && options.done(res, index || 0, function(files) {
            g.upload(files);
          });
        },
        //统一网络异常回调
        error = function(index) {
          if (options.auto) {
            elemFile.value = '';
          }
          typeof options.error === 'function' && options.error(index || 0, function(files) {
            g.upload(files);
          });
        },
        exts = options.exts,
        check, value = function() {
          var arr = [];
          $.lxlui.each(files || g.chooseFiles, function(i, item) {
            arr.push(item.name);
          });
          return arr;
        }(),
        //回调返回的参数
        args = {
          //预览
          preview: function(callback) {
            g.preview(callback);
          },
          //上传
          upload: function(index, file) {
            var thisFile = {};
            thisFile[index] = file;
            g.upload(thisFile);
          },
          //追加文件到队列
          pushFile: function() {
            g.files = g.files || {};
            $.lxlui.each(g.chooseFiles, function(index, item) {
              g.files[index] = item;
            });
            return g.files;
          },
          //重置文件
          resetFile: function(index, file, filename) {
            var newFile = new File([file], filename);
            g.files = g.files || {};
            g.files[index] = newFile;
          }
        },
        //提交上传
        send = function() {
          //选择文件的回调      
          if (type === 'choose' || options.auto) {
            options.choose && options.choose(args);
            if (type === 'choose') {
              return;
            }
          }
          //上传前的回调
          options.before && options.before(args);
          //IE兼容处理
          if ($.browser.msie) {
            return $.browser.version > 9 ? ajaxSend() : iframeSend();
          }
          ajaxSend();
        }
      //校验文件格式
      value = value.length === 0 ?
        ((elemFile.value.match(/[^\/\\]+\..+/g) || []) || '') :
        value;
      if (value.length === 0) return;
      switch (options.accept) {
        case 'file': //一般文件
          if (exts && !RegExp('\\w\\.(' + exts + ')$', 'i').test(escape(value))) {
            g.showMsg('选择的文件中包含不支持的格式');
            return elemFile.value = '';
          }
          break;
        case 'video': //视频文件
          if (!RegExp('\\w\\.(' + (exts || 'avi|mp4|wma|rmvb|rm|flash|3gp|flv') + ')$', 'i').test(escape(value))) {
            g.showMsg('选择的视频中包含不支持的格式');
            return elemFile.value = '';
          }
          break;
        case 'audio': //音频文件
          if (!RegExp('\\w\\.(' + (exts || 'mp3|wav|mid') + ')$', 'i').test(escape(value))) {
            g.showMsg('选择的音频中包含不支持的格式');
            return elemFile.value = '';
          }
          break;
        default: //图片文件
          $.lxlui.each(value, function(i, item) {
            if (!RegExp('\\w\\.(' + (exts || 'jpg|png|gif|bmp|jpeg$') + ')', 'i').test(escape(item))) {
              check = true;
            }
          });
          if (check) {
            g.showMsg('选择的图片中包含不支持的格式');
            return elemFile.value = '';
          }
          break;
      }
      //检验文件数量
      g.fileLength = function() {
        var length = 0,
          items = files || g.files || g.chooseFiles || elemFile.files;
        $.lxlui.each(items, function() {
          length++;
        });
        return length;
      }();
      if (options.number && g.fileLength > options.number) {
        return g.showMsg('同时最多只能上传的数量为：' + options.number);
      }
      //检验文件大小
      if (options.size > 0 && !($.browser.msie && $.browser.version < 10)) {
        var limitSize;
        $.lxlui.each(g.chooseFiles, function(index, file) {
          if (file.size > 1024 * options.size) {
            var size = options.size / 1024;
            size = size >= 1 ? (size.toFixed(2) + 'MB') : options.size + 'KB'
            elemFile.value = '';
            limitSize = size;
          }
        });
        if (limitSize) return g.showMsg('文件不能超过' + limitSize);
      }
      send();
    },
    initEvents: function() {
      var g = this,
        options = this.options,
        //设置当前选择的文件队列
        setChooseFile = function(files) {
          g.chooseFiles = {};
          $.lxlui.each(files, function(i, item) {
            var time = new Date().getTime();
            g.chooseFiles[time + '-' + i] = item;
          });
        },
        //设置选择的文本
        setChooseText = function(files, filename) {
          var elemFile = g.elemFile,
            value = files.length > 1 ?
            files.length + '个文件' :
            ((files[0] || {}).name || (elemFile[0].value.match(/[^\/\\]+\..+/g) || []) || '');
          if (elemFile.next().hasClass(ELEM_CHOOSE)) {
            elemFile.next().remove();
          }
          g.upload(null, 'choose');
          if (g.isFile() || options.choose) return;
          elemFile.after('<span class="layui-inline ' + ELEM_CHOOSE + '">' + value + '</span>');
        };
      //点击上传容器
      g.elem.off('upload.start').on('upload.start', function() {
        var othis = $(this),
          data = othis.attr('lxlui-data');
        if (data) {
          try {
            data = new Function('return ' + data)();
            g.options = $.extend({}, options, data);
          } catch (e) {
            g.showMsg('Upload element property lxlui-data configuration item has a syntax error: ' + data)
          }
        }
        g.options.item = othis;
        g.elemFile[0].click();
      });
      //拖拽上传
      if (!($.browser.msie && $.browser.version < 10)) {
        g.elem.off('upload.over').on('upload.over', function() {
            var othis = $(this)
            othis.attr('lay-over', '');
          })
          .off('upload.leave').on('upload.leave', function() {
            var othis = $(this)
            othis.removeAttr('lay-over');
          })
          .off('upload.drop').on('upload.drop', function(e, param) {
            var othis = $(this),
              files = param.originalEvent.dataTransfer.files || [];
            othis.removeAttr('lay-over');
            setChooseFile(files);
            if (options.auto) {
              g.upload(files);
            } else {
              setChooseText(files);
            }
          });
      }
      //文件选择
      g.elemFile.off('upload.change').on('upload.change', function() {
        var files = this.files || [];
        setChooseFile(files);
        options.auto ? g.upload() : setChooseText(files); //是否自动触发上传
      });
      //手动触发上传
      g.bindAction.off('upload.action').on('upload.action', function() {
        g.upload();
      });
      //防止事件重复绑定
      if (g.elem.data('haveEvents')) return;
      g.elemFile.on('change', function() {
        $(this).trigger('upload.change');
      });
      g.elem.on('click', function() {
        if (g.isFile()) return;
        $(this).trigger('upload.start');
      });
      if (options.drag) {
        g.elem.on('dragover', function(e) {
          e.preventDefault();
          $(this).trigger('upload.over');
        }).on('dragleave', function(e) {
          $(this).trigger('upload.leave');
        }).on('drop', function(e) {
          e.preventDefault();
          $(this).trigger('upload.drop', e);
        });
      }
      g.bindAction.on('click', function() {
        $(this).trigger('upload.action');
      });
      g.elem.data('haveEvents', true);
    }
  });
})(jQuery);
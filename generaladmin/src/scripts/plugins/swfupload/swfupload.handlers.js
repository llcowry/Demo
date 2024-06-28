$(function() {
  $.swfUpLoadDefaults = $.swfUpLoadDefaults || {};
  $.swfUpLoadDefaults.property = {
    flashurl: ((rootPath == "/") ? "" : rootPath) + "/Content/scripts/plugins/swfupload/swfupload.swf", //控件相对地址
    sendurl: ((rootPath == "/") ? "" : rootPath) + "/Upload/UploadFile", //发送地址
    filetypes: "*.gif;*.jpg;*.jpeg;*.png;*.bmp;", //文件类型
    filesize: "2048 KB", //文件大小
    btntext: "浏览...", //上传按钮的文字
    btnwidth: 58, //上传按钮的宽度
    btnheight: 22, //上传按钮的高度
    single: true, //是否单文件
    watermark: false, //是否加水印
    thumbnail: false, //是否生成缩略图
    uploadtype: null, //上传类型
    savepath: null, //保存路径
    returnobj: null, //返回处理结果的对象
    showobj: "#thumbnails", //返回显示结果的对象，只有文件类型为图片时有效
    replace: false //是否替换原图
  };
  $.fn.InitSWFUpload = function(p) {
    p = $.extend({}, $.swfUpLoadDefaults.property, p || {});
    var parentObj = $(this),
      parentBtnId = "upload_span_" + Math.floor(Math.random() * 1000 + 1);
    parentObj.append('<div class="upload-btn"><span id="' + parentBtnId + '"></span></div>');
    var btnAction = SWFUpload.BUTTON_ACTION.SELECT_FILES; //多文件上传
    if (p.single) btnAction = SWFUpload.BUTTON_ACTION.SELECT_FILE; //单文件上传
    else p.btntext = "批量上传";
    var swfu = new SWFUpload({
      upload_url: p.sendurl,
      flash_url: p.flashurl,
      file_types: p.filetypes,
      file_types_description: "文件类型",
      file_size_limit: p.filesize,
      file_upload_limit: "0",
      file_queue_error_handler: function(file, errorCode, message) {
        try {
          switch (errorCode) {
            case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
              alert("你选择的文件太多！");
              break;
            case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
              alert(file.name + "文件太小！");
              break;
            case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
              alert(file.name + "文件太大！");
              break;
            case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
              alert(file.name + "文件类型出错！");
              break;
            default:
              if (file !== null) {
                alert("出现未知错误！");
              }
              break;
          }
        } catch (ex) {
          this.debug(ex);
        }
      },
      file_dialog_complete_handler: function(numFilesSelected, numFilesQueued) {
        try {
          if (numFilesQueued > 0) {
            var sendurl = "";
            if (p.watermark) sendurl += "&watermark=1";
            if (p.thumbnail) sendurl += "&thumbnail=1";
            if (p.uploadtype) sendurl += "&uploadtype=" + p.uploadtype;
            if (this.customSettings.button_action == SWFUpload.BUTTON_ACTION.SELECT_FILE) {
              if (p.returnobj) {
                sendurl += "&p1=" + escape($(p.returnobj).val());
              } else if (p.replace) {
                sendurl += "&p1=" + escape($(p.showobj).attr("src"));
              }
            }
            if (p.savepath) sendurl += "&p2=" + p.savepath;
            sendurl = p.sendurl + "?" + sendurl.ldel(1);
            this.setUploadURL(sendurl);
            this.startUpload();
            var targetObj = $(this.customSettings.upload_target);
            var fileProgressObj = $('<div class="upload-progress"></div>').appendTo(targetObj);
            var progressText = $('<span class="txt">正在上传，请稍候...</span>').appendTo(fileProgressObj);
            var progressBar = $('<span class="bar"><b></b></span>').appendTo(fileProgressObj);
            var progressCancel = $('<a class="close" title="取消上传">关闭</a>').appendTo(fileProgressObj);
            progressCancel.click(function() {
              this.stopUpload();
              fileProgressObj.remove();
            });
          }
        } catch (ex) {
          this.debug(ex);
        }
      },
      upload_progress_handler: function(file, bytesLoaded) {
        try {
          var percent = Math.ceil((bytesLoaded / file.size) * 100);
          var progressObj = $(this.customSettings.upload_target).children(".upload-progress");
          progressObj.children(".txt").html(file.name);
          progressObj.find(".bar b").width(percent + "%");
        } catch (ex) {
          this.debug(ex);
        }
      },
      upload_error_handler: function(file, errorCode, message) {
        var progress;
        try {
          switch (errorCode) {
            case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
              try {
                var progressObj = $(this.customSettings.upload_target).children(".upload-progress");
                progressObj.children(".txt").html("上传被取消：Cancelled");
              } catch (ex1) {
                this.debug(ex1);
              }
              break;
            case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
              try {
                var progressObj = $(this.customSettings.upload_target).children(".upload-progress");
                progressObj.children(".txt").html("上传被停止：Stopped");
              } catch (ex2) {
                this.debug(ex2);
              }
            case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
              alert(message + "SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED");
              break;
            default:
              alert(message + "未知！");
              break;
          }
        } catch (ex3) {
          this.debug(ex3);
        }
      },
      upload_success_handler: function(file, serverData) {
        try {
          var jsonstr = eval('(' + serverData + ')');
          if (jsonstr.status == '0') {
            alert(jsonstr.msg);
          } else if (jsonstr.status == '1') {
            if (this.customSettings.button_action == SWFUpload.BUTTON_ACTION.SELECT_FILE) {
              if (p.returnobj) {
                switch (p.uploadtype) {
                  case "import_txt":
                    $(p.returnobj).val(jsonstr.content);
                    break;
                  case "soft_file":
                    $(p.returnobj).val(jsonstr.path);
                    $("#filename").val(jsonstr.name);
                    $("#filetype").val(jsonstr.type);
                    $("#filesize").val(jsonstr.size);
                    break;
                  default:
                    $(p.returnobj).val(jsonstr.path);
                    break;
                }
              }
              if ($(p.showobj).length > 0 && p.uploadtype != "soft_file" && p.uploadtype != "video_file") {
                $(p.showobj).attr("src", jsonstr.path);
                if (p.uploadtype != "avatar") $(p.showobj).css({
                  width: jsonstr.width + "px",
                  height: jsonstr.height + "px"
                });
              }
            } else {
              var s1 = "p" + Math.floor(Math.random() * 1000 + 1);
              var s = $('<span id="' + s1 + '"><img src="' + jsonstr.thumb + '" alt="' + jsonstr.name + '" /><br /><a href="javascript:void(0);" class="deleteico delthis">删除</a><input type="hidden" name="piclist" value="' + jsonstr.path + '" /></span>');
              if (p.returnobj) {
                $(p.returnobj).show()
                s.appendTo($(p.returnobj)).find(".delthis").click(function() {
                  util.delPic(s1, jsonstr.path);
                });
              }
            }
            var progressObj = $(this.customSettings.upload_target).children(".upload-progress");
            progressObj.children(".txt").html("上传成功：" + file.name);
          }
        } catch (ex) {
          this.debug(ex);
        }
      },
      upload_complete_handler: function(file) {
        try {
          if (this.getStats().files_queued > 0) {
            this.startUpload();
          } else {
            var progressObj = $(this.customSettings.upload_target).children(".upload-progress");
            progressObj.children(".txt").html("全部上传成功！");
            progressObj.remove();
          }
        } catch (ex) {
          this.debug(ex);
        }
      },
      button_placeholder_id: parentBtnId, //指定一个dom元素
      button_width: p.btnwidth, //上传按钮的宽度
      button_height: p.btnheight, //上传按钮的高度
      button_text: '<span class="btnText">' + p.btntext + '</span>', //上传按钮的文字
      button_text_style: '.btnText{font-family:"Microsoft YaHei";font-size:12px;line-height:22px;color:#333;text-align:center;}', //按钮样式
      button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT, //背景透明
      button_action: btnAction, //单文件或多文件上传
      button_cursor: SWFUpload.CURSOR.HAND, //指针手形
      post_params: {
        "ASPSESSID": "NONE"
      },
      custom_settings: {
        "upload_target": parentObj,
        "button_action": btnAction
      },
      use_query_string: false,
      debug: false
    });
  }
});
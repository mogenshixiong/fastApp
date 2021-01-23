/*
示例

JS 
$(function(){
    renderUploadFile(); //初始化上传组件
})
function renderUploadFile(){
    mg.renderUploadFile({//初始化组件
        id: "dfasdw",//ID
        btnId:"dfasdw_button",
        url: "/uploadAppIcon", //上传路径
        callBack: function(responseText, statusText, xhr, $form){
            console.log(responseText);
        }
    });
}

HTML
<button  class="btn btn-info" id="dfasdw_button" type="button">
    <i class="fa fa-cloud-upload"></i>&nbsp;上传考勤文件
</button>
<div id="dfasdw" style="margin-top: 10px;"></div>

*/



mg.uploadFile = function(id){
    $('#'+id+'_uploadPathFile').click();
}

mg.renderUploadFile = function(params){
    // setp0 为上传按钮绑定点击事件
    document.getElementById(params.btnId).addEventListener("click", function(){
        mg.uploadFile(params.id)
    });

    //step1 生成DOM元素
    $("#"+params.id).html(`
        <img id="${params.id}_show" class="apps-img" 
            src="" alt="" style="display: none;height:40px;" />
        <span id="${params.id}_fileName" style="display: none;"></span>
        <input id="${params.id}_exampleInputFile" type="file" class="hide"/>
        <form target="${params.id}_nm_iframe" action="${params.url}" id="${params.id}_uploadForm"
            method="post" enctype="multipart/form-data">
            <input type="file" name="uploadPathFile" style="display:none;"
                id="${params.id}_uploadPathFile">
        </form>
        <iframe id="${params.id}_nm_iframe" name="${params.id}_nm_iframe" style="display:none;"></iframe>
    `);
    //step2 绑定提交事件
    document.querySelector("input[name='uploadPathFile']").addEventListener('change', function () {
        var formData = new FormData();
      
        //将文件信息追加到其中
        var files1 = $("input[name='uploadPathFile']")[0];
        formData.append('file', files1.files[0]);
        
        var options = { 
			type: 'POST',
			url: params.url,
	        success: showResponse,  
	        dataType: 'json',
			error : function(xhr, status, err) {			
				alert("上传失败");
			}
        }
        $("#"+params.id+"_uploadForm").submit(function() {
            $(this).ajaxSubmit(options);
            return false; //阻止表单默认提交
        });
        $("#"+params.id+"_uploadForm").submit();
    });
    // step3 上传完成后，回调方法
    function showResponse(responseText, statusText, xhr, $form){ 
        if (responseText.code == 1) {
            $("#dfasdw_uploadPathFile").val(null);
            //并清空上传文件Input，防止再次上传重复文件时没有触发change事件
            $("#dfasdw_show").attr("src",'../../'+responseText.path);
            $("#dfasdw_show").show();
            $("#dfasdw_fileName").html(responseText.filename);
            $("#dfasdw_fileName").show();
            params.callBack(responseText, statusText, xhr, $form);
        } else if (responseText.code == 0) {
            layer.msg('上传失败!');
        }
    }
}
//标签加载完毕后执行一次的方法
$(function(){
	//标签的监听事件
	
	$('section>ul>li').on('click',function(){
		$(this).addClass('liSelected');
		$(this).siblings().removeClass('liSelected');
		//得到当前点击的实第几个li标签  0,1,2,3
		var xuhao=$(this).index();
		//jquery动画
		//show(1000)显示方法  hide()隐藏方法
		//fadeIn() fadeOut()  渐变的效果
		//slideUp() slideDown()   上下滑动的效果
		//toggle()来回切换
		$('.content>div').eq(xuhao).slideDown(1000);
		$('.content>div').eq(xuhao).siblings().slideUp();
	});
	$('section>ul>li').eq(0).click();
	
	
	$('footer>ul>li').on('click',function(){
		//1、图片的src
		//方法1  $(this).children()
		//方法2
		//得到当前点击的li标签的序号 0,1 2,3,4
		var xuhao=$(this).index();
		$("section>div").eq(xuhao).show().siblings().hide();
		
		//改变header标题  html方法 是改变标签的所有内容 text
		var divHtml=$('footer>ul>li>div').eq(xuhao).html();
		$('header').html(divHtml);
		
		//新的图片路径=当前图片路径  去掉-
		//eq（0）得到第1个标签
		//attr("属性名")得到标签的属性
		var dangqianSrc=$('footer>ul>li>img').eq(xuhao).attr("src");
		//substring(开始位置，结束位置)结束位置省略就是默认字符串长度
		//lastIndexOf("/")从右往左  得到的第一个/ 的位置
		//indexOf('/')从左往右  得到的第一个/ 的位置
		dangqianSrc=dangqianSrc.substring(dangqianSrc.lastIndexOf("/")+1);
		//console.log(dangqianSrc);
		var newSrc="assets/icon/"+dangqianSrc.substring(1);
		//console.log(newSrc);
		//改变图片的src  _home.png ->  home.png
		$('footer>ul>li>img').eq(xuhao).attr("src",newSrc);
		//2、文字颜色
		$('footer>ul>li>div').eq(xuhao).css("color",'red');
		//$('footer>ul>li>div').eq(xuhao).siblings().css("color",'black');
		//去掉其他选中图片的颜色src路径   home.png -> _home.png
		//得到了其他的4个li标签
		var qitaLiTag=$('footer>ul>li').eq(xuhao).siblings();
		//var qitaLiTag=document.getElementsByTagName("footer")[0];
		//得到了这4个li 标签的孩子标签 有8个 4个img 4个div
		var qitaImgTag=qitaLiTag.children('img');
		//var qitaImgTag=qitaLiTag.getElementsByTagName("img");
		//得到src属性
		for(var i=0;i<qitaImgTag.length;i++){
			var jiuSrc=qitaImgTag[i].src;
			console.log(jiuSrc);
			//如果是 home.png -> _home.png
			if(jiuSrc.indexOf("_") == -1){
				//得到新的src
				jiuSrc=jiuSrc.substring(jiuSrc.lastIndexOf("/")+1);
				console.log(jiuSrc);
				var xindeSrc="assets/icon/_"+jiuSrc;
				qitaImgTag.eq(i).attr("src",xindeSrc);
				//qitaImgTag[i].src=xindeSrc;
				qitaLiTag.children('div').eq(i).css("color",'black');
			}			
		}
	});
	$('footer>ul>li').eq(0).click();
	//接口  API 
	//三大要素：
	//1、请求地址
	//2、请求传入参数
	//3、返回的值
	//发送请求 得到json数据
	//{
	//	"属性名":{
	//		"属性名":[{},{}]
	//	},
	//	"属性名":"属性值"
	//}
	/* var rearUrl = 'http://157.122.54.189:9088/image/v3/homepage/vertical?limit=30&order=%27hot%27&skip=0'; */
	$.ajax({
		/* url:'http://127.0.0.1:8989',//请求地址 请求代理服务器地址 */
		/* data:{"baseUrl":rearUrl}, //携带 真正的请求地址 参数过去 */
		/* dataType:'json',//请求返回值的类型 dataType */
		type:"get",
		url:"./assets/data/home.json",
		success:function(data){
			/* alert("数据加载成功"); */
			//推荐内容的数据
			var tuijianArr = data.res.homepage[1].items;
			console.log(tuijianArr);
			//map循环
			tuijianArr.map(function(m){
				$(".tuijian").append("<img src='"+m.thumb+"'/>");
			})
			//月份内容的数据
			var yuefenArr = data.res.homepage[2].items;
			console.log(yuefenArr);
			yuefenArr.map(function(y,i){
				if(i%2==0)
				{
					$(".yuefen").append("<img src='"+y.thumb+y.rule.replace("$<Height>","320")+"'/>");
				}
				else
				{
					$(".yuefen").append("<img src='"+y.thumb+y.rule.replace("$<Height>","320")+" 'style='margin-left:3%;'/>");
				}	
			})
			//热门内容的数据
			var remenArr = data.res.vertical;
			console.log(remenArr);
			remenArr.map(function(r,o){
				if(o%2==0)
				{
					$(".remen").append("<img src='"+r.thumb+"'/>");
				}
				else
				{
					$(".remen").append("<img src='"+r.thumb+"  'style='margin-left:3%;'/>");
				}
			})
		},//请求成功的方法
		error:function(){
			alert("数据加载失败");
		}//请求失败的方法
	});
	//分类的数据功能
	$.ajax({
		type:"get",	
		url:"./assets/data/hhh.json",
		success:function(data){
			/* alert("数据加载成功"); */
			//推荐内容的数据
			var categoryArr = data.res.category;
			console.log(categoryArr);
			//map循环
			categoryArr.map(function(m){
				$(".swiper").append("<img src='"+m.cover+"'/>");
				$(".list").append(m.name);
			})
		},//请求成功的方法
		error:function(){
			alert("数据加载失败");
		}//请求失败的方法
	})
	
	$("videodiv").empty();
	//视频推荐的数据功能
	$.ajax({
		type:"get", 
		url:"./assets/data/video.json",
		success:function(data){
			var videoArr = data.res.videowp;
			console.log(videoArr);
			
			//map循环
			videoArr.map(function(d){
				$(".videodiv").append("<img src='"+d.img+"'></img>");
			})
		},
		error:function(data){
			console.log("数据加载失败！");
		}
	})
})

function vdo(url){
	//window.open("video.html");
	alert(url);
	window.location.url="video.html?"+url;
}

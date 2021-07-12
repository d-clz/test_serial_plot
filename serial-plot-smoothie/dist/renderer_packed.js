!function(t){var e={};function i(s){if(e[s])return e[s].exports;var a=e[s]={i:s,l:!1,exports:{}};return t[s].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)i.d(s,a,function(e){return t[e]}.bind(null,a));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){const s=i(1),a=new Array(numPlots),o=new Array(numPlots),n=["rgba(0, 255, 0, 1)","rgba(255, 0, 0, 1)"],r=["rgba(0, 255, 0, 0.2)","rgba(255, 0, 0, 0.2)"];for(var l=0;l<numPlots;l++)a[l]=new s.TimeSeries,o[l]=new s.SmoothieChart({minValue:0,maxValue:4095,tooltip:!0,timestampFormatter:s.SmoothieChart.timeFormatter,interpolation:"linear"}),o[l].addTimeSeries(a[l],{strokeStyle:n[l],fillStyle:r[l],lineWidth:1}),o[l].streamTo(document.getElementById("chart"+l),0);renderPlots=function(){for(var t=0;t<numPlots;t++)a[t].append((new Date).getTime(),pointsArr[t])}},function(t,e,i){!function(t){Date.now=Date.now||function(){return(new Date).getTime()};var e={extend:function(){arguments[0]=arguments[0]||{};for(var t=1;t<arguments.length;t++)for(var i in arguments[t])arguments[t].hasOwnProperty(i)&&("object"==typeof arguments[t][i]?arguments[t][i]instanceof Array?arguments[0][i]=arguments[t][i]:arguments[0][i]=e.extend(arguments[0][i],arguments[t][i]):arguments[0][i]=arguments[t][i]);return arguments[0]},binarySearch:function(t,e){for(var i=0,s=t.length;i<s;){var a=i+s>>1;e<t[a][0]?s=a:i=a+1}return i}};function i(t){this.options=e.extend({},i.defaultOptions,t),this.disabled=!1,this.clear()}function s(t){this.options=e.extend({},s.defaultChartOptions,t),this.seriesSet=[],this.currentValueRange=1,this.currentVisMinValue=0,this.lastRenderTimeMillis=0,this.lastChartTimestamp=0,this.mousemove=this.mousemove.bind(this),this.mouseout=this.mouseout.bind(this)}i.defaultOptions={resetBoundsInterval:3e3,resetBounds:!0},i.prototype.clear=function(){this.data=[],this.maxValue=Number.NaN,this.minValue=Number.NaN},i.prototype.resetBounds=function(){if(this.data.length){this.maxValue=this.data[0][1],this.minValue=this.data[0][1];for(var t=1;t<this.data.length;t++){var e=this.data[t][1];e>this.maxValue&&(this.maxValue=e),e<this.minValue&&(this.minValue=e)}}else this.maxValue=Number.NaN,this.minValue=Number.NaN},i.prototype.append=function(t,e,i){for(var s=this.data.length-1;s>=0&&this.data[s][0]>t;)s--;-1===s?this.data.splice(0,0,[t,e]):this.data.length>0&&this.data[s][0]===t?i?(this.data[s][1]+=e,e=this.data[s][1]):this.data[s][1]=e:s<this.data.length-1?this.data.splice(s+1,0,[t,e]):this.data.push([t,e]),this.maxValue=isNaN(this.maxValue)?e:Math.max(this.maxValue,e),this.minValue=isNaN(this.minValue)?e:Math.min(this.minValue,e)},i.prototype.dropOldData=function(t,e){for(var i=0;this.data.length-i>=e&&this.data[i+1][0]<t;)i++;0!==i&&this.data.splice(0,i)},s.tooltipFormatter=function(t,e){for(var i=[(this.options.timestampFormatter||s.timeFormatter)(new Date(t))],a=0;a<e.length;++a)i.push('<span style="color:'+e[a].series.options.strokeStyle+'">'+this.options.yMaxFormatter(e[a].value,this.options.labels.precision)+"</span>");return i.join("<br>")},s.defaultChartOptions={millisPerPixel:20,enableDpiScaling:!0,yMinFormatter:function(t,e){return parseFloat(t).toFixed(e)},yMaxFormatter:function(t,e){return parseFloat(t).toFixed(e)},yIntermediateFormatter:function(t,e){return parseFloat(t).toFixed(e)},maxValueScale:1,minValueScale:1,interpolation:"bezier",scaleSmoothing:.125,maxDataSetLength:2,scrollBackwards:!1,displayDataFromPercentile:1,grid:{fillStyle:"#000000",strokeStyle:"#777777",lineWidth:1,sharpLines:!1,millisPerLine:1e3,verticalSections:2,borderVisible:!0},labels:{fillStyle:"#ffffff",disabled:!1,fontSize:10,fontFamily:"monospace",precision:2,showIntermediateLabels:!1,intermediateLabelSameAxis:!0},horizontalLines:[],tooltip:!1,tooltipLine:{lineWidth:1,strokeStyle:"#BBBBBB"},tooltipFormatter:s.tooltipFormatter,nonRealtimeData:!1,responsive:!1,limitFPS:0},s.AnimateCompatibility={requestAnimationFrame:function(t,e){return(window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return window.setTimeout(function(){t(Date.now())},16)}).call(window,t,e)},cancelAnimationFrame:function(t){return(window.cancelAnimationFrame||function(t){clearTimeout(t)}).call(window,t)}},s.defaultSeriesPresentationOptions={lineWidth:1,strokeStyle:"#ffffff"},s.prototype.addTimeSeries=function(t,i){this.seriesSet.push({timeSeries:t,options:e.extend({},s.defaultSeriesPresentationOptions,i)}),t.options.resetBounds&&t.options.resetBoundsInterval>0&&(t.resetBoundsTimerId=setInterval(function(){t.resetBounds()},t.options.resetBoundsInterval))},s.prototype.removeTimeSeries=function(t){for(var e=this.seriesSet.length,i=0;i<e;i++)if(this.seriesSet[i].timeSeries===t){this.seriesSet.splice(i,1);break}t.resetBoundsTimerId&&clearInterval(t.resetBoundsTimerId)},s.prototype.getTimeSeriesOptions=function(t){for(var e=this.seriesSet.length,i=0;i<e;i++)if(this.seriesSet[i].timeSeries===t)return this.seriesSet[i].options},s.prototype.bringToFront=function(t){for(var e=this.seriesSet.length,i=0;i<e;i++)if(this.seriesSet[i].timeSeries===t){var s=this.seriesSet.splice(i,1);this.seriesSet.push(s[0]);break}},s.prototype.streamTo=function(t,e){this.canvas=t,this.delay=e,this.start()},s.prototype.getTooltipEl=function(){return this.tooltipEl||(this.tooltipEl=document.createElement("div"),this.tooltipEl.className="smoothie-chart-tooltip",this.tooltipEl.style.position="absolute",this.tooltipEl.style.display="none",document.body.appendChild(this.tooltipEl)),this.tooltipEl},s.prototype.updateTooltip=function(){var t=this.getTooltipEl();if(this.mouseover&&this.options.tooltip){for(var i=this.lastChartTimestamp,s=this.options.scrollBackwards?i-this.mouseX*this.options.millisPerPixel:i-(this.canvas.offsetWidth-this.mouseX)*this.options.millisPerPixel,a=[],o=0;o<this.seriesSet.length;o++){var n=this.seriesSet[o].timeSeries;if(!n.disabled){var r=e.binarySearch(n.data,s);r>0&&r<n.data.length&&a.push({series:this.seriesSet[o],index:r,value:n.data[r][1]})}}a.length?(t.innerHTML=this.options.tooltipFormatter.call(this,s,a),t.style.display="block"):t.style.display="none"}else t.style.display="none"},s.prototype.mousemove=function(t){this.mouseover=!0,this.mouseX=t.offsetX,this.mouseY=t.offsetY,this.mousePageX=t.pageX,this.mousePageY=t.pageY;var e=this.getTooltipEl();e.style.top=Math.round(this.mousePageY)+"px",e.style.left=Math.round(this.mousePageX)+"px",this.updateTooltip()},s.prototype.mouseout=function(){this.mouseover=!1,this.mouseX=this.mouseY=-1,this.tooltipEl&&(this.tooltipEl.style.display="none")},s.prototype.resize=function(){var t,e,i=this.options.enableDpiScaling&&window?window.devicePixelRatio:1;this.options.responsive?(t=this.canvas.offsetWidth,e=this.canvas.offsetHeight,t!==this.lastWidth&&(this.lastWidth=t,this.canvas.setAttribute("width",Math.floor(t*i).toString()),this.canvas.getContext("2d").scale(i,i)),e!==this.lastHeight&&(this.lastHeight=e,this.canvas.setAttribute("height",Math.floor(e*i).toString()),this.canvas.getContext("2d").scale(i,i))):1!==i&&(t=parseInt(this.canvas.getAttribute("width")),e=parseInt(this.canvas.getAttribute("height")),this.originalWidth&&Math.floor(this.originalWidth*i)===t||(this.originalWidth=t,this.canvas.setAttribute("width",Math.floor(t*i).toString()),this.canvas.style.width=t+"px",this.canvas.getContext("2d").scale(i,i)),this.originalHeight&&Math.floor(this.originalHeight*i)===e||(this.originalHeight=e,this.canvas.setAttribute("height",Math.floor(e*i).toString()),this.canvas.style.height=e+"px",this.canvas.getContext("2d").scale(i,i)))},s.prototype.start=function(){if(!this.frame){this.canvas.addEventListener("mousemove",this.mousemove),this.canvas.addEventListener("mouseout",this.mouseout);var t=function(){this.frame=s.AnimateCompatibility.requestAnimationFrame(function(){if(this.options.nonRealtimeData){var e=new Date(0),i=this.seriesSet.reduce(function(t,e){var i=e.timeSeries.data,s=Math.round(this.options.displayDataFromPercentile*i.length)-1;if(s=(s=s>=0?s:0)<=i.length-1?s:i.length-1,i&&i.length>0){var a=i[s][0];t=t>a?t:a}return t}.bind(this),e);this.render(this.canvas,i>e?i:null)}else this.render();t()}.bind(this))}.bind(this);t()}},s.prototype.stop=function(){this.frame&&(s.AnimateCompatibility.cancelAnimationFrame(this.frame),delete this.frame,this.canvas.removeEventListener("mousemove",this.mousemove),this.canvas.removeEventListener("mouseout",this.mouseout))},s.prototype.updateValueRange=function(){for(var t=this.options,e=Number.NaN,i=Number.NaN,s=0;s<this.seriesSet.length;s++){var a=this.seriesSet[s].timeSeries;a.disabled||(isNaN(a.maxValue)||(e=isNaN(e)?a.maxValue:Math.max(e,a.maxValue)),isNaN(a.minValue)||(i=isNaN(i)?a.minValue:Math.min(i,a.minValue)))}if(null!=t.maxValue?e=t.maxValue:e*=t.maxValueScale,null!=t.minValue?i=t.minValue:i-=Math.abs(i*t.minValueScale-i),this.options.yRangeFunction){var o=this.options.yRangeFunction({min:i,max:e});i=o.min,e=o.max}if(!isNaN(e)&&!isNaN(i)){var n=e-i-this.currentValueRange,r=i-this.currentVisMinValue;this.isAnimatingScale=Math.abs(n)>.1||Math.abs(r)>.1,this.currentValueRange+=t.scaleSmoothing*n,this.currentVisMinValue+=t.scaleSmoothing*r}this.valueRange={min:i,max:e}},s.prototype.render=function(t,e){var i=Date.now();if(!(this.options.limitFPS>0&&i-this.lastRenderTimeMillis<1e3/this.options.limitFPS)){if(!this.isAnimatingScale){var s=Math.min(1e3/6,this.options.millisPerPixel);if(i-this.lastRenderTimeMillis<s)return}this.resize(),this.updateTooltip(),this.lastRenderTimeMillis=i,t=t||this.canvas,e=e||i-(this.delay||0),e-=e%this.options.millisPerPixel,this.lastChartTimestamp=e;var a=t.getContext("2d"),o=this.options,n={top:0,left:0,width:t.clientWidth,height:t.clientHeight},r=e-n.width*o.millisPerPixel,l=function(t){var e=t-this.currentVisMinValue;return 0===this.currentValueRange?n.height:n.height-Math.round(e/this.currentValueRange*n.height)}.bind(this),h=function(t){return o.scrollBackwards?Math.round((e-t)/o.millisPerPixel):Math.round(n.width-(e-t)/o.millisPerPixel)};if(this.updateValueRange(),a.font=o.labels.fontSize+"px "+o.labels.fontFamily,a.save(),a.translate(n.left,n.top),a.beginPath(),a.rect(0,0,n.width,n.height),a.clip(),a.save(),a.fillStyle=o.grid.fillStyle,a.clearRect(0,0,n.width,n.height),a.fillRect(0,0,n.width,n.height),a.restore(),a.save(),a.lineWidth=o.grid.lineWidth,a.strokeStyle=o.grid.strokeStyle,o.grid.millisPerLine>0){a.beginPath();for(var u=e-e%o.grid.millisPerLine;u>=r;u-=o.grid.millisPerLine){var m=h(u);o.grid.sharpLines&&(m-=.5),a.moveTo(m,0),a.lineTo(m,n.height)}a.stroke(),a.closePath()}for(var d=1;d<o.grid.verticalSections;d++){var c=Math.round(d*n.height/o.grid.verticalSections);o.grid.sharpLines&&(c-=.5),a.beginPath(),a.moveTo(0,c),a.lineTo(n.width,c),a.stroke(),a.closePath()}if(o.grid.borderVisible&&(a.beginPath(),a.strokeRect(0,0,n.width,n.height),a.closePath()),a.restore(),o.horizontalLines&&o.horizontalLines.length)for(var p=0;p<o.horizontalLines.length;p++){var f=o.horizontalLines[p],g=Math.round(l(f.value))-.5;a.strokeStyle=f.color||"#ffffff",a.lineWidth=f.lineWidth||1,a.beginPath(),a.moveTo(0,g),a.lineTo(n.width,g),a.stroke(),a.closePath()}for(var v=0;v<this.seriesSet.length;v++){a.save();var S=this.seriesSet[v].timeSeries;if(!S.disabled){var y=S.data,b=this.seriesSet[v].options;S.dropOldData(r,o.maxDataSetLength),a.lineWidth=b.lineWidth,a.strokeStyle=b.strokeStyle,a.beginPath();for(var w=0,x=0,P=0,T=0;T<y.length&&1!==y.length;T++){var V=h(y[T][0]),F=l(y[T][1]);if(0===T)w=V,a.moveTo(V,F);else switch(o.interpolation){case"linear":case"line":a.lineTo(V,F);break;case"bezier":default:a.bezierCurveTo(Math.round((x+V)/2),P,Math.round(x+V)/2,F,V,F);break;case"step":a.lineTo(V,P),a.lineTo(V,F)}x=V,P=F}y.length>1&&(b.fillStyle&&(a.lineTo(n.width+b.lineWidth+1,P),a.lineTo(n.width+b.lineWidth+1,n.height+b.lineWidth+1),a.lineTo(w,n.height+b.lineWidth),a.fillStyle=b.fillStyle,a.fill()),b.strokeStyle&&"none"!==b.strokeStyle&&a.stroke(),a.closePath()),a.restore()}}if(o.tooltip&&this.mouseX>=0&&(a.lineWidth=o.tooltipLine.lineWidth,a.strokeStyle=o.tooltipLine.strokeStyle,a.beginPath(),a.moveTo(this.mouseX,0),a.lineTo(this.mouseX,n.height),a.closePath(),a.stroke(),this.updateTooltip()),!o.labels.disabled&&!isNaN(this.valueRange.min)&&!isNaN(this.valueRange.max)){var M=o.yMaxFormatter(this.valueRange.max,o.labels.precision),N=o.yMinFormatter(this.valueRange.min,o.labels.precision),k=o.scrollBackwards?0:n.width-a.measureText(M).width-2,R=o.scrollBackwards?0:n.width-a.measureText(N).width-2;a.fillStyle=o.labels.fillStyle,a.fillText(M,k,o.labels.fontSize),a.fillText(N,R,n.height-2)}if(o.labels.showIntermediateLabels&&!isNaN(this.valueRange.min)&&!isNaN(this.valueRange.max)&&o.grid.verticalSections>0){var L=(this.valueRange.max-this.valueRange.min)/o.grid.verticalSections,B=n.height/o.grid.verticalSections;for(d=1;d<o.grid.verticalSections;d++){c=n.height-Math.round(d*B);o.grid.sharpLines&&(c-=.5);var A=o.yIntermediateFormatter(this.valueRange.min+d*L,o.labels.precision);intermediateLabelPos=o.labels.intermediateLabelSameAxis?o.scrollBackwards?0:n.width-a.measureText(A).width-2:o.scrollBackwards?n.width-a.measureText(A).width-2:0,a.fillText(A,intermediateLabelPos,c-o.grid.lineWidth)}}if(o.timestampFormatter&&o.grid.millisPerLine>0){var W=o.scrollBackwards?a.measureText(N).width:n.width-a.measureText(N).width+4;for(u=e-e%o.grid.millisPerLine;u>=r;u-=o.grid.millisPerLine){m=h(u);if(!o.scrollBackwards&&m<W||o.scrollBackwards&&m>W){var D=new Date(u),C=o.timestampFormatter(D),E=a.measureText(C).width;W=o.scrollBackwards?m+E+2:m-E-2,a.fillStyle=o.labels.fillStyle,o.scrollBackwards?a.fillText(C,m,n.height-2):a.fillText(C,m-E,n.height-2)}}}a.restore()}},s.timeFormatter=function(t){function e(t){return(t<10?"0":"")+t}return e(t.getHours())+":"+e(t.getMinutes())+":"+e(t.getSeconds())},t.TimeSeries=i,t.SmoothieChart=s}(e)}]);
//# sourceMappingURL=renderer_packed.js.map
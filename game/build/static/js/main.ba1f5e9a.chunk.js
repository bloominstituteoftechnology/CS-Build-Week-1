(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,n){e.exports=n(24)},17:function(e,t,n){},22:function(e,t,n){},24:function(e,t,n){"use strict";n.r(t);var i=n(0),o=n.n(i),a=n(11),r=n.n(a),l=(n(17),n(2)),s=n(3),c=n(5),p=n(4),u=n(6),g=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(c.a)(this,Object(p.a)(t).call(this,e))).drawCanvas=function(){var e=n.refs.game,t=n.refs.game.getContext("2d"),i=n.props.grid.slice();e.width=e.height=n.props.canvasSize,t.strokeStyle=t.fillStyle=n.props.gridColor;for(var o=.5;o<n.props.numCells*n.props.cellSize;o+=n.props.cellSize)t.moveTo(o,0),t.lineTo(o,n.props.numCells*n.props.cellSize);for(var a=.5;a<n.props.numCells*n.props.cellSize;a+=n.props.cellSize)t.moveTo(0,a),t.lineTo(n.props.numCells*n.props.cellSize,a);t.stroke();for(var r=0;r<i.length;r++)for(var l=0;l<i[r].length;l++){i[r][l].isAlive&&t.fillRect(r*n.props.cellSize+1,l*n.props.cellSize+1,n.props.cellSize-1,n.props.cellSize-1)}},n.onGameClick=function(e){e.preventDefault(),n.props.onGameClick(e,n.refs.game),console.log("game click")},n.componentDidUpdate=function(e){n.drawCanvas()},n.componentDidMount=function(){n.drawCanvas(),n.props.randomize()},n.state={buttonCommand:null},n}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement("canvas",{ref:"game",className:"game",onClick:function(t){return e.onGameClick(t)}})}}]),t}(i.Component),h=function e(){var t=this;arguments.length>0&&void 0!==arguments[0]&&arguments[0],arguments.length>1&&void 0!==arguments[1]&&arguments[1];Object(l.a)(this,e),this.create=function(){t.isAlive=!0},this.kill=function(){t.isAlive=!1},this.toggleState=function(){t.isAlive?t.isAlive=!1:t.isAlive=!0},this.isAlive=this.isAlive,this.isClickable=this.isClickable},f=n(9),v=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(c.a)(this,Object(p.a)(t).call(this,e))).onButtonClick=function(e){e.preventDefault(),n.props.onButtonClick(),"play"!==n.state.icon&&"stop"!==n.state.icon||(n.props.isShowingPlay?n.setState({icon:"play"}):n.setState({icon:"stop"}))},n.componentWillUpdate=function(e){e.isShowingPlay!==n.props.isShowingPlay&&("play"!==n.state.icon&&"stop"!==n.state.icon||(n.props.isShowingPlay?n.setState({icon:"play"}):n.setState({icon:"stop"})))},n.state={icon:n.props.icon},n}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e,t=this;return e=(this.state.icon,o.a.createElement(f.a,{icon:this.state.icon})),o.a.createElement("button",{className:"controls__button",onClick:function(e){return t.onButtonClick(e)}},e)}}]),t}(i.Component),m=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(c.a)(this,Object(p.a)(t).call(this,e))).onStepClick=function(e){n.props.step(),console.log("step click")},n.onPlayStopClick=function(e){n.props.playStop(),console.log("play/stop click")},n.onClearClick=function(e){n.props.clear(),console.log("clear click")},n.onRandomizeClick=function(e){n.props.randomize(),console.log("randomize click")},n.state={timer:void 0},n}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"controls"},o.a.createElement("div",{className:"controls__button-container"},o.a.createElement(v,{icon:"stop",onButtonClick:this.onPlayStopClick,isShowingPlay:this.props.isShowingPlay}),o.a.createElement(v,{icon:"step-forward",onButtonClick:this.onStepClick,isShowingPlay:this.props.isShowingPlay}),o.a.createElement(v,{icon:"eraser",onButtonClick:this.onClearClick,isShowingPlay:this.props.isShowingPlay}),o.a.createElement(v,{icon:"question",onButtonClick:this.onRandomizeClick,isShowingPlay:this.props.isShowingPlay})),o.a.createElement("div",{className:"controls__generation"},o.a.createElement("span",{className:"controls__generation-number"},this.props.generationNumber)," Generation"))}}]),t}(i.Component),d=n(8),S=n(7);n(22);d.b.add([S.b,S.e,S.d,S.a,S.c]);var C=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(c.a)(this,Object(p.a)(t).call(this,e))).createGrid=function(){for(var e=[],t=0;t<n.NUM_CELLS;t++){e[t]=[];for(var i=0;i<n.NUM_CELLS;i++)e[t][i]=new h}return e},n.step=function(){clearInterval(n.state.generationInterval),n.setState({generationInterval:void 0}),n.generate()},n.generate=function(){for(var e=[],t=0;t<n.state.grid.length;t++)e[t]=[];for(var i=0;i<n.state.grid.length;i++)for(var o=0;o<n.state.grid.length;o++){var a=n.getNeighborCount(i,o),r=new h;n.state.grid[i][o].isAlive?2===a||3===a?r.create():(a<2||a>3)&&r.kill():3===a&&r.create(),e[i][o]=r}n.setState({grid:e,generationNumber:n.state.generationNumber+1})},n.getNeighborCount=function(e,t){for(var i=0,o=e-1;o<=e+1;o++)for(var a=t-1;a<=t+1;a++)o===e&&a===t||o<0||o>=n.state.grid.length||a<0||a>=n.state.grid[o].length||n.state.grid[o][a].isAlive&&i++;return i},n.playStop=function(){n.state.isShowingPlay?n.stop():n.play()},n.stop=function(){clearInterval(n.state.generationInterval),n.setState({generationInterval:void 0,isShowingPlay:!1})},n.play=function(){n.checkIsClear()&&n.randomize(),n.setState({generationInterval:setInterval(n.generate,n.GENERATION_RATE),isShowingPlay:!0})},n.randomize=function(){for(var e=n.state.grid.slice(),t=0;t<e.length;t++)for(var i=0;i<e[t].length;i++){var o=new h;Math.random()<.15&&o.create(),e[t][i]=o}n.setState({grid:e,generationNumber:0})},n.clear=function(){for(var e=n.state.grid.slice(),t=0;t<e.length;t++)for(var i=0;i<e[t].length;i++){var o=new h;o.kill(),e[t][i]=o}n.stop(),n.setState({grid:e,generationNumber:0})},n.checkIsClear=function(){for(var e=n.state.grid.slice(),t=!0,i=0;i<e.length;i++)for(var o=0;o<e[i].length;o++){if(e[i][o].isAlive){t=!1;break}}return t},n.onGameClick=function(e,t){var i=e.clientX-t.offsetLeft-n.refs.app.offsetLeft,o=e.clientY-t.offsetTop-n.refs.app.offsetTop;i=Math.floor(i/n.CELL_SIZE),o=Math.floor(o/n.CELL_SIZE),n.toggleState(i,o)},n.toggleState=function(e,t){var i=n.state.grid.slice();i[e][t].toggleState(),n.setState({grid:i})},n.componentDidMount=function(){n.play()},n.NUM_CELLS=58,n.CANVAS_SIZE=580,n.CELL_SIZE=10,n.GRID_COLOR="#dfdfdf",n.GENERATION_RATE=50,n.state={generationInterval:void 0,generationNumber:0,grid:n.createGrid(),isShowingPlay:!1},n}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{ref:"app",className:"app"},o.a.createElement(g,{grid:this.state.grid,numCells:this.NUM_CELLS,canvasSize:this.CANVAS_SIZE,cellSize:this.CELL_SIZE,gridColor:this.GRID_COLOR,randomize:this.randomize,onGameClick:this.onGameClick}),o.a.createElement(m,{step:this.step,clear:this.clear,playStop:this.playStop,randomize:this.randomize,isShowingPlay:this.state.isShowingPlay,generationNumber:this.state.generationNumber}))}}]),t}(i.Component);r.a.render(o.a.createElement(C,null),document.getElementById("root"))}},[[12,2,1]]]);
//# sourceMappingURL=main.ba1f5e9a.chunk.js.map
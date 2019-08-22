var app1 = new Vue({
  el: "#app1",
  data: function() {
    return {
      xLeft: 20,
      xRight: 120,
      // y: 25,
      // width: 200,
      isMove1: false,
      isMove2: false,
      xClient: 0
    };
  },
  computed: {
    rectWidth: function() {
      return this.xLeft < this.xRight
        ? this.xRight - this.xLeft
        : this.xLeft - this.xRight;
    },
    rectX() {
      return this.xLeft < this.xRight ? this.xLeft : this.xRight;
    }
  },
  methods: {
    md(ev, val) {
      if (val === 1) {
        this.isMove1 = true;
      } else if (val === 2) {
        this.isMove2 = true;
      }
      document.addEventListener("mousemove", this.mm);
      document.addEventListener("mouseup", this.mu);
      document.addEventListener("touchmove", this.tm);
      document.addEventListener("touchend", this.mu);
    },
    mu() {
      this.isMove1 = false;
      this.isMove2 = false;
      document.removeEventListener("mousemove", this.mm);
      document.removeEventListener("mouseup", this.mu);
      document.removeEventListener("touchmove", this.tm);
      document.removeEventListener("touchend", this.mu);
    },
    mm(ev) {
      this.xClient = ev.clientX;
      if (this.isMove1) {
        // todo: fix magic number
        this.xLeft = ev.clientX - 10;
      } else if (this.isMove2) {
        this.xRight = ev.clientX - 10;
      }
    },
    tm(ev) {
      if (this.isMove1) {
        // todo: fix magic number
        this.xLeft = ev.touches[0].clientX - 10;
      } else if (this.isMove2) {
        this.xRight = ev.touches[0].clientX - 10;
      }
    }
  }
});
var app2 = new Vue({
  el: "#app2",
  data: function() {
    return {
      xLeft: 20,
      xRight: 120,
      // y: 25,
      // width: 200,
      isMove1: false,
      isMove2: false,
      xClient: 0
    };
  },
  computed: {
    rectWidth: function() {
      return this.xLeft < this.xRight
        ? this.xRight - this.xLeft
        : this.xLeft - this.xRight;
    },
    rectX() {
      return this.xLeft < this.xRight ? this.xLeft : this.xRight;
    }
  },
  methods: {
    md(ev, val) {
      if (val === 1) {
        this.isMove1 = true;
      } else if (val === 2) {
        this.isMove2 = true;
      }
      document.addEventListener("mousemove", this.mm);
      document.addEventListener("mouseup", this.mu);
      document.addEventListener("touchmove", this.tm);
      document.addEventListener("touchend", this.mu);
    },
    mu() {
      this.isMove1 = false;
      this.isMove2 = false;
      document.removeEventListener("mousemove", this.mm);
      document.removeEventListener("mouseup", this.mu);
      document.removeEventListener("touchmove", this.tm);
      document.removeEventListener("touchend", this.mu);
    },
    mm(ev) {
      this.xClient = ev.clientX;
      var xxx = ev.clientX;
      if (this.isMove1) {
        // todo: fix magic number
        if (xxx > this.xLeft) {
          // this.xLeft = ev.clientX - 10;
          this.xLeft = xxx + 30;
        }
      } else if (this.isMove2) {
        if (xxx > this.xRight) {
          // this.xRight = ev.clientX - 10;
          this.xRight = xxx + 30;
        }
      }
    },
    tm(ev) {
      if (this.isMove1) {
        // todo: fix magic number
        this.xLeft = ev.touches[0].clientX - 10;
      } else if (this.isMove2) {
        this.xRight = ev.touches[0].clientX - 10;
      }
    }
  }
});
var app3 = new Vue({
	el : "#app3",
	data : {
    list_line : [
      {	// ×のパーツ（そのいち）
        x1 : 200,
        y1 : 100,
        x2 : 400,
        y2 : 300,
        stroke : "rgb(255,0,0)",
        width : 50,
      },
      {	// ×のパーツ（そのに）
        x1 : 400,
        y1 : 100,
        x2 : 200,
        y2 : 300,
        stroke : "rgb(255,0,0)",
        width : 50,
      },
    ],
    // 前回のクリック座標
    prev_pos : {
      x : 0,
      y : 0,
    },
    // 押下中だったらtrue
    is_mousedown : false,
  },
  methods : {
  	//
    touchstart : function(e){
      this.is_mousedown = true;
      console.log("touch start:%d,%d", e.offsetX, e.offsetY);
      this.prev_pos.x = e.offsetX;
      this.prev_pos.y = e.offsetY;
    },
    touchmove : function(e){
    	// 押下中だったら
      if(this.is_mousedown){
      	// 前回座標との差分を算出
        let moved_x = e.offsetX - this.prev_pos.x;
        let moved_y = e.offsetY - this.prev_pos.y;

        // 全要素に差分を適用
        for(let line of this.list_line){
          line.x1 += moved_x;
          line.x2 += moved_x;
          line.y1 += moved_y;
          line.y2 += moved_y;
        }

        // 前回のクリック座標を更新
        this.prev_pos.x = e.offsetX;
        this.prev_pos.y = e.offsetY;
      }
    },
    touchend : function(e){
      this.is_mousedown = false;
      console.log("touch end");
    }
  }
});
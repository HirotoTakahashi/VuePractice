var app1 = new Vue({
  el: "#app",
  data: function() {
    return {
      // 共通
      dayWidth: 50,
      xLeft: 100,
      xRight: 200,
      // drag用
      isDrag: false,
      xFirstLeft: 0,
      xFirstRight: 0,
      xPrev: 0,
      // resize用
      isResize1: false,
      isResize2: false,
      xFirst: 0
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
    dmd(ev) {
      this.isDrag = true;
      // MouseDown時のX座標をセット（MouseUp時の微調整用）
      this.xFirstLeft = this.xLeft;
      this.xFirstRight = this.xRight;
      console.log("md-xFirstLeft:%d", this.xFirstLeft);
      // MouseDown時のX座標をセット（MouseMove時の差分計算用）
      this.xPrev = ev.clientX;
      console.log("md-xPrev:%d", this.xPrev);
      document.addEventListener("mousemove", this.dmm);
      document.addEventListener("touchmove", this.dtm);
      document.addEventListener("mouseup", this.dmu);
      document.addEventListener("touchend", this.dmu);
    },
    dmm(ev) {
      // 押下中だったら
      if (this.isDrag) {
        console.log("mm-clientX:%d", ev.clientX);
        // 前回MouseDown時との差分を算出
        var diff = ev.clientX - this.xPrev;
        console.log("mm-diff:%d", diff);
        // 左右のLineに差分を適用
        this.xLeft += diff;
        this.xRight += diff;
        // 前回MouseMove時のX座標の更新
        this.xPrev = ev.clientX;
        console.log("mm-xPrev:%d", this.xPrev);
      }
    },
    dtm(ev) {
      // 押下中だったら
      if (this.isDrag) {
        console.log("tm-clientX:%d", ev.touches[0].clientX);
        // 前回MouseDown時との差分を算出
        var diff = ev.touches[0].clientX - this.xPrev;
        console.log("tm-diff:%d", diff);
        // 左右のLineに差分を適用
        this.xLeft += diff;
        this.xRight += diff;
        // 前回MouseMove時のX座標の更新
        this.xPrev = ev.touches[0].clientX;
        console.log("tm-xPrev:%d", this.xPrev);
      }
    },
    dmu() {
      console.log("mu-xLeft:%d", this.xLeft);
      var diffLeft =
        Math.round((this.xLeft - this.xFirstLeft) / this.dayWidth) *
        this.dayWidth;
      console.log("mu-diffLeft:%d", diffLeft);
      this.xLeft = this.xFirstLeft + diffLeft;
      console.log("mu-xLeft:%d", this.xLeft);

      console.log("mu-xRight:%d", this.xRight);
      var diffRight =
        Math.round((this.xRight - this.xFirstRight) / this.dayWidth) *
        this.dayWidth;
      console.log("mu-diffRight:%d", diffRight);
      this.xRight = this.xFirstRight + diffRight;
      console.log("mu-xRight:%d", this.xRight);

      this.isDrag = false;
      document.removeEventListener("mousemove", this.dmm);
      document.removeEventListener("touchmove", this.dtm);
      document.removeEventListener("mouseup", this.dmu);
      document.removeEventListener("touchend", this.dmu);
    },
    rmd(ev, val) {
      if (val === 1) {
        this.isResize1 = true;
        this.xFirst = this.xLeft;
      } else if (val === 2) {
        this.isResize2 = true;
        this.xFirst = this.xRight;
      }
      console.log("md-xFirst:%d", this.xFirst);
      document.addEventListener("mousemove", this.rmm);
      document.addEventListener("touchmove", this.rtm);
      document.addEventListener("mouseup", this.rmu);
      document.addEventListener("touchend", this.rmu);
    },
    rmm(ev) {
      if (this.isResize1) {
        this.xLeft = ev.clientX - 10;
      } else if (this.isResize2) {
        this.xRight = ev.clientX - 10;
      }
    },
    rtm(ev) {
      if (this.isResize1) {
        this.xLeft = ev.touches[0].clientX - 10;
      } else if (this.isResize2) {
        this.xRight = ev.touches[0].clientX - 10;
      }
    },
    rmu() {
      console.log("mu-xFirst:%d", this.xFirst);
      if (this.isResize1) {
        console.log("mu-xLeft:%d", this.xLeft);
        var diff =
          Math.round((this.xLeft - this.xFirst) / this.dayWidth) *
          this.dayWidth;
        console.log("mu-diff:%d", diff);
        this.xLeft = this.xFirst + diff;
        console.log("mu-xLeft:%d", this.xLeft);
      } else if (this.isResize2) {
        console.log("mu-xRight:%d", this.xRight);
        var diff =
          Math.round((this.xRight - this.xFirst) / this.dayWidth) *
          this.dayWidth;
        console.log("mu-diff:%d", diff);
        this.xRight = this.xFirst + diff;
        console.log("mu-xRight:%d", this.xRight);
      }
      this.isResize1 = false;
      this.isResize2 = false;
      document.removeEventListener("mousemove", this.rmm);
      document.removeEventListener("touchmove", this.rtm);
      document.removeEventListener("mouseup", this.rmu);
      document.removeEventListener("touchend", this.rmu);
    }
  }
});

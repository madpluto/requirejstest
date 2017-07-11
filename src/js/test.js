define("carousel", ["jquery"], function(t) {
    function i(t) {
        var i = this;
        this.ct = t, this.init(), this.bind(), this.play(0), setInterval(function() { i.play((i.curIndex + 1) % i.$imgCount) }, 2500)
    }
    return i.prototype.init = function() { this.$imgct = this.ct.find(".img-ct"), this.$items = this.$imgct.children(), this.$imgCount = this.$items.length, this.curIndex = 0, this.isloading = !1, this.Icon = this.ct.find(".icon"), this.btnNext = this.ct.find(".btn-next"), this.btnPre = this.ct.find(".btn-pre") }, i.prototype.setIcon = function() { this.Icon.children().removeClass("active").eq(this.curIndex).addClass("active") }, i.prototype.play = function(t) {
        var i = this;
        this.isloading || (this.isloading = !0, this.$items.eq(this.curIndex).fadeOut(600), this.$items.eq(t).fadeIn(600, function() { i.isloading = !1 }), this.curIndex = t, this.setIcon())
    }, i.prototype.bind = function() {
        var i = this;
        i.btnNext.on("click", function() { console.log("前"), i.play((i.curIndex + 1) % i.$imgCount) }), i.btnPre.on("click", function() { console.log("后"), i.play((i.$imgCount + i.curIndex - 1) % i.$imgCount) }), i.Icon.find("li").on("click", function(n) {
            n.preventDefault();
            var e = t(this).index();
            i.play(e)
        })
    }, i
}), define("gotop", ["jquery"], function(t) {
    function i(i) { this.$ct = i, this.target = t('<button class="gotop">回到顶部</button>'), this.createNode(), this.bindEvent() }
    return i.prototype = {
        bindEvent: function() {
            var i = this.target;
            i.on("click", function() { console.log(t(window).scrollTop()), t("html, body").animate({ scrollTop: "0px" }, 500) }), t(window).on("scroll", function() {
                var n = t(window).scrollTop();
                n > 150 ? i.show() : i.hide()
            })
        },
        createNode: function() { this.$ct.append(this.target), this.target.hide() }
    }, i
}), define("newslist", ["jquery"], function(t) {
    function i(t) {
        var i = this;
        this.ct = t, console.log(this.ct), this.init(), this.start(), this.ct.find(".load").on("click", function() { i.start() })
    }
    return i.prototype.init = function() {
        var t = this;
        this.length = 10, this.pageIndex = 10, this.content = this.ct.find(".content"), this.itemWdith = this.ct.find(".item").outerWidth(!0), this.itemCol = parseInt(this.content.width() / this.itemWdith), this.itemHeightArr = [];
        for (var i = 0; i < this.itemCol; i++) t.itemHeightArr[i] = 0;
        this.isDataArrive = !0
    }, i.prototype.start = function() {
        var i = this;
        i.getNews(function(n) {
            i.isDataArrive = !0, t.each(n, function(t, n) {
                var e = i.createEle(n);
                e.find("img").on("load", function() { i.content.append(e), console.log(e, "loaded..."), i.waterFallPlace(e) })
            })
        }), i.isDataArrive = !1
    }, i.prototype.waterFallPlace = function(t) {
        for (var i = this, n = 0, e = i.itemHeightArr[0], o = 0; o < i.itemHeightArr.length; o++) i.itemHeightArr[o] < e && (n = o, e = i.itemHeightArr[o]);
        t.css({ left: i.itemWdith * n, top: e, opacity: 1 }), i.itemHeightArr[n] += t.outerHeight(!0), i.content.height(Math.max.apply(null, i.itemHeightArr))
    }, i.prototype.check = function(i) {
        var n = t(window).height(),
            e = t(window).scrollTop(),
            o = i.offset().top,
            s = i.outerHeight(!0);
        return n + e > o && e < o + s
    }, i.prototype.createEle = function(i) { var n = ""; return n += '<li class="item"><a href="' + i.url + '"><img src="' + i.img_url + '" alt=""><h4>' + i.short_name + "</h4><p>" + i.short_intro + "</p></a></li>", t(n) }, i.prototype.getNews = function(i) {
        var n = this;
        t.ajax({ url: "http://platform.sina.com.cn/slide/album_tech", jsonp: "jsoncallback", dataType: "jsonp", data: { app_key: 1271687855, num: n.length, page: n.pageIndex } }).done(function(t) { t && t.status && "0" === t.status.code ? (i(t.data), n.pageIndex++) : console.log("get error data") }).fail(function() { console.log("系统错误") })
    }, i
}), require.config({ baseUrl: "js", paths: { jquery: ["https://lib.baomitu.com/jquery/3.2.1/jquery.min", "./lib/jquery"], carousel: "./com/carousel", gotop: "./com/gotop", newslist: "./com/newslist" } }), require(["jquery", "carousel", "gotop", "newslist"], function(t, i, n, e) { new i(t(".carousel").eq(0)), new n(t("body")), new e(t("#newsList")) }), define("../common", function() {});
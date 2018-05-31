var Home = {
    data() {
        return {
            cdata: [],
            moreMsg: 'loading...',
            pagecount: 0,
            currentpage: 0,
            param: {
                start: 0,
                count: 10
            }
        }
    },
    template: `
        <div class="movie_list pagewidth">
        <my-header title="热映"></my-header>
            <ul id="movelist">
                <li @click="todetail(item.id)" v-for="(item,index) in cdata">
                    <div class="movie_img"><img :src="item.images.small"></div>
                    <div class="movie_info">
                        <h5>{{index+1}}、{{item.title}}</h5>
                        <p>评分：{{item.rating.average}}</p>
                        <p>导演：{{item.directors}}</p>
                        <p>演员：{{item.casts}}</p>
                    </div>
                </li>
            </ul>
            <div class="showMore">{{moreMsg}}</div>
        </div>
    `,
    mounted() {
        var _this = this;
        this.showData();

        window.onscroll = function() {　　
            if(getScrollTop() + getWindowHeight() == getScrollHeight()) {　
                _this.showMore()　　
            }
        };
    },
    methods: {
        showData() {
            this.moreMsg = "loading...";
            var _this = this;
            axios.get(apiUrl + '/v2/movie/in_theaters', {
                params: this.param
            }).then(function(response) {
                this.moreMsg = "load more...";
                var result = response.data.subjects;
                _this.pagecount = Math.ceil(response.data.total / _this.param.count);
                _this.currentpage++;

                for(var i = 0; i < result.length; i++) {
                    var dyArr = result[i].directors;
                    var dy = [];
                    for(var j = 0; j < dyArr.length; j++) {
                        dy.push(dyArr[j].name);
                    }
                    result[i].directors = dy.join(" / ")

                    var catArr = result[i].casts;
                    var yy = [];
                    for(var y = 0; y < catArr.length; y++) {
                        yy.push(catArr[y].name);
                    }
                    result[i].casts = yy.join(" / ")

                    _this.cdata.push(result[i]);
                }

            }).catch(function(error) {
                console.log(error);
                alert('请求失败')
            });
        },
        showMore() {
            if(this.currentpage == this.pagecount) {
                this.moreMsg = "load over...";
                return;
            }
            this.param.start += this.param.count;
            this.showData();
        },
        todetail(id) {
            this.$router.push({
                path: 'detail',
                query: {
                    id: id
                }
            });
        }
    }
}
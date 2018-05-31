var Detail = {
    data() {
        return {
            // 为了解决多层数据没有初始化内层字段，会导致数据没有请求过来报错问题
            pageFlag: false,
            vInfo: {},
            id: this.$route.query.id
        }
    },
    template: `
        <div class="pagewidth" v-if="pageFlag">   
            <my-header :title="vInfo.title"></my-header>
            <div class="detail_img"><img :src="vInfo.images.small" /></div>
            <div class="movieinfo">
                <h4>原名：<span>{{vInfo.original_title}}</span></h4>
                <h4>名称：<span>{{vInfo.title}}</span></h4>
                <h4>年代/国家：<span>{{vInfo.year}}/{{vInfo.countries[0]}}</span></h4>
            </div>
            <h4>简介</h4>
            <p class="move_sumary">{{vInfo.summary}}</p>
            <h4>影人</h4>
            <ul class="castlist">
                <li v-for="item in vInfo.yanyuan"><img :src="item.url">{{item.name}}</li>
            </ul>
        </div>
    `,
    mounted: function() {
        this.showData();
    },
    methods: {
        showData: function() {
            var _this = this;
            axios.get(apiUrl + '/v2/movie/subject/' + this.id, {}).then(function(response) {
                var result = response.data

                var yy = [];
                for(var i = 0; i < result.casts.length; i++) {
                    yy.push({
                        name: result.casts[i].name,
                        url: result.casts[i].avatars.small
                    });
                }
                result.yanyuan = yy;

                _this.vInfo = result;

                _this.pageFlag = true;
            }).catch(function(error) {
                console.log(error);
            });
        }
    }
}
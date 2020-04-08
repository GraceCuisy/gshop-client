<template>
  <div class="type-nav">
    <div class="container">
      <div 
        @mouseenter="isShowFirst=true" 
        @mouseleave="hideFirst"
      >
        <h2 class="all">全部商品分类</h2>
          <!-- @mouseleave="currentIndex=-1"重置currentIndex代码既可以加到祖父元素sort身上,
          也可以加给每一个item,加到祖父元素身上,效率更高 -->
          <!-- 不在sort身上让二级列表隐藏和让一级列表的底色变白,
          只有在鼠标移出全部商品分类和列表的父盒子的时候才执行此操作,在鼠标移入到全部商品分类时还是有选中的列表项,用户体验更好 -->
        <div class="sort" @click="toSearch">
          <div class="all-sort-list2">
            <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId"
              :class="{item_on:index===currentIndex}" @mouseenter="showSubCategorys(index)" v-if="isShowFirst">
              <h3>
                <!-- 要实现点击每一个分类名称实现跳转到search路由组件,并且携带categoryName和categoryId参数,
              要实现路由跳转,所以不能使用a标签,需要使用router-link -->
                <!-- 使用router-link声明式路由跳转,相当于创建了很多个路由组件,页面非常卡顿,
              所以还是采用a标签,使用编程式路由跳转,但是如果把监听绑在每个a标签身上,会导致添加很多事件监听,所以采用事件委派 -->
                <a href="javascript:;" :data-categoryName="c1.categoryName"
                  :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                <!-- <router-link :to="{path:'/search',query:{categoryName:c1.categoryName,category1Id:c1.categoryId}}">{{c1.categoryName}}</router-link> -->
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl class="fore" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                    <dt>
                      <a href="javascript:;" :data-categoryName="c2.categoryName"
                        :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                      <!-- <router-link :to="{path:'/search',query:{categoryName:c2.categoryName,category2Id:c2.categoryId}}">{{c2.categoryName}}</router-link> -->
                    </dt>
                    <dd>
                      <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                        <a href="javascript:;" :data-categoryName="c3.categoryName"
                          :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                        <!-- <router-link :to="{path:'/search',query:{categoryName:c3.categoryName,category3Id:c3.categoryId}}">{{c3.categoryName}}</router-link> -->
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex';
  /**在引入lodash全库时,项目引入的所有依赖包打包后是3.8M,
   * 为了减小打包后文件大小,需要对个别包进行按需引入 2.5M */
  // import _ from 'lodash';
  import throttle from "lodash/throttle"; //只用到了throttle工具函数,所以只引入throttle
  export default {
    name: 'TypeNav',
    data() {
      // 在data中也可以得到$route信息对象
      // console.log("---",this.$route);
      return {
        currentIndex: -1,
        isShowFirst: false,
      }
    },
    mounted() {
      /**
       *触发vuex中的getBaseCategoryList action方法调用 写在typeNav的挂载显示的生命周期中,
       *从home跳转到search路由组件,home死导致typeNav死,调到search组件后,重新生成search组件,
       从而生成一个新的typeNav组件,执行一次mounted中的内容,发送一次请求,
       又从search跳转到home路由组件,search死导致typeNav死,调到home组件后,重新又生成search组件,
       从而生成一个新的typeNav组件,又执行一次mounted中的内容,发送一次请求,导致发送了很多无用的请求
       所以把发送请求的内容放在应用根组件App组件中
       */
      // this.$store.dispatch('getBaseCategoryList');
      // console.log("+++",this.$route);
      const path = this.$route.path;
      if (path === '/') {
        this.isShowFirst = true;
      }
    },
    computed: {
      ...mapState({
        // 计算属性值由vue自动调用右侧的函数返回
        // state是vue自动传的总state对象
        categoryList: state => state.home.baseCategoryList,
        /**
         * categoryList结构
      "data": [
        {
          "categoryChild": [
            {
              "categoryChild": [
                {
                  "categoryName": "电子书",
                  "categoryId": 1
                },
                {
                  "categoryName": "网络原创",
                  "categoryId": 2
                },
                {
                  "categoryName": "数字杂志",
                  "categoryId": 3
                },
                {
                  "categoryName": "多媒体图书",
                  "categoryId": 4
                }
              ],
              "categoryName": "电子书刊",
              "categoryId": 1
            },
            {
              "categoryChild": [
                {
                  "categoryName": "音乐",
                  "categoryId": 5
                },
                {
                  "categoryName": "影视",
                  "categoryId": 6
                },
                {
                  "categoryName": "教育音像",
                  "categoryId": 7
                }
              ],
              "categoryName": "音像",
              "categoryId": 2
            },
            {
              "categoryChild": [
                {
                  "categoryName": "少儿",
                  "categoryId": 8
                },
                {
                  "categoryName": "商务投资",
                  "categoryId": 9
                },
                {
                  "categoryName": "英语学习与考试",
                  "categoryId": 10
                },
                {
                  "categoryName": "文学",
                  "categoryId": 11
                },
                {
                  "categoryName": "传记",
                  "categoryId": 12
                },
                {
                  "categoryName": "励志",
                  "categoryId": 13
                }
              ],
              "categoryName": "英文原版",
              "categoryId": 3
            },
            {
              "categoryChild": [
                {
                  "categoryName": "小说",
                  "categoryId": 14
                },
                {
                  "categoryName": "文学",
                  "categoryId": 15
                },
                {
                  "categoryName": "青春文学",
                  "categoryId": 16
                },
                {
                  "categoryName": "传记",
                  "categoryId": 17
                },
                {
                  "categoryName": "艺术",
                  "categoryId": 18
                }
              ],
              "categoryName": "文艺",
              "categoryId": 4
            },
            {
              "categoryChild": [
                {
                  "categoryName": "少儿",
                  "categoryId": 19
                },
                {
                  "categoryName": "0-2岁",
                  "categoryId": 20
                },
                {
                  "categoryName": "3-6岁",
                  "categoryId": 21
                },
                {
                  "categoryName": "7-10岁",
                  "categoryId": 22
                },
                {
                  "categoryName": "11-14岁",
                  "categoryId": 23
                }
              ],
              "categoryName": "少儿",
              "categoryId": 5
            },
            {
              "categoryChild": [
                {
                  "categoryName": "历史",
                  "categoryId": 24
                },
                {
                  "categoryName": "哲学",
                  "categoryId": 25
                },
                {
                  "categoryName": "国学",
                  "categoryId": 26
                },
                {
                  "categoryName": "政治/军事",
                  "categoryId": 27
                },
                {
                  "categoryName": "法律",
                  "categoryId": 28
                },
                {
                  "categoryName": "人文社科",
                  "categoryId": 29
                },
                {
                  "categoryName": "心理学",
                  "categoryId": 30
                },
                {
                  "categoryName": "文化",
                  "categoryId": 31
                },
                {
                  "categoryName": "社会科学",
                  "categoryId": 32
                }
              ],
              "categoryName": "人文社科",
              "categoryId": 6
            },
            {
              "categoryChild": [
                {
                  "categoryName": "经济",
                  "categoryId": 33
                },
                {
                  "categoryName": "金融与投资",
                  "categoryId": 34
                },
                {
                  "categoryName": "管理",
                  "categoryId": 35
                },
                {
                  "categoryName": "励志与成功",
                  "categoryId": 36
                }
              ],
              "categoryName": "经管励志",
              "categoryId": 7
            },
            {
              "categoryChild": [
                {
                  "categoryName": "生活",
                  "categoryId": 37
                },
                {
                  "categoryName": "健身与保健",
                  "categoryId": 38
                },
                {
                  "categoryName": "家庭与育儿",
                  "categoryId": 39
                },
                {
                  "categoryName": "旅游",
                  "categoryId": 40
                },
                {
                  "categoryName": "烹饪美食",
                  "categoryId": 41
                }
              ],
              "categoryName": "生活",
              "categoryId": 8
            },
            {
              "categoryChild": [
                {
                  "categoryName": "工业技术",
                  "categoryId": 42
                },
                {
                  "categoryName": "科普读物",
                  "categoryId": 43
                },
                {
                  "categoryName": "建筑",
                  "categoryId": 44
                },
                {
                  "categoryName": "医学",
                  "categoryId": 45
                },
                {
                  "categoryName": "科学与自然",
                  "categoryId": 46
                },
                {
                  "categoryName": "计算机与互联网",
                  "categoryId": 47
                },
                {
                  "categoryName": "电子通信",
                  "categoryId": 48
                }
              ],
              "categoryName": "科技",
              "categoryId": 9
            },
            {
              "categoryChild": [
                {
                  "categoryName": "中小学教辅",
                  "categoryId": 49
                },
                {
                  "categoryName": "教育与考试",
                  "categoryId": 50
                },
                {
                  "categoryName": "外语学习",
                  "categoryId": 51
                },
                {
                  "categoryName": "大中专教材",
                  "categoryId": 52
                },
                {
                  "categoryName": "字典词典",
                  "categoryId": 53
                }
              ],
              "categoryName": "教育",
              "categoryId": 10
            },
            {
              "categoryChild": [
                {
                  "categoryName": "艺术/设计/收藏",
                  "categoryId": 54
                },
                {
                  "categoryName": "经济管理",
                  "categoryId": 55
                },
                {
                  "categoryName": "文化/学术",
                  "categoryId": 56
                },
                {
                  "categoryName": "少儿",
                  "categoryId": 57
                }
              ],
              "categoryName": "港台图书",
              "categoryId": 11
            },
            {
              "categoryChild": [
                {
                  "categoryName": "工具书",
                  "categoryId": 58
                },
                {
                  "categoryName": "杂志/期刊",
                  "categoryId": 59
                },
                {
                  "categoryName": "套装书",
                  "categoryId": 60
                }
              ],
              "categoryName": "其他",
              "categoryId": 12
            }
          ],
          "categoryName": "图书、音像、电子书刊",
          "categoryId": 1
        },
        {
          "categoryChild": [
            {
              "categoryChild": [
                {
                  "categoryName": "手机",
                  "categoryId": 61
                },
                {
                  "categoryName": "对讲机",
                  "categoryId": 62
                }
              ],
              "categoryName": "手机通讯",
              "categoryId": 13
            },
            {
              "categoryChild": [
                {
                  "categoryName": "合约机",
                  "categoryId": 63
                },
                {
                  "categoryName": "选号中心",
                  "categoryId": 64
                },
                {
                  "categoryName": "装宽带",
                  "categoryId": 65
                },
                {
                  "categoryName": "办套餐",
                  "categoryId": 66
                }
              ],
              "categoryName": "运营商",
              "categoryId": 14
            },
            {
              "categoryChild": [
                {
                  "categoryName": "移动电源",
                  "categoryId": 67
                },
                {
                  "categoryName": "电池/移动电源",
                  "categoryId": 68
                },
                {
                  "categoryName": "蓝牙耳机",
                  "categoryId": 69
                },
                {
                  "categoryName": "充电器/数据线",
                  "categoryId": 70
                },
                {
                  "categoryName": "苹果周边",
                  "categoryId": 71
                },
                {
                  "categoryName": "手机耳机",
                  "categoryId": 72
                },
                {
                  "categoryName": "手机贴膜",
                  "categoryId": 73
                },
                {
                  "categoryName": "手机存储卡",
                  "categoryId": 74
                },
                {
                  "categoryName": "充电器",
                  "categoryId": 75
                },
                {
                  "categoryName": "数据线",
                  "categoryId": 76
                },
                {
                  "categoryName": "手机保护套",
                  "categoryId": 77
                },
                {
                  "categoryName": "车载配件",
                  "categoryId": 78
                },
                {
                  "categoryName": "iPhone 配件",
                  "categoryId": 79
                },
                {
                  "categoryName": "手机电池",
                  "categoryId": 80
                },
                {
                  "categoryName": "创意配件",
                  "categoryId": 81
                },
                {
                  "categoryName": "便携/无线音响",
                  "categoryId": 82
                },
                {
                  "categoryName": "手机饰品",
                  "categoryId": 83
                },
                {
                  "categoryName": "拍照配件",
                  "categoryId": 84
                },
                {
                  "categoryName": "手机支架",
                  "categoryId": 85
                }
              ],
              "categoryName": "手机配件",
              "categoryId": 15
            }
          ],
          "categoryName": "手机",
          "categoryId": 2
        },
      ],
         */
      })
    },
    methods: {
      // 未做函数节流
      // showSubCategorys(index){
      //   console.log('函数调用'+index);
      //   this.currentIndex=index;
      // }
      // 采用函数节流 能避免事件回调频繁调用,造成页面卡顿 
      // showSubCategorys:_.throttle(function(index){
      //   console.log('函数调用'+index);
      //   this.currentIndex=index;
      // },200),

      // 按需引入
      showSubCategorys: throttle(function (index) {
        // console.log('函数调用'+index);
        this.currentIndex = index;
      }, 200),

      // 采用事件委派处理1,2,3级列表路由跳转
      toSearch(event) {
        const dataset = event.target.dataset;
        let {
          categoryname,
          category1id,
          category2id,
          category3id
        } = dataset;
        let query = {
          categoryName: categoryname
        }
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        if (categoryname) { //只有是分类项,才进行跳转到search路由组件
          // 跳转到search路由需要携带categoryName category1Id 参数
          this.$router.push({
            path: '/search',
            query
          });
        }
      },
      
      hideFirst(){
        // 让二三级列表隐藏
        this.currentIndex=-1;
        if(this.$route.path!='/'){
          this.isShowFirst=false;
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      position: relative;

      .all {
        width: 210px;
        height: 45px;
        background-color: #e1251b;
        line-height: 45px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
      }

      .nav {
        a {
          height: 45px;
          margin: 0 22px;
          line-height: 45px;
          font-size: 16px;
          color: #333;
        }
      }

      .sort {
        position: absolute;
        left: 0;
        top: 45px;
        width: 210px;
        height: 461px;
        position: absolute;
        background: #fafafa;
        z-index: 999;

        .all-sort-list2 {
          .item {
            h3 {
              line-height: 30px;
              font-size: 14px;
              font-weight: 400;
              overflow: hidden;
              padding: 0 20px;
              margin: 0;

              a {
                color: #333;
              }
            }

            .item-list {
              display: none;
              position: absolute;
              width: 734px;
              min-height: 460px;
              _height: 200px;
              background: #f7f7f7;
              left: 210px;
              border: 1px solid #ddd;
              top: 0;
              z-index: 9999 !important;

              .subitem {
                float: left;
                width: 650px;
                padding: 0 4px 0 8px;

                dl {
                  border-top: 1px solid #eee;
                  padding: 6px 0;
                  overflow: hidden;
                  zoom: 1;

                  &.fore {
                    border-top: 0;
                  }

                  dt {
                    float: left;
                    width: 54px;
                    line-height: 22px;
                    text-align: right;
                    padding: 3px 6px 0 0;
                    font-weight: 700;
                  }

                  dd {
                    float: left;
                    width: 415px;
                    padding: 3px 0 0;
                    overflow: hidden;

                    em {
                      float: left;
                      height: 14px;
                      line-height: 14px;
                      padding: 0 8px;
                      margin-top: 5px;
                      border-left: 1px solid #ccc;
                    }
                  }
                }
              }
            }

            &.item_on {
              background: #ccc;

              .item-list {
                display: block;
              }
            }
          }
        }
      }
    }
  }
</style>
<template>
  <div class="swiper-container" ref="Swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in carouselList" :key="carousel.id">
        <img :src="carousel.imgUrl" alt="">
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
  import Swiper from "swiper";
  export default {
    name: '',
    props: {
      carouselList: Array,
    },
    mounted() {
      console.log('mounted执行', this.carouselList.length);
      //   // new Swiper('.swiper-container', {
      //   new Swiper(this.$refs.bannerSwiper, {
      //     // direction: 'vertical', // 垂直切换选项
      //     loop: true, // 循环模式选项

      //     // 如果需要分页器
      //     pagination: {
      //       el: '.swiper-pagination',
      //     },

      //     // 如果需要前进后退按钮
      //     navigation: {
      //       nextEl: '.swiper-button-next',
      //       prevEl: '.swiper-button-prev',
      //     },

      //   })
    },
    // watch: { //watch普通的用法, 数据的监视的回调函数只有在数据发生改变时才会调用,
    // 这样的话,floor组件中产生的Carousel组件标签实例,没有数据的变化,就不会调用数据的监视的回调,
    // 就不能new Swiper(),不能给轮播图做配置,所以floor中轮播图有问题,应该使用带immedile版本;
    //   carouselList() {
    //     console.log('watch执行',this.carouselList.length);
    //     this.$nextTick(function () {
    //       new Swiper('.swiper-container', { //这种写法不需要修复bug
    //       // new Swiper(this.$refs.Swiper, { //这种需要去修复bug,
    //         // direction: 'vertical', // 垂直切换选项
    //         loop: true, // 循环模式选项

    //         // 如果需要分页器
    //         pagination: {
    //           el: '.swiper-pagination',
    //         },

    //         // 如果需要前进后退按钮
    //         navigation: {
    //           nextEl: '.swiper-button-next',
    //           prevEl: '.swiper-button-prev',
    //         },

    //       })
    //     })
    //   }
    // },
    watch: {
      carouselList: {
        handler: function (value) {
          // 数据为空时,不执行new Swiper
          if(value.length===0) return;
          console.log('watch执行', this.carouselList.length);
          this.$nextTick(function () {
            // new Swiper('.swiper-container', { //这种写法不需要修复bug
            new Swiper(this.$refs.Swiper, { //这种需要去修复bug,
              // direction: 'vertical', // 垂直切换选项
              loop: true, // 循环模式选项

              // 如果需要分页器
              pagination: {
                el: '.swiper-pagination',
              },

              // 如果需要前进后退按钮
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },

            })
          })
        },
        // true 代表在组件初始化显示时就立即执行一次
        //默认是false,只有数据发生改变时才触发监视的回调函数执行
        immediate: true, 
      }
    },
  }
</script>

<style lang="less" scoped>
</style>
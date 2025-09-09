<template>
  <div class="container-swipe-wraper">
    <swiper
      :loop="true"
      :space-between="10"
      :navigation="{
        nextEl: '.custom-next',
        prevEl: '.custom-prev',
      }"
      :modules="[FreeMode, Navigation, Thumbs]"
      :thumbs="{ swiper: thumbsSwiper }"
      class="swipe-full"
    >
      <swiper-slide v-for="image in props.images || []" :key="image">
        <img :src="image" alt="product" />
      </swiper-slide>

      <el-button circle color="#EFF2F6CC" class="custom-prev">
        <img src="../assets/icons/arrow-left.svg" alt="arrow-left" />
      </el-button>
      <el-button circle color="#EFF2F6CC" class="custom-next">
        <img src="../assets/icons/arrow-right.svg" alt="arrow-right" />
      </el-button>
    </swiper>

    <swiper
      :space-between="11"
      :loop="true"
      :slides-per-view="4"
      :free-mode="true"
      :watch-slides-progress="true"
      :modules="[FreeMode, Navigation, Thumbs]"
      class="swipe-thumnails"
      @swiper="setThumbsSwiper"
    >
      <swiper-slide v-for="image in props.images || []" :key="image">
        <img :src="image" alt="product" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { SwiperClass } from "swiper/react";

const props = defineProps<{
  images: string[];
}>();

const thumbsSwiper = ref<SwiperClass>();

const setThumbsSwiper = (swiper: SwiperClass) => {
  thumbsSwiper.value = swiper;
};
</script>

<style scoped lang="scss">
.container-swipe-wraper {
  margin: 0 auto;
  width: 100%;
  height: 100%;
}

.swipe-full {
  border: 1px solid #0000001a;
  height: 100%;
  max-height: 588px;
}

:deep(.swipe-full .swiper-wrapper) {
  @media (max-width: 1024px) {
    height: 500px;
  }
}

.swipe-full .swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.swipe-full .swiper-slide img {
  scale: 1.5;
}

.swipe-thumnails {
  margin-top: 10px;
}

.swipe-thumnails .swiper-slide-thumb-active {
  border: 1px solid #231f20;
}

.swipe-thumnails .swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 138px !important;
  height: 138px !important;
}

.swipe-thumnails .swiper-slide img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.custom-prev,
.custom-next {
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: 10px;
  z-index: 10;
}

.custom-prev {
  right: 60px;
}
.custom-next {
  right: 10px;
}
</style>

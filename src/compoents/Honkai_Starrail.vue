<script setup lang="ts">
import {nextTick, onMounted} from "vue";
import {useContext} from "../context.ts";
import MusicControl from "./MusicControl.vue";
import StarrailBGM from '../assets/bgm.mp3'

const ctx = useContext()

onMounted(() => {
  ctx.inject(['music'], () => {
    nextTick(() => {
      ctx.music.setMusic(StarrailBGM)
    })
  })
})


</script>

<template>
  <div class="container-fluid">
    <p class="h3">你说的对，但是</p>
    <div class="row gap-2">
      <div class="col-lg-2 col-sm-auto text-center">
        <music-control id="music-control" class="h-100 w-auto"></music-control>
      </div>
      <div class="col">
        <div id="starrail-card" class="card">
          <div class="hkstrl-bg card-img-top">
            <div class="hkstrl-banner-box">
              <div class="hkstrl-banner">
                <img src="../assets/hkstrl_title.png" class="hkstrl-title" alt="Honkai : Starrail 迷离幻夜谈 title">
              </div>
            </div>
          </div>

          <div class="card-body">
            <h5 class="card-title">Honkai : Starrail</h5>
            <p class="card-text">
              It's TIME!《崩坏：星穹铁道》全新改版—迷离幻夜谈，HoYoverse银河冒险RPG现已登陆PS5！
              五星角色－藿藿、银枝限时UP中！意外身怀「星核」的你，乘坐「星穹列车」穿梭异星邂逅新的伙伴，开启宇宙「开拓」之旅！
              即刻下载，驶向群星！
            </p>
            <a href="https://hsr.hoyoverse.com/" target="_blank" class="btn btn-primary">即刻下载</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
@use 'sass:map';
@import 'bootstrap/scss/bootstrap';

#music-control {
  @media (max-width: map.get($grid-breakpoints, 'sm')) {
    width: 22em !important;
  }
}

#starrail-card {
  overflow: hidden;
  width: 22em;
}

.hkstrl-bg {
  background: url("../assets/hkstarrail.webp");
  position: relative;
  width: 22em;
  height: 11.3rem;
  background-size: contain;
}

.hkstrl-banner {
  position: relative;
  width: 10.5rem;
  height: 5.6rem;
  left: -0.6rem;
  top: 2.6rem;
  overflow: visible;
  margin: auto;
}

.hkstrl-banner-box {
  display: flex;
  width: 100%;
  height: 100%;
}

.hkstrl-title {
  position: relative;
  width: 100%;
}
</style>

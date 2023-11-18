<script setup lang="ts">
import {onMounted, nextTick, ref} from "vue";
import {Toast} from "bootstrap";
import {Context, Service, useContext} from "../context.ts";

const toastIf = ref(false)
const toastEl = ref<Element>()
const audioEl = ref<HTMLAudioElement>()

class Player extends Service {
  static reusable = false
  toast: Toast | null = null

  constructor(protected ctx: Context) {
    super(ctx, 'music', true);
    onMounted(() => {
      this.ensureAudio()
    })
  }

  setAutoplay(autoplay: boolean) {
    if (!audioEl.value) return
    if (autoplay) audioEl.value.autoplay = true
  }

  setMusic(src: string, play: boolean = false) {
    this.ensureAudio(() => {
      if (!audioEl.value) return
      if (audioEl.value.src === src) return

      audioEl.value.src = src

      if (play) this.play()
    })
  }

  ensureAudio(callback?: () => void) {
    if (toastIf.value && this.toast?.dispose) callback?.()
    else {
      toastIf.value = true
      nextTick(() => {
        if (!toastEl.value) return
        if (!this.toast?.dispose) {
          this.toast = new Toast(toastEl.value, {
            animation: true
          })
        }
        callback?.()
      })
    }
  }

  play() {
    this.ensureAudio(() => {
      // toast?.show()
      audioEl.value?.play()
    })
  }

  pause() {
    this.ensureAudio(() => {
      audioEl.value?.pause()
    })
  }

  fromStart() {
    this.ensureAudio(() => {
      if (!audioEl.value || !audioEl.value?.currentTime) return
      audioEl.value.currentTime = 0
    })
  }

  dispose() {
    if (this.toast?.dispose) this.toast.dispose()
    toastIf.value = false
  }
}

declare module '../context.ts' {
  export interface Context {
    music: Player
  }
}

const ctx = useContext()
onMounted(() => {
  ctx.plugin(Player)
  // ctx.music.setAutoplay(true)
})

// ctx.root.provide('music', MusicPlayer)
</script>

<template>
  <div v-if="toastIf" class="toast-container position-fixed bottom-0 end-0 p-3">
    <div ref="toastEl" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <!--        <img src="..." class="rounded me-2" alt="...">-->
        <strong class="me-auto">Audio control!</strong>
        <small>now</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        Music control here
        <audio ref="audioEl" type="audio/mpeg" controls loop>Background music</audio>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
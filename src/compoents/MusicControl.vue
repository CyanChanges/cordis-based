<script setup lang="ts">
import {useContext} from "../context.ts";
import {ref} from "vue";

const ctx = useContext()
const music = ctx.music
const loaded = ref(false)

ctx.inject(['music'], () => {
  loaded.value = true
})
</script>
<template>
  <div class="card" :class="{ placeholder: !loaded }">
    <p class="card-text fs-4 fw-bold mt-2 text-center">Controls</p>
    <div class="card-body" role="group">
      <div class="btn-group" :class="{ 'disabled': !loaded }">
        <button @click="music.ensureAudio(()=>{music.toast?.show()})" :class="{ 'disabled': !loaded }"
                class="btn btn-primary">Show audio
        </button>
        <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split"
                :class="{ 'disabled': !loaded }"
                data-bs-toggle="dropdown"
                aria-expanded="false">
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#" @click="music.play">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 class="text-primary bi bi-play"
                 viewBox="0 0 16 16">
              <path
                  d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
            </svg>
            Play
          </a></li>
          <li><a class="dropdown-item" href="#" @click="music.pause">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 class="text-secondary bi bi-pause" viewBox="0 0 16 16">
              <path
                  d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
            </svg>
            Pause
          </a></li>
          <li><a class="dropdown-item" href="#" @click="music.fromStart">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 class="bi bi-skip-start" viewBox="0 0 16 16">
              <path
                  d="M4 4a.5.5 0 0 1 1 0v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L5 8.752V12a.5.5 0 0 1-1 0V4zm7.5.633L5.696 8l5.804 3.367V4.633z"/>
            </svg>
            From start
          </a></li>
          <li><a class="dropdown-item" href="#" @click="music.dispose">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 class="text-danger bi bi-stop" viewBox="0 0 16 16">
              <path
                  d="M3.5 5A1.5 1.5 0 0 1 5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5zM5 4.5a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-.5-.5H5z"/>
            </svg>
            Dispose
          </a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
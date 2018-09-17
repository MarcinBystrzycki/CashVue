<template>
  <div class="logo-container" :style="{ transform: `scale(${size})` }">
    <div class="logo-wrapper">
      <span class="logo-text1">ca</span>
      <div class="logo-wrapper1">
        <svg width="250" height="250" fill="none" stroke="#64B587" style="">
          <g class="s-item" style="" transform="scale(0.5)">
            <path stroke-width="85" d="m119,312c4,70 58,111 130,110 78,1 129-34 125-101-11-61-78-69-122-79-48-16-118-16-117-89-1-53 59-84 117-78 60,1 111,32 112,96" id="svg_1"/>
            <path stroke-width="55" d="m205,17v464m90,0V17" id="svg_2" class="" fill="#054939" fill-opacity="1" stroke="#39495c" stroke-opacity="1"/>
          </g>
        </svg>
      </div>
      <span class="logo-text2">h</span>
      <div class="logo-wrapper2">
        <svg width="250" height="250" viewBox="0 0 256 221" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet">
          <g class="v-item">
            <path d="M204.8 0H256L128 220.8 0 0h97.92L128 51.2 157.44 0h47.36z" fill="#41B883"/>
            <path d="M0 0l128 220.8L256 0h-51.2L128 132.48 50.56 0H0z" fill="#41B883"/>
            <path d="M50.56 0L128 133.12 204.8 0h-47.36L128 51.2 97.92 0H50.56z" fill="#35495E"/>
          </g>
        </svg>  
      </div>
      <span class="logo-text3">
        ue
      </span>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'Logo',
  props: {
    size: {
      type: Number,
      default: 1,
    },
  },
};
</script>

<style lang="sass">
.logo-container
  position: relative
  width: 250px
  top: -60px
  left: -5px
  .logo-wrapper1,
  .logo-wrapper2
    transform: scale(0.3)
    position: absolute
  .logo-text1,
  .logo-text2,
  .logo-text3
    text-shadow: 2px 2px 2px lightgrey
    position: absolute
    font-size: 60px
    font-weight: 700
    color: #39495C
    bottom: -170px
  .logo-text1
    left: 13%
  .logo-text2
    left: 62%
  .logo-text3
    left: 112%
  .logo-wrapper1
    left: 0
  .logo-wrapper2
    left: 50%
    top: 8px
</style>

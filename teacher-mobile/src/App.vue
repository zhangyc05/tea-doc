<template>
  <view />
</template>

<style lang="scss">
@import './styles/tokens.scss';

page {
  min-height: 100%;
  background: $teacher-mobile-page-bg;
  color: $teacher-mobile-text-primary;
  font-family:
    'PingFang SC',
    'Microsoft YaHei',
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
}

view,
text,
button,
input,
textarea {
  box-sizing: border-box;
}

button {
  margin: 0;
  padding: 0;
  background: transparent;
  line-height: 1;
}

button::after {
  border: 0;
}
</style>

<template>
  <div
    ring="1 [rgb(var(--vc-gray-200))] dark:[rgb(var(--vc-gray-800))]"
    overflow="hidden"
    rounded="xl"
    bg="vc-white dark:vc-gray-800/50"
    style="
      background-image: linear-gradient(
        to bottom,
        rgb(var(--vc-gray-800) / 0.5),
        rgb(var(--vc-gray-950) / 0.5)
      );
    "
  >
    <slot />
  </div>
</template>

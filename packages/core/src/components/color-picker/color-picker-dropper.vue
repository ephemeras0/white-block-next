<template>
  <div
    w="8"
    h="8"
    color="hover:$wb-color-foreground"
    rounded="full"
    flex="~ none"
    justify="center"
    items="center"
    cursor="pointer"
    select="none"
    @click="pickColor"
  >
    <i w="4.5" h="4.5" i="heroicons-eye-dropper-solid" />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'ColorPickerDropper' })

async function pickColor() {
  if ('EyeDropper' in window) {
    // @ts-ignore
    // eslint-disable-next-line no-undef
    const eyeDropper = new EyeDropper()
    try {
      const { sRGBHex } = await eyeDropper.open()
      console.log(`Picked color: ${sRGBHex}`)
      // Use the color here, e.g., change background color
    } catch (error) {
      console.error('Error picking color:', error)
    }
  } else {
    console.log('EyeDropper API is not supported.')
  }
}
</script>

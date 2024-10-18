<template>
  <div w="full" h="full" color="$wb-color-foreground" bg="$wb-color-background">
    <Header @action="handleHeaderActions" />
    <Repl
      :editor="Monaco"
      :store="store"
      :theme="ThemeState[0].value"
      :show-compile-output="true"
      :auto-resize="true"
      :clear-console="false"
      :preview-options="PREVIEW_OPTIONS"
      @keydown.ctrl.s.prevent
      @keydown.meta.s.prevent
    />
  </div>
</template>

<script setup lang="ts">
import Monaco from '@vue/repl/monaco-editor'
import Header, { ActionType, ActionVersionsPayload } from './Header.vue'
import { downloadProject } from './download'
import { ThemeState } from './states'
import { Repl, store, setVersion } from './repl'
import { PREVIEW_OPTIONS } from './repl/constant'

function handleHeaderActions(
  action: ActionType,
  payload?: ActionVersionsPayload
) {
  switch (action) {
    case 'download':
      downloadProject(store)
      break
    case 'version':
      setVersion(payload?.pkg, payload?.version)
      break
  }
}
</script>

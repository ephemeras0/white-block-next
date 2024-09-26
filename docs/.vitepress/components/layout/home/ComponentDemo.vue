<template>
  <div p="x-4" grid="lg:~ lg:cols-10" gap="8" class="vp-raw">
    <wb-placeholder h="4" grid="lg:col-span-8" class="animate-down" />
    <wb-placeholder
      h="20"
      grid="lg:col-span-2 lg:row-span-2"
      class="animate-right"
    />
    <wb-placeholder h="8" grid="lg:col-span-2" class="animate-left" />
    <wb-placeholder h="8" grid="lg:col-span-6" class="animate-down" />
    <wb-placeholder
      h="150"
      grid="lg:col-span-3 lg:row-span-8"
      class="animate-left"
    />
    <wb-placeholder
      h="60"
      grid="lg:col-span-5 lg:row-span-2"
      class="animate-down"
    />
    <wb-placeholder
      h="60"
      grid="lg:col-span-2 lg:row-span-2"
      class="animate-right"
    />
    <div h="82" grid="lg:col-span-7 lg:row-span-5" class="animate-up">
      <wb-table :columns="columns" :data="data" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'ComponentDemo', inheritAttrs: false })

const columns = [
  { colKey: 'row-select', type: 'multiple' },
  { title: '名称', colKey: 'name', width: 100 },
  { title: '类型', colKey: 'type' },
  { title: 'TS类型', colKey: 'ts' },
  { title: '默认值', colKey: 'default' },
  { title: '说明', colKey: 'description' },
  { title: '必传', colKey: 'required', align: 'center' }
]

const data = [
  {
    name: 'type',
    type: 'String',
    ts: 'ButtonType',
    default: '',
    description: '按钮类型。枚举类型：["primary", "default"]',
    required: false
  },
  {
    name: 'block',
    type: 'Boolean',
    ts: 'boolean',
    default: 'false',
    description: '是否为块级元素。',
    required: false
  },
  {
    name: 'shape',
    type: 'String',
    ts: 'ButtonShape',
    default: 'rectangle',
    description: `按钮形状，有 4 种：长方形、正方形、圆角长方形、圆形。枚举类型：["rectangle",
            "square", "rounded", "circle"]`,
    required: false
  },
  {
    name: 'shape',
    type: 'String',
    ts: 'ButtonShape',
    default: 'rectangle',
    description: `按钮形状，有 4 种：长方形、正方形、圆角长方形、圆形。枚举类型：["rectangle",
            "square", "rounded", "circle"]`,
    required: false
  },
  {
    name: 'shape',
    type: 'String',
    ts: 'ButtonShape',
    default: 'rectangle',
    description: `按钮形状，有 4 种：长方形、正方形、圆角长方形、圆形。枚举类型：["rectangle",
            "square", "rounded", "circle"]`,
    required: false
  },
  {
    name: 'shape',
    type: 'String',
    ts: 'ButtonShape',
    default: 'rectangle',
    description: `按钮形状，有 4 种：长方形、正方形、圆角长方形、圆形。枚举类型：["rectangle",
            "square", "rounded", "circle"]`,
    required: false
  },
  {
    name: 'shape',
    type: 'String',
    ts: 'ButtonShape',
    default: 'rectangle',
    description: `按钮形状，有 4 种：长方形、正方形、圆角长方形、圆形。枚举类型：["rectangle",
            "square", "rounded", "circle"]`,
    required: false
  },
  {
    name: 'shape',
    type: 'String',
    ts: 'ButtonShape',
    default: 'rectangle',
    description: `按钮形状，有 4 种：长方形、正方形、圆角长方形、圆形。枚举类型：["rectangle",
            "square", "rounded", "circle"]`,
    required: false
  },
  {
    name: 'shape',
    type: 'String',
    ts: 'ButtonShape',
    default: 'rectangle',
    description: `按钮形状，有 4 种：长方形、正方形、圆角长方形、圆形。枚举类型：["rectangle",
            "square", "rounded", "circle"]`,
    required: false
  },
  {
    name: 'shape',
    type: 'String',
    ts: 'ButtonShape',
    default: 'rectangle',
    description: `按钮形状，有 4 种：长方形、正方形、圆角长方形、圆形。枚举类型：["rectangle",
            "square", "rounded", "circle"]`,
    required: false
  }
]
</script>

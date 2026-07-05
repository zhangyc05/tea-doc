<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'
import {
  AlarmClock,
  ArrowDown,
  ArrowUp,
  Avatar,
  Briefcase,
  Check,
  CircleClose,
  CirclePlus,
  Clock,
  Collection,
  CopyDocument,
  DataAnalysis,
  Document,
  EditPen,
  Files,
  Finished,
  Fold,
  Folder,
  FolderAdd,
  House,
  InfoFilled,
  List,
  Management,
  Medal,
  Memo,
  Monitor,
  Notebook,
  Operation,
  Opportunity,
  Plus,
  RefreshRight,
  School,
  Switch,
  Top,
  TrendCharts,
  Upload,
  User,
  View,
  Warning,
} from '@element-plus/icons-vue'

export type AdminIconName =
  | 'alarm-clock'
  | 'archive'
  | 'arrow-down'
  | 'arrow-up'
  | 'avatar'
  | 'briefcase'
  | 'check'
  | 'circle-close'
  | 'circle-plus'
  | 'clock'
  | 'collection'
  | 'copy-document'
  | 'data-analysis'
  | 'document'
  | 'edit'
  | 'files'
  | 'finished'
  | 'fold'
  | 'folder'
  | 'folder-add'
  | 'home'
  | 'info'
  | 'lab'
  | 'list'
  | 'management'
  | 'medal'
  | 'memo'
  | 'monitor'
  | 'notebook'
  | 'operation'
  | 'opportunity'
  | 'plus'
  | 'practice'
  | 'profile'
  | 'refresh-right'
  | 'report'
  | 'school'
  | 'switch'
  | 'top'
  | 'training'
  | 'trend'
  | 'upload'
  | 'user'
  | 'view'
  | 'warning'

const props = withDefaults(
  defineProps<{
    name?: AdminIconName | string
  }>(),
  {
    name: 'document',
  },
)

const iconMap: Record<AdminIconName, Component> = {
  'alarm-clock': AlarmClock,
  archive: Folder,
  'arrow-down': ArrowDown,
  'arrow-up': ArrowUp,
  avatar: Avatar,
  briefcase: Briefcase,
  check: Check,
  'circle-close': CircleClose,
  'circle-plus': CirclePlus,
  clock: Clock,
  collection: Collection,
  'copy-document': CopyDocument,
  'data-analysis': DataAnalysis,
  document: Document,
  edit: EditPen,
  files: Files,
  finished: Finished,
  fold: Fold,
  folder: Folder,
  'folder-add': FolderAdd,
  home: House,
  info: InfoFilled,
  lab: Opportunity,
  list: List,
  management: Management,
  medal: Medal,
  memo: Memo,
  monitor: Monitor,
  notebook: Notebook,
  operation: Operation,
  opportunity: Opportunity,
  plus: Plus,
  practice: Briefcase,
  profile: Avatar,
  'refresh-right': RefreshRight,
  report: DataAnalysis,
  school: School,
  switch: Switch,
  top: Top,
  training: Notebook,
  trend: TrendCharts,
  upload: Upload,
  user: User,
  view: View,
  warning: Warning,
}

const iconComponent = computed(() => {
  return iconMap[props.name as AdminIconName] ?? Document
})
</script>

<template>
  <component :is="iconComponent" aria-hidden="true" />
</template>

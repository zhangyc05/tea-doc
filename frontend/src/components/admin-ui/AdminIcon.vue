<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'
import {
  AlarmClock,
  ArrowLeft,
  ArrowRight,
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
  Delete,
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
  Search,
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
  | 'arrow-left'
  | 'arrow-right'
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
  | 'delete'
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
  | 'search'
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
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
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
  delete: Delete,
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
  search: Search,
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

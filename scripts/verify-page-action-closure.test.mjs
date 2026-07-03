import test from 'node:test'
import assert from 'node:assert/strict'
import { analyzeVueFileContent } from './verify-page-action-closure.mjs'

test('classifies clickable page actions and flags high-risk empty handlers', () => {
  const findings = analyzeVueFileContent('Demo.vue', `
<script setup>
const router = useRouter()
function goDetail() {
  router.push('/detail')
}
function saveDraft() {
  store.message = 'saved'
}
function emptyAction() {
  console.log('todo')
}
</script>
<template>
  <Button @click="goDetail">详情</Button>
  <button @click="saveDraft">保存</button>
  <button @click="emptyAction">空动作</button>
  <button @click="missingHandler">缺失</button>
  <a href="#">占位</a>
</template>
`)

  assert.equal(findings.find(item => item.handler === 'goDetail')?.classification, 'navigation')
  assert.equal(findings.find(item => item.handler === 'saveDraft')?.classification, 'state')
  assert.equal(findings.find(item => item.handler === 'emptyAction')?.severity, 'critical')
  assert.equal(findings.find(item => item.handler === 'missingHandler')?.severity, 'critical')
  assert.equal(findings.find(item => item.marker === 'href="#"')?.severity, 'critical')
})

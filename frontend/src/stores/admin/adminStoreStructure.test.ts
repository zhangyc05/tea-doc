import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

const adminStoreFiles = readdirSync(fileURLToPath(new URL('.', import.meta.url)))

function hasModuleFile(moduleDir: string, fileName: string) {
  return readdirSync(fileURLToPath(new URL(`./${moduleDir}/`, import.meta.url))).includes(fileName)
}

const splitStoreModules = [
  {
    moduleDir: 'ability-list',
    storeTest: 'abilityListStore.structure.test.ts',
  },
  {
    moduleDir: 'archive',
    storeTest: 'archiveStore.structure.test.ts',
  },
  {
    moduleDir: 'practice',
    storeTest: 'practiceStore.structure.test.ts',
  },
  {
    moduleDir: 'report',
    storeTest: 'reportStore.structure.test.ts',
  },
  {
    moduleDir: 'training',
    storeTest: 'trainingStore.structure.test.ts',
  },
  {
    moduleDir: 'virtual-lab',
    storeTest: 'virtualLabStore.structure.test.ts',
  },
] as const

describe('admin store structure guardrails', () => {
  it('keeps every split admin store covered by a structure test', () => {
    const missing = splitStoreModules
      .filter(({ moduleDir, storeTest }) => {
        const hasInitialData = hasModuleFile(moduleDir, 'initialData.ts')
        const hasActions = hasModuleFile(moduleDir, 'actions.ts')
        const hasStructureTest = adminStoreFiles.includes(storeTest)

        return hasInitialData && hasActions && !hasStructureTest
      })
      .map(({ moduleDir, storeTest }) => `${moduleDir} -> ${storeTest}`)

    expect(missing).toEqual([])
  })
})

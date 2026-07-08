import { describe, expect, it } from 'vitest'
import { adminRoutes } from './admin.routes'

describe('admin routes cleanup', () => {
  it('does not expose placeholder-only system routes', () => {
    expect(adminRoutes.some(route => route.path === '/admin/system')).toBe(false)
  })

  it('does not expose the standalone ability-list base replica route', () => {
    expect(adminRoutes.some(route => route.path === '/admin/ability-list/base-replica')).toBe(false)
  })
})

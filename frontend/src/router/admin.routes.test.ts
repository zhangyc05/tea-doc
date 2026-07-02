import { describe, expect, it } from 'vitest'
import { adminRoutes } from './admin.routes'

describe('admin routes cleanup', () => {
  it('does not expose placeholder-only system routes', () => {
    expect(adminRoutes.some(route => route.path === '/admin/system')).toBe(false)
  })
})

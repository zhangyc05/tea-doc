import { describe, expect, it } from 'vitest'
import archiveQueryPage from './ArchiveQueryPage.vue?raw'

describe('archive query page layout', () => {
  it('keeps the archive query page search-led instead of hero-led', () => {
    expect(archiveQueryPage).toContain('class="query-search-panel"')
    expect(archiveQueryPage).toContain('class="archive-summary-strip"')
    expect(archiveQueryPage).toContain('const archiveSummaryStats = computed(() =>')
    expect(archiveQueryPage).toContain('grid-template-columns: minmax(360px, 1.35fr) repeat(2, minmax(140px, 0.55fr)) auto;')
    expect(archiveQueryPage).toContain('.search-input {')
    expect(archiveQueryPage).toContain('min-width: 0;')
    expect(archiveQueryPage).toContain('.search-action .action-icon {')
    expect(archiveQueryPage).toContain('filter: brightness(0) invert(1);')
    expect(archiveQueryPage).toContain('.view-btn.active .view-icon {')
    expect(archiveQueryPage).not.toMatch(/\.search-input\s*\{[^}]*border:/)
    expect(archiveQueryPage).not.toMatch(/\.search-input\s*\{[^}]*padding:/)
    expect(archiveQueryPage).not.toContain('iconFilterUpdate')
    expect(archiveQueryPage).not.toContain('updateOptions')
    expect(archiveQueryPage).not.toContain('updateFilter')
    expect(archiveQueryPage).not.toContain('更新情况')
    expect(archiveQueryPage).not.toContain('queryHeroArt')
    expect(archiveQueryPage).not.toContain('queryHeroEmblem')
    expect(archiveQueryPage).not.toContain('class="query-page-heading"')
    expect(archiveQueryPage).not.toContain('查找教师成长档案，支持按学院、职称和更新状态筛选。')
    expect(archiveQueryPage).not.toContain('class="query-hero')
    expect(archiveQueryPage).not.toContain('class="hero-art"')
  })

  it('uses restrained text avatars instead of cartoon teacher illustrations', () => {
    expect(archiveQueryPage).toContain('function getTeacherInitial')
    expect(archiveQueryPage).toContain('{{ getTeacherInitial(teacher.name) }}')
    expect(archiveQueryPage).not.toContain('avatar-teacher-')
    expect(archiveQueryPage).not.toContain('class="avatar-img"')
    expect(archiveQueryPage).not.toContain(':src="getTeacherAvatar(teacher.id)"')
  })

  it('renders a distinct list layout when list view is selected', () => {
    expect(archiveQueryPage).toContain('v-else-if="viewMode === \'card\'"')
    expect(archiveQueryPage).toContain('v-else class="teachers-list"')
    expect(archiveQueryPage).toContain('class="teacher-row"')
    expect(archiveQueryPage).toContain('.teachers-list {')
    expect(archiveQueryPage).toContain('.teacher-row {')
  })
})

import { cva, type VariantProps } from 'class-variance-authority'
import { defineComponent, h, type PropType } from 'vue'

import { cn } from '@/lib/utils'

export const badgeVariants = cva('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', {
  variants: {
    variant: {
      default: 'bg-primary-soft text-primary',
      success: 'bg-success-bg text-success',
      warning: 'bg-warning-bg text-warning',
      danger: 'bg-danger-bg text-danger',
      info: 'bg-info-bg text-info',
      purple: 'bg-purple-bg text-purple',
      neutral: 'bg-neutral-bg text-neutral',
      outline: 'border border-card-border bg-card text-text-secondary',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>

export const Badge = defineComponent({
  name: 'Badge',
  inheritAttrs: false,
  props: {
    variant: {
      type: String as PropType<BadgeVariant>,
      default: 'default',
    },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'span',
        {
          ...attrs,
          class: cn(badgeVariants({ variant: props.variant }), attrs.class as string),
        },
        slots.default?.(),
      )
  },
})

export default Badge

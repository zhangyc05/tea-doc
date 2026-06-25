import { cva, type VariantProps } from 'class-variance-authority'
import { defineComponent, h, type PropType } from 'vue'

import { cn } from '@/lib/utils'

export const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-primary-hover',
        secondary: 'bg-primary-soft text-primary hover:bg-primary-light',
        outline: 'border border-card-border bg-card text-text-primary hover:bg-page-soft',
        ghost: 'bg-transparent text-text-secondary hover:bg-primary-soft hover:text-text-primary',
        danger: 'bg-danger text-white hover:opacity-90',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4',
        lg: 'h-11 px-5 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
)

type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>['variant']>
type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>['size']>

export const Button = defineComponent({
  name: 'Button',
  inheritAttrs: false,
  props: {
    variant: {
      type: String as PropType<ButtonVariant>,
      default: 'default',
    },
    size: {
      type: String as PropType<ButtonSize>,
      default: 'md',
    },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'button',
        {
          ...attrs,
          class: cn(buttonVariants({ variant: props.variant, size: props.size }), attrs.class as string),
        },
        slots.default?.(),
      )
  },
})

export default Button

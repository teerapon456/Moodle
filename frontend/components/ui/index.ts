// Modern UI Components Library (TypeScript)
// Production-ready, accessible, and responsive components

export { Button } from './Button';
export { Card } from './Card';
export { Input } from './Input';
export { Badge } from './Badge';
export { Table } from './Table';
export { Loading, Skeleton } from './Loading';
export { Modal } from './Modal';

// Component types
export type { ButtonProps } from './Button';
export type { CardProps } from './Card';
export type { InputProps } from './Input';
export type { BadgeProps } from './Badge';
export type { LoadingProps, SkeletonProps } from './Loading';
export type { ModalProps } from './Modal';

// Component examples and usage
export const componentExamples = {
  Button: {
    primary: '<Button variant="primary">Primary Button</Button>',
    secondary: '<Button variant="secondary">Secondary Button</Button>',
    outline: '<Button variant="outline">Outline Button</Button>',
    ghost: '<Button variant="ghost">Ghost Button</Button>',
    link: '<Button variant="link">Link Button</Button>'
  },
  Card: {
    default: '<Card variant="default">Default Card</Card>',
    elevated: '<Card variant="elevated">Elevated Card</Card>',
    glass: '<Card variant="glass">Glass Card</Card>',
    outlined: '<Card variant="outlined">Outlined Card</Card>'
  },
  Input: {
    default: '<Input variant="default" placeholder="Enter text" />',
    filled: '<Input variant="filled" placeholder="Enter text" />',
    outlined: '<Input variant="outlined" placeholder="Enter text" />'
  },
  Badge: {
    primary: '<Badge variant="primary">Primary</Badge>',
    secondary: '<Badge variant="secondary">Secondary</Badge>',
    success: '<Badge variant="success">Success</Badge>',
    warning: '<Badge variant="warning">Warning</Badge>',
    error: '<Badge variant="error">Error</Badge>',
    info: '<Badge variant="info">Info</Badge>'
  }
};

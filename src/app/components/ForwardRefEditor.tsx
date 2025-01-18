'use client';

import { MDXEditorMethods, MDXEditorProps } from  'mdx-float'

import dynamic from 'next/dynamic';
import { forwardRef } from 'react';

const Editor = dynamic(() => import('./Editor'), {
  ssr: false,
});

// This is what is imported by other components.
// Pre-initialized with plugins, and ready
// to accept other props, including a ref.
export const ForwardRefEditor = forwardRef<MDXEditorMethods, MDXEditorProps>(
  (props, ref) => <Editor {...props} editorRef={ref} />,
);

ForwardRefEditor.displayName = 'ForwardRefEditor';

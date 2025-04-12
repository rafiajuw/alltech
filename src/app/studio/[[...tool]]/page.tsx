// src/app/studio/[[...tool]]/page.tsx
"use client";

import { Studio } from 'sanity';
import config from '../../../../sanity.config';

export default function StudioPage() {
  return (
    <div style={{ height: '100vh' }}>
      <Studio config={config} />
    </div>
  );
}
'use client';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '100px' }}>
      <h1 style={{ fontSize: '3rem' }}>٤٠٤ - الصفحة غير موجودة</h1>
      <p>الصفحة التي تبحث عنها غير موجودة أو قد تم نقلها</p>
      <Link
        href="/"
        style={{
          marginTop: '20px',
          display: 'inline-block',
          color: '#0070f3',
          textDecoration: 'underline',
        }}
      >
       عُد إلى الخلف
      </Link>
    </div>
  );
}

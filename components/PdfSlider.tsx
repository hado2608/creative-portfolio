'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'

const SANS = "'Neue Montreal', sans-serif"

function ErrorFrame() {
  return (
    <div style={{
      background: '#e2e5ea', borderRadius: 8, aspectRatio: '16/9',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <span style={{ fontSize: 13, color: '#9ba3af', fontFamily: SANS }}>
        Sample scripts — export the file as a real PDF to display here
      </span>
    </div>
  )
}

export default function PdfSlider({ file }: { file: string }) {
  const [numPages, setNumPages]     = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [error, setError]           = useState(false)

  const onLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
    setPageNumber(1)
  }, [])

  const containerRef = useRef<HTMLDivElement>(null)

  const prev = () => setPageNumber(n => Math.max(1, n - 1))
  const next = () => setPageNumber(n => Math.min(numPages, n + 1))

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); prev() }
      if (e.key === 'ArrowRight') { e.preventDefault(); next() }
    }
    el.addEventListener('keydown', onKey)
    return () => el.removeEventListener('keydown', onKey)
  }, [numPages])

  if (error) return <ErrorFrame />

  return (
    <div ref={containerRef} tabIndex={0} style={{ marginTop: 32, marginBottom: 8, outline: 'none' }}>
      {/* Slide frame */}
      <div style={{
        borderRadius: 8,
        overflow: 'hidden',
        background: '#e2e5ea',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Document
          file={file}
          onLoadSuccess={onLoadSuccess}
          onLoadError={() => setError(true)}
          loading={
            <div style={{ aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              <span style={{ fontSize: 13, color: '#9ba3af', fontFamily: SANS }}>Loading…</span>
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            width={undefined}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            canvasBackground="transparent"
            style={{ width: '100%', display: 'block' }}
          />
        </Document>

        {/* Prev / Next arrows — only show when loaded */}
        {numPages > 1 && (
          <>
            <button
              onClick={prev}
              disabled={pageNumber === 1}
              aria-label="Previous slide"
              style={{
                position: 'absolute',
                left: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 36,
                height: 36,
                borderRadius: '50%',
                border: 'none',
                background: 'rgba(247, 247, 247, 0.88)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                cursor: pageNumber === 1 ? 'not-allowed' : 'pointer',
                opacity: pageNumber === 1 ? 0.35 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'opacity 150ms',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7L9 12" stroke="#473E3D" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <button
              onClick={next}
              disabled={pageNumber === numPages}
              aria-label="Next slide"
              style={{
                position: 'absolute',
                right: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 36,
                height: 36,
                borderRadius: '50%',
                border: 'none',
                background: 'rgba(247, 247, 247, 0.88)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                cursor: pageNumber === numPages ? 'not-allowed' : 'pointer',
                opacity: pageNumber === numPages ? 0.35 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'opacity 150ms',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 2L10 7L5 12" stroke="#473E3D" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Page counter */}
      {numPages > 0 && (
        <p style={{
          fontSize: 12,
          color: 'var(--color-warm-muted)',
          marginTop: 10,
          fontFamily: SANS,
          letterSpacing: '0.05em',
        }}>
          {pageNumber} / {numPages}
        </p>
      )}
    </div>
  )
}

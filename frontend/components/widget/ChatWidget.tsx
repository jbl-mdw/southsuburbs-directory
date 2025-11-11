'use client'

import { useEffect } from 'react'

export default function ChatWidget() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'http://178.156.170.185:8081/widget/connectboss-widget.js'
    script.setAttribute('data-business', 'South Suburbs Best')
    script.setAttribute('data-niche', 'directory')
    script.setAttribute('data-color', '#3366FF')
    script.setAttribute('data-chat', 'true')
    script.async = true
    document.body.appendChild(script)
    
    return () => {
      document.body.removeChild(script)
    }
  }, [])
  
  return null
}

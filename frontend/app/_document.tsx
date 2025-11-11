import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const script = document.createElement('script');
                script.src = 'https://southsuburbsbest.com/widget-api/widget/connectboss-widget.js';
                script.setAttribute('data-business', 'South Suburbs Best');
                script.setAttribute('data-niche', 'directory');
                script.setAttribute('data-color', '#3366FF');
                script.setAttribute('data-chat', 'true');
                script.async = true;
                document.body.appendChild(script);
                console.log('WIDGET INJECTED VIA _document.tsx');
              })();
            `
          }}
        />
      </body>
    </Html>
  )
}

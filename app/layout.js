import '@/styles/default.css'
import '@/styles/global.css'
import Header from '@/components/header'
import Footer from '@/components/footer'



export const metadata = {
  title: 'ENOCA MOVIE APP',
  description: 'Gökhan GÜLLER',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="container">
      <Header/>
      <main>
      {children}
      </main>
      <Footer/>
      </body>
    </html>
  )
}

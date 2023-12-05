import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import Link from 'next/link'

import utilStyles from '../styles/utils.module.css'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[hello, this is zora chan from China,i'm a software enginer.]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://www.nextjs.cn/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      {/* /api/hello页面 */}
      <Link href={'/api/hello'} prefetch={true}>
        <span style={{color: 'blue', fontWeight: 'bold', fontSize: '1.5rem'}}>hello</span>
      </Link>
      <br/>
       {/* /posts/first-post页面 */}
       <Link href={'/posts/first-post'} prefetch={true}>
        <span style={{color: 'blue', fontWeight: 'bold', fontSize: '1.5rem'}}>first-post</span>
      </Link>
      <br/>
      {/* /news/news页面 */}
      <Link href={'/news/news'} prefetch={true}>
        <span style={{color: 'blue', fontWeight: 'bold', fontSize: '1.5rem'}}>daily-news</span>
      </Link>
      <br/>
      {/* /posts/index页面 */}
      <Link href={'/posts'} prefetch={true}>
        <span style={{color: 'blue', fontWeight: 'bold', fontSize: '1.5rem'}}>my-posts</span>
      </Link>
    </Layout>
  )
}
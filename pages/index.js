import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'

import utilStyles from '../styles/utils.module.css'

export async function getStaticProps() {
    const allPostsData = getSortedPostsData()
    // let postList = []
    // await fetch('https://jsonplaceholder.typicode.com/posts')
    //     .then(res => res.json())
    //     .then(res => postList = res)
    // console.log(postList)
    return {
      props: {
        allPostsData,
        // postList
      }
    }
}



export default function Home({allPostsData, postList} ) {
    // console.log(postList)
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

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
                 id: {id} <br />
                <Link legacyBehavior href={`/posts/${id}`}>
                    <a style={{color: 'blue'}}>{title}</a>
                </Link>
               <br/>
                <small className={utilStyles.lightText}>
                    <Date dateString={date} />
                </small>
            </li>
          ))}
        </ul>
        {/* <div className={utilStyles.list}>
            {postList.map((item, key) => {
                return <div key="key"> 
                      {item.id} <br/>
                    {item.title} <br/>
                    {item.body} <br/>
                </div>
            })}
        </div> */}
      </section>
    </Layout>
  )
}
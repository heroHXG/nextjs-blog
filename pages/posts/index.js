
import Head from 'next/head'
import Layout, { siteTitle } from '../../components/layout'
import { getSortedPostsData } from '../../lib/posts'
import Link from 'next/link'
import Date from '../../components/date'

import utilStyles from '../../styles/utils.module.css'

export async function getStaticProps() {
    const allPostsData = getSortedPostsData()
    return {
      props: {
        allPostsData,
      }
    }
}

export default function Posts({allPostsData}) {
    return (
        <Layout home>
            <Head>
            <title>{siteTitle}</title>
            </Head>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Blog</h2>
                {/* first-post链接 */}
                <Link href={'/posts/first-post'} prefetch={true}>
                    <span style={{color: 'blue', fontWeight: 'bold', fontSize: '1.5rem'}}>/posts/first-post</span>
                </Link>
                <hr/>
                <hr/>
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
            
            </section>
        </Layout>
    )
}
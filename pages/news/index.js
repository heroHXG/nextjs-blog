import Link from 'next/link'
import Layout, { siteTitle } from '../../components/layout'
import {getStaticNews} from '../../lib/news'

import utilStyles from '../../styles/utils.module.css'

export async function getStaticProps() {
    let {newsList} = await getStaticNews()
    return {
        props: {newsList}
    }
}
export default function News({newsList}) {
    // console.log(newsList, newsList.length)
    return (
        <Layout>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>News</h2>
                <ul className={utilStyles.list}>
                    {newsList.map(({ id, userId, title, body }) => (
                        <li className={utilStyles.listItem} key={id}>
                            id: {id} <br />
                            <Link legacyBehavior href={`/news/${id}`}>
                                <a style={{color: 'blue'}}>{title}</a>
                            </Link>
                        <br/>
                            <small className={utilStyles.lightText}>
                                userId: {userId} <br/>
                            </small>
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    )
}
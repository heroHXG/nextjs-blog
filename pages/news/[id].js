
import {getStaticNews, getNewsContent} from '../../lib/news'
import Layout from '../../components/layout'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'

export async function getStaticPaths() {
    let {newsId} = await getStaticNews()
    /*
    Error: Extra keys returned from getStaticPaths in /news/[id] (newsId) Expected: { paths: [], fallback: boolean }
See here for more info: https://nextjs.org/docs/messages/invalid-getstaticpaths-value
    */ 
    // return {newsId}
    return {
        paths: newsId,
        fallback: false
    }
}

// 根据path获取具体的news content
export async function getStaticProps({params}) {
    console.log(params)
    let res = await getNewsContent(params?.id)
    return {
        props: {res}
    }
}

export default function New({res}) {
    console.log(res)
    return (
        <Layout>
        <Head>
            <title>{res.title}</title>
        </Head>
       
        🆔: {res.id}
       
        <article>
            <h1 className={utilStyles.headingXl}>{res.title}</h1>
            <div className={utilStyles.lightText}>
                userId: {res.userId}
            </div>
            <div dangerouslySetInnerHTML={{ __html: res.body }} />
        </article>
      </Layout>
    )
}
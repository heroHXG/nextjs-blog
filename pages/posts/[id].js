import Layout from '../../components/layout'
import Head from 'next/head'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

//并创建getStaticPaths调用这个函数:
export async function getStaticPaths() {
// Return a list of possible value for id

  const paths = getAllPostIds()
  console.log(paths)
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
    // Fetch necessary data for the blog post using params.id
    //params参数来自 getStaticPaths 函数的返回值
    // const postData = getPostData(params.id)
    // Add the "await" keyword like this:
    const postData = await getPostData(params.id)
    return {
      props: {
        postData
      }
    }
}



export default function Post({ postData }) {
    return (
      <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
       
        {postData.id}
       
        <article>
            <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            <div className={utilStyles.lightText}>
                <Date dateString={postData.date} />
            </div>
            {/* dangerouslySetInnerHTML 属性确保 HTML 不被编码。 */}
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </Layout>
    )
  }
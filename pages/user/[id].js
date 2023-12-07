
// 点进每个ID详情页，根据 postId 获取用户的comments 
import Image from 'next/image'
import Layout from '../../components/layout'
import Head from 'next/head'
import {getUserInfo, getUserDetail} from '../../lib/users'
import utilStyles from '../../styles/utils.module.css'

export async function getStaticPaths() {
    let { userId: paths} = await getUserInfo()

    // Error: Extra keys returned from getStaticPaths in /user/[id] (users) Expected: { paths: [], fallback: boolean }
    // getStaticPaths函数只能返回固定格式的值
    return {
        paths,
        fallback: false
    }
}
export async function getStaticProps(path) {
    let detail = await getUserDetail(path.params.id)
    console.log('detail', detail)
    return {
        // getStaticProps 必须要有返回值，且返回值必须放在props里面。
        props: {
            detail: detail || []
        }
    }
}

export default function userImage({detail}) {
    console.log('detail', detail)
    return (
        <>{ 
            detail.length > 0 ? (
            <>
                <Head>
                    <title>`/user/`${detail[0].postId}</title>
                </Head>
                <Layout>
                   {
                    detail.map(({id, postId, body}, index) => (
                        <article key={id}>
                             <h1 className={utilStyles.headingXl}>用户{postId}</h1>
                             <div className={utilStyles.lightText}>
                                 第{index+1}条
                             </div>
                             {/* dangerouslySetInnerHTML 属性确保 HTML 不被编码。 */}
                             <div dangerouslySetInnerHTML={{ __html: body }} />
                         </article> 
                    ))
                   }
                </Layout>
            </>
        )
        :<h1>该用户暂无任何评论</h1>
        }</>
    )
}

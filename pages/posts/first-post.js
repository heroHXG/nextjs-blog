import Link from 'next/link'
// 从next/ head模块中导入Head
import Head from 'next/head'
import Layout from '../../components/layout'

export default function FirstPost() {
  return (
    <>
    <Layout>
        {/* 将Head 添加到FirstPost组件。现在，我们只添加title标签.
        尝试访问http://localhost:3000/posts/first-post。浏览器选项卡现在应该显示“First Post”。通过使用浏览器的开发人员工具，您应该看到标题标记被添加到<head>。
        */}
            <Head>
                <title>first-post</title>
            </Head>
        <h1>First Post</h1>
        <h2>
            <Link href="/">
            Back to home
            </Link>
        </h2>
      </Layout>
    </>
  )
}
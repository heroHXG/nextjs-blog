import React from 'react'
import Layout from '../../components/layout'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'
import Link from 'next/link'
import Image from 'next/image'
import {getUserInfo} from '../../lib/users'
/*
可以观察到，getStaticProps 每次请求，terminal栏就发送一次请求。那和 getServerSideProps 有什么区别呢？
区别在于“.next"打包文件中。可以看到“user-img.js”打包多生成了一个“user-img.json"文件。
在第一次请求的时候，去请求服务器。之后的请求就直接把这个json文件插入到页面中了。相当于server端不再向真正的服务器发请求了。
*/ 
export async function getStaticProps() {
  let {users: backData} = await getUserInfo()
  console.log(backData)  //可以看到在terminal栏打印出来
  // 展示到页面上----> 通过return的方式，通过props传到页面中
  return {
    props: {backData}
  }
}
function user({backData}) {
  return (
    <Layout>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Users</h2>
          {/* ssr-info的链接 */}
          <Link href="/user/ssr-info">
            <button style={{color: 'blue', fontWeight: 'bold', fontSize: '1.2rem'}}>/ssr-info</button>
          </Link>
          <hr/>
          <hr/>
          <ul className={utilStyles.list}>
              {backData.posts.map(({ id, title, author, avatar }) => (
                  <li className={utilStyles.listItem} key={id}>
                    id: {id} <br />
                    <Image src={avatar} alt="Vercel Logo" width={160} height={150} />
                    <Link legacyBehavior href={`/user/${id}`}>
                        <a style={{color: 'blue'}}>{title}</a>
                    </Link>
                    <br/>
                    <small className={utilStyles.lightText}>
                        userId: {author} <br/>
                    </small>
                  </li>
              ))}
          </ul>
      </section>
    </Layout>
  )
}
export default user
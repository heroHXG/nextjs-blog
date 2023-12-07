import React, {useState, useEffect} from 'react'
import {getUserInfo} from '../../lib/users'
import Image from 'next/image'

/*
用服务器端提供的方法`getServerSideProps`,这个名字不能改，表示专门做服务端渲染的。
使用getServerSideProps，就必须要有返回值。
服务端渲染是服务端把页面和数据结合返回给客户端。所以在浏览器端我们是看不见下面的fetch请求有发出去的。
但是在vscode的terminal 界面里可以看到服务器端返回的数据。
*/ 
export async function getServerSideProps() {
  // 在这里是从server端请求的，不会跨域
  let {users: backData} = await getUserInfo()
  console.log(backData) //可以看到在terminal栏打印出来
  // 展示到页面上----> 通过return的方式，通过props传到页面中
  return {
    props: {backData}
  }
}
function SSRInfo(props) {
  const [happy, setHappy] = useState({})
  async function getHappy() {
    console.log('----------handler--getHappy--------')
    setHappy(happy.posts ?  {} : props.backData)
  }

  useEffect(() => {
    console.log(happy)
  }, [happy])

  return (
    <div>
        <h3>getServerSideProps 获取 userInfo</h3>
        <h1>{props.backData.profile.name}</h1>
        <button onClick={() => getHappy()}>什么是快乐星球？</button>
        <h1>
          {
            happy?.comments?.map((item, id) => <div key={id}> {item.body} </div>)
          }
          {
            happy?.posts?.map((item, id) => <span key={id}><Image alt="avater" src={item.avatar} width="160" height="150"></Image></span>)
          }
        </h1>
    </div>
  )
}
export default SSRInfo
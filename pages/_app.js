/**
 * 
 * 这个App组件是最顶层的组件，在所有不同的页面中都是通用的。例如，你可以使用这个App组件在页面间导航时保持状态。
 */ 

/** 在Next.js中，你可以从pages/_app.js中导入全局CSS文件。你不能在其他地方导入全局CSS。
 * 全局CSS不能导入到pages/_app.js文件之外的原因是：全局CSS会影响页面上的所有元素。
如果你要从主页导航到/posts/first-post页面，主页的全局样式会无意中影响到/posts/first-post。
 */ 
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp

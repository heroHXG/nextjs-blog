
### 一、为什么选择nextjs做博客？
Next.js 是一个基于 React 的应用程序框架，它几乎没有特定于博客功能。但是，它可以提供了一种实现机制：

在可能的情况下，Next.js 生成静态内容，如 SSG，这些页面加载速度非常快，可以被搜索引擎快速收录，并且可以在任何有或没有 JavaScript 的设备上阅读。
在第一次加载后，Next.js 应用程序的行为类似于单页应用程序 (SPA)，后续页面和代码会以渐进式下载，无需刷新整页。
Next.js 为每个请求提供服务器端渲染 (SSR)，为个人用户提供实时 CMS内容管理系统 更新或自定义内容变得更加容易。

如果网站可能会从基本博客迭代为更复杂的网站，例如在线商店、新闻聚合服务、社交媒体平台等，可以考虑使用 Next.js。


### 二、手动安装设置 & 启动项目

next很简单，可以照着官方文档做就好了。 `https://www.nextjs.cn/docs/getting-started`
ejs模板和next不太一样。

1、安装
`npx create-next-app nextjs-blog`  npx表示临时安装
 `nextjs-blog`是自定义项目名
2、在next里想使用react其他库，可以自己去下，和在react使用一样。
比如：为你的项目安装 next、react 和 react-dom ：
`npm install next react react-dom`  # or
`yarn add next react react-dom`

3、打开 package.json 文件并添加 scripts 配置段：
```js
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```
这些脚本涉及开发应用程序的不同阶段：
dev - 运行 next dev，以开发模式启动 Next.js
build - 运行 next build，以构建用于生产环境的应用程序
start - 运行 next start，以启动 Next.js 生产环境服务器
lint - 运行 next lint，以设置 Next.js 的内置 ESLint 配置

4、启动服务。
（1）`npm run dev` 
要启动 Next.js 开发服务器，从项目根目录在终端中运行 npm run dev（可以使用 npx next dev），然后在浏览器中打开 http://localhost:3000/
如果端口被占用，会自动后延端口。
不是每次改完都要build，dev环境启动不用每次改完都要build。
（2）`yarn build && yarn start`
   start模式下next项目要先build再启动。
 注意：改完代码之后，production环境要重新build再生效？？？
  

### 三、本地搭建express起一个服务器
server目录：`nextjs-blog/express/server.js`
1、启动express服务器。进入express目录，确保已经安装了“express”。cli：node server.js



### 三、增加静态资源
public 目录用于存放静态资源，如图标、robots.txt 或其它更新频率低的文件。可以增加自己的文件或从初始项目存储库复制 favicon.ico 和图像子目录。

### 四、创建模板
Next.js 使用 React 组件来实现模板化，接下来项目根目录下创建一个新的 components 文件夹，然后添加 layout.js 来定义一个新的 <Layout> 组件


### 五、使用动态路由查看博客内容
使用 JSX 创建内容并不是特别实用，尤其是对于常规博客文章，对于开发者比较喜欢 Markdown 的方式写博客。Next.js 可以使用任何来源创建页面。这些可以在构建时静态生成，并使用动态路由将数据映射到 URL。
存放博客的markdown文件 内容的模板以 --- 来定义博客的标题、发布时间等元数据， --- 后面的为博客的正文。接下来需要安装解析内容的依赖，包括：front-matter、remark 和 remark-html，执行一下命令：
`npm install front-matter remark remark-html --save`

要读取和解析 Markdown 文件，需要添加相关逻辑，代码所在文件 lib/posts.js 。



### 六、路由
next 可以和 react 结合起来使用。react该怎么写就怎么写。就是可以不用写路由了，因为next.js 给了新的路由方式。

Next.js 是围绕着 页面（pages） 的概念构造的。一个页面（page）就是一个从 pages 目录下的 .js、.jsx、.ts 或 .tsx 文件导出的 React 组件。
页面（page） 根据其文件名与路由关联。例如，pages/about.js 被映射到 /about。甚至可以在文件名中添加动态路由参数。
Next.js 支持具有动态路由的 pages（页面）。例如，如果你创建了一个命名为 pages/posts/[id].js 的文件，那么就可以通过 posts/1、posts/2 等类似的路径进行访问。
静态文件服务。./public/ 被映射到 /

1、next是以文件作为路由的。next里面不用配置路由了，在“@/pages”里面新增的js文件，直接在url栏输入文件名就可以访问了。
2、当pages里面文件过多时候，就可以通过新建文件夹来管理。
比如“@/pages/user”文件夹,通过 `http://localhost:3000/user/user-info` 就可以访问到相关页面。




### 七、getServerSideProps
文件目录：`nextjs-blog/pages/user/ssr-info.js`

请求数据： 用服务器端提供的方法`getServerSideProps`,这个名字不能改，表示专门做服务端渲染的
使用getServerSideProps，就必须要有返回值

```js
/*
服务端渲染是服务端把页面和数据结合返回给客户端。所以在浏览器端我们是看不见下面的fetch请求有发出去的。
但是在vscode的terminal 界面里可以看到服务器端返回的数据。
*/ 
export async function getServerSideProps() {
  const res = await fetch('http://127.0.0.1:8083/express')
  const backData = await res.json()
  console.log(backData)  //可以看到在terminal栏打印出来
  // 展示到页面上----> 通过return的方式，通过props传到页面中
  return {
    props: {backData}
  }
}
```

### 八、怎么证明next.js 是服务器端渲染的呢？
1、把本地“nextjs-blog”项目停掉，用“npm run build”构建出来，就可以看到。
2、构建生成“.next"文件夹，打开“.next"在构建的代码里，可以看到我们写的“ssr-info.js”
3、“.next"的“server”端代码
`nextjs-blog/.next/server/pages/user/ssr-info.js`
  (1)对比看一下“user/index.js”里没有内容，就转换为了一个纯html。
4、根据`/.next/server/pages/user/ssr-info.js`得知代码就是在服务器端运行的，服务器端运行就直接把数据放在了模板里。
5、加上官网也写明了“next-这是一个用于生产环境的react框架”

6、总结：怎么做服务端渲染？
就是在服务器里把代码打包运行，当用户通过页面发送请求的时候，数据是后台服务器发送请求渲染之后直接给用户的。


### 九、SSG 方案解决了什么问题？ --- 相当于静态页面生成器
现在页面上的数据需要每一次请求服务器吗？
1、如果需要的数据长时间是不变的，可以本地缓存。但是缓存还需要先判断本地有没有再决定要不要缓存。
2、还有一种方式：每次请求，数据直接给你。连请求服务器都不需要了，是和数据库一摸一样的静态文件。也就不需要缓存了。

优点：
1、有些数据是一两年都不变的，比如京东，淘宝侧边栏的商城。没必要每次都向服务器请求数据，可以直接放在静态页面里面。
2、网易新闻网站，稿子出来之后，宁可重发一遍也不会改。这样的网站，没有必要来一次请求一次服务器数据。直接在你不请求的时候把服务器数据拿来，
写到你的静态页面里面。
3、好处：帮助react生成静态页面。要是半年之后数据变化了呢？那就重新打包一次。
或者用我们的自动构建工具：如果数据变了，就发一个信号，比如git hooks，自动在服务器里构建一次，重新把页面内容换一次。
3、有些网站实时变动的，就不要用SSR。

```js
/*
可以观察到，每次请求，terminal栏就发送一次请求。那和 getServerSideProps 有什么区别呢？
区别在于“.next"打包文件中。可以看到“user-img.js”打包多生成了一个“user-img.json"文件。
在第一次请求的时候，去请求服务器。之后的请求就直接把这个json文件插入到页面中了。相当于server端不再像真正的服务器发请求了。
*/ 
export async function getStaticProps() {
  const res = await fetch('http://127.0.0.1:8083/express')
  const backData = await res.json()
  console.log(666666)  //可以看到在terminal栏打印出来
  console.log(backData)
  // 展示到页面上----> 通过return的方式，通过props传到页面中
  return {
    props: {backData}
  }
}
```
### 十、next提供link组件
 next.js路由器允许你在页面之间进行客户端路由转换，类似于单页面应用。
next.js 提供了一个名为Link的React组件来完成这个客户端路由转换。
默认情况下，对于使用静态生成的页面，视口中(最初或通过滚动)的任何<Link />都将被预取(包括相应的数据)。对于服务器呈现的路由，不会预取相应的数据。
import Link from 'next/link'


### 十一、关于“fs”模块的报错
npm module not found error can't resolve 'fs'
如果在使用npm时遇到了“module not found error can't resolve 'fs'”这个错误，这通常意味着您正在尝试在一个浏览器环境中使用一个需要文件系统(fs)模块的npm包。
文件系统模块是Node.js的核心模块之一，它提供了一组方法来处理文件系统操作。然而，浏览器并不支持这些操作，因此无法使用这个模块。
如果您需要使用这个npm包，您需要检查它是否适用于浏览器环境，或者您可以尝试使用Node.js环境来运行您的应用程序。
如果您正在使用Node.js环境，那么可能是因为您的依赖项列表中没有这个模块，或者该模块没有正确安装。您可以尝试使用npm安装缺失的模块或者在终端中使用以下命令：
npm install fs
如果这仍然没有解决问题，您可以检查您的依赖项是否正确配置，并且您是否使用了正确的Node.js版本。如果您的代码中有对文件系统(fs)模块的引用，请确保您的代码正确使用了这个模块。
在package.json 文件里添加以下内容：
"browser": {
    "fs": false,
    "os": false,
    "path": false
}
并且新增.babelrc 文件
并且修改.eslintrc 文件




### 项目总结
blog项目有几个注意点：
1、动态路由页面先获取页面path，再根据path获取staticContent。其中getStaticPath 返回值要跟官方文档一致。
```js
//创建getStaticPaths调用函数:
export async function getStaticPaths() {
// Return a list of possible value for id

  const paths = getAllPostIds()
  console.log(paths)
  return {
    paths,
    fallback: false
  }
}
```
2、在getStaticPaths 里面获取的paths 是整个动态路由的数组，paths要根据官方文档遵循特定的格式。
然后在 getStaticPaths 里面也要返回固定的格式。

```js
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory)
  
    // Returns an array that looks like this:
    // [
    //   { params: {id: 'ssg-ssr'} },
    //   { params: { id: 'pre-rendering' } }
    // ]
    return fileNames.map(fileName => {
        console.log(fileName)
      return {
        params: {
          id: fileName.replace(/\.md$/, '')
        }
      }
    })
}
```

3、注意：动态路由的path值是string类型。
4、一些js函数的注意点，比如数组的filter函数返回值是个数组，如果要渲染特定的object到UI层，要先从filter返回的数组中取到这个object。一般是数组的第0项。
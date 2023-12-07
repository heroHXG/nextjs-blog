
### 一、为什么选择nextjs做博客？
Next.js 是一个基于 React 的应用程序框架，它几乎没有特定于博客功能。但是，它可以提供了一种实现机制：

在可能的情况下，Next.js 生成静态内容，如 SSG，这些页面加载速度非常快，可以被搜索引擎快速收录，并且可以在任何有或没有 JavaScript 的设备上阅读。
在第一次加载后，Next.js 应用程序的行为类似于单页应用程序 (SPA)，后续页面和代码会以渐进式下载，无需刷新整页。
Next.js 为每个请求提供服务器端渲染 (SSR)，为个人用户提供实时 CMS内容管理系统 更新或自定义内容变得更加容易。

如果网站可能会从基本博客迭代为更复杂的网站，例如在线商店、新闻聚合服务、社交媒体平台等，可以考虑使用 Next.js。


### 二、启动开发环境
要启动 Next.js 开发服务器，从项目根目录在终端中运行 npm run dev（可以使用 npx next dev），然后在浏览器中打开 http://localhost:3000/：
如果端口被占用，会自动后延端口。

### 三、增加静态资源
public 目录用于存放静态资源，如图标、robots.txt 或其它更新频率低的文件。可以增加自己的文件或从初始项目存储库复制 favicon.ico 和图像子目录。

### 四、创建模板
Next.js 使用 React 组件来实现模板化，接下来项目根目录下创建一个新的 components 文件夹，然后添加 layout.js 来定义一个新的 <Layout> 组件


### 五、使用动态路由查看博客内容
使用 JSX 创建内容并不是特别实用，尤其是对于常规博客文章，对于开发者比较喜欢 Markdown 的方式写博客。Next.js 可以使用任何来源创建页面。这些可以在构建时静态生成，并使用动态路由将数据映射到 URL。
存放博客的markdown文件 内容的模板以 --- 来定义博客的标题、发布时间等元数据， --- 后面的为博客的正文。接下来需要安装解析内容的依赖，包括：front-matter、remark 和 remark-html，执行一下命令：

npm install front-matter remark remark-html --save

要读取和解析 Markdown 文件，需要添加相关逻辑，代码所在文件 lib/posts.js 。


### 六、关于“fs”模块的报错
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


### 七、关于ENOENT 报错
报错：Error: ENOENT: no such file or directory, open '/Users/hanxiaogeng/Documents/02-REACT/React-qianFeng/react+next/nextjs-blog/.next/BUILD_ID'


### 八、关于yarn报错
报错信息：
Export encountered errors on following paths:
        /
error Command failed with exit code 1.

解决方案：https://zhuanlan.zhihu.com/p/659359689

方法一、更新yarn
$ yarn info
$ yarn upgrade
$ yarn add yarn

如果显示更多错误，请运行以下命令：

export NODE_OPTIONS=--openssl-legacy-provider
方法二、删除yarn.lock或rm -rf yarn.lock（如果您是 Linux/MacOS 用户）


Delete node_modules/ or rm -rf node_modules/ (if you are Linux/MacOS user)

Follow the instructions to install the latest Yarn package available from here

Try executing the following commands in your project root folder:

方法三、删除node_modules/或rm -rf node_modules/ （如果您是 Linux/MacOS 用户）
rm -rf node_modules

yarn cache clean

yarn

yarn start

按照说明安装此处提供的最新 Yarn 包
npm install --global y



尝试在项目根文件夹中执行以下命令：

yarn install和yarn start
如果上述方法没有帮助：

1.尝试安装最新的node.js

2.删除node_modules/并lock归档
3.使用npm install和npm run-script[1]


### 十、关于报错
以上这些报错，先删除yarn，再安装yarn。
删除node_modules，再用npm安装node_modules。
yarn build
yarn dev  启动开发环境
报错还未解决，在文件中import导入依赖时候，报错：Parsing error: Cannot find module 'next/babel'。
参考链接：https://bobbyhadz.com/blog/node-parsing-error-cannot-find-moule-next-babel#:~:text=To%20solve%20the%20Parsing%20error%3A%20Cannot%20find%20module,and%20set%20the%20%60presets%60%20property%20to%20%60%20%5B%22next%2Fbabel%22%5D%60.

好像是express文件和nextjs-blog 文件放在同一个文件夹里导致的，把express移到nextjs-blog文件外面就解决了。
现在还不清楚报错是怎么导致的。
update: 不是文件夹位置导致的。


1、报错：Error: Error serializing `.allPostsData` returned from `getStaticProps` in "/".
Reason: `object` ("[object Promise]") cannot be serialized as JSON. Please only return JSON serializable data types.
解决：JSON.parse(JSON.stringify) hack 
链接：https://github.com/vercel/next.js/issues/11993
错误原因：md文档里date字段的值没有加引号把它变成字符串。

2、报错：Unhandled Runtime Error
TypeError: path__WEBPACK_IMPORTED_MODULE_4___default(...).join is not a function


### 九、next提供link组件
/**
 * next.js路由器允许你在页面之间进行客户端路由转换，类似于单页面应用。
next.js 提供了一个名为Link的React组件来完成这个客户端路由转换。
默认情况下，对于使用静态生成的页面，视口中(最初或通过滚动)的任何<Link />都将被预取(包括相应的数据)。对于服务器呈现的路由，不会预取相应的数据。
 */
import Link from 'next/link'



### 项目总结
blog项目有几个注意点：
1、动态路由页面先获取页面path，再根据path获取staticContent。其中getStaticPath 返回值要跟官方文档一致。
```js
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
```
2、在getStaticPaths 里面获取的是整个动态路由的数组，然后包装这个数组返回特定的格式。
这个整个动态路由数组也要遵循特定的格式。
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
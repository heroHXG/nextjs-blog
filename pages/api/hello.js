// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// 创建API路由
// req = request data, res = response data
// export default (req, res) => {
//     // ...
//     // 试着访问http://localhost:3000/api/hello。你应该看到{"text":"Hello"}。
// res.status(200).json({ text: 'Hello' })
// }

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}

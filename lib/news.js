
export async function getStaticNews() {
    let newsList = []
    let newsId = []
    await fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(res => newsList = res)
    // 返回newsList 的每个页面id, 
    /* 每个页面的path必须是string类型的
    Error: Invalid `paths` value returned from getStaticPaths in /news/[id].
`paths` must be an array of strings or objects of shape { params: [key: string]: string }

    // Returns an array that looks like this:
        // [
        //   { params: {id: 'ssg-ssr'} },
        //   { params: { id: 'pre-rendering' } }
        // ]
    */ 
    newsId = newsList.map((item, key) => {
        return {params: {
            id: JSON.stringify(item.id)
        }}
    })
    return {
        newsList,
        newsId
    }
}

export async function getNewsContent(id) {
    let {newsList} = await getStaticNews()
    // newsList的item.id 为number类型，传递过来的pathId为string类型，所以不能用全等符号。
    let res = newsList.filter(item => item.id === JSON.parse(id))
    // filter方法返回的是个数组，需求是取返回的pathId 对象。
    return res[0]
}
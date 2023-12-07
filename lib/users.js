// 如果把users作为全局变量，必须先进入users/index页面，再进入users/id页面，不然users为空获取不到值。
// let users = []

export async function getUserInfo() {
    let users = []
    let userId = []
    await fetch('http://127.0.0.1:8083/express').then(res => 
        res.json()
    ).then(res => {
        users = res
    })
    userId = users.posts.map(item => {
        return {params: {id: JSON.stringify(item.id)}}
    })
    return {
        users,
        userId
    }
}

// 根据user 的 postid 获取相应的 comments
export async function getUserDetail(id) {
    // 获取users值
    let {users} = await getUserInfo()
    let detail = users?.comments?.filter(item => item.postId === JSON.parse(id) )
    return detail
}
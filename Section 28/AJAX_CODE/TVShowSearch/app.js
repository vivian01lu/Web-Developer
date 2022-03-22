////////////////////////////////跟练：
//如何给form 加上搜索查找功能

const form = document.querySelector('#searchForm');
form.addEventListener('submit', async function (e) {
    e.preventDefault();//先阻止该页面跳转
    //then extract what user have in here

    // console.log(form.elements.query.value);//!!!!复习:! elements中的一个query属性的value值！
    const searchTerm = form.elements.query.value;
    const config = { params: { q: searchTerm } };
    //////创建config的目的是：如果有多个想加入到query string中时会更加容易方便

    //then make API call:
    const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
    //console.log(res.data[0].show.image.medium);//得到了image的url
    const img = document.createElement('IMG')
    // img.src = res.data[0].show.image.medium;//---!!!--------如何用得到的图片url 展示图片！
    // document.body.append(img);//----------------------------------展示图片时需要把图片加入到body中
    /////////---------我并不知道show是一个属性 ：我也不知道还能再接着调用image属性和其medium功能 ：result.show.image.medium
    makeImages(res.data);
    form.elements.query.value = '';//并且在搜索完之后将form清空！
})

const makeImages = (shows) => {
    for (let result of shows) {
        if (result.show.image) {
            const img = document.createElement('IMG');
            img.src = result.show.image.medium;
            document.body.append(img)
        }
    }
}


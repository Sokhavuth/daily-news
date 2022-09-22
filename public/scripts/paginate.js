//public/scripts/paginate.js

let page = 0

function paginate(){
    $('.pagination img').attr('src', '/images/loading.gif')
    page += 1
    
    $.post(`/paginate`,{page:page},function(data, status){
        appendItem(data.items, data)
    })
}

function appendItem(items, data){
    let html = ''
    
    if(items){
        for(let index=0; index<items.length; index++){
            html += `<a class="thumb" href="/post/${data.items[index].key}">`
            html += `<img src="${data.items[index].thumb}" />`
            if(data.items[index].videos){ 
                if(data.items[index].videos !== ""){ 
                    if(data.items[index].videos !== "[]"){ 
                        html += `<img class="play-icon" src="/images/play.png" />`
                    }
                }

            }
            html += `</a>`
            html += `<div class="content">`
            html += `<a class="title" href="/post/${data.items[index].key}">`
                html += data.items[index].title
            html += `</a>`
            html += `<div class="text-content">${data.items[index].content}</div>`
            html += `</div>`
        } 
    }
    
    let message = ''
    if(data.count - data.page*data.fpostLimit  == 1){
        message = `1 more post`
    }else if(data.count - data.page*data.fpostLimit <= 0){
        message = `no more post`
    }else{
        message = `${data.count - data.page*data.fpostLimit} more posts`
    }

    $('.article').append(html)
    $('.pagination p').html(message)
    
    $('.pagination img').attr('src', '/images/loadmore.png')
}
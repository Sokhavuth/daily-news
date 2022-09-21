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
        for(let v=0; v<items.length; v++){
            if(v === 1){
                html += `<div class="post paginate large-thumb">`
            }else if(v <= 2){
                html += `<div class="post paginate">`
            }else if(v === 4){
                html += `<div class="post large-thumb">`
            }else{
                html += `<div class="post">`
            }

            if((v === 1)||(v === 4)){
                html += `<a class="thumb" href="/post/${items[v].key}">`
                html += `<img src="${items[v].thumb}" />`
                if(items[v].videos){ 
                    if((items[v].videos !== "")&&(items[v].videos !== "[]")){
                        html += `<img class="play-icon" src="/images/play.png" />`
                    }
                } 
                html += `</a>`
                html += `<a href="/post/${items[v].key}">`
                html += `<p class="title">${items[v].title}</p>`
                html += `</a>`
            }else{
                html += `<div class="post">`
                html += `<a href="/post/${items[v].key}">`
                html += `<p class="title">${items[v].title}</p>`
                html += `</a>`
                html += `<div class="content">${items[v].content}</div>`
                html += `</div>`
            }
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

    $('.articles').append(html)
    $('.pagination p').html(message)
    
    $('.pagination img').attr('src', '/images/loadmore.png')
}
$(document).ready(function(){
    var sub = $('#sub')

    var activeRow
    var activeMenu

    var timer

    var mouseInSub = false

    sub.on('mouseenter',function(e){
        mouseInSub = true
    }).on('mouseleave',function(e){
        mouseInSub = false
    })

    var mouseTrack = []

    var moveHandler = function(e){
        mouseTrack.push({
            x:e.pageX,
            y:e.pageY
        })

        if(mouseTrack.length > 3){
            mouseTrack.shift()
        }
    }

    $('#test')
        .on('mouseenter',function(e){
            sub.removeClass('none')

            $(document).bind('mousemove',moveHandler)
        })
        .on('mouseleave',function(e){
            sub.addClass('none')

            if(activeRow){
                activeRow.removeClass('active')
                activeRow = null;
            }

            if(activeMenu){
                activeMenu.addClass('none')
                activeMenu = null;
            }

            //解绑
            $(document).unbind('mousemove',moveHandler)
        })

        .on('mouseenter','li',function(e){
            if(!activeRow){
                activeRow = $(e.target).addClass('acrive')
                activeMenu = $('#'+activeRow.data('id'))
                activeMenu.removeClass('none')
                return
            }

            //清除
            if(timer){
                clearTimeout(timer)
            }

            //鼠标当前坐标
            var  currMousePos = mouseTrack[mouseTrack.length - 1]
            //上次的坐标
            var leftCorner = mouseTrack[mouseTrack.length-2]

            var delay = needDelay(sub,leftCorner,currMousePos)

            if(delay){
                // 时间触发，设置一个缓冲期
                timer = setTimeout(function(){
                    //判断
                    if(mouseInSub){
                        return
                    }
                    activeRow.removeClass('active')
                    activeMenu.addClass('none')

                    activeRow = $(e.target)
                    activeRow.addClass('active')
                    activeMenu = $('#'+ activeRow.data('id'))
                    activeMenu.removeClass('none')

                    timer = null
                }, 300)
            }else{
                var prevActiveRow = activeRow
                var prevActiveMenu = activeMenu

                activeRow = $(e.target)
                activeMenu = $('#' + activeRow.data('id'))

                prevActiveRow.removeClass('active')
                prevActiveMenu.addClass('none')

                activeRow.addClass('active')
                activeMenu.removeClass('none')
            }
        })
})